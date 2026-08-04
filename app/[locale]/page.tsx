import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, Shield, Package, Palette, Clock, Phone } from 'lucide-react';
import { SectionReveal, RevealItem, ScrollRevealItem, HorizontalScrollSection, ParallaxBackground, HeroReveal, HeroItem, ScrollIndicator, StatCounter } from '@/lib/motion/scroll-components';
import { PoolCard } from '@/components/pool-card';
import { CreateByYourself } from '@/components/create-by-yourself';
import { ReviewsWidget } from '@/components/reviews-widget';
import { Certifications } from '@/components/certifications';
import { Carousel } from '@/components/carousel';
import { getFeaturedPools } from '@/lib/pools';
import { STATS } from '@/config/stats';
import { SOCIAL_LINKS } from '@/config/site';
import { SITE_URL, BUSINESS_INFO } from '@/config/site';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Meta.home' });
  const title = t('title');
  const description = t('description');
  const ogImage = `/${params.locale}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}`,
      languages: {
        'en-US': '/en',
        'es-US': '/es',
        'pt-BR': '/pt',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}`,
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

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('Home');
  const featuredPools = getFeaturedPools();

  return (
    <>
      {/* === HERO === */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <ParallaxBackground className="absolute inset-0">
           {/* <video
            src="/about/bg-pool-about.mp4"
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
          /> */}
          <Image
            src="/header/bg.png"
            alt="Fiberglass pool installation in South Florida backyard"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

        </ParallaxBackground>

        {/* Dual-layer overlay for richer depth */}
        <div className="absolute inset-0 glass-hero-overlay" />
        <div className="absolute inset-0 hero-gradient-accent" />

        <div className="relative container mx-auto px-4 min-h-[90vh] flex items-center">
          <HeroReveal>
            <div className="max-w-3xl text-white">
              <HeroItem custom={0}>
                <span className="glass-chip-hero inline-block mb-6 text-white">
                  {t('hero.badge')}
                </span>
              </HeroItem>
              <HeroItem custom={1}>
                <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-tight text-balance">
                  {t('hero.title')}
                </h1>
              </HeroItem>
              <HeroItem custom={2}>
                <p className="mt-6 text-base sm:text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
                  {t('hero.subtitle')}
                </p>
              </HeroItem>
              <HeroItem custom={3}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/products"
                    className="glass-btn-primary hero-cta-primary px-7 py-3.5 text-white font-semibold flex items-center gap-2 text-base"
                  >
                    {t('hero.ctaPrimary')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/create-by-yourself"
                    className="glass-btn hero-cta-secondary px-7 py-3.5 text-pool-deep font-semibold text-base"
                  >
                    {t('hero.ctaSecondary')}
                  </Link>
                </div>
              </HeroItem>
            </div>
          </HeroReveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm animate-float">
          {t('hero.scroll')}
        </div>
      </section>

      {/* === STATS === */}
      <section className="container mx-auto px-4 -mt-16 sm:-mt-20 relative z-10">
        <div className="stats-band">
          <div className="stats-band-item stats-band-item-hover">
            <StatCounter to={STATS.soldPools} suffix="+" label={t('stats.soldPools')} />
          </div>
          <div className="stats-band-item stats-band-item-hover">
            <StatCounter to={STATS.stylesInStock} suffix="+" label={t('stats.stylesInStock')} />
          </div>
          <div className="stats-band-item stats-band-item-hover">
            <StatCounter to={STATS.yearsExperience} suffix="" label={t('stats.yearsExperience')} />
          </div>
          <div className="stats-band-item stats-band-item-hover">
            <StatCounter to={0} suffix="" label={t('stats.warranty')} textValue={t('stats.warrantyText')} />
          </div>
        </div>
      </section>

      {/* === ABOUT === */}
      <SectionReveal>
        <HorizontalScrollSection
          className="relative isolate bg-pool-cream"
          background={
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
              <div className="absolute -right-40 top-[8%] h-[32rem] w-[32rem] rounded-full bg-pool-mist/60 blur-3xl" />
              <div className="absolute -left-48 top-[48%] h-[28rem] w-[28rem] rounded-full bg-pool-sand/80 blur-3xl" />
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-pool-cream to-transparent" />
            </div>
          }
          topBar={
            <div className="pointer-events-none absolute inset-x-0 top-[5.8rem] z-40 flex items-center gap-4 border-[2px] border-gray-600/30 bg-black/40 px-4 py-4 backdrop-blur-2xl transition-all duration-300 sm:px-10 lg:px-20">
              <span className="h-px flex-1 bg-white/30" />
              <span className="font-sans text-[12px] font-bold uppercase tracking-[0.28em] text-white/80">
                FLFG Pools / About
              </span>
              <span className="h-px flex-1 bg-white/30" />
            </div>
          }
        >
          <article className="flex w-full shrink-0 flex-col justify-center px-4 py-24 sm:px-10 lg:h-screen lg:w-[72vw] lg:max-w-[62rem] lg:px-20 lg:py-16">
            <ScrollRevealItem direction="fade">
              <span className="glass-chip-section-title">{t('about.label')}</span>
            </ScrollRevealItem>
            <ScrollRevealItem direction="fade">
              <h2 className="mt-5 max-w-3xl text-5xl font-display font-bold leading-[0.98] tracking-[-0.04em] text-pool-deep sm:text-6xl lg:text-7xl">
                {t('about.title')}
              </h2>
            </ScrollRevealItem>
            <div className="mt-12 flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-pool-deep/45 lg:mt-20">
              <span className="h-px w-12 bg-pool-aqua" />
              {t('hero.scroll')}
            </div>
          </article>

          <article className="flex w-full shrink-0 items-center px-4 py-24 sm:px-10 lg:h-screen lg:w-[72vw] lg:px-20">
            <ScrollRevealItem direction="fade" className="max-w-xl lg:ml-[10%]">
              <span className="mb-5 block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-pool-deep/45">
                01 / {t('about.label')}
              </span>
              <p className="max-w-[42rem] font-[var(--font-about-body)] text-lg leading-[1.75] text-pool-deep/70 sm:text-2xl">
                {t('about.paragraph1')}
              </p>
            </ScrollRevealItem>
          </article>

          <article className="relative flex w-full shrink-0 items-center px-4 py-24 sm:px-10 lg:h-screen lg:w-[108vw] lg:px-20">
            <div className="w-full">
              <div className="relative z-10 mb-6 flex items-end justify-between gap-6 border-b border-pool-deep/10 pb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-pool-deep/45">
                <span className="flex items-center gap-3 relative top-[10rem] text-[12px]"><span className="h-px w-8 bg-pool-aqua" />FLFG Pools / Visual archive</span>
                <span className="relative top-[10rem] text-[12px]">02 / 05</span>
              </div>
              <div className="flex h-[62vh] items-center gap-6 sm:gap-8 lg:h-[72vh] lg:gap-16">
                {[
                  { src: '/home/img-about2.png', alt: 'FLFG Pools fiberglass pool installation', className: 'h-[52%] w-[28%] self-end lg:mb-12 lg:h-[62%] lg:w-[24%]' },
                  { src: '/home/rainforest.jpg', alt: 'FLFG Pools Rainforest pool model', className: 'h-[72%] w-[30%] self-start lg:mt-8 lg:h-[78%] lg:w-[27%]' },
                  { src: '/home/typea.png', alt: 'FLFG Pools Type A pool model', className: 'h-[60%] w-[31%] self-center lg:h-[68%] lg:w-[31%]' },
                ].map((image) => (
                  <figure key={image.src} className={`group relative min-h-0 shrink-0 overflow-hidden bg-pool-mist/40 ring-1 ring-pool-deep/10 shadow-[0_18px_45px_rgba(8,47,73,0.12)] ${image.className}`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 34vw, 28vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pool-deep/70 to-transparent px-3 pb-3 pt-10 font-sans text-[10px] uppercase tracking-[0.12em] text-white/80 opacity-100 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100">
                      FLFG Pools
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </article>

          <article className="flex w-full shrink-0 items-center px-4 py-24 sm:px-10 lg:h-screen lg:w-[72vw] lg:px-20">
            <ScrollRevealItem direction="fade" className="max-w-xl lg:ml-[28%]">
              <span className="mb-5 block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-pool-deep/45">
                03 / {t('about.label')}
              </span>
              <p className="max-w-[42rem] font-[var(--font-about-body)] text-lg leading-[1.75] text-pool-deep/70 sm:text-2xl">
                {t('about.paragraph2')}
              </p>
            </ScrollRevealItem>
          </article>

          <article className="relative flex w-full shrink-0 items-center px-4 py-24 sm:px-10 lg:h-screen lg:w-[108vw] lg:px-20">
            <div className="w-full">
              <div className="relative z-10 mb-6 flex items-end justify-between gap-6 border-b border-pool-deep/10 pb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-pool-deep/45">
                <span className="flex items-center gap-3 relative top-[4rem] text-[12px]"><span className="h-px w-8 bg-pool-aqua" />FLFG Pools / Visual archive</span>
                <span className="relative top-[4rem] text-[12px]">04 / 05</span>
              </div>
              <div className="flex h-[62vh] items-center justify-end gap-4 sm:gap-8 lg:h-[72vh] lg:gap-12">
                {[
                  { src: '/home/large-pools.png', alt: 'FLFG Pools large pool collection', className: 'h-[66%] w-[30%] self-start lg:mt-12 lg:h-[72%] lg:w-[27%]' },
                  { src: '/home/16ft22ft.webp', alt: 'FLFG Pools 16ft x 22ft pool model', className: 'h-[54%] w-[28%] self-end lg:mb-8 lg:h-[60%] lg:w-[24%]' },
                  { src: '/certi-brand/store-outside-4.jpeg', alt: 'FLFG Pools showroom building', className: 'h-[76%] w-[32%] self-center lg:h-[82%] lg:w-[30%]' },
                ].map((image) => (
                  <figure key={image.src} className={`group relative min-h-0 shrink-0 overflow-hidden bg-pool-mist/40 ring-1 ring-pool-deep/10 shadow-[0_18px_45px_rgba(8,47,73,0.12)] ${image.className}`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 38vw, 28vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pool-deep/70 to-transparent px-3 pb-3 pt-10 font-sans text-[10px] uppercase tracking-[0.12em] text-white/80 opacity-100 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100">
                      FLFG Pools
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </article>

          <article className="relative flex w-full shrink-0 flex-col justify-center overflow-hidden px-4 py-24 sm:px-10 lg:h-screen lg:w-[88vw] lg:px-20">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(9rem,28vw,28rem)] font-bold leading-none tracking-[-0.1em] text-pool-deep/[0.035]">
                FLFG
              </span>
              <span className="absolute left-1/2 top-1/2 h-px w-[min(70vw,54rem)] -translate-x-1/2 bg-pool-deep/10" />
              <span className="absolute left-1/2 top-1/2 h-[min(70vw,54rem)] w-px -translate-x-1/2 -translate-y-1/2 bg-pool-deep/10" />
              <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pool-aqua bg-pool-cream shadow-[0_0_0_10px_rgba(14,165,233,0.08)]" />
              <span className="absolute left-1/2 top-[calc(50%+min(12vw,8rem))] -translate-x-1/2 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-pool-deep/35">
                South Florida · Since 2013
              </span>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <ScrollRevealItem direction="fade" className="max-w-xl">
              <span className="mb-5 block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-pool-deep/45">
                05 / FLFG Pools / Miami
              </span>
              <Link
                href="/about"
                className="glass-btn-primary hero-cta-primary inline-flex items-center gap-2 px-5 py-2.5 font-[var(--font-about-body)] text-white"
              >
                {t('about.cta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              </ScrollRevealItem>
            </div>
            {/* <ScrollRevealItem direction="fade" className="w-full max-w-[420px]">
              <Carousel
                className="shadow-[0_24px_64px_rgba(8,47,73,0.18)]"
                images={[
                  { src: '/home/img-about.png', alt: 'FLFG Pools showroom in Miami' },
                  { src: '/home/img-about2.png', alt: 'FLFG Pools fiberglass pool installation' },
                  { src: '/home/typea.png', alt: 'FLFG Pools Type A pool model' },
                  { src: '/home/rainforest.jpg', alt: 'FLFG Pools Rainforest pool model' },
                  { src: '/home/large-pools.png', alt: 'FLFG Pools large pool collection' },
                  { src: '/home/16ft22ft.webp', alt: 'FLFG Pools 16ft x 22ft pool model' },
                  { src: '/certi-brand/store-outside-2.png', alt: 'FLFG Pools store exterior' },
                  { src: '/certi-brand/store-outside-4.jpeg', alt: 'FLFG Pools showroom building' },
                ]}
              />
            </ScrollRevealItem> */}
          </article>
        </HorizontalScrollSection>
      </SectionReveal>

      {/* === WHY US — editorial list, not card grid === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-14 sm:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <RevealItem>
              <span className="glass-chip-section-title">{t('whyUs.label')}</span>
            </RevealItem>
            <RevealItem custom={1}>
              <h2 className="text-3xl sm:text-4xl md:text-4xl font-display font-bold text-pool-deep">
                {t('whyUs.title')}
              </h2>
            </RevealItem>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"> */}
            {[
              { icon: Shield, key: 'safety' as const },
              { icon: Package, key: 'stock' as const },
              { icon: Palette, key: 'custom' as const },
              { icon: Clock, key: 'warranty' as const },
            ].map((item, i) => (
              <RevealItem key={item.key} custom={i}>
                <div className="glass-card p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-pool-aqua/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-pool-aqua" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-pool-deep">
                      {t(`whyUs.features.${item.key}.title`)}
                    </h3>
                  <p className="mt-2 text-sm text-pool-deep/70">
                      {t(`whyUs.features.${item.key}.description`)}
                    </p>
                </div>
              </RevealItem>
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* === FEATURED POOLS === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-14 sm:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <RevealItem>
              <span className="glass-chip-section-title">{t('featuredPools.label')}</span>
            </RevealItem>
            <RevealItem custom={1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-pool-deep">
                {t('featuredPools.title')}
              </h2>
            </RevealItem>
            <RevealItem custom={2}>
              <p className="mt-4 text-pool-deep/70">{t('featuredPools.subtitle')}</p>
            </RevealItem>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPools.map((pool, i) => (
              <PoolCard key={pool.slug} pool={pool} locale={locale} index={i} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/products"
              className="glass-btn-primary hero-cta-primary mt-6 inline-flex items-center gap-2 glass-btn-primary px-6 py-3 text-white"
            >
              {t('featuredPools.viewAll')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </SectionReveal>

      {/* === CREATE BY YOURSELF === */}
      <CreateByYourself />

      {/* === CERTIFICATIONS & PARTNERS === */}
      <Certifications />

      
      {/* === FINANCING === */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-14 sm:py-8">
          <div className="glass-panel p-6 sm:p-8 md:p-12 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="glass-chip-section-title">{t('financing.label')}</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-pool-deep">
                {t('financing.title')}
              </h2>
              <p className="mt-4 text-pool-deep/70">{t('financing.description')}</p>
              <a
                href="https://www.hearth.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn-primary hero-cta-primary mt-6 inline-flex items-center gap-2 glass-btn-primary px-5 py-2 text-white"
              >
                {t('financing.cta')}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="glass-card p-8">
              <div className="text-center">
                <p className="text-sm text-pool-deep/60">{t('financing.label')}</p>
                <p className="text-3xl sm:text-4xl font-bold text-gradient">$285/mo*</p>
                <p className="text-xs text-pool-deep/50 mt-2">
                  {t('financing.description')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* === REVIEWS === */}
      {/* <ReviewsWidget /> */}

      {/* === CTA === */}
      <section className="container mx-auto px-4 py-14 sm:py-20">
        <div className="glass-card p-6 sm:p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pool-aqua/10 to-transparent" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-pool-deep">
              {t('cta.title')}
            </h2>
            <p className="mt-4 text-lg text-pool-deep/70 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="glass-btn-primary hero-cta-primary px-6 py-3 text-white font-medium"
              >
                {t('cta.button')}
              </Link>
              <a
                href={`tel:${SOCIAL_LINKS.phone}`}
                className="glass-btn px-6 py-3 text-pool-deep font-medium inline-flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                {SOCIAL_LINKS.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}