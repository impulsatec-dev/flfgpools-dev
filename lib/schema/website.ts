import { SITE_URL, BUSINESS_INFO, SEO_CONFIG } from '@/config/site';

export function websiteSchema(locale: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS_INFO.name,
    alternateName: SEO_CONFIG.shortName,
    description: SEO_CONFIG.description,
    inLanguage: locale,
    publisher: {
      '@id': `${SITE_URL}/#business`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/${locale}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
