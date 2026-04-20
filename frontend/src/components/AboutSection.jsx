import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Shield, Target, Award, ArrowRight, TrendingUp, Globe, Building2, Gem, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PURPLE = '#360153';
const GOLD   = '#cd9623';

/* ── Animated counter ── */
const Counter = ({ value, duration = 1600 }) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let fired = false;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired) {
        fired = true;
        const num = parseFloat(value.replace(/[^0-9.]/g, ''));
        const suffix = value.replace(/[0-9.]/g, '');
        let cur = 0;
        const steps = Math.ceil(duration / 16);
        const inc = num / steps;
        const t = setInterval(() => {
          cur += inc;
          if (cur >= num) { setDisplay(value); clearInterval(t); }
          else setDisplay(Math.floor(cur) + suffix);
        }, 16);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);
  return <span ref={ref}>{display}</span>;
};

/* ── Motion helper ── */
const mv = (delay = 0, x = 0, y = 40) => ({
  initial:     { opacity: 0, y, x },
  whileInView: { opacity: 1, y: 0, x: 0 },
  viewport:    { once: false, amount: 0.2 },
  transition:  { duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] },
});

const stats = [
  { icon: Award,    value: '30+',  label: 'Years of Legacy',     sub: 'Since 1993' },
  { icon: Target,   value: '50+',  label: 'Investments Made',    sub: 'Across sectors' },
  { icon: Shield,   value: '98%',  label: 'Client Satisfaction', sub: 'Stakeholder trust' },
  { icon: Sparkles, value: '100+', label: 'Crore Portfolio',     sub: 'Assets managed' },
];

const assetClasses = [
  { icon: Building2, label: 'Real Estate',  desc: 'Stability & inflation hedge', color: '#7c3aed' },
  { icon: TrendingUp, label: 'Equities',    desc: 'Listed & unlisted growth',    color: '#059669' },
  { icon: Gem,        label: 'Bullion',     desc: 'Gold & silver reserves',      color: '#d97706' },
  { icon: Rocket,     label: 'Ventures',   desc: 'Asymmetric upside plays',     color: '#2563eb' },
];

