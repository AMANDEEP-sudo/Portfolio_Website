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
    const token =
      process.env.GITHUB_TOKEN || process.env.GITHUB_PAT || process.env.GH_TOKEN || null;

    if (!token) {
      console.error('GitHub token missing. Check GITHUB_TOKEN/GITHUB_PAT/GH_TOKEN in environment.');
      return NextResponse.json(
        { error: 'GITHUB token missing on server. Set GITHUB_TOKEN.' },
        { status: 401 }
      );
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
      const msg = await userResponse.text().catch(() => userResponse.statusText);
      console.error('GitHub REST API error', userResponse.status, msg);
      return NextResponse.json(
        { error: `GitHub REST API error: ${userResponse.status} ${userResponse.statusText}` },
        { status: userResponse.status }
      );
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

    let totalContributions = 0;
    
    if (graphqlResponse.ok) {
      const graphqlData = await graphqlResponse.json();
      if (graphqlData.errors) {
        console.error('GitHub GraphQL returned errors:', graphqlData.errors);
      }
      if (
        graphqlData.data?.user?.contributionsCollection?.contributionCalendar
          ?.totalContributions
      ) {
        totalContributions =
          graphqlData.data.user.contributionsCollection.contributionCalendar
            .totalContributions;
      }
    } else {
      const text = await graphqlResponse.text().catch(() => graphqlResponse.statusText);
      console.error('GitHub GraphQL error', graphqlResponse.status, text);
      return NextResponse.json(
        { error: `GitHub GraphQL error: ${graphqlResponse.status}` },
        { status: graphqlResponse.status }
      );
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
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


