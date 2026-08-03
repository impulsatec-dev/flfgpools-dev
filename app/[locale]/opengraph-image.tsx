import { ImageResponse } from 'next/og';
import { BUSINESS_INFO, SOCIAL_LINKS } from '@/config/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'nodejs';

export default async function Image({ params }: { params: { locale: string } }) {
  const titles: Record<string, string> = {
    en: BUSINESS_INFO.name,
    es: 'Piscinas de Fibra de Vidrio Florida',
    pt: 'Piscinas de Fibra de Vidrio Flórida',
  };

  const subtitles: Record<string, string> = {
    en: `1000+ pools delivered · 15-year warranty · ${SOCIAL_LINKS.phoneDisplay}`,
    es: `Más de 1000 piscinas · Garantía de 15 años · ${SOCIAL_LINKS.phoneDisplay}`,
    pt: `Mais de 1000 piscinas · Garantia de 15 anos · ${SOCIAL_LINKS.phoneDisplay}`,
  };

  const taglines: Record<string, string> = {
    en: 'Miami-Dade · Broward · Palm Beach · Monroe',
    es: 'Miami-Dade · Broward · Palm Beach · Monroe',
    pt: 'Miami-Dade · Broward · Palm Beach · Monroe',
  };

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          height: '100%',
          padding: 80,
          background: 'linear-gradient(135deg, #082F49 0%, #0EA5E9 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: 16, borderRadius: 8 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="64" height="64" style={{ borderRadius: 16, background: 'rgba(255,255,255,0.15)' }}>
            <path d="M56.93 48.5C56.42 54.56 46.2 56.11 41.95 53.87C34.5 49.93 27.57 41.3 21.04 35.79C18.34 33.52 15.79 30.22 12.28 29.19C8.47 28.07 5.78 29.58 2.5 31.12C-0.84 25.35 10.65 18.45 16.08 20.43C29.24 25.24 37.05 39.18 48.49 46.69C51.68 48.78 54.19 47.48 56.93 48.5Z" fill="#021522" fill-rule="evenodd" stroke="#021522" stroke-width="0.25" stroke-linejoin="round" />
            <path d="M66.17 38.95C66.18 43.86 57.86 46.01 54.21 44.9C50.11 43.65 46.59 39.09 43.52 36.31C39.93 33.07 36.12 28.52 31.76 26.4C30.61 25.84 29.35 26.12 28.24 25.5C28.79 21.61 35.47 19.26 38.8 20.36C47.03 23.06 52.22 31.88 59.06 36.78C61.48 38.51 64.58 37.83 66.17 38.95Z" fill="#064058" fill-rule="evenodd" stroke="#064058" stroke-width="0.25" stroke-linejoin="round" />
            <path d="M51.22 22.83C56.72 15.21 73.53 24.05 68.81 32.96C65.64 38.96 56.91 29.02 54.34 26.5C53.16 25.35 51.53 24.48 51.22 22.83Z" fill="#06b2c4" fill-rule="evenodd" stroke="#06b2c4" stroke-width="0.25" stroke-linejoin="round" />
          </svg>
          {/* <div style={{ display: 'flex', flexDirection: 'column', color: '#082F49', fontWeight: 700, lineHeight: 1 }}>
            <div style={{ fontSize: 8, letterSpacing: 3 }}>FLORIDA</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>FIBERGLASS</div>
            <div style={{ alignSelf: 'flex-end', fontSize: 7, letterSpacing: 3, marginTop: 3 }}>POOLS</div>
          </div>  */}
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
          {titles[params.locale] || titles.en}
        </div>
        <div style={{ fontSize: 32, opacity: 0.9, marginTop: 24 }}>
          {subtitles[params.locale] || subtitles.en}
        </div>
        <div style={{ fontSize: 24, opacity: 0.7, marginTop: 16 }}>
          {taglines[params.locale] || taglines.en}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            padding: '12px 32px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 100,
            fontSize: 24,
          }}
        >
          Hablamos Español · Falamos Português
        </div>
      </div>
    ),
    { ...size },
  );
}
