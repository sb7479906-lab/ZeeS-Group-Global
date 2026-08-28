import React, { useState, useEffect } from 'react';
import { ZeeSLogo } from './ZeeSLogo';
import { NAVIGATION_ITEMS, SERVICES_DATA, CONTACT_PERSONS } from '../data/companyData';
import { LegalModals } from './LegalModals';
import {
  Phone,
  MessageCircle,
  Globe2,
  ChevronUp
} from 'lucide-react';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ContactPerson {
  name: string;
  role?: string;
  phone: string;
  whatsappUrl: string;
}

interface ServiceItem {
  id: string;
  title: string;
}

interface FooterProps {
  onOpenContact: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onNavigate }) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);
  const [contacts, setContacts] = useState<ContactPerson[]>(CONTACT_PERSONS);
  const [services, setServices] = useState<ServiceItem[]>(
    SERVICES_DATA.map((s) => ({ id: s.id, title: s.title }))
  );

  // Real-time listener for direct contacts from Firestore
  useEffect(() => {
    const unsubContacts = onSnapshot(doc(db, 'company_info', 'contacts'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().persons) {
        setContacts(docSnap.data().persons as ContactPerson[]);
      }
    }, (err) => {
      console.warn('Firestore footer contacts stream fallback:', err);
    });

    return () => unsubContacts();
  }, []);

  // Real-time listener for services list from Firestore
  useEffect(() => {
    const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
      if (!snapshot.empty) {
        const liveServices = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title || doc.id
        }));
        setServices(liveServices);
      }
    }, (err) => {
      console.warn('Firestore footer services stream fallback:', err);
    });

    return () => unsubServices();
  }, []);

  const handleNavClick = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    if (onNavigate) {
      onNavigate('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative bg-[#020713] border-t border-cyan-500/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden z-20">
      {/* Background Subtle Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-cyan-500/15">
          {/* Column 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button 
              onClick={() => handleNavClick('home')}
              className="inline-block text-left cursor-pointer"
            >
              <ZeeSLogo variant="footer" />
            </button>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-sm">
              Next-generation digital solutions, technology and global business services.
              Architecting bespoke web applications, high-conversion e-commerce, digital marketing,
              and robust cloud infrastructure for forward-thinking enterprises.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>A Member of ZeeS Group Global</span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-cyan-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {NAVIGATION_ITEMS.slice(0, 6).map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-500/40" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-cyan-400">
              Digital Services
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {services.map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-500/40" />
                    <span>{srv.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Leadership Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-cyan-400">
              Direct Contact
            </h4>
            <div className="space-y-3">
              {contacts.map((person) => (
                <div key={person.name} className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-xs">
                  <p className="font-semibold text-white">{person.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <a
                      href={`tel:${person.phone}`}
                      className="px-2 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono hover:bg-cyan-500/20 flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{person.phone}</span>
                    </a>
                    <a
                      href={person.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                      aria-label={`WhatsApp ${person.name}`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            <span>© 2026 </span>
            <strong className="text-cyan-300 font-semibold">ZeeS Group Global</strong>
            <span>. All Rights Reserved.</span>
          </div>

          {/* Legal Links Modals Trigger */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setLegalModal('disclaimer')}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Risk Disclaimer
            </button>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            id="back-to-top-btn"
            className="p-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-950 hover:text-white transition-all shadow-[0_0_10px_rgba(0,242,254,0.1)] cursor-pointer"
            aria-label="Back to top"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Legal Dialog */}
      <LegalModals type={legalModal} onClose={() => setLegalModal(null)} />
    </footer>
  );
};
