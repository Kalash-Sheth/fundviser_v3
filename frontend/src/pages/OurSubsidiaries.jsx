import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Film, Package, Globe, ArrowRight, ExternalLink, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

/* ── Data ── */
const subsidiaries = [
  {
    id: 1,
    number: '01',
    name: 'Starlight Box Theatres Pvt. Ltd.',
    shortName: 'Starlight Box Theatres',
    tagline: "India's Pioneering Box Cinema Enterprise",
    accent: '#f59e0b',
    accentDark: '#b45309',
    accentLight: '#fef3c7',
    image: '/Starlight_logo_big.png',
    website: 'http://www.starlightcinemas.in/',
    icon: Film,
    badge: 'Cinema Innovation',
    description: [
      "Starlight Box Theatres Pvt. Ltd. is India's pioneering Box Cinema enterprise, revolutionizing the movie-going experience by converting ISO-certified cargo containers into fully functional single-screen cinema halls. As the first company of its kind in the country, we offer an innovative, cost-effective, and energy-efficient alternative to traditional multiplexes.",
      "Our Container Theatres are constructed using 100% eco-friendly materials, including recycled shipping containers and medium-density fibreboards (MDF). These theatres stand out for their quick construction turnaround period of just 2-3 months, making them an ideal solution for rapid deployment across India.",
    ],
    highlights: [
      { icon: CheckCircle, text: 'ISO-certified cargo container theatres' },
      { icon: CheckCircle, text: '100% eco-friendly construction materials' },
      { icon: CheckCircle, text: 'Quick 2-3 month construction turnaround' },
      { icon: CheckCircle, text: 'Full air-conditioning & sound insulation' },
      { icon: CheckCircle, text: 'Cafeteria, washrooms & digital projector room' },
      { icon: CheckCircle, text: 'First theatre operational in Devgad, Maharashtra' },
    ],
    stats: [
      { value: '2–3', unit: 'Months', label: 'Construction Time' },
      { value: '100%', unit: '', label: 'Eco-Friendly' },
      { value: '#1', unit: '', label: 'In India' },
    ],
    imageRight: false,
  },
  {
    id: 2,
    number: '02',
    name: 'DARS Transtrade Pvt. Ltd.',
    shortName: 'DARS Transtrade',
    tagline: 'Dynamic Global Trading & Logistics',
    accent: '#3b82f6',
    accentDark: '#1d4ed8',
    accentLight: '#eff6ff',
    image: '/dars.jpg',
    logo: null,
    website: null,
    icon: Package,
    badge: 'Global Trade',
    description: [
      "DARS Transtrade Pvt. Ltd. is a dynamic player in the global trading landscape, specializing in general trading across both domestic and international markets. As a proud subsidiary of Fundviser Capital (India) Ltd., we leverage our parent company's robust financial foundation to facilitate seamless trade operations worldwide.",
      "Leading our product portfolio is the e-Disha V600 — a next-generation vehicle tracking and safety system with precision GPS, instant SOS alerts, and SMS fallback for low-network areas. Rugged and weather-resistant, it is ideal for commercial vehicles, fleets, passenger transport, school buses, and emergency services.",
    ],
    highlights: [
      { icon: CheckCircle, text: 'Import & export across global borders' },
      { icon: CheckCircle, text: 'Commodity trading — raw materials to finished goods' },
      { icon: CheckCircle, text: 'End-to-end logistics & supply chain management' },
      { icon: CheckCircle, text: 'e-Disha V600 — precision GPS vehicle tracker' },
      { icon: CheckCircle, text: 'SOS alerts & SMS fallback for low-network areas' },
      { icon: CheckCircle, text: 'Rugged design for commercial & emergency fleets' },
    ],
    stats: [
      { value: 'Global', unit: '', label: 'Market Reach' },
      { value: 'e-Disha', unit: 'V600', label: 'Flagship Product' },
      { value: 'BSE', unit: 'Backed', label: 'Financial Standing' },
    ],
    imageRight: true,
  },
  {
    id: 3,
    number: '03',
    name: 'Silver Sage Trading LLC',
    shortName: 'Silver Sage',
    tagline: 'A Legacy of Trade Excellence Since 1963',
    accent: '#10b981',
    accentDark: '#065f46',
    accentLight: '#ecfdf5',
    image: null,
    logo: '/silver_sage_logo.png',
    website: 'http://www.silversagetrading.com/',
    icon: Globe,
    badge: 'UAE Trading',
    description: [
      "Silver Sage Trading LLC is a well-established, licensed UAE-based general trading company with a legacy dating back to 1963, headquartered in Dubai. Operating under an official government-issued general trading license, the company is built on decades of industry expertise and a strong foundation of trust.",
      "It delivers a diverse spectrum of trading services, including import, export, sourcing, and distribution, acting as a strategic bridge between global manufacturers and regional markets. With a broad portfolio spanning consumer goods, household essentials, industrial equipment, and technology solutions, Silver Sage Trading is committed to reliability, operational excellence, and long-term partnerships.",
    ],
    highlights: [
      { icon: CheckCircle, text: 'Licensed UAE general trading company since 1963' },
      { icon: CheckCircle, text: 'Headquartered in Dubai — government-issued license' },
      { icon: CheckCircle, text: 'Import, export, sourcing & distribution services' },
      { icon: CheckCircle, text: 'Consumer goods & household essentials trading' },
      { icon: CheckCircle, text: 'Industrial equipment & technology solutions' },
      { icon: CheckCircle, text: 'Strategic bridge between global manufacturers & markets' },
    ],
    stats: [
      { value: '1963', unit: '', label: 'Founded' },
      { value: 'Dubai', unit: '', label: 'Headquarters' },
      { value: 'UAE', unit: 'Licensed', label: 'Government Backed' },
    ],
    imageRight: false,
  },
];

