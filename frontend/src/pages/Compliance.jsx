import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FileText, Download, Calendar, Shield, ChevronDown, ExternalLink } from 'lucide-react';

/* ── Document data ── */
const YEARS = [
  {
    id: '2023-24',
    label: '2023 – 24',
    badge: '23-24',
    accent: '#7c3aed',
    accentLight: '#f5f3ff',
    from: '#360153',
    to: '#5a0280',
    docs: [
      { title: 'Board Meeting Notice — Q3 FY 2023-24', date: '31 Dec 2023', url: 'https://www.fundvisercapital.in/docs/intimations/BM_NOTICE_INTIMATION_31122023.pdf' },
      { title: 'Board Meeting Notice — Q2 FY 2023-24', date: '30 Sep 2023', url: 'https://www.fundvisercapital.in/docs/intimations/BM_NOTICE_INTIMATION_30092023.pdf' },
      { title: 'Board Meeting Notice — Q1 FY 2023-24', date: '30 Jun 2023', url: 'https://www.fundvisercapital.in/docs/intimations/BM_NOTICE_INTIMATION_30062023.pdf' },
    ],
  },
  {
    id: '2022-23',
    label: '2022 – 23',
    badge: '22-23',
    accent: '#b45309',
    accentLight: '#fffbeb',
    from: '#92400e',
    to: '#78350f',
    docs: [
      { title: 'Board Meeting Notice — Q4 FY 2022-23', date: '31 Mar 2023', url: 'https://www.fundvisercapital.in/docs/intimations/BM_NOTICE_INTIMATION_31032023.pdf' },
      { title: 'Board Meeting Notice — Q3 FY 2022-23', date: '31 Dec 2022', url: 'https://www.fundvisercapital.in/docs/intimations/BM_NOTICE_INTIMATION_31122022.pdf' },
      { title: 'Board Meeting Notice — Q2 FY 2022-23', date: '30 Sep 2022', url: 'https://www.fundvisercapital.in/docs/intimations/BM_NOTICE_INTIMATION_30092022.pdf' },
      { title: 'Board Meeting Notice — Q1 FY 2022-23', date: '30 Jun 2022', url: 'https://www.fundvisercapital.in/docs/intimations/BM_NOTICE_INTIMATION_30062022.pdf' },
    ],
  },
  {
    id: '2021-22',
    label: '2021 – 22',
    badge: '21-22',
    accent: '#047857',
    accentLight: '#ecfdf5',
    from: '#064e3b',
    to: '#065f46',
    docs: [
      { title: 'Board Meeting Notice — Q4 FY 2021-22', date: '31 Mar 2022', url: 'https://www.fundvisercapital.in/docs/intimations/BM_INTIMATION_NOTICE_31032022.pdf' },
      { title: 'Board Meeting Notice — Q3 FY 2021-22', date: '31 Dec 2021', url: 'https://www.fundvisercapital.in/docs/intimations/BM_INTIMATION_NOTICE_31122021.pdf' },
      { title: 'Board Meeting Notice — Q2 FY 2021-22', date: '30 Sep 2021', url: 'https://www.fundvisercapital.in/docs/intimations/BM_INTIMATION_NOTICE_30092021.pdf' },
      { title: 'Board Meeting Notice — Q1 FY 2021-22', date: '30 Jun 2021', url: 'https://www.fundvisercapital.in/docs/intimations/BM_INTIMATION_NOTICE_30062021.pdf' },
    ],
  },
];

const totalDocs = YEARS.reduce((n, y) => n + y.docs.length, 0);

