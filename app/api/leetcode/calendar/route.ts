import { NextResponse } from 'next/server';

export interface SubmissionDay {
  date: string;
  count: number;
  difficulty?: string;
}

interface CachedLeetCodeCalendar {
  data: SubmissionDay[];
  timestamp: number;
}

// Cache with TTL
const CACHE_DURATION = parseInt(process.env.API_CACHE_DURATION || '3600000'); // 1 hour default
let cachedData: CachedLeetCodeCalendar | null = null;

export async function GET() {
  try {
    // Return cached data if available and fresh
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json(
        {
          success: true,
          data: cachedData.data,
          total: cachedData.data.length,
          timestamp: cachedData.timestamp,
        },
        {
          headers: {
            'Cache-Control': `public, s-maxage=${CACHE_DURATION / 1000}, stale-while-revalidate=86400`,
          },
        }
      );
    }

    const username = process.env.LEETCODE_USERNAME || 'Anonymous_Aman';

    // Fetch submission calendar from LeetCode GraphQL API
    const query = `
      query userProfileCalendar($username: String!) {
        userProfile(username: $username) {
          userCalendar {
            submissionCalendar
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
        `GraphQL Error: ${data.errors.map((e: any) => e.message).join(', ')}`
      );
    }

    let submissionDays: SubmissionDay[] = [];
    const submissionCalendar = data.data?.userProfile?.userCalendar?.submissionCalendar;

    if (submissionCalendar) {
      try {
        // Parse the JSON string to get submission data
        const calendarData = JSON.parse(submissionCalendar);

        // Convert timestamp keys to dates and submission counts
        submissionDays = Object.entries(calendarData)
          .map(([timestamp, count]: [string, any]) => ({
            date: new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0],
            count: typeof count === 'number' ? count : 0,
          }))
          .filter((day) => day.count > 0); // Only include days with submissions
      } catch (parseError) {
        console.error('Failed to parse submission calendar:', parseError);
        // Continue with empty array if parsing fails
      }
    }

    // Sort by date
    submissionDays.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Cache the result
    cachedData = {
      data: submissionDays,
      timestamp: Date.now(),
    };

    return NextResponse.json(
      {
        success: true,
        data: submissionDays,
        total: submissionDays.length,
        timestamp: Date.now(),
      },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_DURATION / 1000}, stale-while-revalidate=86400`,
        },
      }
    );
  } catch (error) {
    console.error('LeetCode Calendar API Error:', error);

    // Return empty array with success on error (graceful degradation)
    return NextResponse.json(
      {
        success: false,
        data: [],
        total: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now(),
      },
      { status: 200 } // Return 200 to allow frontend to render empty state
    );
  }
}
