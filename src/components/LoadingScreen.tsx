import React, { useEffect, useState } from 'react';
import { ZeeSLogo } from './ZeeSLogo';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING GLOBAL DIGITAL ECOSYSTEM...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const statusMessages = [
      'INITIALIZING GLOBAL DIGITAL ECOSYSTEM...',
      'CALIBRATING NEURAL NETWORK & CYBER NODES...',
      'ESTABLISHING SECURE ENCRYPTED CHANNELS...',
      'SYNCHRONIZING ENTERPRISE ASSETS...',
      'SYSTEM READY — WELCOME TO ZEES GROUP GLOBAL'
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 4;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setStatusText(statusMessages[4]);
        clearInterval(interval);

        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 300);
      } else {
        setProgress(currentProgress);
        const stageIndex = Math.min(
          Math.floor((currentProgress / 100) * (statusMessages.length - 1)),
          statusMessages.length - 2
        );
        setStatusText(statusMessages[stageIndex]);
      }
    }, 45);

    // Guaranteed fallback timeout to prevent any infinite freeze
    const fallbackTimeout = setTimeout(() => {
      setProgress(100);
      setIsFading(true);
      setTimeout(onComplete, 400);
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
    };
  }, [onComplete]);

  return (
    <div
      id="loading-screen"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020713] transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      {/* Atmospheric Ambient Glow */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-[120px] rounded-full pointer-events-none animate-pulse-glow" />

      {/* Main Logo & Identity */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md w-full">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-cyan-400/25 blur-2xl rounded-full scale-125" />
          <ZeeSLogo variant="icon" />
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-widest text-white mb-1.5">
          <span className="metallic-text">ZEE'S</span>{' '}
          <span className="cyber-gradient-text">GROUP GLOBAL</span>
        </h1>

        <p className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] text-cyan-300 uppercase mb-8">
          NEXT-GEN DIGITAL SOLUTIONS
        </p>

        {/* Loading Bar Container */}
        <div className="w-full max-w-xs bg-slate-900/80 border border-cyan-500/30 rounded-full h-1.5 p-0.5 relative overflow-hidden mb-4 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 rounded-full transition-all duration-100 relative"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer on progress head */}
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white blur-[2px] shadow-[0_0_8px_#fff]" />
          </div>
        </div>

        {/* Progress percent & status */}
        <div className="flex items-center justify-between w-full max-w-xs text-[11px] font-mono text-slate-400 mb-2">
          <span className="text-cyan-400 font-semibold">{progress}%</span>
          <span className="tracking-wider">SYS.ONLINE</span>
        </div>

        <p className="font-mono text-[10px] sm:text-xs text-cyan-300/80 tracking-widest h-5 text-center transition-all duration-200">
          {statusText}
        </p>
      </div>

      {/* Footer Branding Line */}
      <div className="absolute bottom-8 text-center text-[10px] font-mono text-slate-500 tracking-widest">
        SECURE ENTERPRISE INITIALIZATION • 2026
      </div>
    </div>
  );
};
