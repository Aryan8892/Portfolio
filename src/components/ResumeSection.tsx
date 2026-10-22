import React, { useState } from 'react';
import { FileText, Download, Eye, CheckCircle2, Sparkles, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ResumeSection: React.FC = () => {
  const { personal, projects, education } = PORTFOLIO_DATA;
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  return (
    <section id="resume" className="py-14 sm:py-16 relative overflow-hidden bg-[#07080d]/70 w-full">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Resume &amp; <span className="text-gradient-electric">Credentials</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A comprehensive overview of my academic record, technical toolset, and engineering projects prepared for internship and full-time hiring reviews.
          </p>
        </div>

        {/* resume Spotlight Card */}
        <div className="max-w-5xl xl:max-w-6xl mx-auto w-full glass-panel p-8 sm:p-10 rounded-2xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-cyan-500/10 via-violet-500/10 to-transparent blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{personal.resumeLastUpdated}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {personal.name} &mdash; SDE resume
              </h3>
              <p className="text-sm text-slate-400 mt-1 font-mono">
                B.Tech in Computer Science &amp; Engineering &bull; Full-Stack &amp; Embedded Systems
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                href={personal.resumeUrl}
                download="Aryan_Pandey_resume.pdf"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>

              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-slate-200 font-semibold text-sm transition-all duration-200 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Quick Summary</span>
              </button>
            </div>
          </div>

          {/* Quick Snapshot Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-xs font-mono text-cyan-400 uppercase font-semibold mb-2">
                01. Technical Stack
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>&bull; Frontend: HTML5, CSS3, JavaScript, React</li>
                <li>&bull; Languages: Java, Python, C, C++, R</li>
                <li>&bull; Database: SQL, MySQL</li>
                <li>&bull; Tools: Git, GitHub, VS Code, Antigravity</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-xs font-mono text-violet-400 uppercase font-semibold mb-2">
                02. Featured Projects
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>&bull; Alcohol Sensing Alert System (Engine Off IoT)</li>
                <li>&bull; VetCare – Veterinary Clinic &amp; Pet Care System</li>
                <li>&bull; CivicTrust – Complaint Management Portal</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-xs font-mono text-emerald-400 uppercase font-semibold mb-2">
                03. Education &amp; Target
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>&bull; B.Tech CSE (Data Science) [2025 - 2028] (8.1 CGPA)</li>
                <li>&bull; St. Peter's Engineering College, Hyderabad</li>
                <li>&bull; Diploma in ECE (7.8 CGPA) | Govt. Polytechnic</li>
                <li>&bull; Target: Software Engineering &amp; Frontend Intern</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Looking for a custom ATS format or tailored portfolio link?</span>
            </div>
            <a
              href={`mailto:${personal.email}?subject=resume%20Inquiry%20-%20Software%20Developer%20Role`}
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Request Custom resume via Email</span>
            </a>
          </div>
        </div>

      </div>

      {/* Quick Summary Modal */}
      {showPreviewModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowPreviewModal(false)}
        >
          <div
            className="glass-panel w-full max-w-2xl max-h-[85vh] rounded-2xl border border-cyan-500/30 overflow-y-auto p-6 sm:p-8 bg-[#0b0e1a] text-left space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white">resume Fast Snapshot</h3>
                <p className="text-xs text-slate-400 font-mono">Curated summary for hiring managers</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs font-mono text-cyan-400 font-bold uppercase mb-1">Candidate Profile</div>
                <div className="text-white font-semibold">{personal.name}</div>
                <div className="text-xs text-slate-400">{personal.roleHeadline} &bull; {personal.location}</div>
                <p className="text-xs mt-2 text-slate-300">{personal.shortBio}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs font-mono text-violet-400 font-bold uppercase mb-2">Verified Projects Highlight</div>
                {projects.map((p) => (
                  <div key={p.id} className="mb-2 last:mb-0">
                    <span className="text-white font-medium text-xs">&bull; {p.title}:</span>{' '}
                    <span className="text-xs text-slate-400">{p.shortDescription}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs font-mono text-emerald-400 font-bold uppercase mb-2">Education</div>
                <div className="text-white font-medium text-xs">{education[0].degree} - {education[0].specialization}</div>
                <div className="text-xs text-slate-400">{education[0].institution} &bull; {education[0].duration}</div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <a
                href={personal.resumeUrl}
                download="Aryan_Pandey_resume.pdf"
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
              >
                Download PDF Document
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
