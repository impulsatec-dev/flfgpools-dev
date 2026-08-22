import { Breadcrumbs } from '@/components/breadcrumbs';
import { SectionReveal, RevealItem } from '@/lib/motion/scroll-components';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { SITE_URL, BUSINESS_INFO } from '@/config/site';
import Image from 'next/image';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Meta.poolBenefits' });
  const title = t('title');
  const description = t('description');
  const ogImage = `/${params.locale}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/info/pool-benefits`,
      languages: {
        'en-US': '/en/info/pool-benefits',
        'es-US': '/es/info/pool-benefits',
        'pt-BR': '/pt/info/pool-benefits',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/info/pool-benefits`,
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

export default function PoolBenefitsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('PoolBenefits');
  const benefits = t.raw('benefits') as Array<{
    label: string;
    title: string;
    description: string;
    subHeading?: string;
    subDescription?: string;
    points: Array<{ title: string; description: string }>;
    takeaway: string;
    ctaText?: string;
    ctaHref?: string;
  }>;
  const introItems = t.raw('intro.items') as Array<{ title: string; description: string }>;
  const comparisonRows = t.raw('comparison.rows') as Array<{
    feature: string;
    fiberglass: string;
    concrete: string;
    vinyl: string;
  }>;

  return (
    <>
      {/* === HERO === */}
      <section className="container mx-auto px-4 py-10 sm:py-14">
        <div className="mb-6">
          <Breadcrumbs items={[{ name: t('hero.title'), href: '/info/pool-benefits' }]} />
        </div>
        <div className="glass-card relative overflow-hidden p-6 sm:p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-pool-aqua/10 via-white/20 to-transparent" />
          <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:gap-32">
            <div className="flex-1 max-w-2xl lg:pr-12">
              <h1 className="max-w-3xl text-4xl md:text-6xl font-display font-bold leading-[0.98] tracking-[-0.03em] text-pool-deep">
                {t('hero.title')}
              </h1>
              <p className="mt-5 max-w-2xl text-2xl sm:text-3xl font-bold font-display leading-tight text-pool-aqua">
                {t('hero.subtitle')}
              </p>
              <div className="mt-6 grid max-w-4xl gap-4 text-base sm:text-lg leading-relaxed text-pool-deep/70 md:grid-cols-2">
                <p>{t('hero.paragraph1')}</p>
                <p>{t('hero.paragraph2')}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="glass-btn-primary hero-cta-primary inline-flex items-center gap-2 px-6 py-3 text-white font-semibold whitespace-nowrap"
                >
                  {t('hero.ctaPrimary')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="glass-btn inline-flex items-center gap-2 px-6 py-3 text-pool-deep font-semibold whitespace-nowrap"
                >
                  {t('hero.ctaSecondary')}
                </Link>
              </div>
            </div>
            <div className="relative w-64 shrink-0 overflow-hidden aspect-[4/3] sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] lg:aspect-auto lg:-mr-12 lg:self-stretch rounded-3xl">
              <Image
                src="/iso-models/Pools/Brasilia/Showroom/Brasilia-Charlotte-NC.avif"
                alt={t('hero.title')}
                fill
                sizes="(max-width: 1024px) 100vw, 32rem"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* === INTRO SUMMARY === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-10 sm:py-14">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {introItems.map((item, i) => (
              <RevealItem key={i} custom={i}>
                <div className="glass-card group relative h-full overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pool-aqua/70 to-pool-blue/20" />
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="font-display text-4xl font-bold leading-none text-pool-aqua/85">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="h-10 w-10 rounded-full bg-pool-aqua/30 ring-1 ring-pool-aqua/70 transition-colors duration-300 group-hover:bg-pool-aqua/45" />
                  </div>
                  <h3 className="text-xl font-display font-bold leading-tight text-pool-deep">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-pool-deep/70">
                    {item.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </div>
          <div className="mt-6 glass-card p-5 sm:p-6 bg-pool-aqua/5 border border-pool-aqua/15">
            <p className="max-w-8xl text-pool-deep/80 text-base text-sl leading-relaxed">
              <span className="font-semibold text-pool-aqua">{t('intro.takeawayLabel')} </span>
              {t('intro.takeaway')}
            </p>
          </div>
        </section>
      </SectionReveal>

      {/* === BENEFITS SECTIONS === */}
      {benefits.map((benefit, idx) => (
        <SectionReveal key={idx}>
          <section className="container mx-auto px-4 py-12 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 items-start">
              {/* Left: Title + description */}
              <div className="lg:sticky lg:top-28">
                <RevealItem>
                  <span className="glass-chip-title">{benefit.label}</span>
                </RevealItem>
                <RevealItem custom={1}>
                  <h2 className="mt-2 max-w-xl text-3xl sm:text-3xl font-display font-bold leading-tight tracking-[-0.02em] text-pool-deep">
                    {benefit.title}
                  </h2>
                </RevealItem>
                <RevealItem custom={2}>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pool-deep/70">
                    {benefit.description}
                  </p>
                </RevealItem>
                {benefit.subHeading && (
                  <RevealItem custom={3}>
                    <h3 className="mt-7 text-xl font-display font-bold leading-tight text-pool-aqua">
                      {benefit.subHeading}
                    </h3>
                  </RevealItem>
                )}
                {benefit.subDescription && (
                  <RevealItem custom={4}>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-pool-deep/70">
                      {benefit.subDescription}
                    </p>
                  </RevealItem>
                )}
                {/* Takeaway */}
                <RevealItem custom={5}>
                  <div className="mt-7 glass-card border border-pool-aqua/15 bg-pool-aqua/5 p-5 sm:p-6">
                    <p className="text-base leading-relaxed text-pool-deep/80">
                      <span className="font-semibold text-pool-aqua">
                        {t('takeawayLabel')}{' '}
                      </span>
                      {benefit.takeaway}
                    </p>
                  </div>
                </RevealItem>
                {/* CTA if present */}
                {benefit.ctaText && benefit.ctaHref && (
                  <RevealItem custom={6}>
                    <Link
                      href={benefit.ctaHref}
                      className="mt-6 glass-btn-primary hero-cta-primary inline-flex items-center gap-2 px-5 py-2.5 text-white font-semibold whitespace-nowrap"
                    >
                      {benefit.ctaText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </RevealItem>
                )}
              </div>

              {/* Right: 4 numbered points */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                {benefit.points.map((point, pi) => (
                  <RevealItem key={pi} custom={pi}>
                    <div className="glass-card group relative h-full overflow-hidden p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-1">
                      <div className="absolute right-4 top-3 font-display text-5xl font-bold leading-none text-pool-aqua/[0.38]">
                        {String(pi + 1).padStart(2, '0')}
                      </div>
                      <div className="relative flex h-full flex-col">
                        <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-pool-aqua/10 font-display text-sm font-bold text-pool-aqua ring-1 ring-pool-aqua/20">
                          {String(pi + 1).padStart(2, '0')}
                        </span>
                        <h4 className="font-display text-lg font-bold leading-tight text-pool-deep">
                          {point.title}
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-pool-deep/70">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>
      ))}

      {/* === COMPARISON TABLE === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <RevealItem>
              <span className="glass-chip-title">{t('comparison.label')}</span>
            </RevealItem>
            <RevealItem custom={1}>
              <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold leading-tight tracking-[-0.02em] text-pool-deep">
                {t('comparison.title')}
              </h2>
            </RevealItem>
            <RevealItem custom={2}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pool-deep/70">
                {t('comparison.subtitle')}
              </p>
            </RevealItem>
          </div>

          <RevealItem custom={3}>
            <div className="glass-card overflow-hidden border border-pool-aqua/10">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">
                  <thead>
                    <tr className="bg-pool-aqua/10">
                      <th className="text-left p-5 font-display text-base font-bold text-pool-deep">
                        {t('comparison.headers.feature')}
                      </th>
                      <th className="text-left p-5 font-display text-base font-bold text-pool-aqua">
                        {t('comparison.headers.fiberglass')}
                      </th>
                      <th className="text-left p-5 font-display text-base font-bold text-pool-deep/85">
                        {t('comparison.headers.concrete')}
                      </th>
                      <th className="text-left p-5 font-display text-base font-bold text-pool-deep/85">
                        {t('comparison.headers.vinyl')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pool-deep/10">
                    {comparisonRows.map((row) => (
                      <tr key={row.feature} className="transition-colors duration-200 hover:bg-pool-aqua/5">
                        <td className="p-5 font-semibold text-pool-deep">{row.feature}</td>
                        <td className="p-5 text-pool-deep/80">
                          <div className="flex items-start gap-2.5">
                            <CheckCircle className="h-4 w-4 text-pool-aqua shrink-0 mt-0.5" />
                            <span>{row.fiberglass}</span>
                          </div>
                        </td>
                        <td className="p-5 text-pool-deep/60">{row.concrete}</td>
                        <td className="p-5 text-pool-deep/60">{row.vinyl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </RevealItem>

          <RevealItem custom={4}>
            <p className="mt-4 max-w-3xl text-xs leading-relaxed text-pool-deep/50 italic">
              {t('comparison.note')}
            </p>
          </RevealItem>

          <RevealItem custom={5}>
            <div className="mx-auto mt-7 max-w-2xl text-center">
              <p className="mb-5 text-base leading-relaxed text-pool-deep/70">{t('comparison.deepDiveText')}</p>
              <Link
                href="/info/fiberglass-concrete"
                className="glass-btn-primary hero-cta-primary inline-flex items-center gap-2 px-6 py-3 text-white font-semibold whitespace-nowrap"
              >
                {t('comparison.ctaText')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </RevealItem>
        </section>
      </SectionReveal>

      {/* === FINAL CTA === */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="glass-card p-6 sm:p-8 md:p-14 text-center relative overflow-hidden border border-pool-aqua/15">
          <div className="absolute inset-0 bg-gradient-to-br from-pool-aqua/12 via-white/10 to-transparent" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight tracking-[-0.02em] text-pool-deep">
              {t('finalCta.title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-pool-deep/70 max-w-2xl mx-auto">
              {t('finalCta.subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="glass-btn-primary hero-cta-primary inline-flex items-center gap-2 px-6 py-3 text-white font-semibold whitespace-nowrap"
              >
                {t('finalCta.ctaPrimary')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="glass-btn inline-flex items-center gap-2 px-6 py-3 text-pool-deep font-semibold whitespace-nowrap"
              >
                {t('finalCta.ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
