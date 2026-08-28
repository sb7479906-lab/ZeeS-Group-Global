import React, { useState, useEffect } from 'react';
import { TECH_STACK } from '../data/companyData';
import { AmbientGlow } from './AmbientGlow';
import {
  Cpu,
  Atom,
  Layers,
  FileCode,
  Palette,
  Server,
  Flame,
  Network,
  Sparkles,
  Database,
  Box,
  GitBranch,
  Cloud,
  LucideIcon
} from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface TechItem {
  name: string;
  category: string;
  description: string;
  icon: string;
  proficiency: number;
}

const iconMap: Record<string, LucideIcon> = {
  Atom,
  Layers,
  FileCode,
  Palette,
  Server,
  Flame,
  Network,
  Sparkles,
  Database,
  Box,
  GitBranch,
  Cloud,
  Cpu
};

const CATEGORIES = ['ALL', 'Frontend', 'Backend & Cloud', 'AI & Data', 'Infrastructure & DevOps'] as const;

export const Technology: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [techStack, setTechStack] = useState<TechItem[]>(TECH_STACK);

  // Real-time Firestore stream for Tech Stack items
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'company_info', 'tech_stack'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().items) {
        setTechStack(docSnap.data().items as TechItem[]);
      }
    }, (error) => {
      console.warn('Firestore tech stack stream fallback:', error);
    });

    return () => unsub();
  }, []);

  const filteredTech = selectedCategory === 'ALL'
    ? techStack
    : techStack.filter((t) => t.category === selectedCategory);

  return (
    <section id="technology" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <AmbientGlow variant="section" position="center" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <Cpu className="w-3.5 h-3.5" />
            <span>Modern Production Stack</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide mb-6">
            Modern <span className="cyber-gradient-text">Technology Stack</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Engineered with battle-tested modern frameworks, strict TypeScript typing,
            and scalable cloud infrastructure for zero-compromise performance and longevity.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`tech-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-black border border-cyan-300 shadow-[0_0_18px_rgba(0,242,254,0.35)] scale-105'
                    : 'glass-card text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-slate-900/80 border border-cyan-500/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredTech.map((tech) => {
            const IconComponent = iconMap[tech.icon] || Cpu;
            return (
              <div
                key={tech.name}
                id={`tech-item-${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="group p-5 rounded-2xl glass-card border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-[#0b193d]/60 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-950 to-[#060e22] border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400/80 uppercase px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/15">
                      {tech.category}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                    {tech.name}
                  </h3>

                  <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">
                    {tech.description}
                  </p>
                </div>

                {/* Efficiency / Mastery Gauge */}
                <div className="pt-3 border-t border-cyan-500/15">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>Proficiency Score</span>
                    <span className="text-cyan-400 font-bold">{tech.proficiency}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-cyan-500/20">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${tech.proficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
