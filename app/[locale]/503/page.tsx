import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { StatusPage } from '@/components/status-page';

export const metadata: Metadata = {
  title: '503',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ServiceUnavailablePage() {
  const t = useTranslations('Errors.unavailable');

  return (
    <StatusPage
      code={t('code')}
      eyebrow={t('eyebrow')}
      title={t('title')}
      description={t('description')}
      homeLabel={t('home')}
    />
  );
}
