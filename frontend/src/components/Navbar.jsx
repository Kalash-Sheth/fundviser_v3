import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown, Home, Building2, Briefcase,
  Network, Users, BarChart2, Shield, ArrowRight,
  Phone,
} from 'lucide-react';

/* ── per-link meta: icon + description ── */
const governanceLinks = [
  { name: 'Board of Directors', href: '/board-of-directors', icon: Users,     desc: 'Leadership & vision' },
  { name: 'Investor Info',      href: '/investor-info',      icon: BarChart2, desc: 'Disclosures & filings' },
  { name: 'Compliance',         href: '/compliance',         icon: Shield,    desc: 'Regulatory framework' },
];

const navLinks = [
  { name: 'Home',             href: '/',          icon: Home },
  { name: 'Company Overview', href: '/the-firm',  icon: Building2 },
  { name: 'What We Do',         href: '/what-we-do',  icon: Briefcase },
  { name: 'Our Subsidiaries',    href: '/our-subsidiaries',   icon: Network,     desc: 'Our group companies' },
];

/* ── Rich dropdown panel ── */
const DropdownPanel = ({ links, isOpen, onClose, alignLeft = false }) => (
  <div
    className={`absolute top-[calc(100%+12px)] ${alignLeft ? 'left-0' : 'left-1/2 -translate-x-1/2'} w-72 rounded-2xl overflow-hidden
      shadow-2xl shadow-[#360153]/20 border border-purple-100 bg-white
      transition-all duration-300 z-50
      ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'}`}
  >
    {/* Purple gradient top bar */}
    <div className="h-1 bg-gradient-to-r from-[#360153] via-purple-500 to-yellow-400" />

    <div className="p-2">
      {links.map((link, i) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.name}
            to={link.href}
            onClick={onClose}
            style={{ transitionDelay: isOpen ? `${i * 40}ms` : '0ms' }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl group transition-all duration-200
              hover:bg-gradient-to-r hover:from-[#360153]/8 hover:to-purple-50
              ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
          >
            <div className="w-9 h-9 rounded-lg bg-[#360153]/8 flex items-center justify-center flex-shrink-0 group-hover:bg-[#360153] transition-colors duration-200">
              <Icon className="w-4 h-4 text-[#360153] group-hover:text-white transition-colors duration-200" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 group-hover:text-[#360153] transition-colors">{link.name}</p>
              {link.desc && <p className="text-xs text-gray-400 mt-0.5">{link.desc}</p>}
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#360153] group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
          </Link>
        );
      })}
    </div>

  </div>
);

