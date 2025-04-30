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
    
    console.log(`Fetching Substack posts from: ${apiUrl.toString()} for publication: ${publicationUrl}`);
    
    const response = await fetch(apiUrl, {
      headers: {
        'X-API-Key': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Substack API error (${response.status}): ${errorText}`);
      return NextResponse.json(
        { error: `Substack API error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`Successfully fetched ${data.length} posts from Substack`);
    
    // Return data directly without additional wrapping
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Substack posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Substack posts' },
      { status: 500 }
    );
  }
}

// Add GET endpoint to support both methods
export async function GET(request: Request) {
  const url = new URL(request.url);
  const publicationUrl = url.searchParams.get('publication_url');
  const limit = url.searchParams.get('limit') || '3';
  const offset = url.searchParams.get('offset') || '0';
  
  if (!publicationUrl) {
    return NextResponse.json(
      { error: 'Publication URL is required' },
      { status: 400 }
    );
  }

  const apiKey = process.env.SUBSTACK_API_KEY || 'sk_test_9b0j6a1bdbf4f38b1';

  const apiUrl = new URL('https://api.substackapi.dev/posts/latest');
  apiUrl.searchParams.append('publication_url', publicationUrl);
  apiUrl.searchParams.append('limit', limit);
  apiUrl.searchParams.append('offset', offset);
  
  console.log(`GET: Fetching Substack posts from: ${apiUrl.toString()} for publication: ${publicationUrl}`);
  
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-API-Key': apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Substack API error (${response.status}): ${errorText}`);
      return NextResponse.json(
        { error: `Substack API error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`Successfully fetched ${data.length} posts from Substack`);
    
    // Return data directly without additional wrapping
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Substack posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Substack posts' },
      { status: 500 }
    );
  }
} 