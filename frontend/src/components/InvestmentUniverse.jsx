import React, { useState, useEffect, useRef } from 'react';

const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
};

const useScrollReveal = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const sectors = [
  {
    num: '01', title: 'Real Estate', subtitle: 'Commercial & Residential',
    desc: 'Commercial complexes, residential developments, and undervalued assets poised for significant appreciation across India — from SRA redevelopment to premium commercial leasing.',
    tags: ['SRA Projects', 'Commercial Leasing', 'Redevelopment', 'Land Banking'],
    img: '/Main_header_building.png',
  },
  {
    num: '02', title: 'Bullion', subtitle: 'Gold & Silver',
    desc: 'A structural allocation to precious metals — gold and silver held as a disciplined hedge against inflation, currency depreciation, and correlated market volatility. Stability with genuine uncorrelated returns.',
    tags: ['Gold', 'Silver', 'Inflation Hedge', 'Portfolio Diversification'],
    img: '/Silver.png',
  },
  {
    num: '03', title: 'Capital Markets', subtitle: 'Equity & Commodity Trading',
    desc: 'Strategic capital deployed across high-growth equity and commodity markets. BSE-listed credibility backed by deep market intelligence built over three decades since 1993.',
    tags: ['BSE: 530197', 'Equity', 'Commodities', 'Derivatives'],
    img: '/capital_market2.jpg',
  },
  {
    num: '04', title: 'Strategic Advisory', subtitle: 'Financial Structuring',
    desc: 'Structured financial products and advisory services built for institutional resilience. Every investment stress-tested across multiple economic scenarios before deployment.',
    tags: ['Due Diligence', 'Portfolio Advisory', 'Risk Architecture'],
    img: '/growth.jpg',
  },
  {
    num: '05', title: 'Entertainment', subtitle: 'Box Cinema Innovation',
    desc: 'Revolutionary Box Cinema concept — ISO-certified cargo container theatres reshaping entertainment access across India. First-of-its-kind infrastructure redefining the sector.',
    tags: ['Box Cinema', 'ISO Certified', 'Pan-India Rollout'],
    img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400&h=900&fit=crop&q=85',
  },
  {
    num: '06', title: 'Global Trade', subtitle: 'Import / Export Operations',
    desc: 'Import/export operations spanning commodities, consumer goods, and industrial equipment. Strong UAE–India trade corridor with established logistics networks.',
    tags: ['UAE Presence', 'Import / Export', 'Commodities', 'Logistics'],
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&h=900&fit=crop&q=85',
  },
  {
    num: '07', title: 'Technology', subtitle: 'Fleet & GPS Solutions',
    desc: "Next-gen fleet tracking and precision GPS solutions for transportation and logistics — building smart infrastructure for India's rapidly growing logistics economy.",
    tags: ['Fleet Tracking', 'GPS Solutions', 'Logistics Tech'],
    img: '/Tech.jpg',
  },
];

