import React from 'react';
import { NAVIGATION_ITEMS } from '../data/companyData';
import {
  Home,
  ShieldCheck,
  Layers,
  TrendingUp,
  Briefcase,
  Cpu,
  Globe2,
  BarChart2,
  Send,
  LucideIcon
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
}

const iconMap: Record<string, LucideIcon> = {
  Home,
  ShieldCheck,
  Layers,
  TrendingUp,
  Briefcase,
  Cpu,
  Globe2,
  BarChart2,
  Send
};

export const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
  return (
    <aside
      id="desktop-sidebar"
      aria-label="Quick Section Navigation"
      className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3 py-4 px-2.5 rounded-2xl glass-card border border-cyan-500/20 shadow-[0_0_30px_rgba(0,242,254,0.1)]"
    >
      {/* Top indicator dot */}
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#00f2fe] mb-1" />

      <div className="flex flex-col gap-2">
        {NAVIGATION_ITEMS.map((item) => {
          const IconComponent = iconMap[item.icon] || Home;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              id={`sidebar-${item.id}`}
              className={`group relative p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                  : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 hover:border-cyan-500/20 border border-transparent'
              }`}
              aria-label={item.label}
            >
              <IconComponent className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />

              {/* Tooltip on right */}
              <div className="absolute left-full ml-3.5 px-2.5 py-1 rounded-md bg-[#060e22]/95 border border-cyan-500/30 text-[11px] font-mono tracking-wider text-cyan-200 whitespace-nowrap shadow-[0_0_15px_rgba(0,0,0,0.8)] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-cyan-400" />
                  <span>{item.label}</span>
                </div>
                {/* Arrow pointer */}
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-cyan-500/40" />
              </div>
            </a>
          );
        })}
      </div>

      {/* Bottom active section tracer line */}
      <div className="w-4 h-0.5 rounded-full bg-cyan-500/40 mt-1" />
    </aside>
  );
};
