import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Building2, Gem, TrendingUp, Rocket, ChevronRight,
  MapPin, Phone, Mail,
} from 'lucide-react';


/* ─────────────── Arc maths ─────────────── */
const ARC_CX = 0;   // arc centre X from panel left edge
const ARC_R = 330; // radius (px)
const ANGLE_DEG = 26;  // degrees between sectors

function arcPos(i, progress) {
  const deg = (i - progress) * ANGLE_DEG;
  const rad = deg * (Math.PI / 180);
  return { x: ARC_CX + ARC_R * Math.cos(rad), y: ARC_R * Math.sin(rad), deg };
}

/* ─────────────── Sector data ─────────────── */
const sectors = [
  {
    id: 'real-estate',
    number: '01',
    icon: Building2,
    title: 'Real Estate',
    tagline: 'Building Wealth Through Property',
    accent: '#a855f7',
    accentDark: '#7c3aed',
    color: 'from-[#360153] to-[#5a0280]',
    stat: { value: '5', label: 'Strategies' },
    /* Images */
    mainImage: { src: '/Main_header_building.png', fit: 'cover' },
    subImages: [
      { src: '/SRA.png', label: 'SRA Investments', fit: 'cover' },
      { src: '/Ready_flats.png', label: 'Ready Flats', fit: 'cover' },
      { src: '/commercial_units.png', label: 'Commercial Units', fit: 'cover' },
      { src: '/land_banking.png', label: 'Land Banking', fit: 'cover' },
      { src: '/redevelopment_projects.png', label: 'Redevelopment', fit: 'cover' },
    ],
    summary: 'Comprehensive real estate strategies — from urban redevelopment to premium commercial spaces — crafting investments that generate lasting value across every market cycle.',
    subsectors: [
      { name: 'SRA Investments', description: 'Slum Rehabilitation Authority projects driving urban improvement with strong risk-adjusted returns.' },
      { name: 'Ready Flats', description: 'Fully-developed residential units offering immediate occupancy, stable rental income, and capital appreciation.' },
      { name: 'Commercial Units', description: 'Premium office spaces and retail properties anchored by quality tenants in high-demand locations.' },
      { name: 'Land Banking', description: 'Strategic acquisition of undeveloped land in prime growth corridors for long-term appreciation.' },
      { name: 'Redevelopment Projects', description: 'Transforming existing structures into high-value assets through modern redevelopment.' },
    ],
  },
  {
    id: 'bullion',
    number: '02',
    icon: Gem,
    title: 'Bullion — Gold & Silver',
    tagline: 'Preserving Wealth Across Generations',
    accent: '#f59e0b',
    accentDark: '#d97706',
    color: 'from-yellow-600 to-yellow-800',
    stat: { value: '2', label: 'Precious Metals' },
    mainImage: { src: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=900&h=700&fit=crop&q=80', fit: 'cover' },
    subImages: [
      { src: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=900&h=700&fit=crop&q=80', label: 'Gold', fit: 'cover' },
      { src: './Silver.png', label: 'Silver', fit: 'cover' },
    ],
    summary: 'Precious metals form our bedrock hedge against market volatility and inflation, ensuring wealth preservation through every economic cycle with timeless stability.',
    subsectors: [
      { name: 'Gold', description: 'A timeless store of value and reliable safe-haven asset anchoring our portfolio against macroeconomic uncertainty.' },
      { name: 'Silver', description: 'Industrial demand combined with investment appeal makes silver a dynamic asset for both growth and stability.' },
    ],
  },
  {
    id: 'equities',
    number: '03',
    icon: TrendingUp,
    title: 'Equities',
    tagline: 'Unlocking Value in Public & Private Markets',
    accent: '#10b981',
    accentDark: '#059669',
    color: 'from-emerald-600 to-emerald-800',
    stat: { value: '2', label: 'Market Segments' },
    mainImage: { src: '/capital_markets.jpg', fit: 'cover' },
    subImages: [
      { src: '/Equity_Investments.png', label: 'Listed Companies', fit: 'cover' },
      { src: '/Unlisted_Companies.jpg', label: 'Unlisted Companies', fit: 'cover' },
    ],
    summary: 'Investing across the equity spectrum — from publicly listed companies with strong fundamentals to high-potential private enterprises poised for exponential growth.',
    subsectors: [
      { name: 'Listed Companies', description: 'Publicly traded firms selected through rigorous fundamental analysis, offering liquidity and transparent price discovery.' },
      { name: 'Unlisted Companies', description: 'Early-stage and growth-phase private enterprises where our capital and expertise create outsized returns.' },
    ],
  },
  {
    id: 'startup-vc',
    number: '04',
    icon: Rocket,
    title: 'Startup & VC Investing',
    tagline: 'Backing the Innovators of Tomorrow',
    accent: '#3b82f6',
    accentDark: '#2563eb',
    color: 'from-blue-700 to-blue-900',
    stat: { value: '2+', label: 'Focus Areas' },
    mainImage: { src: '/Early_stage_startups.jpeg', fit: 'cover' },
    subImages: [
      { src: '/Startup.png', label: 'Early-Stage Startups', fit: 'cover' },
      { src: '/Emerging_Technology.jpg', label: 'Emerging Tech', fit: 'cover' },
    ],
    summary: 'Backing visionary founders and emerging technologies — partnering with early-stage companies that have the potential to redefine entire industries and create generational value.',
    subsectors: [
      { name: 'Early-Stage Startups', description: 'Seed and Series A investments in founders building transformative businesses with scalable, defensible models.' },
      { name: 'Emerging Technologies', description: 'Deep-tech, fintech, and platform businesses at the frontier of innovation and market disruption.' },
    ],
  },
];


/* ─────────────── Main Page ─────────────── */
const InvestmentSectors = () => {
  const scrollRef = useRef(null);
  const detailRef = useRef(null);
  const [rawProgress, setRawProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(sectors[0].id);
  const [activeSubsector, setActiveSubsector] = useState(null); // NEW

  const mobileActive = sectors.find(s => s.id === activeTab);

  const handleSelectSector = (id) => {
    setActiveTab(id);
    setActiveSubsector(null); // reset on sector change
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  useEffect(() => {
    const onScroll = () => {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const scrollable = scrollRef.current.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.max(0, Math.min(sectors.length - 1,
        (-rect.top / scrollable) * (sectors.length - 1)));
      setRawProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeIndex = Math.round(rawProgress);
  const active = sectors[activeIndex];

  useEffect(() => {
    setActiveSubsector(null);
  }, [activeIndex]);

  return (
    <div className="min-h-screen" style={{ background: '#f4f6fb' }}>
      <style>{`
        @keyframes sectorIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes subIn0 { from { opacity:0;transform:translateY(14px); } to { opacity:1;transform:none; } }
        @keyframes subIn1 { from { opacity:0;transform:translateY(14px); } to { opacity:1;transform:none; } }
        @keyframes subIn2 { from { opacity:0;transform:translateY(14px); } to { opacity:1;transform:none; } }
        @keyframes subIn3 { from { opacity:0;transform:translateY(14px); } to { opacity:1;transform:none; } }
        @keyframes subIn4 { from { opacity:0;transform:translateY(14px); } to { opacity:1;transform:none; } }
        @keyframes slowZoom { from{transform:scale(1);} to{transform:scale(1.08);} }
        @keyframes floatA { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-18px);} }
        @keyframes floatB { 0%,100%{transform:translateY(0);} 50%{transform:translateY(14px);} }
        @keyframes arcPing { 0%{transform:scale(1);opacity:0.6;} 100%{transform:scale(2.2);opacity:0;} }
        .sector-in  { animation: sectorIn 0.48s cubic-bezier(0.16,1,0.3,1) both; }
        .sub-in-0   { animation: subIn0 0.4s 0.04s cubic-bezier(0.16,1,0.3,1) both; }
        .sub-in-1   { animation: subIn1 0.4s 0.11s cubic-bezier(0.16,1,0.3,1) both; }
        .sub-in-2   { animation: subIn2 0.4s 0.18s cubic-bezier(0.16,1,0.3,1) both; }
        .sub-in-3   { animation: subIn3 0.4s 0.25s cubic-bezier(0.16,1,0.3,1) both; }
        .sub-in-4   { animation: subIn4 0.4s 0.32s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      <Navbar />

      {/* ══ HERO ══ */}
      {/* Hero */}
      <div className="relative pt-1 overflow-hidden bg-gradient-to-br from-slate-900 via-[#360153] to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md text-yellow-400 rounded-full text-sm font-semibold tracking-widest uppercase mb-6 border border-white/20">
            Where We Invest
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Investment{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              Sectors
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We believe that every investment is an opportunity to craft a lasting legacy. Our capital is
            strategically allocated across multiple asset classes for long-term growth and stability.
          </p>
        </div>
        {/* Wave divider */}
        <div className="relative h-16">
          <svg viewBox="0 0 1440 64" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0,64 L1440,64 L1440,0 Q720,64 0,0 Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* ══ DESKTOP: Scroll Journey ══ */}
      <div ref={scrollRef} className="hidden lg:block" style={{ height: `${(sectors.length + 0.5) * 100}vh` }}>
        <div
          className="sticky top-[72px] overflow-hidden"
          style={{ display: 'grid', gridTemplateColumns: '30% 1fr', background: '#ffffff', height: 'calc(100vh - 72px)' }}
        >

          {/* ── LEFT PANEL: same bg as right ── */}
          <div className="relative overflow-hidden" style={{ background: '#ffffff' }}>

            {/* Soft accent glow */}
            <div className="absolute inset-0 pointer-events-none transition-all duration-700"
              style={{
                background: `radial-gradient(ellipse at 70% 50%, ${active.accent}10 0%, transparent 65%)`,
              }}
            />

            {/* Arc decorative ring */}
            <div className="absolute pointer-events-none" style={{
              width: ARC_R * 2,
              height: ARC_R * 2,
              borderRadius: '50%',
              left: ARC_CX - ARC_R,
              top: '50%',
              transform: 'translateY(-50%)',
              border: '1px solid rgba(0,0,0,0.07)',
            }} />
            {/* Inner ring */}
            <div className="absolute pointer-events-none" style={{
              width: ARC_R * 1.45,
              height: ARC_R * 1.45,
              borderRadius: '50%',
              left: ARC_CX - ARC_R * 0.725,
              top: '50%',
              transform: 'translateY(-50%)',
              border: '1px solid rgba(0,0,0,0.03)',
            }} />
            {/* Accent colour ring */}
            <div className="absolute pointer-events-none transition-all duration-700" style={{
              width: ARC_R * 2,
              height: ARC_R * 2,
              borderRadius: '50%',
              left: ARC_CX - ARC_R,
              top: '50%',
              transform: 'translateY(-50%)',
              boxShadow: `inset -10px 0 50px ${active.accent}15`,
            }} />

            {/* ── Left accent spine line ── */}
            <div className="absolute z-10 pointer-events-none" style={{ left: 20, top: '13%', bottom: '13%', width: 2 }}>
              <div className="w-full h-full rounded-full transition-all duration-700"
                style={{ background: `linear-gradient(to bottom, transparent 0%, ${active.accent}50 25%, ${active.accent}80 50%, ${active.accent}50 75%, transparent 100%)` }} />
              {/* Active dot on spine */}
              <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-all duration-500"
                style={{
                  top: `${(activeIndex / (sectors.length - 1)) * 74 + 13}%`,
                  background: active.accent,
                  boxShadow: `0 0 10px ${active.accent}99`,
                  transform: 'translateX(-50%)',
                }} />
            </div>

            {/* ── Heading top-left ── */}
            <div className="absolute top-8 left-10 z-20 select-none" style={{ width: 175 }}>
              <p className="text-[11px] font-black tracking-widest uppercase mb-2 transition-colors duration-500"
                style={{ color: active.accent }}>
                Our Portfolio
              </p>
              <h2 className="text-4xl xl:text-5xl font-black text-gray-900 leading-tight">
                Investment
                <br />
                <span className="text-transparent bg-clip-text transition-all duration-500"
                  style={{ backgroundImage: `linear-gradient(135deg, ${active.accent}, ${active.accentDark})` }}>
                  Sectors
                </span>
              </h2>
              <p className="text-gray-400 text-[11px] mt-2 leading-relaxed">
                Scroll to explore
              </p>
            </div>

            {/* ── Progress bottom-left ── */}
            <div className="absolute bottom-10 left-10 z-20 select-none">
              <p className="text-[11px] font-bold mb-2.5 tracking-wider transition-colors duration-500"
                style={{ color: active.accent }}>
                {active.title}
              </p>
              <p className="text-gray-400 text-[11px] font-bold mb-2 tracking-wider">
                {String(activeIndex + 1).padStart(2, '0')} / {String(sectors.length).padStart(2, '0')}
              </p>
              <div className="flex items-center gap-1.5">
                {sectors.map((_, i) => (
                  <div key={i} className="rounded-full transition-all duration-400" style={{
                    width: i === activeIndex ? '22px' : '6px',
                    height: '6px',
                    background: i === activeIndex ? active.accent : '#d1d5db',
                    boxShadow: i === activeIndex ? `0 0 8px ${active.accent}80` : 'none',
                  }} />
                ))}
              </div>
            </div>

            {/* ── Arc items ── */}
            {sectors.map((s, i) => {
              const { x, y, deg } = arcPos(i, rawProgress);
              if (Math.abs(deg) > 78) return null;

              const isActive = i === activeIndex;
              const dist = Math.abs(i - rawProgress);
              const opacity = isActive ? 1 : Math.max(0.12, 1 - dist * 0.52);
              const Icon = s.icon;

              return (
                <div
                  key={s.id}
                  className="absolute z-10"
                  style={{
                    left: x,
                    top: '50%',
                    transform: `translateY(calc(-50% + ${y}px)) translateX(${isActive ? '-100%' : '0%'})`,
                    opacity,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                  }}
                >
                  {isActive ? (
                    <div style={{ width: 220 }}>
                      <p className="text-xs font-black tracking-widest uppercase mb-3"
                        style={{ color: s.accent }}>{s.tagline}</p>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color} flex-shrink-0`}
                          style={{ boxShadow: `0 6px 20px ${s.accent}40` }}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-gray-900 font-black text-3xl leading-tight">{s.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-5xl font-black" style={{ color: s.accent, lineHeight: 1 }}>
                          {s.number}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${s.color} flex-shrink-0`}
                        style={{ opacity: 0.35 }}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="font-semibold text-xs text-gray-300">{s.title}</span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Active dot on arc */}
            <div className="absolute z-20" style={{
              left: ARC_CX + ARC_R,
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}>
              <div className="absolute inset-0 rounded-full" style={{
                width: 36, height: 36, margin: -13,
                background: active.accent + '18',
                animation: 'arcPing 1.6s ease-out infinite',
              }} />
              <div className="rounded-full relative z-10 transition-all duration-500" style={{
                width: 10, height: 10,
                background: `radial-gradient(circle, #fff 0%, ${active.accent} 70%)`,
                boxShadow: `0 0 12px ${active.accent}cc, 0 0 24px ${active.accent}55`,
              }} />
            </div>

          </div>

          {/* ── RIGHT PANEL: light, spacious ── */}
          <div className="relative overflow-hidden flex flex-col" style={{ background: '#ffffff' }}>


            {/* Ghost number */}
            <div className="absolute right-6 bottom-6 font-black select-none pointer-events-none z-0 transition-all duration-500"
              style={{ fontSize: '200px', lineHeight: 1, color: active.accent + '06', letterSpacing: '-0.05em' }}>
              {active.number}
            </div>

            <div key={activeIndex} className="sector-in flex-1 flex overflow-hidden relative z-10">

              {/* ── Left: subsectors only ── */}
              {/* ── LEFT: subsectors ── */}
              <div className="flex flex-col justify-center px-10 xl:px-14 py-10 overflow-hidden" style={{ width: '44%', flexShrink: 0 }}>
                <div className="space-y-1 pt-4" onMouseLeave={() => setActiveSubsector(null)}>
                  {active.subsectors.map((sub, i) => {
                    const isActiveSub = activeSubsector === i;
                    return (
                      <div
                        key={`${activeIndex}-${i}`}
                        className={`sub-in-${i} flex items-start gap-4 rounded-xl cursor-default transition-all duration-200`}
                        style={{
                          padding: '10px 12px',
                          border: `1.5px solid ${isActiveSub ? active.accent : 'transparent'}`,
                          background: isActiveSub ? active.accent + '12' : 'transparent',
                        }}
                        onMouseEnter={() => setActiveSubsector(i)}
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
                          style={{ background: isActiveSub ? active.accent : active.accent + '18' }}
                        >
                          <div
                            className="w-2 h-2 rounded-full transition-all duration-200"
                            style={{ background: isActiveSub ? '#fff' : active.accent }}
                          />
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

              {/* ── RIGHT: image + summary ── */}
              <div className="flex-1 min-w-0 flex flex-col items-center justify-center p-8 pl-2 gap-4">

                {/* Image area */}
                <div
                  className="relative overflow-hidden rounded-2xl sector-in"
                  style={{
                    width: '72%',
                    aspectRatio: '1 / 1',
                    maxHeight: 'calc(100vh - 310px)',
                    flexShrink: 0,
                  }}
                >
                  {/* Main image (shown when no subsector selected) */}
                  <img
                    key={activeSubsector === null ? `main-${activeIndex}` : `sub-${activeIndex}-${activeSubsector}`}
                    src={
                      activeSubsector !== null && active.subImages?.[activeSubsector]
                        ? active.subImages[activeSubsector].src
                        : active.mainImage.src
                    }
                    alt={
                      activeSubsector !== null && active.subImages?.[activeSubsector]
                        ? active.subImages[activeSubsector].label
                        : active.title
                    }
                    className="w-full h-full sector-in"
                    style={{
                      objectFit:
                        activeSubsector !== null && active.subImages?.[activeSubsector]?.fit
                          ? active.subImages[activeSubsector].fit
                          : active.mainImage.fit || 'cover',
                      objectPosition: 'center',
                      background:
                        activeSubsector !== null && active.subImages?.[activeSubsector]?.bg
                          ? active.subImages[activeSubsector].bg
                          : '#ddd',
                    }}
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `linear-gradient(160deg, ${active.accent}18 0%, transparent 45%, rgba(0,0,0,0.22) 100%)`,
                    }}
                  />

                  {/* Label pill — shows subsector name or sector name */}
                  <div className="absolute bottom-4 left-4">
                    <span
                      className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.88)',
                        color: active.accent,
                        border: `1px solid ${active.accent}30`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: active.accent }}
                      />
                      {activeSubsector !== null && active.subImages?.[activeSubsector]
                        ? active.subImages[activeSubsector].label
                        : active.title}
                    </span>
                  </div>
                </div>

                {/* ── Enhanced info panel below image ── */}
                <div className="sector-in" style={{ width: '72%' }}>

                  {/* Header row: label + stat chip */}
                  <div className="flex items-center justify-between mb-3">
                    {/* <div className="flex items-center gap-2">
                      <div className="w-5 h-[2px] rounded-full transition-all duration-500"
                        style={{ background: active.accent }} />
                      <span className="text-[11px] font-black tracking-widest uppercase transition-colors duration-500"
                        style={{ color: active.accent }}>
                        {activeSubsector !== null
                          ? active.subsectors[activeSubsector].name
                          : active.title}
                      </span>
                    </div> */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider"
                      style={{
                        background: active.accent + '12',
                        color: active.accent,
                        border: `1px solid ${active.accent}25`,
                      }}>
                      <span className="w-1 h-1 rounded-full" style={{ background: active.accent }} />
                      {active.stat.value} {active.stat.label}
                    </span>
                  </div>

                  {/* Summary card with accent left-border */}
                  <div className="relative rounded-xl px-4 py-3 overflow-hidden transition-all duration-500"
                    style={{
                      background: active.accent + '07',
                      borderLeft: `3px solid ${active.accent}`,
                    }}>
                    {/* Subtle corner glow */}
                    <div className="absolute top-0 right-0 w-16 h-16 rounded-full pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${active.accent}18 0%, transparent 70%)`,
                        transform: 'translate(30%, -30%)',
                      }} />
                    <p className="relative text-sm leading-relaxed transition-all duration-300"
                      style={{ color: '#4b5563', fontWeight: 500 }}>
                      {activeSubsector !== null && active.subsectors?.[activeSubsector]
                        ? active.subsectors[activeSubsector].description
                        : active.summary}
                    </p>
                  </div>

                  {/* Subsector progress dots */}
                  <div className="flex items-center justify-center gap-2 mt-3">
                    {active.subsectors.map((sub, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSubsector(activeSubsector === i ? null : i)}
                        title={sub.name}
                        className="rounded-full transition-all duration-300 focus:outline-none"
                        style={{
                          width: activeSubsector === i ? 20 : 7,
                          height: 7,
                          background: activeSubsector === i ? active.accent : active.accent + '30',
                          boxShadow: activeSubsector === i ? `0 0 8px ${active.accent}70` : 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ══ MOBILE / TABLET: Enhanced Design ══ */}
      <div className="lg:hidden" style={{ background: '#f4f6fb' }}>

        {/* ── Header ── */}
        <div className="px-5 pt-10 pb-2 text-center">
          <p className="text-[11px] font-black tracking-widest uppercase mb-2 transition-colors duration-500"
            style={{ color: mobileActive.accent }}>
            Our Portfolio
          </p>
          <h2 className="text-3xl font-black text-gray-900 mb-1">
            Investment{' '}
            <span className="transition-colors duration-500" style={{ color: mobileActive.accent }}>Sectors</span>
          </h2>
          <p className="text-gray-400 text-sm">Tap a sector to explore in depth</p>
        </div>

        {/* ── Horizontal scrolling sector tabs ── */}
        <div className="px-5 py-5 flex gap-3 overflow-x-auto"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {sectors.map(s => {
            const Icon = s.icon;
            const isActive = s.id === activeTab;
            return (
              <button
                key={s.id}
                onClick={() => handleSelectSector(s.id)}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300"
                style={{
                  background: isActive ? s.accent : '#fff',
                  border: `1.5px solid ${isActive ? s.accent : '#e5e7eb'}`,
                  boxShadow: isActive ? `0 4px 18px ${s.accent}40` : '0 1px 4px rgba(0,0,0,0.06)',
                  color: isActive ? '#fff' : '#374151',
                  transform: isActive ? 'translateY(-2px)' : 'none',
                }}
              >
                <Icon style={{ width: 15, height: 15, flexShrink: 0 }} />
                <span className="text-sm font-bold whitespace-nowrap">{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* ── Sector detail ── */}
        <div ref={detailRef} className="px-4 md:px-6 pb-12">

          {/* md+: side-by-side; mobile: stacked */}
          <div className="md:grid md:grid-cols-5 md:gap-6 md:items-start">

            {/* ── Image card ── */}
            <div className="md:col-span-2 relative rounded-3xl overflow-hidden mb-5 md:mb-0"
              style={{ aspectRatio: '4/3' }}>
              <img
                key={activeTab}
                src={
                  activeSubsector !== null && mobileActive.subImages?.[activeSubsector]
                    ? mobileActive.subImages[activeSubsector].src
                    : mobileActive.mainImage.src
                }
                alt={mobileActive.title}
                className="w-full h-full sector-in"
                style={{
                  objectFit: 'cover', objectPosition: 'center',
                  background: '#ddd',
                }}
              />
              {/* Dark gradient */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to top, rgba(10,3,20,0.92) 0%, rgba(10,3,20,0.35) 55%, transparent 100%)',
              }} />
              {/* Accent tint */}
              <div className="absolute inset-0 transition-all duration-500" style={{
                background: `linear-gradient(135deg, ${mobileActive.accent}22 0%, transparent 60%)`,
              }} />
              {/* Ghost number */}
              <div className="absolute right-4 top-3 font-black select-none pointer-events-none transition-colors duration-500"
                style={{ fontSize: 88, lineHeight: 1, color: 'rgba(255,255,255,0.08)', letterSpacing: '-0.05em' }}>
                {mobileActive.number}
              </div>
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded-lg bg-gradient-to-br ${mobileActive.color} flex-shrink-0`}>
                    <mobileActive.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] font-black tracking-widest uppercase transition-colors duration-500"
                    style={{ color: mobileActive.accent }}>
                    {mobileActive.number} / 0{sectors.length}
                  </span>
                </div>
                <h3 className="text-white font-black text-2xl leading-tight mb-0.5">{mobileActive.title}</h3>
                <p className="text-xs font-semibold transition-colors duration-500"
                  style={{ color: mobileActive.accent }}>{mobileActive.tagline}</p>
              </div>
              {/* Subsector image label pill */}
              {activeSubsector !== null && mobileActive.subImages?.[activeSubsector] && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-wider"
                    style={{
                      background: 'rgba(255,255,255,0.9)',
                      color: mobileActive.accent,
                      border: `1px solid ${mobileActive.accent}30`,
                    }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: mobileActive.accent }} />
                    {mobileActive.subImages[activeSubsector].label}
                  </span>
                </div>
              )}
            </div>

            {/* ── Right: summary + subsectors ── */}
            <div className="md:col-span-3 flex flex-col gap-4">

              {/* Summary card */}
              <div className="rounded-2xl p-5 transition-all duration-500"
                style={{
                  background: '#fff',
                  borderLeft: `4px solid ${mobileActive.accent}`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.06)`,
                }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${mobileActive.accent}40, transparent)` }} />
                  <span className="text-[10px] font-black tracking-widest uppercase transition-colors duration-500"
                    style={{ color: mobileActive.accent }}>
                    Overview
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{mobileActive.summary}</p>
                {/* Stat chip */}
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{
                    background: mobileActive.accent + '12',
                    border: `1px solid ${mobileActive.accent}25`,
                  }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: mobileActive.accent }} />
                  <span className="text-[11px] font-black transition-colors duration-500"
                    style={{ color: mobileActive.accent }}>
                    {mobileActive.stat.value} {mobileActive.stat.label}
                  </span>
                </div>
              </div>

              {/* Subsectors accordion */}
              <div className="space-y-2.5">
                <p className="text-[10px] font-black tracking-widest uppercase px-1 transition-colors duration-500"
                  style={{ color: mobileActive.accent }}>
                  Investment Areas
                </p>
                {mobileActive.subsectors.map((sub, i) => {
                  const subImg = mobileActive.subImages?.[i];
                  const isActiveSub = activeSubsector === i;
                  return (
                    <div
                      key={`${activeTab}-${i}`}
                      className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
                      style={{
                        background: '#fff',
                        border: `1.5px solid ${isActiveSub ? mobileActive.accent : '#eee'}`,
                        boxShadow: isActiveSub
                          ? `0 6px 24px ${mobileActive.accent}22`
                          : '0 1px 6px rgba(0,0,0,0.05)',
                      }}
                      onClick={() => setActiveSubsector(isActiveSub ? null : i)}
                    >
                      {/* Row header */}
                      <div className="flex items-center gap-3 p-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                          style={{ background: isActiveSub ? mobileActive.accent : mobileActive.accent + '18' }}>
                          <div className="w-2 h-2 rounded-full transition-all duration-300"
                            style={{ background: isActiveSub ? '#fff' : mobileActive.accent }} />
                        </div>
                        <p className="text-gray-900 font-black text-sm flex-1 leading-tight">{sub.name}</p>
                        <ChevronRight
                          className="w-4 h-4 flex-shrink-0 transition-all duration-300"
                          style={{
                            color: mobileActive.accent,
                            transform: isActiveSub ? 'rotate(90deg)' : 'none',
                          }}
                        />
                      </div>

                      {/* Expanded body */}
                      {isActiveSub && (
                        <div className="px-4 pb-4">
                          {subImg && (
                            <div className="rounded-xl overflow-hidden mb-3" style={{ height: 150 }}>
                              <img
                                src={subImg.src} alt={subImg.label}
                                className="w-full h-full"
                                style={{ objectFit: subImg.fit || 'cover', objectPosition: 'center' }}
                              />
                            </div>
                          )}
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

      {/* ══ CTA ══ */}
      <div className="relative py-24 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0020 0%, #1a002b 50%, #0f0020 100%)' }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute inset-0 overflow-hidden">
          <img src="/Main_header_building.png" alt=""
            className="w-full h-full object-cover opacity-[0.05]"
            style={{ animation: 'slowZoom 20s ease-in-out infinite alternate' }} />
        </div>
        <div className="absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-[#360153] filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-10 right-1/4 w-56 h-56 rounded-full bg-yellow-600 filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 text-yellow-400 rounded-full text-xs font-black tracking-widest uppercase mb-8 backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" />
            Fundviser Capital
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">Interested in Investing With Us?</h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            Our team is ready to guide you through investment opportunities best suited to your financial goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:info@fundvisercapital.in"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-xl font-black shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5">
              <Mail className="w-5 h-5" />
              info@fundvisercapital.in
            </a>
            <a href="tel:+912231236586"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105">
              <Phone className="w-5 h-5" />
              +91-22-31236586
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 mt-8 text-gray-500 text-sm">
            <MapPin className="w-4 h-4" />
            22/7 Manek Mahal, 90 Veer Nariman Road, Churchgate, Mumbai 400020
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InvestmentSectors;
