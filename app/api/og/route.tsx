import { ImageResponse } from 'next/og';
import { site } from '@/config/site';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1A1A1A',
          color: '#FDFFE9',
          fontFamily: '"Times New Roman", serif',
          padding: 80,
        }}
      >
        <h1
          style={{
            fontSize: 96,
            fontWeight: 500,
            letterSpacing: '-0.03em',
            margin: 0,
            lineHeight: 1,
          }}
        >
          {site.name}
        </h1>
        <p
          style={{
            fontSize: 28,
            color: '#C9CBB6',
            marginTop: 24,
            maxWidth: 600,
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          {site.tagline}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
