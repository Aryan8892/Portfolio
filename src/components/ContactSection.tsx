import React, { useState } from 'react';
import { Mail, Send, MapPin, Clock, Copy, Check, AlertCircle, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const ContactSection: React.FC = () => {
  const { contact, personal } = PORTFOLIO_DATA;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [honeypot, setHoneypot] = useState('');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'partial' | 'error'>('idle');
  const [serverFeedback, setServerFeedback] = useState<{ message: string; warning?: string } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      errors.name = 'Please provide your name';
    } else if (trimmedName.length > 100) {
      errors.name = 'Name must be under 100 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      errors.email = 'Please provide your email address';
    } else if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 255) {
      errors.email = 'Please provide a valid email address';
    }

    if (!trimmedSubject) {
      errors.subject = 'Please add a brief subject';
    } else if (trimmedSubject.length > 200) {
      errors.subject = 'Subject must be under 200 characters';
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    } else if (trimmedMessage.length > 5000) {
      errors.message = 'Message must be under 5000 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmissionState('submitting');
    setServerFeedback(null);

    // Endpoint for Supabase submit-contact Edge Function
    const endpoint =
      import.meta.env.VITE_CONTACT_FORM_ENDPOINT ||
      'https://tscrgqsrgexmizdutmwx.supabase.co/functions/v1/submit-contact';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          website: honeypot, // Honeypot field for bot trapping
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        if (data.emailSent) {
          // Full success: DB persisted and Resend email accepted
          setSubmissionState('success');
          setServerFeedback({
            message: 'Your message has been securely recorded and an email alert was dispatched to my inbox.',
          });
        } else {
          // Partial success: DB persisted, but Resend email had an issue
          setSubmissionState('partial');
          setServerFeedback({
            message: 'Your message was securely saved in my database, but the email notification is pending.',
            warning: data.warning || 'Email delivery could not be completed at this time.',
          });
        }
        // Only clear the form after successful persistence
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmissionState('error');
        const errorMsg =
          data?.error ||
          (data?.details ? Object.values(data.details).join(' ') : 'Unable to transmit message to the server.');
        setServerFeedback({ message: errorMsg });
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setSubmissionState('error');
      setServerFeedback({
        message: 'Network error: Could not reach the submission server. Please check your connection or email me directly.',
      });
    }
  };

  return (
    <section id="contact" className="py-14 sm:py-16 relative overflow-hidden bg-radial-gradient w-full">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Outreach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {contact.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            {contact.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl xl:max-w-7xl mx-auto w-full">
          
          {/* Left Column: Direct Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Get in Direct Touch</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  I review inquiries daily and am available for phone screens, technical interviews, and project collaborations.
                </p>
              </div>

              {/* Email Copy Card */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                <div className="overflow-hidden">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Primary Email</div>
                  <div className="text-sm font-semibold text-white truncate font-mono">
                    {personal.email}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Response Time & Location */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{contact.responseTime}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>{personal.location}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-xs font-mono uppercase text-slate-400 mb-3">Professional Profiles</div>
                <div className="flex items-center gap-3">
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium border border-white/10 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium border border-white/10 transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4 text-sky-400" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Placement Availability Callout */}
            <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white mb-1">Open for Immediate Consideration</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Seeking SDE Internships (Summer / Spring) &amp; Graduate Roles. Can join immediately for remote or onsite opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill in the form below to initiate contact directly.
              </p>

              {/* Success Banner */}
              {submissionState === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Transmission dispatched successfully!</div>
                    <p className="text-emerald-300/90 text-xs mt-1">
                      {serverFeedback?.message || 'Thank you for reaching out. Your message has been safely saved in the database and an email alert has been delivered.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Partial Success Banner (Saved in DB, but email delivery pending/failed) */}
              {submissionState === 'partial' && (
                <div className="mb-6 p-4 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Message recorded in database</div>
                    <p className="text-amber-200/90 text-xs mt-1">
                      {serverFeedback?.message}
                    </p>
                    {serverFeedback?.warning && (
                      <p className="text-[11px] font-mono text-amber-400/80 mt-1">
                        Status detail: {serverFeedback.warning}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {submissionState === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Transmission Failed</div>
                    <p className="text-rose-300/90 text-xs mt-1">
                      {serverFeedback?.message || 'Unable to store your transmission at this time. Please try again or reach out directly.'}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Honeypot field for bot suppression */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      disabled={submissionState === 'submitting'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe / Tech Recruiter"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border ${
                        formErrors.name ? 'border-rose-500/80 focus:ring-rose-500' : 'border-white/10 focus:border-cyan-400'
                      } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all disabled:opacity-60`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      disabled={submissionState === 'submitting'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border ${
                        formErrors.email ? 'border-rose-500/80 focus:ring-rose-500' : 'border-white/10 focus:border-cyan-400'
                      } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all disabled:opacity-60`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Subject <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    disabled={submissionState === 'submitting'}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. SDE Internship Inquiry / Software Engineer Opening"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border ${
                      formErrors.subject ? 'border-rose-500/80 focus:ring-rose-500' : 'border-white/10 focus:border-cyan-400'
                    } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all disabled:opacity-60`}
                  />
                  {formErrors.subject && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    disabled={submissionState === 'submitting'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about the opportunity, team, or project requirements..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border ${
                      formErrors.message ? 'border-rose-500/80 focus:ring-rose-500' : 'border-white/10 focus:border-cyan-400'
                    } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all resize-y disabled:opacity-60`}
                  />
                  {formErrors.message && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submissionState === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submissionState === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
