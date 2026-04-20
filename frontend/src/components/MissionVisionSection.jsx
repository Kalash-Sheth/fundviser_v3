import React, { useEffect, useRef, useState } from 'react';
import { Target, Eye, Shield, Zap, TrendingUp } from 'lucide-react';

/* ── Scroll-triggered fade-in ── */
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

const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [ref, inView] = useInView();
  const t = direction === 'up' ? 'translateY(48px)' : direction === 'left' ? 'translateX(-40px)' : 'translateX(40px)';
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : t,
      transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

const values = [
  {
    icon: Shield,
    title: 'Stability',
    description: 'We prioritize investments that offer long-term security and steady growth, ensuring a stable revenue stream for our stakeholders.',
    gradient: 'from-[#360153] to-[#5a0280]',
    glow: '#360153',
  },
  {
    icon: Zap,
    title: 'Strategic Foresight',
    description: 'Our approach is rooted in deep market understanding and strategic planning, allowing us to identify and capitalize on the most promising opportunities.',
    gradient: 'from-yellow-500 to-yellow-700',
    glow: '#f59e0b',
  },
  {
    icon: TrendingUp,
    title: 'Sustainable Growth',
    description: 'By continuously reinvesting profits into diversified, high-yield ventures, we drive sustained growth and resilience in our portfolio.',
    gradient: 'from-emerald-500 to-emerald-700',
    glow: '#10b981',
  },
];

const MissionVisionSection = () => {
  const [activeValue, setActiveValue] = useState(0);

  return (
    <section className="relative py-16 sm:py-28 bg-gradient-to-br from-slate-950 via-[#1a002b] to-slate-950 overflow-hidden">

      {/* ── Decorative elements ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Animated orbs */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full bg-[#360153] filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-[350px] h-[350px] rounded-full bg-yellow-600 filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header ── */}
        <FadeIn className="text-center mb-10 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 text-yellow-400 rounded-full text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" />
            Our Objective
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
            What Sets Us{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              Apart
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-xl max-w-2xl mx-auto">
            Guided by purpose and powered by precision — our mission, vision and values form the foundation of every decision we make.
          </p>
        </FadeIn>

        {/* ── Mission & Vision ── */}
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 mb-10 sm:mb-20">

          {/* Mission */}
          <FadeIn direction="left">
            <div className="relative h-full group rounded-3xl overflow-hidden border border-white/10 hover:border-[#360153]/50 transition-all duration-500 hover:-translate-y-1">
              {/* Background image */}
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80"
                alt="Mission"
                className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-20 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#360153]/40 via-slate-900/60 to-slate-900/90" />

              <div className="relative p-8 md:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-[#360153] to-[#5a0280] rounded-2xl shadow-xl shadow-[#360153]/30 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    {/* <p className="text-[#360153] text-xs font-black tracking-widest uppercase">01 / Mission</p> */}
                    <h3 className="text-2xl md:text-3xl font-black text-white">Our Mission</h3>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                  At Fundviser Capital, our mission is to identify and capitalize on unique investment opportunities that drive consistent, long-term growth. Through a disciplined approach to financial structuring and risk management, we aim to deliver superior returns to our stakeholders — reinforcing our reputation as a trusted and innovative investment partner.
                </p>
                {/* Accent bar */}
                <div className="mt-8 h-0.5 bg-gradient-to-r from-[#360153] to-transparent rounded-full" />
              </div>
            </div>
          </FadeIn>

          {/* Vision */}
          <FadeIn direction="right" delay={120}>
            <div className="relative h-full group rounded-3xl overflow-hidden border border-white/10 hover:border-yellow-500/40 transition-all duration-500 hover:-translate-y-1">
              {/* Background image */}
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop&q=80"
                alt="Vision"
                className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-20 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/30 via-slate-900/60 to-slate-900/90" />

              <div className="relative p-8 md:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl shadow-xl shadow-yellow-600/30 group-hover:scale-110 transition-transform duration-300">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    {/* <p className="text-yellow-400 text-xs font-black tracking-widest uppercase">02 / Vision</p> */}
                    <h3 className="text-2xl md:text-3xl font-black text-white">Our Vision</h3>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                  To establish Fundviser Capital as a premier investment company renowned for its strategic foresight, meticulous financial structuring, and commitment to sustainable long-term growth. We aspire to become a cornerstone in the global financial landscape — offering unparalleled stability and value creation across diverse investment sectors.
                </p>
                {/* Accent bar */}
                <div className="mt-8 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent rounded-full" />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Core Values ── */}
        <FadeIn className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-black text-white mb-3">Our Core Values</h3>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            The principles that guide every investment decision and stakeholder relationship.
          </p>
        </FadeIn>

        {/* Values — interactive tabs on desktop, stacked on mobile */}
        <div className="grid lg:grid-cols-3 gap-6">
          {values.map((val, i) => {
            const Icon = val.icon;
            const isActive = activeValue === i;
            return (
              <FadeIn key={i} delay={i * 100}>
                <button
                  onClick={() => setActiveValue(i)}
                  className="w-full text-left relative group rounded-3xl border transition-all duration-500 overflow-hidden"
                  style={{
                    borderColor: isActive ? `${val.glow}50` : 'rgba(255,255,255,0.07)',
                    background: isActive ? `${val.glow}12` : 'rgba(255,255,255,0.03)',
                    transform: isActive ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: isActive ? `0 20px 60px ${val.glow}20` : 'none',
                  }}
                >
                  {/* Glow blob inside card */}
                  <div
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full filter blur-3xl transition-opacity duration-500"
                    style={{
                      background: val.glow,
                      opacity: isActive ? 0.15 : 0,
                    }}
                  />

                  <div className="relative p-5 sm:p-8">
                    <div
                      className={`inline-flex p-4 rounded-2xl mb-6 shadow-lg transition-transform duration-300 bg-gradient-to-br ${val.gradient} ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h4 className="text-xl font-black text-white mb-3">{val.title}</h4>
                    <p className="text-gray-400 leading-relaxed text-sm">{val.description}</p>

                    {/* Bottom progress bar */}
                    <div className="mt-6 h-0.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${val.gradient} transition-all duration-500`}
                        style={{ width: isActive ? '100%' : '0%' }}
                      />
                    </div>
                  </div>
                </button>
              </FadeIn>
            );
          })}
        </div>

        {/* ── Bottom quote ── */}
        <FadeIn className="mt-10 sm:mt-20 text-center" delay={100}>
          <div className="inline-block max-w-3xl mx-auto px-5 sm:px-10 py-6 sm:py-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
            <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white italic leading-relaxed">
              &ldquo;We are committed to building a legacy — one that is marked by strategic foresight, financial innovation, and unwavering commitment to our stakeholders.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="h-px w-10 bg-yellow-400/50" />
              <p className="text-yellow-400 text-sm font-bold tracking-widest uppercase">Fundviser Capital</p>
              <div className="h-px w-10 bg-yellow-400/50" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default MissionVisionSection;
