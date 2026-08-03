import type { Pool } from '@/lib/pools';
import { SITE_URL } from '@/config/site';

export function poolProductSchema(pool: Pool, locale: string = 'en', useSimpleUrl: boolean = false) {
  const section = pool.productClass === 'spa' ? 'spa' : pool.productClass === 'ledge' ? 'ledge' : 'pools';
  const url = useSimpleUrl
    ? `${SITE_URL}/${locale}/products/${section}/${pool.slug}`
    : `${SITE_URL}/${locale}/products/${section}/${pool.slug}`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${pool.modelCode} ${pool.name}`,
    description: pool.description[locale as keyof typeof pool.description] || pool.description.en,
    category: pool.productClass === 'spa' ? 'Fiberglass Spa' : pool.productClass === 'ledge' ? 'Tanning Ledge' : 'Fiberglass Pool',
    url,
    brand: { '@type': 'Brand', name: 'FLFG Pools' },
  };

  if (pool.images.length > 0) {
    schema.image = pool.images;
  }

  if (pool.priceInitial != null) {
    schema.offers = {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: pool.priceAverage ?? pool.priceInitial,
      availability: pool.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      seller: { '@type': 'Organization', name: 'Florida Fiberglass Pools' },
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