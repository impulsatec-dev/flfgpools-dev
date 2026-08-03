import { Breadcrumbs } from '@/components/breadcrumbs';
import { ContactForm } from '@/components/contact-form';
import { SectionReveal, RevealItem } from '@/lib/motion/scroll-components';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { SOCIAL_LINKS, SITE_URL, BUSINESS_INFO } from '@/config/site';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Meta.contact' });
  const title = t('title');
  const description = t('description');
  const ogImage = `/${params.locale}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/contact`,
      languages: {
        'en-US': '/en/contact',
        'es-US': '/es/contact',
        'pt-BR': '/pt/contact',
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/contact`,
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

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('Contact');
  return (
    <>
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Breadcrumbs items={[{ name: t('hero.title'), href: '/contact' }]} />
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-pool-deep">
          {t('hero.title')}
        </h1>
        <p className="mt-4 text-xl text-pool-deep/70 max-w-2xl">
          {t('hero.subtitle')}
        </p>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-pool-aqua mt-0.5" />
                <div>
                  <h3 className="font-semibold">{t('info.phone')}</h3>
                  <a href={`tel:${SOCIAL_LINKS.phone}`} className="text-pool-deep/70 link-underline">
                    {SOCIAL_LINKS.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-pool-aqua mt-0.5" />
                <div>
                  <h3 className="font-semibold">{t('info.email')}</h3>
                  <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-pool-deep/70 link-underline">
                    {SOCIAL_LINKS.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-pool-aqua mt-0.5" />
                <div>
                  <h3 className="font-semibold">{t('info.address')}</h3>
                  <p className="text-pool-deep/70 text-sm">
                    {SOCIAL_LINKS.address.street}<br />
                    {SOCIAL_LINKS.address.city}, {SOCIAL_LINKS.address.state} {SOCIAL_LINKS.address.zip}
                  </p>
                  <a
                    href="https://maps.google.com/?q=21500+S+Dixie+Hwy+Miami+FL+33189"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-pool-aqua link-underline"
                  >
                    {t('info.directions')}
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-pool-aqua mt-0.5" />
                <div>
                  <h3 className="font-semibold">{t('info.hours')}</h3>
                  <ul className="text-sm text-pool-deep/70 space-y-1">
                    <li>{t('info.hoursWeek')}</li>
                    <li>{t('info.hoursSaturday')}</li>
                    <li>{t('info.hoursSunday')}</li>
                  </ul>
                  <p className="mt-3 text-sm font-medium text-pool-aqua">
                    {t('info.languages')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}