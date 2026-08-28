import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  subscribeToInquiries,
  updateInquiryStatus,
  deleteInquiryRecord,
  InquiryRecord
} from '../lib/firestoreService';
import {
  X,
  User,
  LogIn,
  LogOut,
  ShieldCheck,
  Clock,
  AlertCircle,
  MessageSquare,
  Phone,
  Mail,
  Trash2,
  RefreshCw,
  ExternalLink,
  Database
} from 'lucide-react';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({ isOpen, onClose }) => {
  const { user, isAdmin, signInWithGoogle, signInWithGoogleRedirect, logout, loading: authLoading } = useAuth();
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [authErrorNotice, setAuthErrorNotice] = useState<string | null>(null);
  const [isPopupBlocked, setIsPopupBlocked] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    setAuthErrorNotice(null);
    setIsPopupBlocked(false);
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string };
      if (errorObj?.code === 'auth/popup-blocked') {
        setIsPopupBlocked(true);
        setAuthErrorNotice('Pop-up window was blocked by your browser. You can continue below using direct redirect.');
      } else if (errorObj?.code !== 'auth/popup-closed-by-user' && errorObj?.code !== 'auth/cancelled-popup-request') {
        setAuthErrorNotice(errorObj?.message || 'Authentication could not be completed. Please try again.');
      }
    } font-sans finally {
      setIsSigningIn(false);
    }
  };

  const handleRedirectSignIn = async () => {
    setAuthErrorNotice(null);
    setIsSigningIn(true);
    try {
      await signInWithGoogleRedirect();
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string };
      setAuthErrorNotice(errorObj?.message || 'Redirect authentication failed.');
      setIsSigningIn(false);
    }
  };

  // Real-time Firestore Listener
  useEffect(() => {
    if (!isOpen) return;
    if (!user) {
      setInquiries([]);
      return;
    }

    setLoadingInquiries(true);
    const unsubscribe = subscribeToInquiries(
      user.uid,
      isAdmin,
      (data) => {
        setInquiries(data);
        setLoadingInquiries(false);
      },
      (err) => {
        console.error('Firestore listener error:', err);
        setLoadingInquiries(false);
      }
    );

    return () => unsubscribe();
  }, [isOpen, user, isAdmin]);

  if (!isOpen) return null;

  const filteredInquiries = inquiries.filter((inq) => {
    if (selectedFilter === 'all') return true;
    return inq.status === selectedFilter;
  });

  const handleStatusChange = async (id: string, newStatus: InquiryRecord['status']) => {
    try {
      setActionLoading(id);
      await updateInquiryStatus(id, newStatus);
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this inquiry?')) return;
    try {
      setActionLoading(id);
      await deleteInquiryRecord(id);
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#020713]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        id="client-portal-modal-card"
        className="relative w-full max-w-4xl bg-[#060e22] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,242,254,0.15)] overflow-hidden z-10 my-8 text-left max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-cyan-500/20 flex items-center justify-between bg-slate-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              {isAdmin ? <ShieldCheck className="w-5 h-5" /> : <Database className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                  {isAdmin ? 'ZeeS Global Admin Console' : 'ZeeS Client Portal'}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {isAdmin ? 'Enterprise Admin' : 'Firebase Cloud Sync'}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                {user ? `Authenticated as ${user.email}` : 'Sign in to access your inquiries & proposals'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {!user ? (
            /* Unauthenticated State */
            <div className="py-12 text-center max-w-md mx-auto space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,242,254,0.2)]">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-heading text-xl font-bold text-white mb-2">
                  Client & Enterprise Authentication
                </h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Sign in with Google to securely monitor your project milestones, submitted transmission logs, and direct quotes stored in our Firebase cloud infrastructure.
                </p>
              </div>

              {authErrorNotice && (
                <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{authErrorNotice}</span>
                </div>
              )}

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={authLoading || isSigningIn}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 disabled:opacity-50 text-black font-mono font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_25px_rgba(0,242,254,0.35)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isSigningIn ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>AUTHENTICATING...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>SIGN IN WITH GOOGLE</span>
                    </>
                  )}
                </button>

                {isPopupBlocked && (
                  <button
                    type="button"
                    onClick={handleRedirectSignIn}
                    disabled={authLoading || isSigningIn}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 hover:bg-cyan-950/40 text-cyan-300 font-mono text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>CONTINUE VIA DIRECT REDIRECT</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Authenticated Portal */
            <div className="space-y-6">
              {/* User Bar */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full border border-cyan-400/50"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center font-mono font-bold">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {user.displayName || 'Client Account'}
                    </div>
                    <div className="text-xs font-mono text-cyan-300/80">
                      {user.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={logout}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 border border-slate-700 hover:border-rose-500/40 text-xs font-mono text-slate-300 hover:text-rose-300 flex items-center gap-1.5 transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Inquiry Management Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div>
                  <h4 className="font-heading text-base font-bold text-white flex items-center gap-2">
                    <span>{isAdmin ? 'All Global Inquiries' : 'Your Submitted Inquiries'}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                      {filteredInquiries.length}
                    </span>
                  </h4>
                  <p className="text-xs font-mono text-slate-400">
                    Real-time synchronization with Firestore database
                  </p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
                  {(['all', 'pending', 'in_progress', 'completed'] as const).map((filterKey) => (
                    <button
                      key={filterKey}
                      onClick={() => setSelectedFilter(filterKey)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono capitalize transition-all ${
                        selectedFilter === filterKey
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {filterKey.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiries List */}
              {loadingInquiries ? (
                <div className="py-12 text-center text-slate-400 text-xs font-mono flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>Loading cloud database records...</span>
                </div>
              ) : filteredInquiries.length === 0 ? (
                <div className="py-12 text-center rounded-xl border border-dashed border-slate-800 bg-slate-900/30 p-8 space-y-3">
                  <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs font-mono text-slate-400">
                    {isAdmin
                      ? 'No inquiries found matching this filter in Firestore.'
                      : 'You have not submitted any project inquiries with this account yet.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-3 text-left"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-800/80 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white font-heading">
                              {inq.fullName}
                            </span>
                            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30">
                              {inq.service}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 mt-1 flex flex-wrap items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-slate-500" />
                              {inq.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-500" />
                              {inq.phone}
                            </span>
                            <span className="flex items-center gap-1 text-slate-500">
                              <Clock className="w-3 h-3" />
                              {new Date(inq.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Status Badge & Controls */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[11px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold border ${
                              inq.status === 'completed'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : inq.status === 'in_progress'
                                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                                : inq.status === 'reviewed'
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            }`}
                          >
                            {inq.status.replace('_', ' ')}
                          </span>

                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => handleDelete(inq.id)}
                              disabled={actionLoading === inq.id}
                              className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                              title="Delete record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Message Content */}
                      <p className="text-xs text-slate-300 font-light leading-relaxed whitespace-pre-wrap bg-slate-950/40 p-3 rounded-lg border border-slate-800/60">
                        {inq.message}
                      </p>

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono hover:bg-emerald-900/50 flex items-center gap-1 transition-colors"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>Reply via WhatsApp</span>
                          </a>
                          <a
                            href={`mailto:${inq.email}?subject=Regarding%20ZeeS%20Group%20Global%20Inquiry%20(${inq.service})`}
                            className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-mono hover:bg-slate-700 flex items-center gap-1 transition-colors"
                          >
                            <Mail className="w-3 h-3" />
                            <span>Reply via Email</span>
                          </a>
                        </div>

                        {/* Admin Status Dropdown */}
                        {isAdmin && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-slate-400">Change Status:</span>
                            <select
                              value={inq.status}
                              onChange={(e) =>
                                handleStatusChange(inq.id, e.target.value as InquiryRecord['status'])
                              }
                              disabled={actionLoading === inq.id}
                              className="px-2 py-1 rounded bg-slate-950 border border-cyan-500/30 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="archived">Archived</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-cyan-500/20 bg-slate-900/60 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Firebase Firestore: Connected (default)</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
