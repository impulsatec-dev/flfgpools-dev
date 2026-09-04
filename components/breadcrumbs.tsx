import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { breadcrumbSchema } from '@/lib/schema/breadcrumb';

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs({ items, locale }: { items: BreadcrumbItem[]; locale: string }) {
  const t = useTranslations('Breadcrumbs');
  const fullItems = [{ name: t('home'), href: '/' }, ...items];
  const schema = breadcrumbSchema(fullItems.map(item => ({ name: item.name, url: item.href })), locale);

  const hasHiddenItems = fullItems.length > 3;
  const hiddenItems = fullItems.slice(1, -1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="glass-nav !mx-0 w-full max-w-full justify-start overflow-x-auto px-3 py-2.5 sm:px-4"
        style={{ marginTop: '4.5rem' }}
      >
        <ol className="hidden min-w-max items-center gap-1 text-sm sm:flex">
          {fullItems.map((item, i) => {
            const isCurrent = i === fullItems.length - 1;

            return (
              <li key={item.href} className="flex min-w-0 shrink-0 items-center gap-1">
                {isCurrent ? (
                  <span
                    aria-current="page"
                    title={item.name}
                    className="max-w-[min(42vw,32rem)] truncate font-semibold text-pool-deep"
                  >
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="rounded-full px-2 py-1.5 text-pool-deep/70 transition-colors hover:bg-pool-mist/60 hover:text-pool-aqua focus-visible:outline-offset-1"
                    >
                      {item.name}
                    </Link>
                    <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 opacity-50" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
        <ol className="flex min-w-0 items-center gap-1 text-xs sm:hidden">
          {hasHiddenItems ? (
            <>
              <li className="flex min-w-0 shrink-0 items-center gap-1">
                <Link
                  href={fullItems[0].href}
                  className="rounded-full px-2 py-1.5 text-pool-deep/70 transition-colors hover:bg-pool-mist/60 hover:text-pool-aqua focus-visible:outline-offset-1"
                >
                  {fullItems[0].name}
                </Link>
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 opacity-50" />
              </li>
              <li className="flex items-center gap-1">
                <details className="relative">
                  <summary
                    aria-label={t('more')}
                    className="flex min-h-8 cursor-pointer list-none items-center rounded-full px-2 text-pool-deep/70 transition-colors hover:bg-pool-mist/60 hover:text-pool-aqua [&::-webkit-details-marker]:hidden"
                  >
                    <MoreHorizontal aria-hidden="true" className="h-4 w-4" />
                  </summary>
                  <div className="absolute left-0 top-10 z-10 w-max max-w-[calc(100vw-2rem)] rounded-2xl border border-white/70 bg-[var(--pool-cream)]/95 p-2 shadow-[var(--glass-shadow-md)] backdrop-blur-md">
                    <ol className="flex flex-col gap-1">
                      {hiddenItems.map((hiddenItem) => (
                        <li key={hiddenItem.href}>
                          <Link
                            href={hiddenItem.href}
                            className="block rounded-xl px-3 py-2 text-sm text-pool-deep/75 transition-colors hover:bg-pool-mist/70 hover:text-pool-aqua"
                          >
                            {hiddenItem.name}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                </details>
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 opacity-50" />
              </li>
              <li className="min-w-0 shrink">
                <span
                  aria-current="page"
                  title={fullItems[fullItems.length - 1].name}
                  className="block max-w-[min(48vw,28rem)] truncate font-semibold text-pool-deep"
                >
                  {fullItems[fullItems.length - 1].name}
                </span>
              </li>
            </>
          ) : (
            fullItems.map((item, i) => (
              <li key={item.href} className="flex min-w-0 shrink-0 items-center gap-1">
                {i === fullItems.length - 1 ? (
                  <span aria-current="page" className="max-w-[min(48vw,28rem)] truncate font-semibold text-pool-deep">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="rounded-full px-2 py-1.5 text-pool-deep/70 transition-colors hover:bg-pool-mist/60 hover:text-pool-aqua focus-visible:outline-offset-1"
                    >
                      {item.name}
                    </Link>
                    <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 opacity-50" />
                  </>
                )}
              </li>
            ))
          )}
        </ol>
      </nav>
    </>
  );
}