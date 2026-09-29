import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

const destinations = [
  { href: '/products', key: 'products' },
  { href: '/showroom', key: 'showroom' },
  { href: '/contact', key: 'contact' },
] as const;

export default function NotFound() {
  const t = useTranslations('Errors.notFound');

  return (
    <main className="container mx-auto px-4 py-16 sm:py-24 md:py-28 lg:py-32">
      <section className="mx-auto max-w-5xl">
        <div className="grid items-center gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
          <p
            aria-hidden="true"
            className="select-none font-display text-[clamp(7rem,19vw,14rem)] font-bold leading-[0.78] tracking-[-0.08em] text-pool-aqua/25"
          >
            404
          </p>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pool-aqua">
              {t('eyebrow')}
            </p>
            <h1 className="mt-3 max-w-xl text-4xl font-display font-bold leading-tight text-pool-deep sm:text-5xl">
              {t('title')}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-pool-deep/70 sm:text-lg">
              {t('description')}
            </p>
            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-pool-deep px-6 py-3 font-semibold text-white transition-colors hover:bg-pool-aqua focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pool-aqua"
            >
              {t('home')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <nav className="mt-16" aria-label={t('destinations.label')}>
          <h2 className="text-lg font-semibold text-pool-deep">{t('destinations.label')}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map(({ href, key }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-2xl border border-pool-deep/10 bg-white/50 p-5 transition-colors hover:border-pool-aqua/40 hover:bg-pool-aqua/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pool-aqua"
                >
                  <span className="flex items-center justify-between gap-3 font-semibold text-pool-deep">
                    {t(`destinations.${key}.title`)}
                    <ArrowRight className="h-4 w-4 shrink-0 text-pool-aqua transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-pool-deep/65">
                    {t(`destinations.${key}.description`)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </main>
  );
}
