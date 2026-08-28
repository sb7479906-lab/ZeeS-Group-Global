import React from 'react';
import { CONTACT_PERSONS } from '../data/companyData';
import { ContactForm } from './ContactForm';
import { AmbientGlow } from './AmbientGlow';
import {
  Send,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  ShieldCheck,
  Globe2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface ContactProps {
  preselectedService?: string;
}

export const Contact: React.FC<ContactProps> = ({ preselectedService }) => {
  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <AmbientGlow variant="section" position="top" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <Send className="w-3.5 h-3.5" />
            <span>Direct Global Line</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide mb-6">
            Let's Build <span className="cyber-gradient-text">Something Global</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Have a project, business idea or digital requirement? Let's connect.
            Our technical leadership is available directly via Phone, WhatsApp, or instant encrypted message.
          </p>
        </div>

        {/* 2-Column Layout: Direct Leadership Cards & Interactive Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact & Leadership (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-semibold">
                Direct Technical Leadership
              </span>

              {CONTACT_PERSONS.map((person, idx) => (
                <div
                  key={person.name}
                  id={`contact-card-${idx}`}
                  className="group relative p-6 rounded-2xl glass-card border border-cyan-500/25 hover:border-cyan-400/60 hover:bg-[#0b193d]/70 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                  {/* Glowing Top Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {person.name}
                      </h3>
                      <p className="text-xs font-mono text-cyan-400/80 mt-0.5">
                        {person.role}
                      </p>
                    </div>

                    <span className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                      <Phone className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Contact Methods */}
                  <div className="space-y-2.5 pt-4 border-t border-cyan-500/15">
                    {/* Call Link */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">Call / Voice:</span>
                      <a
                        href={`tel:${person.phone}`}
                        id={`call-link-${idx}`}
                        className="font-mono text-sm font-bold text-cyan-300 hover:text-white hover:underline flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{person.phone}</span>
                      </a>
                    </div>

                    {/* WhatsApp Link */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">WhatsApp Direct:</span>
                      <a
                        href={person.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`whatsapp-link-${idx}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 hover:text-emerald-200 text-xs font-mono font-semibold shadow-[0_0_12px_rgba(16,185,129,0.15)] transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Message on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Guarantees Box */}
            <div className="p-6 rounded-2xl glass-card border border-cyan-500/20 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading text-xs font-bold text-white">Rapid Response SLA</h4>
                  <p className="text-[11px] font-mono text-slate-400">Inquiries answered within 2 hours on business days.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading text-xs font-bold text-white">NDA & IP Protection</h4>
                  <p className="text-[11px] font-mono text-slate-400">Comprehensive non-disclosure and code sovereignty.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm preselectedService={preselectedService} />
          </div>
        </div>
      </div>
    </section>
  );
};
