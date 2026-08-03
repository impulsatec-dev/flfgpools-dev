import { Breadcrumbs } from '@/components/breadcrumbs';
import { SectionReveal, RevealItem } from '@/lib/motion/scroll-components';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, CheckCircle, Check, Lightbulb, Info } from 'lucide-react';
import { SITE_URL, BUSINESS_INFO } from '@/config/site';
import type { Metadata } from 'next';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Meta.poolPricingGuide' });
  const title = t('title');
  const description = t('description');
  const ogImage = `/${params.locale}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/info/pool-pricing-guide`,
      languages: {
        'en-US': '/en/info/pool-pricing-guide',
        'es-US': '/es/info/pool-pricing-guide',
        'pt-BR': '/pt/info/pool-pricing-guide',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/info/pool-pricing-guide`,
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

export default function PoolPricingGuidePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('poolPricingGuide');

  const projectRangeCards = t.raw('projectRanges.cards') as Array<{
    scope: string;
    title: string;
    description: string;
    points: string[];
  }>;
  const keyFactorCards = t.raw('keyFactors.cards') as Array<{
    title: string;
    costIncreaseLabel: string;
    costIncrease: string;
  }>;
  const includedItems = t.raw('included.items') as Array<{ title: string; description: string }>;
  const upgradeCards = t.raw('upgrades.cards') as Array<{
    title: string;
    description: string;
    commonUpgrade: string;
  }>;
  const ownershipCards = t.raw('ownership.cards') as Array<{
    title: string;
    description: string;
    planFor: string;
  }>;
  const longTermCosts = t.raw('ownership.longTermCosts') as string[];
  const accuratePricingCards = t.raw('accuratePricing.cards') as Array<{
    title: string;
    description: string;
    helpfulDetails: string;
  }>;
  const quoteChecklist = t.raw('accuratePricing.quoteChecklist') as string[];
  const usingGuideCards = t.raw('usingGuide.cards') as Array<{ title: string; description: string }>;

  return (
    <>
      {/* === COST HERO === */}
      <section className="container mx-auto px-4 py-10 sm:py-14">
        <div className="mb-6">
          <Breadcrumbs items={[{ name: t('costHero.title'), href: '/info/pool-pricing-guide' }]} />
        </div>
        <div className="glass-card relative overflow-hidden p-6 sm:p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-pool-aqua/10 via-white/20 to-transparent" />
          <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:gap-32">
            <div className="flex-1 max-w-3xl lg:pr-12">
              <h1 className="max-w-3xl text-4xl md:text-6xl font-display font-bold leading-[0.98] tracking-[-0.03em] text-pool-deep">
                {t('costHero.title')}
              </h1>
              <div className="mt-6 grid max-w-3xl gap-4 text-base sm:text-ls leading-relaxed text-pool-deep/70 md:grid-cols-2">
                <p>{t('costHero.paragraph1')}</p>
                <p>{t('costHero.paragraph2')}</p>
                <p>{t('costHero.paragraph3')}</p>
                <p>{t('costHero.paragraph4')}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="glass-btn-primary hero-cta-primary inline-flex items-center gap-2 px-6 py-3 text-white font-semibold whitespace-nowrap"
                >
                  {t('costHero.ctaPrimary')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative w-64 shrink-0 overflow-hidden aspect-[4/3] sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] lg:aspect-auto lg:-mr-12 lg:self-stretch rounded-3xl">
              <Image
                src="/home/22ormore.webp"
                alt={t('costHero.title')}
                fill
                sizes="(max-width: 1024px) 100vw, 32rem"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* === TYPICAL FIBERGLASS POOL PROJECT RANGES === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <RevealItem>
              <span className="glass-chip-title">{t('projectRanges.label')}</span>
            </RevealItem>
            <RevealItem custom={1}>
              <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold leading-tight tracking-[-0.02em] text-pool-deep">
                {t('projectRanges.title')}
              </h2>
            </RevealItem>
            <RevealItem custom={2}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pool-deep/70">
                {t('projectRanges.subtitle')}
              </p>
            </RevealItem>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {projectRangeCards.map((card, i) => (
              <RevealItem key={i} custom={i}>
                <div className={`glass-card relative h-full overflow-hidden p-6 ${i === 1 ? 'border border-pool-aqua/20' : ''}`}>
                  {i === 1 && (
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pool-aqua/70 to-pool-blue/20" />
                  )}
                  <span className={`text-xs font-display font-bold uppercase tracking-wider ${i === 1 ? 'text-pool-aqua' : 'text-pool-deep/50'}`}>
                    {card.scope}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold leading-tight text-pool-deep">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-pool-deep/70">
                    {card.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {card.points.map((point, pi) => (
                      <li key={pi} className="flex items-start gap-2.5 text-sm leading-relaxed text-pool-deep/70">
                        <Check className={`h-4 w-4 shrink-0 mt-0.5 ${i === 1 ? 'text-pool-aqua' : 'text-pool-deep/40'}`} />
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
                <Info className="inline h-4 w-4 mr-1 -mt-0.5 text-pool-aqua" />
                {t('projectRanges.planningNote')}
              </p>
            </div>
          </RevealItem>
        </section>
      </SectionReveal>

      {/* === KEY FACTORS THAT DETERMINE FIBERGLASS POOL COST === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <RevealItem>
              <span className="glass-chip-title">{t('keyFactors.label')}</span>
            </RevealItem>
            <RevealItem custom={1}>
              <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold leading-tight tracking-[-0.02em] text-pool-deep">
                {t('keyFactors.title')}
              </h2>
            </RevealItem>
            <RevealItem custom={2}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pool-deep/70">
                {t('keyFactors.subtitle')}
              </p>
            </RevealItem>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {keyFactorCards.map((card, i) => (
              <RevealItem key={i} custom={i}>
                <div className="glass-card group relative h-full overflow-hidden p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="absolute right-4 top-3 font-display text-5xl font-bold leading-none text-pool-aqua/[0.38]">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="relative flex h-full flex-col">
                    <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-pool-aqua/10 font-display text-sm font-bold text-pool-aqua ring-1 ring-pool-aqua/20">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="font-display text-lg font-bold leading-tight text-pool-deep">
                      {card.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-pool-deep/70">
                      <span className="font-semibold text-pool-deep/80">{card.costIncreaseLabel} </span>
                      {card.costIncrease}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>

          <RevealItem custom={4}>
            <div className="mt-6 glass-card p-5 sm:p-6 bg-pool-aqua/5 border border-pool-aqua/15">
              <p className="max-w-8xl text-pool-deep/80 text-base text-sl leading-relaxed">
                <Lightbulb className="inline h-4 w-4 mr-1 -mt-0.5 text-pool-aqua" />
                {t('keyFactors.helpfulTip')}
              </p>
            </div>
          </RevealItem>
        </section>
      </SectionReveal>

      {/* === WHAT'S TYPICALLY INCLUDED === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <RevealItem>
              <span className="glass-chip-title">{t('included.label')}</span>
            </RevealItem>
            <RevealItem custom={1}>
              <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold leading-tight tracking-[-0.02em] text-pool-deep">
                {t('included.title')}
              </h2>
            </RevealItem>
            <RevealItem custom={2}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pool-deep/70">
                {t('included.subtitle')}
              </p>
            </RevealItem>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {includedItems.map((item, i) => (
              <RevealItem key={i} custom={i}>
                <div className="glass-card h-full p-5 sm:p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pool-aqua/10 ring-1 ring-pool-aqua/20">
                      <CheckCircle className="h-4 w-4 text-pool-aqua" />
                    </span>
                    <h4 className="font-display text-base font-bold text-pool-deep">{item.title}</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-pool-deep/70">{item.description}</p>
                </div>
              </RevealItem>
            ))}
          </div>

          <RevealItem custom={7}>
            <div className="mt-6 glass-card p-5 sm:p-6 bg-pool-aqua/5 border border-pool-aqua/15">
              <p className="max-w-8xl text-pool-deep/80 text-base text-sl leading-relaxed">
                <Info className="inline h-4 w-4 mr-1 -mt-0.5 text-pool-aqua" />
                {t('included.importantNote')}
              </p>
            </div>
          </RevealItem>
        </section>
      </SectionReveal>

      {/* === OPTIONAL FEATURES & UPGRADES === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <RevealItem>
              <span className="glass-chip-title">{t('upgrades.label')}</span>
            </RevealItem>
            <RevealItem custom={1}>
              <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold leading-tight tracking-[-0.02em] text-pool-deep">
                {t('upgrades.title')}
              </h2>
            </RevealItem>
            <RevealItem custom={2}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pool-deep/70">
                {t('upgrades.subtitle')}
              </p>
            </RevealItem>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {upgradeCards.map((card, i) => (
              <RevealItem key={i} custom={i}>
                <div className="glass-card h-full p-5 sm:p-6">
                  <h4 className="font-display text-base font-bold leading-tight text-pool-deep">
                    {card.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-pool-deep/70">
                    {card.description}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-pool-aqua font-medium">
                    {card.commonUpgrade}
                  </p>
                </div>
              </RevealItem>
            ))}
          </div>

          <RevealItem custom={6}>
            <div className="mt-6 glass-card p-5 sm:p-6 bg-pool-aqua/5 border border-pool-aqua/15">
              <p className="max-w-8xl text-pool-deep/80 text-base text-sl leading-relaxed">
                <Lightbulb className="inline h-4 w-4 mr-1 -mt-0.5 text-pool-aqua" />
                {t('upgrades.planningTip')}
              </p>
            </div>
          </RevealItem>
        </section>
      </SectionReveal>

      {/* === PLANNING FOR LONG-TERM OWNERSHIP === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <RevealItem>
              <span className="glass-chip-title">{t('ownership.label')}</span>
            </RevealItem>
            <RevealItem custom={1}>
              <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold leading-tight tracking-[-0.02em] text-pool-deep">
                {t('ownership.title')}
              </h2>
            </RevealItem>
            <RevealItem custom={2}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pool-deep/70">
                {t('ownership.subtitle')}
              </p>
            </RevealItem>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {ownershipCards.map((card, i) => (
              <RevealItem key={i} custom={i}>
                <div className="glass-card h-full p-5 sm:p-6">
                  <h4 className="font-display text-base font-bold leading-tight text-pool-deep">
                    {card.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-pool-deep/70">
                    {card.description}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-pool-aqua font-medium">
                    {card.planFor}
                  </p>
                </div>
              </RevealItem>
            ))}
          </div>

          <RevealItem custom={3}>
            <div className="mt-8">
              <h3 className="text-xl font-display font-bold leading-tight text-pool-deep">
                {t('ownership.longTermCostsHeading')}
              </h3>
              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                {longTermCosts.map((cost, i) => (
                  <div key={i} className="glass-card flex items-start gap-3 p-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pool-aqua/10 shrink-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-pool-aqua" />
                    </span>
                    <span className="text-sm leading-relaxed text-pool-deep/70">{cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealItem>

          <RevealItem custom={4}>
            <div className="mt-6 glass-card p-5 sm:p-6 bg-pool-aqua/5 border border-pool-aqua/15">
              <p className="max-w-8xl text-pool-deep/80 text-base text-sl leading-relaxed">
                <Lightbulb className="inline h-4 w-4 mr-1 -mt-0.5 text-pool-aqua" />
                {t('ownership.helpfulTip')}
              </p>
            </div>
          </RevealItem>
        </section>
      </SectionReveal>

      {/* === HOW TO GET ACCURATE PRICING === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <RevealItem>
              <span className="glass-chip-title">{t('accuratePricing.label')}</span>
            </RevealItem>
            <RevealItem custom={1}>
              <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold leading-tight tracking-[-0.02em] text-pool-deep">
                {t('accuratePricing.title')}
              </h2>
            </RevealItem>
            <RevealItem custom={2}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pool-deep/70">
                {t('accuratePricing.subtitle')}
              </p>
            </RevealItem>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {accuratePricingCards.map((card, i) => (
              <RevealItem key={i} custom={i}>
                <div className="glass-card h-full p-5 sm:p-6">
                  <h4 className="font-display text-base font-bold leading-tight text-pool-deep">
                    {card.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-pool-deep/70">
                    {card.description}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-pool-aqua font-medium">
                    {card.helpfulDetails}
                  </p>
                </div>
              </RevealItem>
            ))}
          </div>

          <RevealItem custom={4}>
            <div className="mt-8">
              <h3 className="text-xl font-display font-bold leading-tight text-pool-deep">
                {t('accuratePricing.quoteChecklistHeading')}
              </h3>
              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                {quoteChecklist.map((item, i) => (
                  <div key={i} className="glass-card flex items-start gap-3 p-4">
                    <CheckCircle className="h-5 w-5 text-pool-aqua shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed text-pool-deep/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealItem>
        </section>
      </SectionReveal>

      {/* === USING THIS GUIDE TO PLAN === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-12 sm:py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <RevealItem>
              <span className="glass-chip-title">{t('usingGuide.label')}</span>
            </RevealItem>
            <RevealItem custom={1}>
              <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold leading-tight tracking-[-0.02em] text-pool-deep">
                {t('usingGuide.title')}
              </h2>
            </RevealItem>
            <RevealItem custom={2}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-pool-deep/70">
                {t('usingGuide.subtitle')}
              </p>
            </RevealItem>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {usingGuideCards.map((card, i) => (
              <RevealItem key={i} custom={i}>
                <div className="glass-card group relative h-full overflow-hidden p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="absolute right-4 top-3 font-display text-5xl font-bold leading-none text-pool-aqua/[0.38]">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="relative flex h-full flex-col">
                    <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-pool-aqua/10 font-display text-sm font-bold text-pool-aqua ring-1 ring-pool-aqua/20">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="font-display text-lg font-bold leading-tight text-pool-deep">
                      {card.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-pool-deep/70">
                      {card.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* === COST FINAL CTA === */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="glass-card p-6 sm:p-8 md:p-14 text-center relative overflow-hidden border border-pool-aqua/15">
          <div className="absolute inset-0 bg-gradient-to-br from-pool-aqua/12 via-white/10 to-transparent" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight tracking-[-0.02em] text-pool-deep">
              {t('costFinalCta.title')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-pool-deep/70 max-w-2xl mx-auto">
              {t('costFinalCta.subtitle')}
            </p>
            <p className="mt-4 text-base leading-relaxed text-pool-deep/60 max-w-2xl mx-auto italic">
              {t('costFinalCta.finalTip')}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="glass-btn-primary hero-cta-primary inline-flex items-center gap-2 px-6 py-3 text-white font-semibold whitespace-nowrap"
              >
                {t('costFinalCta.ctaPrimary')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="glass-btn inline-flex items-center gap-2 px-6 py-3 text-pool-deep font-semibold whitespace-nowrap"
              >
                {t('costFinalCta.ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}