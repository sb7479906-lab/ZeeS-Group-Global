import React, { useEffect } from 'react';
import { X, Shield, FileText, AlertTriangle } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'disclaimer' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl glass-card-elevated border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,242,254,0.15)] my-8 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-6">
          <div className="flex items-center gap-3">
            {type === 'privacy' && <Shield className="w-5 h-5 text-cyan-400" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-cyan-400" />}
            {type === 'disclaimer' && <AlertTriangle className="w-5 h-5 text-amber-400" />}

            <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
              {type === 'privacy' && 'Privacy Policy'}
              {type === 'terms' && 'Terms & Conditions'}
              {type === 'disclaimer' && 'Risk & Regulatory Disclaimer'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          {type === 'privacy' && (
            <>
              <p>
                <strong>ZeeS Group Global</strong> is committed to preserving the privacy and data security of all clients, partners, and visitors.
              </p>
              <h4 className="font-heading text-xs font-bold text-cyan-300 uppercase mt-4">1. Data Collection & Processing</h4>
              <p>
                Information provided through our contact forms or direct communication channels (name, email, telephone number, and project specifications) is utilized solely for conducting direct business inquiries, preparing technical proposals, and maintaining ongoing client operations.
              </p>
              <h4 className="font-heading text-xs font-bold text-cyan-300 uppercase mt-4">2. Non-Disclosure & Security</h4>
              <p>
                We do not sell, rent, or lease private client data to third parties. All source code, proprietary logic, and digital assets developed during engagement remain protected under strict professional confidentiality standards.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                Welcome to the official digital portal of <strong>ZeeS Group Global</strong>. By accessing this platform or engaging our services, you agree to comply with these terms.
              </p>
              <h4 className="font-heading text-xs font-bold text-cyan-300 uppercase mt-4">1. Professional Engagement</h4>
              <p>
                All web development, e-commerce, digital marketing, domain management, and cloud hosting projects are executed based on explicit mutual scope agreements, defined milestones, and formal milestone acceptances.
              </p>
              <h4 className="font-heading text-xs font-bold text-cyan-300 uppercase mt-4">2. Intellectual Property</h4>
              <p>
                Upon final project delivery and full financial settlement, all tailored client deliverables, source repositories, and design assets are fully transferred to the client.
              </p>
            </>
          )}

          {type === 'disclaimer' && (
            <>
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 mb-4">
                <p className="font-semibold">
                  Risk Disclaimer: Cryptocurrency and derivatives trading involve substantial risk. Prices can change rapidly and losses may occur.
                </p>
              </div>
              <p>
                ZeeS Group Global does not guarantee profits or returns, and website information should not be interpreted as personalized financial, investment, or legal advice.
              </p>
              <p>
                All market visualizers, technical charts, and analytical tools presented are for educational, technological, and informational showcase purposes only. Clients and visitors are solely responsible for their independent financial and commercial decisions.
              </p>
            </>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-cyan-500/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold hover:bg-cyan-500/30 transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
