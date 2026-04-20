import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, RefreshCw } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
const REFRESH_INTERVAL = 60000; // 60 seconds

// Static fallback — last known / representative data shown when backend is offline
const FALLBACK_DATA = {
  symbol: 'FUNDVISER',
  exchange: 'BSE',
  price: 352.35,
  change: 9.35,
  changePercent: 2.73,
  volume: 1000,
  lastUpdated: 'Offline — showing last known data',
  isFallback: true,
};

const StockWidget = () => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [lastFetched, setLastFetched] = useState(null);

  const fetchStock = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/stock`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStockData(data);
      setIsFallback(false);
      setLastFetched(new Date());
    } catch {
      // Backend offline — show fallback silently
      setStockData(FALLBACK_DATA);
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
    const timer = setInterval(fetchStock, REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const isPositive = stockData ? stockData.change >= 0 : true;

  return (
    <div className="bg-gradient-to-br from-[#faf5fc] to-[#faf5fc] py-4 sm:py-6 border-y border-[#f3e5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Mobile layout ── */}
        <div className="sm:hidden">
          {/* Top row: symbol + button */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#360153] rounded-lg shadow">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium leading-none">BSE: 530197</p>
                <p className="text-sm font-bold text-gray-900">FUNDVISER</p>
              </div>
            </div>
            <a
              href="https://www.bseindia.com/stock-share-price/fundviser-capital-(india)-ltd/fundviser/530197/"
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 bg-[#360153] text-white rounded-lg font-medium text-xs shadow transition-all duration-300 active:scale-95"
            >
              View on BSE
            </a>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm py-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Fetching live data…
            </div>
          ) : stockData ? (
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-xl px-3 py-2.5 border border-[#f3e5f5]">
                <p className="text-[10px] text-gray-500 font-medium mb-0.5">Current Price</p>
                <p className="text-xl font-bold text-gray-900">₹{Number(stockData.price).toFixed(2)}</p>
              </div>
              <div className="bg-white rounded-xl px-3 py-2.5 border border-[#f3e5f5]">
                <p className="text-[10px] text-gray-500 font-medium mb-0.5">Change</p>
                <div className="flex items-center gap-1">
                  {isPositive ? <TrendingUp className="w-3.5 h-3.5 text-green-600 shrink-0" /> : <TrendingDown className="w-3.5 h-3.5 text-red-600 shrink-0" />}
                  <span className={`text-sm font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{Number(stockData.change).toFixed(2)} ({isPositive ? '+' : ''}{Number(stockData.changePercent).toFixed(2)}%)
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-xl px-3 py-2.5 border border-[#f3e5f5]">
                <p className="text-[10px] text-gray-500 font-medium mb-0.5">Volume</p>
                <p className="text-sm font-bold text-gray-900">{Number(stockData.volume).toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-white rounded-xl px-3 py-2.5 border border-[#f3e5f5]">
                <p className="text-[10px] text-gray-500 font-medium mb-0.5">Last Updated</p>
                <p className="text-xs font-semibold text-gray-700 truncate">{stockData.lastUpdated}</p>
              </div>
            </div>
          ) : null}
        </div>

        {/* ── Desktop layout (unchanged) ── */}
        <div className="hidden sm:flex flex-wrap items-center justify-between gap-4">

          {/* Symbol & Icon */}
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-[#360153] rounded-xl shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">BSE: 530197</p>
              <p className="text-lg font-bold text-gray-900">FUNDVISER</p>
            </div>
          </div>

          {isFallback && !loading && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs font-medium">
              <RefreshCw className="w-3 h-3" />
            </div>
          )}

          {loading ? (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Fetching live data…
            </div>
          ) : stockData ? (
            <>
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium mb-1">Current Price</p>
                <p className="text-3xl font-bold text-gray-900">₹{Number(stockData.price).toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium mb-1">Change</p>
                <div className="flex items-center justify-center space-x-2">
                  {isPositive ? <TrendingUp className="w-5 h-5 text-green-600" /> : <TrendingDown className="w-5 h-5 text-red-600" />}
                  <span className={`text-xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{Number(stockData.change).toFixed(2)}{' '}
                    ({isPositive ? '+' : ''}{Number(stockData.changePercent).toFixed(2)}%)
                  </span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium mb-1">Volume</p>
                <p className="text-xl font-bold text-gray-900">{Number(stockData.volume).toLocaleString('en-IN')}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium mb-1">Last Updated</p>
                <p className="text-sm font-semibold text-gray-700">{stockData.lastUpdated}</p>
                {lastFetched && <p className="text-xs text-gray-400 mt-0.5">Refreshed {lastFetched.toLocaleTimeString()}</p>}
              </div>
            </>
          ) : null}

          <a
            href="https://www.bseindia.com/stock-share-price/fundviser-capital-(india)-ltd/fundviser/530197/"
            target="_blank" rel="noopener noreferrer"
            className="px-6 py-2.5 bg-[#360153] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            View on BSE
          </a>
        </div>

      </div>
    </div>
  );
};

export default StockWidget;
