import React, { useEffect } from 'react';
import { PortfolioProject } from '../types';
import { X, ExternalLink, Github, CheckCircle2, Cpu, BarChart2, Shield } from 'lucide-react';

interface PortfolioModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onInquire: (title: string) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  project,
  onClose,
  onInquire
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      id="portfolio-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Dark Blurred Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div
        id="portfolio-modal-content"
        className="relative z-10 w-full max-w-3xl rounded-2xl glass-card-elevated border border-cyan-500/40 shadow-[0_0_50px_rgba(0,242,254,0.2)] overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header Preview Image Banner */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060e22] via-[#060e22]/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            id="close-modal-btn"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 border border-cyan-500/40 text-slate-200 hover:text-cyan-300 hover:bg-cyan-950 transition-colors z-20"
            aria-label="Close Project Details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on preview */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-cyan-500 text-black font-mono font-bold text-xs shadow-[0_0_12px_#00f2fe]">
              {project.category}
            </span>
            {project.isDemo && (
              <span className="px-3 py-1 rounded-md bg-slate-900/90 text-cyan-300 border border-cyan-500/40 font-mono text-xs">
                Demo Project Concept
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {project.title}
            </h3>
            <p className="font-display text-sm sm:text-base text-cyan-300 font-medium">
              {project.tagline}
            </p>
          </div>

          {/* Overview */}
          <div>
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 font-semibold">
              Project Architecture & Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {project.longDescription}
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 font-semibold">
              Key Engineering Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs font-mono text-slate-200 bg-slate-900/60 p-2.5 rounded-lg border border-cyan-500/15">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack Tags */}
          <div>
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2.5 font-semibold">
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics Ribbon */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <div className="font-heading text-base sm:text-lg font-bold text-cyan-300">
                  {m.value}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-cyan-500/20 bg-[#060e22] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Ready for custom enterprise deployment</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-mono text-slate-300 border border-slate-700 hover:bg-slate-800"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onInquire(`Project Deployment: ${project.title}`);
              }}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_30px_rgba(0,242,254,0.6)] flex items-center gap-1.5"
            >
              <span>Build Similar Architecture</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
