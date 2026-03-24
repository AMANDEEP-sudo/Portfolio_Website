'use client';

import { Code2, Github } from 'lucide-react';
import { FEATURED_PROJECTS } from '@/lib/constants';
import { MotionDiv, MotionA } from '@/lib/motion';

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <MotionDiv
          className="mb-16 text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-sm uppercase tracking-[0.4em] text-gray-500">Projects</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">Featured Builds</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Selected work blending backend reliability with front-end polish, deployed with the same care I bring to production systems.
          </p>
        </MotionDiv>

        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 md:grid-cols-2"
        >
          {FEATURED_PROJECTS.map((project) => (
            <MotionDiv
              key={project.id}
              variants={itemVariants}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-[#120417] to-black/80 p-6"
            >
              <div className="mt-4 space-y-3">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <p className="text-gray-300 text-sm">{project.description}</p>
              </div>

              <div
                className="my-6 h-44 rounded-2xl border border-white/10 flex items-center justify-center text-xs uppercase tracking-[0.5em] text-white/50"
                style={{
                  background: project.image || 'linear-gradient(135deg, #3a0c59, #1a032a)',
                }}
              />

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-100">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {project.highlights.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm text-gray-200">
                    <Code2 className="mt-0.5 h-4 w-4 text-[#a855f7]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <MotionA
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-100"
                  whileHover={{ x: 4 }}
                >
                  <Github size={16} /> Code
                </MotionA>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}
