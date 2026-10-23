
import React from 'react';
import ScrollReveal from './components/ScrollReveal';
import { FloatingCodeBackground } from './components/FloatingCodeBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#07080d] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
      <FloatingCodeBackground />
      <Navbar />

      <main className="flex-1 w-full relative z-10">
  <HeroSection />

  <ScrollReveal>
    <AboutSection />
  </ScrollReveal>

  <ScrollReveal delay={60}>
    <SkillsSection />
  </ScrollReveal>

  <ScrollReveal delay={60}>
    <ProjectsSection />
  </ScrollReveal>

  <ScrollReveal delay={60}>
    <EducationSection />
  </ScrollReveal>

  <ScrollReveal delay={60}>
    <ResumeSection />
  </ScrollReveal>

  <ScrollReveal delay={60}>
    <ContactSection />
  </ScrollReveal>
</main>

      <Footer />
    </div>
  );
};

export default App;

