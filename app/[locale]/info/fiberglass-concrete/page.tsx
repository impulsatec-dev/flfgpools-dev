import { Breadcrumbs } from '@/components/breadcrumbs';
import { SectionReveal, RevealItem } from '@/lib/motion/scroll-components';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, CheckCircle, Check, X, TrendingUp } from 'lucide-react';
import { SITE_URL, BUSINESS_INFO } from '@/config/site';
import type { Metadata } from 'next';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Meta.fiberglassVsConcrete' });
  const title = t('title');
  const description = t('description');
  const ogImage = `/${params.locale}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/info/fiberglass-concrete`,
      languages: {
        'en-US': '/en/info/fiberglass-concrete',
        'es-US': '/es/info/fiberglass-concrete',
        'pt-BR': '/pt/info/fiberglass-concrete',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/info/fiberglass-concrete`,
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

type PoolType = {
  label: string;
  title: string;
  description: string;
  characteristics: Array<{ title: string; description: string }>;
  prosHeading: string;
  pros: string[];
  consHeading: string;
  cons: string[];
  bestFitHeading: string;
  bestFit: string[];
  takeaway: string;
};

export default function FiberglassVsConcretePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('FiberglassVsConcrete');

  const comparisonRows = t.raw('comparison.rows') as Array<{
    feature: string;
    fiberglass: string;
    concrete: string;
    vinyl: string;
  }>;
  const poolTypes = ['fiberglass', 'concrete', 'vinyl'] as const;
  const poolTypeData = poolTypes.map((key) => t.raw(`poolTypes.${key}`) as PoolType);
  const costRanges = t.raw('costComparison.ranges') as Array<{ type: string; range: string }>;
  const costConsiderations = t.raw('costComparison.considerations') as Array<{ title: string; description: string }>;
  const maintenanceRows = t.raw('maintenance.rows') as Array<{
    factor: string;
    fiberglass: string;
    concrete: string;
    vinyl: string;
  }>;
  const homeValueCards = t.raw('homeValue.cards') as Array<{ type: string; points: string[] }>;
  const verdictCards = t.raw('finalVerdict.cards') as Array<{ type: string; description: string; points: string[] }>;

  return (
    <>
      {/* === HERO === */}
      <section className="container mx-auto px-4 py-10 sm:py-14">
        <div className="mb-6">
          <Breadcrumbs items={[{ name: t('hero.title'), href: '/info/pool-pricing-guide' }]} />
        </div>
        <div className="glass-card relative overflow-hidden p-6 sm:p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-pool-aqua/10 via-white/20 to-transparent" />
          <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:gap-32">
            <div className="flex-1 max-w-3xl lg:pr-12">
              <h1 className="max-w-3xl text-4xl md:text-6xl font-display font-bold leading-[0.98] tracking-[-0.03em] text-pool-deep">
                {t('hero.title')}
              </h1>
              <p className="mt-5 max-w-2xl text-2xl sm:text-3xl font-bold font-display leading-tight text-pool-aqua">
                {t('hero.subtitle')}
              </p>
              <div className="mt-6 grid max-w-4xl gap-4 text-base sm:text-s leading-relaxed text-pool-deep/70 md:grid-cols-2">
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
                src="/iso-models/Spas/Cumba/Showroom/Cumba-Spa-2.jpg"
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

      {/* === AT-A-GLANCE COMPARISON TABLE === */}
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
        </section>
      </SectionReveal>

      {/* === POOL TYPE DEEP-DIVE SECTIONS === */}
      {poolTypeData.map((poolType, idx) => (
        <SectionReveal key={idx}>
          <section className="container mx-auto px-4 py-12 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 items-start">
              {/* Left: Title + description + pros/cons + best fit */}
              <div className="lg:sticky lg:top-28">
                <RevealItem>
                  <span className="glass-chip-title">{poolType.label}</span>
                </RevealItem>
                <RevealItem custom={1}>
                  <h2 className="mt-2 max-w-xl text-3xl sm:text-3xl font-display font-bold leading-tight tracking-[-0.02em] text-pool-deep">
                    {poolType.title}
                  </h2>
                </RevealItem>
                <RevealItem custom={2}>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pool-deep/70">
                    {poolType.description}
                  </p>
                </RevealItem>

                {/* Pros */}
                <RevealItem custom={3}>
                  <div className="mt-7">
                    <h3 className="text-lg font-display font-bold leading-tight text-pool-aqua">
                      {poolType.prosHeading}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {poolType.pros.map((pro, pi) => (
                        <li key={pi} className="flex items-start gap-2.5 text-sm leading-relaxed text-pool-deep/70">
                          <Check className="h-4 w-4 text-pool-aqua shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealItem>

                {/* Cons */}
                <RevealItem custom={4}>
                  <div className="mt-5">
                    <h3 className="text-lg font-display font-bold leading-tight text-pool-deep/80">
                      {poolType.consHeading}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {poolType.cons.map((con, ci) => (
                        <li key={ci} className="flex items-start gap-2.5 text-sm leading-relaxed text-pool-deep/60">
                          <X className="h-4 w-4 text-pool-deep/40 shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealItem>

                {/* Best fit */}
                <RevealItem custom={5}>
                  <div className="mt-7">
                    <h3 className="text-lg font-display font-bold leading-tight text-pool-deep">
                      {poolType.bestFitHeading}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {poolType.bestFit.map((item, bi) => (
                        <li key={bi} className="flex items-start gap-2.5 text-sm leading-relaxed text-pool-deep/70">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-pool-aqua shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealItem>

                {/* Takeaway */}
                <RevealItem custom={6}>
                  <div className="mt-7 glass-card border border-pool-aqua/15 bg-pool-aqua/5 p-5 sm:p-6">
                    <p className="text-base leading-relaxed text-pool-deep/80">
                      <span className="font-semibold text-pool-aqua">{t('poolTypes.takeawayLabel')}: </span>
                      {poolType.takeaway}
                    </p>
                  </div>
                </RevealItem>
              </div>

              {/* Right: 4 characteristic cards */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                {poolType.characteristics.map((char, ci) => (
                  <RevealItem key={ci} custom={ci}>
                    <div className="glass-card group relative h-full overflow-hidden p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-1">
                      <div className="absolute right-4 top-3 font-display text-5xl font-bold leading-none text-pool-aqua/[0.38]">
                        {String(ci + 1).padStart(2, '0')}
                      </div>
                      <div className="relative flex h-full flex-col">
                        <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-pool-aqua/10 font-display text-sm font-bold text-pool-aqua ring-1 ring-pool-aqua/20">
                          {String(ci + 1).padStart(2, '0')}
                        </span>
                        <h4 className="font-display text-lg font-bold leading-tight text-pool-deep">
                          {char.title}
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-pool-deep/70">
                          {char.description}
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

      {/* === COST COMPARISON === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <RevealItem>
              <span className="glass-chip-title">{t('costComparison.label')}</span>
            </RevealItem>
            <RevealItem custom={1}>
              <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold leading-tight tracking-[-0.02em] text-pool-deep">
                {t('costComparison.title')}
              </h2>
            </RevealItem>
            <RevealItem custom={2}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pool-deep/70">
                {t('costComparison.subtitle')}
              </p>
            </RevealItem>
          </div>

          {/* Cost range cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {costRanges.map((range, i) => (
              <RevealItem key={i} custom={i}>
                <div className={`glass-card relative h-full overflow-hidden p-6 ${i === 0 ? 'border border-pool-aqua/20' : ''}`}>
                  {i === 0 && (
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pool-aqua/70 to-pool-blue/20" />
                  )}
                  <h3 className="font-display text-lg font-bold leading-tight text-pool-deep">
                    {range.type}
                  </h3>
                  <p className={`mt-3 text-2xl font-display font-bold ${i === 0 ? 'text-pool-aqua' : 'text-pool-deep/80'}`}>
                    {range.range}
                  </p>
                </div>
              </RevealItem>
            ))}
          </div>

          <RevealItem custom={3}>
            <p className="mt-4 max-w-3xl text-xs leading-relaxed text-pool-deep/50 italic">
              {t('costComparison.rangesNote')}
            </p>
          </RevealItem>

          {/* Long-term considerations */}
          <RevealItem custom={4}>
            <div className="mt-8">
              <h3 className="text-xl font-display font-bold leading-tight text-pool-deep">
                {t('costComparison.considerationsHeading')}
              </h3>
              <div className="mt-5 grid md:grid-cols-3 gap-5">
                {costConsiderations.map((item, i) => (
                  <div key={i} className="glass-card p-5 sm:p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pool-aqua/10 ring-1 ring-pool-aqua/20">
                        <TrendingUp className="h-4 w-4 text-pool-aqua" />
                      </span>
                      <h4 className="font-display text-base font-bold text-pool-deep">{item.title}</h4>
                    </div>
                    <p className="text-sm leading-relaxed text-pool-deep/70">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealItem>

          {/* Perspective callout */}
          <RevealItem custom={5}>
            <div className="mt-6 glass-card p-5 sm:p-6 bg-pool-aqua/5 border border-pool-aqua/15">
              <p className="max-w-8xl text-pool-deep/80 text-base text-sl leading-relaxed">
                <span className="font-semibold text-pool-aqua">{t('costComparison.perspectiveLabel')}: </span>
                {t('costComparison.perspective')}
              </p>
            </div>
          </RevealItem>
        </section>
      </SectionReveal>

      {/* === MAINTENANCE COMPARISON TABLE === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <RevealItem>
              <span className="glass-chip-title">{t('maintenance.label')}</span>
            </RevealItem>
            <RevealItem custom={1}>
              <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold leading-tight tracking-[-0.02em] text-pool-deep">
                {t('maintenance.title')}
              </h2>
            </RevealItem>
            <RevealItem custom={2}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pool-deep/70">
                {t('maintenance.subtitle')}
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
                        {t('maintenance.headers.factor')}
                      </th>
                      <th className="text-left p-5 font-display text-base font-bold text-pool-aqua">
                        {t('maintenance.headers.fiberglass')}
                      </th>
                      <th className="text-left p-5 font-display text-base font-bold text-pool-deep/85">
                        {t('maintenance.headers.concrete')}
                      </th>
                      <th className="text-left p-5 font-display text-base font-bold text-pool-deep/85">
                        {t('maintenance.headers.vinyl')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pool-deep/10">
                    {maintenanceRows.map((row) => (
                      <tr key={row.factor} className="transition-colors duration-200 hover:bg-pool-aqua/5">
                        <td className="p-5 font-semibold text-pool-deep">{row.factor}</td>
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
            <div className="mt-6 glass-card p-5 sm:p-6 bg-pool-aqua/5 border border-pool-aqua/15">
              <p className="max-w-8xl text-pool-deep/80 text-base text-sl leading-relaxed">
                <span className="font-semibold text-pool-aqua">{t('maintenance.whyItMattersLabel')}: </span>
                {t('maintenance.whyItMatters')}
              </p>
            </div>
          </RevealItem>
        </section>
      </SectionReveal>

      {/* === HOME VALUE & RESALE === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <RevealItem>
              <span className="glass-chip-title">{t('homeValue.label')}</span>
            </RevealItem>
            <RevealItem custom={1}>
              <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold leading-tight tracking-[-0.02em] text-pool-deep">
                {t('homeValue.title')}
              </h2>
            </RevealItem>
            <RevealItem custom={2}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pool-deep/70">
                {t('homeValue.subtitle')}
              </p>
            </RevealItem>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {homeValueCards.map((card, i) => (
              <RevealItem key={i} custom={i}>
                <div className={`glass-card relative h-full overflow-hidden p-6 ${i === 0 ? 'border border-pool-aqua/20' : ''}`}>
                  {i === 0 && (
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pool-aqua/70 to-pool-blue/20" />
                  )}
                  <h3 className={`font-display text-lg font-bold leading-tight ${i === 0 ? 'text-pool-aqua' : 'text-pool-deep'}`}>
                    {card.type}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {card.points.map((point, pi) => (
                      <li key={pi} className="flex items-start gap-2.5 text-sm leading-relaxed text-pool-deep/70">
                        <Check className={`h-4 w-4 shrink-0 mt-0.5 ${i === 0 ? 'text-pool-aqua' : 'text-pool-deep/40'}`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </div>

          <RevealItem custom={3}>
            <div className="mt-6 glass-card p-5 sm:p-6 bg-pool-aqua/5 border border-pool-aqua/15">
              <p className="max-w-8xl text-pool-deep/80 text-base text-sl leading-relaxed">
                <span className="font-semibold text-pool-aqua">{t('homeValue.takeawayLabel')}: </span>
                {t('homeValue.takeaway')}
              </p>
            </div>
          </RevealItem>
        </section>
      </SectionReveal>

      {/* === FINAL VERDICT === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <RevealItem>
              <span className="glass-chip-title">{t('finalVerdict.label')}</span>
            </RevealItem>
            <RevealItem custom={1}>
              <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold leading-tight tracking-[-0.02em] text-pool-deep">
                {t('finalVerdict.title')}
              </h2>
            </RevealItem>
            <RevealItem custom={2}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pool-deep/70">
                {t('finalVerdict.subtitle')}
              </p>
            </RevealItem>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {verdictCards.map((card, i) => (
              <RevealItem key={i} custom={i}>
                <div className={`glass-card relative h-full overflow-hidden p-6 ${i === 0 ? 'border border-pool-aqua/20' : ''}`}>
                  {i === 0 ? (
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pool-aqua/70 to-pool-blue/20" />
                  ) : null}
                  <h3 className={`font-display text-lg font-bold leading-tight ${i === 0 ? 'text-pool-aqua' : 'text-pool-deep'}`}>
                    {card.type}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-pool-deep/70">
                    {card.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {card.points.map((point, pi) => (
                      <li key={pi} className="flex items-start gap-2.5 text-sm leading-relaxed text-pool-deep/70">
                        <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${i === 2 ? 'bg-pool-aqua' : 'bg-pool-deep/30'}`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </div>

          <RevealItem custom={3}>
            <div className="mt-6 glass-card p-5 sm:p-6 bg-pool-aqua/5 border border-pool-aqua/15">
              <p className="max-w-8xl text-pool-deep/80 text-base text-sl leading-relaxed">
                <span className="font-semibold text-pool-aqua">{t('finalVerdict.perspectiveLabel')}: </span>
                {t('finalVerdict.perspective')}
              </p>
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
