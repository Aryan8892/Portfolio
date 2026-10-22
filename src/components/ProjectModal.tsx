import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle, Cpu, Server, ShieldCheck, Zap } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="glass-panel w-full max-w-3xl max-h-[90vh] rounded-2xl border border-cyan-500/30 overflow-y-auto shadow-2xl relative bg-[#0b0e1a] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 px-6 py-4 bg-[#0b0e1a]/95 backdrop-blur-lg border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              {project.category}
            </span>
            {project.isPrototypeOrHardware && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-950 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Cpu className="w-3 h-3" /> Hardware Prototype
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-cyan-400 mt-1 font-mono">
              {project.subtitle}
            </p>
          </div>

          {/* Problem Statement Box */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20">
            <div className="text-xs font-mono uppercase text-cyan-300 font-semibold mb-1 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Problem Solved
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {project.problemSolved}
            </p>
          </div>

          {/* Detailed Narrative */}
          <div>
            <h4 className="text-sm font-mono uppercase text-slate-400 font-semibold mb-2">
              System Overview &amp; Implementation
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Features Checklist */}
          <div>
            <h4 className="text-sm font-mono uppercase text-slate-400 font-semibold mb-3">
              Key Engineering Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture & Stack */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-semibold uppercase">
              <Server className="w-4 h-4 text-violet-400" />
              <span>Architectural Specifications</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.architectureOverview}
            </p>
            {project.metricsOrOutcome && (
              <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-cyan-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Verification Outcome: {project.metricsOrOutcome}</span>
              </div>
            )}
          </div>

          {/* Tech Badges */}
          <div>
            <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold mb-2">
              Verified Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
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

          {/* Footer Actions */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/15 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code / Documentation</span>
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium shadow-md shadow-cyan-600/30 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Preview / Demo</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
