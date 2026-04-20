import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  motion, useInView, useMotionValue, useSpring,
  useScroll, useTransform, AnimatePresence,
} from "framer-motion";
import {
  ArrowRight, ChevronRight, BarChart3, Building2,
  TrendingUp, ShieldCheck, ArrowDown,
  Gem, Rocket, Mail, Phone, MapPin, Layers,
} from "lucide-react";

const GOLD = "#C9A030";
const PURPLE = "#3B0163";

/* ══════════════════════════════════════════════════════════
   SHARED HELPERS
══════════════════════════════════════════════════════════ */
function AnimatedCounter({ value, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const mv = useMotionValue(0);
  const sp = useSpring(mv, { damping: 60, stiffness: 100 });
  useEffect(() => { if (inView) mv.set(value); }, [inView, value, mv]);
  useEffect(() => {
    const u = sp.on("change", v => { if (ref.current) ref.current.textContent = `${prefix}${Math.floor(v)}${suffix}`; });
    return u;
  }, [sp, prefix, suffix]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

function ParticleBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, pts = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      pts = Array.from({ length: Math.floor((canvas.width * canvas.height) / 13000) }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        sz: Math.random() * 1.8 + 0.4, a: Math.random() * 0.45 + 0.1,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,160,48,${p.a})`; ctx.fill();
      });
      ctx.lineWidth = 0.4;
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) { ctx.beginPath(); ctx.strokeStyle = `rgba(201,160,48,${0.1 * (1 - d / 110)})`; ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
      }
      raf = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", resize); resize(); draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-35" />;
}

function MagneticButton({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const handle = e => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={handle} onMouseLeave={() => { x.set(0); y.set(0); }} className={className}>
      {children}
    </motion.div>
  );
}

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });
  const handle = e => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
  };
  return (
    <motion.div ref={ref} style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }} onMouseMove={handle} onMouseLeave={() => { rx.set(0); ry.set(0); }} className={className}>
      {children}
    </motion.div>
  );
}

function Reveal({ children, className = "", delay = 0, direction = "up", once = true }) {
  const offset = direction === "up" ? [0, 50] : direction === "down" ? [0, -50] : direction === "left" ? [50, 0] : [-50, 0];
  const isH = direction === "left" || direction === "right";
  return (
    <motion.div className={className}
      initial={{ opacity: 0, ...(isH ? { x: offset[0] } : { y: offset[0] }) }}
      whileInView={{ opacity: 1, ...(isH ? { x: 0 } : { y: 0 }) }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   SERVICES DATA
══════════════════════════════════════════════════════════ */
const services = [
  {
    number: "01", title: "Investment Management", tagline: "Capital allocated with discipline and conviction.",
    desc: "We allocate capital across real estate, equities, bullion, and venture investments — each selected through a disciplined, research-driven process. Our portfolio is built for diversification without dilution: every position is sized, structured, and monitored to maximize risk-adjusted returns.",
    bullets: ["Multi-asset class allocation", "Research-driven position sizing", "Continuous portfolio monitoring"],
    img: "/w_12.png", accent: PURPLE,
  },
  {
    number: "02", title: "Financial Structuring", tagline: "We don't just find opportunities — we engineer them.",
    desc: "Beyond identifying opportunities, we structure them. Through co-investment arrangements, leveraged positions, and debt-equity hybrids, we design financial frameworks that optimize returns while managing downside exposure. This structuring capability is a core differentiator — it allows us to extract value that passive investors cannot.",
    bullets: ["Co-investment & hybrid arrangements", "Leveraged position design", "Downside exposure management"],
    img: "/w_13.jpg", accent: "#7A4A00",
  },
  {
    number: "03", title: "Cyclical Reinvestment", tagline: "We don't distribute and exit — we compound.",
    desc: "Realized gains are systematically reinvested into the next generation of opportunities, amplifying our capital base and building portfolio resilience over time. This reinvestment discipline is central to how Fundviser Capital creates long-term value — not a single cycle, but a perpetual one.",
    bullets: ["Systematic gain redeployment", "Compounding capital base", "Portfolio resilience over time"],
    img: "/w_11.png", accent: "#0f3b22",
  },
  {
    number: "04", title: "Stakeholder Returns", tagline: "Growth that flows back to those who believe in us.",
    desc: "Our listed equity shareholders benefit from portfolio growth through share price appreciation and periodic value distributions. For co-investment partners, we structure bespoke arrangements aligned with individual risk profiles and return expectations — because every stakeholder relationship is unique.",
    bullets: ["Listed equity value appreciation", "Periodic value distributions", "Bespoke co-investment structures"],
    img: "/w_14.png", accent: "#0a2240",
  },
];


const marqueeImages = [
  "z_16.png",
  "/about_us2.png",
  "/about_us1.jpeg",
  "/z_12.jpeg",
  "/z_13.png",
  "/z_14.png",
  "/z_17.png",
  "/Starlight_logo_big.png",
];

/* ══════════════════════════════════════════════════════════
   FAN DECK — 2 cards: Services + Investment Sectors
══════════════════════════════════════════════════════════ */
const DECK_CARDS = [
  {
    id: "services",
    label: "Our Services",
    tagline: "Core Investment Methodology",
    anchor: "#services",
    icon: BarChart3,
    accentColor: GOLD,
    watermark: "04",
    items: services.map(s => ({ icon: null, label: s.title, sub: s.tagline })),
    renderItems: (isActive) => services.map((s, i) => (
      <div key={i} className="flex items-start gap-2.5 mb-2.5">
        <span className="text-[10px] font-black mt-0.5 shrink-0 w-4"
          style={{ color: isActive ? `${GOLD}90` : "rgba(255,255,255,0.2)" }}>{s.number}</span>
        <div>
          <p className="text-[12.5px] font-semibold leading-tight"
            style={{ color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)" }}>{s.title}</p>
        </div>
      </div>
    )),
  },
  {
    id: "sectors",
    label: "Investment Sectors",
    tagline: "Where We Deploy Capital",
    anchor: "#sectors",
    icon: Layers,
    accentColor: "#a855f7",
    watermark: "04",
    renderItems: (isActive) => (
      <div className="grid grid-cols-2 gap-2">
        {investSectors.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="flex items-center gap-2 px-2.5 py-2 rounded-xl transition-all duration-300"
              style={{ background: isActive ? `${s.accent}18` : "rgba(255,255,255,0.03)", border: `1px solid ${isActive ? s.accent + "30" : "rgba(255,255,255,0.05)"}` }}>
              <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: isActive ? s.accent : "rgba(255,255,255,0.2)" }} />
              <span className="text-[11px] font-semibold leading-tight"
                style={{ color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)" }}>{s.title}</span>
            </div>
          );
        })}
      </div>
    ),
  },
];

const FAN_ROTATE_2 = [-20, 20];
const FAN_Y_RISE_2 = [-16, -16];
const CARD_W = 300, CARD_H = 400;

function FanDeck() {
  const [active, setActive] = useState(0);
  const [fanned, setFanned] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => { const t = setTimeout(() => setFanned(true), 400); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % 2), 3200);
    return () => clearInterval(id);
  }, []);

  const highlighted = hovered !== null ? hovered : active;
  const W = 520, H = 520;

  const scrollTo = anchor => {
    const el = document.querySelector(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div className="relative hidden lg:block select-none"
      style={{ width: W, height: H }}
      animate={{ y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>

      {DECK_CARDS.map((card, i) => {
        const Icon = card.icon;
        const isActive = i === highlighted;
        const rotation = fanned ? FAN_ROTATE_2[i] : 0;
        const baseY = fanned ? FAN_Y_RISE_2[i] : 0;
        const liftY = isActive ? baseY - 32 : baseY;
        const baseX = W / 2 - CARD_W / 2;

        return (
          <motion.div key={card.id}
            animate={{
              rotate: rotation,
              y: liftY,
              x: baseX,
              scale: isActive ? 1.06 : fanned ? 0.96 : 1,
              zIndex: isActive ? 20 : 10,
            }}
            transition={{
              rotate: { type: "spring", stiffness: 80, damping: 14, delay: fanned ? 0 : i * 0.08 },
              y: { type: "spring", stiffness: 110, damping: 18 },
              scale: { duration: 0.35, ease: "easeOut" },
            }}
            style={{ position: "absolute", top: H - CARD_H - 40, left: 0, width: CARD_W, height: CARD_H, transformOrigin: "50% 100%", cursor: "pointer" }}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            onClick={() => scrollTo(card.anchor)}>

            {/* Glow halo behind active */}
            <motion.div className="absolute -inset-6 rounded-3xl blur-2xl pointer-events-none"
              animate={{ opacity: isActive ? 0.6 : 0 }} transition={{ duration: 0.4 }}
              style={{ background: `radial-gradient(ellipse, ${card.accentColor}55, ${PURPLE}30, transparent 70%)` }} />

            {/* Card body */}
            <motion.div className="relative w-full h-full rounded-2xl flex flex-col overflow-hidden"
              animate={{ boxShadow: isActive ? `0 28px 64px -12px rgba(0,0,0,0.95), inset 0 0 0 1px ${card.accentColor}50` : `0 10px 32px -10px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.07)` }}
              transition={{ duration: 0.35 }}
              style={{
                background: isActive
                  ? `linear-gradient(155deg, rgba(60,2,100,0.82) 0%, rgba(10,6,22,0.97) 100%)`
                  : `linear-gradient(155deg, rgba(18,4,30,0.75) 0%, rgba(6,4,12,0.92) 100%)`,
                backdropFilter: "blur(22px)",
                border: `1px solid ${isActive ? card.accentColor + "40" : "rgba(255,255,255,0.07)"}`,
              }}>

              {/* Top shimmer */}
              <motion.div className="absolute top-0 left-0 right-0 h-[1.5px]"
                animate={{ opacity: isActive ? 1 : 0 }}
                style={{ background: `linear-gradient(90deg, transparent, ${card.accentColor}95, transparent)` }} />

              {/* Watermark number */}
              <div className="absolute -bottom-2 -right-2 leading-none pointer-events-none select-none"
                style={{ fontSize: 96, fontFamily: "'Playfair Display', serif", fontWeight: 900, color: "transparent", WebkitTextStroke: `1.5px ${isActive ? card.accentColor + "22" : "rgba(255,255,255,0.04)"}`, lineHeight: 1 }}>
                {card.watermark}
              </div>

              {/* Content */}
              <div className="relative z-10 p-5 flex flex-col h-full">

                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <motion.div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    animate={{ background: isActive ? `linear-gradient(135deg, ${PURPLE}, #7a04cc)` : "rgba(255,255,255,0.05)" }}
                    style={{ border: `1px solid ${isActive ? card.accentColor + "40" : "rgba(255,255,255,0.07)"}` }}>
                    <Icon className="w-5 h-5" style={{ color: isActive ? card.accentColor : "rgba(255,255,255,0.25)" }} />
                  </motion.div>
                  <motion.span className="text-[10px] font-black tracking-[0.22em] uppercase"
                    animate={{ color: isActive ? card.accentColor : "rgba(255,255,255,0.18)" }}>
                    {card.id === "services" ? "04 Services" : "04 Sectors"}
                  </motion.span>
                </div>

                {/* Tagline */}
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-1.5"
                  style={{ color: isActive ? `${card.accentColor}cc` : "rgba(255,255,255,0.18)" }}>
                  {card.tagline}
                </p>

                {/* Title */}
                <h4 className="font-bold leading-snug mb-4"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: isActive ? "19px" : "16px", color: isActive ? "#fff" : "rgba(255,255,255,0.35)", transition: "font-size 0.3s" }}>
                  {card.label}
                </h4>

                {/* Divider */}
                <motion.div className="h-px mb-4 rounded-full origin-left"
                  animate={{ scaleX: isActive ? 1 : 0.3, opacity: isActive ? 0.5 : 0.15 }}
                  style={{ background: `linear-gradient(90deg, ${card.accentColor}, transparent)` }} />

                {/* Items — always visible, styled by active state */}
                <div className="flex-grow overflow-hidden">
                  {card.renderItems(isActive)}
                </div>

                {/* CTA row */}
                <div className="mt-auto pt-3 flex items-center justify-between"
                  style={{ borderTop: `1px solid ${isActive ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)"}` }}>
                  <motion.span className="text-[11px] font-bold tracking-widest uppercase"
                    animate={{ color: isActive ? card.accentColor : "rgba(255,255,255,0.18)" }}>
                    Explore
                  </motion.span>
                  <motion.div animate={{ x: isActive ? 4 : 0 }} transition={{ duration: 0.25 }}>
                    <ArrowRight className="w-4 h-4" style={{ color: isActive ? card.accentColor : "rgba(255,255,255,0.18)" }} />
                  </motion.div>
                </div>
              </div>

              {/* Bottom shimmer */}
              <motion.div className="absolute bottom-0 left-0 right-0 h-[1.5px]"
                animate={{ opacity: isActive ? 1 : 0 }}
                style={{ background: `linear-gradient(90deg, transparent, ${card.accentColor}65, transparent)` }} />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Dot indicators */}
      <div className="absolute left-0 right-0 flex items-center justify-center gap-2.5" style={{ bottom: -36 }}>
        {DECK_CARDS.map((_, i) => (
          <motion.div key={i}
            onClick={() => { setActive(i); setHovered(null); }}
            animate={{ width: i === active ? 24 : 7, background: i === active ? GOLD : "rgba(255,255,255,0.2)" }}
            transition={{ duration: 0.3 }}
            className="h-[5px] rounded-full cursor-pointer" />
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   INVESTMENT SECTORS — ARC SCROLL SECTION
══════════════════════════════════════════════════════════ */
const ARC_CX = 0;
const ARC_R = 330;
const ANGLE_DEG = 26;

function arcPos(i, progress) {
  const deg = (i - progress) * ANGLE_DEG;
  const rad = deg * (Math.PI / 180);
  return { x: ARC_CX + ARC_R * Math.cos(rad), y: ARC_R * Math.sin(rad), deg };
}

const investSectors = [
  {
    id: "real-estate", number: "01", icon: Building2,
    title: "Real Estate", tagline: "Building Wealth Through Property",
    accent: "#a855f7", accentDark: "#7c3aed", color: "from-[#360153] to-[#5a0280]",
    stat: { value: "5", label: "Strategies" },
    mainImage: { src: "/Main_header_building.png", fit: "cover" },
    subImages: [
      { src: "/SRA.png", label: "SRA Investments", fit: "cover" },
      { src: "/Ready_flats.png", label: "Ready Flats", fit: "cover" },
      { src: "/commercial_units.png", label: "Commercial Units", fit: "cover" },
      { src: "/land_banking.png", label: "Land Banking", fit: "cover" },
      { src: "/redevelopment_projects.png", label: "Redevelopment", fit: "cover" },
    ],
    summary: "Comprehensive real estate strategies — from urban redevelopment to premium commercial spaces — crafting investments that generate lasting value across every market cycle.",
    subsectors: [
      { name: "SRA Investments", description: "Slum Rehabilitation Authority projects driving urban improvement with strong risk-adjusted returns." },
      { name: "Ready Flats", description: "Fully-developed residential units offering immediate occupancy, stable rental income, and capital appreciation." },
      { name: "Commercial Units", description: "Premium office spaces and retail properties anchored by quality tenants in high-demand locations." },
      { name: "Land Banking", description: "Strategic acquisition of undeveloped land in prime growth corridors for long-term appreciation." },
      { name: "Redevelopment Projects", description: "Transforming existing structures into high-value assets through modern redevelopment." },
    ],
  },
  {
    id: "bullion", number: "02", icon: Gem,
    title: "Bullion — Gold & Silver", tagline: "Preserving Wealth Across Generations",
    accent: "#f59e0b", accentDark: "#d97706", color: "from-yellow-600 to-yellow-800",
    stat: { value: "2", label: "Precious Metals" },
    mainImage: { src: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=900&h=700&fit=crop&q=80", fit: "cover" },
    subImages: [
      { src: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=900&h=700&fit=crop&q=80", label: "Gold", fit: "cover" },
      { src: "./Silver.png", label: "Silver", fit: "cover" },
    ],
    summary: "Precious metals form our bedrock hedge against market volatility and inflation, ensuring wealth preservation through every economic cycle with timeless stability.",
    subsectors: [
      { name: "Gold", description: "A timeless store of value and reliable safe-haven asset anchoring our portfolio against macroeconomic uncertainty." },
      { name: "Silver", description: "Industrial demand combined with investment appeal makes silver a dynamic asset for both growth and stability." },
    ],
  },
  {
    id: "equities", number: "03", icon: TrendingUp,
    title: "Equities", tagline: "Unlocking Value in Public & Private Markets",
    accent: "#10b981", accentDark: "#059669", color: "from-emerald-600 to-emerald-800",
    stat: { value: "2", label: "Market Segments" },
    mainImage: { src: "/capital_markets.jpg", fit: "cover" },
    subImages: [
      { src: "/Equity_Investments.png", label: "Listed Companies", fit: "cover" },
      { src: "/Unlisted_Companies.jpg", label: "Unlisted Companies", fit: "cover" },
    ],
    summary: "Investing across the equity spectrum — from publicly listed companies with strong fundamentals to high-potential private enterprises poised for exponential growth.",
    subsectors: [
      { name: "Listed Companies", description: "Publicly traded firms selected through rigorous fundamental analysis, offering liquidity and transparent price discovery." },
      { name: "Unlisted Companies", description: "Early-stage and growth-phase private enterprises where our capital and expertise create outsized returns." },
    ],
  },
  {
    id: "startup-vc", number: "04", icon: Rocket,
    title: "Startup & VC Investing", tagline: "Backing the Innovators of Tomorrow",
    accent: "#3b82f6", accentDark: "#2563eb", color: "from-blue-700 to-blue-900",
    stat: { value: "2+", label: "Focus Areas" },
    mainImage: { src: "/Early_stage_startups.jpeg", fit: "cover" },
    subImages: [
      { src: "/Startup.png", label: "Early-Stage Startups", fit: "cover" },
      { src: "/Emerging_Technology.jpg", label: "Emerging Tech", fit: "cover" },
    ],
    summary: "Backing visionary founders and emerging technologies — partnering with early-stage companies that have the potential to redefine entire industries and create generational value.",
    subsectors: [
      { name: "Early-Stage Startups", description: "Seed and Series A investments in founders building transformative businesses with scalable, defensible models." },
      { name: "Emerging Technologies", description: "Deep-tech, fintech, and platform businesses at the frontier of innovation and market disruption." },
    ],
  },
];

function SectorsSection() {
  const scrollRef = useRef(null);
  const detailRef = useRef(null);
  const [rawProgress, setRawProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(investSectors[0].id);
  const [activeSubsector, setActiveSubsector] = useState(null);

  const mobileActive = investSectors.find(s => s.id === activeTab);
  const activeIndex = Math.round(rawProgress);
  const active = investSectors[activeIndex];

  useEffect(() => { setActiveSubsector(null); }, [activeIndex]);

  const handleSelectSector = id => {
    setActiveTab(id); setActiveSubsector(null);
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  useEffect(() => {
    const onScroll = () => {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const scrollable = scrollRef.current.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.max(0, Math.min(investSectors.length - 1, (-rect.top / scrollable) * (investSectors.length - 1)));
      setRawProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="sectors" style={{ background: "#f4f6fb" }}>
      {/* Section header — above scroll journey */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-10 text-center">
        <Reveal once={false}>
          <span className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-5"
            style={{ background: `${PURPLE}12`, color: PURPLE }}>Where We Invest</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "#0f0020" }}>Investment Universe</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Capital strategically deployed across asset classes chosen for long-term compounding and macroeconomic resilience.
          </p>
          <motion.div className="w-24 h-1 mx-auto rounded-full mt-6 origin-left"
            style={{ background: `linear-gradient(90deg, ${PURPLE}, ${GOLD})` }}
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false }} transition={{ duration: 0.8, delay: 0.3 }} />
        </Reveal>
      </div>

      {/* ── DESKTOP SCROLL JOURNEY ── */}
      <div ref={scrollRef} className="hidden lg:block" style={{ height: `${(investSectors.length + 0.1) * 100}vh` }}>
        <div className="sticky top-[72px] overflow-hidden"
          style={{ display: "grid", gridTemplateColumns: "30% 1fr", background: "#ffffff", height: "calc(100vh - 72px)" }}>

          {/* LEFT: arc */}
          <div className="relative overflow-hidden" style={{ background: "#ffffff" }}>
            <div className="absolute inset-0 pointer-events-none transition-all duration-700"
              style={{ background: `radial-gradient(ellipse at 70% 50%, ${active.accent}10 0%, transparent 65%)` }} />
            <div className="absolute pointer-events-none" style={{ width: ARC_R * 2, height: ARC_R * 2, borderRadius: "50%", left: ARC_CX - ARC_R, top: "50%", transform: "translateY(-50%)", border: "1px solid rgba(0,0,0,0.07)" }} />
            <div className="absolute pointer-events-none" style={{ width: ARC_R * 1.45, height: ARC_R * 1.45, borderRadius: "50%", left: ARC_CX - ARC_R * 0.725, top: "50%", transform: "translateY(-50%)", border: "1px solid rgba(0,0,0,0.03)" }} />
            <div className="absolute pointer-events-none transition-all duration-700" style={{ width: ARC_R * 2, height: ARC_R * 2, borderRadius: "50%", left: ARC_CX - ARC_R, top: "50%", transform: "translateY(-50%)", boxShadow: `inset -10px 0 50px ${active.accent}15` }} />
            {/* Spine */}
            <div className="absolute z-10 pointer-events-none" style={{ left: 20, top: "13%", bottom: "13%", width: 2 }}>
              <div className="w-full h-full rounded-full transition-all duration-700" style={{ background: `linear-gradient(to bottom, transparent 0%, ${active.accent}50 25%, ${active.accent}80 50%, ${active.accent}50 75%, transparent 100%)` }} />
              <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-all duration-500"
                style={{ top: `${(activeIndex / (investSectors.length - 1)) * 74 + 13}%`, background: active.accent, boxShadow: `0 0 10px ${active.accent}99`, transform: "translateX(-50%)" }} />
            </div>
            {/* Heading */}
            <div className="absolute top-8 left-10 z-20 select-none" style={{ width: 175 }}>
              <p className="text-[11px] font-black tracking-widest uppercase mb-2 transition-colors duration-500" style={{ color: active.accent }}>Our Portfolio</p>
              <h2 className="text-4xl xl:text-5xl font-black text-gray-900 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Investment<br />
                <span className="text-transparent bg-clip-text transition-all duration-500"
                  style={{ backgroundImage: `linear-gradient(135deg, ${active.accent}, ${active.accentDark})` }}>Sectors</span>
              </h2>
              <p className="text-gray-400 text-[11px] mt-2 leading-relaxed">Scroll to explore</p>
            </div>
            {/* Progress */}
            <div className="absolute bottom-10 left-10 z-20 select-none">
              <p className="text-[11px] font-bold mb-2.5 tracking-wider transition-colors duration-500" style={{ color: active.accent }}>{active.title}</p>
              <p className="text-gray-400 text-[11px] font-bold mb-2 tracking-wider">{String(activeIndex + 1).padStart(2, "0")} / {String(investSectors.length).padStart(2, "0")}</p>
              <div className="flex items-center gap-1.5">
                {investSectors.map((_, i) => (
                  <div key={i} className="rounded-full transition-all duration-400" style={{ width: i === activeIndex ? "22px" : "6px", height: "6px", background: i === activeIndex ? active.accent : "#d1d5db", boxShadow: i === activeIndex ? `0 0 8px ${active.accent}80` : "none" }} />
                ))}
              </div>
            </div>
            {/* Arc items */}
            {investSectors.map((s, i) => {
              const { x, y, deg } = arcPos(i, rawProgress);
              if (Math.abs(deg) > 78) return null;
              const isActive = i === activeIndex;
              const dist = Math.abs(i - rawProgress);
              const opacity = isActive ? 1 : Math.max(0.12, 1 - dist * 0.52);
              const Icon = s.icon;
              return (
                <div key={s.id} className="absolute z-10"
                  style={{ left: x, top: "50%", transform: `translateY(calc(-50% + ${y}px)) translateX(${isActive ? "-100%" : "0%"})`, opacity, transition: "opacity 0.3s ease", pointerEvents: "none" }}>
                  {isActive ? (
                    <div style={{ width: 220 }}>
                      <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: s.accent }}>{s.tagline}</p>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color} flex-shrink-0`} style={{ boxShadow: `0 6px 20px ${s.accent}40` }}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-gray-900 font-black text-3xl leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h3>
                      </div>
                      <span className="text-5xl font-black" style={{ color: s.accent, lineHeight: 1 }}>{s.number}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${s.color} flex-shrink-0`} style={{ opacity: 0.35 }}><Icon className="w-3.5 h-3.5 text-white" /></div>
                      <span className="font-semibold text-xs text-gray-300">{s.title}</span>
                    </div>
                  )}
                </div>
              );
            })}
            {/* Active dot */}
            <div className="absolute z-20" style={{ left: ARC_CX + ARC_R, top: "50%", transform: "translate(-50%, -50%)" }}>
              <div className="absolute inset-0 rounded-full" style={{ width: 36, height: 36, margin: -13, background: active.accent + "18", animation: "arcPing 1.6s ease-out infinite" }} />
              <div className="rounded-full relative z-10 transition-all duration-500" style={{ width: 10, height: 10, background: `radial-gradient(circle, #fff 0%, ${active.accent} 70%)`, boxShadow: `0 0 12px ${active.accent}cc, 0 0 24px ${active.accent}55` }} />
            </div>
          </div>

          {/* RIGHT: detail */}
          <div className="relative overflow-hidden flex flex-col" style={{ background: "#ffffff" }}>
            <div className="absolute right-6 bottom-6 font-black select-none pointer-events-none z-0 transition-all duration-500"
              style={{ fontSize: "200px", lineHeight: 1, color: active.accent + "06", letterSpacing: "-0.05em" }}>{active.number}</div>
            <div key={activeIndex} className="sector-in flex-1 flex overflow-hidden relative z-10">
              {/* Subsectors */}
              <div className="flex flex-col justify-center px-10 xl:px-14 py-10 overflow-hidden" style={{ width: "44%", flexShrink: 0 }}>
                <div className="space-y-1 pt-4" onMouseLeave={() => setActiveSubsector(null)}>
                  {active.subsectors.map((sub, i) => {
                    const isActiveSub = activeSubsector === i;
                    return (
                      <div key={`${activeIndex}-${i}`}
                        className={`sub-in-${i} flex items-start gap-4 rounded-xl cursor-default transition-all duration-200`}
                        style={{ padding: "10px 12px", border: `1.5px solid ${isActiveSub ? active.accent : "transparent"}`, background: isActiveSub ? active.accent + "12" : "transparent" }}
                        onMouseEnter={() => setActiveSubsector(i)}>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
                          style={{ background: isActiveSub ? active.accent : active.accent + "18" }}>
                          <div className="w-2 h-2 rounded-full transition-all duration-200" style={{ background: isActiveSub ? "#fff" : active.accent }} />
                        </div>
                        <div>
                          <p className="text-gray-900 font-black text-xl leading-tight">{sub.name}</p>
                          <p className="text-gray-500 text-base leading-snug mt-1">{sub.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Image + summary */}
              <div className="flex-1 min-w-0 flex flex-col items-center justify-center p-8 pl-2 gap-4">
                <div className="relative overflow-hidden rounded-2xl sector-in"
                  style={{ width: "72%", aspectRatio: "1/1", maxHeight: "calc(100vh - 310px)", flexShrink: 0 }}>
                  <img
                    key={activeSubsector === null ? `main-${activeIndex}` : `sub-${activeIndex}-${activeSubsector}`}
                    src={activeSubsector !== null && active.subImages?.[activeSubsector] ? active.subImages[activeSubsector].src : active.mainImage.src}
                    alt={activeSubsector !== null && active.subImages?.[activeSubsector] ? active.subImages[activeSubsector].label : active.title}
                    className="w-full h-full sector-in"
                    style={{ objectFit: activeSubsector !== null && active.subImages?.[activeSubsector]?.fit ? active.subImages[activeSubsector].fit : active.mainImage.fit || "cover", objectPosition: "center", background: "#ddd" }} />
                  <div className="absolute inset-0 rounded-2xl" style={{ background: `linear-gradient(160deg, ${active.accent}18 0%, transparent 45%, rgba(0,0,0,0.22) 100%)` }} />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300"
                      style={{ background: "rgba(255,255,255,0.88)", color: active.accent, border: `1px solid ${active.accent}30` }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: active.accent }} />
                      {activeSubsector !== null && active.subImages?.[activeSubsector] ? active.subImages[activeSubsector].label : active.title}
                    </span>
                  </div>
                </div>
                {/* Info panel */}
                <div className="sector-in" style={{ width: "72%" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider"
                      style={{ background: active.accent + "12", color: active.accent, border: `1px solid ${active.accent}25` }}>
                      <span className="w-1 h-1 rounded-full" style={{ background: active.accent }} />
                      {active.stat.value} {active.stat.label}
                    </span>
                  </div>
                  <div className="relative rounded-xl px-4 py-3 overflow-hidden transition-all duration-500"
                    style={{ background: active.accent + "07", borderLeft: `3px solid ${active.accent}` }}>
                    <div className="absolute top-0 right-0 w-16 h-16 rounded-full pointer-events-none"
                      style={{ background: `radial-gradient(circle, ${active.accent}18 0%, transparent 70%)`, transform: "translate(30%, -30%)" }} />
                    <p className="relative text-sm leading-relaxed transition-all duration-300" style={{ color: "#4b5563", fontWeight: 500 }}>
                      {activeSubsector !== null && active.subsectors?.[activeSubsector] ? active.subsectors[activeSubsector].description : active.summary}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    {active.subsectors.map((sub, i) => (
                      <button key={i} onClick={() => setActiveSubsector(activeSubsector === i ? null : i)} title={sub.name}
                        className="rounded-full transition-all duration-300 focus:outline-none"
                        style={{ width: activeSubsector === i ? 20 : 7, height: 7, background: activeSubsector === i ? active.accent : active.accent + "30", boxShadow: activeSubsector === i ? `0 0 8px ${active.accent}70` : "none" }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE / TABLET ── */}
      <div className="lg:hidden" style={{ background: "#f4f6fb" }}>
        <div className="px-5 py-5 flex gap-3 overflow-x-auto" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
          {investSectors.map(s => {
            const Icon = s.icon;
            const isActive = s.id === activeTab;
            return (
              <button key={s.id} onClick={() => handleSelectSector(s.id)}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300"
                style={{ background: isActive ? s.accent : "#fff", border: `1.5px solid ${isActive ? s.accent : "#e5e7eb"}`, boxShadow: isActive ? `0 4px 18px ${s.accent}40` : "0 1px 4px rgba(0,0,0,0.06)", color: isActive ? "#fff" : "#374151", transform: isActive ? "translateY(-2px)" : "none" }}>
                <Icon style={{ width: 15, height: 15, flexShrink: 0 }} />
                <span className="text-sm font-bold whitespace-nowrap">{s.title}</span>
              </button>
            );
          })}
        </div>
        <div ref={detailRef} className="px-4 md:px-6 pb-12">
          <div className="md:grid md:grid-cols-5 md:gap-6 md:items-start">
            <div className="md:col-span-2 relative rounded-3xl overflow-hidden mb-5 md:mb-0" style={{ aspectRatio: "4/3" }}>
              <img key={activeTab}
                src={activeSubsector !== null && mobileActive.subImages?.[activeSubsector] ? mobileActive.subImages[activeSubsector].src : mobileActive.mainImage.src}
                alt={mobileActive.title} className="w-full h-full sector-in" style={{ objectFit: "cover", objectPosition: "center", background: "#ddd" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,3,20,0.92) 0%, rgba(10,3,20,0.35) 55%, transparent 100%)" }} />
              <div className="absolute inset-0 transition-all duration-500" style={{ background: `linear-gradient(135deg, ${mobileActive.accent}22 0%, transparent 60%)` }} />
              <div className="absolute right-4 top-3 font-black select-none pointer-events-none" style={{ fontSize: 88, lineHeight: 1, color: "rgba(255,255,255,0.08)", letterSpacing: "-0.05em" }}>{mobileActive.number}</div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-black text-2xl leading-tight mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>{mobileActive.title}</h3>
                <p className="text-xs font-semibold transition-colors duration-500" style={{ color: mobileActive.accent }}>{mobileActive.tagline}</p>
              </div>
            </div>
            <div className="md:col-span-3 flex flex-col gap-4">
              <div className="rounded-2xl p-5 transition-all duration-500" style={{ background: "#fff", borderLeft: `4px solid ${mobileActive.accent}`, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <p className="text-gray-600 text-sm leading-relaxed">{mobileActive.summary}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: mobileActive.accent + "12", border: `1px solid ${mobileActive.accent}25` }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: mobileActive.accent }} />
                  <span className="text-[11px] font-black transition-colors duration-500" style={{ color: mobileActive.accent }}>{mobileActive.stat.value} {mobileActive.stat.label}</span>
                </div>
              </div>
              <div className="space-y-2.5">
                <p className="text-[10px] font-black tracking-widest uppercase px-1 transition-colors duration-500" style={{ color: mobileActive.accent }}>Investment Areas</p>
                {mobileActive.subsectors.map((sub, i) => {
                  const subImg = mobileActive.subImages?.[i];
                  const isActiveSub = activeSubsector === i;
                  return (
                    <div key={`${activeTab}-${i}`} className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
                      style={{ background: "#fff", border: `1.5px solid ${isActiveSub ? mobileActive.accent : "#eee"}`, boxShadow: isActiveSub ? `0 6px 24px ${mobileActive.accent}22` : "0 1px 6px rgba(0,0,0,0.05)" }}
                      onClick={() => setActiveSubsector(isActiveSub ? null : i)}>
                      <div className="flex items-center gap-3 p-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                          style={{ background: isActiveSub ? mobileActive.accent : mobileActive.accent + "18" }}>
                          <div className="w-2 h-2 rounded-full transition-all duration-300" style={{ background: isActiveSub ? "#fff" : mobileActive.accent }} />
                        </div>
                        <p className="text-gray-900 font-black text-sm flex-1 leading-tight">{sub.name}</p>
                        <ChevronRight className="w-4 h-4 flex-shrink-0 transition-all duration-300" style={{ color: mobileActive.accent, transform: isActiveSub ? "rotate(90deg)" : "none" }} />
                      </div>
                      {isActiveSub && (
                        <div className="px-4 pb-4">
                          {subImg && <div className="rounded-xl overflow-hidden mb-3" style={{ height: 150 }}><img src={subImg.src} alt={subImg.label} className="w-full h-full" style={{ objectFit: subImg.fit || "cover", objectPosition: "center" }} /></div>}
                          <p className="text-gray-500 text-sm leading-relaxed">{sub.description}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN COMBINED PAGE
══════════════════════════════════════════════════════════ */
export default function WhatWeDo() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 80]);
  const progressW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const fn = e => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const words = "Creating Lasting Value".split(" ");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.0 }}
      className="min-h-screen text-white selection:bg-[#C9A030] selection:text-black"
      style={{ background: "linear-gradient(160deg, #1e0038 0%, #0d0d22 40%, #1a0030 100%)", fontFamily: "'Inter', sans-serif", overflowX: "clip" }}>

      <style>{`
        @keyframes sectorIn { from{opacity:0;transform:translateX(24px);}to{opacity:1;transform:translateX(0);} }
        @keyframes subIn0   { from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;} }
        @keyframes subIn1   { from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;} }
        @keyframes subIn2   { from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;} }
        @keyframes subIn3   { from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;} }
        @keyframes subIn4   { from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;} }
        @keyframes arcPing  { 0%{transform:scale(1);opacity:0.6;}100%{transform:scale(2.2);opacity:0;} }
        .sector-in { animation: sectorIn 0.48s cubic-bezier(0.16,1,0.3,1) both; }
        .sub-in-0  { animation: subIn0 0.4s 0.04s cubic-bezier(0.16,1,0.3,1) both; }
        .sub-in-1  { animation: subIn1 0.4s 0.11s cubic-bezier(0.16,1,0.3,1) both; }
        .sub-in-2  { animation: subIn2 0.4s 0.18s cubic-bezier(0.16,1,0.3,1) both; }
        .sub-in-3  { animation: subIn3 0.4s 0.25s cubic-bezier(0.16,1,0.3,1) both; }
        .sub-in-4  { animation: subIn4 0.4s 0.32s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      <Navbar />

      {/* Scroll progress bar */}
      <motion.div className="fixed top-[72px] left-0 h-[2px] z-[40] origin-left"
        style={{ width: progressW, background: `linear-gradient(90deg, ${PURPLE}, ${GOLD}, ${PURPLE})` }} />

      {/* Cursor spotlight */}
      <motion.div className="pointer-events-none fixed inset-0 z-[60]"
        animate={{ background: `radial-gradient(480px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201,160,48,0.045), transparent 38%)` }}
        transition={{ type: "tween", duration: 0 }} />

      {/* ══ 1. HERO ══ */}
      <section className="relative lg:min-h-screen flex items-start lg:items-center overflow-hidden"
        style={{ background: "linear-gradient(160deg, #220040 0%, #0e0e24 45%, #1c0034 100%)" }}>
        <ParticleBackground />
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-8%] left-[-4%] w-[650px] h-[650px] rounded-full blur-[160px] opacity-45" style={{ background: PURPLE }} />
          <div className="absolute bottom-[-8%] right-[-3%] w-[450px] h-[450px] rounded-full blur-[130px] opacity-20" style={{ background: GOLD }} />
          <div className="absolute top-[35%] right-[22%] w-[280px] h-[280px] rounded-full blur-[100px] opacity-35" style={{ background: "#360060" }} />
        </motion.div>
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.2) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-6 lg:px-16 w-full grid lg:grid-cols-[1fr_440px] gap-10 xl:gap-16 items-center pt-[88px] pb-16 sm:pt-24 lg:py-20">
          <div>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <span className="w-10 h-px" style={{ background: GOLD }} />
              <span className="text-xs tracking-[0.28em] uppercase font-semibold" style={{ color: GOLD }}>Fundviser Capital</span>
              <span className="w-10 h-px" style={{ background: GOLD }} />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.05] mb-5 sm:mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              {words.map((word, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 70, rotateX: -50 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.95, delay: 0.25 + i * 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
                  className="inline-block mr-[0.22em]" style={{ transformOrigin: "bottom center" }}>
                  {i === 1
                    ? <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, #EDD17A, ${GOLD})` }}>{word}</span>
                    : word}
                </motion.span>
              ))}
            </h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.8 }}
              className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-7 max-w-lg font-light">
              We don't just invest — we craft legacies. Discover our investment methodology, core services, and the asset classes where we deploy capital for enduring growth.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.8 }}
              className="flex flex-wrap gap-4">
              <MagneticButton>
                <motion.a href="#services" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
                  className="relative inline-flex items-center gap-3 px-8 py-4 font-bold rounded-full overflow-hidden group text-gray-900"
                  style={{ background: `linear-gradient(135deg, #EDD17A, ${GOLD})` }}>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity" />
                  Our Services <ChevronRight className="w-5 h-5" />
                </motion.a>
              </MagneticButton>
              <MagneticButton>
                <motion.a href="#sectors" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-3 px-8 py-4 border font-semibold rounded-full transition-all"
                  style={{ borderColor: "rgba(201,160,48,0.35)", color: "#EDD17A" }}>
                  Investment Sectors <Layers className="w-4 h-4" />
                </motion.a>
              </MagneticButton>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
              className="flex items-center gap-3 mt-8">
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                <ArrowDown className="w-4 h-4" style={{ color: GOLD }} />
              </motion.div>
              <span className="text-xs text-gray-500 tracking-[0.18em] uppercase">Scroll to explore</span>
            </motion.div>
          </div>
          {/* ── RIGHT: FanDeck desktop ── */}
          <div className="hidden lg:flex items-center justify-center py-4">
            <FanDeck />
          </div>
        </div>

        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
            <path d="M0,80 L1440,80 L1440,30 Q1080,80 720,45 Q360,10 0,45 Z" fill="#0c0820" />
          </svg>
        </div>
      </section>

      {/* ══ 2. MARQUEE IMAGE STRIP ══ */}
      <section className="py-10 overflow-hidden border-b border-white/5" style={{ background: "#0c0820" }}>
        <div className="flex gap-5">
          {[...marqueeImages, ...marqueeImages].map((src, i) => (
            <motion.div key={i} animate={{ x: [0, -(marqueeImages.length * 415)] }} transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
              className="relative w-[260px] h-[160px] sm:w-[380px] sm:h-[210px] rounded-xl overflow-hidden shrink-0 group">
              <img src={src} alt="" className="w-full h-full object-cover brightness-70 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ 3. STATS BAND ══ */}
      <section className="py-20" style={{ background: "#0c0820" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/8"
            style={{ background: "rgba(255,255,255,0.06)" }}>
            {[
              { val: 30, suffix: "+", label: "Years of Excellence" },
              { val: 50, suffix: "+", label: "Investment Mandates" },
              { val: 98, suffix: "%", label: "Client Retention Rate" },
              { val: 4, suffix: "", label: "Asset Classes" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.09} once={false}>
                <div className="py-8 sm:py-14 flex flex-col items-center justify-center text-center relative group overflow-hidden h-full" style={{ background: "#100828" }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                    style={{ background: `radial-gradient(ellipse at center, ${GOLD}08, transparent)` }} />
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3" style={{ fontFamily: "'Playfair Display', serif", color: GOLD }}>
                    <AnimatedCounter value={stat.val} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.12em] sm:tracking-[0.18em] font-medium px-2">{stat.label}</div>
                  <motion.div className="absolute bottom-0 left-0 h-[2px] origin-left"
                    style={{ background: `linear-gradient(90deg, ${PURPLE}, ${GOLD})` }}
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. SERVICES ══ */}
      <section id="services" className="bg-[#F8F7FF] py-16 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-40" style={{ background: `${PURPLE}0a` }} />
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal className="text-center mb-12 sm:mb-28" once={false}>
            <span className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-5"
              style={{ background: `${PURPLE}12`, color: PURPLE }}>Our Methodology</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-5"
              style={{ fontFamily: "'Playfair Display', serif", color: "#0f0020" }}>Our Core Services</h2>
            <motion.div className="w-24 h-1 mx-auto rounded-full origin-left"
              style={{ background: `linear-gradient(90deg, ${PURPLE}, ${GOLD})` }}
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false }} transition={{ duration: 0.8, delay: 0.3 }} />
          </Reveal>

          <div className="space-y-16 sm:space-y-36">
            {services.map((svc, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} id={`service-${idx}`} className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center scroll-mt-24">
                  <Reveal direction={isEven ? "left" : "right"} delay={0.05} once={false} className={isEven ? "lg:order-1" : "lg:order-2"}>
                    <div className="flex items-center gap-5 mb-5 sm:mb-7">
                      <span className="text-5xl sm:text-7xl font-black leading-none"
                        style={{ fontFamily: "'Playfair Display', serif", WebkitTextStroke: `1px ${PURPLE}30`, color: "transparent" }}>{svc.number}</span>
                    </div>
                    <p className="text-xs font-bold tracking-[0.22em] uppercase mb-3" style={{ color: GOLD }}>{svc.tagline}</p>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif", color: "#0f0020" }}>{svc.title}</h3>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-9">{svc.desc}</p>
                    <ul className="space-y-4">
                      {svc.bullets.map((b, bi) => (
                        <motion.li key={bi} initial={{ opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false, margin: "-40px" }} transition={{ delay: 0.1 + bi * 0.1, duration: 0.5 }}
                          className="flex items-center gap-4">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: GOLD }} />
                          <span className="text-gray-700 font-medium">{b}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal direction={isEven ? "right" : "left"} delay={0.12} once={false} className={isEven ? "lg:order-2" : "lg:order-1"}>
                    <TiltCard className="relative group cursor-pointer">
                      <div className="absolute -inset-5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-600 blur-2xl"
                        style={{ background: `radial-gradient(ellipse, ${svc.accent}55, transparent 70%)` }} />
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-black/5">
                        <div className="absolute top-5 right-5 z-10 w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${svc.accent}, ${svc.accent}99)` }}>{svc.number}</div>
                        <div className="aspect-[4/3] overflow-hidden">
                          <img src={svc.img} alt={svc.title} className="w-full h-full object-cover transition-transform duration-[1.1s] group-hover:scale-105" />
                        </div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: `linear-gradient(to top, ${svc.accent}cc 0%, transparent 55%)` }} />
                        <motion.div className="absolute bottom-0 left-0 right-0 h-1.5 origin-left"
                          style={{ background: `linear-gradient(90deg, ${svc.accent}, ${GOLD})` }}
                          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false }} transition={{ duration: 0.8, delay: 0.35 }} />
                      </div>
                    </TiltCard>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 5. CINEMATIC DIVIDER ══ */}
      <section className="relative h-[45vh] overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2">
          {["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=960&h=700&fit=crop&q=80",
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=960&h=700&fit=crop&q=80"].map((src, i) => (
              <Reveal key={i} direction={i === 0 ? "left" : "right"} delay={i * 0.12} once={false} className="overflow-hidden">
                <img src={src} alt="" className="w-full h-full object-cover brightness-45" />
              </Reveal>
            ))}
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #F8F7FF 0%, transparent 18%, transparent 82%, #f4f6fb 100%)" }} />
        <div className="absolute inset-0 opacity-60" style={{ background: PURPLE }} />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Reveal className="text-center px-6" once={false}>
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: GOLD }}>Where We Invest</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Capital Meets{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, #EDD17A, ${GOLD})` }}>Conviction</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ══ 6. INVESTMENT SECTORS ══ */}
      <SectorsSection />

      {/* ══ 9. COMMITMENT + CTA ══ */}
      <section className="relative py-20 sm:py-36 overflow-hidden bg-black">
        <div className="absolute inset-0 scale-110">
          <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&h=800&fit=crop&q=80"
            alt="Commitment" className="w-full h-full object-cover brightness-25" />
        </div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, #0A0A0Ffc, ${PURPLE}cc, #0A0A0Ffc)` }} />
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full"
            style={{ top: `${10 + i * 9}%`, left: `${3 + i * 9.5}%`, background: GOLD }}
            animate={{ opacity: [0.15, 1, 0.15], scale: [0.7, 1.5, 0.7] }} transition={{ duration: 2.2 + i * 0.35, repeat: Infinity, delay: i * 0.28 }} />
        ))}
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <Reveal once={false}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8"
              style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}30` }}>
              <ShieldCheck className="w-8 h-8" style={{ color: GOLD }} />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}>Interested in Investing With Us?</h2>
            <p className="text-base sm:text-xl text-gray-400 leading-relaxed mb-10 sm:mb-12 font-light max-w-2xl mx-auto">
              Our team is ready to guide you through investment opportunities best suited to your financial goals. Every journey begins with a conversation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <MagneticButton className="inline-block">
                <motion.a href="mailto:info@fundvisercapital.in" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}
                  className="relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 font-bold text-base sm:text-lg rounded-full overflow-hidden group text-gray-900"
                  style={{ background: `linear-gradient(135deg, #EDD17A, ${GOLD})` }}>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity duration-300" />
                  <Mail className="w-5 h-5 relative" />
                  <span className="relative">info@fundvisercapital.in</span>
                </motion.a>
              </MagneticButton>
              <motion.a href="tel:+912231236586" whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-3 px-8 py-4 border font-semibold rounded-full text-white transition-all"
                style={{ borderColor: "rgba(201,160,48,0.35)" }}>
                <Phone className="w-5 h-5" />
                +91-22-31236586
              </motion.a>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} />
              22/7 Manek Mahal, 90 Veer Nariman Road, Churchgate, Mumbai 400020
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