/* ── Main Navbar ── */
const Navbar = () => {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [governanceOpen, setGovernanceOpen] = useState(false);
  const [mobileGovOpen, setMobileGovOpen]   = useState(false);

  const governanceRef  = useRef(null);
  const govTimer       = useRef(null);

  const location = useLocation();

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* click-outside */
  useEffect(() => {
    const handler = (e) => {
      if (governanceRef.current && !governanceRef.current.contains(e.target)) setGovernanceOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* close mobile on route change */
  useEffect(() => {
    setMobileOpen(false);
    setMobileGovOpen(false);
  }, [location]);

  /* body scroll lock when mobile open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  const linkClass = (href) =>
    `relative text-[15px] font-bold tracking-wide transition-colors duration-200 group
     ${isActive(href) ? 'text-[#360153]' : 'text-gray-700 hover:text-[#360153]'}`;

  const dropBtnClass = (open, paths = []) => {
    const active = paths.some((p) => location.pathname.startsWith(p));
    return `flex items-center gap-1 text-[15px] font-bold tracking-wide transition-colors duration-200 group
      ${active || open ? 'text-[#360153]' : 'text-gray-700 hover:text-[#360153]'}`;
  };

  return (
    <>
      {/* ── Main nav bar ── */}
      <nav
        style={{
          top: 0,
          transition: 'box-shadow 0.3s ease, background 0.3s ease',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          background: scrolled ? 'rgba(255,255,255,0.96)' : '#ffffff',
          boxShadow: scrolled
            ? '0 2px 32px rgba(54,1,83,0.12), 0 1px 0 rgba(54,1,83,0.06)'
            : '0 1px 0 rgba(0,0,0,0.06)',
        }}
        className="fixed left-0 right-0 z-50"
      >
        {/* Animated purple bottom border that glows when scrolled */}
        <div
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
          style={{
            width: scrolled ? '100%' : '0%',
            background: 'linear-gradient(90deg, #360153, #a855f7, #eab308)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative">
                <img
                  src="/fundviser-logo.png"
                  alt="Fundviser Capital"
                  className="h-11 w-auto transition-all duration-300 group-hover:scale-105 drop-shadow-sm"
                />
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 rounded-lg bg-[#360153]/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10" />
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">

              {navLinks.map((link) => (
                <Link key={link.name} to={link.href} className={`${linkClass(link.href)} px-4 py-2 rounded-xl hover:bg-[#360153]/5`}>
                  {link.name}
                  {/* Active dot */}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#360153]" />
                  )}
                  {/* Hover underline */}
                  <span className="absolute bottom-0.5 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-[#360153] to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}

              {/* What We Do dropdown
              <div
                ref={businessRef}
                className="relative"
                onMouseEnter={() => { clearTimeout(bizTimer.current); setBusinessOpen(true); }}
                onMouseLeave={() => { bizTimer.current = setTimeout(() => setBusinessOpen(false), 200); }}
              >
                <button
                  className={`${dropBtnClass(businessOpen, ['/what-we-do', '/investment-sectors', '/our-subsidiaries'])} px-4 py-2 rounded-xl hover:bg-[#360153]/5`}
                >
                  What We Do
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${businessOpen ? 'rotate-180 text-[#360153]' : ''}`} />
                </button>
                <DropdownPanel
                  links={businessLinks}
                  isOpen={businessOpen}
                  onClose={() => setBusinessOpen(false)}
                />
              </div> */}

              {/* Governance dropdown */}
              <div
                ref={governanceRef}
                className="relative"
                onMouseEnter={() => { clearTimeout(govTimer.current); setGovernanceOpen(true); }}
                onMouseLeave={() => { govTimer.current = setTimeout(() => setGovernanceOpen(false), 200); }}
              >
                <button
                  className={`${dropBtnClass(governanceOpen, ['/board-of-directors', '/investor-info', '/compliance'])} px-4 py-2 rounded-xl hover:bg-[#360153]/5`}
                >
                  Governance
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${governanceOpen ? 'rotate-180 text-[#360153]' : ''}`} />
                </button>
                <DropdownPanel
                  links={governanceLinks}
                  isOpen={governanceOpen}
                  onClose={() => setGovernanceOpen(false)}
                  alignLeft
                />
              </div>
            </div>

            {/* Right side: CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              {/* CTA */}
              <Link
                to="/contact"
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#360153]/30"
                style={{ background: 'linear-gradient(135deg, #360153 0%, #5a0280 100%)' }}
              >
                {/* Shine sweep */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                <Phone className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">Contact Us</span>
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-[#360153]/8"
                aria-label="Toggle menu"
              >
                <span
                  className={`absolute w-5 h-0.5 bg-[#360153] rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}
                />
                <span
                  className={`absolute w-5 h-0.5 bg-[#360153] rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`}
                />
                <span
                  className={`absolute w-5 h-0.5 bg-[#360153] rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ top: '72px' }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl transition-transform duration-400 ease-out flex flex-col
            ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Nav items */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {navLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms' }}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300
                    ${mobileOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
                    ${isActive(link.href) ? 'bg-[#360153]/8 text-[#360153]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#360153]'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive(link.href) ? 'bg-[#360153] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile: Governance accordion */}
            <div>
              <button
                onClick={() => setMobileGovOpen(!mobileGovOpen)}
                className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-semibold text-sm text-gray-700 hover:bg-gray-50 hover:text-[#360153] transition-all duration-200"
              >
                <span className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-gray-500" />
                  </div>
                  Governance
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileGovOpen ? 'rotate-180 text-[#360153]' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileGovOpen ? 'max-h-64 mt-1' : 'max-h-0'}`}>
                <div className="ml-4 pl-4 border-l-2 border-[#360153]/20 space-y-1 pb-2">
                  {governanceLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => { setMobileOpen(false); setMobileGovOpen(false); }}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-[#360153] hover:bg-[#360153]/5 transition-all duration-200"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#360153]/60" />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Drawer footer */}
          <div className="px-4 py-5 border-t border-gray-100 space-y-3">
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white text-sm shadow-lg shadow-[#360153]/25 transition-all duration-200 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #360153, #5a0280)' }}
            >
              <Phone className="w-4 h-4" /> Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer so page content clears the navbar */}
      <div style={{ height: '72px' }} />
    </>
  );
};

export default Navbar;
