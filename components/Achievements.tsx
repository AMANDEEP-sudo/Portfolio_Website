'use client';

import { Award, Code2, Zap } from 'lucide-react';
import { useState, useEffect, memo } from 'react';
import { MotionDiv } from '@/lib/motion';

const achievements = [
  {
    icon: Award,
    title: 'Cloud Computing Certification',
    description: 'Elite Certification in Cloud Computing',
    issuer: 'NPTEL',
    color: 'from-accent to-orange-500',
  },
  {
    icon: Code2,
    title: '400+ Problems Solved',
    description: 'Solved across LeetCode, Codeforces, and HackerRank',
    issuer: 'Competitive Programming',
    color: 'from-accent-blue to-blue-500',
  },
  {
    icon: Award,
    title: 'Language Certifications',
    description: 'Earned badges in C, C++, and Java',
    issuer: 'Multiple Platforms',
    color: 'from-accent-purple to-purple-500',
  },
  {
    icon: Zap,
    title: 'BinarY Blitz Hackathon',
    description: 'Participated in competitive hackathon event',
    issuer: 'Tech Community',
    color: 'from-accent to-red-500',
  },
];

const CounterAnimation = memo(function CounterAnimation({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = target / 20;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [target]);

  return count;
});

export default function Achievements() {
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
              Achievements & <span className="text-gradient">Milestones</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-accent to-accent-blue rounded-full mx-auto" />
          </MotionDiv>

          {/* Achievements Grid */}
          <MotionDiv
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {achievements.map((achievement, idx) => {
              const Icon = achievement.icon;
              return (
                <MotionDiv
                  key={idx}
                  variants={itemVariants}
                  className="group"
                  whileHover={{ y: -5 }}
                >
                  <div className="glass p-8 rounded-lg h-full hover:border-accent transition-all cursor-pointer group-hover:shadow-lg group-hover:shadow-accent/20">
                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className={`w-16 h-16 rounded-lg bg-gradient-to-br ${achievement.color} opacity-20 flex items-center justify-center group-hover:opacity-30 transition-opacity`}
                      >
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                    <p className="text-gray-400 mb-3">
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-accent" />
                      <span className="text-sm text-accent font-medium">
                        {achievement.issuer}
                      </span>
                    </div>
                  </div>
                </MotionDiv>
              );
            })}
          </MotionDiv>

          {/* Stats Section */}
          <MotionDiv
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6"
          >
            <MotionDiv
              variants={itemVariants}
              className="glass p-8 rounded-lg text-center group hover:border-accent transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl font-bold text-accent mb-3">
                <CounterAnimation target={400} />+
              </div>
              <p className="text-gray-300 font-semibold mb-2">Problems Solved</p>
              <p className="text-gray-400 text-sm">
                Across multiple programming platforms
              </p>
            </MotionDiv>

            <MotionDiv
              variants={itemVariants}
              className="glass p-8 rounded-lg text-center group hover:border-accent-blue transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl font-bold text-accent-blue mb-3">
                3
              </div>
              <p className="text-gray-300 font-semibold mb-2">Certifications</p>
              <p className="text-gray-400 text-sm">
                Professional achievements and badges
              </p>
            </MotionDiv>

            <MotionDiv
              variants={itemVariants}
              className="glass p-8 rounded-lg text-center group hover:border-accent-purple transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="text-5xl font-bold text-accent-purple mb-3">
                10+
              </div>
              <p className="text-gray-300 font-semibold mb-2">Technologies</p>
              <p className="text-gray-400 text-sm">
                Languages, frameworks, and tools mastered
              </p>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}
