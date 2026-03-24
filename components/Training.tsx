'use client';

import { CheckCircle2 } from 'lucide-react';
import { MotionDiv } from '@/lib/motion';

const trainingPrograms = [
  {
    name: 'Java Bootcamp',
    provider: 'LeetCode + Codeforces Edition',
    duration: '6 months',
    topics: [
      'Object-Oriented Programming (OOP)',
      'Data Structures & Algorithms',
      'Problem Solving & Optimization',
      'Arrays, Recursion, Searching',
      'Dynamic Programming',
    ],
    level: 'Advanced',
  },
  {
    name: 'Web Development Fundamentals',
    provider: 'Self-Learning',
    duration: '4 months',
    topics: [
      'HTML5 & CSS3 Mastery',
      'JavaScript ES6+',
      'React.js Fundamentals',
      'Responsive Design',
      'Web Performance Optimization',
    ],
    level: 'Intermediate',
  },
  {
    name: 'Full Stack Web Development',
    provider: 'Hands-On Projects',
    duration: '3 months',
    topics: [
      'Node.js Backend Development',
      'Database Design (MySQL)',
      'API Development (REST)',
      'Authentication & Security',
      'Deployment & DevOps Basics',
    ],
    level: 'Intermediate',
  },
];

export default function Training() {
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
              Training & <span className="text-gradient">Learning</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-accent to-accent-blue rounded-full mx-auto" />
          </MotionDiv>

          {/* Training Timeline */}
          <MotionDiv
            variants={containerVariants}
            className="space-y-6"
          >
            {trainingPrograms.map((program, idx) => (
              <MotionDiv
                key={idx}
                variants={itemVariants}
                className="glass p-8 rounded-lg hover:border-accent transition-all"
                whileHover={{ x: 5 }}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{program.name}</h3>
                    <p className="text-accent text-sm font-medium mb-2">
                      {program.provider}
                    </p>
                    <div className="flex gap-4">
                      <span className="text-xs bg-accent bg-opacity-10 border border-accent border-opacity-30 rounded-full px-3 py-1 text-accent">
                        {program.duration}
                      </span>
                      <span className="text-xs bg-accent-blue bg-opacity-10 border border-accent-blue border-opacity-30 rounded-full px-3 py-1 text-accent-blue">
                        {program.level}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Topics */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-4 text-gray-300">Topics Covered:</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {program.topics.map((topic, topicIdx) => (
                      <MotionDiv
                        key={topicIdx}
                        className="flex items-center gap-2"
                        whileHover={{ x: 5 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{topic}</span>
                      </MotionDiv>
                    ))}
                  </div>
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>

          {/* Additional Learning Stats */}
          <MotionDiv
            variants={containerVariants}
            className="grid md:grid-cols-4 gap-4 mt-16"
          >
            <MotionDiv
              variants={itemVariants}
              className="glass p-6 rounded-lg text-center"
            >
              <div className="text-3xl font-bold text-accent mb-2">400+</div>
              <p className="text-gray-400 text-sm">Coding Problems</p>
            </MotionDiv>
            <MotionDiv
              variants={itemVariants}
              className="glass p-6 rounded-lg text-center"
            >
              <div className="text-3xl font-bold text-accent-blue mb-2">50+</div>
              <p className="text-gray-400 text-sm">Projects Completed</p>
            </MotionDiv>
            <MotionDiv
              variants={itemVariants}
              className="glass p-6 rounded-lg text-center"
            >
              <div className="text-3xl font-bold text-accent-purple mb-2">100+</div>
              <p className="text-gray-400 text-sm">Hours Learning</p>
            </MotionDiv>
            <MotionDiv
              variants={itemVariants}
              className="glass p-6 rounded-lg text-center"
            >
              <div className="text-3xl font-bold text-accent mb-2">10+</div>
              <p className="text-gray-400 text-sm">Technologies Mastered</p>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}
