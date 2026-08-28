import React, { useState, useEffect } from 'react';
import { ZeeSLogo } from './ZeeSLogo';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, ShieldCheck, Database } from 'lucide-react';

interface HeaderProps {
  activeSection?: string;
  onOpenContact?: () => void;
  onOpenMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  onOpenPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
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

        {/* Client Portal Button (Desktop) */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            id="header-client-portal-btn"
            onClick={onOpenPortal}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 border cursor-pointer ${
              user
                ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.2)]'
                : 'border-slate-700/80 bg-slate-900/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50'
            }`}
          >
            {user ? (
              <>
                {isAdmin ? <ShieldCheck className="w-4 h-4 text-cyan-400" /> : <Database className="w-4 h-4 text-cyan-400" />}
                <span>{isAdmin ? 'Admin Console' : 'Client Portal'}</span>
              </>
            ) : (
              <>
                <User className="w-4 h-4" />
                <span>Client Portal</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={onOpenPortal}
            className="p-2 rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-500/20 transition-colors"
            aria-label="Client Portal"
          >
            <User className="w-4 h-4" />
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={onOpenMobileMenu}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-200 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
