import React from 'react';

interface ZeeSLogoProps {
  variant?: 'full' | 'compact' | 'icon' | 'hero' | 'footer';
  className?: string;
  glow?: boolean;
}

export const ZeeSLogo: React.FC<ZeeSLogoProps> = ({
  variant = 'full',
  className = '',
  glow = true
}) => {
  const glowStyle = glow
    ? {
        filter: 'drop-shadow(0 0 12px rgba(0, 242, 254, 0.45)) drop-shadow(0 0 24px rgba(0, 114, 255, 0.25))'
      }
    : {};

  // Standalone Icon / Monogram
  const Emblem = ({ size = 48 }: { size?: number }) => (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size, ...glowStyle }}>
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full transform transition-transform duration-500 hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="zeesCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f2fe" />
            <stop offset="50%" stopColor="#00c6ff" />
            <stop offset="100%" stopColor="#0072ff" />
          </linearGradient>

          <linearGradient id="zeesSilverGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="zeesDarkBackdrop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a1838" />
            <stop offset="100%" stopColor="#030919" />
          </linearGradient>

          <filter id="neonGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagon Shield Ring */}
        <polygon
          points="60,4 108,31 108,89 60,116 12,89 12,31"
          fill="url(#zeesDarkBackdrop)"
          stroke="url(#zeesCyanGrad)"
          strokeWidth="2.5"
          strokeOpacity="0.8"
        />

        {/* Inner Tech Concentric Orbital Track */}
        <circle
          cx="60"
          cy="60"
          r="46"
          stroke="url(#zeesSilverGrad)"
          strokeWidth="1.2"
          strokeDasharray="4 6 12 6"
          strokeOpacity="0.6"
        />

        {/* Diagonal Tech Crosshairs */}
        <line x1="18" y1="60" x2="28" y2="60" stroke="#00f2fe" strokeWidth="2" strokeLinecap="round" />
        <line x1="92" y1="60" x2="102" y2="60" stroke="#00f2fe" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="18" x2="60" y2="28" stroke="#00f2fe" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="92" x2="60" y2="102" stroke="#00f2fe" strokeWidth="2" strokeLinecap="round" />

        {/* Node Corner Coordinates */}
        <circle cx="60" cy="4" r="3" fill="#00f2fe" />
        <circle cx="108" cy="31" r="3" fill="#00f2fe" />
        <circle cx="108" cy="89" r="3" fill="#00f2fe" />
        <circle cx="60" cy="116" r="3" fill="#00f2fe" />
        <circle cx="12" cy="89" r="3" fill="#00f2fe" />
        <circle cx="12" cy="31" r="3" fill="#00f2fe" />

        {/* The Iconic Futuristic 'ZeeS' Monogram Glyph */}
        <g filter="url(#neonGlowEffect)">
          {/* Top Bar of Z */}
          <path
            d="M34 38 L86 38 L76 50 L46 50 Z"
            fill="url(#zeesCyanGrad)"
          />
          {/* Diagonal Slash of Z */}
          <path
            d="M86 38 L42 82 L34 82 L70 42 Z"
            fill="url(#zeesSilverGrad)"
          />
          {/* Bottom Bar of Z */}
          <path
            d="M34 82 L86 82 L76 70 L44 70 Z"
            fill="url(#zeesCyanGrad)"
          />
          {/* Center Digital Core Diamond */}
          <polygon
            points="60,54 66,60 60,66 54,60"
            fill="#ffffff"
          />
        </g>
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <Emblem size={44} />;
  }

  if (variant === 'hero') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full scale-150 animate-pulse-glow" />
          <Emblem size={110} />
        </div>
        <div className="space-y-1.5">
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-wider text-white">
            <span className="metallic-text">ZeeS</span>{' '}
            <span className="cyber-gradient-text">Group Global</span>
          </h1>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] text-cyan-300 uppercase">
              Next-Gen Digital Solutions
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        <Emblem size={44} />
        <div className="flex flex-col">
          <div className="font-heading text-lg sm:text-xl font-bold tracking-wider text-white flex items-center gap-1.5">
            <span className="metallic-text">ZeeS</span>
            <span className="text-cyan-400">Group Global</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-300/80 tracking-widest uppercase">
            Global Digital Ecosystem
          </span>
        </div>
      </div>
    );
  }

  // Default / Full Header Lockup
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Emblem size={40} />
      <div className="flex flex-col">
        <div className="font-heading text-base sm:text-lg font-bold tracking-wide text-white leading-tight flex items-center gap-1">
          <span className="metallic-text">ZeeS</span>
          <span className="text-cyan-400">Group</span>
          <span className="text-slate-300 text-xs font-semibold uppercase tracking-wider ml-0.5">Global</span>
        </div>
        <span className="text-[9px] font-mono text-cyan-300/80 tracking-widest uppercase">
          Digital Solutions & Tech
        </span>
      </div>
    </div>
  );
};
