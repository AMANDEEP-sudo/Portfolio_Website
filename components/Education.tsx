'use client';

import { BookOpen, GraduationCap } from 'lucide-react';
import { MotionDiv } from '@/lib/motion';

const education = [
  {
    level: 'B.Tech in Computer Science and Engineering',
    school: 'Lovely Professional University',
    duration: '2021 - 2025',
    cgpa: '7.34',
    icon: GraduationCap,
    color: 'from-accent to-orange-500',
  },
  {
    level: 'Intermediate',
    school: 'S.K.P Vidya Vihar',
    duration: '2019 - 2021',
    cgpa: '85%',
    icon: BookOpen,
    color: 'from-accent-blue to-blue-500',
  },
  {
    level: 'Matriculation',
    school: 'D.A.V Public School',
    duration: '2017 - 2019',
    cgpa: '88%',
    icon: BookOpen,
    color: 'from-accent-purple to-purple-500',
  },
];

export default function Education() {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="section-padding relative">
      <div className="container-custom">
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Title */}
          <MotionDiv variants={itemVariants} className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Education &<span className="text-gradient"> Background</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-accent to-accent-blue rounded-full mx-auto" />
          </MotionDiv>

          {/* Education Timeline */}
          <MotionDiv
            variants={containerVariants}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent-blue to-accent-purple" />

            {/* Education Items */}
            <div className="space-y-12">
              {education.map((edu, idx) => {
                const Icon = edu.icon;
                const isEven = idx % 2 === 0;

                return (
                  <MotionDiv
                    key={idx}
                    variants={itemVariants}
                    className={`md:flex gap-8 items-center`}
                  >
                    {/* Left Content (Desktop) */}
                    <div className={`md:w-1/2 ${isEven ? 'md:text-right' : ''}`}>
                      <div className={`glass p-6 rounded-lg ${!isEven ? 'md:hidden' : ''}`}>
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="w-6 h-6 text-accent" />
                          <span className="text-xs bg-accent bg-opacity-10 border border-accent border-opacity-30 rounded-full px-3 py-1 text-accent">
                            {edu.duration}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-1">{edu.level}</h3>
                        <p className="text-accent mb-2 font-semibold">{edu.school}</p>
                        <div className="text-2xl font-bold text-accent-blue">
                          {edu.cgpa}
                        </div>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="hidden md:flex justify-center mb-4 md:mb-0">
                      <MotionDiv
                        className={`w-6 h-6 rounded-full border-4 border-primary bg-gradient-to-r ${edu.color} cursor-pointer`}
                        whileHover={{ scale: 1.3 }}
                      />
                    </div>

                    {/* Right Content (Desktop) */}
                    <div className={`md:w-1/2 ${isEven ? '' : 'md:text-left'}`}>
                      <div className={`glass p-6 rounded-lg ${isEven ? 'md:hidden' : ''}`}>
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="w-6 h-6 text-accent" />
                          <span className="text-xs bg-accent bg-opacity-10 border border-accent border-opacity-30 rounded-full px-3 py-1 text-accent">
                            {edu.duration}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-1">{edu.level}</h3>
                        <p className="text-accent mb-2 font-semibold">{edu.school}</p>
                        <div className="text-2xl font-bold text-accent-blue">
                          {edu.cgpa}
                        </div>
                      </div>
                    </div>

                    {/* Mobile Card */}
                    <div className="md:hidden w-full">
                      <div className="glass p-6 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="w-6 h-6 text-accent" />
                          <span className="text-xs bg-accent bg-opacity-10 border border-accent border-opacity-30 rounded-full px-3 py-1 text-accent">
                            {edu.duration}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-1">{edu.level}</h3>
                        <p className="text-accent mb-2 font-semibold">{edu.school}</p>
                        <div className="text-2xl font-bold text-accent-blue">
                          {edu.cgpa}
                        </div>
                      </div>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}