/* ── Scroll Progress Line ── */
const ScrollProgressLine = () => {
  const lineRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          start: 'top top',
          end: 'max',
          scrub: 0,
        },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div className="fixed left-0 top-0 bottom-0 w-[3px] bg-gray-100/60 z-[70] hidden lg:block" style={{ transformOrigin: 'top' }}>
      <div
        ref={lineRef}
        className="w-full h-full origin-top"
        style={{
          background: 'linear-gradient(to bottom, #f59e0b, #3b82f6, #10b981)',
          transform: 'scaleY(0)',
          transformOrigin: 'top',
        }}
      />
    </div>
  );
};

/* ── Side Nav Dots ── */
const SideNav = ({ activeIndex }) => (
  <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[60] hidden lg:flex flex-col gap-5 items-center">
    {subsidiaries.map((sub, i) => (
      <a
        key={sub.id}
        href={`#subsidiary-${sub.id}`}
        title={sub.shortName}
        className="group flex items-center gap-2.5"
      >
        <span
          className="text-[14px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap"
          style={{ color: sub.accent }}
        >
          {sub.shortName.split(' ')[0]}
        </span>
        <span
          className="block rounded-full transition-all duration-300"
          style={{
            width: i === activeIndex ? '18px' : '12px',
            height: i === activeIndex ? '18px' : '12px',
            background: i === activeIndex ? sub.accent : '#d1d5db',
            boxShadow: i === activeIndex ? `0 0 0 5px ${sub.accent}30` : 'none',
          }}
        />
      </a>
    ))}
  </div>
);

