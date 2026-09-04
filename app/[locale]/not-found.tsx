import { useTranslations } from 'next-intl';
import { StatusPage } from '@/components/status-page';

export default function NotFound() {
  const t = useTranslations('Errors.notFound');

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
