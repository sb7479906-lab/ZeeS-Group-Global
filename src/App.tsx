import React, { useState } from 'react';
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
  
  // State to track current visible section in center page (Default: 'home')
  const [activeTab, setActiveTab] = useState<string>('home');
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');

  // Function to switch visible center view
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContact = () => {
    handleTabChange('contact');
  };

  const handleOpenContactWithService = (serviceName: string) => {
    setPreselectedService(serviceName);
    handleTabChange('contact');
  };

  // Render dynamic view based on selected navigation tab
  const renderActiveSection = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Hero
            onOpenContact={handleOpenContact}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />
        );
      case 'about':
        return <About />;
      case 'services':
        return <Services onOpenContactWithService={handleOpenContactWithService} />;
      case 'growth-engine':
        return <DigitalMarketing />;
      case 'portfolio':
        return <Portfolio onOpenContactWithService={handleOpenContactWithService} />;
      case 'technology':
        return <Technology />;
      case 'global-advantage':
        return <GlobalAdvantage />;
      case 'crypto-market':
        return <CryptoSection />;
      case 'contact':
        return <Contact preselectedService={preselectedService} />;
      default:
        return (
          <Hero
            onOpenContact={handleOpenContact}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />
        );
    }
  };

  return (
    <AuthProvider>
      <div className="relative min-h-screen bg-[#020713] text-slate-100 selection:bg-cyan-400 selection:text-black flex flex-col justify-between">
        {/* 1. Initial Loading Screen */}
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
          activeSection={activeTab}
          onOpenContact={handleOpenContact}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          isMobileMenuOpen={isMobileMenuOpen}
          onOpenPortal={() => setIsPortalOpen(true)}
          onNavigate={handleTabChange}
        />

        {/* 3. Desktop Vertical Sidebar Nav */}
        <Sidebar 
          activeSection={activeTab} 
          onNavigate={handleTabChange}
        />

        {/* 4. Mobile Navigation Drawer & Bottom Bar */}
        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeSection={activeTab}
          onOpenContact={handleOpenContact}
          onOpenPortal={() => setIsPortalOpen(true)}
          onNavigate={handleTabChange}
        />

        {/* 5. Dynamic Center Screen Container */}
        <main id="main-content" className="relative z-10 w-full flex-1 pt-20 pb-12 transition-all duration-300">
          <div key={activeTab} className="animate-in fade-in zoom-in-95 duration-300">
            {renderActiveSection()}
          </div>
        </main>

        {/* 6. Footer */}
        <Footer onOpenContact={handleOpenContact} onNavigate={handleTabChange} />

        {/* 7. Modals */}
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
