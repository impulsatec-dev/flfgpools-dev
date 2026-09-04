'use client';

import { useTranslations } from 'next-intl';
import { StatusPage } from '@/components/status-page';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('Errors.server');

  return (
    <StatusPage
      code={t('code')}
      eyebrow={t('eyebrow')}
      title={t('title')}
      description={t('description')}
      homeLabel={t('home')}
      retryLabel={t('retry')}
      onRetry={reset}
    />
  );
}
