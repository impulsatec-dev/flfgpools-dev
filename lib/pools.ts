export type ProductClass = 'pool' | 'spa' | 'ledge';
export type PoolShape = 'rectangle' | 'freeform' | 'beach-entry';
export type SizeCategory = 'upTo16' | '16to22' | '22plus' | 'spa' | 'ledge';

export interface PoolColor {
  name: string;
  modelImage: string;
  colorChip: string;
  referenceImages: string[];
  gradient: string;
}

export const poolColors: PoolColor[] = [
  {
    name: 'Bahama Blue',
    modelImage: '/models-colors/bahama-blue/Bahama-Blue-Water-Swatch-compressed.webp',
    colorChip: '/models-colors/bahama-blue/bahama-blue-compressed.webp',
    referenceImages: [
      '/models-colors/bahama-blue/reference/ChatGPT-Image-Oct-14-2025-10_20_44-AM-1024x683.png',
      '/models-colors/bahama-blue/reference/img_1965-1-756x1024.webp',
    ],
    gradient: 'from-teal-300 to-blue-500',
  },
  {
    name: 'Caribbean Blue',
    modelImage: '/models-colors/caribbean-blue/caribbean-blue-water-graphic-compressed.webp',
    colorChip: '/models-colors/caribbean-blue/caribbean-blue-compressed-964x1024.webp',
    referenceImages: [
      '/models-colors/caribbean-blue/reference/Costa-Rica-GPT-1024x683.png',
      '/models-colors/caribbean-blue/reference/Costa-Rica-Rio-Swansboro-2-edited-1024x768.avif',
    ],
    gradient: 'from-cyan-300 to-blue-600',
  },
  {
    name: 'Diamond Gray',
    modelImage: '/models-colors/diamond-gray/Diamond-Gray-Water-Color.webp',
    colorChip: '/models-colors/diamond-gray/gray-diamond-color-chip-compressed.webp',
    referenceImages: [
      '/models-colors/diamond-gray/reference/Costa-Rica-Cumba-Spa-Gray-compressed-1024x768.webp',
      '/models-colors/diamond-gray/reference/columbian-beach-grey-compressed.webp',
    ],
    gradient: 'from-slate-200 to-slate-500',
  },
  {
    name: 'Blue Abyss',
    modelImage: '/models-colors/blue-abyss/Blue-Abyss-water-color.webp',
    colorChip: '/models-colors/blue-abyss/Blue-Abyss-Color-Chip-compressed.webp',
    referenceImages: [
      '/models-colors/blue-abyss/reference/blue-abyss-travertine-patio-1024x684.webp',
    ],
    gradient: 'from-blue-800 to-blue-950',
  },
  {
    name: 'Sky Blue',
    modelImage: '/models-colors/sky-blue/sky-blue-water-color-compressed.webp',
    colorChip: '/models-colors/sky-blue/sky-blue-color-chip-compressed.webp',
    referenceImages: [
      '/models-colors/sky-blue/reference/Brasilia_Sky_Blue-1024x768.png',
      '/models-colors/sky-blue/reference/costa-rica-sky-blue-compressed-768x1024.webp',
    ],
    gradient: 'from-sky-200 to-cyan-500',
  },
  {
    name: 'White Ivory',
    modelImage: '/models-colors/white-ivory/White-Ivory-Water-Color.webp',
    colorChip: '/models-colors/white-ivory/white-ivory-pure-white-color-chip-compressed.webp',
    referenceImages: [
      '/models-colors/white-ivory/reference/neblina-beach-white-compressed-768x1024.webp',
      '/models-colors/white-ivory/reference/roatan-beach-white-compressed-768x1024.webp',
    ],
    gradient: 'from-stone-50 to-amber-100',
  },
  {
    name: 'Black Obsidian',
    modelImage: '/models-colors/black-obsidian/black-obsidian-water-color-compressed.webp',
    colorChip: '/models-colors/black-obsidian/black-obsidian-color-chip-compressed.webp',
    referenceImages: [
      '/models-colors/black-obsidian/reference/black-obsidian-travertine-patio-1024x682.webp',
    ],
    gradient: 'from-gray-800 to-black',
  },
];

export const poolColorNames = poolColors.map((c) => c.name);

export interface Pool {
  slug: string;
  name: string;
  modelCode: string;
  productClass: ProductClass;
  shape: PoolShape;
  sizeCategory: SizeCategory;
  lengthFt: number;
  widthFt: number;
  depthFt: number;
  dimensionsText: { width: string; length: string; depth: string };
  surfaceAreaSqft?: number;
  waterVolumeGallons: number;
  weight: number;
  priceInitial?: number;
  priceAverage?: number;
  priceMax?: number;
  inStock?: boolean;
  popular?: boolean;
  rating?: number;
  reviewCount?: number;
  images: string[];
  imagesIsoModels?: string[];
  colors: string[];
  description: { en: string; es: string; pt: string };
  features: { en: string[]; es: string[]; pt: string[] };
}

