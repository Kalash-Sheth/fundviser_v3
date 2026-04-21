import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StockWidget from '../components/StockWidget';
import AboutSection from '@/components/AboutSection';
import Footer from '../components/Footer';
import {
  motion, AnimatePresence,
} from "framer-motion";
import {
  ArrowRight, ChevronRight, BarChart3, Building2,
  TrendingUp, ShieldCheck, 
} from "lucide-react";

const GOLD   = "#C9A030";
const PURPLE = "#3B0163";

/* ─── Utility: scroll-triggered visibility ─────────────────── */
const useScrollReveal = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        else setVisible(false);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const principles = [
  { title: "Market Intelligence", desc: "Deep sector research and real-time data analytics inform every move.", icon: BarChart3, img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80" },
  { title: "Capital Discipline", desc: "Strict risk frameworks ensure capital is preserved as it grows.", icon: ShieldCheck, img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&q=80" },
  { title: "Partnership First", desc: "We align our success entirely with our stakeholders' outcomes.", icon: Building2, img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop&q=80" },
  { title: "Relentless Innovation", desc: "Continuously evolving our approach to stay ahead of the market.", icon: TrendingUp, img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&q=80" },
];

const galleryImages = [
  { src: "Mumbai_HQ3.png", label: "Mumbai HQ" },
  { src: "z_12.jpeg", label: "Network" },
  { src: "about_us2.png", label: "Capital Strategy" },
  { src: "z_15.png", label: "Legacy & Trust" },
  { src: "z_14.png", label: "Partnerships" },
];

/* ─── Brand ─────────────────────────────────────────────── */
const B = {
  purple:  '#360153', pRgb: '54,1,83',
  pLight:  '#f3e5ff', pMid: '#5a0280',
  gold:    '#cd9623', gRgb: '205,150,35',
  gLight:  '#fdf5e0', gMid: '#e8b84b',
  dark:    '#060010', dark2: '#1a0030',
};

/* ─── Page data ─────────────────────────────────────────── */
const milestones = [
  { year:'1993', title:'Foundation',         body:'Incorporated as a financial advisory and investment holding company, laying the foundation for three decades of market expertise.', side:'right' },
  { year:'2003', title:'BSE Listing',         body:'Listed on the Bombay Stock Exchange (BSE: 530197), becoming a publicly accountable and transparently governed institution.', side:'left' },
  { year:'2014', title:'UAE Expansion',       body:'Extended cross-border operations to the UAE, establishing international investment channels and global trade relationships.', side:'right' },
  { year:'2019', title:'Entertainment Entry', body:'Launched Starlight Box Theatres — marking strategic entry into the cinema and entertainment sector across India.', side:'left' },
  { year:'2024', title:'Full Ecosystem',      body:'Three-subsidiary structure fully operational: Starlight Box Theatres, Silver Sage Trading, and DARS Transtrade.', side:'right' },
];

/* ─── Reveal wrapper ─────────────────────────────────────────── */
const Reveal = ({ children, delay = 0, dir = 'up', className = '' }) => {
  const [ref, visible] = useScrollReveal(0.1);
  const t = dir === 'up' ? 'translateY(60px)' : dir === 'left' ? 'translateX(-60px)' : dir === 'right' ? 'translateX(60px)' : dir === 'scale' ? 'scale(0.85)' : 'translateY(60px)';
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : t,
      transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
};


/* ─── Animated gold line ─────────────────────────────────────── */
const GoldLine = ({ width = 80 }) => {
  const [ref, visible] = useScrollReveal(0.1);
  return (
    <div ref={ref} style={{
      width: visible ? width : 0,
      height: 2,
      background: 'linear-gradient(to right, #c5963c, #f0c060, #c5963c)',
      borderRadius: 2,
      transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1) 200ms',
    }} />
  );
};

/* ─── 3D CSS Cube ────────────────────────────────────────────── */
const Cube3D = () => {
  const [rot, setRot] = useState(0);
  useEffect(() => {
    let raf;
    const tick = () => { setRot(r => r + 0.25); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const size = 160;
  const half = size / 2;
  const faces = [
    { transform: `translateZ(${half}px)`, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop&q=80' },
    { transform: `rotateY(90deg) translateZ(${half}px)`, img: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&h=400&fit=crop&q=80' },
    { transform: `rotateY(180deg) translateZ(${half}px)`, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop&q=80' },
    { transform: `rotateY(-90deg) translateZ(${half}px)`, img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop&q=80' },
    { transform: `rotateX(90deg) translateZ(${half}px)`, img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop&q=80' },
    { transform: `rotateX(-90deg) translateZ(${half}px)`, img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=400&fit=crop&q=80' },
  ];
  return (
    <div style={{ width: size, height: size, perspective: 600, margin: '0 auto' }}>
      <div style={{
        width: size, height: size,
        transformStyle: 'preserve-3d',
        transform: `rotateX(${rot * 0.4}deg) rotateY(${rot}deg)`,
        position: 'relative',
      }}>
        {faces.map((f, i) => (
          <div key={i} style={{
            position: 'absolute', width: size, height: size,
            transform: f.transform,
            overflow: 'hidden',
            border: '2px solid rgba(197,150,60,0.5)',
            borderRadius: 8,
          }}>
            <img src={f.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(54,1,83,0.15)' }} />
          </div>
        ))}
      </div>
    </div>
  );
};


/* ─── Main Page ─────────────────────────────────────────────── */
const Home = () => {
  const [activeGallery, setActiveGallery] = useState(null);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <div>
        <HeroSection />
        <StockWidget />

        {/* ══ ABOUT ══════════════════════════════════════════════ */}
        <AboutSection />

              {/* ═════════════════════════════════════════════════
          §8. MILESTONES TIMELINE
      ═════════════════════════════════════════════════ */}
      <section className="tf-timeline py-16 sm:py-24 overflow-hidden" style={{ background:'#faf5ff' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="tf-tl-hd text-center mb-14">
            <span style={{ display:'inline-block', padding:'5px 16px', borderRadius:999,
              fontSize:11, fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase',
              background:B.pLight, color:B.purple, marginBottom:12 }}>Our Journey</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900"
              style={{ fontFamily:"'Playfair Display', serif" }}>
              Milestones
            </h2>
          </div>

          {/* Timeline items */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[32px] sm:left-1/2 top-0 bottom-0 w-[2px]"
              style={{ background:`linear-gradient(to bottom,${B.purple},${B.gold})`, transform:'translateX(-50%)' }} />

            <div className="flex flex-col gap-10 sm:gap-14">
              {milestones.map((m, i) => (
                <div key={i} className={`tf-tl-item relative flex items-start gap-6 sm:gap-0 ${m.side==='left' ? 'sm:flex-row-reverse' : ''}`}>

                  {/* Content block */}
                  <motion.div
                    className={`flex-1 flex flex-col items-start pl-16 ${m.side==='right' ? 'sm:pl-0 sm:pr-12 sm:items-end sm:text-right' : 'sm:pl-12'}`}
                    initial={{ opacity:0, x: m.side==='right' ? -48 : 48 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:false, amount:0.35 }}
                    transition={{ duration:0.65, delay: i*0.04, ease:[0.16,1,0.3,1] }}>

                    {/* Year badge */}
                    <motion.span
                      className="inline-block px-4 py-1.5 rounded-full text-sm font-black mb-3"
                      style={{ background:`rgba(${B.pRgb},0.08)`, color:B.purple, border:`1px solid rgba(${B.pRgb},0.16)` }}
                      initial={{ opacity:0, y:12 }}
                      whileInView={{ opacity:1, y:0 }}
                      viewport={{ once:false, amount:0.35 }}
                      transition={{ duration:0.5, delay: i*0.04 + 0.1, ease:[0.16,1,0.3,1] }}>
                      {m.year}
                    </motion.span>

                    {/* Title — word by word */}
                    <h4 className="text-lg sm:text-xl font-black text-gray-900 mb-2"
                      style={{ fontFamily:"'Playfair Display', serif" }}>
                      {m.title.split(' ').map((word, wi) => (
                        <motion.span key={wi} style={{ display:'inline-block', marginRight:'0.3em' }}
                          initial={{ opacity:0, y:20 }}
                          whileInView={{ opacity:1, y:0 }}
                          viewport={{ once:false, amount:0.35 }}
                          transition={{ duration:0.45, delay: i*0.04 + 0.18 + wi*0.07, ease:[0.16,1,0.3,1] }}>
                          {word}
                        </motion.span>
                      ))}
                    </h4>

                    {/* Body */}
                    <motion.p
                      className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm"
                      initial={{ opacity:0, y:14 }}
                      whileInView={{ opacity:1, y:0 }}
                      viewport={{ once:false, amount:0.35 }}
                      transition={{ duration:0.55, delay: i*0.04 + 0.28, ease:[0.16,1,0.3,1] }}>
                      {m.body}
                    </motion.p>
                  </motion.div>

                  {/* Dot — center */}
                  <motion.div
                    className="absolute left-[24px] sm:left-1/2 flex items-center justify-center"
                    style={{ top:6, transform:'translateX(-50%)' }}
                    initial={{ scale:0, opacity:0 }}
                    whileInView={{ scale:1, opacity:1 }}
                    viewport={{ once:false, amount:0.35 }}
                    transition={{ duration:0.4, delay: i*0.04 + 0.05, ease:[0.34,1.56,0.64,1] }}>
                    <div style={{ width:18, height:18, borderRadius:'50%',
                      background:`linear-gradient(135deg,${B.purple},${B.gold})`,
                      border:'3px solid white', boxShadow:`0 0 0 3px rgba(${B.pRgb},0.25)` }} />
                  </motion.div>

                  {/* Spacer on opposite side (desktop) */}
                  <div className="hidden sm:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


            {/* ══ 7. GUIDING PRINCIPLES ══ */}
      <section className="py-16 sm:py-32 relative overflow-hidden" style={{ background:'linear-gradient(160deg, #0e0520 0%, #150830 50%, #0a0318 100%)' }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)", backgroundSize:"80px 80px" }} />
        <div className="absolute pointer-events-none" style={{ top:'10%', right:'8%', width:400, height:400, borderRadius:'50%', background:'#3B0163', filter:'blur(110px)', opacity:0.18 }} />
        <div className="absolute pointer-events-none" style={{ bottom:'10%', left:'5%', width:300, height:300, borderRadius:'50%', background:'#C9A030', filter:'blur(90px)', opacity:0.07 }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
          <Reveal className="text-center mb-10 sm:mb-20" once={false}>
            <span className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-5"
              style={{ background:"rgba(255,255,255,0.05)", color:"#888" }}>How We Operate</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4"
              style={{ fontFamily:"'Playfair Display', serif" }}>Guiding Principles</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base sm:text-lg">The foundation of enduring success and the bedrock of every client relationship.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={i} delay={i*0.1} once={false}>
                  <motion.div whileHover={{ y:-10 }} className="group relative h-full cursor-pointer">
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" style={{ background:`${GOLD}12` }} />
                    <div className="relative h-full p-5 sm:p-8 rounded-2xl flex flex-col overflow-hidden transition-all duration-400"
                      style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)" }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(4,2,10,0.92) 0%, rgba(4,2,10,0.55) 50%, rgba(4,2,10,0.3) 100%)" }} />
                      </div>
                      <motion.div className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                        style={{ background:`linear-gradient(135deg, ${PURPLE}, #5a0290)` }}>
                        <Icon className="w-6 h-6" style={{ color:GOLD }} />
                      </motion.div>
                      <h4 className="relative text-lg font-bold text-white mb-3" style={{ fontFamily:"'Playfair Display', serif" }}>{p.title}</h4>
                      <p className="relative text-gray-400 text-sm leading-relaxed flex-grow group-hover:text-gray-300 transition-colors duration-300">{p.desc}</p>
                      <motion.div className="relative mt-8 h-px rounded-full origin-left" style={{ background:GOLD, width:"2rem" }} whileHover={{ width:"100%" }} transition={{ duration:0.5 }} />
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 8. GALLERY MOSAIC ══ */}
      <section id="gallery" className="py-16 sm:py-32 relative overflow-hidden" style={{ background:'linear-gradient(160deg, #0a0318 0%, #130628 60%, #1a0838 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <Reveal className="text-center mb-10 sm:mb-20" once={false}>
            <span className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-5"
              style={{ background:`${GOLD}15`, color:GOLD }}>Our World</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-5"
              style={{ fontFamily:"'Playfair Display', serif" }}>Inside Fundviser Capital</h2>
            <div className="w-24 h-px mx-auto" style={{ background:`linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
          </Reveal>
          {/* Mobile */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {galleryImages.slice(0,4).map((img,i) => (
              <motion.div key={i} initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }}
                viewport={{ once:false, margin:"-40px" }} transition={{ delay:i*0.07, duration:0.6 }}
                onClick={() => setActiveGallery(i)}
                className="relative rounded-xl overflow-hidden cursor-pointer group border border-white/5"
                style={{ aspectRatio: i===0?"3/4":"1/1" }}>
                <img src={img.src} alt={img.label} className="w-full h-full object-cover brightness-70 group-hover:brightness-90 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3"><span className="text-white font-semibold text-xs tracking-wide">{img.label}</span></div>
              </motion.div>
            ))}
          </div>
          {/* Desktop mosaic */}
          <div className="hidden sm:grid grid-cols-12 gap-4 h-[580px]">
            {galleryImages.map((img, i) => {
              const colSpans = ["col-span-5 row-span-2","col-span-4","col-span-3","col-span-3","col-span-4","col-span-0 hidden"];
              return (
                <motion.div key={i} initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }}
                  viewport={{ once:false, margin:"-60px" }} transition={{ delay:i*0.07, duration:0.7 }}
                  whileHover={{ scale:1.025, zIndex:10 }}
                  onClick={() => setActiveGallery(i)}
                  className={`${colSpans[i]} ${i===0?"row-span-2":""} relative rounded-2xl overflow-hidden cursor-pointer group border border-white/5`}>
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover brightness-70 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-white font-semibold text-sm tracking-wide">{img.label}</span>
                  </div>
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderColor:GOLD }} />
                </motion.div>
              );
            })}
          </div>
        </div>
        <AnimatePresence>
          {activeGallery !== null && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setActiveGallery(null)}
              className="fixed inset-0 z-[200] bg-black/92 flex items-center justify-center p-4 sm:p-8 cursor-zoom-out">
              <motion.img initial={{ scale:0.82, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.82, opacity:0 }}
                src={galleryImages[activeGallery].src.replace("w=800&h=600","w=1400&h=900")}
                alt={galleryImages[activeGallery].label}
                className="max-w-4xl w-full rounded-2xl shadow-2xl border border-white/10" />
            </motion.div>
          )}
        </AnimatePresence>
      </section>



      {/* ═════════════════════════════════════════════════
          §10. MARKET PRESENCE — BSE
      ═════════════════════════════════════════════════ */}
      <section className="tf-market relative py-16 sm:py-24 overflow-hidden"
        style={{ background:`linear-gradient(135deg,${B.dark} 0%,${B.dark2} 40%,#260045 70%,${B.dark} 100%)` }}>
        <div className="absolute pointer-events-none" style={{ top:'15%', right:'5%', width:360, height:360, borderRadius:'50%', background:B.purple, filter:'blur(100px)', opacity:0.25 }} />
        <div className="absolute pointer-events-none" style={{ bottom:'15%', left:'5%', width:280, height:280, borderRadius:'50%', background:B.gold, filter:'blur(80px)', opacity:0.10 }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="tf-mkt-hd text-center mb-14">
            <span style={{ display:'inline-block', padding:'5px 16px', borderRadius:999,
              fontSize:11, fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase',
              background:'rgba(255,255,255,0.07)', color:B.gold, border:`1px solid rgba(${B.gRgb},0.22)`,
              marginBottom:12 }}>Capital Market Presence</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white"
              style={{ fontFamily:"'Playfair Display', serif" }}>
              Publicly Listed.{' '}
              <span style={{ color:B.gold }}>Transparently Governed.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: stock card */}
            <div className="tf-mkt-stock">
              <div style={{
                background:'rgba(255,255,255,0.06)', backdropFilter:'blur(20px)',
                border:`1px solid rgba(${B.gRgb},0.22)`, borderRadius:28,
                padding:'clamp(20px, 5vw, 40px)',
                boxShadow:`0 24px 80px rgba(${B.pRgb},0.40)`,
              }}>
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-6"
                  style={{ borderBottom:'1px solid rgba(255,255,255,0.10)' }}>
                  <div>
                    <p style={{ color:`rgba(${B.gRgb},0.7)`, fontSize:11, fontWeight:900, letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:4 }}>
                      Equity · BSE
                    </p>
                    <p style={{ color:'#fff', fontSize:26, fontWeight:900, fontFamily:"'Playfair Display', serif" }}>
                      FUNDVISER
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ background:'rgba(16,185,129,0.15)', border:'1px solid rgba(16,185,129,0.3)' }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:'#10b981', animation:'heroPulse 2.2s ease-in-out infinite' }} />
                    <span style={{ color:'#10b981', fontSize:12, fontWeight:900, letterSpacing:'0.1em', textTransform:'uppercase' }}>
                      Active
                    </span>
                  </div>
                </div>

                {/* Data grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-5">
                  {[
                    { label:'BSE Code',      value:'530197' },
                    { label:'Exchange',      value:'Bombay Stock Exchange' },
                    { label:'Segment',       value:'Capital Market' },
                    { label:'Series',        value:'Equity (EQ)' },
                    { label:'Status',        value:'Listed' },
                    { label:'Market',        value:'Pan-India & UAE' },
                  ].map((row, i) => (
                    <div key={i} className="p-4 rounded-xl"
                      style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
                      <p style={{ color:`rgba(${B.gRgb},0.60)`, fontSize:10, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:4 }}>
                        {row.label}
                      </p>
                      <p style={{ color:'rgba(255,255,255,0.90)', fontSize:14, fontWeight:700 }}>{row.value}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a href="https://www.bseindia.com/stock-share-price/fundviser-capital-(india)-ltd/fundviser/530197/"
                  target="_blank" rel="noopener noreferrer"
                  className="mt-8 w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-white transition-all duration-300 hover:scale-[1.02]"
                  style={{ background:`linear-gradient(135deg,${B.gold},#a87510)`,
                    boxShadow:`0 12px 36px rgba(${B.gRgb},0.30)` }}>
                  <BarChart3 className="w-5 h-5" />
                  View on BSE India
                </a>
              </div>
            </div>

            {/* Right: text */}
            <div className="tf-mkt-text">
              <div>
                <span style={{ display:'inline-block', padding:'5px 16px', borderRadius:999,
                  fontSize:11, fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase',
                  background:'rgba(255,255,255,0.07)', color:B.gold, border:`1px solid rgba(${B.gRgb},0.22)`,
                  marginBottom:20 }}>Why It Matters</span>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-5"
                  style={{ fontFamily:"'Playfair Display', serif" }}>
                  A Listed Company Held to the{' '}
                  <span style={{ color:B.gold }}>Highest Standards</span>
                </h3>
              </div>
              <div>
                <p className="text-base sm:text-lg leading-relaxed mb-6"
                  style={{ color:'rgba(255,255,255,0.62)' }}>
                  As a BSE-listed entity, Fundviser Capital operates under strict regulatory and disclosure norms. Our public accountability ensures that every stakeholder — investor, partner, or institution — can trust our financial integrity.
                </p>
              </div>
              <div>
                <ul className="flex flex-col gap-3">
                  {[
                    'Mandatory quarterly disclosure & audited financials',
                    'SEBI-compliant governance framework',
                    'Transparent shareholding structure',
                    'Independent board oversight & compliance',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div style={{ width:6, height:6, borderRadius:'50%', background:B.gold, flexShrink:0, marginTop:8 }} />
                      <span style={{ color:'rgba(255,255,255,0.72)', fontSize:14, lineHeight:1.7 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═════════════════════════════════════════════════
          §11. CTA
      ═════════════════════════════════════════════════ */}
      <section className="tf-cta relative py-20 sm:py-32 overflow-hidden bg-white">
        {/* Subtle bg pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity:0.03,
          backgroundImage:`radial-gradient(circle, ${B.purple} 1px, transparent 1px)`,
          backgroundSize:'36px 36px' }} />
        <div className="absolute pointer-events-none" style={{ top:'0%', left:'50%', transform:'translateX(-50%)', width:600, height:600, borderRadius:'50%', background:B.pLight, filter:'blur(80px)', opacity:0.7 }} />

        <div className="tf-cta-content relative z-10 max-w-3xl mx-auto px-4 text-center">
          <div>
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 20px',
              borderRadius:999, fontSize:11, fontWeight:900, letterSpacing:'0.14em', textTransform:'uppercase',
              background:B.pLight, color:B.purple, border:`1px solid rgba(${B.pRgb},0.18)`,
              marginBottom:28, display:'inline-flex' }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:B.gold, animation:'heroPulse 2.2s ease-in-out infinite', display:'inline-block' }} />
              Partner with Us
            </span>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-5 leading-tight"
              style={{ fontFamily:"'Playfair Display', serif" }}>
              Ready to Build Your{' '}
              <span style={{ background:`linear-gradient(135deg,${B.purple},${B.gold})`,
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                Financial Legacy?
              </span>
            </h2>
          </div>
          <div>
            <p className="text-gray-500 text-base sm:text-lg mb-10 leading-relaxed">
              Partner with Fundviser Capital and benefit from three decades of expertise, a strong BSE-listed presence, and an unwavering commitment to long-term growth.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-10 py-3.5 sm:py-4 rounded-xl font-black text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 text-base sm:text-lg"
              style={{ background:`linear-gradient(135deg,${B.purple},${B.pMid})`,
                boxShadow:`0 20px 48px rgba(${B.pRgb},0.28)` }}>
              Get In Touch <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/investment-sectors"
              className="inline-flex items-center gap-2 px-6 sm:px-10 py-3.5 sm:py-4 rounded-xl font-black text-gray-700 transition-all duration-300 hover:scale-105 border text-base sm:text-lg"
              style={{ border:`2px solid rgba(${B.pRgb},0.18)`, background:'rgba(255,255,255,0.5)' }}>
              Our Sectors <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>


        <Footer />
      </div>
    </div>
  );
};

export default Home;
