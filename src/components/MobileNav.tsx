import React, { useEffect, useState } from 'react';
import { ZeeSLogo } from './ZeeSLogo';
import { NAVIGATION_ITEMS, CONTACT_PERSONS } from '../data/companyData';
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
  X,
  Phone,
  MessageCircle,
  ArrowUpRight,
  LucideIcon
} from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ContactPerson {
  name: string;
  role?: string;
  phone: string;
  rawPhone?: string;
  whatsappUrl: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onOpenContact: () => void;
  onOpenPortal: () => void;
  onNavigate?: (sectionId: string) => void;
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

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  activeSection,
  onOpenContact,
  onOpenPortal,
  onNavigate
}) => {
  const [contacts, setContacts] = useState<ContactPerson[]>(CONTACT_PERSONS);

  // Sync direct contact numbers in real-time from Firestore
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'company_info', 'contacts'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().persons) {
        setContacts(docSnap.data().persons as ContactPerson[]);
      }
    }, (error) => {
      console.warn('Firestore mobile nav contact stream fallback:', error);
    });

    return () => unsub();
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (sectionId: string) => {
    onClose();
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Primary items for the persistent bottom navigation bar
  const bottomBarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'growth-engine', label: 'Growth', icon: TrendingUp },
    { id: 'portfolio', label: 'Work', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Send }
  ];

  return (
    <>
      {/* 1. Persistent Compact Bottom Navigation Bar (Mobile / Tablet only) */}
      <nav
        id="mobile-bottom-nav"
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-3 left-4 right-4 z-40 bg-[#060e22]/90 backdrop-blur-lg border border-cyan-500/30 rounded-2xl px-2 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,242,254,0.15)] flex items-center justify-around"
      >
        {bottomBarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-cyan-300 font-semibold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'stroke-[2.5] text-cyan-300 drop-shadow-[0_0_8px_#00f2fe]' : 'stroke-2'}`} />
              <span className="text-[10px] tracking-wide font-mono">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-0.5 bg-cyan-400 rounded-full mt-0.5 shadow-[0_0_5px_#00f2fe]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* 2. Full-Screen / Slide-Out Cyber Menu Drawer */}
      <div
        id="mobile-drawer-overlay"
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop blur */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Drawer Panel */}
        <div
          id="mobile-menu-drawer"
          className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-[#060e22] border-l border-cyan-500/30 p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(0,242,254,0.15)] transition-transform duration-300 overflow-y-auto ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-cyan-500/20 mb-6">
              <ZeeSLogo variant="full" />
              <button
                onClick={onClose}
                id="close-mobile-menu-btn"
                className="p-2 rounded-lg border border-cyan-500/30 text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/40 cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-cyan-400/70 uppercase tracking-widest px-3 mb-2 block">
                Platform Navigation
              </span>
              {NAVIGATION_ITEMS.map((item) => {
                const IconComponent = iconMap[item.icon] || Home;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all cursor-pointer text-left ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4 text-cyan-400" />
                      <span>{item.label}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Direct Leadership Contact Box */}
          <div className="pt-6 mt-6 border-t border-cyan-500/20 space-y-4">
            <span className="text-[10px] font-mono text-cyan-400/70 uppercase tracking-widest block">
              Direct Contact Lines
            </span>

            <div className="grid grid-cols-1 gap-2.5">
              {contacts.map((person) => (
                <div
                  key={person.name}
                  className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-xs flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-100">{person.name}</p>
                    <p className="text-[11px] font-mono text-cyan-400">{person.phone}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${person.rawPhone || person.phone}`}
                      className="p-2 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 cursor-pointer"
                      aria-label={`Call ${person.name}`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={person.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 cursor-pointer"
                      aria-label={`WhatsApp ${person.name}`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenPortal();
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 font-mono text-xs hover:bg-cyan-950/40 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Client Portal</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,242,254,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Contact Us</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
