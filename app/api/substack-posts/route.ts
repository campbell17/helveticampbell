import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { publicationUrl, limit = 3, offset = 0 } = await request.json();
    
    if (!publicationUrl) {
      return NextResponse.json(
        { error: 'Publication URL is required' },
        { status: 400 }
      );
    }

    // In production, you would get this from environment variables
    // Add your API key here when you have it
    const apiKey = process.env.SUBSTACK_API_KEY || 'sk_test_9b0j6a1bdbf4f38b1'; // Test key for development

    const apiUrl = new URL('https://api.substackapi.dev/posts/latest');
    apiUrl.searchParams.append('publication_url', publicationUrl);
    apiUrl.searchParams.append('limit', limit.toString());
    apiUrl.searchParams.append('offset', offset.toString());
    
    const response = await fetch(apiUrl, {
      headers: {
        'X-API-Key': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Substack API error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Substack posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Substack posts' },
      { status: 500 }
    );
  }
} 