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
    modelImage: '/models-colors/bahama-blue/bahama-blue-compressed.webp',
    // /models-colors/bahama-blue/Bahama-Blue-Water-Swatch-compressed.webp
    colorChip: '/models-colors/bahama-blue/bahama-blue-compressed.webp',
    referenceImages: [
      '/models-colors/bahama-blue/reference/ChatGPT-Image-Oct-14-2025-10_20_44-AM-1024x683.png',
      '/models-colors/bahama-blue/reference/img_1965-1-756x1024.webp',
    ],
    gradient: 'from-teal-300 to-blue-500',
  },
  {
    name: 'Caribbean Blue',
    modelImage: '/models-colors/caribbean-blue/caribbean-blue-compressed-964x1024.webp',
    // '/models-colors/caribbean-blue/caribbean-blue-water-graphic-compressed.webp',
    colorChip: '/models-colors/caribbean-blue/caribbean-blue-compressed-964x1024.webp',
    referenceImages: [
      '/models-colors/caribbean-blue/reference/Costa-Rica-GPT-1024x683.png',
      '/models-colors/caribbean-blue/reference/Costa-Rica-Rio-Swansboro-2-edited-1024x768.avif',
    ],
    gradient: 'from-cyan-300 to-blue-600',
  },
  {
    name: 'Diamond Gray',
    modelImage: '/models-colors/diamond-gray/gray-diamond-color-chip-compressed.webp',
    // '/models-colors/diamond-gray/Diamond-Gray-Water-Color.webp',
    colorChip: '/models-colors/diamond-gray/gray-diamond-color-chip-compressed.webp',
    referenceImages: [
      '/models-colors/diamond-gray/reference/Costa-Rica-Cumba-Spa-Gray-compressed-1024x768.webp',
      '/models-colors/diamond-gray/reference/columbian-beach-grey-compressed.webp',
    ],
    gradient: 'from-slate-200 to-slate-500',
  },
  {
    name: 'Blue Abyss',
    modelImage: '/models-colors/blue-abyss/Blue-Abyss-Color-Chip-compressed.webp',
    // '/models-colors/blue-abyss/Blue-Abyss-water-color.webp',
    colorChip: '/models-colors/blue-abyss/Blue-Abyss-Color-Chip-compressed.webp',
    referenceImages: [
      '/models-colors/blue-abyss/reference/blue-abyss-travertine-patio-1024x684.webp',
    ],
    gradient: 'from-blue-800 to-blue-950',
  },
  {
    name: 'Sky Blue',
    modelImage: '/models-colors/sky-blue/sky-blue-color-chip-compressed.webp',
    // '/models-colors/sky-blue/sky-blue-water-color-compressed.webp',
    colorChip: '/models-colors/sky-blue/sky-blue-color-chip-compressed.webp',
    referenceImages: [
      '/models-colors/sky-blue/reference/Brasilia_Sky_Blue-1024x768.png',
      '/models-colors/sky-blue/reference/costa-rica-sky-blue-compressed-768x1024.webp',
    ],
    gradient: 'from-sky-200 to-cyan-500',
  },
  {
    name: 'White Ivory',
    modelImage: '/models-colors/white-ivory/white-ivory-pure-white-color-chip-compressed.webp',
    // '/models-colors/white-ivory/White-Ivory-Water-Color.webp',
    colorChip: '/models-colors/white-ivory/white-ivory-pure-white-color-chip-compressed.webp',
    referenceImages: [
      '/models-colors/white-ivory/reference/neblina-beach-white-compressed-768x1024.webp',
      '/models-colors/white-ivory/reference/roatan-beach-white-compressed-768x1024.webp',
    ],
    gradient: 'from-stone-50 to-amber-100',
  },
  {
    name: 'Black Obsidian',
    modelImage: '/models-colors/black-obsidian/black-obsidian-color-chip-compressed.webp',
    // '/models-colors/black-obsidian/black-obsidian-water-color-compressed.webp',
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

const _tanningLedgeFeatures = {
  en: [..._poolFeatures.en, 'Tanning ledge', 'Built-in bench seating'],
  es: [..._poolFeatures.es, 'Repisa para bronceado', 'Asientos de banco integrados'],
  pt: [..._poolFeatures.pt, 'Prainha para bronzeamento', 'Assentos de banco integrados'],
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

const _manufacturerDescriptions = {
  R1: {
    en: 'A compact cocktail pool with a clean rectangular shape, built-in seating, and a flat-bottom layout designed for smaller backyard spaces.',
    es: 'Una piscina tipo cocktail compacta, de forma rectangular limpia, con asientos integrados y fondo plano, diseñada para patios pequeños.',
    pt: 'Uma piscina tipo cocktail compacta, com formato retangular, assentos integrados e fundo plano, projetada para espaços menores no quintal.',
  },
  R2: {
    en: 'A spacious rectangle built for homeowners who want clean lines, open swim space, and a modern backyard layout.',
    es: 'Una piscina rectangular espaciosa para quienes buscan líneas limpias, amplio espacio para nadar y un diseño moderno para el patio.',
    pt: 'Uma piscina retangular espaçosa para quem busca linhas limpas, amplo espaço para nadar e um layout moderno no quintal.',
  },
  R3: {
    en: 'A compact fiberglass pool with a modern rectangle shape, comfortable entry steps, ledge, and inviting space for lounging, cooling off, and everyday backyard enjoyment.',
    es: 'Una piscina compacta de fibra de vidrio con forma rectangular moderna, escalones de entrada cómodos, repisa y un espacio acogedor para descansar, refrescarse y disfrutar del patio todos los días.',
    pt: 'Uma piscina compacta de fibra de vidro com formato retangular moderno, degraus de entrada confortáveis, prainha e espaço convidativo para relaxar, se refrescar e aproveitar o quintal todos os dias.',
  },
  R4: {
    en: 'Compact rectangular pool designed for homeowners who want clean lines, a built-in tanning ledge, and a polished backyard look without choosing an oversized pool.',
    es: 'Piscina rectangular compacta para quienes buscan líneas limpias, una repisa para bronceado integrada y un patio elegante sin elegir una piscina sobredimensionada.',
    pt: 'Piscina retangular compacta para quem busca linhas limpas, uma prainha integrada para bronzeamento e um quintal sofisticado sem escolher uma piscina grande demais.',
  },
  R5: {
    en: 'Mid-size freeform pool designed for homeowners who want a softer backyard shape, comfortable built-in features, and plenty of room for everyday enjoyment.',
    es: 'Piscina mediana de forma libre para quienes buscan una silueta más orgánica, características integradas cómodas y mucho espacio para disfrutarla todos los días.',
    pt: 'Piscina de formato livre e tamanho médio para quem busca um contorno mais suave, recursos integrados confortáveis e bastante espaço para aproveitar todos os dias.',
  },
  R6: {
    en: 'A freeform fiberglass pool with flowing curves, generous swim space, and a relaxed resort-style design for everyday enjoyment.',
    es: 'Una piscina de fibra de vidrio de forma libre, con curvas fluidas, amplio espacio para nadar y un diseño relajado estilo resort para disfrutar todos los días.',
    pt: 'Uma piscina de fibra de vidro de formato livre, com curvas fluidas, amplo espaço para nadar e um design descontraído de resort para aproveitar todos os dias.',
  },
  R7: {
    en: 'A spacious geometric fiberglass pool with generous swim space, a wide entry area, and a clean modern look for larger backyards.',
    es: 'Una piscina geométrica espaciosa de fibra de vidrio, con amplio espacio para nadar, una entrada ancha y un estilo moderno para patios grandes.',
    pt: 'Uma piscina geométrica espaçosa de fibra de vidro, com amplo espaço para nadar, uma entrada larga e um visual moderno para quintais maiores.',
  },
  R8: {
    en: 'A spacious rectangular fiberglass pool with an integrated tanning ledge, generous swim area, and deeper water for active family enjoyment.',
    es: 'Una piscina rectangular espaciosa de fibra de vidrio, con repisa para bronceado integrada, amplia zona de nado y mayor profundidad para el disfrute activo de toda la familia.',
    pt: 'Uma piscina retangular espaçosa de fibra de vidro, com prainha integrada para bronzeamento, ampla área para nadar e maior profundidade para a diversão ativa da família.',
  },
  R9: {
    en: 'A spacious rectangular pool designed for homeowners who want open swim space, built-in lounging comfort, and a polished backyard look.',
    es: 'Una piscina rectangular espaciosa para quienes buscan espacio abierto para nadar, comodidad integrada para descansar y un patio elegante.',
    pt: 'Uma piscina retangular espaçosa para quem busca espaço aberto para nadar, conforto integrado para relaxar e um quintal sofisticado.',
  },
  R10: {
    en: 'A freeform fiberglass pool with a built-in tanning ledge, open swim space, and a relaxed shape designed for backyard living.',
    es: 'Una piscina de fibra de vidrio de forma libre, con repisa para bronceado integrada, espacio abierto para nadar y una forma relajada para disfrutar del patio.',
    pt: 'Uma piscina de fibra de vidro de formato livre, com prainha integrada para bronzeamento, espaço aberto para nadar e um formato descontraído para a vida no quintal.',
  },
  R11: {
    en: 'A compact rectangular pool designed for homeowners who want a smaller pool with built-in lounging, clean lines, and everyday comfort.',
    es: 'Una piscina rectangular compacta para quienes buscan una piscina más pequeña, con espacio integrado para descansar, líneas limpias y comodidad diaria.',
    pt: 'Uma piscina retangular compacta para quem busca uma piscina menor, com espaço integrado para relaxar, linhas limpas e conforto diário.',
  },
  R12: {
    en: 'A spacious freeform fiberglass pool with flowing curves, generous swim space, and an inviting design for active family use and relaxed outdoor living.',
    es: 'Una piscina espaciosa de fibra de vidrio con forma libre, curvas fluidas, amplio espacio para nadar y un diseño acogedor para familias activas y una vida al aire libre relajada.',
    pt: 'Uma piscina espaçosa de fibra de vidro de formato livre, com curvas fluidas, amplo espaço para nadar e um design convidativo para famílias ativas e uma vida ao ar livre descontraída.',
  },
  R13: {
    en: 'A spacious rectangular pool with an integrated spa combination, open swim space, built-in relaxation, and a polished resort-style backyard look.',
    es: 'Una piscina rectangular espaciosa con una combinación de spa integrada, espacio abierto para nadar, zonas integradas de descanso y un patio elegante estilo resort.',
    pt: 'Uma piscina retangular espaçosa com combinação de spa integrada, espaço aberto para nadar, áreas integradas de relaxamento e um quintal sofisticado com estilo de resort.',
  },
  R14: {
    en: 'A compact rectangular fiberglass pool designed for smaller backyards, courtyards, and relaxed everyday enjoyment.',
    es: 'Una piscina compacta rectangular de fibra de vidrio, diseñada para patios pequeños, patios interiores y un disfrute diario relajado.',
    pt: 'Uma piscina retangular compacta de fibra de vidro, projetada para quintais menores, pátios internos e um aproveitamento diário descontraído.',
  },
  R15: {
    en: 'The Solaris fits beautifully into compact yards, courtyards, side-yard spaces, and smaller outdoor living areas where every foot matters.',
    es: 'La Solaris encaja perfectamente en patios compactos, patios interiores, espacios laterales y áreas exteriores pequeñas donde cada pie cuenta.',
    pt: 'A Solaris se encaixa perfeitamente em quintais compactos, pátios internos, espaços laterais e áreas externas menores onde cada pé faz diferença.',
  },
  R16: {
    en: 'Classic rectangular design with a multi-level tanning ledge, open swim space, and comfortable deep-end seating.',
    es: 'Diseño rectangular clásico con una repisa para bronceado de varios niveles, espacio abierto para nadar y cómodos asientos en el extremo profundo.',
    pt: 'Design retangular clássico com prainha para bronzeamento em vários níveis, espaço aberto para nadar e assentos confortáveis na parte funda.',
  },
  R17: {
    en: 'A compact rectangular pool designed for homeowners who want a smaller pool with full-width ledge, clean lines, and everyday comfort.',
    es: 'Una piscina rectangular compacta para quienes buscan una piscina más pequeña, con repisa de ancho completo, líneas limpias y comodidad diaria.',
    pt: 'Uma piscina retangular compacta para quem busca uma piscina menor, com prainha em toda a largura, linhas limpas e conforto diário.',
  },
} as const;

function manufacturerDesc(code: keyof typeof _manufacturerDescriptions) {
  return _manufacturerDescriptions[code];
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
      '/iso-models/Pools/Neblina-Grande/Showroom/Neblina-Grande-8.jpg.JPEG.webp',
      '/iso-models/Pools/Neblina-Grande/Showroom/Neblina-Grande-Tropical-Blue-1.-AquaPat-2024.webp',
    ],
    imagesIsoModels: [
      '/iso-models/Pools/Neblina-Grande/Neblina-Grande-plan.png',
      '/iso-models/Pools/Neblina-Grande/Neblina-Grande-iso.png',
      '/iso-models/Pools/Neblina-Grande/Neblina-Grande-iso-2.png',
      // '/iso-models/Pools/Neblina-Grande/Neblina-Grande-Pool-FBs.webp',
      '/iso-models/Pools/Neblina-Grande/neblina-grande-tech-p.png',
    ],
    colors: poolColorNames,
    description: manufacturerDesc('R1'),
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
      '/iso-models/Pools/Cali-Cove/Cali-Cove-tech-p.png',
    ],
    colors: poolColorNames,
    description: manufacturerDesc('R4'),
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
      '/iso-models/Pools/Costa-Rica/Costa-Rica-tech-p.png',
    ],
    colors: poolColorNames,
    description: manufacturerDesc('R5'),
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
      '/iso-models/Pools/Costa-Beach/Costa-Beach-tech-p.png',
    ],
    colors: poolColorNames,
    description: manufacturerDesc('R10'),
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
      '/iso-models/Pools/Neblina-Beach/Neblina-Beach-tech-p.png',
      '/iso-models/Pools/Neblina-Beach/Neblina-Beach-with-Markup.webp',
    ],
    colors: poolColorNames,
    description: manufacturerDesc('R11'),
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
      '/iso-models/Pools/Colombian-Cove/Colombia-Cove-tech-p.png',
      
    ],
    colors: poolColorNames,
    description: manufacturerDesc('R3'),
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
      '/iso-models/Pools/Colombian/Columbian-Pool-tech-p.png',
    ],
    colors: poolColorNames,
    description: manufacturerDesc('R2'),
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
      // '/iso-models/Pools/Colombian-Beach/Columbian-Beach-FBs.png',
      '/iso-models/Pools/Colombian-Beach/Columbian-Beach-tech-p.png',
    ],
    colors: poolColorNames,
    description: manufacturerDesc('R9'),
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
      '/iso-models/Pools/Roatan/Roatan-Pool-tech-p.png',
    ],
    colors: poolColorNames,
    description: manufacturerDesc('R6'),
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
      '/iso-models/Pools/Roatan-Beach/Roatan-Beach-tech-p.png',
    ],
    colors: poolColorNames,
    description: manufacturerDesc('R12'),
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
      '/iso-models/Pools/Brasilia/Brasilia-Tech-p.png',
      // '/iso-models/Pools/Brasilia/Brasilia-Pool-FBs.png',
    ],
    colors: poolColorNames,
    description: manufacturerDesc('R7'),
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
      '/iso-models/Pools/Belize/Belize-Pool-tech-p.png',
    ],
    colors: poolColorNames,
    description: manufacturerDesc('R8'),
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
      '/iso-models/Pools/Colombian-Resort/Colombian-Resort-tech-p.png',
    ],
    colors: poolColorNames,
    description: manufacturerDesc('R13'),
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
    description: manufacturerDesc('R14'),
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
    description: manufacturerDesc('R15'),
    features: _poolFeatures,
  },
  {
    slug: 'r16-radiant-island',
    name: 'Radiant Island',
    modelCode: 'R16',
    productClass: 'pool',
    shape: 'rectangle',
    sizeCategory: '22plus',
    lengthFt: 30, widthFt: 16, depthFt: 6,
    dimensionsText: { width: "16'", length: "30'", depth: '4\'6"-6\'' },
    surfaceAreaSqft: 480,
    waterVolumeGallons: 14500, weight: 4000,
    images: [
      '/iso-models/Pools/Randiant-Island/Showroom/Radiant-Island.webp',
    ],
    imagesIsoModels: [],
    colors: poolColorNames,
    description: manufacturerDesc('R16'),
    features: _tanningLedgeFeatures,
  },
  {
    slug: 'r17-macaw-cove',
    name: 'Macaw Cove',
    modelCode: 'R17',
    productClass: 'pool',
    shape: 'rectangle',
    sizeCategory: '22plus',
    lengthFt: 23, widthFt: 10, depthFt: 4.5,
    dimensionsText: { width: "10'", length: "23'", depth: '4\'6" flat bottom' },
    surfaceAreaSqft: 230,
    waterVolumeGallons: 3300, weight: 2300,
    images: [
      '/iso-models/Pools/Macaw-Cove/Showroom/Macaw-Cove-Compressed.webp',
    ],
    imagesIsoModels: [],
    colors: poolColorNames,
    description: manufacturerDesc('R17'),
    features: _tanningLedgeFeatures,
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
      '/iso-models/Spas/Quatro/Quatro-Spa-tech-p.png',
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
      '/iso-models/Spas/Cumba/Cumba-Spa-tech-p.png',
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
      '/iso-models/Spas/Neblina/Neblina-Spa-tech-p.png',
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
      '/iso-models/Ledges/Natal-Ledge/Natal-Tan-Ledge-tech-p.png',
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
      '/iso-models/Ledges/Rio-Ledge/Rio-Tan-Ledge-tech-p.png',
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
  { slug: 'r16-radiant-island', zone: 'miami-dade', style: 'family', location: 'Miami, FL'},
  { slug: 'r17-macaw-cove', zone: 'miami-dade', style: 'family', location: 'Miami, FL'},  
  { slug: 'rs1-quatro', zone: 'miami-dade', style: 'compact', location: 'Miami, FL' },
  { slug: 'rs2-cumba', zone: 'broward', style: 'compact', location: 'Fort Lauderdale, FL'},
  { slug: 'rs3-neblina', zone: 'miami-dade', style: 'compact', location: 'Miami, FL'},
  { slug: 'rl1-natal-ledge', zone: 'palm-beach', style: 'family', location: 'West Palm Beach, FL'},
  { slug: 'rl2-rio-ledge', zone: 'palm-beach', style: 'family', location: 'West Palm Beach, FL'},
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