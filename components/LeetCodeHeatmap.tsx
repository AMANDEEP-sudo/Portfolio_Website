'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues
const CalendarHeatmap = dynamic(
  () => import('react-calendar-heatmap'),
  { ssr: false }
);

interface SubmissionDay {
  date: string;
  count: number;
}

interface LeetCodeStats {
  username: string;
  totalSolved: number;
  totalSubmissions: number;
  acceptanceRate: number;
  currentStreak: number;
  longestStreak: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
}

export default function LeetCodeHeatmap() {
  const [submissions, setSubmissions] = useState<SubmissionDay[]>([]);
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        // Fetch calendar data from backend
        const calendarRes = await fetch('/api/leetcode/calendar');
        if (!calendarRes.ok) throw new Error('Failed to fetch LeetCode calendar');

        const calendarData = await calendarRes.json();

        if (Array.isArray(calendarData.data)) {
          setSubmissions(calendarData.data);
        }

        // Fetch stats from backend
        const statsRes = await fetch('/api/leetcode/stats');
        if (!statsRes.ok) throw new Error('Failed to fetch LeetCode stats');

        const statsData = await statsRes.json();
        setStats(statsData);

        setError(null);
      } catch (err) {
        console.error('Error fetching LeetCode data:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to load LeetCode data'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeData();
  }, []);

  const getColorIntensity = (count: number): string => {
    if (count === 0) return '#e5e7eb'; // gray-200
    if (count === 1) return '#fef08a'; // yellow-100
    if (count <= 3) return '#fed7aa'; // orange-100
    if (count <= 5) return '#fb923c'; // orange-400
    if (count <= 10) return '#ea580c'; // orange-600
    return '#9a3412'; // orange-900
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-400 text-sm">
        <p className="font-semibold">Error loading LeetCode calendar</p>
        <p className="text-xs opacity-75">{error}</p>
      </div>
    );
  }

  // Calculate date range (last year)
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  // Create a mapping of dates for easier lookup
  const dateMap = new Map(submissions.map((s) => [s.date, s.count]));

  // Generate array of all dates in the range for the heatmap
  const allDates = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    const dateStr = current.toISOString().split('T')[0];
    const count = dateMap.get(dateStr) || 0;
    allDates.push({
      date: dateStr,
      count: count,
      color: getColorIntensity(count),
    });
    current.setDate(current.getDate() + 1);
  }

  return (
    <div className="w-full space-y-4">
      {/* Stats Summary */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/30 rounded-lg p-3 md:p-4">
            <p className="text-xs md:text-sm text-orange-400/70 font-medium">
              Solved
            </p>
            <p className="text-2xl md:text-3xl font-bold text-orange-400 mt-1">
              {stats.totalSolved}
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/30 rounded-lg p-3 md:p-4">
            <p className="text-xs md:text-sm text-yellow-400/70 font-medium">
              Easy
            </p>
            <p className="text-2xl md:text-3xl font-bold text-yellow-400 mt-1">
              {stats.easyCount}
            </p>
          </div>
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/30 rounded-lg p-3 md:p-4">
            <p className="text-xs md:text-sm text-amber-400/70 font-medium">
              Medium
            </p>
            <p className="text-2xl md:text-3xl font-bold text-amber-400 mt-1">
              {stats.mediumCount}
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30 rounded-lg p-3 md:p-4">
            <p className="text-xs md:text-sm text-red-400/70 font-medium">
              Hard
            </p>
            <p className="text-2xl md:text-3xl font-bold text-red-400 mt-1">
              {stats.hardCount}
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
              if (value.count === 1) return 'fill-yellow-200';
              if (value.count <= 3) return 'fill-orange-200';
              if (value.count <= 5) return 'fill-orange-500';
              if (value.count <= 10) return 'fill-orange-600';
              return 'fill-orange-900';
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
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-yellow-200"></div>
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-orange-200"></div>
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-orange-500"></div>
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-orange-600"></div>
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-orange-900"></div>
        </div>
        <span className="text-gray-400">More</span>
      </div>
    </div>
  );
}
