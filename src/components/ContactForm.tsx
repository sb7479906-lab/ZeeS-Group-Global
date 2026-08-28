import React, { useState, useEffect } from 'react';
import { SERVICES_DATA } from '../data/companyData';
import { useAuth } from '../context/AuthContext';
import { createInquiry } from '../lib/firestoreService';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ContactFormProps {
  preselectedService?: string;
  onSuccess?: () => void;
}

interface ServiceOption {
  id: string;
  title: string;
  number?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ preselectedService = '', onSuccess }) => {
  const { user } = useAuth();
  const [servicesList, setServicesList] = useState<ServiceOption[]>(SERVICES_DATA);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: preselectedService || 'Web Development',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [sendToWhatsApp, setSendToWhatsApp] = useState(false);

  // Sync service choices in real time from Firestore if available
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'services'), (snapshot) => {
      if (!snapshot.empty) {
        const liveServices = snapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title || doc.id,
          number: doc.data().number || ''
        }));
        setServicesList(liveServices);
      }
    }, (err) => {
      console.warn('Using fallback static services list for form:', err);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (user && !formData.fullName && !formData.email) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.displayName || prev.fullName,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const validate = () => {
    if (!formData.fullName.trim()) return 'Please enter your full name.';
    if (!formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
      return 'Please enter a valid email address.';
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      return 'Please enter a valid contact phone number.';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      return 'Please provide a brief message describing your project requirement (min 10 characters).';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setErrorMessage(error);
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // 1. Store in Firestore Database in real time
      await createInquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        status: 'pending',
        createdAt: new Date().toISOString(),
        userId: user ? user.uid : null,
        userEmail: user ? user.email : null,
      });

      // 2. Optional direct WhatsApp forwarding
      if (sendToWhatsApp) {
        const text = encodeURIComponent(
          `*New Project Inquiry - ZeeS Group Global*\n\n` +
          `*Name:* ${formData.fullName}\n` +
          `*Email:* ${formData.email}\n` +
          `*Phone:* ${formData.phone}\n` +
          `*Service:* ${formData.service}\n\n` +
          `*Message:* ${formData.message}`
        );
        window.open(`https://wa.me/923234196252?text=${text}`, '_blank');
      }

      setStatus('success');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Inquiry submission error:', err);
      setStatus('error');
      setErrorMessage('Failed to transmit inquiry to cloud database. Please verify your connection or message directly on WhatsApp.');
    }
  };

  return (
    <form
      id="main-contact-form"
      onSubmit={handleSubmit}
      className="p-6 sm:p-8 rounded-2xl glass-card-elevated border border-cyan-500/30 shadow-[0_0_40px_rgba(0,242,254,0.12)] space-y-5 text-left relative overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
        <div>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span>Direct Project Transmission</span>
          </h3>
          <p className="text-xs font-mono text-cyan-400/80 mt-0.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>Firebase Cloud Storage Encrypted</span>
          </p>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]" />
      </div>

      {status === 'success' ? (
        <div className="py-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 flex items-center justify-center mx-auto shadow-[0_0_25px_#00f2fe]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="font-heading text-xl font-bold text-white">
            Transmission Received!
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto font-light leading-relaxed">
            Thank you, <strong className="text-cyan-300">{formData.fullName}</strong>. Technical leadership has been notified and will contact you promptly.
          </p>
          <button
            type="button"
            onClick={() => {
              setFormData({
                fullName: user?.displayName || '',
                email: user?.email || '',
                phone: '',
                service: 'Web Development',
                message: ''
              });
              setStatus('idle');
            }}
            className="px-5 py-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono hover:bg-cyan-950/50 transition-colors"
          >
            Send Another Inquiry
          </button>
        </div>
      ) : (
        <>
          {/* Full Name */}
          <div>
            <label className="block text-xs font-mono text-cyan-300 mb-1.5 uppercase tracking-wider">
              Full Name *
            </label>
            <input
              type="text"
              id="contact-fullname"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-cyan-500/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-light"
              required
            />
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-cyan-300 mb-1.5 uppercase tracking-wider">
                Email Address *
              </label>
              <input
                type="email"
                id="contact-email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-cyan-500/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-light"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-cyan-300 mb-1.5 uppercase tracking-wider">
                Phone Number *
              </label>
              <input
                type="tel"
                id="contact-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 03234196252"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-cyan-500/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-light"
                required
              />
            </div>
          </div>

          {/* Service Selector */}
          <div>
            <label className="block text-xs font-mono text-cyan-300 mb-1.5 uppercase tracking-wider">
              Selected Service / Requirement *
            </label>
            <select
              id="contact-service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-cyan-500/25 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
            >
              {servicesList.map((s) => (
                <option key={s.id} value={s.title} className="bg-[#060e22] text-white">
                  {s.number ? `${s.number} — ` : ''}{s.title}
                </option>
              ))}
              <option value="Custom Digital Architecture" className="bg-[#060e22] text-white">
                07 — Custom Bespoke Architecture
              </option>
              <option value="Crypto & Wealth Consultation" className="bg-[#060e22] text-white">
                08 — Digital Market & Wealth Consultation
              </option>
            </select>
          </div>

          {/* Message Area */}
          <div>
            <label className="block text-xs font-mono text-cyan-300 mb-1.5 uppercase tracking-wider">
              Project Details & Scope *
            </label>
            <textarea
              id="contact-message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your vision, timeline, target features, and business requirements..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-cyan-500/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-light resize-none"
              required
            />
          </div>

          {/* WhatsApp Direct Option */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id="whatsapp-direct-check"
              checked={sendToWhatsApp}
              onChange={(e) => setSendToWhatsApp(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-900 border-cyan-500/40 text-cyan-400 focus:ring-cyan-400"
            />
            <label htmlFor="whatsapp-direct-check" className="text-xs font-mono text-slate-300 cursor-pointer">
              Also launch direct WhatsApp chat with this message
            </label>
          </div>

          {/* Error Banner */}
          {status === 'error' && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            id="submit-contact-form-btn"
            disabled={status === 'loading'}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:from-cyan-300 hover:to-sky-200 text-black font-mono font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,242,254,0.6)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>TRANSMITTING INQUIRY...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </>
      )}
    </form>
  );
};
