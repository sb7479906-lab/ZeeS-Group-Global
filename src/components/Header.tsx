import React, { useState, useEffect } from 'react';
import { ZeeSLogo } from './ZeeSLogo';
import { NAVIGATION_ITEMS } from '../data/companyData';
import { useAuth } from '../context/AuthContext';
import { Menu, X, ArrowUpRight, MessageSquareCode, PhoneCall, User, ShieldCheck, Database } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onOpenContact: () => void;
  onOpenMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  onOpenPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onOpenContact,
  onOpenMobileMenu,
  isMobileMenuOpen,
  onOpenPortal
}) => {
  const { user, isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 bg-[#060e22]/90 backdrop-blur-md border-b border-cyan-500/25 shadow-[0_4px_25px_rgba(0,242,254,0.08)]'
          : 'py-4 bg-[#020713]/60 backdrop-blur-sm border-b border-cyan-500/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          id="header-logo-link"
          className="group flex items-center transition-transform duration-200 hover:scale-[1.02]"
        >
          <ZeeSLogo variant="full" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {NAVIGATION_ITEMS.slice(0, 7).map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                id={`nav-${item.id}`}
                href={item.href}
                className={`relative px-3 py-1.5 text-xs xl:text-sm font-medium tracking-wide transition-all duration-200 rounded-md ${
                  isActive
                    ? 'text-cyan-300 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-cyan-500/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_#00f2fe]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA Buttons (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Client Portal Button */}
          <button
            type="button"
            id="header-client-portal-btn"
            onClick={onOpenPortal}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 border ${
              user
                ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.2)]'
                : 'border-slate-700/80 bg-slate-900/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50'
            }`}
          >
            {user ? (
              <>
                {isAdmin ? <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> : <Database className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{isAdmin ? 'Admin Console' : 'Client Portal'}</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5" />
                <span>Client Portal</span>
              </>
            )}
          </button>

          <a
            href="#portfolio"
            id="header-portfolio-btn"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider text-slate-300 border border-slate-700/80 bg-slate-900/60 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-950/30 transition-all duration-200"
          >
            <span>Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            id="header-cta-btn"
            onClick={onOpenContact}
            className="relative group overflow-hidden px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:from-cyan-300 hover:to-sky-200 shadow-[0_0_20px_rgba(0,242,254,0.35)] hover:shadow-[0_0_30px_rgba(0,242,254,0.6)] transition-all duration-300 active:scale-95"
          >
            {/* Shimmer light sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 pointer-events-none" />
            <span className="relative flex items-center gap-1.5">
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={onOpenPortal}
            className="p-2 rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-500/20 transition-colors"
            aria-label="Client Portal"
          >
            <User className="w-4 h-4" />
          </button>

          <button
            id="mobile-contact-quick-btn"
            onClick={onOpenContact}
            className="sm:hidden p-2 rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-500/20 transition-colors"
            aria-label="Direct Contact"
          >
            <PhoneCall className="w-4 h-4" />
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={onOpenMobileMenu}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-200 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};

