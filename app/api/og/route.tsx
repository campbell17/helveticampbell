import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

// Font loading function from Vercel guide
async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url, {
    headers: {
      // Make sure it returns TTF.
      'User-Agent':
        'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
    },
  })).text();
  
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
  
  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }
  
  throw new Error(`Failed to load font data for ${font}`);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Helveticampbell';
    const subtitle = searchParams.get('subtitle') || 'Versatile, product-focused design';
    const imagePath = searchParams.get('image') || '/images/social/og-default.png';
    
    // Debug logs
    console.log('OG Image Request:');
    console.log('- Title:', title);
    console.log('- Subtitle:', subtitle);
    console.log('- Image Path:', imagePath);
    
    // Load the fonts
    const merriweatherFont = await loadGoogleFont('Merriweather:wght@700', title);
    const latoFont = await loadGoogleFont('Lato', 'helveticampbell.com');
    const bitterFont = await loadGoogleFont('Bitter', subtitle);
    
    // Generate absolute URL for the site
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://helveticampbell.com';
    
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            position: 'relative',
          }}
        >
          {/* Grid background pattern */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundSize: '50px 50px',
              backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
              `,
              zIndex: 0,
            }}
          />
          
          {/* Content container (left 2/3) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              width: '67%',
              height: '100%',
              padding: '60px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Logo */}
            <div style={{ 
              display: 'flex', 
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center',
              zIndex: 1,
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.87 51.26" width="80" height="70">
                <path d="M61.73,31.25c.47-4.22-.3-7.16-2.31-8.82-2-1.66-4.86-2.49-8.56-2.5h0s-5.94,0-5.94,0L49.16,0h-9.63l-4.28,19.93h-9.83L29.71,0h-12.32c-2.41,0-4.67.39-6.77,1.19C6.71,2.69,3.79,5.39,1.84,9.29.18,12.61-.36,15.54.23,18.08c.59,2.54,2.88,4.55,6.86,6.01l3.55-7.09c-1.03-.41-1.85-1-2.45-1.77-.79-1.08-.78-2.44.04-4.08,1.17-2.33,3.24-3.59,6.23-3.78,1.16-.07,2.5.04,4.02.34l-9.02,42.31h9.63l5.01-23.55h9.83l-5.01,23.55h8.84c1.66.82,3.75,1.24,6.31,1.24,4.76,0,8.71-1.69,11.86-5.08,1.97-2.1,3.29-4.33,3.96-6.68h-7.9c-.49,1.56-1.22,2.82-2.19,3.8-.97.98-2.36,1.47-4.17,1.47-2.55,0-4.03-1.23-4.43-3.69-.22-1.32-.1-3.07.35-5.24.49-2.28,1.13-4.11,1.93-5.48,1.5-2.59,3.56-3.88,6.16-3.88,1.83,0,3.05.6,3.67,1.79.42.89.58,1.88.49,2.99h7.93Z"/>
              </svg>
            </div>
            
            {/* Main Content Area */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              width: '100%',
              zIndex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',
              flex: 1,
            }}>
              <div style={{
                fontFamily: 'Merriweather',
                display: 'flex',
                fontSize: '72px',
                fontWeight: 'bold',
                color: '#000000',
                lineHeight: '1.1',
                marginBottom: '20px',
                maxWidth: '90%',
              }}>
                {title}
              </div>
              
              <div style={{
                fontFamily: 'Bitter',
                display: 'flex',
                fontSize: '28px',
                color: '#555555',
                maxWidth: '80%',
              }}>
                {subtitle}
              </div>
            </div>
            
            {/* Footer */}
            <div style={{ 
              display: 'flex', 
              width: '100%', 
              justifyContent: 'space-between',
              zIndex: 1,
            }}>
              <div style={{
                fontFamily: 'Lato',
                display: 'flex',
                fontSize: '18px',
                color: '#777777',
              }}>
                helveticampbell.com
              </div>
            </div>
          </div>
          
          {/* Image container (right 1/3) */}
          <div
            style={{
              width: '33%',
              height: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={`${baseUrl}${imagePath}`}
              alt="Featured image"
              width="512"
              height="512"
              style={{
                width: '626px',
                height: '512px',
                objectFit: 'cover',
                borderRadius: '12px',
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'no-cache',
        },
        fonts: [
          {
            name: 'Merriweather',
            data: merriweatherFont,
            style: 'normal',
            weight: 700,
          },
          {
            name: 'Lato',
            data: latoFont,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Bitter',
            data: bitterFont,
            style: 'normal',
            weight: 400,
          },
        ],
      }
    );
  } catch (e) {
    console.error('OG Image Error:', e);
    return new Response('Failed to generate OG image: ' + (e instanceof Error ? e.message : String(e)), {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
} 