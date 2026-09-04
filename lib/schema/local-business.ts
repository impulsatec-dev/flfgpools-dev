import { SOCIAL_LINKS, BUSINESS_INFO, SITE_URL, SEO_CONFIG } from '@/config/site';

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    alternateName: BUSINESS_INFO.name === 'Florida Fiberglass Pools' ? 'FLFG Pools' : undefined,
    description: SEO_CONFIG.description,
    url: SITE_URL,
    telephone: SOCIAL_LINKS.phone,
    email: SOCIAL_LINKS.email,
    image: `${SITE_URL}/header/logo-alta.png`,
    logo: `${SITE_URL}/home/brand.png`,
    priceRange: '$$',
    foundingDate: `${BUSINESS_INFO.foundedYear}-01-01`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SOCIAL_LINKS.address.street,
      addressLocality: SOCIAL_LINKS.address.city,
      addressRegion: SOCIAL_LINKS.address.state,
      postalCode: SOCIAL_LINKS.address.zip,
      addressCountry: SOCIAL_LINKS.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO_CONFIG.geoCoordinates.latitude,
      longitude: SEO_CONFIG.geoCoordinates.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
    areaServed: BUSINESS_INFO.serviceArea.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area,
    })),
    sameAs: [
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.yelp,
    ].filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Fiberglass Pools & Spas',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Inground Fiberglass Pools',
            category: 'Fiberglass Pool',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Fiberglass Spas',
            category: 'Fiberglass Spa',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Tanning Ledges',
            category: 'Tanning Ledge',
          },
        },
      ],
    },
  };
}