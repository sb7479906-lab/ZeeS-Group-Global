import React, { useState } from 'react';
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
  ChevronUp,
  ChevronDown,
  LucideIcon
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
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

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      id="desktop-sidebar"
      aria-label="Quick Section Navigation"
      className={`hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center py-3 px-2 rounded-2xl glass-card border border-cyan-500/30 shadow-[0_0_35px_rgba(0,242,254,0.15)] transition-all duration-500 ease-in-out ${
        isCollapsed ? 'max-h-14 overflow-hidden py-2 bg-slate-950/90' : 'max-h-[85vh]'
      }`}
    >
      {/* Top Toggle Button (Hide / Show) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        id="toggle-sidebar-btn"
        className="group relative p-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 hover:text-white hover:bg-cyan-500 hover:shadow-[0_0_15px_#00f2fe] transition-all duration-300 mb-2 cursor-pointer"
        aria-label={isCollapsed ? 'Expand Sidebar Navigation' : 'Collapse Sidebar Navigation'}
      >
        {isCollapsed ? (
          <ChevronDown className="w-4 h-4 animate-bounce" />
        ) : (
          <ChevronUp className="w-4 h-4" />
        )}

        {/* Tooltip for Toggle Button */}
        <div className="absolute left-full ml-3 px-2 py-1 rounded bg-[#060e22]/95 border border-cyan-500/40 text-[10px] font-mono tracking-wider text-cyan-300 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-lg">
          {isCollapsed ? 'Expand Sidebar' : 'Hide Sidebar'}
        </div>
      </button>

      {/* Main Navigation Icons List */}
      {!isCollapsed && (
        <div className="flex flex-col gap-2 my-1 animate-in fade-in duration-300">
          {NAVIGATION_ITEMS.map((item) => {
            const IconComponent = iconMap[item.icon] || Home;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                id={`sidebar-${item.id}`}
                className={`group relative p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,242,254,0.3)] scale-105'
                    : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 hover:border-cyan-500/20 border border-transparent'
                }`}
                aria-label={item.label}
              >
                <IconComponent
                  className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'stroke-[2.5]' : 'stroke-2'
                  }`}
                />

                {/* Tooltip on right hover */}
                <div className="absolute left-full ml-3.5 px-2.5 py-1 rounded-md bg-[#060e22]/95 border border-cyan-500/30 text-[11px] font-mono tracking-wider text-cyan-200 whitespace-nowrap shadow-[0_0_15px_rgba(0,0,0,0.8)] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{item.label}</span>
                  </div>
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-cyan-500/40" />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Bottom Quick Collapse Indicator */}
      {!isCollapsed && (
        <button
          onClick={() => setIsCollapsed(true)}
          className="mt-2 p-1 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer"
          title="Minimize Sidebar"
        >
          <div className="w-4 h-0.5 rounded-full bg-cyan-500/40 hover:bg-cyan-400" />
        </button>
      )}
    </aside>
  );
};
