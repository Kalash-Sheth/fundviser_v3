import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, CheckCircle, ArrowRight, ChevronRight, RotateCcw } from 'lucide-react';

/* ── Scroll fade-in ── */
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(48px)',
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

/* ── Data ── */
const subsidiaries = [
  {
    id: 1,
    name: 'Starlight Box Theatres Pvt. Ltd.',
    shortName: 'Starlight Box Theatres',
    tag: 'Entertainment · India',
    accent: '#f59e0b',
    accentDark: '#92400e',
    logo: '/starlight-logo-new.png',
    bgImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&h=700&fit=crop&q=80',
    cardBg: 'linear-gradient(145deg, #1a0040 0%, #360153 50%, #0f0022 100%)',
    backBg: 'linear-gradient(145deg, #0f0022 0%, #220040 60%, #360153 100%)',
    highlights: [
      "India's first Box Cinema enterprise",
      'ISO-certified cargo container theatres',
      '2–3 month rapid deployment',
      '100% eco-friendly construction',
      'First theatre live in Devgad, Maharashtra',
      'BSE-listed subsidiary',
    ],
    description: "Revolutionizing cinema by converting ISO-certified cargo containers into fully functional single-screen halls — with cafeteria, projector room, AC & sound insulation.",
    website: 'https://www.starlightcinemas.in/',
  },
  {
    id: 2,
    name: 'DARS Transtrade Pvt. Ltd.',
    shortName: 'DARS Transtrade',
    tag: 'Global Trading · India',
    accent: '#34d399',
    accentDark: '#065f46',
    logo: 'dars_logo.png',
    bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&h=700&fit=crop&q=80',
    cardBg: 'linear-gradient(145deg, #001a0f 0%, #003d20 50%, #00160c 100%)',
    backBg: 'linear-gradient(145deg, #001510 0%, #002c1a 60%, #004d2a 100%)',
    highlights: [
      'Import & export across global borders',
      'Commodity trading — raw to finished goods',
      'End-to-end logistics & supply chain',
      'e-Disha V600 — precision GPS tracker',
      'SOS alerts & SMS fallback for fleets',
      'BSE-listed subsidiary',
    ],
    description: "Dynamic global trader specializing in import/export, commodity trading and logistics. Flagship product: e-Disha V600 — next-gen vehicle tracking with precision GPS.",
    website: null,
  },
  {
    id: 3,
    name: 'Silver Sage Trading LLC',
    shortName: 'Silver Sage Trading',
    tag: 'General Trading · UAE',
    accent: '#a78bfa',
    accentDark: '#4c1d95',
    logo: '/silver_sage_logo.png',
    bgImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&h=700&fit=crop&q=80',
    cardBg: 'linear-gradient(145deg, #0a001a 0%, #1e0050 50%, #0a001a 100%)',
    backBg: 'linear-gradient(145deg, #080015 0%, #180040 60%, #240060 100%)',
    highlights: [
      'Legacy since 1963 — 60+ years of trust',
      'Dubai headquartered, UAE licensed',
      'Government-issued general trading license',
      'Import, export, sourcing & distribution',
      'Consumer goods to industrial equipment',
      'Strategic bridge — global manufacturers',
    ],
    description: "UAE-based general trading company established in 1963. Government-licensed, Dubai-headquartered, bridging global manufacturers to regional markets across industries.",
    website: 'http://www.silversagetrading.com/',
  },
];


