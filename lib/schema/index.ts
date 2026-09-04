import { localBusinessSchema } from './local-business';
import { websiteSchema } from './website';

export function combinedSchema(locale: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      localBusinessSchema(),
      websiteSchema(locale),
    ],
  };
}

export { localBusinessSchema, websiteSchema };
