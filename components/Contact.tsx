"use client";

import Image from 'next/image';
import { CONTACT_CTA, CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';
import { Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { MotionDiv, MotionA, MotionInput, MotionTextarea, MotionButton } from '@/lib/motion';

const CONTACT_ICON_MAP: Record<'Mail' | 'Phone' | 'MapPin', LucideIcon> = {
  Mail,
  Phone,
  MapPin,
};

const SOCIAL_ICON_MAP: Record<'GitHub' | 'LinkedIn' | 'Email', LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-custom">
        <MotionDiv variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <MotionDiv variants={itemVariants} className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500">Contact</p>
            <h2 className="text-4xl md:text-5xl font-bold mt-3">{CONTACT_CTA.heading}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mt-4">{CONTACT_CTA.message}</p>
            <div className="h-1 w-24 mx-auto mt-6 bg-gradient-to-r from-[#a855f7] to-[#c084fc] rounded-full" />
          </MotionDiv>

          <div className="grid gap-12 md:grid-cols-[1.1fr,0.9fr]">
            <MotionDiv variants={itemVariants} className="space-y-10">
              <div className="space-y-4">
                <p className="text-lg text-gray-300">Need a backend-heavy web app, mentorship, or hackathon teammate? I reply within 24h.</p>
                <p className="text-sm text-gray-500">Drop a note with a roadmap, expectation, or just vibes — I read everything.</p>
              </div>

              <div className="relative mx-auto h-80 w-80" suppressHydrationWarning>
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className="absolute inset-6 rounded-full border border-white/10" />
                <div className="absolute inset-12 rounded-full border border-white/10" />
                <div className="absolute inset-20 rounded-full bg-gradient-to-br from-[#a855f7] via-[#7c3aed] to-[#1f0c2b] flex items-center justify-center">
                  <Image src="/avatar-placeholder.svg" alt="Contact avatar" width={180} height={180} className="opacity-80" />
                </div>
                {SOCIAL_LINKS.map((social, index) => {
                  const Icon = SOCIAL_ICON_MAP[social.name as keyof typeof SOCIAL_ICON_MAP] ?? Github;
                  const angle = (index / SOCIAL_LINKS.length) * Math.PI * 2;
                  const radius = 140;
                  const x = Math.round(Math.cos(angle) * radius * 100) / 100;
                  const y = Math.round(Math.sin(angle) * radius * 100) / 100;

                  return (
                    <MotionA
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-black/70 text-white backdrop-blur"
                      style={{ top: `calc(50% + ${y}px)`, left: `calc(50% + ${x}px)` }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Icon className="h-5 w-5" />
                    </MotionA>
                  );
                })}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {CONTACT_INFO.map((info) => {
                  const Icon = CONTACT_ICON_MAP[info.icon as keyof typeof CONTACT_ICON_MAP] ?? Mail;
                  return (
                    <div key={info.label} className="glass rounded-2xl border border-white/5 p-5">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-[#a855f7]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-sm uppercase tracking-widest text-gray-500">{info.label}</p>
                      <a href={info.href} className="mt-1 block text-lg font-semibold text-white hover:text-[#a855f7] transition-colors">
                        {info.value}
                      </a>
                    </div>
                  );
                })}
              </div>
            </MotionDiv>

            <MotionDiv variants={itemVariants} className="glass rounded-3xl border border-white/5 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Your Name</label>
                  <MotionInput
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus:border-[#a855f7] focus:outline-none"
                    required
                    whileFocus={{ borderColor: '#a855f7' }}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Your Email</label>
                  <MotionInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus:border-[#a855f7] focus:outline-none"
                    required
                    whileFocus={{ borderColor: '#a855f7' }}
                    suppressHydrationWarning
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Subject</label>
                  <MotionInput
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus:border-[#a855f7] focus:outline-none"
                    required
                    whileFocus={{ borderColor: '#a855f7' }}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Message</label>
                  <MotionTextarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus:border-[#a855f7] focus:outline-none"
                    required
                    whileFocus={{ borderColor: '#a855f7' }}
                  />
                </div>

                <MotionButton
                  type="submit"
                  className="btn-glow flex w-full items-center justify-center gap-2 rounded-2xl bg-[#a855f7] px-6 py-3 font-semibold text-white"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(168, 85, 247, 0.7)' }}
                  whileTap={{ scale: 0.98 }}
                  disabled={submitted}
                >
                  {submitted ? (
                    'Message Sent ✓'
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {CONTACT_CTA.button}
                    </>
                  )}
                </MotionButton>

                {submitted && (
                  <MotionDiv
                    className="rounded-2xl border border-green-400/30 bg-green-500/10 px-4 py-3 text-center text-green-300"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Thank you! I will get back to you soon.
                  </MotionDiv>
                )}
              </form>
            </MotionDiv>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
