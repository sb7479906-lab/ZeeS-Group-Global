import React, { useRef, useEffect, useState } from 'react';
import { ZeeSLogo } from './ZeeSLogo';
import { AmbientGlow } from './AmbientGlow';
import { ArrowRight, Sparkles, Globe, Shield, Cpu, Users, ChevronDown, LucideIcon } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface MetricPillar {
  title: string;
  desc: string;
  icon: string;
}

interface HeroData {
  statusText: string;
  titlePrimary: string;
  titleSecondary: string;
  slogan: string;
  description: string;
  pillars: MetricPillar[];
}

const DEFAULT_HERO_DATA: HeroData = {
  statusText: 'GLOBAL DIGITAL ECOSYSTEM & INNOVATION',
  titlePrimary: 'NEXT-GEN DIGITAL SOLUTIONS',
  titleSecondary: 'WEALTH MANAGEMENT',
  slogan: 'Your Partner for Global Success',
  description: 'Building modern digital experiences, scalable technology solutions and innovative global opportunities. From high-velocity web platforms and automated e-commerce to algorithmic market intelligence.',
  pillars: [
    { title: 'Digital Solutions', desc: 'Web & App Architecture', icon: 'Cpu' },
    { title: 'Global Vision', desc: 'Cross-Border Scalability', icon: 'Globe' },
    { title: 'Technology Driven', desc: 'Modern High-Speed Stack', icon: 'Shield' },
    { title: 'Customer Focused', desc: 'Dedicated Partnerships', icon: 'Users' }
  ]
};

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  Globe,
  Shield,
  Users
};

interface HeroProps {
  onOpenContact: () => void;
  onOpenConsultation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [heroData, setHeroData] = useState<HeroData>(DEFAULT_HERO_DATA);