/* ════════════════════════════════════════════════════════ */
const AboutSection = () => (
  <section style={{ background: '#fff', overflow: 'hidden', position: 'relative' }}>

    {/* ── Decorative bg elements ── */}
    <div style={{ position: 'absolute', top: '8%', right: '-4%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(54,1,83,0.045) 0%, transparent 70%)', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', bottom: '20%', left: '-3%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(205,150,35,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(54,1,83,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none', opacity: 0.6 }} />

    {/* ── PART 1: Editorial header ── */}
    <div className="px-4 sm:px-8 lg:px-12 relative" style={{ maxWidth: 1280, margin: '0 auto', paddingTop: 64 }}>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8" style={{ marginBottom: 28 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <motion.div {...mv(0)}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 16px', borderRadius: 999, background: 'rgba(54,1,83,0.06)', border: '1px solid rgba(54,1,83,0.14)', marginBottom: 18 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: GOLD, display: 'inline-block' }} />
              <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: PURPLE }}>Company Overview</span>
            </div>
          </motion.div>

          <h2 className="font-black text-gray-900" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
            {'Shaping the Future of'.split(' ').map((word, i) => (
              <motion.span key={i} style={{ display: 'inline-block', marginRight: '0.28em' }}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.05 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}>
                {word}
              </motion.span>
            ))}
            <motion.span style={{ display: 'inline-block' }}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#360153] to-yellow-500">
              Investment
            </motion.span>
          </h2>
        </div>

        <motion.p {...mv(0.35, 0, 20)}
          className="text-gray-500 sm:text-right leading-relaxed sm:max-w-[260px] lg:max-w-[320px]"
          style={{ fontSize: 14 }}>
          Mumbai-based. BSE-listed. Built on financial discipline and long-term value creation since 1993.
        </motion.p>
      </div>

      {/* Animated rule */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: 1, background: `linear-gradient(90deg, ${PURPLE}, ${GOLD}, transparent)`, transformOrigin: 'left', marginBottom: 48 }} />
    </div>

    {/* ── PART 2: Split — Image | Text ── */}
    <div className="px-4 sm:px-8 lg:px-12 pb-0 relative" style={{ maxWidth: 1280, margin: '0 auto' }}>
      <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">

        {/* ── LEFT: Image block ── */}
        <motion.div {...mv(0, -100, 0)} style={{ position: 'relative' }}>
          {/* Offset decorative frame */}
          <div style={{ position: 'absolute', top: 16, left: -16, right: 16, bottom: -16, borderRadius: 24, border: `2px solid rgba(54,1,83,0.10)`, background: 'transparent', zIndex: 0 }} />

          <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
            <img src="/about_us1.jpeg" alt="Fundviser Capital"
              style={{ width: '100%', minHeight: 240, maxHeight: 500, objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(54,1,83,0.30) 0%, transparent 55%)' }} />


            {/* Badge top-right */}
            <div style={{ position: 'absolute', top: 20, right: 5, background: `linear-gradient(135deg, ${PURPLE}, #5a0280)`, borderRadius: 12, padding: '8px 14px', boxShadow: `0 6px 20px rgba(54,1,83,0.35)` }}>
              <p style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', margin: 0 }}>Est.</p>
              <p style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: 0 }}>1993</p>
            </div>

            {/* Active badge top-left */}
            <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderRadius: 10, padding: '6px 12px', border: '1px solid rgba(16,185,129,0.2)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 0 3px rgba(16,185,129,0.2)' }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#065f46', letterSpacing: '0.06em' }}>Active · Mumbai</span>
            </div>
          </div>

          {/* Second image below */}
          <motion.div {...mv(0.22, -80, 0)} style={{ marginTop: 44, borderRadius: 16, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
            <img src="/about_us2.png" alt="Fundviser Capital — Markets"
              style={{ width: '100%', height: 250, objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(54,1,83,0.35) 0%, transparent 60%)' }} />
            {/* BSE badge bottom-left on second image */}
            <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(54,1,83,0.12)', borderRadius: 12, padding: '8px 14px', boxShadow: '0 6px 24px rgba(54,1,83,0.14)' }}>
              <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD, margin: 0 }}>BSE LISTED</p>
              <p style={{ fontSize: 16, fontWeight: 900, color: PURPLE, margin: '1px 0 0', letterSpacing: '0.04em' }}>530197</p>
            </div>
            {/* Label top-right */}
            <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(10px)', borderRadius: 8, padding: '5px 11px' }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.08em' }}>Capital Strategy</span>
            </div>
          </motion.div>

          {/* Glow shadow */}
          <div style={{ position: 'absolute', bottom: -24, left: '8%', right: '8%', height: 56, background: 'rgba(54,1,83,0.09)', filter: 'blur(20px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />
        </motion.div>

        {/* ── RIGHT: Content ── */}
        <motion.div className="pt-2 lg:pt-4"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>

          {/* Section label */}
          <motion.div {...mv(0.1)} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 3, height: 40, borderRadius: 4, background: `linear-gradient(to bottom, ${PURPLE}, ${GOLD})`, flexShrink: 0 }} />
            <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: PURPLE }}>Who We Are</span>
          </motion.div>

          {/* Sub-heading */}
          <motion.h3 {...mv(0.16)} className="font-black text-gray-900" style={{ fontSize: 'clamp(1.35rem, 2.3vw, 1.9rem)', lineHeight: 1.22, marginBottom: 20 }}>
            Active capital allocators —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#360153] to-yellow-500">not passive fund managers.</span>
          </motion.h3>

          {/* Lead paragraph */}
          <motion.p {...mv(0.22)} className="text-gray-600 leading-relaxed" style={{ fontSize: 'clamp(13px,1.4vw,15px)', marginBottom: 20 }}>
            Fundviser Capital (India) Ltd. is a Mumbai-based, BSE-listed investment company with a mandate to identify, structure, and grow capital across diversified asset classes.
          </motion.p>

          {/* Callout — key differentiator */}
          <motion.div {...mv(0.28)}
            style={{ background: 'linear-gradient(135deg, rgba(54,1,83,0.05) 0%, rgba(205,150,35,0.05) 100%)', border: `1px solid rgba(54,1,83,0.10)`, borderLeft: `3px solid ${PURPLE}`, borderRadius: 12, padding: '14px 18px', marginBottom: 20 }}>
            <p className="text-gray-700 leading-relaxed" style={{ fontSize: 'clamp(13px,1.3vw,14.5px)', fontStyle: 'italic' }}>
              "Our edge lies in our network, our ability to access off-market opportunities, and our rigour in structuring each investment for optimal risk-return outcomes."
            </p>
          </motion.div>

          {/* Para 3 */}
          <motion.p {...mv(0.33)} className="text-gray-600 leading-relaxed" style={{ fontSize: 'clamp(13px,1.4vw,15px)', marginBottom: 22 }}>
            Our stakeholders — institutional partners, retail shareholders, and co-investors benefit from our experience, our access, and our commitment to transparent, accountable capital management.
          </motion.p>

          {/* Asset class chips */}
          <motion.div {...mv(0.38)} style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(54,1,83,0.5)', marginBottom: 12 }}>Where We Invest</p>
            <div className="grid grid-cols-2 gap-2.5">
              {assetClasses.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.38 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, background: '#fafafa', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: `${a.color}12`, border: `1px solid ${a.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon style={{ width: 15, height: 15, color: a.color }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 12.5, fontWeight: 700, color: '#111', margin: 0, lineHeight: 1.2 }}>{a.label}</p>
                      <p style={{ fontSize: 10.5, color: '#888', margin: 0, lineHeight: 1.3 }}>{a.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div {...mv(0.56)}>
            <Link to="/what-we-do"
              className="inline-flex items-center gap-2 font-bold text-white rounded-xl group"
              style={{ padding: '13px 28px', background: `linear-gradient(135deg, ${PURPLE}, #5a0280)`, boxShadow: `0 8px 28px rgba(54,1,83,0.28)`, fontSize: 15, textDecoration: 'none' }}>
              Learn More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>

    {/* ── PART 3: Stats strip ── */}
    <div style={{ marginTop: 64, borderTop: '1px solid rgba(54,1,83,0.07)', background: 'linear-gradient(135deg, #faf5ff 0%, #fffdf5 100%)' }}>
      <div className="px-4 sm:px-8 lg:px-12" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            const borderClass = i === 0
              ? 'border-r border-[rgba(54,1,83,0.07)]'
              : i === 1
              ? 'border-r-0 md:border-r md:border-[rgba(54,1,83,0.07)]'
              : i === 2
              ? 'border-r border-[rgba(54,1,83,0.07)]'
              : '';
            return (
              <motion.div key={i} {...mv(0.12 + i * 0.08)}
                className={`group cursor-default relative ${borderClass}`}
                style={{ padding: 'clamp(24px,4vw,40px) clamp(12px,2vw,24px)', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', padding: 10, borderRadius: 12, background: 'rgba(54,1,83,0.06)', marginBottom: 12, transition: 'background 0.25s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(54,1,83,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(54,1,83,0.06)'}>
                  <Icon style={{ width: 18, height: 18, color: PURPLE }} />
                </div>
                <p className="font-black text-gray-900" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 3rem)', lineHeight: 1, marginBottom: 6 }}>
                  <Counter value={s.value} />
                </p>
                <p className="font-bold text-gray-700" style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', marginBottom: 3 }}>{s.label}</p>
                <p className="text-gray-400" style={{ fontSize: 11 }}>{s.sub}</p>
                <div style={{ position: 'absolute', bottom: 0, left: '25%', right: '25%', height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${PURPLE}, ${GOLD})`, transform: 'scaleX(0)', transition: 'transform 0.4s ease', transformOrigin: 'center' }}
                  className="group-hover:scale-x-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>

  </section>
);

export default AboutSection;
