import Image from 'next/image';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SectionReveal, RevealItem } from '@/lib/motion/scroll-components';
import { faqSchema } from '@/lib/schema/faq';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { SITE_URL, BUSINESS_INFO } from '@/config/site';
import type { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Meta.resources' });
  const title = t('title');
  const description = t('description');
  const ogImage = `/${params.locale}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/resources`,
      languages: {
        'en-US': '/en/resources',
        'es-US': '/es/resources',
        'pt-BR': '/pt/resources',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/faq`,
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

export default function FaqsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('Resources');
  const faqItems = t.raw('faq.items') as { q: string; a: string }[];
  const schema = faqSchema(faqItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Breadcrumbs items={[{ name: t('hero.title'), href: '/faqs' }]} />
        </div>
          <div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-pool-deep">
              {t('hero.title')}
            </h1>
            <p className="mt-4 text-xl text-pool-deep/70 max-w-2xl">
              {t('hero.subtitle')}
            </p>
          </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[1fr_600px] gap-10 items-start">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-display font-bold mb-8">{t('faq.title')}</h2>
            <div className="space-y-4">
              {faqItems.map((faq, i) => (
                <RevealItem key={i} custom={i}>
                  <details className="glass-card p-6 group">
                    <summary className="flex items-center justify-between cursor-pointer font-semibold text-lg">
                      {faq.q}
                      <ChevronDown className="h-5 w-5 text-pool-aqua transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-4 text-pool-deep/70">{faq.a}</p>
                  </details>
                </RevealItem>
              ))}
            </div>
          </div>
          <div className="glass-card overflow-hidden lg:sticky lg:top-28 relative aspect-[4/3]">
            <Image
              src="/faq/img-faq-p.png"
              alt="Fiberglass pool FAQ"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}