/* ── Back face content (shared) ── */
const BackContent = ({ sub, onClose }) => (
  <div className="relative z-10 flex flex-col h-full p-7">
    <div className="flex items-start justify-between mb-4">
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border mb-3"
          style={{ color: sub.accent, borderColor: `${sub.accent}45`, background: `${sub.accent}15` }}>
          {sub.tag}
        </span>
        <h3 className="text-white font-black text-lg leading-snug">{sub.shortName}</h3>
        <div className="w-10 h-0.5 rounded-full mt-2" style={{ background: `linear-gradient(to right, ${sub.accent}, transparent)` }} />
      </div>
      <button onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-white/20"
        style={{ background: 'rgba(255,255,255,0.1)' }}>
        <span className="text-white/70 text-sm font-bold leading-none">×</span>
      </button>
    </div>
    <p className="text-gray-300 text-sm leading-relaxed mb-4">{sub.description}</p>
    <div className="flex-1 space-y-2 mb-5">
      {sub.highlights.map((point, i) => (
        <div key={i} className="flex items-start gap-2.5">
          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: sub.accent }} />
          <span className="text-gray-300 text-xs leading-snug">{point}</span>
        </div>
      ))}
    </div>
    {sub.website ? (
      <a href={sub.website} target="_blank" rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-gray-900 active:scale-95 transition-transform"
        style={{ background: sub.accent, boxShadow: `0 4px 20px ${sub.accent}40` }}>
        Visit Website <ExternalLink className="w-3.5 h-3.5" />
      </a>
    ) : (
      <div className="inline-flex items-center justify-center w-full py-3 rounded-xl text-sm font-medium border"
        style={{ color: sub.accent, borderColor: `${sub.accent}30`, background: `${sub.accent}10` }}>
        Website Coming Soon
      </div>
    )}
  </div>
);

/* ── Front face content (shared) ── */
const FrontContent = ({ sub, hint }) => (
  <div className="flex flex-col h-full p-7">
    <div className="flex items-start justify-between mb-6">
      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border"
        style={{ color: sub.accent, borderColor: `${sub.accent}45`, background: `${sub.accent}15` }}>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: sub.accent }} />
        {sub.tag}
      </span>
      <div className="w-8 h-8 rounded-full flex items-center justify-center border border-white/15"
        style={{ background: 'rgba(255,255,255,0.07)' }}>
        <RotateCcw className="w-3.5 h-3.5 text-white/40" />
      </div>
    </div>
    <div className="flex-1 flex items-center justify-center">
      {sub.logo ? (
        <div className="bg-white rounded-2xl p-6 shadow-2xl" style={{ maxWidth: '200px', width: '100%' }}>
          <img src={sub.logo} alt={sub.shortName} className="w-full h-auto object-contain" style={{ maxHeight: '100px' }} />
        </div>
      ) : (
        <div className="rounded-2xl px-10 py-7 shadow-2xl flex flex-col items-center gap-1.5"
          style={{ background: `linear-gradient(135deg, ${sub.accentDark}, ${sub.accent}70)` }}>
          <span className="text-white font-black text-4xl tracking-widest">DARS</span>
          <span className="text-white/70 text-xs tracking-[0.25em] font-medium">TRANSTRADE</span>
        </div>
      )}
    </div>
    <div className="mt-6">
      <h3 className="text-white font-black text-xl leading-snug mb-3">{sub.name}</h3>
      <div className="w-12 h-0.5 rounded-full mb-4" style={{ background: `linear-gradient(to right, ${sub.accent}, transparent)` }} />
      <p className="text-white/35 text-xs font-medium tracking-wide flex items-center gap-1.5">
        <span className="w-4 h-px" style={{ background: sub.accent }} />
        {hint}
      </p>
    </div>
  </div>
);

