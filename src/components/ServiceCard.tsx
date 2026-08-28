import React, { useState } from 'react';
import { ServiceItem } from '../types';
import {
  Code,
  ShoppingCart,
  TrendingUp,
  Server,
  Globe,
  Package,
  Check,
  ArrowUpRight,
  LucideIcon
} from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  onInquire: (serviceTitle: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Code,
  ShoppingCart,
  TrendingUp,
  Server,
  Globe,
  Package
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onInquire }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const iconKey = service.iconName || (typeof service.icon === 'string' ? service.icon : '') || 'Code';
  const IconComponent = iconMap[iconKey] || Code;
  
  const displayDescription = service.shortDesc || service.description || '';
  const deliverablesList = service.deliverables || service.highlights || [];
  const featuresList = service.features || [];

  return (
    <div
      id={`service-card-${service.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl glass-card border border-cyan-500/20 hover:border-cyan-400/60 hover:bg-[#0b193d]/70 transition-all duration-300 transform hover:-translate-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(0,242,254,0.25)] overflow-hidden"
    >
      {/* Light Sweep Across Border Effect on Hover */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      {/* Top Accent Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Header: Number, Icon, Badge */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-950/90 to-[#060e22] border border-cyan-500/35 text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 group-hover:shadow-[0_0_20px_#00f2fe] transition-all duration-300">
              <IconComponent className="w-6 h-6 stroke-[2.2]" />
            </div>
            {service.badge && (
              <span className="text-[10px] font-mono tracking-widest text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full uppercase">
                {service.badge}
              </span>
            )}
          </div>

          <span className="font-heading text-2xl sm:text-3xl font-extrabold text-cyan-500/30 group-hover:text-cyan-400/60 transition-colors font-mono">
            {service.number}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg sm:text-xl font-bold text-white tracking-wide mb-3 group-hover:text-cyan-300 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-6">
          {displayDescription}
        </p>

        {/* Features Checklist */}
        {featuresList.length > 0 && (
          <div className="space-y-2 mb-6">
            <span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest block mb-2 font-semibold">
              Key Deliverables & Scope:
            </span>
            {featuresList.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-300">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-tight">{feature}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer / Card CTA */}
      <div className="pt-4 border-t border-cyan-500/15 flex items-center justify-between mt-2">
        <div className="flex flex-wrap gap-1">
          {deliverablesList.slice(0, 2).map((del, i) => (
            <span key={i} className="text-[9px] font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded">
              {del}
            </span>
          ))}
        </div>

        <button
          onClick={() => onInquire(service.title)}
          className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-0.5 transition-all cursor-pointer"
        >
          <span>Inquire</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
