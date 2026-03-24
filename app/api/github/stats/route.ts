import { NextResponse } from 'next/server';

interface GitHubStats {
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

// Cache with TTL
const CACHE_DURATION = parseInt(process.env.API_CACHE_DURATION || '3600000'); // 1 hour default
let cachedData: { data: GitHubStats; timestamp: number } | null = null;

export async function GET() {
  try {
    // Return cached data if available and fresh
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json(cachedData.data);
    }

    const username = process.env.GITHUB_USERNAME || 'AMANDEEP-sudo';
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      throw new Error('GITHUB_TOKEN environment variable is not set');
    }

    // Fetch user data from GitHub API
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
      },
      cache: 'no-store',
    });

    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.statusText}`);
    }

    const userData = await userResponse.json();

    // Fetch contribution stats using GraphQL
    const graphqlQuery = `
      query {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
          followers {
            totalCount
          }
          following {
            totalCount
          }
          repositories {
            totalCount
          }
        }
      }
    `;

    const graphqlResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-App',
      },
      body: JSON.stringify({ query: graphqlQuery }),
      cache: 'no-store',
    });

    let totalContributions = 205; // Fallback
    
    if (graphqlResponse.ok) {
      const graphqlData = await graphqlResponse.json();
      if (
        graphqlData.data?.user?.contributionsCollection?.contributionCalendar
          ?.totalContributions
      ) {
        totalContributions =
          graphqlData.data.user.contributionsCollection.contributionCalendar
            .totalContributions;
      }
    }

    const stats: GitHubStats = {
      username,
      totalContributions,
      currentStreak: 12,
      longestStreak: 45,
      averageContributions: Math.round(totalContributions / 52),
      repositories: userData.public_repos || 15,
      followers: userData.followers || 4,
      following: userData.following || 10,
      joinDate: userData.created_at,
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
    console.error('GitHub API Error:', error);

    // Return fallback data if API fails
    return NextResponse.json(
      {
        username: 'AMANDEEP-sudo',
        totalContributions: 205,
        currentStreak: 12,
        longestStreak: 45,
        averageContributions: 4,
        repositories: 15,
        followers: 4,
        following: 10,
        joinDate: '2024-10-01T00:00:00Z',
      },
      { status: 200 } // Return 200 with fallback data
    );
  }
}


