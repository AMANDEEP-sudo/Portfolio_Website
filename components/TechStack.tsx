'use client';

import { TECH_STACK } from '@/lib/constants';
import { MotionDiv } from '@/lib/motion';

export default function TechStack() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MotionDiv variants={itemVariants} className="mb-12 text-center">
            <div className="text-sm uppercase tracking-[0.4em] text-gray-400 mb-4">{'< Tech Stack />'}</div>
            <div className="section-divider" />
          </MotionDiv>

          <MotionDiv
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            {TECH_STACK.map((stack) => (
              <MotionDiv
                key={stack.category}
                variants={itemVariants}
                className="rounded-2xl p-6 border border-white/5 bg-[#05010a] shadow-[0_0_40px_rgba(147,51,234,0.15)]"
                whileHover={{ y: -4 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-white">{stack.category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {stack.tools.map((tool) => (
                    <div
                      key={tool}
                      className="flex items-center justify-center h-12 rounded-xl bg-[#12051c] border border-[#a855f7]/20 text-sm text-gray-200"
                    >
                      {tool}
                    </div>
                  ))}
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}
