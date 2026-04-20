import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronRight, X, Star } from 'lucide-react';

/* ── Scroll-triggered fade-in ── */
const useInView = (threshold = 0.1) => {
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
  const t = direction === 'up' ? 'translateY(48px)' : direction === 'left' ? 'translateX(-48px)' : 'translateX(48px)';
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

const directors = [
  {
    name: 'Mr. Prem Krishan Jain',
    position: 'Chairman & Managing Director',
    tag: 'Leadership',
    tagColor: '#360153',
    image: '/prem-krishan-jain.jpg',
    credentials: 'M.B.A. (Finance & Marketing), B.A. Hons. in English — Gold Medalist, Bachelor of Journalism — Gold Medalist, M.A. (English), L.L.B.',
    bio: 'The visionary founder and driving force behind Fundviser Capital. With a rare combination of legal acumen, journalistic insight, and financial expertise, Mr. Jain has steered the company from its inception to a BSE-listed entity with a diversified portfolio spanning real estate, bullion, equities, and beyond.',
  },
  {
    name: 'Mrs. Kriti Jain',
    position: 'Whole Time Director',
    tag: 'Executive',
    tagColor: '#360153',
    image: '/Kriti_jain.jpeg',
    credentials: 'M.B.A. in Fashion Business & Luxury Brand Management. Extensive international experience in the U.S., Europe, and the UAE.',
    bio: "An accomplished executive with a global outlook, Mrs. Kriti Jain brings deep expertise in luxury brand management and fashion business strategy. She has led her brand 'GDR Fashions' across international markets and now channels her strategic and operational experience into the broader Fundviser Capital group.",
  },
  {
    name: 'Mr. Mohit Jain',
    position: 'Chief Financial Officer',
    tag: 'CFO',
    tagColor: '#360153',
    image: '/Mohit_jain.png',
    credentials: 'B.Com, M.B.A. (Finance & Marketing). 15+ years of entrepreneurial experience.',
    bio: 'Mr. Mohit Jain oversees all financial operations of Fundviser Capital, bringing entrepreneurial acumen and financial discipline to the role. His strategic approach to capital management and investment structuring ensures the company maintains strong financial health and growth momentum.',
  },
  {
    name: 'Mr. Triloki Nath Bansal',
    position: 'Independent Director',
    tag: 'Finance & Risk',
    tagColor: '#360153',
    image: '/triloki-nath-bansal.jpg',
    credentials: 'Practicing Chartered Accountant with 30+ years of banking experience.',
    bio: 'A seasoned financial expert specializing in Risk Management, Treasury Operations, Audit & Assurance, Tax Planning, and Corporate Finance. His three decades of banking experience bring rigorous financial governance and oversight to the Board.',
  },
  {
    name: 'Mr. Vinodkumar Singh',
    position: 'Independent Director',
    tag: 'Capital Markets',
    tagColor: '#360153',
    image: '/vinod-singh.jpg',
    credentials: 'Graduate in Economics; Post-Graduate in Management Studies, Mumbai University.',
    bio: 'With over two decades of hands-on experience in investment banking, capital markets, and investment advisory, Mr. Vinod Singh provides strategic counsel on market positioning and capital deployment. His deep understanding of financial ecosystems is invaluable to the Board.',
  },
  {
    name: 'Mr. Suresh Kumar Jain',
    position: 'Independent Director',
    tag: 'Banking & Policy',
    tagColor: '#360153',
    image: '/suresh-kumar-jain.jpeg',
    credentials: 'Former General Manager, Bank of India; Executive Director, Union Bank of India (Government appointment).',
    bio: 'A distinguished career banker with senior-level experience across banking, financial markets, and international banking operations. Previously an Independent Director of Fino Payments Bank Ltd. and currently on the boards of prestigious financial and management companies.',
  },
];

const BoardOfDirectors = () => {
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const modalDir = directors[selected] || null;

  const openModal = (i) => { setSelected(i); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);
  const prev = () => setSelected(i => (i - 1 + directors.length) % directors.length);
  const next = () => setSelected(i => (i + 1) % directors.length);

  /* close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  /* lock scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <div className="relative pt-20 min-h-[70vh] flex items-center bg-gradient-to-br from-slate-950 via-[#1a002b] to-slate-950 overflow-hidden">
        {/* Orbs */}
        <div className="absolute top-16 left-10 w-[400px] h-[400px] bg-[#360153] rounded-full filter blur-3xl opacity-25 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-yellow-600 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Decorative director silhouettes in background */}
        <div className="absolute inset-0 flex items-center justify-end pr-12 pointer-events-none overflow-hidden opacity-5">
          <div className="grid grid-cols-3 gap-4">
            {directors.slice(0, 6).map((d, i) => (
              <div key={i} className="w-24 h-32 rounded-2xl bg-white" />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center w-full">
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/8 border border-white/15 text-yellow-400 rounded-full text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md"
            style={{ animation: 'fadeDown 0.8s ease both' }}
          >
            <Star className="w-3.5 h-3.5 fill-yellow-400" />
            Leadership Team
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-6"
            style={{ animation: 'fadeUp 0.9s ease 0.15s both' }}
          >
            Board of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600">
              Directors
            </span>
          </h1>

          <p
            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            style={{ animation: 'fadeUp 0.9s ease 0.3s both' }}
          >
            The visionary minds and seasoned experts shaping the strategic direction of Fundviser Capital.
          </p>

          {/* Stats row */}
          <div
            className="flex flex-wrap justify-center gap-8 mt-14"
            style={{ animation: 'fadeUp 0.9s ease 0.45s both' }}
          >
            {[
              { val: '6', label: 'Board Members' },
              { val: '100+', label: 'Years Combined Experience' },
              { val: 'BSE', label: 'Listed Company' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black text-white">{s.val}</p>
                <p className="text-gray-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
            <path d="M0,60 L1440,60 L1440,20 Q1080,60 720,30 Q360,0 0,30 Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* ── DIRECTORS GRID ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <FadeIn className="text-center mb-16">
            <span className="inline-block px-5 py-2 bg-[#f3e5f5] text-[#360153] rounded-full text-sm font-bold tracking-widest uppercase mb-4">
              Meet the Team
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              The People Behind{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#360153] to-yellow-500">
                Our Success
              </span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {directors.map((dir, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:border-[#360153]/20 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                  onClick={() => openModal(i)}
                >
                  {/* Image — no overlay, full visible */}
                  <div className="relative overflow-hidden h-96">
                    <img
                      src={dir.image}
                      alt={dir.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Tag only
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold tracking-wider border backdrop-blur-sm"
                        style={{
                          color: dir.tagColor,
                          borderColor: `${dir.tagColor}60`,
                          background: `${dir.tagColor}20`,
                        }}
                      >
                        {dir.tag}
                      </span>
                    </div> */}
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <h3 className="text-gray-900 font-black text-xl leading-tight mb-1">{dir.name}</h3>
                    <p
                      className="text-sm font-bold tracking-wide mb-3"
                      style={{ color: dir.tagColor }}
                    >
                      {dir.position}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-5">{dir.credentials}</p>

                    {/* View Profile button — always visible */}
                    <button
                      className="w-full py-3 rounded-xl text-sm font-bold border-2 transition-all duration-300 group-hover:text-white group-hover:shadow-lg"
                      style={{
                        borderColor: dir.tagColor,
                        color: dir.tagColor,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = dir.tagColor;
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = dir.tagColor;
                      }}
                    >
                      View Full Profile →
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <FadeIn>
        <div className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=500&fit=crop&q=80"
            alt="Team"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-[#360153]/85 to-slate-900/90" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Guided by Experience. Driven by Vision.
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Our Board brings together decades of expertise across banking, finance, capital markets, and global trade — united by a single purpose.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black rounded-xl shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </FadeIn>

      {/* ── MODAL ── */}
      {modalOpen && modalDir && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            style={{ maxHeight: '90vh' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 overflow-y-auto" style={{ maxHeight: '90vh' }}>

              {/* Left — image */}
              <div className="relative min-h-[340px]">
                <img
                  src={modalDir.image}
                  alt={modalDir.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                {/* Tag */}
                <div className="absolute top-5 left-5">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md"
                    style={{ color: modalDir.tagColor, borderColor: `${modalDir.tagColor}40`, background: `${modalDir.tagColor}15` }}
                  >
                    {modalDir.tag}
                  </span>
                </div>

                {/* Nav arrows */}
                <div className="absolute bottom-5 left-5 right-5 flex justify-between">
                  <button
                    onClick={prev}
                    className="p-2.5 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md hover:bg-white/25 transition-all text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-white/60 text-xs self-center font-mono">
                    {String((selected || 0) + 1).padStart(2, '0')} / {String(directors.length).padStart(2, '0')}
                  </span>
                  <button
                    onClick={next}
                    className="p-2.5 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md hover:bg-white/25 transition-all text-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right — details */}
              <div className="p-8 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 leading-tight">{modalDir.name}</h3>
                    <p className="font-bold text-sm tracking-wider mt-1" style={{ color: modalDir.tagColor }}>
                      {modalDir.position}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700 shrink-0 ml-3"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Divider */}
                <div
                  className="h-0.5 w-12 rounded-full mb-6"
                  style={{ background: `linear-gradient(to right, ${modalDir.tagColor}, transparent)` }}
                />

                {/* Credentials */}
                <div className="mb-5">
                  <p className="text-xs font-black text-gray-400 tracking-widest uppercase mb-2">Qualifications</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{modalDir.credentials}</p>
                </div>

                {/* Bio */}
                <div className="flex-1">
                  <p className="text-xs font-black text-gray-400 tracking-widest uppercase mb-2">Profile</p>
                  <p className="text-gray-700 leading-relaxed text-sm">{modalDir.bio}</p>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-5 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    Director,{' '}
                    <span className="text-[#360153] font-semibold">Fundviser Capital (India) Ltd.</span>
                    {' '}— BSE: 530197
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .group:hover .group-hover\\:scale-108 {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
};

export default BoardOfDirectors;