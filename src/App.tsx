import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { DigitalMarketing } from './components/DigitalMarketing';
import { Portfolio } from './components/Portfolio';
import { Technology } from './components/Technology';
import { GlobalAdvantage } from './components/GlobalAdvantage';
import { CryptoSection } from './components/CryptoSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ParticleNetwork } from './components/ParticleNetwork';
import { CursorGlow } from './components/CursorGlow';
import { ClientPortalModal } from './components/ClientPortalModal';
import { ScheduleConsultationModal } from './components/ScheduleConsultationModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');

  // Active section scroll spy
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'services',
      'growth-engine',
      'portfolio',
      'technology',
      'global-advantage',
      'crypto-market',
      'contact'
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContactWithService = (serviceName: string) => {
    setPreselectedService(serviceName);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AuthProvider>
      <div className="relative min-h-screen bg-[#020713] text-slate-100 selection:bg-cyan-400 selection:text-black">
        {/* 1. Loading Screen */}
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}

        {/* Global Background Particle Network & Cursor Glow */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <ParticleNetwork interactive density={12000} />
        </div>
        <CursorGlow />

        {/* 2. Fixed Header */}
        <Header
          activeSection={activeSection}
          onOpenContact={handleOpenContact}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          isMobileMenuOpen={isMobileMenuOpen}
          onOpenPortal={() => setIsPortalOpen(true)}
        />

        {/* 3. Desktop Vertical Sidebar */}
        <Sidebar activeSection={activeSection} />

        {/* 4. Mobile Navigation Drawer & Bottom Bar */}
        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeSection={activeSection}
          onOpenContact={handleOpenContact}
          onOpenPortal={() => setIsPortalOpen(true)}
        />

        {/* Main Center Content Sections Flow */}
        <main id="main-content" className="relative z-10 w-full overflow-hidden">
          {/* 04. Hero */}
          <Hero
            onOpenContact={handleOpenContact}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />

          {/* 05. About ZeeS Group Global */}
          <About />

          {/* 06. Services */}
          <Services onOpenContactWithService={handleOpenContactWithService} />

          {/* 07. Digital Growth Engine (SEO, SMM, Marketing) */}
          <DigitalMarketing />

          {/* 08. Portfolio */}
          <Portfolio onOpenContactWithService={handleOpenContactWithService} />

          {/* 09. Technology Stack */}
          <Technology />

          {/* 10. Global Advantage */}
          <GlobalAdvantage />

          {/* 11. Digital Market & Crypto Trading */}
          <CryptoSection />

          {/* 12. Contact / Direct Inquiry */}
          <Contact preselectedService={preselectedService} />
        </main>

        {/* 13. Footer */}
        <Footer onOpenContact={handleOpenContact} />

        {/* 14. Modals */}
        <ClientPortalModal
          isOpen={isPortalOpen}
          onClose={() => setIsPortalOpen(false)}
        />
        <ScheduleConsultationModal
          isOpen={isConsultationOpen}
          onClose={() => setIsConsultationOpen(false)}
        />
      </div>
    </AuthProvider>
  );
}