/* ── Subsidiary Section ── */
const SubsidiarySection = ({ sub, index, onActive }) => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);   // image card wrapper — slides in
  const numBadgeRef = useRef(null);   // number badge — pops in
  const imgInnerRef = useRef(null);   // parallax target inside card
  const contentRef = useRef(null);   // text wrapper — children stagger
  const accentBlobRef = useRef(null);  // bg blob — fades in

  const Icon = sub.icon;
  const isRight = sub.imageRight; // true = image on right, content on left

  /* Set invisible start states before first paint */
  useLayoutEffect(() => {
    gsap.set(cardRef.current, { autoAlpha: 0, x: isRight ? 80 : -80 });
    gsap.set(numBadgeRef.current, { autoAlpha: 0, scale: 0.4 });
    gsap.set(accentBlobRef.current, { autoAlpha: 0, scale: 0.7 });
    if (contentRef.current) {
      gsap.set(Array.from(contentRef.current.children), { autoAlpha: 0, y: 55 });
    }
  }, [isRight]);

  useEffect(() => {
    const el = sectionRef.current;
    const ctx = gsap.context(() => {

      /* Track active side-dot */
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => onActive(index),
        onEnterBack: () => onActive(index),
      });

      /* Entry timeline */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });

      /* 1 — accent blob fades + scales in */
      tl.to(accentBlobRef.current, {
        autoAlpha: 1, scale: 1, duration: 1.0, ease: 'power2.out',
      }, 0);

      /* 2 — image card slides in from side */
      tl.to(cardRef.current, {
        autoAlpha: 1, x: 0, duration: 0.85, ease: 'power3.out',
      }, 0);

      /* 3 — number badge pops */
      tl.to(numBadgeRef.current, {
        autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)',
      }, 0.15);

      /* 4 — text children stagger up */
      tl.to(Array.from(contentRef.current.children), {
        autoAlpha: 1, y: 0,
        stagger: 0.1, duration: 0.65, ease: 'power3.out',
      }, 0.2);

      /* 5 — parallax on image (only when image exists) */
      if (imgInnerRef.current) {
        gsap.to(imgInnerRef.current, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

    }, el);
    return () => ctx.revert();
  }, [index, isRight, onActive]);

  return (
    <section
      ref={sectionRef}
      id={`subsidiary-${sub.id}`}
      className="relative py-24 overflow-hidden"
      style={{
        background: index % 2 === 0
          ? 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)'
          : 'linear-gradient(135deg, #f8f9fa 0%, #f0f0f0 100%)',
      }}
    >
      {/* Accent blob */}
      <div
        ref={accentBlobRef}
        className="absolute w-[600px] h-[600px] rounded-full filter blur-3xl pointer-events-none"
        style={{
          background: sub.accent,
          opacity: 0.05,
          top: '-100px',
          [isRight ? 'right' : 'left']: '-200px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRight ? 'lg:grid-flow-dense' : ''}`}>

          {/* ── Visual side ── */}
          <div className={isRight ? 'lg:col-start-2' : ''}>
            <div ref={cardRef} className="relative">

              {/* Number badge */}
              <div
                ref={numBadgeRef}
                className="absolute -top-6 -left-6 z-20 w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-xl"
                style={{ background: `linear-gradient(135deg, ${sub.accent}, ${sub.accentDark})` }}
              >
                {sub.number}
              </div>

              {sub.image ? (
                /* Photo card */
                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[480px] group">
                  {/* Parallax image — extra height so movement stays clipped */}
                  <div
                    ref={imgInnerRef}
                    className="absolute"
                   style={sub.id === 1 ? { position: 'relative', inset: 'unset' } : { inset: '-8% 0' }}
                  >
                    <img
                      src={sub.image}
                      alt={sub.shortName}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 opacity-60 pointer-events-none"
                    style={{ background: `linear-gradient(to top, ${sub.accentDark}dd 0%, transparent 50%)` }}
                  />

                  {/* Bottom info strip */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md border border-white/20"
                      style={{ background: `${sub.accent}30` }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {sub.badge}
                    </div>
                    {sub.logo && (
                      <div className="mt-3">
                        <img
                          src={sub.logo}
                          alt={sub.shortName + ' logo'}
                          className="h-10 w-auto object-contain"
                          style={{ filter: 'brightness(0) invert(1)' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Logo / no-photo card */
                <div
                  className="relative rounded-3xl overflow-hidden shadow-2xl h-[480px] flex flex-col items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${sub.accentDark} 0%, #0f172a 100%)` }}
                >
                  {/* Orbs */}
                  <div className="absolute top-8 left-8 w-40 h-40 rounded-full filter blur-3xl" style={{ background: sub.accent, opacity: 0.2 }} />
                  <div className="absolute bottom-8 right-8 w-32 h-32 rounded-full filter blur-3xl" style={{ background: sub.accent, opacity: 0.15 }} />
                  {/* Grid */}
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
                    backgroundSize: '40px 40px',
                  }} />

                  <div className="relative z-10 text-center px-8">
                    {sub.logo && (
                      <div className="mb-6 flex items-center justify-center">
                        <div className="bg-white rounded-2xl p-6 shadow-2xl">
                          <img src={sub.logo} alt={sub.shortName} className="h-20 w-auto object-contain" />
                        </div>
                      </div>
                    )}
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md border border-white/20 mb-4"
                      style={{ background: `${sub.accent}30` }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {sub.badge}
                    </div>
                    <p className="text-white/60 text-sm mt-2 font-medium">Est. 1963 · Dubai, UAE</p>
                  </div>

                  {/* Stats strip */}
                  <div className="absolute bottom-0 left-0 right-0 flex divide-x divide-white/10 border-t border-white/10">
                    {sub.stats.map((s, i) => (
                      <div key={i} className="flex-1 p-4 text-center backdrop-blur-sm">
                        <p className="text-white font-black text-lg leading-none">{s.value}</p>
                        {s.unit && <p className="text-white/60 text-xs">{s.unit}</p>}
                        <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Text side ── */}
          <div className={`min-w-0 overflow-hidden ${isRight ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
            <div ref={contentRef}>

              {/* Badge */}
              <div>
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5 border"
                  style={{ background: sub.accentLight, color: sub.accentDark, borderColor: `${sub.accent}40` }}
                >
                  <Icon className="w-3 h-3" />
                  {sub.badge}
                </span>
              </div>

              {/* Heading */}
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-3">
                  {sub.shortName}
                </h2>
              </div>

              {/* Tagline */}
              <div>
                <p className="text-lg font-semibold mb-5" style={{ color: sub.accent }}>
                  {sub.tagline}
                </p>
              </div>

              {/* Description */}
              <div>
                {sub.description.map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed text-base mb-4 break-words">{para}</p>
                ))}
              </div>

              {/* Highlights */}
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-6">
                  {sub.highlights.map((h, i) => {
                    const HIcon = h.icon;
                    return (
                      <div key={i} className="flex items-start gap-2.5">
                        <HIcon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: sub.accent }} />
                        <span className="text-gray-700 text-sm break-words min-w-0">{h.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stats row — image cards only */}
              {sub.image && (
                <div>
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {sub.stats.map((s, i) => (
                      <div
                        key={i}
                        className="rounded-2xl p-4 border text-center min-w-0"
                        style={{ background: sub.accentLight, borderColor: `${sub.accent}30` }}
                      >
                        <p className="font-black text-base leading-tight" style={{ color: sub.accentDark }}>
                          {s.value}{s.unit && <span className="text-xs ml-0.5">{s.unit}</span>}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div>
                <div className="flex items-center gap-4 flex-wrap">
                  {sub.website && (
                    <a
                      href={sub.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-7 py-3.5 text-white rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 group"
                      style={{
                        background: `linear-gradient(135deg, ${sub.accent}, ${sub.accentDark})`,
                        boxShadow: `0 10px 30px ${sub.accent}40`,
                      }}
                    >
                      <Globe className="w-4 h-4" />
                      Visit Website
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  )}
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 border-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 text-gray-700 hover:text-gray-900 hover:border-gray-400"
                    style={{ borderColor: `${sub.accent}50` }}
                  >
                    Enquire Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ── CTA Section ── */
const CtaSection = () => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    gsap.set(['.cta-pill', '.cta-h2', '.cta-desc', '.cta-btns'], { autoAlpha: 0, y: 40 });
  }, []);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(['.cta-pill', '.cta-h2', '.cta-desc', '.cta-btns'], {
        autoAlpha: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-br from-slate-950 via-[#1a002b] to-slate-950 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -top-10 left-1/4 w-[300px] h-[300px] rounded-full bg-[#360153] filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute -bottom-10 right-1/4 w-[250px] h-[250px] rounded-full bg-yellow-600 filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="cta-pill">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 text-yellow-400 rounded-full text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
            <Star className="w-3 h-3" />
            Grow Together
          </span>
        </div>
        <div className="cta-h2">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Interested in Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              Subsidiaries?
            </span>
          </h2>
        </div>
        <div className="cta-desc">
          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
            Whether you're looking to partner, invest, or learn more about any of our subsidiary companies, we'd love to hear from you.
          </p>
        </div>
        <div className="cta-btns flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-xl font-black shadow-xl hover:shadow-yellow-400/30 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
          >
            Get In Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/the-firm"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white rounded-xl font-bold hover:bg-white/5 hover:border-white/40 transition-all duration-300"
          >
            About Fundviser Capital
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ── Main Page ── */
const OurSubsidiaries = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const heroRef = useRef(null);

  // Set hero initial hidden state before paint
  useLayoutEffect(() => {
    gsap.set(['.hero-pill', '.hero-h1-word', '.hero-desc', '.hero-card'], { autoAlpha: 0, y: 40 });
    gsap.set('.hero-pill', { y: -20 });
  }, []);

  // Hero entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.to('.hero-pill', { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' })
        .to('.hero-h1-word', { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' }, '-=0.25')
        .to('.hero-desc', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to('.hero-card', { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }, '-=0.25');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <ScrollProgressLine />
      <SideNav activeIndex={activeIndex} />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative pt-1 pb-0 overflow-hidden bg-gradient-to-br from-slate-950 via-[#1a002b] to-slate-950">
        {/* Animated orbs */}
        <div className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-[#360153] filter blur-3xl opacity-15 animate-pulse" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] rounded-full bg-yellow-600 filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-600 filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Pill */}
            <div className="hero-pill inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 text-yellow-400 rounded-full text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" />
              Part of Fundviser Capital
            </div>

            {/* H1 — word by word */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              <span className="hero-h1-word inline-block">Our</span>{' '}
              <span className="hero-h1-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                Subsidiaries
              </span>
            </h1>

            <p className="hero-desc text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed mb-12">
              A diversified portfolio of companies driving innovation across cinema, global trade, and emerging markets — each a cornerstone of Fundviser Capital's expanding legacy.
            </p>

            {/* Three subsidiary cards */}
            <div className="grid md:grid-cols-3 gap-5 mt-8">
              {subsidiaries.map((sub) => {
                const Icon = sub.icon;
                return (
                  <a
                    key={sub.id}
                    href={`#subsidiary-${sub.id}`}
                    className="hero-card group relative rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 hover:-translate-y-1 transition-all duration-300 text-left"
                  >
                    <div
                      className="inline-flex p-3 rounded-xl mb-4 shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${sub.accent}30, ${sub.accentDark}30)`, border: `1px solid ${sub.accent}40` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: sub.accent }} />
                    </div>
                    <p className="text-white font-bold text-base mb-1">{sub.shortName}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{sub.tagline}</p>
                    <div className="mt-3 h-0.5 rounded-full" style={{ background: `linear-gradient(to right, ${sub.accent}, transparent)` }} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Wave transition */}
        <div className="relative h-20 overflow-hidden">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── SUBSIDIARY SECTIONS ── */}
      {subsidiaries.map((sub, i) => (
        <SubsidiarySection
          key={sub.id}
          sub={sub}
          index={i}
          onActive={setActiveIndex}
        />
      ))}

      <CtaSection />
      <Footer />
    </div>
  );
};

export default OurSubsidiaries;
