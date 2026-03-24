'use client';

import { useInView } from '@/lib/hooks';
import Image from 'next/image';
import { ABOUT_PARAGRAPHS, ABOUT_TAGS } from '@/lib/constants';
import { MotionDiv } from '@/lib/motion';

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <MotionDiv
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Title */}
          <MotionDiv variants={itemVariants} className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-accent to-accent-blue rounded-full mx-auto" />
          </MotionDiv>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <MotionDiv variants={itemVariants} className="relative flex justify-center">
              <div className="w-72 h-72 rounded-full bg-gradient-to-b from-[#a855f7] to-[#2d0c40] flex items-center justify-center shadow-[0_0_120px_rgba(168,85,247,0.6)]">
                <Image src="/avatar-placeholder.svg" alt="Profile silhouette" width={220} height={220} className="opacity-80" />
              </div>
              <div className="absolute inset-0 border border-white/10 rounded-full animate-ping opacity-20" />
            </MotionDiv>

            {/* Text Content */}
            <MotionDiv variants={itemVariants} className="space-y-6">
              <h3 className="text-3xl font-semibold">Hey there! 👋</h3>
              {ABOUT_PARAGRAPHS.map((paragraph, idx) => (
                <p key={idx} className="text-lg text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="grid sm:grid-cols-3 gap-4">
                {ABOUT_TAGS.map((tag) => (
                  <div key={tag.label} className="glass p-4 rounded-lg border border-white/5">
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">{tag.label}</p>
                    <p className="text-sm text-gray-100">{tag.value}</p>
                  </div>
                ))}
              </div>
            </MotionDiv>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
