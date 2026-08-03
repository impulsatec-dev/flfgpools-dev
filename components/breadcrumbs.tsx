import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { breadcrumbSchema } from '@/lib/schema/breadcrumb';

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const t = useTranslations('Breadcrumbs');
  const fullItems = [{ name: t('home'), href: '/' }, ...items];
  const schema = breadcrumbSchema(fullItems.map(item => ({ name: item.name, url: item.href })));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div style={{ paddingTop: '5rem' }}>
      <nav aria-label="Breadcrumb" className="glass-nav inline-flex px-4 py-2">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          {fullItems.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1">
              {i < fullItems.length - 1 ? (
                <>
                  <Link
                    href={item.href}
                    className="text-pool-deep/70 hover:text-pool-aqua transition-colors"
                  >
                    {item.name}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                </>
              ) : (
                <span className="font-semibold text-pool-deep">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      </div>
    </>
  );
}