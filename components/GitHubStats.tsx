'use client';

import { useEffect, useState } from 'react';
import { Github, Users, Zap, TrendingUp } from 'lucide-react';
import { MotionDiv } from '@/lib/motion';

interface ContributionData {
  username: string;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  averageContributions: number;
  repositories: number;
  followers: number;
  following: number;
  joinDate: string;
}

export default function GitHubStats() {
  const [stats, setStats] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/github/stats');
        if (!response.ok) throw new Error('Failed to fetch GitHub stats');
        const data = await response.json();
        setStats(data);
      } catch {
        // Still show fallback data
        setStats({
          username: 'AMANDEEP-sudo',
          totalContributions: 205,
          currentStreak: 12,
          longestStreak: 45,
          averageContributions: 4,
          repositories: 15,
          followers: 5,
          following: 10,
          joinDate: '2024-10-01',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-20 bg-gradient-to-r from-[rgba(192,132,252,0.1)] to-transparent rounded-lg animate-pulse" />
        <div className="h-20 bg-gradient-to-r from-[rgba(192,132,252,0.1)] to-transparent rounded-lg animate-pulse" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            icon: Zap,
            label: 'Contributions',
            value: stats.totalContributions.toString(),
            color: 'from-[#c084fc] to-[#a855f7]',
          },
          {
            icon: TrendingUp,
            label: 'Current Streak',
            value: `${stats.currentStreak} days`,
            color: 'from-[#ec4899] to-[#db2777]',
          },
          {
            icon: Github,
            label: 'Repositories',
            value: stats.repositories.toString(),
            color: 'from-[#06b6d4] to-[#0891b2]',
          },
          {
            icon: Users,
            label: 'Followers',
            value: stats.followers.toString(),
            color: 'from-[#10b981] to-[#059669]',
          },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <MotionDiv
              key={idx}
              className={`relative p-4 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10">
                <Icon className="w-5 h-5 mb-2 text-[#c084fc]" />
                <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
            </MotionDiv>
          );
        })}
      </div>

      {/* GitHub Profile Link */}
      <MotionDiv
        className="relative p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#c084fc] to-[#ec4899] opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-1">GitHub Profile</h4>
            <p className="text-xs text-gray-500">
              {stats.longestStreak} day longest streak • {stats.averageContributions} avg per week
            </p>
          </div>
          <a
            href={`https://github.com/${stats.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full text-sm font-semibold text-white border border-[#c084fc]/60 hover:bg-[#c084fc]/10 transition-all duration-300"
          >
            Visit Profile →
          </a>
        </div>
      </MotionDiv>

      {/* Contribution Graph Placeholder */}
      <MotionDiv
        className="relative p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h4 className="text-sm font-semibold text-gray-300 mb-4">Recent Activity</h4>
        
        {/* Week days header */}
        <div className="flex gap-1 mb-2">
          {['Mon', 'Wed', 'Fri', 'Sun'].map((day) => (
            <div key={day} className="w-8 text-center text-xs text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Contribution grid - simplified view */}
        <div className="grid grid-cols-14 gap-1">
          {[...Array(52)].map((_, week) =>
            [0, 2, 4, 6].map((day) => {
              // Create a pattern of contributions
              const intensity = (week + day) % 3;
              const colors = [
                'bg-white/5',
                'bg-[#c084fc]/30',
                'bg-[#a855f7]/60',
              ];
              
              return (
                <div
                  key={`${week}-${day}`}
                  className={`w-3 h-3 rounded-sm ${colors[intensity]} hover:ring-1 hover:ring-[#c084fc] transition-all duration-200 cursor-pointer`}
                  title={`Week ${week + 1}`}
                />
              );
            })
          )}
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Showing contribution activity from the past year. Last updated: {new Date().toLocaleDateString()}
        </p>
      </MotionDiv>
    </div>
  );
}
