import { ImageResponse } from 'next/og'
import { sitemap } from '../config/siteData'

// Route segment config
export const runtime = 'edge'
export const alt = 'Articles & Essays | Helveticampbell'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default function Image() {
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
            Articles & Essays
          </div>
          <div style={{ 
            fontSize: '32px', 
            color: '#666666',
            maxWidth: '700px'
          }}>
            {sitemap.writing.description}
          </div>
        </div>
        <div style={{ 
          fontSize: '24px', 
          marginTop: '20px',
          color: '#888888' 
        }}>
          Helveticampbell
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
} 