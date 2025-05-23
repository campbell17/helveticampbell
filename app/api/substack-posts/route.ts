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
      // Add timeout for external API calls
      signal: AbortSignal.timeout(8000), // 8 second timeout
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Substack API error (${response.status}): ${errorText}`);
      
      // Return empty array instead of error for external API failures
      if (response.status === 404 || response.status >= 500) {
        console.warn('Substack API unavailable, returning empty results');
        return NextResponse.json([]);
      }
      
      return NextResponse.json(
        { error: `Substack API error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Enhanced logging to debug response limits
    console.log(`Successfully fetched ${data.length} posts from Substack`);
    console.log(`Requested limit: ${limit}, actual received: ${data.length}`);
    
    if (data.length < parseInt(limit)) {
      console.log('Note: Received fewer posts than requested. This could be due to:');
      console.log('1. API rate limits or maximum post limits');
      console.log('2. Publication doesn\'t have that many posts');
      console.log('3. Test API key restrictions');
    }
    
    // Additional check for possible metadata
    if (data.metadata) {
      console.log('Response metadata:', data.metadata);
    }
    
    // Return data directly without additional wrapping
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Substack posts:', error);
    
    // Return empty array for timeout or network errors instead of 500 error
    if (error instanceof Error && (error.name === 'AbortError' || error.name === 'TimeoutError')) {
      console.warn('Substack API request timed out, returning empty results');
      return NextResponse.json([]);
    }
    
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
      // Add timeout for external API calls
      signal: AbortSignal.timeout(8000), // 8 second timeout
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Substack API error (${response.status}): ${errorText}`);
      
      // Return empty array instead of error for external API failures
      if (response.status === 404 || response.status >= 500) {
        console.warn('Substack API unavailable, returning empty results');
        return NextResponse.json([]);
      }
      
      return NextResponse.json(
        { error: `Substack API error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Enhanced logging to debug response limits
    console.log(`Successfully fetched ${data.length} posts from Substack`);
    console.log(`Requested limit: ${limit}, actual received: ${data.length}`);
    
    if (data.length < parseInt(limit)) {
      console.log('Note: Received fewer posts than requested. This could be due to:');
      console.log('1. API rate limits or maximum post limits');
      console.log('2. Publication doesn\'t have that many posts');
      console.log('3. Test API key restrictions');
    }
    
    // Additional check for possible metadata
    if (data.metadata) {
      console.log('Response metadata:', data.metadata);
    }
    
    // Return data directly without additional wrapping
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Substack posts:', error);
    
    // Return empty array for timeout or network errors instead of 500 error
    if (error instanceof Error && (error.name === 'AbortError' || error.name === 'TimeoutError')) {
      console.warn('Substack API request timed out, returning empty results');
      return NextResponse.json([]);
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch Substack posts' },
      { status: 500 }
    );
  }
} 