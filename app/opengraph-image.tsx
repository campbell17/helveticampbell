import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to bottom right, #FFFFFF, #F0F0F0)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px',
          textAlign: 'center',
          color: '#333333',
        }}
      >
        <div style={{ marginBottom: '30px' }}>
          <div style={{ 
            fontFamily: 'Helvetica', 
            fontSize: '72px', 
            fontWeight: 'bold',
            marginBottom: '10px',
          }}>
            Helveticampbell
          </div>
          <div style={{ 
            fontSize: '32px', 
            color: '#666666',
            maxWidth: '700px'
          }}>
            Versatile, product-focused design. Building, shipping, and evolving digital experiences.
          </div>
        </div>
        <div style={{ 
          fontSize: '24px', 
          marginTop: '20px',
          color: '#888888' 
        }}>
          Tim Campbell's Portfolio
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
} 