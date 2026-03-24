'use client';

import { useEffect, useRef, ComponentType } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { HERO_CONTENT, SOCIAL_LINKS } from '@/lib/constants';
import { MotionDiv, MotionA, MotionH2 } from '@/lib/motion';

const SOCIAL_ICON_MAP: Record<string, ComponentType<{ size?: number }>> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      containerRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y * 100}%`);

      // Subtle tilt effect on image
      if (imageRef.current) {
        const rotateX = (y - 0.5) * 10;
        const rotateY = (x - 0.5) * 10;
        imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-24"
    >
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-accent-blue rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent-purple rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />

      <div className="relative z-10 container-custom px-4 py-16 lg:py-0">
        <MotionDiv
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <div className="space-y-8">
            {/* Greeting */}
            {HERO_CONTENT.greeting && (
              <MotionDiv variants={itemVariants}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-200">
                  👋 {HERO_CONTENT.greeting}
                </span>
              </MotionDiv>
            )}

            {/* Main Heading */}
            <MotionDiv variants={itemVariants} className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="text-gradient">{HERO_CONTENT.title}</span>
              </h1>
              <p className="text-2xl md:text-3xl text-white font-light">
                {HERO_CONTENT.roleLine}
              </p>
              <p className="text-lg md:text-xl text-gray-300">
                {HERO_CONTENT.emphasisLine}
              </p>
            </MotionDiv>

            {/* Subheading */}
            <MotionH2
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-300 font-light max-w-lg"
            >
              {HERO_CONTENT.description}
            </MotionH2>

            {/* Buttons */}
            <MotionDiv
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <MotionA
                href="#projects"
                className="px-8 py-3 bg-[#a855f7] text-white rounded-full font-semibold btn-glow text-center"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 25px rgba(168, 85, 247, 0.6)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                {HERO_CONTENT.ctaPrimary}
              </MotionA>
              <MotionA
                href="/Amandeep Aman_general_cv_feb_21_2026.pdf"
                className="px-8 py-3 border-2 border-white/40 text-white rounded-full font-semibold hover:bg-white/10 transition-colors text-center"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 25px rgba(255, 255, 255, 0.2)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                {HERO_CONTENT.ctaSecondary}
              </MotionA>
            </MotionDiv>

            {/* Social Links */}
            <MotionDiv
              variants={itemVariants}
              className="flex flex-col gap-3 pt-6"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
                {HERO_CONTENT.socialHint}
              </p>
              <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = SOCIAL_ICON_MAP[social.name] ?? Github;
                  return (
                    <MotionA
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:text-[#a855f7] transition-all"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={18} />
                    </MotionA>
                  );
                })}
              </div>
            </MotionDiv>
          </div>

          {/* Right - Image with Animated Rings */}
          <MotionDiv
            ref={imageRef}
            variants={imageVariants}
            className="relative h-[400px] lg:h-[500px] flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
          >
            {/* Animated Ring 1 - Outermost */}
            <MotionDiv
              className="absolute inset-0 rounded-full border-2 border-[#a855f7] opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
            />

            {/* Animated Ring 2 */}
            <MotionDiv
              className="absolute inset-8 rounded-full border-2 border-[#c084fc] opacity-40"
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{ borderBottomColor: 'transparent', borderLeftColor: 'transparent' }}
            />

            {/* Animated Ring 3 */}
            <MotionDiv
              className="absolute inset-16 rounded-full border border-[#f472b6] opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />

            {/* Animated Ring 4 - Innermost */}
            <MotionDiv
              className="absolute inset-24 rounded-full border border-[#22d3ee] opacity-30"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />

            {/* Image Container */}
            <MotionDiv
              className="relative z-10 w-56 h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-accent shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-[#a855f7] via-[#7c3aed] to-[#ec4899] flex items-center justify-center">
                <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Head */}
                  <circle cx="50" cy="35" r="20" fill="currentColor" className="text-white opacity-80" />
                  {/* Body */}
                  <rect x="35" y="55" width="30" height="35" rx="5" fill="currentColor" className="text-white opacity-80" />
                  {/* Arms */}
                  <rect x="20" y="60" width="15" height="8" rx="4" fill="currentColor" className="text-white opacity-80" />
                  <rect x="65" y="60" width="15" height="8" rx="4" fill="currentColor" className="text-white opacity-80" />
                </svg>
              </div>
              {/* Overlay glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            </MotionDiv>

            {/* Center glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/10 to-accent-blue/10 blur-3xl" />

            {/* Floating particles around image */}
            {[...Array(8)].map((_, i) => (
              <MotionDiv
                key={i}
                className="absolute w-1 h-1 rounded-full bg-accent"
                animate={{
                  x: [0, Math.cos((i / 8) * Math.PI * 2) * 80],
                  y: [0, Math.sin((i / 8) * Math.PI * 2) * 80],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  delay: i * 0.1,
                }}
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '-2px',
                  marginLeft: '-2px',
                }}
              />
            ))}
          </MotionDiv>
        </MotionDiv>
      </div>

      {/* Scroll Indicator */}
      <MotionDiv
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="text-accent" size={24} />
      </MotionDiv>
    </section>
  );
}
