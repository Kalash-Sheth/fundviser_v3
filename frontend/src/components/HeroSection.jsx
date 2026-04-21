import React, { useState, useEffect, useRef } from 'react';
import {
  TrendingUp, Building2, Target, ArrowRight,
  Shield, BarChart2, Globe, ChevronLeft, ChevronRight,
  CheckCircle2, Network,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/*
  Brand palette — two logo colours used throughout.
  Primary : #5c21c7  (deep brand violet)
  Dark    : #1e1b4b  (deep navy — headings, body text)
  All slides share the same accent; only content changes per slide.
*/
const BRAND = {
  accent:      '#360153',
  accentRgb:   '92,33,199',
  accentLight: '#ede9fe',
  accentMid:   '#cd9623',
};

/* ─── Slide data ──────────────────────────────────────────────── */
const slides = [
  {
    icon: Target,
    tag: 'Strategic Growth',
    headline: ['Capital Deployed', 'with Purpose and', 'Precision'],
    body: 'Our structured financial products and advisory services are built for institutional resilience — combining global perspective with deep local intelligence.',
    cta: 'Our Business',
    ctaLink: '/what-we-do',
    ...BRAND,
    mainImage: '/z_17.png',
    mainImage2: '/p_11.png',
    details: [
      { label: 'Strategy',   value: 'Value Creation' },
      { label: 'Approach',   value: 'Institutional Grade' },
      { label: 'Structure',   value: 'Integrated Business Model' },
      { label: 'Governance', value: 'Strong Compliance Standards' },
    ],
    statValue: 'Structured Solutions',
    statLabel: 'Capital Framework',
    returnValue: 'Integrated',
    returnLabel: 'Operating Structure',
    sectors: ['Financial Advisory', 'Fund Structuring', 'Emerging Businesses', 'Sustainability'],
  },
    {
    icon: Building2,
    tag: 'Multi-Sector Verticals',
    headline: ['Real Estate.', 'Equities. Bullion.', 'Ventures.'],
    body: 'A diversified investment portfolio built for long-term capital appreciation and income generation, spanning four distinct verticals, each chosen for its compounding potential and alignment with India\'s growth story.',
    cta: 'View Investment Sectors',
    ctaLink: '/investment-sectors',
    ...BRAND,
    mainImage: '/Main_header_building.png',
    mainImage2: '/commercial_units.png',
    details: [
      { label: 'Strategy',   value: 'Multi-Sector Diversified' },
      { label: 'Verticals',  value: '4 Active Asset Classes' },
      { label: 'Approach',    value: 'Research-Driven' },
      { label: 'Objective',  value: 'Long-Term Appreciation' },
    ],
    statValue: '4 Verticals',
    statLabel: 'Diversified Portfolio',
    returnValue: 'Compliance',
    returnLabel: 'Regulatory Aligned',
    sectors: ['Real Estate', 'Equities', 'Bullions', 'Ventures'],
  },
  {
    icon: Network,
    tag: 'Our Subsidiaries',
    headline: ['Subsidiaries', 'Built for', 'Diversification'],
    body: 'Three focused subsidiaries spanning cinema, commodity trading, and global logistics — each independently operated, collectively strengthening the Fundviser Capital across diverse sectors.',
    cta: 'Our Subsidiaries',
    ctaLink: '/our-subsidiaries',
    ...BRAND,
    mainImage: '/subs_3.png',
    mainImage2: '/subs_4.png',
    logos: [
      { src: '/starlight-logo-new.png', name: 'Starlight Box Theatres' },
      { src: '/silver_sage_logo.png',   name: 'Silver Sage Trading' },
      { src: '/dars_logo.png',          name: 'DARS Transtrade' },
    ],
    details: [
      { label: 'Starlight Box Theatres', value: 'Cinema & Entertainment' },
      { label: 'Silver Sage Trading',    value: 'Commodity Trading' },
      { label: 'DARS Transtrade',        value: 'Trade & Logistics' },
    ],
    statValue: '3',
    statLabel: 'Active Subsidiaries',
    returnValue: 'Diverse',
    returnLabel: 'Sector Operations',
    sectors: ['Cinema & Entertainment', 'Commodity Trading', 'Trade & Logistics', 'Emerging Ventures'],
  },
  //   {
  //   icon: TrendingUp,
  //   tag: 'Capital Markets',
  //   headline: ['Maximize Returns', 'Through Profound', 'Market Knowledge'],
  //   body: 'We deploy strategic capital across high-growth equity and commodity markets, leveraging decades of expertise to generate consistent, risk-adjusted returns for our stakeholders.',
  //   cta: 'Explore Opportunities',
  //   ctaLink: '/investment-sectors',
  //   ...BRAND,
  //   mainImage: '/capital_market2.jpg',
  //   mainImage2: '/Market_Int.png',
  //   details: [
  //     { label: 'Segment',    value: 'Equity & Commodity' },
  //     { label: 'Approach',    value: 'Research-Driven' },
  //     { label: 'Experience', value: '30+ Years' },
  //     { label: 'Status',     value: 'SEBI Compliant' },
  //   ],
  //   statValue: '30+',
  //   statLabel: 'Years in Capital Markets',
  //   returnValue: 'Compliance',
  //   returnLabel: 'Regulatory Aligned',
  //   sectors: ['Equity Investments', 'Commodities', 'Unlisted Securities', 'Early-Stage Startups'],
  // },
];

/* ─── Left-side metrics row ───────────────────────────────────── */
const metrics = [
  { icon: BarChart2, value: 'BSE Listed',  label: 'Code 530197' },
  { icon: Shield,   value: '30+ Years',   label: 'Market Experience' },
  { icon: Globe,    value: 'Diversified',  label: 'Portfolio' },
];

/*
  card3D — the shared shell for every card in the 3D panel.
  The box-shadow includes a "-8px 8px" offset that simulates the
  visible left-bottom edge of the card when it's rotated in 3D
  (the "side face" you see in the reference image).
*/
const card3D = {
  background: '#ffffff',
  borderRadius: '16px',
  border: '1px solid rgba(218,224,235,0.85)',
  boxShadow:
    '-8px 8px 0px rgba(180,190,210,0.35), ' +
    '0 12px 28px rgba(0,0,0,0.10), ' +
    '0 3px 6px rgba(0,0,0,0.05)',
};

/* ══════════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const [current, setCurrent]     = useState(0);
  const [, setPrev]               = useState(null);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [textIn,  setTextIn]      = useState(true);
  const [cardsIn, setCardsIn]     = useState(true);

  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const DURATION    = 6000;

  const startTimer = () => {
    clearInterval(intervalRef.current);
    clearInterval(progressRef.current);
    setProgress(0);
    const step = 100 / (DURATION / 50);
    progressRef.current = setInterval(() => setProgress(p => Math.min(p + step, 100)), 50);
    intervalRef.current = setInterval(() => navigate('next'), DURATION);
  };

  const navigate = (dir, target) => {
    if (animating) return;
    setAnimating(true);
    setTextIn(false);
    setCardsIn(false);
    setTimeout(() => {
      setPrev(current);
      setCurrent(prev => {
        if (target !== undefined) return target;
        return dir === 'next'
          ? (prev + 1) % slides.length
          : (prev - 1 + slides.length) % slides.length;
      });
      setAnimating(false);
      setTimeout(() => { setTextIn(true); setCardsIn(true); }, 60);
    }, 450);
    startTimer();
  };

  const goToIndex = i => { if (i !== current) navigate(null, i); };

  useEffect(() => {
    setTextIn(true);
    setCardsIn(true);
    startTimer();
    return () => { clearInterval(intervalRef.current); clearInterval(progressRef.current); };
  }, []); // eslint-disable-line

  const slide = slides[current];

  /* ease helper */
  const ease = (delay, extra = '') =>
    `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms${extra ? ', ' + extra : ''}`;

  /* card fade transition */
  const cardFade = delay => ({
    opacity:    cardsIn ? 1 : 0,
    transition: `opacity 0.55s ease ${delay}ms`,
  });

  return (
    <div
      className="relative lg:min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #0f0225 0%, #1c0840 55%, #110230 100%)' }}
    >
      {/* ── Background ambience ────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main purple glow — top right */}
        <div style={{
          position: 'absolute', top: '-12%', right: '-4%',
          width: 820, height: 820,
          background: `radial-gradient(circle, rgba(90,2,140,0.45) 0%, rgba(54,1,83,0.18) 45%, transparent 70%)`,
          transition: 'background 1.3s ease',
        }} />
        {/* Gold shimmer — bottom left */}
        <div style={{
          position: 'absolute', bottom: '-18%', left: '-10%',
          width: 640, height: 640,
          background: 'radial-gradient(circle, rgba(205,150,35,0.14) 0%, transparent 65%)',
        }} />
        {/* Mid-purple soft orb behind cards */}
        <div style={{
          position: 'absolute', top: '20%', right: '20%',
          width: 480, height: 480,
          background: 'radial-gradient(circle, rgba(54,1,83,0.22) 0%, transparent 65%)',
        }} />
        {/* dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }} />
        {/* Vignette edges */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(8,1,20,0.55) 100%)',
        }} />
      </div>

      {/* ── Mobile progress line ───────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-30 flex lg:hidden h-[3px] bg-slate-200">
        {slides.map((s, i) => (
          <div key={i} className="flex-1 relative overflow-hidden"
            style={{ background: i < current ? s.accent : 'transparent' }}>
            {i === current && (
              <div className="absolute inset-0"
                style={{ width: `${progress}%`, background: s.accent, transition: 'width 0.05s linear' }} />
            )}
          </div>
        ))}
      </div>

      {/* ── Main layout ────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 w-full pt-14 pb-20 sm:pt-20 sm:pb-10">
          <div className="grid lg:grid-cols-2 gap-8 xl:gap-16 items-center">

            {/* ══ LEFT — Content ════════════════════════════════ */}
            <div className="flex flex-col">

              {/* Tag */}
              <div
                className="inline-flex items-center gap-2 self-start mb-5 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.16em] uppercase"
                style={{
                  background: 'rgba(205,150,35,0.12)',
                  border: '1px solid rgba(205,150,35,0.30)',
                  color: '#e8b84b',
                  opacity: textIn ? 1 : 0,
                  transform: textIn ? 'translateY(0)' : 'translateY(-14px)',
                  transition: ease(0),
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e8b84b', display: 'inline-block' }} />
                {slide.tag}
              </div>

              {/* Headline */}
              <div className="mb-5 space-y-0.5">
                {slide.headline.map((line, li) => (
                  <h1
                    key={`${current}-${li}`}
                    className="font-black leading-[1.05] tracking-tight"
                    style={{
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
                      fontSize: 'clamp(1.95rem, 4.2vw, 3.7rem)',
                      /* all lines: purple-to-gold shimmer gradient text */
                      background: 'linear-gradient(135deg, #ffffff 0%, #e8d8ff 40%, #e8b84b 75%, #f0c860 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      opacity: textIn ? 1 : 0,
                      transform: textIn ? 'translateY(0)' : 'translateY(28px)',
                      transition: ease(70 + li * 85),
                    }}
                  >
                    {line}
                  </h1>
                ))}
              </div>

              {/* Body */}
              <p
                className="text-sm sm:text-base leading-relaxed mb-7 max-w-lg"
                style={{
                  color: 'rgba(220,210,240,0.72)',
                  opacity: textIn ? 1 : 0,
                  transform: textIn ? 'translateY(0)' : 'translateY(18px)',
                  transition: ease(340),
                }}
              >
                {slide.body}
              </p>

              {/* CTAs + slide indicator */}
              <div
                style={{
                  opacity: textIn ? 1 : 0,
                  transform: textIn ? 'translateY(0)' : 'translateY(14px)',
                  transition: ease(430),
                  marginBottom: '2.25rem',
                }}
              >
                {/* Buttons */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <Link
                    to={slide.ctaLink}
                    className="group inline-flex items-center gap-2.5 px-5 sm:px-7 py-3.5 rounded-xl font-bold text-[14px] sm:text-[15px] hover:scale-105 hover:-translate-y-0.5"
                    style={{
                      background: 'linear-gradient(135deg, #cd9623, #e8b84b)',
                      color: '#1a0030',
                      boxShadow: '0 8px 28px rgba(205,150,35,0.40)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                  >
                    {slide.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link
                    to="/the-firm"
                    className="inline-flex items-center gap-2 px-5 sm:px-7 py-3.5 rounded-xl font-bold text-[14px] sm:text-[15px] hover:scale-105 transition-all duration-200"
                    style={{ color: 'rgba(255,255,255,0.88)', border: '1px solid rgba(255,255,255,0.28)', background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}
                  >
                    About the Firm
                  </Link>
                </div>

                {/* Slide indicator: dots · 01/03 · arrows */}
                <div className="flex items-center gap-3">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToIndex(i)}
                      style={{
                        height: 4, width: current === i ? 20 : 4,
                        borderRadius: 4,
                        background: current === i ? slide.accent : '#d1d5db',
                        border: 'none', padding: 0, cursor: 'pointer',
                        transition: 'width 0.4s ease, background 0.8s ease',
                        flexShrink: 0,
                      }}
                    />
                  ))}
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.40)', fontWeight: 600, letterSpacing: '0.06em', fontVariantNumeric: 'tabular-nums' }}>
                    {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                  </span>
                  <div className="flex gap-1">
                    {[{ dir: 'prev', Icon: ChevronLeft }, { dir: 'next', Icon: ChevronRight }].map(({ dir, Icon }) => (
                      <button
                        key={dir}
                        onClick={() => navigate(dir)}
                        className="w-6 h-6 rounded-md flex items-center justify-center transition-all duration-150"
                        style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)' }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.55)' }} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-10 h-px mb-7" style={{ background: 'linear-gradient(to right, rgba(205,150,35,0.7), transparent)' }} />

              {/* Metrics */}
              <div
                className="flex flex-wrap gap-5 sm:gap-7"
                style={{ opacity: textIn ? 1 : 0, transition: ease(520) }}
              >
                {metrics.map((m, i) => {
                  const MIcon = m.icon;
                  return (
                    <div key={i} className="flex items-center gap-2.5 group cursor-default">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                        style={{ background: 'rgba(205,150,35,0.12)', border: '1px solid rgba(205,150,35,0.28)' }}
                      >
                        <MIcon className="w-4 h-4" style={{ color: '#e8b84b' }} />
                      </div>
                      <div>
                        <p className="font-bold text-sm leading-none mb-0.5" style={{ color: 'rgba(255,255,255,0.90)' }}>
                          {m.value}
                        </p>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.42)' }}>
                          {m.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ══ RIGHT — 3D Card Grid ══════════════════════════
                Layout: two flex rows inside a perspective-tilted
                group. Flex = no overlap. The group's rotateY(-26deg)
                makes each card's left face visible (reference look).
                The card3D boxShadow adds a "-8px 8px" offset that
                draws the visible side edge on every card.
            ════════════════════════════════════════════════════ */}
            <div className="hidden lg:flex items-center justify-center" style={{ marginTop: '-32px' }}>
              {/* perspectiveOrigin pushed far right → left edge of
                  every card appears closest to the viewer           */}
              <div style={{ perspective: '950px', perspectiveOrigin: '94% 44%' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                    animation: 'heroGroupFloat 9s ease-in-out infinite',
                  }}
                >

                  {/* ── ROW 1: Company | Hero Image | Sectors ─────── */}
                  <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>

                    {/* CARD A — Company profile */}
                    <div style={{ width: 172, flexShrink: 0, ...cardFade(80) }}>
                      <div style={{ ...card3D, padding: '18px 17px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 11 }}>
                          <div style={{
                            width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                            background: slide.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'background 0.8s',
                          }}>
                            <Building2 style={{ width: 15, height: 15, color: slide.accent, transition: 'color 0.8s' }} />
                          </div>
                          <div>
                            <p style={{ fontSize: 10.5, fontWeight: 800, color: '#1e1b4b', margin: 0, lineHeight: 1.2 }}>Fundviser</p>
                            <p style={{ fontSize: 9.5, color: '#94a3b8', margin: 0 }}>Capital India</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {[['Est.', '1993'], ['BSE', '530197'], ['Rating', 'Investment']].map(([k, v]) => (
                            <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ fontSize: 9.5, color: '#94a3b8' }}>{k}</span>
                              <span style={{ fontSize: 9.5, fontWeight: 700, color: '#1e1b4b' }}>{v}</span>
                            </div>
                          ))}
                          <div style={{ height: 1, background: '#f1f5f9' }} />
                          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            <span style={{ width: 6, height: 6, background: '#10b981', borderRadius: '50%', display: 'inline-block', animation: 'heroPulse 2s ease-in-out infinite', flexShrink: 0 }} />
                            <span style={{ fontSize: 9.5, fontWeight: 600, color: '#10b981' }}>Live on BSE</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CARD B — Main hero image card */}
                    <div style={{ width: 300, flexShrink: 0, ...cardFade(160) }}>
                      <div style={{ ...card3D, borderRadius: 18, overflow: 'hidden' }}>
                        {/* Image area — logos grid for subsidiaries slide, image for others */}
                        {slide.logos ? (
                          <div style={{
                            display: 'flex', flexDirection: 'column', gap: 0,
                            background: '#fff', minHeight: 195,
                          }}>
                            {slide.logos.map((logo, li) => (
                              <div key={li} style={{
                                flex: 1,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                padding: '18px 24px',
                                borderBottom: li < slide.logos.length - 1 ? '1px solid #f1f5f9' : 'none',
                              }}>
                                <img
                                  src={logo.src}
                                  alt={logo.name}
                                  style={{ maxHeight: 68, maxWidth: '85%', objectFit: 'contain' }}
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ position: 'relative', height: 195, overflow: 'hidden', borderTopLeftRadius: 17, borderTopRightRadius: 17 }}>
                            {slides.map((s, i) => (
                              <img key={i} src={s.mainImage} alt={s.tag}
                                style={{
                                  position: 'absolute', inset: 0,
                                  width: '100%', height: '100%', objectFit: 'cover',
                                  opacity: current === i ? 1 : 0,
                                  transform: current === i ? 'scale(1.06)' : 'scale(1)',
                                  transition: 'opacity 1s ease, transform 9s ease',
                                }}
                              />
                            ))}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.40) 0%, transparent 60%)' }} />
                            <span style={{
                              position: 'absolute', top: 10, left: 10,
                              display: 'inline-flex', alignItems: 'center', gap: 5,
                              background: 'rgba(255,255,255,0.90)', backdropFilter: 'blur(8px)',
                              color: slide.accent, padding: '3px 9px', borderRadius: 20,
                              fontSize: 9.5, fontWeight: 700, transition: 'color 0.8s',
                            }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: slide.accent, display: 'inline-block', transition: 'background 0.8s' }} />
                              {slide.tag}
                            </span>
                          </div>
                        )}
                        {/* Body — hidden on subsidiaries slide */}
                        {!slide.logos && (
                          <div style={{ padding: '14px 16px 16px' }}>
                            <p style={{ fontSize: 17, fontWeight: 800, color: '#1e1b4b', margin: '0 0 2px', lineHeight: 1.2 }}>
                              {slide.statValue}
                            </p>
                            <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 12px' }}>{slide.statLabel}</p>
                            <div style={{ height: 3, background: '#f1f5f9', borderRadius: 3 }}>
                              <div style={{
                                height: '100%', width: `${progress}%`,
                                background: `linear-gradient(90deg, ${slide.accent}, rgba(${slide.accentRgb},0.5))`,
                                borderRadius: 3, transition: 'width 0.05s linear, background 1s',
                              }} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CARD C — Our Sectors list */}
                    <div style={{ width: 192, flexShrink: 0, ...cardFade(240) }}>
                      <div style={{ ...card3D, padding: '16px 15px' }}>
                        <p style={{ fontSize: 9.5, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 10px' }}>
                          Our Sectors
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {slide.sectors.map((sector, si) => (
                            <div key={si} style={{
                              display: 'flex', alignItems: 'center', gap: 7,
                              padding: '6px 9px', borderRadius: 9,
                              background: si === 0 ? slide.accentLight : '#f8fafc',
                              border: `1px solid ${si === 0 ? slide.accent : '#f1f5f9'}`,
                              transition: 'background 0.8s, border-color 0.8s',
                            }}>
                              <span style={{
                                width: 5, height: 5, borderRadius: '50%', flexShrink: 0,
                                background: si === 0 ? slide.accent : '#cbd5e1',
                                transition: 'background 0.8s',
                              }} />
                              <span style={{ fontSize: 10, fontWeight: si === 0 ? 700 : 500, color: si === 0 ? slide.accent : '#64748b', transition: 'color 0.8s', lineHeight: 1.3 }}>
                                {sector}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>{/* end ROW 1 */}

                  {/* ── ROW 2: Investment Details | Returns Badge ─── */}
                  <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', paddingLeft: 20 }}>

                    {/* CARD D — Investment overview / "Authorize payment" style */}
                    <div style={{ width: 328, flexShrink: 0, ...cardFade(320) }}>
                      <div style={{ ...card3D, padding: '17px 20px 19px' }}>
                        <p style={{ fontSize: 10.5, fontWeight: 700, color: '#1e1b4b', margin: '0 0 11px', letterSpacing: '0.03em' }}>
                          Investment Overview
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                          {slide.details.map((row, ri) => (
                            <div key={ri} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: 10.5, color: '#94a3b8' }}>{row.label}</span>
                              <span style={{ fontSize: 10.5, fontWeight: 700, color: ri === 3 ? slide.accent : '#1e1b4b', transition: 'color 0.8s' }}>
                                {row.value}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div style={{ height: 1, background: '#f1f5f9', margin: '11px 0 9px' }} />
                        <div style={{
                          width: '100%', padding: '8px 0',
                          background: slide.accent, borderRadius: 9,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          transition: 'background 0.8s',
                        }}>
                          <CheckCircle2 style={{ width: 12, height: 12, color: 'white' }} />
                          <span style={{ fontSize: 10.5, fontWeight: 700, color: 'white' }}>Confirmed Investment</span>
                        </div>
                      </div>
                    </div>

                    {/* CARD E — Returns badge (smaller) */}
                    <div style={{ width: 120, flexShrink: 0, ...cardFade(400) }}>
                      <div style={{
                        ...card3D,
                        padding: '14px 11px',
                        textAlign: 'center',
                        background: slide.accentLight,
                        border: `1px solid ${slide.accent}`,
                        boxShadow: card3D.boxShadow,
                        transition: 'background 0.8s, border-color 0.8s',
                      }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: '50%',
                          background: slide.accent,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          margin: '0 auto 9px',
                          boxShadow: `0 6px 16px rgba(${slide.accentRgb},0.38)`,
                          transition: 'background 0.8s, box-shadow 0.8s',
                        }}>
                          <CheckCircle2 style={{ width: 15, height: 15, color: 'white' }} />
                        </div>
                        <p style={{ fontSize: 16, fontWeight: 900, color: slide.accent, margin: '0 0 2px', transition: 'color 0.8s' }}>
                          {slide.returnValue}
                        </p>
                        <p style={{ fontSize: 9.5, color: '#475569', margin: 0, lineHeight: 1.4 }}>
                          {slide.returnLabel}
                        </p>
                      </div>
                    </div>

                    {/* CARD F — Image card */}
                    <div style={{ width: slide.logos ? 200 : 240, flexShrink: 0, marginTop: slide.logos ? '-90px' : '-60px', ...cardFade(480) }}>
                      <div style={{ ...card3D, borderRadius: 16, overflow: 'hidden', height: '100%' }}>
                        <div style={{ position: 'relative', height: '100%', minHeight: slide.logos ? 200 : 245 }}>
                          {slides.map((s, i) => (
                            <img key={i} src={s.mainImage2} alt={s.tag}
                              style={{
                                position: 'absolute', inset: 0,
                                width: '100%', height: '100%', objectFit: 'cover',
                                opacity: current === i ? 1 : 0,
                                transform: current === i ? 'scale(1.08)' : 'scale(1)',
                                transition: 'opacity 1s ease, transform 9s ease',
                              }}
                            />
                          ))}
                          {/* Dark overlay */}
                          {/* <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, rgba(54,1,83,0.75) 0%, rgba(54,1,83,0.15) 55%, transparent 100%)',
                          }} /> */}
                          {/* Gold shimmer */}
                          {/* <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(135deg, rgba(205,150,35,0.18) 0%, transparent 55%)',
                          }} /> */}
                          {/* Label at bottom
                          <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10 }}>
                            <p style={{ fontSize: 9, fontWeight: 700, color: '#fff', margin: '0 0 2px', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7 }}>
                              Sector
                            </p>
                            <p style={{ fontSize: 10.5, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.25, letterSpacing: '0.01em' }}>
                              {slide.tag}
                            </p>
                          </div> */}
                        </div>
                      </div>
                    </div>

                  </div>{/* end ROW 2 */}

                </div>
              </div>
            </div>
            {/* ══ END RIGHT ══════════════════════════════════════ */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