const _poolFeatures = {
  en: ['Non-slip steps', 'Salt system ready', 'LED-ready', 'Heater compatible'],
  es: ['Escalones antideslizantes', 'Lista para sistema de sal', 'Listo para LED', 'Compatible con calentador'],
  pt: ['Degraus antiderrapantes', 'Pronta para sistema de sal', 'Pronto para LED', 'Compatível com aquecedor'],
};

const _beachFeatures = {
  en: [..._poolFeatures.en, 'Beach entry', 'Tanning ledge'],
  es: [..._poolFeatures.es, 'Entrada de playa', 'Repisa para bronceado'],
  pt: [..._poolFeatures.pt, 'Entrada de praia', 'Plataforma de bronzeamento'],
};

const _freeformFeatures = {
  en: [..._poolFeatures.en, 'Freeform design'],
  es: [..._poolFeatures.es, 'Diseño de forma libre'],
  pt: [..._poolFeatures.pt, 'Design de forma livre'],
};

const _largeExtra = {
  en: 'Spillover spa option',
  es: 'Opción de spa con derrame',
  pt: 'Opção de spa com transbordamento',
};

const _spaFeatures = {
  en: ['Hydrotherapy jets', 'Heated', 'Standalone or add-on', 'Year-round use'],
  es: ['Chorros de hidroterapia', 'Calefaccionado', 'Independiente o complemento', 'Uso durante todo el año'],
  pt: ['Jatos de hidroterapia', 'Aquecido', 'Independente ou complemento', 'Uso durante todo o ano'],
};

const _ledgeFeatures = {
  en: ['Tanning ledge', 'Shallow water area', 'Standalone or add-on', 'LED-ready'],
  es: ['Repisa para bronceado', 'Zona de agua poco profunda', 'Independiente o complemento', 'Listo para LED'],
  pt: ['Plataforma de bronzeamento', 'Área de água rasa', 'Independente ou complemento', 'Pronto para LED'],
};

function withLarge(f: { en: string[]; es: string[]; pt: string[] }) {
  return {
    en: [...f.en, _largeExtra.en],
    es: [...f.es, _largeExtra.es],
    pt: [...f.pt, _largeExtra.pt],
  };
}

const _shapeDesc = {
  rectangle: {
    en: 'with clean lines and efficient use of space',
    es: 'con líneas limpias y uso eficiente del espacio',
    pt: 'com linhas limpas e uso eficiente do espaço',
  },
  freeform: {
    en: 'with organic curves that create a natural, resort-like feel',
    es: 'con curvas orgánicas que crean un ambiente natural estilo resort',
    pt: 'com curvas orgânicas que criam um ambiente natural estilo resort',
  },
  'beach-entry': {
    en: 'featuring a beach entry for safe, gradual water access',
    es: 'con entrada de playa para acceso seguro y gradual al agua',
    pt: 'com entrada de praia para acesso seguro e gradual à água',
  },
} as const;

function poolDesc(
  name: string, code: string, w: string, l: string, d: string,
  cap: number, shape: PoolShape,
) {
  const s = _shapeDesc[shape];
  return {
    en: `The ${name} (${code}) is a ${w} × ${l} fiberglass pool ${s.en}, with a depth of ${d} and a capacity of ${cap.toLocaleString()} gallons.`,
    es: `La ${name} (${code}) es una piscina de fibra de vidrio de ${w} × ${l} ${s.es}, con una profundidad de ${d} y una capacidad de ${cap.toLocaleString()} galones.`,
    pt: `A ${name} (${code}) é uma piscina de fibra de vidrio de ${w} × ${l} ${s.pt}, com profundidade de ${d} e capacidade de ${cap.toLocaleString()} galões.`,
  };
}

function spaDesc(name: string, code: string, w: string, l: string, d: string, cap: number) {
  return {
    en: `The ${name} (${code}) is a ${w} × ${l} fiberglass spa with a depth of ${d}, holding ${cap.toLocaleString()} gallons. Designed for relaxation and hydrotherapy.`,
    es: `El ${name} (${code}) es un spa de fibra de vidrio de ${w} × ${l} con profundidad de ${d}, con capacidad de ${cap.toLocaleString()} galones. Diseñado para relajación e hidroterapia.`,
    pt: `O ${name} (${code}) é um spa de fibra de vidrio de ${w} × ${l} com profundidade de ${d}, com capacidade de ${cap.toLocaleString()} galões. Projetado para relaxamento e hidroterapia.`,
  };
}

function ledgeDesc(name: string, code: string, w: string, l: string, d: string, cap: number) {
  return {
    en: `The ${name} (${code}) is a ${w} × ${l} tanning ledge with a depth of ${d}, holding ${cap.toLocaleString()} gallons. Perfect for shallow water relaxation and lounging.`,
    es: `El ${name} (${code}) es una repisa para bronceado de ${w} × ${l} con profundidad de ${d}, con capacidad de ${cap.toLocaleString()} galones. Perfecta para relajación en agua poco profunda.`,
    pt: `O ${name} (${code}) é uma plataforma de bronzeamento de ${w} × ${l} com profundidade de ${d}, com capacidade de ${cap.toLocaleString()} galões. Perfeita para relaxamento em água rasa.`,
  };
}

