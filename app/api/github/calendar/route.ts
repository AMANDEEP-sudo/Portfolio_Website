import { NextResponse } from 'next/server';

interface ContributionDay {
  date: string;
  count: number;
  color: string;
  intensity: number;
}

// Cache with TTL
const CACHE_DURATION = parseInt(process.env.API_CACHE_DURATION || '3600000'); // 1 hour default
let cachedData: { data: ContributionDay[]; timestamp: number } | null = null;

export async function GET() {
  try {
    // Return cached data if available and fresh
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        data: cachedData.data,
        cached: true,
        timestamp: new Date().toISOString(),
      });
    }

    const username = process.env.GITHUB_USERNAME || 'AMANDEEP-sudo';
    const token =
      process.env.GITHUB_TOKEN || process.env.GITHUB_PAT || process.env.GH_TOKEN || null;

    if (!token) {
      console.error('GitHub token missing. Check GITHUB_TOKEN/GITHUB_PAT/GH_TOKEN in environment.');
      return NextResponse.json(
        { success: false, error: 'GITHUB token missing on server. Set GITHUB_TOKEN.' },
        { status: 401 }
      );
    }

    // GraphQL query for contribution calendar
    const graphqlQuery = `
      query ($userName: String!) {
        user(login: $userName) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-App',
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { userName: username },
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const text = await response.text().catch(() => response.statusText);
      console.error('GitHub GraphQL API error', response.status, text);
      return NextResponse.json(
        { success: false, error: `GitHub GraphQL API error: ${response.status}` },
        { status: response.status }
      );
    }

    const result = await response.json();

    if (result.errors) {
      console.error('GitHub GraphQL returned errors:', result.errors);
      return NextResponse.json(
        { success: false, error: `GraphQL errors: ${result.errors.map((e: any) => e.message).join(', ')}` },
        { status: 502 }
      );
    }

    const calendarData =
      result.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendarData) {
      throw new Error('No contribution calendar data found');
    }

    // Flatten weeks into days
    const allDays: ContributionDay[] = [];
    calendarData.weeks.forEach((week: any) => {
      week.contributionDays.forEach((day: any) => {
        allDays.push({
          date: day.date,
          count: day.contributionCount,
          color: day.color,
          intensity: day.contributionCount > 0 ? Math.min(4, Math.ceil(day.contributionCount / 5)) : 0,
        });
      });
    });

    // Cache the result
    cachedData = {
      data: allDays,
      timestamp: Date.now(),
    };

    return NextResponse.json(
      {
        success: true,
        data: allDays,
        total: allDays.length,
        contributions: calendarData.totalContributions,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_DURATION / 1000}, stale-while-revalidate=86400`,
        },
      }
    );
  } catch (error) {
    console.error('GitHub Calendar API Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: [],
      },
      { status: 500 }
    );
  }
}