const InvestmentUniverse = () => {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [sectionRef, sectionVisible] = useScrollReveal(0.08);
  const winW = useWindowWidth();
  const isMobile = winW < 768;

  const handleSelect = (i) => {
    if (i === active || transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setActive(i);
      setTransitioning(false);
    }, 320);
  };

  const s = sectors[active];
  const dotSpacing = 100 / (sectors.length - 1);

  return (
    <section
      ref={sectionRef}
      id="sectors"
      style={{
        background: '#f8f4ff',
        position: 'relative', overflow: 'hidden',
        padding: isMobile ? '72px 0 80px' : '100px 0 120px',
      }}
    >
      {/* Top-edge deep purple band — creates a "stage" feel */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg, #360153, #cd9623, #360153)', pointerEvents: 'none' }} />

      {/* Large swept diagonal colour wash */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(54,1,83,0.09) 0%, transparent 45%, rgba(205,150,35,0.08) 100%)', pointerEvents: 'none' }} />

      {/* Radial glow — top-right purple */}
      <div style={{ position: 'absolute', top: '-15%', right: '-8%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(54,1,83,0.13) 0%, rgba(54,1,83,0.05) 45%, transparent 70%)', pointerEvents: 'none' }} />
      {/* Radial glow — bottom-left gold */}
      <div style={{ position: 'absolute', bottom: '-12%', left: '-6%', width: 580, height: 580, borderRadius: '50%', background: 'radial-gradient(circle, rgba(205,150,35,0.14) 0%, rgba(205,150,35,0.05) 45%, transparent 70%)', pointerEvents: 'none' }} />
      {/* Centre soft glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(54,1,83,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* Dot grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(54,1,83,0.08) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

      {/* Subtle diagonal line texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(54,1,83,0.018) 60px, rgba(54,1,83,0.018) 61px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px' }}>

        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: isMobile ? 48 : 72,
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'none' : 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 100, marginBottom: 20,
            background: 'rgba(205,150,35,0.1)', border: '1px solid rgba(205,150,35,0.28)',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#cd9623', display: 'inline-block' }} />
            <span style={{ fontSize: 14, fontWeight: 700, color: '#cd9623', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Investment Universe</span>
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 16,
          }}>
            <span style={{ color: '#150827' }}>Sectors We </span>
            <span style={{ background: 'linear-gradient(135deg, #360153 0%, #cd9623 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Operate In</span>
          </h2>
          <p style={{ color: '#6b5a8a', fontSize: 'clamp(14px, 1.8vw, 17px)', lineHeight: 1.75, maxWidth: 560, margin: '0 auto' }}>
            A multi-sector portfolio engineered for resilience — each vertical chosen for long-term compounding potential aligned with India's growth story.
          </p>
        </div>

        {/* Mobile: stacked cards */}
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {sectors.map((sec, i) => (
              <div key={i} style={{
                borderRadius: 20, overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 4px 24px rgba(54,1,83,0.08)',
                border: '1px solid rgba(54,1,83,0.07)',
              }}>
                <div style={{ height: 180, position: 'relative', overflow: 'hidden' }}>
                  <img src={sec.img} alt={sec.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(21,8,39,0.7) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 11px', borderRadius: 100, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <span style={{ fontSize: 9.5, fontWeight: 700, color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{sec.num}</span>
                  </div>
                </div>
                <div style={{ padding: '20px 20px 22px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 800, color: '#150827', marginBottom: 4, letterSpacing: '-0.02em' }}>{sec.title}</h3>
                  <p style={{ fontSize: 11, color: '#cd9623', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{sec.subtitle}</p>
                  <p style={{ fontSize: 13.5, color: '#5a4a72', lineHeight: 1.7, marginBottom: 14 }}>{sec.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {sec.tags.map((t, j) => (
                      <span key={j} style={{ padding: '4px 11px', borderRadius: 100, background: 'rgba(54,1,83,0.07)', border: '1px solid rgba(54,1,83,0.12)', color: '#360153', fontSize: 10.5, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: timeline + panel */
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 48, alignItems: 'start' }}>

            {/* Left: Timeline */}
            <div style={{
              position: 'relative', top: 120,
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'none' : 'translateX(-30px)',
              transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
            }}>
              <div style={{ position: 'relative', paddingLeft: 32 }}>
                <div style={{ position: 'absolute', left: 10, top: 22, bottom: 22, width: 2, borderRadius: 2, background: 'linear-gradient(to bottom, rgba(54,1,83,0.12), rgba(205,150,35,0.12))' }} />
                <div style={{ position: 'absolute', left: 10, top: 22, width: 2, borderRadius: 2, background: 'linear-gradient(to bottom, #360153, #cd9623)', height: `${dotSpacing * active}%`, transition: 'height 0.5s cubic-bezier(0.4,0,0.2,1)' }} />

                {sectors.map((sec, i) => (
                  <button key={i} onClick={() => handleSelect(i)} style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '14px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: -22, width: i === active ? 20 : 12, height: i === active ? 20 : 12, borderRadius: '50%', background: i === active ? 'linear-gradient(135deg, #360153, #cd9623)' : '#fff', border: i === active ? 'none' : '2px solid rgba(54,1,83,0.2)', boxShadow: i === active ? '0 0 0 4px rgba(54,1,83,0.12)' : 'none', transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)', flexShrink: 0 }} />
                    <div style={{ paddingLeft: 2 }}>
                      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 3, color: i === active ? '#cd9623' : '#a89fc0', transition: 'color 0.3s' }}>{sec.num}</p>
                      <p style={{ fontFamily: i === active ? "'Playfair Display', serif" : 'inherit', fontSize: i === active ? 15 : 14, fontWeight: i === active ? 700 : 500, color: i === active ? '#150827' : '#6b5a8a', letterSpacing: '-0.01em', lineHeight: 1.2, transition: 'all 0.3s' }}>{sec.title}</p>
                    </div>
                    {i === active && (
                      <div style={{ marginLeft: 'auto', width: 6, height: 6, borderTop: '2px solid #360153', borderRight: '2px solid #360153', transform: 'rotate(45deg)', flexShrink: 0 }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Active sector panel */}
            <div style={{ opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? 'none' : 'translateX(30px)', transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s' }}>
              <div style={{ borderRadius: 24, overflow: 'hidden', background: '#fff', boxShadow: '0 8px 48px rgba(54,1,83,0.10)', border: '1px solid rgba(54,1,83,0.07)' }}>

                {/* Image */}
                <div style={{ position: 'relative', height: 340, overflow: 'hidden' }}>
                  <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: transitioning ? 0 : 1, transform: transitioning ? 'scale(1.04)' : 'scale(1)', transition: 'opacity 0.32s ease, transform 0.32s ease' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(21,8,39,0.60) 0%, rgba(21,8,39,0.05) 55%, transparent 100%)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(54,1,83,0.12) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: -10, right: 24, fontFamily: "'Playfair Display', serif", fontSize: 120, fontWeight: 900, lineHeight: 1, color: 'rgba(255,255,255,0.07)', letterSpacing: '-0.06em', userSelect: 'none', pointerEvents: 'none', opacity: transitioning ? 0 : 1, transition: 'opacity 0.32s ease' }}>{s.num}</div>
                  <div style={{ position: 'absolute', top: 20, left: 20, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', opacity: transitioning ? 0 : 1, transition: 'opacity 0.32s ease' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#cd9623', display: 'inline-block' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.subtitle}</span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '36px 40px 40px', opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateY(10px)' : 'none', transition: 'opacity 0.32s ease, transform 0.32s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#cd9623', letterSpacing: '0.16em', textTransform: 'uppercase' }}>{s.num} / 0{sectors.length}</span>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(205,150,35,0.3), transparent)' }} />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 800, color: '#150827', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 8 }}>{s.title}</h3>
                  <div style={{ width: 48, height: 3, borderRadius: 2, background: 'linear-gradient(to right, #360153, #cd9623)', marginBottom: 20 }} />
                  <p style={{ fontSize: 15.5, color: '#5a4a72', lineHeight: 1.8, marginBottom: 28 }}>{s.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {s.tags.map((tag, j) => (
                        <span key={j} style={{ padding: '6px 15px', borderRadius: 100, background: 'rgba(54,1,83,0.06)', border: '1px solid rgba(54,1,83,0.12)', color: '#360153', fontSize: 11.5, fontWeight: 600, letterSpacing: '0.04em' }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    {[{ dir: -1, label: '←' }, { dir: 1, label: '→' }].map(({ dir, label }) => (
                      <button key={dir}
                        onClick={() => handleSelect(Math.max(0, Math.min(sectors.length - 1, active + dir)))}
                        disabled={dir === -1 ? active === 0 : active === sectors.length - 1}
                        style={{ width: 42, height: 42, borderRadius: 10, border: '1.5px solid rgba(54,1,83,0.18)', background: '#fff', color: '#360153', fontSize: 18, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: (dir === -1 ? active === 0 : active === sectors.length - 1) ? 0.3 : 1, transition: 'all 0.2s' }}
                        onMouseEnter={e => { if (!e.currentTarget.disabled) { e.currentTarget.style.background = '#360153'; e.currentTarget.style.color = '#fff'; }}}
                        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#360153'; }}
                      >{label}</button>
                    ))}
                  </div>
                </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: isMobile ? 48 : 72 }}>
          <a href="/what-we-do#sectors" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 36px', borderRadius: 12, background: 'linear-gradient(135deg, #360153, #cd9623)', color: '#fff', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 8px 32px rgba(54,1,83,0.28)', transition: 'transform 0.25s, box-shadow 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(54,1,83,0.38)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(54,1,83,0.28)'; }}
          >
            View All Investment Sectors →
          </a>
        </div>

      </div>
    </section>
  );
};

export default InvestmentUniverse;