export const pools: Pool[] = [
  {
    slug: 'r1-neblina-grande',
    name: 'Neblina Grande',
    modelCode: 'R1',
    productClass: 'pool',
    shape: 'rectangle',
    sizeCategory: 'upTo16',
    lengthFt: 16, widthFt: 8, depthFt: 5,
    dimensionsText: { width: "8'", length: "16'", depth: "5'" },
    waterVolumeGallons: 3500, weight: 1500,
    images: [
      '/iso-models/Pools/Neblina-Grande/Showroom/Neblina-Grande_Blythewood_11-1.avif',
      '/iso-models/Pools/Neblina-Grande/Showroom/IMG_5452-scaled.webp',
      '/iso-models/Pools/Neblina-Grande/rShowroom/Neblina-Grande-8.jpg.JPEG.webp',
      '/iso-models/Pools/Neblina-Grande/Showroom/Neblina-Grande-Tropical-Blue-1.-AquaPat-2024.webp',
    ],
    imagesIsoModels: [
      '/iso-models/Pools/Neblina-Grande/Neblina-Grande-plan.png',
      '/iso-models/Pools/Neblina-Grande/Neblina-Grande-iso.png',
      '/iso-models/Pools/Neblina-Grande/Neblina-Grande-iso-2.png',
      '/iso-models/Pools/Neblina-Grande/Neblina-Grande-Pool-FBs.webp',
      // '/iso-models/Pools/Neblina-Grande/neblina-grande-tech.png',
    ],
    colors: poolColorNames,
    description: poolDesc('Neblina Grande', 'R1', "8'", "16'", "5'", 3500, 'rectangle'),
    features: _poolFeatures,
  },
  {
    slug: 'r4-cali-cove',
    name: 'Cali Cove',
    modelCode: 'R4',
    productClass: 'pool',
    shape: 'freeform',
    sizeCategory: '22plus',
    lengthFt: 22.67, widthFt: 11.5, depthFt: 5,
    dimensionsText: { width: '11\'6"', length: '22\'8"', depth: '10"-3\'6"-5\'' },
    waterVolumeGallons: 7000, weight: 2500,
    images: [
      '/iso-models/Pools/Cali-Cove/Showroom/Cali-Cove-9.25.25.avif',
      '/iso-models/Pools/Cali-Cove/Showroom/couple-in-cocktail-pool-at-night2.avif',
      '/iso-models/Pools/Cali-Cove/Showroom/Cali-Cove-LSP.webp',
    ],
    imagesIsoModels: [
      '/iso-models/Pools/Cali-Cove/Cali-Cove-plan.png',
      '/iso-models/Pools/Cali-Cove/Cali-Cove-iso.png',
      '/iso-models/Pools/Cali-Cove/Cali-Cove-iso-2.png',
      // '/iso-models/Pools/Cali-Cove/Cali-Cove-tech.png',
    ],
    colors: poolColorNames,
    description: poolDesc('Cali Cove', 'R4', '11\'6"', '22\'8"', '10"-3\'6"-5\'', 7000, 'freeform'),
    features: withLarge(_freeformFeatures),
  },
  {
    slug: 'r5-costa-rica',
    name: 'Costa Rica',
    modelCode: 'R5',
    productClass: 'pool',
    shape: 'freeform',
    sizeCategory: '22plus',
    lengthFt: 25, widthFt: 12, depthFt: 5.5,
    dimensionsText: { width: "12'", length: "25'", depth: '3\'5"-5\'6"' },
    waterVolumeGallons: 7000, weight: 2500,
    images: [
      '/iso-models/Pools/Costa-Rica/Showroom/Costa-Rica-GPT.webp',
      '/iso-models/Pools/Costa-Rica/Showroom/costa-rica-sky-blue-compressed.webp',
      '/iso-models/Pools/Costa-Rica/Showroom/Costa-Rica-18.jpg',
      '/iso-models/Pools/Costa-Rica/Showroom/Costa-Rica-Cumba-Spa-Gray-compressed.webp',
    ],
    imagesIsoModels: [
      '/iso-models/Pools/Costa-Rica/Costa-Rica-Pool-plan.png',
      '/iso-models/Pools/Costa-Rica/Costa-Rica-Pool-iso.png',
      '/iso-models/Pools/Costa-Rica/Costa-Rica-Pool-iso-2.png',
      // '/iso-models/Pools/Costa-Rica/Costa-Rica-Pool-tech.png',
    ],
    colors: poolColorNames,
    description: poolDesc('Costa Rica', 'R5', "12'", "25'", '3\'5"-5\'6"', 7000, 'freeform'),
    features: withLarge(_freeformFeatures),
    popular: true,
  },
  {
    slug: 'r10-costa-beach',
    name: 'Costa Beach',
    modelCode: 'R10',
    productClass: 'pool',
    shape: 'beach-entry',
    sizeCategory: '22plus',
    lengthFt: 27, widthFt: 12, depthFt: 5.5,
    dimensionsText: { width: "12'", length: "27'", depth: '10"-3\'6"-5\'6"' },
    waterVolumeGallons: 7000, weight: 2800,
    images: [
      '/iso-models/Pools/Costa-Beach/Showroom/Costa-Beach-9.30.avif',
      '/iso-models/Pools/Costa-Beach/Showroom/Costa-Beach-69.webp',
      '/iso-models/Pools/Costa-Beach/Showroom/img_2533-1.webp',
    ],
    imagesIsoModels: [
      '/iso-models/Pools/Costa-Beach/Costa-Beach-plan.png',
      '/iso-models/Pools/Costa-Beach/Costa-Beach-iso.png',
      '/iso-models/Pools/Costa-Beach/Costa-Beach-iso-2.png',
      // '/iso-models/Pools/Costa-Beach/Costa-Beach-tech.png',
    ],
    colors: poolColorNames,
    description: poolDesc('Costa Beach', 'R10', "12'", "27'", '10"-3\'6"-5\'6"', 7000, 'beach-entry'),
    features: withLarge(_beachFeatures),
  },
  {
    slug: 'r11-neblina-beach',
    name: 'Neblina Beach',
    modelCode: 'R11',
    productClass: 'pool',
    shape: 'beach-entry',
    sizeCategory: '16to22',
    lengthFt: 20, widthFt: 12, depthFt: 5,
    dimensionsText: { width: "12'", length: "20'", depth: '10"-5\'' },
    waterVolumeGallons: 7000, weight: 2300,
    images: [
      '/iso-models/Pools/Neblina-Beach/Showroom/Neblina-Beach-9.25.25.avif',
      '/iso-models/Pools/Neblina-Beach/Showroom/Neblina-Beach-9.25.25-2.avif',
      '/iso-models/Pools/Neblina-Beach/Showroom/Neblina-Grande-Tropical-Blue-1.-AquaPat-2024.webp',
    ],
    imagesIsoModels: [
      '/iso-models/Pools/Neblina-Beach/Neblina-Beach-plan.png',
      '/iso-models/Pools/Neblina-Beach/Neblina-Beach-iso.png',
      '/iso-models/Pools/Neblina-Beach/Neblina-Beach-iso-2.png',
      '/iso-models/Pools/Neblina-Beach/Neblina-Beach-tech.png',
      '/iso-models/Pools/Neblina-Beach/Neblina-Beach-with-Markup.webp',
    ],
    colors: poolColorNames,
    description: poolDesc('Neblina Beach', 'R11', "12'", "20'", '10"-5\'', 7000, 'beach-entry'),
    features: _beachFeatures,
  },
  {
    slug: 'r3-colombian-cove',
    name: 'Colombian Cove',
    modelCode: 'R3',
    productClass: 'pool',
    shape: 'freeform',
    sizeCategory: '22plus',
    lengthFt: 26.33, widthFt: 11.5, depthFt: 5.33,
    dimensionsText: { width: '11\'6"', length: '26\'4"', depth: '10"-3\'6"-5\'4"' },
    waterVolumeGallons: 7500, weight: 3000,
    images: [
      '/iso-models/Pools/Colombian-Cove/Showroom/Colombian-Cove-BJB-scaled.avif',
      '/iso-models/Pools/Colombian-Cove/Showroom/colombian-cove-pat-compressed.webp',
      '/iso-models/Pools/Colombian-Cove/Showroom/img_1965-1.webp',
    ],
    imagesIsoModels: [
      '/iso-models/Pools/Colombian-Cove/Columbian-Cove-plan.png',
      '/iso-models/Pools/Colombian-Cove/Columbian-Cove-iso.png',
      '/iso-models/Pools/Colombian-Cove/Columbian-Cove-iso-2.png',
      // '/iso-models/Pools/Colombian-Cove/Columbian-Cove-tech.png',
    ],
    colors: poolColorNames,
    description: poolDesc('Colombian Cove', 'R3', '11\'6"', '26\'4"', '10"-3\'6"-5\'4"', 7500, 'freeform'),
    features: withLarge(_freeformFeatures),
  },
  {
    slug: 'r2-colombian',
    name: 'Colombian',
    modelCode: 'R2',
    productClass: 'pool',
    shape: 'rectangle',
    sizeCategory: '22plus',
    lengthFt: 26.33, widthFt: 11.42, depthFt: 5.33,
    dimensionsText: { width: '11\'5"', length: '26\'4"', depth: '3\'6"-5\'4"' },
    waterVolumeGallons: 8000, weight: 3000,
    images: [
      '/iso-models/Pools/Colombian/Showroom/Colombian-9.25-1.avif',
      '/iso-models/Pools/Colombian/Showroom/Columbian-Beach-10.13.25.png',
    ],
    imagesIsoModels: [
      '/iso-models/Pools/Colombian/Columbian-Pool-plan.png',
      '/iso-models/Pools/Colombian/Columbian-Pool-iso.png',
      '/iso-models/Pools/Colombian/Columbian-Pool-iso-2.png',
      // '/iso-models/Pools/Colombian/Columbian-Pool-tech.png',
    ],
    colors: poolColorNames,
    description: poolDesc('Colombian', 'R2', '11\'5"', '26\'4"', '3\'6"-5\'4"', 8000, 'rectangle'),
    features: withLarge(_poolFeatures),
  },
  {
    slug: 'r9-colombian-beach',
    name: 'Colombian Beach',
    modelCode: 'R9',
    productClass: 'pool',
    shape: 'beach-entry',
    sizeCategory: '22plus',
    lengthFt: 32, widthFt: 11.5, depthFt: 5.33,
    dimensionsText: { width: '11\'6"', length: "32'", depth: '10"-3\'6"-5\'4"' },
    waterVolumeGallons: 9000, weight: 3300,
    images: [
      '/iso-models/Pools/Colombian-Beach/Showroom/Columbian-Beach.png',
      '/iso-models/Pools/Colombian-Beach/Showroom/Colombian.avif',
      '/iso-models/Pools/Colombian-Beach/Showroom/Colombian-Beach-ECL.png',
    ],
    imagesIsoModels: [
      '/iso-models/Pools/Colombian-Beach/Columbian-Beach-plan.png',
      '/iso-models/Pools/Colombian-Beach/Columbian-Beach-iso.png',
      '/iso-models/Pools/Colombian-Beach/Columbian-Beach-iso-2.png',      
      '/iso-models/Pools/Colombian-Beach/Columbian-Beach-FBs.png',
      // '/iso-models/Pools/Colombian-Beach/Columbian-Beach-tech.png',
    ],
    colors: poolColorNames,
    description: poolDesc('Colombian Beach', 'R9', '11\'6"', "32'", '10"-3\'6"-5\'4"', 9000, 'beach-entry'),
    features: withLarge(_beachFeatures),
  },
  {
    slug: 'r6-roatan',
    name: 'Roatan',
    modelCode: 'R6',
    productClass: 'pool',
    shape: 'freeform',
    sizeCategory: '22plus',
    lengthFt: 30, widthFt: 14, depthFt: 5.92,
    dimensionsText: { width: "14'", length: "30'", depth: '3\'5"-5\'11"' },
    waterVolumeGallons: 10000, weight: 3000,
    images: [
      '/iso-models/Pools/Roatan/Showroom/Roatan-11.12-2.avif',
      '/iso-models/Pools/Roatan/Showroom/Roatan-8.jpg.JPEG.webp',
      '/iso-models/Pools/Roatan/Showroom/img_2285-1.webp',
    ],
    imagesIsoModels: [
      '/iso-models/Pools/Roatan/Roatan-Pool-plan.png',
      '/iso-models/Pools/Roatan/Roatan-Pool-iso.png',
      // '/iso-models/Pools/Roatan/Roatan-Pool-tech.png',
    ],
    colors: poolColorNames,
    description: poolDesc('Roatan', 'R6', "14'", "30'", '3\'5"-5\'11"', 10000, 'freeform'),
    features: withLarge(_freeformFeatures),
    popular: true,
  },
  {
    slug: 'r12-roatan-beach',
    name: 'Roatan Beach',
    modelCode: 'R12',
    productClass: 'pool',
    shape: 'beach-entry',
    sizeCategory: '22plus',
    lengthFt: 35, widthFt: 14, depthFt: 5.92,
    dimensionsText: { width: "14'", length: "35'", depth: '10"-3\'6"-5\'11"' },
    waterVolumeGallons: 10000, weight: 3800,
    images: [
      '/iso-models/Pools/Roatan-Beach/Showroom/Roatan-Beach-Deland-FL.avif',
      '/iso-models/Pools/Roatan-Beach/Showroom/Roatan-Beach-Dove-Gray-at-night-installed-Carlos-2024.webp',
      '/iso-models/Pools/Roatan-Beach/Showroom/Roatan-Beach-White-ECL.webp',
    ],
    imagesIsoModels: [
      '/iso-models/Pools/Roatan-Beach/Roatan-Beach-plan.png',
      '/iso-models/Pools/Roatan-Beach/Roatan-Beach-iso.png',
      '/iso-models/Pools/Roatan-Beach/Roatan-Beach-iso-2.png',
      // '/iso-models/Pools/Roatan-Beach/Roatan-Beach-tech.png',
    ],
    colors: poolColorNames,
    description: poolDesc('Roatan Beach', 'R12', "14'", "35'", '10"-3\'6"-5\'11"', 10000, 'beach-entry'),
    features: withLarge(_beachFeatures),
  },
  {
    slug: 'r7-brasilia',
    name: 'Brasilia',
    modelCode: 'R7',
    productClass: 'pool',
    shape: 'rectangle',
    sizeCategory: '22plus',
    lengthFt: 30, widthFt: 14, depthFt: 6,
    dimensionsText: { width: "14'", length: "30'", depth: '3\'6"-6\'' },
    waterVolumeGallons: 11500, weight: 3500,
    images: [
      '/iso-models/Pools/Brasilia/Showroom/Brasilia_Sky_Blue.png',
      '/iso-models/Pools/Brasilia/Showroom/Brasilia-Another.webp',
      '/iso-models/Pools/Brasilia/Showroom/Brasilia-Another-2.webp',
      '/iso-models/Pools/Brasilia/Showroom/Brasilia-Rands.avif',
      '/iso-models/Pools/Brasilia/Showroom/Brasilia-Set-N-Stone.webp',
      '/iso-models/Pools/Brasilia/Showroom/Brasilia-scaled.webp',
    ],
    imagesIsoModels: [
      // '/iso-models/Pools/Brasilia/Brasilia-Tech.png',
      '/iso-models/Pools/Brasilia/Brasilia-Pool-FBs.png',
    ],
    colors: poolColorNames,
    description: poolDesc('Brasilia', 'R7', "14'", "30'", '3\'6"-6\'', 11500, 'rectangle'),
    features: withLarge(_poolFeatures),
    popular: true,
  },
  {
    slug: 'r8-belize',
    name: 'Belize',
    modelCode: 'R8',
    productClass: 'pool',
    shape: 'freeform',
    sizeCategory: '22plus',
    lengthFt: 29, widthFt: 14, depthFt: 6,
    dimensionsText: { width: "14'", length: "29'", depth: "4'-6'" },
    waterVolumeGallons: 11500, weight: 3500,
    images: [
      '/iso-models/Pools/Belize/Showroom/Belize-Danny-B-11.4.25.avif',
      '/iso-models/Pools/Belize/Showroom/Belize-Installed-8-1-rotated.webp',
      '/iso-models/Pools/Belize/Showroom/Quatro-Rio-Belize-1.webp',
    ],
    imagesIsoModels: [
      '/iso-models/Pools/Belize/Belize-Pool-plan.png',
      '/iso-models/Pools/Belize/Belize-Pool-iso.png',
      // '/iso-models/Pools/Belize/Belize-Tech.png',
    ],
    colors: poolColorNames,
    description: poolDesc('Belize', 'R8', "14'", "29'", "4'-6'", 11500, 'freeform'),
    features: withLarge(_freeformFeatures),
  },
  {
    slug: 'r13-colombian-resort',
    name: 'Colombian Resort',
    modelCode: 'R13',
    productClass: 'pool',
    shape: 'freeform',
    sizeCategory: '22plus',
    lengthFt: 33, widthFt: 12, depthFt: 5.33,
    dimensionsText: { width: "12'", length: "33'", depth: '3\'5"-5\'4"' },
    waterVolumeGallons: 7100, weight: 3000,
    images: [
      '/iso-models/Pools/Colombian-Resort/Showroom/Colombian-Resort-Compressed.webp',
      '/iso-models/Pools/Colombian-Resort/Showroom/Colombian-Resort-2.webp',
    ],
    imagesIsoModels: [
      // '/iso-models/Pools/Colombian-Resort/Columbia-Resort-tech.png',
    ],
    colors: poolColorNames,
    description: poolDesc('Colombian Resort', 'R13', "12'", "33'", '3\'5"-5\'4"', 7100, 'freeform'),
    features: withLarge(_freeformFeatures),
  },
  {
    slug: 'r14-nova',
    name: 'Nova',
    modelCode: 'R14',
    productClass: 'pool',
    shape: 'rectangle',
    sizeCategory: 'upTo16',
    lengthFt: 14, widthFt: 7, depthFt: 4,
    dimensionsText: { width: "7'", length: "14'", depth: "4'" },
    waterVolumeGallons: 2500, weight: 1500,
    images: [
      '/iso-models/Pools/Nova/Showroom/Nova-MW.webp',
    ],
    imagesIsoModels: [
      '/iso-models/Pools/Nova/Nova.jpg',
    ],
    colors: poolColorNames,
    description: poolDesc('Nova', 'R14', "7'", "14'", "4'", 2500, 'rectangle'),
    features: _poolFeatures,
  },
  {
    slug: 'r15-solaris',
    name: 'Solaris',
    modelCode: 'R15',
    productClass: 'pool',
    shape: 'rectangle',
    sizeCategory: '16to22',
    lengthFt: 20, widthFt: 10, depthFt: 4.5,
    dimensionsText: { width: "10'", length: "20'", depth: '4\'6"' },
    waterVolumeGallons: 4500, weight: 2200,
    images: [
      '/iso-models/Pools/Solaris/Showroom/Solaris-MW-2.webp',
    ],
    imagesIsoModels: [
      '/iso-models/Pools/Solaris/Solaris.jpg',
    ],
    colors: poolColorNames,
    description: poolDesc('Solaris', 'R15', "10'", "20'", '4\'6"', 4500, 'rectangle'),
    features: _poolFeatures,
  },
  {
    slug: 'rs1-quatro',
    name: 'Quatro',
    modelCode: 'RS1',
    productClass: 'spa',
    shape: 'rectangle',
    sizeCategory: 'spa',
    lengthFt: 8, widthFt: 8, depthFt: 3.5,
    dimensionsText: { width: "8'", length: "8'", depth: '3\'6"' },
    waterVolumeGallons: 800, weight: 500,
    images: [
      '/iso-models/Spas/Quatro/Showroom/RS1_2.jpg',
      '/iso-models/Spas/Quatro/Showroom/RS1_2.2.jpg',
      '/iso-models/Spas/Quatro/Showroom/Quatro.png',
      '/iso-models/Spas/Quatro/Showroom/Quatro-Spa-Installed.jpg',
      '/iso-models/Spas/Quatro/Showroom/Quatro-2.png',
      '/iso-models/Spas/Quatro/Showroom/Quatro-Spa-1.jpg',
    ],
    imagesIsoModels: [
      '/iso-models/Spas/Quatro/Quatro-Spa-plan.png',
      '/iso-models/Spas/Quatro/Quatro-Spa-iso.png',
      // '/iso-models/Spas/Quatro/Quatro-Spa-tech.png',
    ],
    colors: poolColorNames,
    description: spaDesc('Quatro', 'RS1', "8'", "8'", '3\'6"', 800),
    features: _spaFeatures,
  },
  {
    slug: 'rs2-cumba',
    name: 'Cumba',
    modelCode: 'RS2',
    productClass: 'spa',
    shape: 'rectangle',
    sizeCategory: 'spa',
    lengthFt: 8, widthFt: 8, depthFt: 3.58,
    dimensionsText: { width: "8'", length: "8'", depth: '3\'7"' },
    waterVolumeGallons: 800, weight: 400,
    images: [
       '/iso-models/Spas/Cumba/Showroom/Cumba-Spa.jpg',
       '/iso-models/Spas/Cumba/Showroom/RS2.jpeg',
       '/iso-models/Spas/Cumba/Showroom/Cumba-2.png',
    ],
    imagesIsoModels: [
      '/iso-models/Spas/Cumba/Cumba-Spa-plan.png',
      '/iso-models/Spas/Cumba/Cumba-Spa-iso.png',
      // '/iso-models/Spas/Cumba/Cumba-Spa-tech.png',
    ],
    colors: poolColorNames,
    description: spaDesc('Cumba', 'RS2', "8'", "8'", '3\'7"', 800),
    features: _spaFeatures,
  },
  {
    slug: 'rs3-neblina',
    name: 'Neblina',
    modelCode: 'RS3',
    productClass: 'spa',
    shape: 'rectangle',
    sizeCategory: 'spa',
    lengthFt: 10, widthFt: 8, depthFt: 3.5,
    dimensionsText: { width: "8'", length: "10'", depth: '3\'6"' },
    waterVolumeGallons: 950, weight: 800,
    images: [
      '/iso-models/Spas/Neblina/Showroom/RS3_1.1.jpg',
      '/iso-models/Spas/Neblina/Showroom/RS3_1.2.jpg',
      '/iso-models/Spas/Neblina/Showroom/RS3_1.3.jpg',
      '/iso-models/Spas/Neblina/Showroom/RS3_1.4.jpg',
      '/iso-models/Spas/Neblina/Showroom/RS3_1.5.jpg',
      '/iso-models/Spas/Neblina/Showroom/RS3_2.jpeg',
      '/iso-models/Spas/Neblina/Showroom/RS3_3.jpeg',
    ],
    imagesIsoModels: [
      '/iso-models/Spas/Neblina/Neblina-Spa-plan.png',
      '/iso-models/Spas/Neblina/Neblina-Spa-iso.png',
     // '/iso-models/Spas/Neblina/Neblina-Spa-tech.png',
    ],
    colors: poolColorNames,
    description: spaDesc('Neblina', 'RS3', "8'", "10'", '3\'6"', 950),
    features: _spaFeatures,
  },
  {
    slug: 'rl1-natal-ledge',
    name: 'Natal Ledge',
    modelCode: 'RL1',
    productClass: 'ledge',
    shape: 'rectangle',
    sizeCategory: 'ledge',
    lengthFt: 8, widthFt: 8, depthFt: 0.83,
    dimensionsText: { width: "8'", length: "8'", depth: '10"' },
    waterVolumeGallons: 250, weight: 200,
    images: [
      '/iso-models/Ledges/Natal-Ledge/Showroom/RL1.png',
    ],
    imagesIsoModels: [      
      '/iso-models/Ledges/Natal-Ledge/Natal-Tan-Ledge-plan.png',
      '/iso-models/Ledges/Natal-Ledge/Natal-Tan-Ledge-iso.png',
      // '/iso-models/Ledges/Natal-Ledge/Natal-Tan-Ledge-tech.png',
    ],
    colors: poolColorNames,
    description: ledgeDesc('Natal Ledge', 'RL1', "8'", "8'", '10"', 250),
    features: _ledgeFeatures,
  },
  {
    slug: 'rl2-rio-ledge',
    name: 'Rio Ledge',
    modelCode: 'RL2',
    productClass: 'ledge',
    shape: 'rectangle',
    sizeCategory: 'ledge',
    lengthFt: 10, widthFt: 8, depthFt: 0.83,
    dimensionsText: { width: "8'", length: "10'", depth: '10"' },
    waterVolumeGallons: 400, weight: 250,
    images: [
      '/iso-models/Ledges/Rio-Ledge/Showroom/RL2.jpg',
    ],
    imagesIsoModels: [
      '/iso-models/Ledges/Rio-Ledge/Rio-Tan-Ledge-plan.png',
      '/iso-models/Ledges/Rio-Ledge/Rio-Tan-Ledge-iso.png',
     // '/iso-models/Ledges/Rio-Ledge/Rio-Tan-Ledge-tech.png',
    ],
    colors: poolColorNames,
    description: ledgeDesc('Rio Ledge', 'RL2', "8'", "10'", '10"', 400),
    features: _ledgeFeatures,
  },
];

