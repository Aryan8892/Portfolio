import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, CheckCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  const { education } = PORTFOLIO_DATA;

  return (
    <section id="education" className="py-14 sm:py-16 relative overflow-hidden bg-radial-gradient w-full">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Education &amp; <span className="text-gradient-electric">Curriculum</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A comprehensive computer science curriculum providing deep analytical rigor, algorithmic discipline, and core systems foundations.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="max-w-5xl xl:max-w-6xl mx-auto w-full relative space-y-6">
          
          {/* Timeline Line */}
          <div className="hidden sm:block absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500 via-violet-500 to-transparent pointer-events-none" />

          {education.map((item, idx) => (
            <div
              key={idx}
              className="relative flex flex-col sm:flex-row items-start gap-6 group"
            >
              {/* Timeline Marker */}
              <div className="hidden sm:flex w-16 h-16 shrink-0 rounded-2xl bg-[#0e1222] border-2 border-cyan-400/40 items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/10 group-hover:scale-110 group-hover:border-cyan-300 transition-all z-10">
                <GraduationCap className="w-7 h-7" />
              </div>

              {/* Card Container */}
              <div className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-2xl border border-white/10 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                    {item.status}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {item.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-violet-400" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {item.degree}
                </h3>
                <div className="text-sm font-semibold text-cyan-400 mb-2">
                  {item.specialization} &bull; <span className="text-slate-300">{item.institution}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-6">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.cgpaOrGrade}</span>
                </div>

                {/* Relevant Coursework */}
                <div className="mb-6">
                  <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-slate-400 mb-2.5 font-semibold">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Relevant Academic Coursework</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.relevantCoursework.map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-slate-300 border border-white/5 hover:border-cyan-500/30 transition-colors font-mono"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  {item.keyHighlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
