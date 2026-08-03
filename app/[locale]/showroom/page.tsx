import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ShowroomContent } from '@/components/showroom-content';
import { SITE_URL, BUSINESS_INFO } from '@/config/site';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Meta.showroom' });
  const title = t('title');
  const description = t('description');
  const ogImage = `/${params.locale}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/showroom`,
      languages: {
        'en-US': '/en/showroom',
        'es-US': '/es/showroom',
        'pt-BR': '/pt/showroom',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/showroom`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: BUSINESS_INFO.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function ShowroomPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <ShowroomContent locale={locale} />;
}