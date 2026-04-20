import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Target, Eye, Shield, Zap, TrendingUp, ChevronRight,
  Award, Globe, Users, ArrowRight, BarChart3,
  Layers, Anchor,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubsidiariesSection from '../components/SubsidiariesSection';
import ContactSection from '../components/ContactSection';
import InvestmentUniverse from '../components/InvestmentUniverse';

gsap.registerPlugin(ScrollTrigger);

/* ─── Brand ─────────────────────────────────────────────── */
const B = {
  purple:  '#360153', pRgb: '54,1,83',
  pLight:  '#f3e5ff', pMid: '#5a0280',
  gold:    '#cd9623', gRgb: '205,150,35',
  gLight:  '#fdf5e0', gMid: '#e8b84b',
  dark:    '#060010', dark2: '#1a0030',
};

/* ═══════════════════════════════════════════════════════════
   TiltCard
═══════════════════════════════════════════════════════════ */
const TiltCard = ({ children, className = '', style = {} }) => {
  const ref = useRef(null);
  const mv = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, { rotateX: y*-10, rotateY: x*10, duration:0.3, ease:'power2.out', transformPerspective:900 });
  };
  const lv = () => gsap.to(ref.current, { rotateX:0, rotateY:0, duration:0.6, ease:'power2.out' });
  return (
    <div ref={ref} className={className} style={{ ...style }}
      onMouseMove={mv} onMouseLeave={lv}>
      {children}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Counter — 0 → end animation on scroll
═══════════════════════════════════════════════════════════ */
const Counter = ({ end, suffix='', duration=2000 }) => {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const fired = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        let c = 0;
        const step = Math.ceil(end / (duration / 16));
        const t = setInterval(() => {
          c += step;
          if (c >= end) { setV(end); clearInterval(t); } else setV(c);
        }, 16);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{v}{suffix}</span>;
};

/* ═══════════════════════════════════════════════════════════
   FinanceOrb3D — icosahedron + orbital rings + particles
═══════════════════════════════════════════════════════════ */
const FinanceOrb3D = ({ size = 560 }) => {
  const canvasRef = useRef(null);
  const st = useRef({ rotY: 0, rotX: 0.28 });
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; 
    const W = size; const H = size;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    const phi = (1 + Math.sqrt(5)) / 2;
    const icoV = [[0,1,phi],[0,-1,phi],[0,1,-phi],[0,-1,-phi],
      [1,phi,0],[-1,phi,0],[1,-phi,0],[-1,-phi,0],
      [phi,0,1],[-phi,0,1],[phi,0,-1],[-phi,0,-1]].map(v => {
      const l = Math.sqrt(v[0]**2+v[1]**2+v[2]**2);
      return v.map(c => c/l*160);
    });
    const icoE = [[0,1],[0,4],[0,5],[0,8],[0,9],[1,6],[1,7],[1,8],[1,9],
      [2,3],[2,4],[2,5],[2,10],[2,11],[3,6],[3,7],[3,10],[3,11],
      [4,5],[4,8],[4,10],[5,9],[5,11],[6,7],[6,8],[6,10],[7,9],[7,11],[8,10],[9,11]];
    const proj = (x,y,z) => {
      const fov=700, cz=580, s=fov/(fov+z+cz);
      return { x: W/2+x*s, y: H/2-y*s+12, s };
    };
    const ry = (v,a) => [v[0]*Math.cos(a)+v[2]*Math.sin(a), v[1], -v[0]*Math.sin(a)+v[2]*Math.cos(a)];
    const rx = (v,a) => [v[0], v[1]*Math.cos(a)-v[2]*Math.sin(a), v[1]*Math.sin(a)+v[2]*Math.cos(a)];
    let raf;
    const tick = (ts=0) => {
      ctx.clearRect(0,0,W,H);
      const bg = ctx.createRadialGradient(W/2,H/2,25,W/2,H/2,268);
      bg.addColorStop(0,'rgba(54,1,83,0.12)'); bg.addColorStop(.6,'rgba(26,0,48,0.05)'); bg.addColorStop(1,'transparent');
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
      /* floating words — replace tiny dot particles */
      const floatWords=['Vision','Growth','Integrity','Foresight'];
      for(let i=0;i<floatWords.length;i++){
        const seed=i*91.7;
        const px=W/2+Math.sin(seed*0.34+i*1.4)*130;
        const baseY=H/2+Math.cos(seed*0.21)*150;
        const prog=(ts*0.008+i*68)%(H*0.78), fy=baseY-prog;
        const a=Math.sin(prog/(H*0.78)*Math.PI)*0.78;
        if(a>0.07){
          ctx.save();
          ctx.font=`700 13px -apple-system,sans-serif`;
          ctx.fillStyle=i%2===0?`rgba(205,150,35,${a})`:`rgba(160,80,220,${a})`;
          ctx.shadowColor=i%2===0?'rgba(205,150,35,0.55)':'rgba(160,80,220,0.55)';
          ctx.shadowBlur=7;
          ctx.textAlign='center';
          ctx.textBaseline='middle';
          ctx.fillText(floatWords[i],px,fy);
          ctx.restore();
        }
      }
      /* rings — word travelers, text always horizontal */
      const ringWords=['Excellence','Legacy','Trust'];
      [[228,64,ts*.00055,`rgba(205,150,35,0.17)`,1.4,.0006],[195,53,ts*.00055+1,`rgba(${B.pRgb},0.20)`,1.1,.0009],[262,74,ts*.00038+2,`rgba(205,150,35,0.08)`,0.8,.0004]].forEach(([rx_,ry_,rot,col,lw,ds],ri)=>{
        /* draw ring with its own rotation */
        ctx.save(); ctx.translate(W/2,H/2+8); ctx.rotate(rot);
        ctx.beginPath(); ctx.ellipse(0,0,rx_,ry_,0,0,Math.PI*2); ctx.strokeStyle=col; ctx.lineWidth=lw; ctx.stroke();
        ctx.restore();
        /* map word position: rotated ellipse coords -> screen space */
        const da=ts*ds;
        const lx=Math.cos(da)*rx_, ly=Math.sin(da)*ry_;
        const sx=W/2 + lx*Math.cos(rot) - ly*Math.sin(rot);
        const sy=H/2+8 + lx*Math.sin(rot) + ly*Math.cos(rot);
        /* draw word with NO canvas rotation so it stays horizontal */
        ctx.save();
        ctx.font=`700 13px -apple-system,sans-serif`;
        ctx.fillStyle=ri===1?'rgba(160,80,220,0.95)':'rgba(205,150,35,0.95)';
        ctx.shadowColor=ri===1?'rgba(160,80,220,0.65)':'rgba(205,150,35,0.65)';
        ctx.shadowBlur=11;
        ctx.textAlign='center';
        ctx.textBaseline='middle';
        ctx.fillText(ringWords[ri],sx,sy);
        ctx.restore();
      });
      /* orb */
      const verts=icoV.map(v=>{let r=ry(v,st.current.rotY); r=rx(r,st.current.rotX); return proj(r[0],r[1],r[2]);});
      icoE.forEach(([a,b])=>{
        const va=verts[a], vb=verts[b], avg=(va.s+vb.s)/2, al=.12+avg*.55;
        const g=ctx.createLinearGradient(va.x,va.y,vb.x,vb.y);
        g.addColorStop(0,`rgba(205,150,35,${al*.95})`); g.addColorStop(.5,`rgba(160,80,220,${al*.62})`); g.addColorStop(1,`rgba(205,150,35,${al*.95})`);
        ctx.beginPath(); ctx.moveTo(va.x,va.y); ctx.lineTo(vb.x,vb.y); ctx.strokeStyle=g; ctx.lineWidth=.7+avg*1.6; ctx.stroke();
      });
      verts.forEach(v=>{
        const r=2.5+v.s*5.5, al=.35+v.s*.65;
        const gw=ctx.createRadialGradient(v.x,v.y,0,v.x,v.y,r*3.5);
        gw.addColorStop(0,`rgba(205,150,35,${al*.44})`); gw.addColorStop(1,'transparent');
        ctx.beginPath(); ctx.arc(v.x,v.y,r*3.5,0,Math.PI*2); ctx.fillStyle=gw; ctx.fill();
        ctx.beginPath(); ctx.arc(v.x,v.y,r,0,Math.PI*2); ctx.fillStyle=`rgba(232,184,75,${al*.88})`; ctx.fill();
      });
      st.current.rotY+=.0052;
      st.current.rotX=.26+Math.sin(ts*.00027)*.13;
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(raf);
  }, [size]);
  return (
    <canvas ref={canvasRef}
      style={{ width:'100%', maxWidth:size, height:'auto',
        filter:`drop-shadow(0 0 60px rgba(205,150,35,.30)) drop-shadow(0 0 120px rgba(${B.pRgb},.18))` }} />
  );
};

