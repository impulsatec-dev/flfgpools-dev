import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionReveal, RevealItem, StatCounter } from '@/lib/motion/scroll-components';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { STATS } from '@/config/stats';
import { Shield, Eye, Heart, Headphones } from 'lucide-react';
import { Certifications } from '@/components/certifications';
import { SITE_URL, BUSINESS_INFO } from '@/config/site';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Meta.about' });
  const title = t('title');
  const description = t('description');
  const ogImage = `/${params.locale}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/about`,
      languages: {
        'en-US': '/en/about',
        'es-US': '/es/about',
        'pt-BR': '/pt/about',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/about`,
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

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('About');

  return (
    <>
      {/* Hero */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Breadcrumbs items={[{ name: t('hero.title'), href: '/about' }]} />
        </div>
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-pool-deep text-balance">
            {t('hero.title')}
          </h1>
          <p className="mt-4 text-xl text-pool-deep/70">{t('hero.subtitle')}</p>
        </div>
      </section>

      {/* Story */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">{t('story.title')}</h2>
              <p className="text-pool-deep/70 mb-4">{t('story.paragraph1')}</p>
              <p className="text-pool-deep/70 mb-4">{t('story.paragraph2')}</p>
              <p className="text-pool-deep/70">{t('story.paragraph3')}</p>
            </div>
            <div className="glass-card overflow-hidden">
              <Image
                src="/about/bg-pool-kid.png"
                alt="FLFG Pools team"
                width={1800}
                height={1200}
                style={{ width: '100%', height: 'auto' }}
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Stats */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCounter to={STATS.soldPools} label={t('stats.soldPools')} />
          <StatCounter to={STATS.stylesInStock} label={t('stats.stylesInStock')} />
          <StatCounter to={STATS.yearsExperience} label={t('stats.yearsExperience')} suffix="" />
          <StatCounter to={0} label={t('stats.warranty')} suffix="" textValue={t('stats.warrantyText')} />
        </div>
      </section>

      {/* Values */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            {t('values.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Shield, key: 'quality' as const },
              { icon: Eye, key: 'transparency' as const },
              { icon: Heart, key: 'community' as const },
              { icon: Headphones, key: 'support' as const },
            ].map((item, i) => (
              <RevealItem key={item.key} custom={i}>
                <div className="glass-card p-6 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pool-aqua/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-6 w-6 text-pool-aqua" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold">
                      {t(`values.items.${item.key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm text-pool-deep/70">
                      {t(`values.items.${item.key}.description`)}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* Certifications & Partners */}
      <Certifications variant="about" />

      {/* Showroom CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="glass-panel p-8 md:p-12 text-center">
          <h2 className="text-3xl font-display font-bold">{t('showroom.title')}</h2>
          <p className="mt-3 text-pool-deep/70">{t('showroom.description')}</p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-pool-deep/10 shadow-lg">
            <iframe
              src="https://www.google.com/maps?q=21500+S+Dixie+Hwy+Miami+FL+33189&output=embed"
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="FLFG Pools Showroom Location"
            />
          </div>

          <a
            href="https://maps.google.com/?q=21500+S+Dixie+Hwy+Miami+FL+33189"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn-primary hero-cta-primary mt-6 inline-flex glass-btn-primary px-5 py-2 text-white"
          >
            {t('showroom.cta')}
          </a>
        </div>
      </section>
    </>
  );
}