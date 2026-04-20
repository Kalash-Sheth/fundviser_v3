import React, { useState, useEffect } from 'react';

const LogoAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible && !document.querySelector('.logo-animation-active')) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500 logo-animation-active ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative">
        {/* Animated rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border-4 border-[#e1bee7] rounded-full animate-ping"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 border-4 border-yellow-200 rounded-full animate-pulse"></div>
        </div>

        {/* Logo */}
        <div className="relative z-10 animate-scale-in">
          <div style={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: 20,
            padding: '20px 36px',
            maxWidth: 'min(320px, 80vw)',
            boxShadow: '0 8px 40px rgba(54,1,83,0.15)',
          }}>
            <img
              src="/fundviser-logo.png"
              alt="Fundviser Capital"
              className="drop-shadow-2xl"
              style={{ height: 'min(128px, 18vw)', width: 'auto', maxWidth: '100%' }}
            />
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-8 text-center animate-fade-in">
          <p className="text-gray-800 text-xl font-light tracking-wider">
            Excellence in Investment
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-scale-in {
          animation: scale-in 1s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out 0.5s both;
        }
      `}</style>
    </div>
  );
};

export default LogoAnimation;