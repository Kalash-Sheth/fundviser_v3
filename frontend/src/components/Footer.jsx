import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, ExternalLink, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Company Overview', href: '/the-firm' },
    { name: 'Our Business', href: '/what-we-do' },
    { name: 'Investment Sectors', href: '/investment-sectors' },
    { name: 'Our Subsidiaries', href: '/our-subsidiaries' },
    { name: 'Board of Directors', href: '/board-of-directors' },
    { name: 'Investor Info', href: '/investor-info' },
    { name: 'Compliance', href: '/compliance' },
    { name: 'Contact', href: '/contact' },
  ];

  const subsidiaries = [
    { name: 'DARS Transtrade Pvt. Ltd.', href: '#' },
    { name: 'Starlight Box Theatres Pvt. Ltd.', href: 'https://www.starlightcinemas.in/' },
    { name: 'Silver Sage Trading LLC', href: 'http://www.silversagetrading.com/' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-[#360153] to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <div className="bg-white rounded-xl px-4 py-2 inline-block">
                <img
                  src="/footer-fundviser-logo.png"
                  alt="Fundviser Capital"
                  className="h-16 w-auto"
                />
              </div>
            </Link>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
              Fundviser Capital (India) Ltd., a leading financial entity listed on the Bombay Stock Exchange (BSE).
            </p>
            <a
              href="https://www.bseindia.com/stock-share-price/fundviser-capital-(india)-ltd/fundviser/530197/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-300 text-sm"
            >
              <span>View on BSE India</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Social Links */}
            <div className="flex space-x-4 mt-8">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                  >
                    <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 inline-flex items-center group text-sm"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subsidiary Companies */}
          <div>
            <h3 className="text-xl font-bold mb-3">Subsidiary Companies</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-5">
              Key entities contributing to our diverse portfolio.
            </p>
            <ul className="space-y-3">
              {subsidiaries.map((subsidiary, index) => (
                <li key={index}>
                  <a
                    href={subsidiary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 inline-flex items-center group text-sm"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                    {subsidiary.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  22/7, Manek Mahal,<br />
                  90 Veer Nariman Road,<br />
                  Churchgate, Mumbai 400020.<br />
                  Maharashtra, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <a
                  href="tel:+912231236586"
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                >
                  +91-22-31236586
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-yellow-400 shrink-0" />
                <a
                  href="mailto:info@fundvisercapital.in"
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                >
                  info@fundvisercapital.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2026{' '}
              <Link to="/" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                Fundviser Capital
              </Link>
              . All Rights Reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Developed by{' '}
              <a
                href="https://www.iwstechnologies.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                CSN
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;