import { ImageResponse } from 'next/og';
import { site } from '@/config/site';

export const runtime = 'edge';

export const alt = `${site.name} — ${site.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          <h1
            style={{
              fontSize: 100,
              color: '#f5f5f0', // ivory
              fontWeight: 400,
              fontFamily: 'serif',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              textAlign: 'center',
              margin: 0,
            }}
          >
            {site.name}
          </h1>
          <p
            style={{
              fontSize: 48,
              color: 'rgba(245, 245, 240, 0.7)', // ivory-dim
              fontWeight: 400,
              fontFamily: 'sans-serif',
              textAlign: 'center',
              margin: 0,
            }}
          >
            {site.tagline}
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
