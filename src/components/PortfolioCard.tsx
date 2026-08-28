import React from 'react';
import { PortfolioProject } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioCardProps {
  project: PortfolioProject;
  onSelect: (project: PortfolioProject) => void;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, onSelect }) => {
  const displayDescription = project.shortDescription || project.description || '';
  const techStackList = project.techStack || project.tags || [];

  return (
    <div
      id={`portfolio-card-${project.id}`}
      onClick={() => onSelect(project)}
      className="group relative flex flex-col justify-between rounded-2xl glass-card border border-cyan-500/20 hover:border-cyan-400/60 hover:bg-[#0b193d]/70 transition-all duration-300 transform hover:-translate-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(0,242,254,0.25)] overflow-hidden cursor-pointer"
    >
      {/* Image Preview Header */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060e22] via-transparent to-transparent" />

        {/* Category Badge & Demo Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-semibold uppercase tracking-wider">
            {project.category}
          </span>
          {project.isDemo && (
            <span className="px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-mono text-[9px]">
              Demo Project
            </span>
          )}
        </div>

        {/* Hover Quick Action Indicator */}
        <div className="absolute bottom-3 right-3 p-2 rounded-full bg-cyan-400 text-black shadow-[0_0_15px_#00f2fe] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>

          <p className="text-xs text-slate-300 font-light leading-relaxed mb-4 line-clamp-2">
            {displayDescription}
          </p>
        </div>

        <div>
          {/* Tech stack pill tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {techStackList.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="text-[10px] font-mono text-cyan-300/90 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
            {techStackList.length > 3 && (
              <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5">
                +{techStackList.length - 3}
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-cyan-500/15 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-cyan-300">
            <span className="flex items-center gap-1">
              <span>View Case Study</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">SPEC V2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
