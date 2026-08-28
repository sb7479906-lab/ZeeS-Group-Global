import React, { useState, useEffect } from 'react';
import { AmbientGlow } from './AmbientGlow';
import { Lightbulb, Globe2, HeartHandshake, CheckCircle2, ShieldCheck, Zap, Target } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Pillar {
  id: string;
  title: string;
  tag: string;
  desc: string;
  iconName?: string;
  points: string[];
}

interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  pillars: Pillar[];
  architectureLayers: { layer: string; title: string; desc: string }[];
  missionText: string;
  missionFooter: string;
  values: { title: string; desc: string }[];
}

const DEFAULT_ABOUT_DATA: AboutData = {
  title: 'About',
  subtitle: 'ZeeS Group Global',
  description: 'ZeeS Group Global is a technology-focused digital brand dedicated to developing modern websites, e-commerce platforms, digital marketing solutions, online infrastructure and innovative digital services.',
  pillars: [
    {
      id: 'innovation',
      title: 'Innovation',
      tag: 'Next-Gen Technology',
      desc: 'Modern digital experiences built around innovation, high-speed architectures, and progressive technologies that keep our clients steps ahead.',
      points: ['Ultra-fast modern frameworks', 'Micro-interactions & fluid UX', 'AI-assisted workflow enhancements']
    },
    {
      id: 'global-vision',
      title: 'Global Vision',
      tag: 'Scalable Ecosystems',
      desc: 'Technology designed with scalable global ambitions, enabling seamless cross-border commerce, global infrastructure, and multi-market adaptability.',
      points: ['International payment gateways', 'Edge CDN & cloud reliability', 'Multi-regional DNS & localization']
    },
    {
      id: 'customer-focus',
      title: 'Customer Focus',
      tag: 'Strategic Alignment',
      desc: 'Solutions meticulously aligned with customer requirements and business objectives, engineered for measurable returns and sustainable partnerships.',
      points: ['Direct technical leadership', 'Transparent roadmap execution', 'Continuous maintenance & growth']
    }
  ],
  architectureLayers: [
    { layer: 'LAYER 01', title: 'Digital Core Infrastructure', desc: 'Resilient cloud hosting, secure DNS routing, SSL compliance, and scalable containerized deployments.' },
    { layer: 'LAYER 02', title: 'Application Experience', desc: 'Custom web applications, e-commerce portals, interactive UI/UX design, and frictionless mobile interfaces.' },
    { layer: 'LAYER 03', title: 'Growth & Amplification', desc: 'Search engine dominance, algorithmic SMM campaigns, conversion optimization, and market intelligence.' }
  ],
  missionText: 'Our global mission is to empower ambitious founders, enterprises, and innovators with high-impact digital products. We bridge the divide between visionary business ideas and world-class digital execution through reliable engineering, transparent communication, and relentless performance focus.',
  missionFooter: 'Operating globally with dedicated personal leadership from inception to launch.',
  values: [
    { title: 'Full Transparency & Source Rights', desc: 'Clean documentation, clear scoping, and 100% intellectual property handover.' },
    { title: 'Security-First Engineering', desc: 'Sanitized inputs, strict CSP, API shielding, and zero-trust authentication.' }
  ]
};

const getIcon = (id: string) => {
  switch (id) {
    case 'innovation':
      return Lightbulb;
    case 'global-vision':
      return Globe2;
    case 'customer-focus':
    default:
      return HeartHandshake;
  }
};

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'mission' | 'values'>('architecture');
  const [aboutData, setAboutData] = useState<AboutData>(DEFAULT_ABOUT_DATA);

  // Real-time listener to fetch updated company overview from Firestore
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'company_info', 'overview'), (docSnap) => {
      if (docSnap.exists()) {
        const liveData = docSnap.data() as Partial<AboutData>;
        setAboutData((prev) => ({
          ...prev,
          ...liveData
        }));
      }
    }, (error) => {
      console.warn('Firestore real-time sync fallback to default about data:', error);
    });

    return () => unsub();
  }, []);

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <AmbientGlow variant="section" position="top" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <Target className="w-3.5 h-3.5" />
            <span>Corporate Overview</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide mb-6">
            {aboutData.title} <span className="cyber-gradient-text">{aboutData.subtitle}</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            {aboutData.description}
          </p>
        </div>

        {/* 3 Core Visual Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {aboutData.pillars.map((pillar) => {
            const IconComponent = getIcon(pillar.id);
            return (
              <div
                key={pillar.id}
                id={`about-pillar-${pillar.id}`}
                className="group relative p-6 sm:p-8 rounded-2xl glass-card border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-[#0b193d]/60 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                {/* Top Glowing Edge on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-950 to-[#060e22] border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.2)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all duration-300">
                      <IconComponent className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-cyan-400/70 uppercase px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/20">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white tracking-wide mb-3 group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                    {pillar.desc}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-cyan-500/15">
                  {pillar.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Ecosystem Visualizer Tab Box */}
        <div className="p-6 sm:p-8 rounded-2xl glass-card-elevated border border-cyan-500/30 shadow-[0_0_40px_rgba(0,242,254,0.1)]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20 mb-6">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span>The ZeeS Operating Philosophy</span>
              </h3>
              <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
                Engineered for robust digital execution and sustainable global growth.
              </p>
            </div>

            {/* Selector Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900/90 border border-cyan-500/25">
              {[
                { id: 'architecture', label: 'Ecosystem Architecture' },
                { id: 'mission', label: 'Global Mission' },
                { id: 'values', label: 'Core Standards' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all ${
                    activeTab === tab.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_10px_rgba(0,242,254,0.3)] font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Panels */}
          {activeTab === 'architecture' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aboutData.architectureLayers.map((layer, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/15">
                  <span className="text-[10px] font-mono text-cyan-400">{layer.layer}</span>
                  <h4 className="font-heading text-sm font-bold text-white mt-1 mb-2">{layer.title}</h4>
                  <p className="text-xs text-slate-400">{layer.desc}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'mission' && (
            <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/15 text-sm text-slate-300 leading-relaxed font-light">
              <p className="mb-3">{aboutData.missionText}</p>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>{aboutData.missionFooter}</span>
              </div>
            </div>
          )}

          {activeTab === 'values' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutData.values.map((val, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/15 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5" />
                  <div>
                    <h5 className="font-heading text-xs font-bold text-white">{val.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