/* ═══════════════════════════════════════════════════════════
   Marquee — infinite scroll ticker
═══════════════════════════════════════════════════════════ */
const Marquee = ({ items }) => {
  const repeated = [...items, ...items];
  return (
    <div style={{ overflow:'hidden', whiteSpace:'nowrap', userSelect:'none' }}>
      <div style={{ display:'inline-flex', animation:'marqueeScroll 28s linear infinite' }}>
        {repeated.map((item, i) => (
          <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:20, marginRight:48 }}>
            <span style={{ color:'rgba(255,255,255,0.55)', fontSize:12, fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase' }}>
              {item}
            </span>
            <span style={{ width:4, height:4, borderRadius:'50%', background:B.gold, flexShrink:0 }} />
          </span>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   Pillars data — shared between ThreePillars and mobile cards
═══════════════════════════════════════════════════════════ */
const pillars = [
  {
    num: '01', label: 'VISION', icon: Eye,
    title: 'Our Vision',
    img: 'z_11.png',
    body: 'We want Fundviser Capital to be the name families and businesses turn to when it matters most — not just another investment firm, but a long-term partner that helps real people build lasting wealth, steadily and with confidence.',
    bullets: ['A trusted name across generations', 'Investments that stand the test of time', 'Growing with India, sector by sector', 'Global outlook, local understanding'],
    accentCol: '#360153',
  },
  {
    num: '02', label: 'MISSION', icon: Target,
    title: 'Our Mission',
    img: '/sustainable.jpeg',
    body: 'Our job is straightforward — find the right opportunities, put money to work wisely, and keep our investors informed at every step. We do this through careful research, strong relationships, and over 30 years of real-world experience.',
    metrics: [
      { label:'Smart Allocation',    desc:'Right asset at the right time' },
      { label:'Clear Communication', desc:'No jargon, just honest updates' },
      { label:'Proven Track Record', desc:'3 decades of consistent decisions' },
      { label:'Open & Accountable',  desc:'BSE-listed for full transparency' },
    ],
    accentCol: '#cd9623',
  },
  {
    num: '03', label: 'VALUES', icon: Shield,
    title: 'Our Values',
    img: 'Trust.png',
    body: 'Good investing starts with good character. Three simple principles have shaped every move we make since day one and they are the reason our investors keep coming back.',
    values: [
      { icon: Shield,     name:'Honesty First',   desc:'We tell it straight even when it is not what you want to hear' },
      { icon: Zap,        name:'Think Long-Term', desc:'We stay focused on what lasts, not what looks good today' },
      { icon: TrendingUp, name:'Grow Together',   desc:'When our investors do well, we know we have done our job right' },
    ],
    accentCol: '#0a8060',
  },
];

/* ═══════════════════════════════════════════════════════════
   ThreePillars — expanding panel accordion
═══════════════════════════════════════════════════════════ */
const ThreePillars = () => {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const isHovering = useRef(false);

  /* Scroll-driven pillar progression — triggers based on viewport position */
  useEffect(() => {
    const handleScroll = () => {
      if (isHovering.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      // rect.top = distance from viewport top to section top
      // pillar 1: section not yet well into view (top > 65% of viewport)
      // pillar 2: section entering center (top between 15%–65%)
      // pillar 3: section near top of viewport (top < 15%)
      if (rect.top > viewH * 0.65) setActive(0);
      else if (rect.top > viewH * 0.15) setActive(1);
      else setActive(2);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => { isHovering.current = true; }}
      onMouseLeave={() => { isHovering.current = false; }}
      style={{ display:'flex', height:'100%', minHeight:650, borderRadius:24, overflow:'hidden',
        boxShadow:'0 24px 80px rgba(0,0,0,0.18)' }}>
      {pillars.map((p, i) => {
        const Icon = p.icon;
        const isActive = active === i;
        return (
          <div key={i}
            style={{
              flex: isActive ? 3 : 1,
              transition: 'flex 0.55s cubic-bezier(0.4,0,0.2,1)',
              background: `linear-gradient(180deg, #0d0020 0%, #160030 100%)`,
              position:'relative',
              overflow:'hidden',
              cursor: isActive ? 'default' : 'pointer',
              borderRight: i < pillars.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
            onMouseEnter={() => { isHovering.current = true; setActive(i); }}
          >
            {/* Accent glow */}
            {isActive && (
              <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200,
                borderRadius:'50%', background:p.accentCol, filter:'blur(90px)', opacity:0.22,
                pointerEvents:'none' }} />
            )}
            {/* Collapsed label — rotated */}
            {!isActive && (
              <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
                alignItems:'center', justifyContent:'center', gap:12 }}>
                <span style={{ color:`rgba(${B.gRgb},0.55)`, fontSize:10, fontWeight:900,
                  letterSpacing:'0.18em', textTransform:'uppercase' }}>
                  {p.num}
                </span>
                <div style={{ padding:'8px', borderRadius:10, background:'rgba(255,255,255,0.06)' }}>
                  <Icon style={{ width:18, height:18, color:`rgba(${B.gRgb},0.7)` }} />
                </div>
                <span style={{
                  color:'rgba(255,255,255,0.30)', fontSize:10, fontWeight:800,
                  letterSpacing:'0.22em', textTransform:'uppercase',
                  writingMode:'vertical-rl', textOrientation:'mixed',
                }}>
                  {p.label}
                </span>
              </div>
            )}

            {/* Expanded content */}
            <div style={{
              position:'absolute', inset:0, padding:'40px 36px',
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'none' : 'translateX(16px)',
              transition:'opacity 0.4s 0.1s, transform 0.4s 0.1s',
              overflowY:'hidden',
              pointerEvents: isActive ? 'auto' : 'none',
            }}>
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
                  <span style={{ color:`rgba(${B.gRgb},0.65)`, fontSize:11, fontWeight:900,
                    letterSpacing:'0.16em', textTransform:'uppercase' }}>{p.num}</span>
                  <div style={{ flex:1, height:1, background:`rgba(${B.gRgb},0.20)` }} />
                  <div style={{ padding:'8px', borderRadius:10,
                    background:`rgba(${p.accentCol==='#cd9623'?B.gRgb:B.pRgb},0.18)` }}>
                    <Icon style={{ width:18, height:18, color:p.accentCol }} />
                  </div>
                </div>
                <h3 style={{
                  fontFamily:"'Playfair Display', serif",
                  fontSize:'clamp(1.4rem, 2.5vw, 2rem)',
                  fontWeight:900, color:'#fff', marginBottom:16, lineHeight:1.2,
                }}>
                  {p.title}
                </h3>
                <p style={{ color:'rgba(255,255,255,0.62)', fontSize:14, lineHeight:1.75,
                  marginBottom:24 }}>
                  {p.body}
                </p>
                {/* Vision bullets */}
                {p.bullets && (
                  <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10 }}>
                    {p.bullets.map((b, bi) => (
                      <li key={bi} style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:6, height:6, borderRadius:'50%', background:B.gold, flexShrink:0 }} />
                        <span style={{ color:'rgba(255,255,255,0.75)', fontSize:13, fontWeight:500 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {/* Mission 2×2 grid */}
                {p.metrics && (
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                    {p.metrics.map((m, mi) => (
                      <div key={mi} style={{ padding:'14px 16px', borderRadius:12,
                        background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.10)' }}>
                        <p style={{ color:'#fff', fontSize:12, fontWeight:800, marginBottom:3 }}>{m.label}</p>
                        <p style={{ color:'rgba(255,255,255,0.48)', fontSize:11 }}>{m.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
                {/* Values list */}
                {p.values && (
                  <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                    {p.values.map((v, vi) => {
                      const VI = v.icon;
                      return (
                        <div key={vi} style={{ display:'flex', alignItems:'flex-start', gap:12,
                          padding:'14px 16px', borderRadius:12,
                          background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.09)' }}>
                          <div style={{ padding:6, borderRadius:8, background:'rgba(255,255,255,0.08)', flexShrink:0 }}>
                            <VI style={{ width:14, height:14, color:B.gold }} />
                          </div>
                          <div>
                            <p style={{ color:'#fff', fontSize:12, fontWeight:800, marginBottom:2 }}>{v.name}</p>
                            <p style={{ color:'rgba(255,255,255,0.48)', fontSize:11, lineHeight:1.5 }}>{v.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ── Pillar image — below content ── */}
                <div style={{
                  marginTop:22, borderRadius:14, overflow:'hidden', height:148,
                  border:`1px solid rgba(${B.gRgb},0.14)`,
                  boxShadow:'0 8px 28px rgba(0,0,0,0.28)',
                }}>
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{ width:'100%', height:'100%', objectFit:'cover',
                      objectPosition:'center', display:'block' }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};


const marqueeItems = [
  'Strategic Investments', 'BSE Listed — 530197', 'Since 1993',
  'Pan-India & UAE', 'Three Subsidiaries', 'Multi-Sector Portfolio',
  'Publicly Governed', '30+ Years of Trust', 'Pioneering Growth',
];

/* ═══════════════════════════════════════════════════════════
   TheFirm Page
═══════════════════════════════════════════════════════════ */
const TheFirm = () => {
  const pageRef     = useRef(null);
  const progressRef = useRef(null);

  /* ── GSAP initial states ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(progressRef.current,      { scaleY:0, transformOrigin:'top center' });
      /* Hero */
      gsap.set('.tf-hero-eyebrow',        { autoAlpha:0, y:-18 });
      gsap.set('.tf-hero-title',          { autoAlpha:0, y:40, rotateX:-18, transformPerspective:1000 });
      gsap.set('.tf-hero-sub',            { autoAlpha:0, y:22 });
      gsap.set('.tf-hero-btns',           { autoAlpha:0, y:18 });
      gsap.set('.tf-hero-statbar > *',    { autoAlpha:0, y:16 });
      gsap.set('.tf-hero-imgcol',         { autoAlpha:0, x:50, scale:0.96 });
      gsap.set('.tf-hero-fcard',          { autoAlpha:0, y:16, scale:0.92 });
      /* Foundation */
      gsap.set('.tf-found-img',           { clipPath:'inset(0 100% 0 0)' });
      gsap.set('.tf-found-text > *',      { autoAlpha:0, x:44 });
      gsap.set('.tf-found-badge',         { autoAlpha:0, x:-20, y:20 });
      /* Numbers */
      gsap.set('.tf-num-item',            { autoAlpha:0, y:48, scale:0.9 });
      /* Bento */
      gsap.set('.tf-bento-hd',            { autoAlpha:0, y:-28 });
      gsap.set('.tf-bento-card',          { autoAlpha:0, scale:0.94 });
      /* Pillars */
      gsap.set('.tf-pillars-hd',          { autoAlpha:0, y:-28 });
      gsap.set('.tf-pillars-wrap',        { autoAlpha:0, y:44 });
      /* Timeline */
      gsap.set('.tf-tl-hd',              { autoAlpha:0, y:-28 });
      gsap.set('.tf-tl-item',            { autoAlpha:0, x:-32 });
      /* Subs */
      gsap.set('.tf-subs-hd',            { autoAlpha:0, y:-28 });
      gsap.set('.tf-sub-card',           { autoAlpha:0, y:44, scale:0.94 });
      /* Market */
      gsap.set('.tf-mkt-hd',             { autoAlpha:0, y:-28 });
      gsap.set('.tf-mkt-stock',          { autoAlpha:0, x:-44, rotateY:-15, transformPerspective:800 });
      gsap.set('.tf-mkt-text > *',       { autoAlpha:0, x:44 });
      /* Philosophy */
      gsap.set('.tf-philo-label',        { autoAlpha:0, y:20 });
      gsap.set('.tf-philo-word',         { autoAlpha:0, y:80, rotateX:-40, transformPerspective:600 });
      gsap.set('.tf-philo-divider',      { autoAlpha:0, scaleX:0, transformOrigin:'center' });
      /* CTA */
      gsap.set('.tf-cta-content > *',    { autoAlpha:0, y:28 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  /* ── GSAP Animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const ST = (t, s='top 78%') => ({ trigger:t, start:s, toggleActions:'play none none reverse' });

      /* Scroll progress */
      gsap.to(progressRef.current, { scaleY:1, ease:'none',
        scrollTrigger:{ trigger:pageRef.current, start:'top top', end:'bottom bottom', scrub:0 } });

      /* Hero */
      gsap.timeline({ delay:0.2 })
        .to('.tf-hero-eyebrow',     { autoAlpha:1, y:0, duration:0.6, ease:'power3.out' })
        .to('.tf-hero-title',       { autoAlpha:1, y:0, rotateX:0, duration:1.0, ease:'power3.out' }, '-=0.3')
        .to('.tf-hero-sub',         { autoAlpha:1, y:0, duration:0.7, ease:'power3.out' }, '-=0.55')
        .to('.tf-hero-btns',        { autoAlpha:1, y:0, duration:0.6, ease:'power3.out' }, '-=0.4')
        .to('.tf-hero-statbar > *', { autoAlpha:1, y:0, stagger:0.1, duration:0.5, ease:'back.out(1.4)' }, '-=0.3')
        .to('.tf-hero-imgcol',      { autoAlpha:1, x:0, scale:1, duration:1.1, ease:'power3.out' }, '-=0.7')
        .to('.tf-hero-fcard',       { autoAlpha:1, y:0, scale:1, stagger:0.14, duration:0.65, ease:'back.out(1.5)' }, '-=0.5');

      /* Foundation */
      gsap.to('.tf-found-img',     { clipPath:'inset(0 0% 0 0)', duration:1.3, ease:'power3.inOut', scrollTrigger:ST('.tf-foundation') });
      gsap.to('.tf-found-badge',   { autoAlpha:1, x:0, y:0, duration:0.7, ease:'back.out(1.5)', scrollTrigger:ST('.tf-foundation','top 65%') });
      gsap.to('.tf-found-text > *',{ autoAlpha:1, x:0, stagger:0.13, duration:0.75, ease:'power3.out', scrollTrigger:ST('.tf-foundation','top 70%') });

      /* Numbers */
      gsap.to('.tf-num-item', { autoAlpha:1, y:0, scale:1, stagger:0.12, duration:0.8,
        ease:'back.out(1.3)', scrollTrigger:ST('.tf-numbers','top 80%') });

      /* Bento */
      gsap.to('.tf-bento-hd',  { autoAlpha:1, y:0, duration:0.7, ease:'power3.out', scrollTrigger:ST('.tf-bento','top 82%') });
      gsap.to('.tf-bento-card',{ autoAlpha:1, scale:1, stagger:0.08, duration:0.7,
        ease:'back.out(1.2)', scrollTrigger:ST('.tf-bento') });

      /* Pillars */
      gsap.to('.tf-pillars-hd', { autoAlpha:1, y:0, duration:0.7, ease:'power3.out', scrollTrigger:ST('.tf-pillars','top 82%') });
      gsap.to('.tf-pillars-wrap',{ autoAlpha:1, y:0, duration:0.9, ease:'power3.out', scrollTrigger:ST('.tf-pillars') });

      /* Timeline */
      gsap.to('.tf-tl-hd', { autoAlpha:1, y:0, duration:0.7, ease:'power3.out', scrollTrigger:ST('.tf-timeline','top 82%') });
      gsap.utils.toArray('.tf-tl-item').forEach((item, i) => {
        gsap.to(item, { autoAlpha:1, x:0, duration:0.7, delay:i*0.08,
          ease:'power3.out', scrollTrigger:ST('.tf-timeline') });
      });

      /* Subsidiaries */
      gsap.to('.tf-subs-hd', { autoAlpha:1, y:0, duration:0.7, ease:'power3.out', scrollTrigger:ST('.tf-subs','top 82%') });
      gsap.to('.tf-sub-card',{ autoAlpha:1, y:0, scale:1, stagger:0.13, duration:0.8,
        ease:'back.out(1.3)', scrollTrigger:ST('.tf-subs') });

      /* Market */
      gsap.to('.tf-mkt-hd',    { autoAlpha:1, y:0, duration:0.7, ease:'power3.out', scrollTrigger:ST('.tf-market','top 82%') });
      gsap.to('.tf-mkt-stock', { autoAlpha:1, x:0, rotateY:0, duration:1.0, ease:'power3.out', scrollTrigger:ST('.tf-market') });
      gsap.to('.tf-mkt-text > *',{ autoAlpha:1, x:0, stagger:0.13, duration:0.75, ease:'power3.out', scrollTrigger:ST('.tf-market','top 72%') });

      /* Philosophy — scrub so it reverses on scroll up */
      const philoTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.tf-philosophy',
          start: 'top 75%',
          end: 'top 20%',
          scrub: 0.8,
        }
      });
      philoTl
        .to('.tf-philo-label',   { autoAlpha:1, y:0, duration:0.3, ease:'power2.out' })
        .to('.tf-philo-word',    { autoAlpha:1, y:0, rotateX:0, stagger:0.08, duration:0.4, ease:'power3.out' }, '-=0.1')
        .to('.tf-philo-divider', { autoAlpha:1, scaleX:1, duration:0.35, ease:'power2.inOut' }, '-=0.1');

      /* CTA */
      gsap.to('.tf-cta-content > *',{ autoAlpha:1, y:0, stagger:0.12, duration:0.7,
        ease:'power3.out', scrollTrigger:ST('.tf-cta') });

    }, pageRef);
    return () => ctx.revert();
  }, []);

  /* ═══════════════════════════════════════════════════════
     JSX
  ══════════════════════════════════════════════════════ */
  return (
    <div ref={pageRef} className="min-h-screen bg-white overflow-x-hidden relative">

      {/* Scroll progress */}
      <div className="fixed left-0 top-0 bottom-0 w-[3px] z-50 pointer-events-none">
        <div ref={progressRef} className="w-full h-full"
          style={{ background:`linear-gradient(to bottom,${B.purple},${B.gold})`, transformOrigin:'top center' }} />
      </div>

      <Navbar />

      {/* ═════════════════════════════════════════════════
          §1. HERO — LEFT/RIGHT SPLIT
      ═════════════════════════════════════════════════ */}
      <section className="relative lg:min-h-screen flex items-start lg:items-center overflow-hidden"
        style={{ background:`linear-gradient(160deg, ${B.dark} 0%, ${B.dark2} 40%, #200040 70%, ${B.dark} 100%)` }}>

        {/* Fine grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity:0.04,
          backgroundImage:'linear-gradient(rgba(255,255,255,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.25) 1px,transparent 1px)',
          backgroundSize:'80px 80px' }} />

        {/* Ambient glows */}
        <div className="absolute pointer-events-none" style={{ top:'15%', left:'2%', width:480, height:480, borderRadius:'50%', background:B.purple, filter:'blur(130px)', opacity:0.30 }} />
        <div className="absolute pointer-events-none" style={{ bottom:'15%', right:'0%', width:380, height:380, borderRadius:'50%', background:B.gold, filter:'blur(110px)', opacity:0.11 }} />

        {/* Main grid — left text, right orb */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[100px] pb-16 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-4 items-center">

            {/* ── Content: centered on mobile, left-aligned on lg+ ── */}
            <div className="text-center lg:text-left">
              <div className="tf-hero-eyebrow inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-black tracking-widest uppercase mb-7"
                style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.14)',
                  color:B.gold, backdropFilter:'blur(14px)' }}>
                <span className="w-2 h-2 rounded-full animate-ping" style={{ background:B.gold }} />
                The Capital House
              </div>

              <h1 className="tf-hero-title font-black text-white mb-3"
                style={{
                  fontFamily:"'Playfair Display', serif",
                  fontSize:'clamp(2.2rem, 9vw, 7.5rem)',
                  lineHeight:0.98,
                  letterSpacing:'-0.025em',
                  transformStyle:'preserve-3d',
                }}>
                FUND
                <span style={{
                  background:`linear-gradient(135deg, ${B.gold} 0%, #e8b84b 50%, ${B.gold} 100%)`,
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                }}>VISER</span>
              </h1>

              <p className="tf-hero-title font-black mb-6"
                style={{
                  fontFamily:"'Playfair Display', serif",
                  fontSize:'clamp(0.75rem, 3.5vw, 1.7rem)',
                  letterSpacing:'0.18em',
                  textTransform:'uppercase',
                  color:'rgba(255,255,255,0.40)',
                  transformStyle:'preserve-3d',
                }}>
                Capital (India) Ltd.
              </p>

              <p className="tf-hero-sub text-base sm:text-lg leading-relaxed mb-9 max-w-md mx-auto lg:mx-0"
                style={{ color:'rgba(255,255,255,0.62)' }}>
                Pioneering the future of investment — where deep market knowledge meets
                precision financial structuring. BSE-listed. Trust-driven. Since 1993.
              </p>

              <div className="tf-hero-btns flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a href="#foundation"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-black text-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                  style={{ background:`linear-gradient(135deg, ${B.gold}, #a87510)`,
                    boxShadow:`0 14px 40px rgba(${B.gRgb},0.34)` }}>
                  Discover Our Story <ChevronRight className="w-5 h-5" />
                </a>
                <a href="https://www.bseindia.com/stock-share-price/fundviser-capital-(india)-ltd/fundviser/530197/"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-black text-white border transition-all duration-300 hover:scale-105"
                  style={{ background:'rgba(255,255,255,0.07)', borderColor:'rgba(255,255,255,0.18)', backdropFilter:'blur(14px)' }}>
                  <BarChart3 className="w-4 h-4" style={{ color:B.gold }} />
                  BSE: 530197
                </a>
              </div>

              {/* Stat bar — 2×2 grid on mobile, inline row on desktop */}
              <div className="tf-hero-statbar mt-10">
                {/* Mobile: 2×2 grid */}
                <div className="grid grid-cols-2 gap-3 lg:hidden">
                  {[
                    { val:'30+', label:'Years of Legacy' },
                    { val:'530197', label:'BSE Listed' },
                    { val:'3', label:'Subsidiaries' },
                    { val:'4+', label:'Sectors' },
                  ].map((s, i) => (
                    <div key={i} className="text-center rounded-xl py-3 px-2"
                      style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
                      <p className="text-lg font-black text-white mb-0.5" style={{ fontFamily:"'Playfair Display', serif" }}>{s.val}</p>
                      <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color:`rgba(${B.gRgb},0.60)` }}>{s.label}</p>
                    </div>
                  ))}
                </div>
                {/* Desktop: inline divider row */}
                <div className="hidden lg:flex items-center justify-start gap-0">
                  {[
                    { val:'30+', label:'Years' },
                    { val:'BSE 530197', label:'Listed' },
                    { val:'3', label:'Subsidiaries' },
                    { val:'4+', label:'Sectors' },
                  ].map((s, i) => (
                    <React.Fragment key={i}>
                      <div className="text-left pr-6" style={{ paddingLeft: i===0 ? 0 : 24 }}>
                        <p className="text-xl font-black text-white" style={{ fontFamily:"'Playfair Display', serif" }}>{s.val}</p>
                        <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color:`rgba(${B.gRgb},0.60)` }}>{s.label}</p>
                      </div>
                      {i < 3 && <div style={{ width:1, height:28, background:'rgba(255,255,255,0.12)', flexShrink:0, marginRight:24 }} />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: mobile image card / desktop spacer ── */}
            <div className="lg:hidden mt-2 mb-4 relative rounded-2xl overflow-hidden"
              style={{ height: 270, boxShadow:'0 16px 48px rgba(54,1,83,0.40)' }}>
              <img src="/Vision.png" alt="Fundviser Capital"
                style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(6,0,16,0.65) 0%, rgba(54,1,83,0.20) 55%, transparent 100%)' }} />
            </div>
            <div className="hidden lg:block" />

          </div>
        </div>

        {/* ── Vision.png — full-bleed editorial panel, desktop only ── */}
        <div className="tf-hero-imgcol hidden lg:block" style={{
          position:'absolute', right:0, top:'0%', bottom:'9%',
          width:'52%', zIndex:3, overflow:'hidden',
          clipPath:'polygon(9% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}>
          {/* Image */}
          <img src="/Vision.png" alt="Fundviser Capital"
            style={{ width:'100%', height:'100%', objectFit:'cover',
              objectPosition:'center top', display:'block' }} />

          {/* Left-edge dark gradient — seamless blend into hero bg */}
          <div style={{ position:'absolute', inset:0, pointerEvents:'none',
            background:'linear-gradient(to right, rgba(6,0,16,0.96) 0%, rgba(6,0,16,0.68) 18%, rgba(6,0,16,0.22) 38%, transparent 58%)' }} />

          {/* Purple editorial colour grade */}
          <div style={{ position:'absolute', inset:0, pointerEvents:'none',
            background:`linear-gradient(155deg, rgba(${B.pRgb},0.42) 0%, rgba(${B.pRgb},0.18) 50%, transparent 78%)` }} />

          {/* Bottom dark vignette */}
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'35%', pointerEvents:'none',
            background:'linear-gradient(to top, rgba(6,0,16,0.72) 0%, transparent 100%)' }} />

          {/* Top dark vignette */}
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'22%', pointerEvents:'none',
            background:'linear-gradient(to bottom, rgba(6,0,16,0.55) 0%, transparent 100%)' }} />

          {/* Gold accent hairline — runs along the clip edge */}
          <div style={{ position:'absolute', top:0, bottom:0, left:'10%', width:1, pointerEvents:'none',
            background:`linear-gradient(to bottom, transparent 0%, rgba(${B.gRgb},0.60) 25%, rgba(${B.gRgb},0.60) 75%, transparent 100%)` }} />

          {/* Dot-grid texture overlay */}
          <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:0.045,
            backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize:'26px 26px' }} />

          {/* Watermark: SINCE / 1993 */}
          <div style={{ position:'absolute', bottom:'8%', right:'7%', pointerEvents:'none', userSelect:'none',
            fontFamily:"'Playfair Display', serif", fontWeight:900, lineHeight:1,
            color:'#fff', opacity:0.055, textAlign:'right', letterSpacing:'0.06em' }}>
            <div style={{ fontSize:'2.8rem' }}>SINCE</div>
            <div style={{ fontSize:'5.2rem', marginTop:'-0.12em' }}>1993</div>
          </div>

          {/* ── Floating card 1: BSE Live — lower-left area ── */}
          {/* <div className="tf-hero-fcard" style={{
            position:'absolute', bottom:'22%', left:'18%',
            padding:'14px 20px', borderRadius:18, zIndex:4,
            background:'rgba(6,0,16,0.84)', backdropFilter:'blur(24px)',
            border:`1px solid rgba(${B.gRgb},0.32)`,
            boxShadow:`0 18px 50px rgba(${B.pRgb},0.52), 0 0 0 1px rgba(${B.gRgb},0.08)`,
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#10b981',
                boxShadow:'0 0 0 3px rgba(16,185,129,0.28)',
                animation:'heroPulse 2.2s ease-in-out infinite' }} />
              <span style={{ color:`rgba(${B.gRgb},0.80)`, fontSize:10, fontWeight:900,
                letterSpacing:'0.14em', textTransform:'uppercase' }}>BSE Live</span>
            </div>
            <p style={{ color:'#fff', fontSize:22, fontWeight:900,
              fontFamily:"'Playfair Display', serif", marginBottom:2 }}>530197</p>
            <p style={{ color:'rgba(255,255,255,0.42)', fontSize:11 }}>Bombay Stock Exchange</p>
          </div> */}

          {/* ── Floating card 2: Est. 1993 — upper-right ── */}
          <div className="tf-hero-fcard" style={{
            position:'absolute', top:'16%', right:'12%',
            padding:'14px 20px', borderRadius:18, zIndex:4,
            background:`rgba(${B.pRgb},0.90)`, backdropFilter:'blur(20px)',
            border:`1px solid rgba(${B.gRgb},0.26)`,
            boxShadow:`0 12px 36px rgba(${B.pRgb},0.50)`,
          }}>
            <p style={{ color:`rgba(${B.gRgb},0.82)`, fontSize:10, fontWeight:800,
              letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:4 }}>Established</p>
            <p style={{ color:'#fff', fontSize:28, fontWeight:900,
              fontFamily:"'Playfair Display', serif", lineHeight:1 }}>1993</p>
            <p style={{ color:'rgba(255,255,255,0.46)', fontSize:11, marginTop:4 }}>Mumbai, India</p>
          </div>

          {/* ── Floating card 3: Sectors — upper-left of image ── */}
          {/* <div className="tf-hero-fcard" style={{
            position:'absolute', top:'38%', left:'20%',
            padding:'12px 18px', borderRadius:16, zIndex:4,
            background:'rgba(255,255,255,0.07)', backdropFilter:'blur(22px)',
            border:'1px solid rgba(255,255,255,0.15)',
            boxShadow:`0 10px 32px rgba(0,0,0,0.32)`,
          }}>
            <p style={{ color:`rgba(${B.gRgb},0.88)`, fontSize:9, fontWeight:900,
              letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:4 }}>Active Sectors</p>
            <div style={{ display:'flex', gap:6 }}>
              {['Finance','Cinema','Trade'].map(t => (
                <span key={t} style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.80)',
                  background:'rgba(255,255,255,0.10)', borderRadius:6, padding:'3px 8px',
                  border:'1px solid rgba(255,255,255,0.12)' }}>{t}</span>
              ))}
            </div>
          </div> */}
        </div>

        {/* Wave — full width, sits below image panel so white shows on both sides */}
        <div className="absolute bottom-0 w-full pointer-events-none" style={{ zIndex:2 }}>
          <svg viewBox="0 0 1440 72" className="w-full" preserveAspectRatio="none">
            <path d="M0,72 L1440,72 L1440,18 Q1080,72 720,36 Q360,0 0,38 Z" fill="white" />
          </svg>
        </div>
      </section>


      {/* ═════════════════════════════════════════════════
          §3. FOUNDATION — light theme, orb portal
      ═════════════════════════════════════════════════ */}
      <section id="foundation" className="tf-foundation relative overflow-hidden"
        style={{ background:'linear-gradient(145deg,#faf7ff 0%,#ffffff 50%,#fffcf5 100%)',
          paddingTop:80, paddingBottom:0 }}>

        {/* Subtle dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity:0.032,
          backgroundImage:`radial-gradient(circle, ${B.purple} 1px, transparent 1px)`,
          backgroundSize:'32px 32px' }} />
        {/* Ambient washes */}
        <div className="absolute pointer-events-none" style={{ top:'-10%', right:'-6%',
          width:520, height:520, borderRadius:'50%', background:B.purple,
          filter:'blur(160px)', opacity:0.06 }} />
        <div className="absolute pointer-events-none" style={{ bottom:'20%', left:'-4%',
          width:360, height:360, borderRadius:'50%', background:B.gold,
          filter:'blur(140px)', opacity:0.08 }} />

        {/* Main grid */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 xl:gap-20 items-center">

            {/* LEFT — content */}
            <div className="tf-found-text">
              <span style={{ display:'inline-block', padding:'5px 16px', borderRadius:999,
                fontSize:14, fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase',
                background:B.pLight, color:B.purple, marginBottom:20 }}>
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6"
                style={{ fontFamily:"'Playfair Display', serif" }}>
                Three Decades.{' '}
                <span style={{ background:`linear-gradient(135deg,${B.purple},${B.gold})`,
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  One Mission.
                </span>
              </h2>
              <p className="text-gray-500 leading-relaxed text-base sm:text-lg mb-4">
                Fundviser Capital represents a legacy of disciplined investing and forward-thinking vision. Over the years, we have built a strong network rooted in trust—consistently identifying opportunities that create enduring value.
              </p>
              <p className="text-gray-500 leading-relaxed text-base sm:text-lg mb-8">
                More than investors, we are long-term partners. Through deep market understanding, strategic structuring, and a commitment to excellence, Fundviser Capital has earned its reputation across India and the UAE.
              </p>


              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {['BSE-Listed','Pan-India','Multi-Sector','UAE Presence','Est. 1993'].map((t,i) => (
                  <span key={i} style={{
                    padding:'6px 16px', borderRadius:999, fontSize:12, fontWeight:700,
                    background:i%2===0?`rgba(${B.pRgb},0.07)`:`rgba(${B.gRgb},0.10)`,
                    color:i%2===0?B.purple:'#7c4a00',
                    border:`1px solid ${i%2===0?`rgba(${B.pRgb},0.14)`:`rgba(${B.gRgb},0.22)`}`,
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* RIGHT — 3D orb in dark portal circle */}
            <div className="tf-found-img flex items-center justify-center relative" style={{ minHeight:480 }}>
              {/* Outer ring gold */}
              <div style={{ position:'absolute', width:432, height:432, borderRadius:'50%',
                border:`1px solid rgba(${B.gRgb},0.22)`,
                animation:'firmFloat 13s ease-in-out infinite', pointerEvents:'none' }} />
              {/* Outer ring purple */}
              <div style={{ position:'absolute', width:472, height:472, borderRadius:'50%',
                border:`1px solid rgba(${B.pRgb},0.09)`,
                animation:'firmFloat 13s ease-in-out infinite', pointerEvents:'none' }} />

              {/* Dark portal */}
              <div style={{
                position:'relative', width:392, height:392, borderRadius:'50%',
                background:`radial-gradient(circle at 38% 36%, #200040 0%, #0d0020 55%, ${B.dark} 100%)`,
                boxShadow:`0 40px 100px rgba(${B.pRgb},0.28), 0 0 0 1px rgba(${B.gRgb},0.16), inset 0 1px 0 rgba(255,255,255,0.06)`,
                overflow:'hidden',
                animation:'firmFloat 13s ease-in-out infinite',
              }}>
                <div style={{ position:'absolute', inset:0, pointerEvents:'none',
                  background:`radial-gradient(ellipse at 50% 48%, rgba(${B.gRgb},0.18) 0%, rgba(${B.pRgb},0.26) 52%, transparent 75%)` }} />
                <div style={{ position:'absolute', inset:0, display:'flex',
                  alignItems:'center', justifyContent:'center' }}>
                  <FinanceOrb3D size={372} />
                </div>
              </div>

              {/* Floating card: BSE — bottom-left */}
              <div className="tf-found-badge" style={{
                position:'absolute', bottom:'4%', left:'3%',
                padding:'12px 18px', borderRadius:16,
                background:'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)',
                border:`1px solid rgba(${B.pRgb},0.11)`,
                boxShadow:`0 12px 36px rgba(${B.pRgb},0.12)`,
              }}>
                <p style={{ color:B.purple, fontSize:20, fontWeight:900,
                  fontFamily:"'Playfair Display', serif" }}>Excellence</p>
              </div>

              {/* Floating card: Est. 1993 — top-right */}
              <div className="tf-found-badge" style={{
                position:'absolute', top:'6%', right:'-2%',
                padding:'12px 18px', borderRadius:16,
                background:'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)',
                border:`1px solid rgba(${B.gRgb},0.18)`,
                boxShadow:`0 12px 36px rgba(${B.gRgb},0.10)`,
              }}>
                <p style={{ color:B.gold, fontSize:22, fontWeight:900,
                  fontFamily:"'Playfair Display', serif" }}>Trust Engine</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════
          §2. MARQUEE TICKER STRIP
      ═════════════════════════════════════════════════ */}
      <div style={{ background:`linear-gradient(90deg, ${B.dark} 0%, ${B.dark2} 50%, ${B.dark} 100%)`,
        padding:'14px 0', borderTop:`1px solid rgba(${B.gRgb},0.14)`,
        borderBottom:`1px solid rgba(${B.gRgb},0.14)` }}>
        <Marquee items={marqueeItems} />
      </div>


      {/* ═════════════════════════════════════════════════
          §4. BY THE NUMBERS — large typography
      ═════════════════════════════════════════════════ */}
      <section className="tf-numbers py-16 sm:py-24" style={{ background:'#faf5ff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span style={{ display:'inline-block', padding:'5px 16px', borderRadius:999,
              fontSize:14, fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase',
              background:B.pLight, color:B.purple }}>By the Numbers</span>
            <div className="mx-auto mt-4 h-[2px] w-12 rounded-full"
              style={{ background:`linear-gradient(to right,${B.purple},${B.gold})` }} />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon:Award,      end:30, suffix:'+', label:'Years of Legacy',        sub:'Est. 1993',             grad:`linear-gradient(135deg,${B.purple},${B.pMid})`, img:'/Trust.png' },
              { icon:Globe,      end:4,  suffix:'+', label:'Investment Sectors',     sub:'Across asset classes',  grad:'linear-gradient(135deg,#7c3a00,#cd9623)',        img:'/sustainable.jpeg' },
              { icon:Users,      end:3,  suffix:'',  label:'Subsidiary Companies',   sub:'Pan-India & UAE',       grad:'linear-gradient(135deg,#064035,#0a8060)',        img:'/UAE.jpg' },
              { icon:TrendingUp, end:null,suffix:'', label:'BSE Listed',             sub:'Bombay Stock Exchange', grad:'linear-gradient(135deg,#0f2470,#1e4dd8)',        img:'/BSE.jpeg' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <TiltCard key={i}
                  className="tf-num-item relative rounded-3xl group cursor-default"
                  style={{ boxShadow:'0 8px 36px rgba(0,0,0,0.11)', minHeight:200 }}>
                  {/* inner clip wrapper — overflow:hidden lives here, not on the 3D-transformed parent */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <img src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100 transition-transform" />
                    <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0" style={{ background:s.grad }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background:'linear-gradient(160deg,rgba(0,0,0,0.52),rgba(0,0,0,0.72))' }} />
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{ background:`linear-gradient(to right,${B.gold},${B.gMid})` }} />
                  </div>
                  <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 sm:p-9" style={{ minHeight:200 }}>
                    <div className="inline-flex p-3 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ background:'rgba(255,255,255,0.18)', backdropFilter:'blur(6px)', border:'1px solid rgba(255,255,255,0.24)' }}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-4xl sm:text-5xl font-black text-white mb-1 drop-shadow"
                      style={{ fontFamily:"'Playfair Display', serif" }}>
                      {s.end !== null ? <Counter end={s.end} suffix={s.suffix} /> : <span className="text-3xl">530197</span>}
                    </p>
                    <p className="font-bold text-white/90 text-sm mb-1">{s.label}</p>
                    <p className="text-xs text-white/55">{s.sub}</p>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═════════════════════════════════════════════════
          §5. INVESTMENT UNIVERSE
      ═════════════════════════════════════════════════ */}
      <InvestmentUniverse />




      {/* ═════════════════════════════════════════════════
          §6. PHILOSOPHY
      ═════════════════════════════════════════════════ */}
      <section className="tf-philosophy relative py-20 sm:py-32 overflow-hidden"
        style={{ background:`linear-gradient(135deg,${B.dark} 0%,${B.dark2} 45%,${B.purple} 80%,${B.dark} 100%)` }}>
        <div className="absolute pointer-events-none" style={{ top:'20%', right:'8%', width:300, height:300, borderRadius:'50%', background:B.gold, filter:'blur(100px)', opacity:0.10 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity:0.035,
          backgroundImage:'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize:'64px 64px' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <p className="tf-philo-label text-xs font-black tracking-widest uppercase mb-10"
            style={{ color:`rgba(${B.gRgb},0.65)` }}>— Our Philosophy —</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-snug flex flex-wrap justify-center gap-x-4 gap-y-2 mb-12"
            style={{ fontFamily:"'Playfair Display', serif", overflow:'hidden' }}>
            {['Strategic','Investments','for','Long‑Term','Growth','and','Stability'].map((w, i) => (
              <span key={i} className="tf-philo-word inline-block"
                style={{ color: ['Long‑Term','Growth'].includes(w) ? B.gold : 'white' }}>
                {w}
              </span>
            ))}
          </h2>
          <div className="tf-philo-divider flex items-center justify-center gap-4">
            <div className="h-px w-16" style={{ background:`rgba(${B.gRgb},0.30)` }} />
            <p className="text-sm font-black tracking-widest uppercase" style={{ color:`rgba(${B.gRgb},0.58)` }}>
              Fundviser Capital (India) Ltd.
            </p>
            <div className="h-px w-16" style={{ background:`rgba(${B.gRgb},0.30)` }} />
          </div>
        </div>
      </section>


      <SubsidiariesSection />


      {/* ═════════════════════════════════════════════════
          §7. THREE PILLARS — expanding accordion
      ═════════════════════════════════════════════════ */}
      <section className="tf-pillars py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="tf-pillars-hd text-center mb-12">
            <span style={{ display:'inline-block', padding:'5px 16px', borderRadius:999,
              fontSize:11, fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase',
              background:B.pLight, color:B.purple, marginBottom:12 }}>What We Stand For</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900"
              style={{ fontFamily:"'Playfair Display', serif" }}>
              The Three Pillars
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-12 rounded-full"
              style={{ background:`linear-gradient(to right,${B.purple},${B.gold})` }} />
          </div>

          <div className="tf-pillars-wrap hidden md:block">
            <ThreePillars />
          </div>

          {/* Mobile fallback: image cards using pillars data */}
          <div className="md:hidden flex flex-col gap-5">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="rounded-2xl overflow-hidden"
                  style={{ background:`linear-gradient(160deg,${B.dark2},#1a0035)`, border:`1px solid rgba(${B.gRgb},0.18)`, boxShadow:'0 8px 32px rgba(0,0,0,0.28)' }}>
                  {/* Image */}
                  <div style={{ position:'relative', height:190, overflow:'hidden' }}>
                    <img src={p.img} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                    <div style={{ position:'absolute', inset:0, background:`linear-gradient(to top, ${B.dark2} 0%, rgba(10,0,32,0.45) 50%, transparent 100%)` }} />
                    <div style={{ position:'absolute', inset:0, background:`linear-gradient(135deg, rgba(${B.pRgb},0.28) 0%, transparent 60%)` }} />
                    <div style={{ position:'absolute', top:12, left:14, display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ color:`rgba(${B.gRgb},0.75)`, fontSize:10, fontWeight:900, letterSpacing:'0.2em' }}>{p.num}</span>
                      <div style={{ display:'flex', alignItems:'center', gap:5, padding:'4px 11px', borderRadius:20, background:'rgba(0,0,0,0.38)', backdropFilter:'blur(10px)', border:`1px solid rgba(${B.gRgb},0.28)` }}>
                        <Icon style={{ width:11, height:11, color:B.gold }} />
                        <span style={{ color:B.gold, fontSize:10, fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase' }}>{p.label}</span>
                      </div>
                    </div>
                    <div style={{ position:'absolute', bottom:12, left:14, right:14 }}>
                      <h4 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.1rem', fontWeight:900, color:'#fff', margin:0, lineHeight:1.2 }}>{p.title}</h4>
                    </div>
                  </div>
                  {/* Body + detail items */}
                  <div style={{ padding:'16px 18px 20px' }}>
                    <p style={{ color:'rgba(255,255,255,0.65)', fontSize:13.5, lineHeight:1.75, marginBottom:(p.bullets||p.metrics||p.values)?14:0 }}>{p.body}</p>
                    {p.bullets && (
                      <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                        {p.bullets.map((b, bi) => (
                          <div key={bi} style={{ display:'flex', alignItems:'center', gap:9 }}>
                            <span style={{ width:5, height:5, borderRadius:'50%', background:B.gold, flexShrink:0 }} />
                            <span style={{ color:'rgba(255,255,255,0.72)', fontSize:12.5 }}>{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {p.metrics && (
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                        {p.metrics.map((m, mi) => (
                          <div key={mi} style={{ padding:'10px 12px', borderRadius:10, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.09)' }}>
                            <p style={{ color:'#fff', fontSize:11.5, fontWeight:700, marginBottom:2 }}>{m.label}</p>
                            <p style={{ color:'rgba(255,255,255,0.45)', fontSize:10.5, lineHeight:1.4 }}>{m.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {p.values && (
                      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                        {p.values.map((v, vi) => {
                          const VI = v.icon;
                          return (
                            <div key={vi} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'10px 12px', borderRadius:10, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
                              <div style={{ padding:5, borderRadius:7, background:'rgba(255,255,255,0.08)', flexShrink:0 }}>
                                <VI style={{ width:12, height:12, color:B.gold }} />
                              </div>
                              <div>
                                <p style={{ color:'#fff', fontSize:12, fontWeight:700, marginBottom:1 }}>{v.name}</p>
                                <p style={{ color:'rgba(255,255,255,0.45)', fontSize:11, lineHeight:1.4 }}>{v.desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

   

        <ContactSection />
      <Footer />
    </div>
  );
};

export default TheFirm;
