from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import requests as http_requests
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection (optional — stock endpoint works without it)
mongo_url = os.environ.get('MONGO_URL', '')
db_name = os.environ.get('DB_NAME', 'fundviser')
try:
    client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=3000) if mongo_url else None
    db = client[db_name] if client else None
except Exception:
    client = None
    db = None

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    if db is None:
        raise HTTPException(status_code=503, detail="Database unavailable")
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    if db is None:
        raise HTTPException(status_code=503, detail="Database unavailable")
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.get("/stock")
async def get_stock_data():
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": "https://finance.yahoo.com/",
        "Origin": "https://finance.yahoo.com",
    }

    # Try v10 quoteSummary first (more reliable)
    try:
        url = "https://query1.finance.yahoo.com/v10/finance/quoteSummary/530197.BO"
        params = {"modules": "price"}
        session = http_requests.Session()
        # Prime the session with a cookie fetch
        session.get("https://finance.yahoo.com/quote/530197.BO/", headers=headers, timeout=8)
        response = session.get(url, params=params, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()
        price_data = data["quoteSummary"]["result"][0]["price"]

        current_price = price_data.get("regularMarketPrice", {}).get("raw", 0)
        prev_close = price_data.get("regularMarketPreviousClose", {}).get("raw", 0)
        change = price_data.get("regularMarketChange", {}).get("raw", 0)
        change_percent = price_data.get("regularMarketChangePercent", {}).get("raw", 0) * 100
        volume = price_data.get("regularMarketVolume", {}).get("raw", 0)
        market_time = price_data.get("regularMarketTime", {}).get("raw", 0)
        last_updated = datetime.fromtimestamp(market_time).strftime("%d %b %Y, %I:%M %p") if market_time else "N/A"

        return {
            "symbol": "FUNDVISER",
            "exchange": "BSE",
            "price": round(current_price, 2),
            "change": round(change, 4),
            "changePercent": round(change_percent, 2),
            "volume": volume,
            "lastUpdated": last_updated,
        }
    except Exception:
        pass

    # Fallback: v8 chart endpoint
    try:
        url = "https://query2.finance.yahoo.com/v8/finance/chart/530197.BO"
        params = {"interval": "1d", "range": "1d"}
        response = http_requests.get(url, params=params, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()
        meta = data["chart"]["result"][0]["meta"]

        current_price = meta.get("regularMarketPrice", 0)
        prev_close = meta.get("previousClose") or meta.get("chartPreviousClose", 0)
        change = round(current_price - prev_close, 4)
        change_percent = round((change / prev_close) * 100, 2) if prev_close else 0
        volume = meta.get("regularMarketVolume", 0)
        market_time = meta.get("regularMarketTime", 0)
        last_updated = datetime.fromtimestamp(market_time).strftime("%d %b %Y, %I:%M %p") if market_time else "N/A"

        return {
            "symbol": "FUNDVISER",
            "exchange": "BSE",
            "price": current_price,
            "change": change,
            "changePercent": change_percent,
            "volume": volume,
            "lastUpdated": last_updated,
        }
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to fetch stock data: {str(e)}")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()