/* ── Flip Card ── */
const FlipCard = ({ sub, index }) => {
  const [flipped, setFlipped] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const leaveTimer = useRef(null);

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
  }, []);

  /* Desktop hover handlers */
  const handleEnter = () => { if (!isTouch) { clearTimeout(leaveTimer.current); setFlipped(true); } };
  const handleLeave = () => { if (!isTouch) { leaveTimer.current = setTimeout(() => setFlipped(false), 400); } };

  /* Mobile tap handler */
  const handleTap = () => { if (isTouch && !flipped) setFlipped(true); };

  const backBgStyle = { background: sub.backBg };

  /* ── DESKTOP: true 3D CSS flip ── */
  if (!isTouch) {
    return (
      <FadeIn delay={index * 120}>
        <div
          className="relative cursor-pointer"
          style={{ perspective: '1200px', height: '520px' }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <div style={{
            position: 'relative', width: '100%', height: '100%',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.75s cubic-bezier(0.4, 0.2, 0.2, 1)',
          }}>
            {/* Front — explicit rotateY(0deg) required for Safari backface-visibility to work */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
                background: sub.cardBg,
              }}>
              <img src={sub.bgImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
              <div className="absolute inset-0" style={{ background: sub.cardBg, opacity: 0.9 }} />
              <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${sub.accent}30 0%, transparent 70%)`, filter: 'blur(30px)' }} />
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
                backgroundSize: '40px 40px',
              }} />
              <div className="relative z-10 h-full">
                <FrontContent sub={sub} hint="Hover to explore" />
              </div>
            </div>
            {/* Back */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                WebkitTransform: 'rotateY(180deg)',
                ...backBgStyle,
              }}>
              <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${sub.accent}20 0%, transparent 70%)`, filter: 'blur(40px)' }} />
              <BackContent sub={sub} onClose={() => setFlipped(false)} />
            </div>
          </div>
        </div>
      </FadeIn>
    );
  }

  /* ── MOBILE: opacity toggle, no 3D (avoids backface-visibility bugs) ── */
  return (
    <FadeIn delay={index * 120}>
      <div className="relative cursor-pointer" style={{ height: '520px' }} onClick={handleTap}>

        {/* Front — fades out when flipped */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: sub.cardBg,
            opacity: flipped ? 0 : 1,
            transition: 'opacity 0.4s ease',
            pointerEvents: flipped ? 'none' : 'auto',
            zIndex: flipped ? 0 : 2,
          }}>
          <img src={sub.bgImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: sub.cardBg, opacity: 0.9 }} />
          <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${sub.accent}30 0%, transparent 70%)`, filter: 'blur(30px)' }} />
          <div className="relative z-10 h-full">
            <FrontContent sub={sub} hint="Tap to explore" />
          </div>
        </div>

        {/* Back — fades in when flipped */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
          style={{
            ...backBgStyle,
            opacity: flipped ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: flipped ? 'auto' : 'none',
            zIndex: flipped ? 3 : 0,
          }}>
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${sub.accent}20 0%, transparent 70%)`, filter: 'blur(40px)' }} />
          <BackContent sub={sub} onClose={() => setFlipped(false)} />
        </div>

      </div>
    </FadeIn>
  );
};

/* ── Section ── */
const SubsidiariesSection = () => (
  <section className="relative py-16 sm:py-28 bg-white overflow-hidden">

    {/* BG blobs */}
    <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#f3e5f5] rounded-full filter blur-3xl opacity-35 pointer-events-none" />
    <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-yellow-50 rounded-full filter blur-3xl opacity-45 pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      {/* ── Header ── */}
      <FadeIn className="text-center mb-10 sm:mb-20">
        <span className="inline-flex items-center gap-2 px-5 py-2 bg-[#f3e5f5] text-[#360153] rounded-full text-sm font-bold tracking-widest uppercase mb-5">
          <span className="w-1.5 h-1.5 bg-[#360153] rounded-full animate-pulse" />
          Our Group of Companies
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-5">
          Our{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#360153] to-yellow-500">
            Subsidiaries
          </span>
        </h2>
        <p className="text-base sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Prominent entities of Fundviser Capital (India) Ltd. contributing to our diverse and growing portfolio.
        </p>
        <p className="text-sm text-gray-400 mt-3 flex items-center justify-center gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          Hover over a card to explore
        </p>
      </FadeIn>

      {/* ── Flip Cards Grid ── */}
      <div className="grid md:grid-cols-3 gap-5 sm:gap-7 mb-8 sm:mb-16">
        {subsidiaries.map((sub, i) => (
          <FlipCard key={sub.id} sub={sub} index={i} />
        ))}
      </div>

      {/* ── Bottom CTA strip ── */}
      <FadeIn delay={200}>
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&h=400&fit=crop&q=80"
            alt="Fundviser Capital"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-[#360153]/85 to-slate-900/90" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5 px-5 sm:px-8 md:px-12 py-7 sm:py-10">
            <div>
              <p className="text-yellow-400 text-xs font-black tracking-widest uppercase mb-2">Fundviser Capital Group</p>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">Building a Diversified Legacy</h3>
              <p className="text-gray-400 mt-2 text-sm max-w-md">
                Each subsidiary reflects our commitment to innovation, sustainability, and long-term value creation.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="/the-firm"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-xl shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                About the Firm
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                Get In Touch <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

export default SubsidiariesSection;