export function getPoolBySlug(slug: string): Pool | undefined {
  return pools.find((p) => p.slug === slug);
}

export function getPoolByCode(code: string): Pool | undefined {
  return pools.find((p) => p.modelCode.toLowerCase() === code.toLowerCase());
}

export function getPoolsBySize(size: string): Pool[] {
  if (size === 'all' || !size) return pools;
  return pools.filter((p) => p.sizeCategory === size);
}

export function getFeaturedPools(): Pool[] {
  return pools.filter((p) => p.popular).slice(0, 3);
}

export function getAllShapes(): PoolShape[] {
  return ['rectangle', 'freeform', 'beach-entry'];
}

export function getAllProductClasses(): ProductClass[] {
  return ['pool', 'spa', 'ledge'];
}

export type ShowroomZone = 'miami-dade' | 'broward' | 'palm-beach' | 'other';
export type ShowroomStyle = 'family' | 'resort' | 'lap' | 'compact';

export interface ShowroomProject {
  id: number;
  title: string;
  location: string;
  zone: ShowroomZone;
  size: string;
  sizeCategory: 'upTo16' | '16to22' | '22plus';
  style: ShowroomStyle;
  description?: string;
  image: string;
  modelCode?: string;
}

const _showroomMeta: { slug: string; zone: ShowroomZone; style: ShowroomStyle; location: string }[] = [
  { slug: 'r1-neblina-grande', zone: 'miami-dade', style: 'compact', location: 'Miami, FL' },
  { slug: 'r2-colombian', zone: 'broward', style: 'lap', location: 'Boca Raton, FL' },
  { slug: 'r3-colombian-cove', zone: 'miami-dade', style: 'resort', location: 'Miami, FL' },
  { slug: 'r4-cali-cove', zone: 'broward', style: 'resort', location: 'Fort Lauderdale, FL' },
  { slug: 'r5-costa-rica', zone: 'palm-beach', style: 'resort', location: 'Palm Beach, FL' },
  { slug: 'r6-roatan', zone: 'palm-beach', style: 'resort', location: 'Palm Beach, FL' },
  { slug: 'r7-brasilia', zone: 'miami-dade', style: 'family', location: 'Miami, FL' },
  { slug: 'r8-belize', zone: 'broward', style: 'family', location: 'Fort Lauderdale, FL' },
  { slug: 'r9-colombian-beach', zone: 'miami-dade', style: 'family', location: 'Miami, FL' },
  { slug: 'r10-costa-beach', zone: 'miami-dade', style: 'resort', location: 'Coral Gables, FL' },
  { slug: 'r11-neblina-beach', zone: 'broward', style: 'family', location: 'Kendall, FL' },
  { slug: 'r12-roatan-beach', zone: 'other', style: 'resort', location: 'Orlando, FL' },
  { slug: 'r13-colombian-resort', zone: 'other', style: 'resort', location: 'Naples, FL' },
  { slug: 'r14-nova', zone: 'miami-dade', style: 'compact', location: 'Miami, FL' },
  { slug: 'r15-solaris', zone: 'broward', style: 'family', location: 'Boca Raton, FL' },
  { slug: 'rs1-quatro', zone: 'miami-dade', style: 'compact', location: 'Miami, FL' },
  { slug: 'rs2-cumba', zone: 'broward', style: 'compact', location: 'Fort Lauderdale, FL'},
  { slug: 'rs3-neblina', zone: 'miami-dade', style: 'compact', location: 'Miami, FL'},
];

export const showroomProjects: ShowroomProject[] = _showroomMeta
  .map((meta, i): ShowroomProject | null => {
    const pool = getPoolBySlug(meta.slug);
    if (!pool || !pool.images || pool.images.length === 0) return null;
    const sizeCat = pool.sizeCategory === 'upTo16' || pool.sizeCategory === '16to22' || pool.sizeCategory === '22plus'
      ? pool.sizeCategory
      : 'upTo16';
    return {
      id: i + 1,
      title: pool.name,
      location: meta.location,
      zone: meta.zone,
      size: `${pool.lengthFt}ft`,
      sizeCategory: sizeCat,
      style: meta.style,
      description: pool.description.en,
      image: pool.images[0],
      modelCode: pool.modelCode,
    };
  })
  .filter((p): p is ShowroomProject => p !== null);