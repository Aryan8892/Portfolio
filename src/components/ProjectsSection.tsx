
import React, { useState } from 'react';
import {
  Layers,
  ExternalLink,
  Info,
  Cpu,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

import { PORTFOLIO_DATA } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';
import ScrollReveal from './ScrollReveal';

export const ProjectsSection: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;

  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] =
    useState<Project | null>(null);

  const filterOptions = ['All', 'Full-Stack', 'IoT & Embedded', 'Web App'];

  const filteredProjects =
    selectedFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  // 3D card hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden bg-[#07080d]/80"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Engineering Work</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Projects &amp;{' '}
            <span className="text-gradient-electric">
              System Architectures
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Real-world software platforms and embedded hardware systems built
            with clean modular code and reliable architecture.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-lg shadow-cyan-500/20'
                  : 'glass-panel text-slate-300 hover:text-white hover:border-white/20'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Individual Project Card Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              delay={index * 120}
              className="h-full"
            >
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="glass-panel rounded-2xl border border-white/10 flex flex-col justify-between overflow-hidden group transition-transform duration-200 ease-out shadow-xl hover:border-cyan-500/40 hover:shadow-cyan-500/10 h-full"
                style={{
                  transition:
                    'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div className="p-6 sm:p-7 flex flex-col h-full">
                  {/* Header Tags */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                      {project.category}
                    </span>

                    {project.isPrototypeOrHardware ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-500/20">
                        <Cpu className="w-3 h-3" />
                        Hardware/IoT
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        Software Platform
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs font-mono text-slate-400 mb-4">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {project.shortDescription}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-2 mb-6">
                    {project.features.slice(0, 3).map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-slate-400"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Chips */}
                  <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-1.5 mb-6">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[11px] font-mono rounded bg-white/5 text-slate-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}

                    {project.tags.length > 4 && (
                      <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-white/5 text-slate-400">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(project)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-cyan-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <Info className="w-4 h-4" />
                      <span>View Architecture</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-1">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors border border-white/10"
                        aria-label={`${project.title} GitHub repository`}
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-cyan-400 hover:text-cyan-300 transition-colors border border-white/10"
                          aria-label={`${project.title} live demo`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
