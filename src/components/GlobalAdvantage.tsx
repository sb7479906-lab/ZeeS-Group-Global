import React from 'react';
import { GLOBAL_ADVANTAGES } from '../data/companyData';
import { AmbientGlow } from './AmbientGlow';
import {
  Globe,
  Zap,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  LifeBuoy,
  Sparkles,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Zap,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  LifeBuoy
};

export const GlobalAdvantage: React.FC = () => {
  return (
    <section id="global-advantage" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <AmbientGlow variant="section" position="split" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Competitive Edge</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide mb-6">
            Why <span className="cyber-gradient-text">ZeeS Group Global</span>?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            We merge rigorous software engineering principles with high-aesthetic cyber-luxury design
            to build systems that scale effortlessly across international boundaries.
          </p>
        </div>

        {/* 6 Advantages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {GLOBAL_ADVANTAGES.map((adv) => {
            const IconComponent = iconMap[adv.icon] || Globe;
            return (
              <div
                key={adv.number}
                id={`advantage-card-${adv.number}`}
                className="group relative p-6 sm:p-8 rounded-2xl glass-card border border-cyan-500/20 hover:border-cyan-400/60 hover:bg-[#0b193d]/70 transition-all duration-300 transform hover:-translate-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(0,242,254,0.25)] flex flex-col justify-between overflow-hidden"
              >
                {/* Top Accent Gradient Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-950 to-[#060e22] border border-cyan-500/40 text-cyan-400 group-hover:scale-110 group-hover:text-white group-hover:bg-cyan-500 group-hover:shadow-[0_0_20px_#00f2fe] transition-all duration-300">
                      <IconComponent className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <span className="font-heading text-2xl font-extrabold text-cyan-500/30 group-hover:text-cyan-400/60 transition-colors font-mono">
                      {adv.number}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-cyan-300/80 uppercase tracking-widest mb-1.5 font-semibold">
                    {adv.highlight}
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white tracking-wide mb-3 group-hover:text-cyan-300 transition-colors">
                    {adv.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {adv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-cyan-500/15 mt-6 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>ENTERPRISE GUARANTEE</span>
                  <span className="text-cyan-400">VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
