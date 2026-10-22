import React, { useState } from 'react';
import { Wrench, CheckCircle2, Code2, Database, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const { skills } = PORTFOLIO_DATA;
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | 'all'>('all');

  const categories = [
    { label: 'All Domains', value: 'all' },
    ...skills.map((cat, idx) => ({ label: cat.title, value: idx }))
  ];

  const displayedSkills = activeCategoryIndex === 'all'
    ? skills.flatMap((cat) => cat.skills.map((s) => ({ ...s, categoryName: cat.title })))
    : skills[activeCategoryIndex as number].skills.map((s) => ({
        ...s,
        categoryName: skills[activeCategoryIndex as number].title
      }));

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30';
      case 'Proficient':
        return 'text-violet-400 bg-violet-950/60 border-violet-500/30';
      default:
        return 'text-slate-300 bg-slate-800/60 border-slate-700/40';
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-radial-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Wrench className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Verified Skills &amp; <span className="text-gradient-electric">Core Stack</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A verified repertoire centered on Java, Data Structures &amp; Algorithms, modern web engineering, and fundamental computer science principles.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = activeCategoryIndex === cat.value;
            return (
              <button
                key={String(cat.value)}
                onClick={() => setActiveCategoryIndex(cat.value as number | 'all')}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-lg shadow-cyan-500/20'
                    : 'glass-panel text-slate-300 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {displayedSkills.map((skill, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-5 rounded-xl border border-white/10 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {skill.categoryName}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getLevelColor(
                      skill.level
                    )}`}
                  >
                    {skill.level}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mt-2">
                  {skill.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Verified Foundation</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400/80" />
              </div>
            </div>
          ))}
        </div>

        {/* Spotlight Card: Java & DSA Engineering Focus */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 via-slate-900/60 to-violet-950/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Specialized Core Focus</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Algorithmic Foundations in Java &amp; Computational Thinking
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                My approach to software engineering centers around rigorous problem solving. I write clean, modular Java code with strong adherence to Object-Oriented principles, efficient memory utilization, and algorithmic optimizations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Code2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Object-Oriented Design</div>
                  <div className="text-[11px] text-slate-400">Encapsulation, Polymorphism, Abstraction</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Database className="w-5 h-5 text-violet-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Time &amp; Space Complexity</div>
                  <div className="text-[11px] text-slate-400">Big-O analysis &amp; scalable structures</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
