import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ExternalLink,
  CheckCircle,
  Cpu,
  Server,
  ShieldCheck,
  Zap,
  ArrowRight,
  Layers,
  GitBranch,
  Terminal,
} from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'overview'>('architecture');

  // Lock body scroll cleanly and bind Esc key
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  // Reset tab to architecture whenever a new project is selected
  useEffect(() => {
    if (project) {
      setActiveTab('architecture');
    }
  }, [project]);

  if (!project) return null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="glass-panel w-full max-w-4xl max-h-[92vh] rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl flex flex-col relative bg-[#090b14] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="shrink-0 px-5 sm:px-8 py-4 bg-[#090b14]/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-cyan-950/90 text-cyan-300 border border-cyan-500/30">
              {project.category}
            </span>
            {project.isPrototypeOrHardware ? (
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-amber-950/80 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>Hardware Interlock</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-emerald-400" />
                <span>Modular Web Architecture</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
              aria-label="Close project modal (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Subheader & Navigation Tabs */}
        <div className="shrink-0 px-5 sm:px-8 pt-5 pb-3 border-b border-white/5 bg-[#0b0e1b]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h3 id="modal-title" className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-cyan-400 mt-1">
                {project.subtitle}
              </p>
            </div>

            {/* Quick Source Link in Header */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-mono border border-white/10 transition-all self-start sm:self-center shrink-0"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
              <ArrowRight className="w-3 h-3 text-cyan-400" />
            </a>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('architecture')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Architecture &amp; Pipeline</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Full Specifications &amp; Features</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {activeTab === 'architecture' ? (
            /* ================= ARCHITECTURE PIPELINE VIEW ================= */
            <div className="space-y-6">
              {/* Visual System Flow Diagram */}
              {project.architectureFlow && project.architectureFlow.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">
                      <GitBranch className="w-4 h-4 text-cyan-400" />
                      <span>End-to-End System Pipeline Flow</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                      Data &amp; Control Signal Flow
                    </span>
                  </div>

                  {/* Flow Diagram Grid with Connectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
                    {project.architectureFlow.map((node, index) => {
                      const isLast = index === (project.architectureFlow?.length ?? 0) - 1;

                      // Type badge styling
                      let badgeColor = 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30';
                      if (node.type === 'process') {
                        badgeColor = 'bg-violet-950/80 text-violet-300 border-violet-500/30';
                      } else if (node.type === 'logic') {
                        badgeColor = 'bg-amber-950/80 text-amber-300 border-amber-500/30';
                      } else if (node.type === 'output') {
                        badgeColor = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30';
                      }

                      return (
                        <div
                          key={node.step}
                          className="relative flex flex-col p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.05] transition-all group"
                        >
                          {/* Step Header */}
                          <div className="flex items-center justify-between mb-2.5">
                            <span className="text-xs font-mono font-bold text-cyan-400 group-hover:text-cyan-300">
                              STAGE {node.step}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${badgeColor}`}>
                              {node.type}
                            </span>
                          </div>

                          {/* Component Box */}
                          <div className="text-sm font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">
                            {node.label}
                          </div>

                          <div className="text-xs font-mono text-cyan-400/90 mb-2.5">
                            {node.component}
                          </div>

                          {/* Description */}
                          <p className="text-xs text-slate-300 leading-relaxed mt-auto">
                            {node.description}
                          </p>

                          {/* Horizontal Arrow on Desktop */}
                          {!isLast && (
                            <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#090b14] border border-cyan-500/40 items-center justify-center text-cyan-400 shadow-md">
                              <ArrowRight className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Architectural Narrative Box */}
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-violet-300 font-semibold uppercase tracking-wider">
                  <Server className="w-4 h-4 text-violet-400" />
                  <span>Technical System Architecture</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.architectureOverview}
                </p>

                {project.metricsOrOutcome && (
                  <div className="pt-3 border-t border-white/10 flex items-start gap-2.5 text-xs font-mono text-emerald-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Outcome &amp; Verification: {project.metricsOrOutcome}</span>
                  </div>
                )}
              </div>

              {/* Problem Solved & Verified Technologies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
                  <div className="text-xs font-mono uppercase text-cyan-300 font-semibold mb-1.5 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> Problem Solved
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.problemSolved}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                  <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-2">
                    Verified Engineering Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-cyan-300 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ================= FULL SPECIFICATIONS & FEATURES VIEW ================= */
            <div className="space-y-6">
              {/* Detailed Narrative */}
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold mb-2 tracking-wider">
                  System Overview &amp; Implementation Details
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Key Features Checklist */}
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold mb-3 tracking-wider">
                  Key Engineering Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-slate-200"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem Solved */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
                <div className="text-xs font-mono uppercase text-cyan-300 font-semibold mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Core Problem &amp; Impact
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.problemSolved}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="shrink-0 px-5 sm:px-8 py-4 bg-[#090b14]/95 backdrop-blur-xl border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-500/20 hover:from-cyan-500/30 hover:to-violet-500/30 text-white text-xs font-medium border border-cyan-500/30 shadow-md shadow-cyan-500/10 transition-all cursor-pointer"
            >
              <GithubIcon className="w-4 h-4 text-cyan-300" />
              <span>Source Code &amp; Documentation</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium shadow-md shadow-cyan-600/30 transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Preview</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close (Esc)
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
