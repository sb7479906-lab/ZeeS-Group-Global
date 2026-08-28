import React, { useState, useEffect } from 'react';
import { SERVICES_DATA } from '../data/companyData';
import { ServiceCard } from './ServiceCard';
import { AmbientGlow } from './AmbientGlow';
import { Layers, ArrowRight, Sparkles } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ServiceItem } from '../types';

interface ServicesProps {
  onOpenContactWithService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenContactWithService }) => {
  const [servicesList, setServicesList] = useState<ServiceItem[]>(SERVICES_DATA);

  // Real-time listener for Services from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'services'), (snapshot) => {
      if (!snapshot.empty) {
        const liveServices: ServiceItem[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            number: data.number || '00',
            title: data.title || docSnap.id,
            tagline: data.tagline || '',
            description: data.description || '',
            icon: data.icon || 'Code',
            features: data.features || [],
            highlights: data.highlights || []
          };
        });
        setServicesList(liveServices);
      }
    }, (error) => {
      console.warn('Firestore services stream fallback:', error);
    });

    return () => unsub();
  }, []);

  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <AmbientGlow variant="section" position="center" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <Layers className="w-3.5 h-3.5" />
            <span>Full-Spectrum Capabilities</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide mb-6">
            Our <span className="cyber-gradient-text">Digital Services</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Enterprise-grade digital solutions engineered for speed, conversion, and global reach.
            From single-page micro-applications to full-scale transactional ecosystems.
          </p>
        </div>

        {/* 6 Grid Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {servicesList.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onInquire={onOpenContactWithService}
            />
          ))}
        </div>

        {/* Bottom Banner for Custom Inquiries */}
        <div className="p-6 sm:p-8 rounded-2xl glass-card-elevated border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(0,242,254,0.1)]">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-base sm:text-lg font-bold text-white">
                Require a Bespoke or Custom Digital Architecture?
              </h3>
              <p className="text-xs sm:text-sm font-mono text-slate-400 mt-0.5">
                We design custom tailored tech stacks and custom licensing agreements for enterprise clients.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenContactWithService('Custom Enterprise Project')}
            className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_30px_rgba(0,242,254,0.6)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Request Custom Architecture</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
