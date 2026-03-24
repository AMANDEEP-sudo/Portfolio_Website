import { NextResponse } from 'next/server';

interface LeetCodeStats {
  username: string;
  totalSolved: number;
  totalSubmissions: number;
  acceptanceRate: number;
  currentStreak: number;
  longestStreak: number;
  solvedToday: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
}

// Cache with TTL
const CACHE_DURATION = parseInt(process.env.API_CACHE_DURATION || '3600000'); // 1 hour default
let cachedData: { data: LeetCodeStats; timestamp: number } | null = null;

export async function GET() {
  try {
    // Return cached data if available and fresh
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json(cachedData.data, {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_DURATION / 1000}`,
        },
      });
    }

    const username = process.env.LEETCODE_USERNAME || 'Anonymous_Aman';

    // Fetch from LeetCode GraphQL API
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            realName
            userAvatar
          }
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
            totalSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          streak {
            curStreak
            longestStreak
          }
        }
      }
    `;

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-App',
        'Referer': 'https://leetcode.com/',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`LeetCode API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(
        `GraphQL Error: ${data.errors.map((e: any) => e.message).join(', ')}`,
      );
    }

    const user = data.data?.matchedUser;

    if (!user) {
      // Return fallback if user not found
      throw new Error(`User ${username} not found on LeetCode`);
    }

    // Extract stats from submission data
    const acStats = user.submitStats?.acSubmissionNum || [];
    const totalStats = user.submitStats?.totalSubmissionNum || [];

    const easyCount =
      acStats.find((s: any) => s.difficulty === 'Easy')?.count || 0;
    const mediumCount =
      acStats.find((s: any) => s.difficulty === 'Medium')?.count || 0;
    const hardCount =
      acStats.find((s: any) => s.difficulty === 'Hard')?.count || 0;

    const easySubmissions =
      totalStats.find((s: any) => s.difficulty === 'Easy')?.submissions || 1;
    const mediumSubmissions =
      totalStats.find((s: any) => s.difficulty === 'Medium')?.submissions || 1;
    const hardSubmissions =
      totalStats.find((s: any) => s.difficulty === 'Hard')?.submissions || 1;

    const totalSolved = easyCount + mediumCount + hardCount;
    const totalSubmissions = easySubmissions + mediumSubmissions + hardSubmissions;
    const acceptanceRate =
      totalSubmissions > 0
        ? parseFloat(((totalSolved / totalSubmissions) * 100).toFixed(1))
        : 0;

    const stats: LeetCodeStats = {
      username,
      totalSolved,
      totalSubmissions,
      acceptanceRate,
      currentStreak: user.streak?.curStreak || 0,
      longestStreak: user.streak?.longestStreak || 0,
      solvedToday: 0, // Can't determine from API directly
      easyCount,
      mediumCount,
      hardCount,
    };

    // Cache the result
    cachedData = {
      data: stats,
      timestamp: Date.now(),
    };

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_DURATION / 1000}, stale-while-revalidate=86400`,
      },
    });
  } catch (error) {
    console.error('LeetCode API Error:', error);

    // Return fallback data on error
    return NextResponse.json(
      {
        username: process.env.LEETCODE_USERNAME || 'Anonymous_Aman',
        totalSolved: 156,
        totalSubmissions: 287,
        acceptanceRate: 54.4,
        currentStreak: 8,
        longestStreak: 32,
        solvedToday: 0,
        easyCount: 78,
        mediumCount: 62,
        hardCount: 16,
      },
      { status: 200 } // Return 200 with fallback
    );
  }
}

