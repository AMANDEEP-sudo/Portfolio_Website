'use client';

import { useState } from 'react';
import { MotionDiv } from '@/lib/motion';
import GitHubHeatmap from './GitHubHeatmap';
import LeetCodeHeatmap from './LeetCodeHeatmap';

export default function ContributionToggle() {
  const [activeTab, setActiveTab] = useState<'github' | 'leetcode'>('github');

  return (
    <div className="space-y-6">
      {/* Tab Toggle Slider */}
      <div className="relative inline-flex rounded-lg border border-white/10 bg-gradient-to-r from-white/5 to-white/[0.02] p-1 w-full md:w-auto md:mx-auto md:flex md:justify-center">
        {/* Animated Background Slider */}
        <MotionDiv
          className="absolute inset-1 rounded-md bg-gradient-to-r from-[#c084fc]/20 to-[#ec4899]/20 pointer-events-none"
          animate={{
            left: activeTab === 'github' ? 'calc(0.25rem)' : 'calc(50% + 0.25rem)',
          }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
        />

        {/* GitHub Tab */}
        <button
          onClick={() => setActiveTab('github')}
          className={`relative flex-1 md:flex-none px-6 py-3 rounded-md font-semibold text-sm uppercase tracking-[0.1em] transition-all duration-300 ${
            activeTab === 'github'
              ? 'text-white shadow-lg'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </div>
        </button>

        {/* LeetCode Tab */}
        <button
          onClick={() => setActiveTab('leetcode')}
          className={`relative flex-1 md:flex-none px-6 py-3 rounded-md font-semibold text-sm uppercase tracking-[0.1em] transition-all duration-300 ${
            activeTab === 'leetcode'
              ? 'text-white shadow-lg'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.102 17.93h-3.697v-5.955h3.697m0-4.023h-3.697V8.5h3.697M9.109 17.93H5.414V8.5h3.695m11.582-1.823c.5.823 1.614 1.769 2.142 1.769h.028s1.623-.769 2.142-1.769m3.75 12.386c-1.796 1.296-7.08.603-10.651-.932-3.572-1.535-5.859-4.29-4.062-5.586 1.795-1.294 7.078-.603 10.65.932 3.572 1.536 5.859 4.29 4.063 5.586zM24 12.556c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12z" />
            </svg>
            LeetCode
          </div>
        </button>
      </div>

      {/* Content with Smooth Transition */}
      <MotionDiv
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        {activeTab === 'github' ? (
          <GitHubHeatmap />
        ) : (
          <LeetCodeHeatmap />
        )}
      </MotionDiv>
    </div>
  );
}
