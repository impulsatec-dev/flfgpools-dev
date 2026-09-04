import { CreateByYourself } from '@/components/create-by-yourself';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { SITE_URL, BUSINESS_INFO } from '@/config/site';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Meta.createByYourself' });
  const title = t('title');
  const description = t('description');
  const ogImage = `/${params.locale}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/create-by-yourself`,
      languages: {
        'en-US': '/en/create-by-yourself',
        'es-US': '/es/create-by-yourself',
        'pt-BR': '/pt/create-by-yourself',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/create-by-yourself`,
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

export default function CreateByYourselfPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('Breadcrumbs');

  return (
    <>
      <section className="container mx-auto px-4 py-10">
        <Breadcrumbs locale={locale} items={[{ name: t('createByYourself'), href: '/create-by-yourself' }]} />
      </section>
      <CreateByYourself />
    </>
  );
}
