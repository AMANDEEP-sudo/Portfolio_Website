'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues
const CalendarHeatmap = dynamic(
  () => import('react-calendar-heatmap'),
  { ssr: false }
);

interface ContributionDay {
  date: string;
  count: number;
  color: string;
  intensity?: number;
}

interface GitHubStats {
  totalContributions: number;
  longestStreak: number;
  currentStreak: number;
}

const FALLBACK_STATS: GitHubStats = {
  totalContributions: 205,
  longestStreak: 45,
  currentStreak: 12,
};

function getFallbackColor(count: number) {
  if (count === 0) return '#161b22';
  if (count < 3) return '#0e4429';
  if (count < 6) return '#006d32';
  if (count < 9) return '#26a641';
  return '#39d353';
}

function generateFallbackContributions(): ContributionDay[] {
  const today = new Date();
  const fallback: ContributionDay[] = [];

  for (let offset = 0; offset < 365; offset += 1) {
    const day = new Date(today);
    day.setDate(day.getDate() - offset);

    const seasonalPulse = Math.sin((2 * Math.PI * offset) / 52);
    const base = 6 + seasonalPulse * 4;
    const weekendBoost = day.getDay() === 6 || day.getDay() === 0 ? 2 : 0;
    const count = Math.max(0, Math.round(base + weekendBoost));

    fallback.push({
      date: day.toISOString().split('T')[0],
      count,
      color: getFallbackColor(count),
    });
  }

  return fallback.reverse();
}

export default function GitHubHeatmap() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchGitHubCalendar = async () => {
      try {
        // Fetch calendar data from backend
        const calendarRes = await fetch('/api/github/calendar');
        if (!calendarRes.ok) throw new Error('Failed to fetch GitHub calendar');

        const calendarData = await calendarRes.json();

        if (calendarData.success && Array.isArray(calendarData.data)) {
          setContributions(calendarData.data);
        }

        // Fetch stats from backend
        const statsRes = await fetch('/api/github/stats');
        if (!statsRes.ok) throw new Error('Failed to fetch GitHub stats');

        const statsData = await statsRes.json();
        setStats(statsData);
        setUsingFallback(false);
        setError(null);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setContributions(generateFallbackContributions());
        setStats(FALLBACK_STATS);
        setUsingFallback(true);
        setError('Live GitHub data is temporarily unavailable. Showing sample activity.');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubCalendar();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  // Calculate date range (last year)
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  // Create a mapping of dates for easier lookup
  const dateMap = new Map(contributions.map((c) => [c.date, c]));

  // Generate array of all dates in the range for the heatmap
  const allDates = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    const dateStr = current.toISOString().split('T')[0];
    allDates.push({
      date: dateStr,
      count: dateMap.get(dateStr)?.count || 0,
      color: dateMap.get(dateStr)?.color || '#ebedf0',
    });
    current.setDate(current.getDate() + 1);
  }

  return (
    <div className="w-full space-y-4">
      {error && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/40 rounded-lg text-amber-200 text-sm">
          <p className="font-semibold">{usingFallback ? 'Showing sample GitHub activity' : 'GitHub data warning'}</p>
          <p className="text-xs opacity-80">{error}</p>
        </div>
      )}

      {/* Stats Summary */}
      {stats && (
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30 rounded-lg p-3 md:p-4">
            <p className="text-xs md:text-sm text-cyan-400/70 font-medium">
              Total Contributions
            </p>
            <p className="text-2xl md:text-3xl font-bold text-cyan-400 mt-1">
              {stats.totalContributions.toLocaleString()}
            </p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 rounded-lg p-3 md:p-4">
            <p className="text-xs md:text-sm text-emerald-400/70 font-medium">
              Longest Streak
            </p>
            <p className="text-2xl md:text-3xl font-bold text-emerald-400 mt-1">
              {stats.longestStreak}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30 rounded-lg p-3 md:p-4">
            <p className="text-xs md:text-sm text-purple-400/70 font-medium">
              Current Streak
            </p>
            <p className="text-2xl md:text-3xl font-bold text-purple-400 mt-1">
              {stats.currentStreak}
            </p>
          </div>
        </div>
      )}

      {/* Heatmap */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 md:p-6 overflow-x-auto">
        <div className="inline-block">
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={allDates}
            classForValue={(value: any) => {
              if (!value || value.count === 0) return 'fill-gray-700';
              if (value.color?.includes('#c6e48b')) return 'fill-green-300';
              if (value.color?.includes('#7ee787')) return 'fill-green-500';
              if (value.color?.includes('#30a14e')) return 'fill-green-600';
              if (value.color?.includes('#216e39')) return 'fill-green-700';
              return 'fill-gray-700';
            }}
            showWeekdayLabels
            gutterSize={2}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs md:text-sm">
        <span className="text-gray-400">Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-gray-700"></div>
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-green-300"></div>
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-green-500"></div>
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-green-600"></div>
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-green-700"></div>
        </div>
        <span className="text-gray-400">More</span>
      </div>
    </div>
  );
}
