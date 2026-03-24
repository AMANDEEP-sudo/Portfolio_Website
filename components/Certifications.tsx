'use client';

import { CERTIFICATIONS } from '@/lib/constants';
import { Award, Download, ExternalLink } from 'lucide-react';
import { MotionDiv, MotionA } from '@/lib/motion';

export default function Certifications() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="certifications" className="section-padding relative">
      <div className="container-custom">
        <MotionDiv
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-gray-500">Certifications</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">Proof of Mastery</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Official credentials from hackathons, industry programs, and MOOCs that validate the stack I bring to every build.
          </p>
        </MotionDiv>

        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 md:grid-cols-2"
        >
          {CERTIFICATIONS.map((cert) => (
            <MotionDiv
              key={cert.id}
              variants={itemVariants}
              className="glass border border-white/10 rounded-3xl p-6 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-gray-400">
                <span className="text-accent flex items-center gap-2 tracking-[0.2em]">
                  <Award className="w-4 h-4" />
                  {cert.category}
                </span>
                <span>{cert.year}</span>
              </div>

              <div className="mt-5 space-y-3">
                <h3 className="text-2xl font-bold text-white">{cert.title}</h3>
                <p className="text-sm text-gray-400">Issued by {cert.issuer}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{cert.description}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <MotionA
                  href={`/api/certificates/${cert.id}?mode=view`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" /> View PDF
                </MotionA>
                <MotionA
                  href={`/api/certificates/${cert.id}?mode=download`}
                  download={cert.fileName}
                  className="inline-flex items-center gap-2 rounded-full bg-[#a855f7] px-5 py-2 text-sm font-semibold text-white btn-glow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" /> Download
                </MotionA>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}
