import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { createConsultation } from '../lib/firestoreService';
import { X, Calendar, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

interface ScheduleConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleConsultationModal: React.FC<ScheduleConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    preferredTopic: 'Full-Stack & Cloud Architecture',
    preferredDate: '',
    notes: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Sync user profile data if user state changes
  useEffect(() => {
    if (user && !formData.fullName && !formData.email) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.displayName || prev.fullName,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMessage('Please provide your name.');
      setStatus('error');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email.');
      setStatus('error');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      setErrorMessage('Please provide a contact phone number.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await createConsultation({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        preferredTopic: formData.preferredTopic,
        preferredDate: formData.preferredDate || 'Earliest Available',
        notes: formData.notes,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
        userId: user ? user.uid : null,
      });

      setStatus('success');
    } catch (err) {
      console.error('Consultation creation error:', err);
      setStatus('error');
      setErrorMessage('Failed to schedule consultation in cloud database. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#020713]/85 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        id="schedule-consultation-card"
        className="relative w-full max-w-lg bg-[#060e22] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,242,254,0.15)] overflow-hidden z-10 my-8 text-left animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-cyan-500/20 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">
                Book Executive Consultation
              </h3>
              <p className="text-xs font-mono text-cyan-400/80">
                Direct Session with Executive Leadership
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 flex items-center justify-center mx-auto shadow-[0_0_20px_#00f2fe]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-heading text-lg font-bold text-white">
                Consultation Request Saved!
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto font-light leading-relaxed">
                Your consultation request for <strong className="text-cyan-300">{formData.preferredTopic}</strong> has been stored in Firestore. Our executive team will confirm your meeting slot promptly.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-400 text-black text-xs font-mono font-bold hover:brightness-110 cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-cyan-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Your Full Name"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/25 text-xs text-white focus:outline-none focus:border-cyan-400 font-light"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-cyan-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/25 text-xs text-white focus:outline-none focus:border-cyan-400 font-light"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-cyan-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 03234196252"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/25 text-xs text-white focus:outline-none focus:border-cyan-400 font-light"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-cyan-300 mb-1">
                  Focus Topic *
                </label>
                <select
                  value={formData.preferredTopic}
                  onChange={(e) => setFormData({ ...formData, preferredTopic: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/25 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                >
                  <option value="Full-Stack & Cloud Architecture">Full-Stack & Cloud Architecture</option>
                  <option value="High-Converting E-Commerce System">High-Converting E-Commerce System</option>
                  <option value="AI Agents & Custom Automation">AI Agents & Custom Automation</option>
                  <option value="Digital Marketing & Global Scaling">Digital Marketing & Global Scaling</option>
                  <option value="Algorithmic Trading & Crypto Infrastructure">Algorithmic Trading & Crypto Infrastructure</option>
                  <option value="Enterprise Tech Partnership">Enterprise Tech Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-cyan-300 mb-1">
                  Preferred Timeframe / Date (Optional)
                </label>
                <input
                  type="text"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  placeholder="e.g. Next Tuesday 3:00 PM PKT / ASAP"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/25 text-xs text-white focus:outline-none focus:border-cyan-400 font-light"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-cyan-300 mb-1">
                  Agenda or Specific Questions
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Briefly state your current bottlenecks, target roadmap, or questions..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/25 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none font-light"
                />
              </div>

              {status === 'error' && (
                <div className="p-2.5 rounded-lg bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-black font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>BOOKING SESSION IN FIRESTORE...</span>
                  </>
                ) : (
                  <>
                    <span>CONFIRM CONSULTATION BOOKING</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
