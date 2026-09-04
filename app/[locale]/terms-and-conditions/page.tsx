import { Breadcrumbs } from '@/components/breadcrumbs';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'LegalPages.terms' });
  return { title: t('title') };
}

export default function TermsAndConditionsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('LegalPages.terms');
  return (
    <main className="container mx-auto px-4 py-12">
      <Breadcrumbs locale={locale} items={[{ name: t('title'), href: '/terms-and-conditions' }]} />
      <article className="glass-card mt-8 max-w-3xl p-6 md:p-10">
        <h1 className="text-3xl font-display font-bold text-pool-deep md:text-5xl">{t('title')}</h1>
        <p className="mt-6 leading-8 text-pool-deep/75">{t('body')}</p>
      </article>
    </main>
  );
}
