import type { Pool } from '@/lib/pools';
import { SITE_URL } from '@/config/site';

export function poolProductSchema(pool: Pool, locale: string = 'en') {
  const section = pool.productClass === 'spa' ? 'spa' : pool.productClass === 'ledge' ? 'ledge' : 'pools';
  const url = `${SITE_URL}/${locale}/products/${section}/${pool.slug}`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: `${pool.modelCode} ${pool.name}`,
    description: pool.descriptionLarge?.[locale as keyof typeof pool.descriptionLarge] || pool.description[locale as keyof typeof pool.description] || pool.description.en,
    category: pool.productClass === 'spa' ? 'Fiberglass Spa' : pool.productClass === 'ledge' ? 'Tanning Ledge' : 'Fiberglass Pool',
    url,
    brand: { '@type': 'Brand', name: 'FLFG Pools' },
  };

  if (pool.images.length > 0) {
    schema.image = pool.images.map((image) =>
      image.startsWith('http') ? image : `${SITE_URL}${image}`,
    );
  }

  if (pool.priceInitial != null && pool.priceInitial > 0) {
    schema.offers = {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: pool.priceAverage ?? pool.priceInitial,
      ...(pool.inStock != null
        ? {
            availability: pool.inStock
              ? 'https://schema.org/InStock'
              : 'https://schema.org/PreOrder',
          }
        : {}),
      seller: { '@type': 'Organization', '@id': `${SITE_URL}/#business` },
    };
  }

  if (pool.rating != null && pool.reviewCount != null) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: pool.rating,
      reviewCount: pool.reviewCount,
      bestRating: '5',
    };
  }

  return schema;
}