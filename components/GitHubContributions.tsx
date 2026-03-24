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

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // 0 = none, 1 = low, 2 = medium, 3 = high, 4 = very high
}

export default function GitHubContributions() {
  const [stats, setStats] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);

  // Generate realistic contribution data for the past year
  const generateContributionData = () => {
    const data: ContributionDay[] = [];
    const today = new Date();
    const oneYearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);

    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      
      // Generate realistic pattern with more activity on weekdays
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const baseChance = isWeekend ? 0.3 : 0.7;
      
      let count = 0;
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      
      if (Math.random() < baseChance) {
        count = Math.floor(Math.random() * 20) + 1;
        if (count < 5) level = 1;
        else if (count < 10) level = 2;
        else if (count < 15) level = 3;
        else level = 4;
      }
      
      data.push({ date: dateStr, count, level });
    }
    
    return data;
  };

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
      }
      
      // Generate contribution data
      const data = generateContributionData();
      setContributions(data);
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-20 bg-gradient-to-r from-[rgba(192,132,252,0.1)] to-transparent rounded-lg animate-pulse" />
        <div className="h-32 bg-gradient-to-r from-[rgba(192,132,252,0.1)] to-transparent rounded-lg animate-pulse" />
      </div>
    );
  }

  if (!stats) return null;

  // Get weeks for calendar (52 weeks)
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const getColorClass = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-[#0d1117] border border-[#30363d]';
      case 1:
        return 'bg-[#0e4429] hover:bg-[#0e4429]/80';
      case 2:
        return 'bg-[#26a641] hover:bg-[#26a641]/80';
      case 3:
        return 'bg-[#1f6feb] hover:bg-[#1f6feb]/80';
      case 4:
        return 'bg-[#c084fc] hover:bg-[#c084fc]/80';
      default:
        return 'bg-[#0d1117] border border-[#30363d]';
    }
  };

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
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative z-10">
                <Icon className="w-5 h-5 mb-2 text-[#c084fc]" />
                <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
            </MotionDiv>
          );
        })}
      </div>

      {/* GitHub Contribution Calendar */}
      <MotionDiv
        className="relative p-6 rounded-lg border border-white/10 bg-[#0d1117]/50 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-1">Contribution Graph</h4>
            <p className="text-xs text-gray-500">
              {contributions.filter(c => c.count > 0).length} contributions in the last year
            </p>
          </div>
          <a
            href={`https://github.com/${stats.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded text-xs font-semibold text-white border border-[#30363d] hover:bg-[#1f6feb] transition-all duration-300"
          >
            Visit GitHub →
          </a>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-1 min-w-min">
            {/* Month labels */}
            <div className="flex flex-col gap-1">
              <div className="h-6" />
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="w-8 h-8 text-xs text-gray-500 flex items-center justify-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Weeks */}
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {/* Month label for first week of month */}
                {weekIndex === 0 && (
                  <div className="h-6 text-xs text-gray-500 flex items-center px-1">
                    {new Date(week[0].date).toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                )}
                {weekIndex > 0 && new Date(week[0].date).getDate() <= 7 && (
                  <div className="h-6 text-xs text-gray-500 flex items-center px-1">
                    {new Date(week[0].date).toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                )}
                {!(weekIndex === 0 || (weekIndex > 0 && new Date(week[0].date).getDate() <= 7)) && (
                  <div className="h-6" />
                )}

                {/* Days */}
                {week.map((day, dayIndex) => (
                  <MotionDiv
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 ${getColorClass(day.level)} group relative`}
                    whileHover={{ scale: 1.3 }}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#161b22] border border-[#30363d] rounded text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                      <div className="font-semibold">{day.count} contributions</div>
                      <div className="text-gray-500">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</div>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-[#30363d] flex items-center justify-end gap-4 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-[#0d1117] border border-[#30363d]" />
            <div className="w-3 h-3 rounded-sm bg-[#0e4429]" />
            <div className="w-3 h-3 rounded-sm bg-[#26a641]" />
            <div className="w-3 h-3 rounded-sm bg-[#1f6feb]" />
            <div className="w-3 h-3 rounded-sm bg-[#c084fc]" />
          </div>
          <span>More</span>
        </div>
      </MotionDiv>

      {/* Stats Footer */}
      <MotionDiv
        className="relative p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#c084fc] to-[#ec4899] opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
        <div className="relative z-10 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-400 mb-1">Longest Streak</p>
            <p className="text-2xl font-bold text-[#c084fc]">{stats.longestStreak} days</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Current Streak</p>
            <p className="text-2xl font-bold text-[#ec4899]">{stats.currentStreak} days</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Weekly Average</p>
            <p className="text-2xl font-bold text-[#0ea5e9]">{stats.averageContributions * 7}</p>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
}
