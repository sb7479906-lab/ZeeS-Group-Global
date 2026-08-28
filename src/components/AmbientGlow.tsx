import React from 'react';

interface AmbientGlowProps {
  variant?: 'hero' | 'section' | 'subtle';
  position?: 'top' | 'center' | 'bottom' | 'split';
  className?: string;
}

export const AmbientGlow: React.FC<AmbientGlowProps> = ({
  variant = 'hero',
  position = 'center',
  className = ''
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-70" />

      {variant === 'hero' && (
        <>
          {/* Main Cyan Core Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-b from-cyan-500/20 via-blue-600/15 to-transparent blur-[120px] rounded-full pointer-events-none animate-pulse-glow" />

          {/* Deep Navy/Blue Atmosphere */}
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-700/15 blur-[100px] rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-cyan-600/15 blur-[110px] rounded-full" />

          {/* Horizontal Tech Scanning Line Effect */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />
        </>
      )}

      {variant === 'section' && (
        <>
          {position === 'top' && (
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full" />
          )}
          {position === 'center' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
          )}
          {position === 'split' && (
            <>
              <div className="absolute top-1/4 -left-32 w-[500px] h-[400px] bg-cyan-500/10 blur-[110px] rounded-full" />
              <div className="absolute bottom-1/4 -right-32 w-[500px] h-[400px] bg-blue-600/10 blur-[110px] rounded-full" />
            </>
          )}
        </>
      )}

      {variant === 'subtle' && (
        <div className="absolute inset-0 bg-radial from-cyan-950/20 via-transparent to-transparent opacity-60" />
      )}
    </div>
  );
};
