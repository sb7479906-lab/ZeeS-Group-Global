import React, { useState, useMemo, useEffect } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/companyData';
import { PortfolioProject } from '../types';
import { PortfolioCard } from './PortfolioCard';
import { PortfolioModal } from './PortfolioModal';
import { AmbientGlow } from './AmbientGlow';
import { Briefcase } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

const CATEGORIES = ['ALL', 'WEB', 'E-COMMERCE', 'BUSINESS', 'AI', 'AUTOMATION', 'OTHER'] as const;

interface PortfolioProps {
  onOpenContactWithService: (context: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenContactWithService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [projectsList, setProjectsList] = useState<PortfolioProject[]>(PORTFOLIO_PROJECTS);

  // Real-time Firestore stream for Projects collection
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'projects'), (snapshot) => {
      if (!snapshot.empty) {
        const liveProjects: PortfolioProject[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            title: data.title || docSnap.id,
            category: data.category || 'WEB',
            shortDescription: data.shortDescription || '',
            fullDescription: data.fullDescription || '',
            image: data.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
            tags: data.tags || [],
            features: data.features || [],
            metrics: data.metrics || [],
            client: data.client || 'Enterprise Partner',
            duration: data.duration || 'Complete',
            liveUrl: data.liveUrl || '',
            githubUrl: data.githubUrl || ''
          };
        });
        setProjectsList(liveProjects);
      }
    }, (error) => {
      console.warn('Firestore portfolio projects stream fallback:', error);
    });

    return () => unsub();
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'ALL') return projectsList;
    return projectsList.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, projectsList]);

  return (
    <section id="portfolio" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <AmbientGlow variant="section" position="top" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Proven Engineering Standards</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide mb-6">
            Selected <span className="cyber-gradient-text">Digital Projects</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            A curated showcase of next-generation digital applications, high-conversion e-commerce engines,
            and AI-automated platforms built with our signature cyber-metallic precision.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-14">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`filter-btn-${cat.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-black border border-cyan-300 shadow-[0_0_18px_rgba(0,242,254,0.4)] scale-105'
                    : 'glass-card text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-slate-900/80 border border-cyan-500/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <PortfolioCard
              key={project.id}
              project={project}
              onSelect={(p) => setActiveProject(p)}
            />
          ))}
        </div>

        {/* Project Modal */}
        <PortfolioModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onInquire={onOpenContactWithService}
        />
      </div>
    </section>
  );
};