/* ── Year section (collapsible on mobile) ── */
const YearSection = ({ year, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{
        borderColor: `${year.accent}30`,
        boxShadow: `0 4px 24px ${year.accent}10`,
      }}
    >
      {/* Year header */}
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${year.from} 0%, ${year.to} 100%)` }}
      >
        {/* Ghost label */}
        <div
          className="absolute right-5 top-1/2 -translate-y-1/2 font-black select-none pointer-events-none"
          style={{ fontSize: 64, color: 'rgba(255,255,255,0.07)', lineHeight: 1, letterSpacing: '-0.04em' }}
        >
          {year.badge}
        </div>

        <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-5 sm:py-6">
          <div className="flex items-center gap-4">
            {/* Badge */}
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-xs sm:text-sm"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: '#fff' }}
            >
              {year.badge}
            </div>
            <div>
              <p className="text-white/60 text-[10px] font-black tracking-widest uppercase mb-0.5">
                Financial Year
              </p>
              <h2 className="text-white font-black text-xl sm:text-2xl leading-tight">
                {year.label} Meetings
              </h2>
            </div>
          </div>

          {/* Doc count + toggle */}
          <div className="flex items-center gap-3">
            <span
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
            >
              <FileText style={{ width: 11, height: 11 }} />
              {year.docs.length} Documents
            </span>
            <button
              onClick={() => setOpen(o => !o)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300"
              style={{
                background: 'rgba(255,255,255,0.15)',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              <ChevronDown style={{ width: 16, height: 16, color: '#fff' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Document rows — always visible on lg+, collapsible on mobile */}
      <div className={`bg-white ${open ? 'block' : 'hidden'}`}>
        {year.docs.map((doc, i) => (
          <a
            key={i}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-100 last:border-b-0 transition-all duration-200"
            onMouseEnter={e => { e.currentTarget.style.background = `${year.accentLight}`; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            {/* Left */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              {/* Icon */}
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{ background: `${year.accent}18` }}
              >
                <FileText
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200"
                  style={{ color: year.accent }}
                />
              </div>

              {/* Info */}
              <div className="min-w-0">
                <p
                  className="text-sm sm:text-[15px] font-semibold text-gray-800 leading-snug truncate transition-colors duration-200 group-hover:text-gray-900"
                >
                  {doc.title}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Calendar style={{ width: 12, height: 12, color: '#9ca3af', flexShrink: 0 }} />
                  <span className="text-xs text-gray-400">{doc.date}</span>
                </div>
              </div>
            </div>

            {/* Right: download */}
            <div
              className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 ml-3 transition-all duration-200"
              style={{ color: year.accent }}
            >
              <span
                className="hidden sm:inline text-[11px] font-black tracking-wider px-2.5 py-1 rounded border"
                style={{ borderColor: `${year.accent}40`, background: `${year.accent}0d` }}
              >
                PDF
              </span>
              <Download className="w-4 h-4" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

/* ── Main page ── */
const Compliance = () => (
  <div className="min-h-screen" style={{ background: '#f4f6fb' }}>
    <style>{`
      @keyframes slowZoom { from{transform:scale(1);} to{transform:scale(1.06);} }
      @keyframes floatA { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-18px);} }
      @keyframes floatB { 0%,100%{transform:translateY(0);} 50%{transform:translateY(14px);} }
      .slow-zoom { animation: slowZoom 18s ease-in-out alternate infinite; }
      .float-a   { animation: floatA 7s ease-in-out infinite; }
      .float-b   { animation: floatB 9s ease-in-out infinite; }
    `}</style>

    <Navbar />

    {/* ── Hero ── */}
    <div
      className="relative pt-20 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0015 0%, #1a002b 50%, #0a0015 100%)' }}
    >
      {/* Background photo */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/capital_markets.jpg"
          alt=""
          className="w-full h-full object-cover slow-zoom"
          style={{ opacity: 0.07 }}
        />
      </div>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Orbs */}
      <div
        className="float-a absolute top-16 left-16 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(124,58,237,0.22) 0%,transparent 70%)', filter: 'blur(56px)' }}
      />
      <div
        className="float-b absolute bottom-8 right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(245,158,11,0.15) 0%,transparent 70%)', filter: 'blur(48px)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 text-yellow-400 rounded-full text-xs font-black tracking-widest uppercase mb-7 backdrop-blur-md">
          <Shield style={{ width: 13, height: 13 }} />
          BSE Listed · 530197
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-5">
          Corporate{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
            Compliance
          </span>
        </h1>
        <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
          Board Meeting Intimations and Governance Documents filed with BSE — Fundviser Capital (India) Ltd.
        </p>

        {/* Quick stats */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: 'Total Documents', value: totalDocs },
            { label: 'Financial Years', value: YEARS.length },
            { label: 'Exchange', value: 'BSE' },
          ].map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-md"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <div>
                <p className="text-gray-400 text-[10px] uppercase tracking-wider">{s.label}</p>
                <p className="text-white font-black text-base leading-tight">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave */}
      <div className="relative h-12">
        <svg viewBox="0 0 1440 48" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0,48 L1440,48 L1440,0 Q720,48 0,0 Z" fill="#f4f6fb" />
        </svg>
      </div>
    </div>

    {/* ── Content ── */}
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 pb-20 space-y-6">

      {/* Section label */}
      <div className="flex items-center gap-4 mb-2">
        <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
        <span className="text-xs font-black tracking-widest uppercase text-gray-400">
          Board Meeting Notices
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
        <span className="text-xs font-bold text-gray-400">{totalDocs} filings</span>
      </div>

      {/* Year sections */}
      {YEARS.map((year, i) => (
        <YearSection key={year.id} year={year} defaultOpen={i === 0} />
      ))}

      {/* BSE link strip */}
      <div
        className="rounded-2xl overflow-hidden mt-4"
        style={{
          background: 'linear-gradient(135deg, #0a0015 0%, #1a002b 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 px-5 sm:px-8 py-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(245,158,11,0.15)' }}
            >
              <ExternalLink className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="font-black text-white text-base">View All Filings on BSE</p>
              <p className="text-gray-400 text-xs mt-0.5">
                Fundviser Capital (India) Ltd · BSE: 530197
              </p>
            </div>
          </div>
          <a
            href="https://www.bseindia.com/stock-share-price/fundviser-capital-(india)-ltd/fundviser/530197/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-black text-sm transition-all hover:scale-105 hover:-translate-y-0.5 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 6px 20px rgba(245,158,11,0.4)' }}
          >
            Open BSE Portal
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>

    <Footer />
  </div>
);

export default Compliance;
