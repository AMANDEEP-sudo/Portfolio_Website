'use client';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import TechStack from '@/components/TechStack';
import Education from '@/components/Education';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import ParticlesBackground from '@/components/ParticlesBackground';
import ScrollProgress from '@/components/ScrollProgress';
import ContributionToggle from '@/components/ContributionToggle';

export default function Home() {
  return (
    <main className="relative bg-primary">
      <ParticlesBackground />
      <ScrollProgress />
      <Hero />
      <About />
      <section id="contributions" className="section-padding relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="text-gradient">Contributions</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Real-time activity from GitHub and LeetCode
            </p>
            <div className="w-20 h-1.5 bg-gradient-to-r from-accent to-accent-blue rounded-full mx-auto mt-6" />
          </div>
          <ContributionToggle />
        </div>
      </section>
      <TechStack />
      <Education />
      <Certifications />
      <Projects />
      <Contact />
    </main>
  );
}
