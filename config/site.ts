export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://flfgpools.com');

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/floridafiberglasspools/',
  facebook: 'https://www.facebook.com/profile.php?id=61556514011011',
  whatsapp: '17862071634',
  whatsappDisplay: '+1 (786) 207-1634',
  yelp: 'https://www.yelp.com/biz/florida-fiberglass-pools-miami',
  email: 'sales@flfgpools.com',
  email_principal: 'floridafiberglasspools@gmail.com',
  phone: '+17862071634',
  phoneDisplay: '+1 (786) 207-1634',
  address: {
    street: '21500 S Dixie Hwy',
    city: 'Miami',
    state: 'FL',
    zip: '33189',
    country: 'US',
  },
  googleMaps: 'https://www.google.com/maps/place/Florida+Fiberglass+Pools/@25.5665477,-80.3818032,17z/data=!4m15!1m8!3m7!1s0x88d9c36e90ec79a7:0x710d48840f9c6819!2s21500+S+Dixie+Hwy,+Miami,+FL+33189,+EE.+UU.!3b1!8m2!3d25.5665477!4d-80.3818032!16s%2Fg%2F11bw4bc69j!3m5!1s0x88d9c36e90bf51cd:0xe613624fce450b3c!8m2!3d25.5664972!4d-80.3817865!16s%2Fg%2F11m63nljj6?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D',
  hours: {
    weekday: '9am – 5pm',
    saturday: '9am – 1pm',
  },
} as const;

export const BUSINESS_INFO = {
  name: 'Florida Fiberglass Pools',
  legalName: 'Florida Fiberglass Pools LLC',
  foundedYear: 2013,
  serviceArea: [
    'Indian River County',
    'St. Lucie County',
    'Martin County',
    'Palm Beach County',
    'Broward County',
    'Miami-Dade County',
    'Monroe County',
    'Collier County',
    'Hendry County',
    'Glades County',
    'Lee County',
    'Charlotte County',
    'DeSoto County',
    'Hardee County',
    'Highlands County',
    'Okeechobee County',
  ],
  showroomSize: '8,000 sqft',
} as const;

export const SEO_CONFIG = {
  siteUrl: SITE_URL,
  title: 'Florida Fiberglass Pools',
  shortName: 'FLFG Pools',
  description:
    'Supplier and installer of inground and above ground fiberglass pools in South Florida since 2013. 1000+ pools delivered with a lifetime structural warranty. Serving across Indian River, St. Lucie,  Martin, Palm Beach, Broward, Miami-Dade, Monroe, Collier, Hendry, Glades, Lee, Charlotte, DeSoto, Hardee, Highlands and Okeechobee Counties.',
  keywords: [
    'fiberglass pools Miami',
    'piscinas de fibra de vidrio Florida',
    'pool installation South Florida',
    'inground pools Miami-Dade',
    'piscinas fibra Miami',
    'pool supplier Broward',
    'fiberglass pool installation',
    'fiberglass spa Florida',
    'tanning ledge pool',
    'above ground fiberglass pools',
    'piscinas de fibra de vidrio',
    'Florida pool supplier',
  ],
  twitter: '@flfgpools',
  ogImage: '/opengraph-image',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  geoCoordinates: { latitude: 25.5863, longitude: -80.3868 },
  googleVerification: '',
  localeMap: {
    en: 'en_US',
    es: 'es_US',
    pt: 'pt_BR',
  },
} as const;