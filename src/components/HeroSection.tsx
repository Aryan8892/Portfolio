import React from 'react';
import { FileDown, Eye, Mail, Sparkles, Code2, Cpu, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Hero3DCanvas } from './Hero3DCanvas';
import { GithubIcon, LinkedinIcon } from './Icons';

export const HeroSection: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden bg-radial-gradient"
    >
      {/* Background glow ambient layers */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-violet-600/15 to-transparent blur-[120px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-violet-500/10 blur-[100px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Pulsing Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium mb-6 shadow-sm shadow-cyan-950">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{personal.statusBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-5">
              Hi, I'm <span className="text-gradient-electric">{personal.name}</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-300 mt-2 font-mono">
                &lt;{personal.roleHeadline} /&gt;
              </span>
            </h1>

            {/* Subheadline & Bio */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
              {personal.shortBio}
            </p>

            {/* Core Tech Stack Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-xs font-mono uppercase text-slate-400 mr-2 flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" /> Core Focus:
              </span>
              {['React & JavaScript', 'HTML5 & CSS3', 'Java & Python', 'Arduino & Embedded C/C++', 'SQL & Databases'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Eye className="w-4 h-4" />
                <span>View Projects</span>
              </a>

              <a
                href={personal.resumeUrl}
                download="Aryan_Pandey_resume.pdf"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 hover:border-cyan-400/50 hover:bg-white/10 text-slate-200 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <FileDown className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Download resume</span>
              </a>
            </div>

            {/* Social Quick Links & Proof */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 w-full text-slate-400 text-xs">
              <div className="flex items-center gap-3">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors border border-white/10"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors border border-white/10"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-colors border border-white/10"
                  aria-label="Email Me Directly"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-400 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Available for Immediate Interview</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Geometric Interactive Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Subtle glow circle behind 3D object */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-500/20 to-violet-600/20 blur-3xl pointer-events-none" />

            {/* 3D Interactive Canvas Component */}
            <div className="relative w-full aspect-square max-w-[460px] flex items-center justify-center">
              <Hero3DCanvas />

              {/* Floating Glass Badges */}
              <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-0 glass-panel p-3 rounded-xl border border-cyan-500/30 shadow-xl flex items-center gap-3 animate-float backdrop-blur-xl">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">Specialization</div>
                  <div className="text-xs font-bold text-white">CSE (Data Science)</div>
                </div>
              </div>

              <div className="absolute -top-2 -right-2 sm:top-6 sm:right-0 glass-panel p-3 rounded-xl border border-violet-500/30 shadow-xl flex items-center gap-3 animate-float [animation-delay:2s] backdrop-blur-xl">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-300">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">Engineering</div>
                  <div className="text-xs font-bold text-white">Web &amp; Embedded IoT</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/10">
          {personal.stats.map((stat, i) => (
            <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 hover:border-cyan-500/20 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono text-gradient-electric">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
