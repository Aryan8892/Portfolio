import React from 'react';
import { UserCheck, Binary, Layers, Cpu, Award, BookOpen, Terminal, CheckCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const { about } = PORTFOLIO_DATA;

  const pillarIcons = [
    <Binary className="w-6 h-6 text-cyan-400" />,
    <Layers className="w-6 h-6 text-violet-400" />,
    <Cpu className="w-6 h-6 text-pink-400" />,
    <Award className="w-6 h-6 text-emerald-400" />
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#07080d]/50">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Profile &amp; Engineering Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineering Code with <span className="text-gradient-electric">Precision &amp; Purpose</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {about.introduction}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {about.pillars.map((pillar, index) => (
            <div
              key={index}
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {pillarIcons[index]}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                Pillar 0{index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Deep Dive Box: Technical Profile & Mindset */}
        <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-cyan-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
                <Terminal className="w-4 h-4" />
                <span>Core Competencies Overview</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Structured Problem Solving Meets Real-World Implementation
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                As a software development student, my primary drive is to understand how systems function under the hood. From optimizing memory consumption in Java collections to orchestrating responsive state in React, I approach every challenge with curiosity, rigor, and modular design principles.
              </p>

              <div className="space-y-3">
                {about.technicalHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-cyan-300">Focus 01</span>
                  <BookOpen className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-sm font-semibold text-white">DSA &amp; Algorithmic Logic</div>
                <div className="text-xs text-slate-400 mt-1">
                  Practicing data structures (Arrays, Graphs, Trees, Heaps) and time/space complexity optimization.
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-violet-300">Focus 02</span>
                  <Layers className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-sm font-semibold text-white">End-to-End Web Applications</div>
                <div className="text-xs text-slate-400 mt-1">
                  Crafting type-safe, accessible user interfaces with TypeScript, modern CSS, and REST API integrations.
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-pink-300">Focus 03</span>
                  <Cpu className="w-4 h-4 text-slate-400" />
                </div>
                <div className="text-sm font-semibold text-white">Hardware &amp; IoT Prototyping</div>
                <div className="text-xs text-slate-400 mt-1">
                  Developing embedded safety and telemetry circuits utilizing sensor inputs and microcontroller actuators.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
