'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';
import { MotionNav, MotionDiv, MotionA } from '@/lib/motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <MotionNav
      className={`fixed top-0 w-full z-40 backdrop-blur-lg transition-all duration-300 ${
        scrolled ? 'bg-black/70 border-b border-white/5' : 'bg-transparent'
      }`}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-custom px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <MotionDiv
          className="text-2xl font-bold text-[#c084fc]"
          whileHover={{ scale: 1.05 }}
        >
          Portfolio.
        </MotionDiv>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.2em]">
          {NAV_ITEMS.map((item) => (
            <MotionA
              key={item.name}
              href={item.href}
              className="relative group text-gray-300"
              whileHover={{ color: '#c084fc' }}
            >
              {item.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a855f7] to-[#ec4899] group-hover:w-full transition-all duration-300" />
            </MotionA>
          ))}
        </div>

        {/* CTA Button */}
        <MotionA
          href="/Amandeep Aman_general_cv_feb_21_2026.pdf"
          download="Amandeep-Aman-Resume.pdf"
          className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 group border border-[#c084fc]/60"
          whileHover={{
            scale: 1.05,
            backgroundColor: 'rgba(192, 132, 252, 0.1)',
            boxShadow: '0 0 18px rgba(192, 132, 252, 0.4)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Resume</span>
          <MotionDiv
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Download size={18} />
          </MotionDiv>
        </MotionA>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <MotionDiv
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="glass px-4 md:px-8 py-4 space-y-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block text-sm font-medium hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a
            href="/Amandeep Aman_general_cv_feb_21_2026.pdf"
            download="Amandeep-Aman-Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-transparent border-2 border-accent rounded-lg text-sm font-semibold text-accent text-center w-full justify-center transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            <span>Resume</span>
            <Download size={18} />
          </a>
        </div>
      </MotionDiv>
    </MotionNav>
  );
}