  // Real-time Firestore listener for Hero dynamic content
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'company_info', 'hero'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as Partial<HeroData>;
        setHeroData({
          statusText: data.statusText || DEFAULT_HERO_DATA.statusText,
          titlePrimary: data.titlePrimary || DEFAULT_HERO_DATA.titlePrimary,
          titleSecondary: data.titleSecondary || DEFAULT_HERO_DATA.titleSecondary,
          slogan: data.slogan || DEFAULT_HERO_DATA.slogan,
          description: data.description || DEFAULT_HERO_DATA.description,
          pillars: data.pillars || DEFAULT_HERO_DATA.pillars
        });
      }
    }, (error) => {
      console.warn('Firestore hero stream fallback to static defaults:', error);
    });

    return () => unsub();
  }, []);

  // High-tech interactive digital globe rendering
  useEffect(() => {
    const canvas = globeCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let rotation = 0;
    const numPoints = 220;
    const globeRadius = Math.min(width, height) * 0.38;

    // Generate 3D sphere points (Fibonacci sphere algorithm)
    const points: { x: number; y: number; z: number; size: number; alpha: number }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      points.push({
        x: x * globeRadius,
        y: y * globeRadius,
        z: z * globeRadius,
        size: Math.random() * 1.8 + 1,
        alpha: Math.random() * 0.5 + 0.4
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      rotation += 0.004;

      // Draw outer tech orbital rings
      ctx.save();
      ctx.translate(centerX, centerY);

      // Ring 1 (Horizontal tilt)
      ctx.beginPath();
      ctx.ellipse(0, 0, globeRadius * 1.35, globeRadius * 0.45, Math.PI / 6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.18)';
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 12]);
      ctx.stroke();

      // Ring 2 (Vertical tilt)
      ctx.beginPath();
      ctx.ellipse(0, 0, globeRadius * 1.25, globeRadius * 0.35, -Math.PI / 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 114, 255, 0.2)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 8]);
      ctx.stroke();

      ctx.restore();

      // Project and sort 3D globe points
      const projected = points.map((p) => {
        // Rotate around Y axis
        const cosR = Math.cos(rotation);
        const sinR = Math.sin(rotation);
        const rotX = p.x * cosR - p.z * sinR;
        const rotZ = p.x * sinR + p.z * cosR;

        // Add subtle X-axis tilt
        const tilt = 0.35;
        const cosT = Math.cos(tilt);
        const sinT = Math.sin(tilt);
        const rotY = p.y * cosT - rotZ * sinT;
        const finalZ = p.y * sinT + rotZ * cosT;

        const scale = (finalZ + globeRadius * 2) / (globeRadius * 2.5);
        const screenX = centerX + rotX * scale;
        const screenY = centerY + rotY * scale;

        return {
          screenX,
          screenY,
          z: finalZ,
          size: p.size * scale,
          alpha: Math.max(0.1, (finalZ + globeRadius) / (globeRadius * 2)) * p.alpha
        };
      });

      // Sort by Z for proper depth
      projected.sort((a, b) => a.z - b.z);

      // Draw connecting network lines for close points
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.z < 0) continue; // connect front facing points only

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          if (p2.z < 0) continue;

          const dx = p1.screenX - p2.screenX;
          const dy = p1.screenY - p2.screenY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 48) {
            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.strokeStyle = '#00f2fe';
            ctx.globalAlpha = (1 - dist / 48) * 0.25 * ((p1.alpha + p2.alpha) / 2);
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const p of projected) {
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, Math.max(0.8, p.size), 0, Math.PI * 2);
        ctx.fillStyle = p.z > 0 ? '#00f2fe' : '#38bdf8';
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Extra glow for close front nodes
        if (p.z > globeRadius * 0.4) {
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, p.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = '#00f2fe';
          ctx.globalAlpha = 0.2;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Dynamic Background Atmosphere */}
      <AmbientGlow variant="hero" />

      {/* Interactive 3D Digital Globe in Center Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-45 sm:opacity-60">
        <canvas
          ref={globeCanvasRef}
          className="w-full h-full max-w-[700px] max-h-[700px]"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#060e22]/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider shadow-[0_0_20px_rgba(0,242,254,0.15)] mb-6 animate-pulse-glow">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-semibold">{heroData.statusText}</span>
        </div>

        {/* Center Logo with Cyber Aura */}
        <div className="mb-6 transform hover:scale-105 transition-transform duration-500">
          <ZeeSLogo variant="hero" glow />
        </div>

        {/* Main Title Banner */}
        <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-wide uppercase text-slate-100 max-w-4xl leading-tight mb-4">
          <span className="metallic-text">{heroData.titlePrimary}</span>{' '}
          <span className="text-cyan-400">&</span>{' '}
          <span className="cyber-gradient-text">{heroData.titleSecondary}</span>
        </h2>

        {/* Supporting Slogan */}
        <p className="font-display text-lg sm:text-xl font-semibold text-cyan-300/90 tracking-wide mb-4 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{heroData.slogan}</span>
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </p>

        {/* Supporting Description */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-light leading-relaxed mb-10 text-balance">
          {heroData.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 w-full max-w-lg mb-14">
          {/* 1. Explore Services */}
          <a
            href="#services"
            id="hero-explore-services-btn"
            className="group relative overflow-hidden px-6 py-3.5 rounded-xl text-xs sm:text-sm font-mono font-bold tracking-wider text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:from-cyan-300 hover:to-sky-200 shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(0,242,254,0.7)] transition-all duration-300 flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          {/* 2. View Portfolio */}
          <a
            href="#portfolio"
            id="hero-view-portfolio-btn"
            className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-mono font-semibold tracking-wider text-slate-200 border border-cyan-500/40 bg-slate-900/80 hover:bg-cyan-950/40 hover:border-cyan-400 hover:text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.1)] hover:shadow-[0_0_25px_rgba(0,242,254,0.25)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <span>View Portfolio</span>
          </a>

          {/* 3. Contact Us */}
          <button
            onClick={onOpenContact}
            id="hero-contact-us-btn"
            className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-mono font-semibold tracking-wider text-cyan-300 border border-cyan-500/20 bg-[#060e22]/90 hover:bg-cyan-500/20 hover:border-cyan-500/60 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <span>Contact Us</span>
          </button>
        </div>

        {/* Hero Glass Metric Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
          {heroData.pillars.map((pillar, idx) => {
            const IconComponent = iconMap[pillar.icon] || Cpu;
            return (
              <div
                key={idx}
                id={`hero-pillar-${idx}`}
                className="group relative p-4 rounded-xl glass-card border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-cyan-950/20 transition-all duration-300 text-left overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              >
                {/* Accent top line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading text-xs sm:text-sm font-bold text-white tracking-wide">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-[11px] font-mono text-slate-400">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <a
        href="#about"
        id="scroll-down-indicator"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors opacity-70 hover:opacity-100 cursor-pointer"
        aria-label="Scroll to About Section"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400/80">SCROLL</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
      </a>
    </section>
  );
};
