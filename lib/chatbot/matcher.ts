import { knowledgeBase, type KnowledgeEntry, type ChatLocale } from './knowledge-base';

// Language indicator words — words unique enough to each language to detect it
const LANG_INDICATORS: Record<ChatLocale, Set<string>> = {
  en: new Set([
    'hello', 'hi', 'hey', 'bye', 'goodbye', 'thanks', 'thank', 'please',
    'yes', 'yeah', 'no', 'nope', 'pool', 'pools', 'price', 'pricing', 'cost',
    'warranty', 'install', 'installation', 'maintenance', 'concrete', 'vinyl',
    'fiberglass', 'spa', 'ledge', 'color', 'showroom', 'financing', 'permit',
    'quote', 'free', 'about', 'company', 'how', 'what', 'when', 'where',
    'why', 'who', 'which', 'custom', 'customize', 'diy', 'home', 'value',
    'rectangle', 'benefits', 'advantages', 'contact', 'phone', 'email',
    'whatsapp', 'address', 'hours', 'service', 'area', 'available',
    'models', 'styles', 'shapes', 'sizes', 'features', 'standard',
  ]),
  es: new Set([
    'hola', 'buenas', 'buenos', 'dias', 'tardes', 'noches', 'adios', 'chao',
    'gracias', 'favor', 'si', 'claro', 'vale', 'piscina', 'piscinas',
    'precio', 'precios', 'costo', 'cuesta', 'garantia', 'instalacion', 'mantenimiento',
    'concreto', 'vinilo', 'fibra', 'vidrio', 'repisa', 'repisas', 'colores',
    'financiamiento', 'financiacion', 'permiso', 'permisos', 'cotizacion',
    'gratis', 'empresa', 'compania', 'como', 'cual', 'cuando', 'donde',
    'quien', 'porque', 'personalizar', 'personalizado', 'mejoras', 'azulejo',
    'iluminacion', 'calentador', 'rectangulo', 'beneficios', 'ventajas',
    'contacto', 'telefono', 'correo', 'direccion', 'horarios', 'servicio',
    'disponibles', 'modelos', 'estilos', 'formas', 'caracteristicas',
    'estandar', 'fijate', 'oye', 'mira', 'necesito', 'saber', 'quisiera',
    'gustaria', 'dime', 'cuentame', 'ayudame', 'puedes', 'ayudar', 'ayuda',
    'pregunta', 'genial', 'perfecto',
  ]),
  pt: new Set([
    'ola', 'oi', 'bom', 'boa', 'dia', 'tarde', 'noite', 'tchau',
    'obrigado', 'obrigada', 'valeu', 'sim', 'tudo', 'bem', 'piscina',
    'piscinas', 'preco', 'custo', 'custa', 'garantia', 'instalacao', 'manutencao',
    'concreto', 'vinil', 'fibra', 'vidro', 'plataforma', 'plataformas',
    'cor', 'cores', 'financiamento', 'permiso', 'cotacao', 'gratis',
    'empresa', 'como', 'qual', 'quando', 'onde', 'quem', 'porque',
    'personalizar', 'personalizado', 'melhorias', 'azulejo', 'iluminacao',
    'aquecedor', 'retangulo', 'beneficios', 'vantagens', 'contato',
    'telefone', 'email', 'whatsapp', 'endereco', 'horarios', 'servico',
    'disponiveis', 'modelos', 'estilos', 'formas', 'tamanhos',
    'caracteristicas', 'padrao', 'preciso', 'saber', 'gostaria', 'diga',
    'olha', 'veja', 'pode', 'ajudar', 'ajuda', 'pergunta', 'otimo',
    'perfeito', 'eai', 'opa', 'salve',
  ]),
};

const STOPWORDS: Record<ChatLocale, Set<string>> = {
  en: new Set([
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'can', 'need', 'i', 'you', 'he',
    'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my',
    'your', 'his', 'its', 'our', 'their', 'this', 'that', 'these', 'those',
    'what', 'which', 'who', 'whom', 'whose', 'when', 'why', 'how',
    'to', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'about', 'as',
    'into', 'like', 'through', 'after', 'over', 'between', 'out', 'against',
    'during', 'without', 'before', 'under', 'around', 'among', 'and', 'or',
    'but', 'not', 'no', 'nor', 'so', 'than', 'too', 'very', 'just', 'offer',
  ]),
  es: new Set([
    'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'es', 'son',
    'era', 'eran', 'ser', 'estar', 'esta', 'este', 'estos', 'estas',
    'tiene', 'tengo', 'tener', 'hacer', 'puede', 'pueden', 'como', 'que',
    'de', 'del', 'en', 'y', 'o', 'por', 'para', 'con', 'sin', 'sobre',
    'mi', 'tu', 'su', 'nuestro', 'me', 'te', 'se', 'le', 'les', 'lo',
    'al', 'no', 'si', 'muy', 'mas', 'pero', 'cuando', 'quien',
    'cual', 'cuanto', 'a', 'e', 'u', 'o', 'ni', 'tan', 'todo', 'toda',
  ]),
  pt: new Set([
    'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas', 'e', 'ou', 'mas',
    'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas',
    'por', 'para', 'com', 'sem', 'sobre', 'que', 'como', 'quando',
    'quem', 'qual', 'quanto', 'e', 'ser', 'estar', 'tem',
    'tem', 'pode', 'podem', 'fazer', 'meu', 'minha', 'seu', 'sua',
    'nosso', 'nossa', 'me', 'te', 'se', 'lhe', 'lhes', 'lo', 'la',
    'los', 'las', 'nao', 'sim', 'muito', 'mais', 'mas', 'tudo', 'todo',
  ]),
};

const CONVERSATIONAL_ENTRY_PREFIXES = ['greeting-', 'farewell-', 'thanks', 'phrase-'];
const LOCALES: ChatLocale[] = ['en', 'es', 'pt'];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function rawTokens(query: string): string[] {
  return normalize(query).match(/[a-z0-9]+/g) || [];
}

function canonicalToken(token: string): string {
  if (token.length > 5 && token.endsWith('ies')) return `${token.slice(0, -3)}y`;
  if (token.length > 4 && token.endsWith('s')) return token.slice(0, -1);
  return token;
}

function tokenize(query: string, locale: ChatLocale): string[] {
  return rawTokens(query)
    .filter((token) => token.length > 1 && !STOPWORDS[locale].has(token))
    .map(canonicalToken);
}

function keywordTokens(keyword: string, locale: ChatLocale): string[] {
  return tokenize(keyword, locale);
}

function isConversationalEntry(entry: KnowledgeEntry): boolean {
  return CONVERSATIONAL_ENTRY_PREFIXES.some((prefix) => entry.id.startsWith(prefix));
}

function entryKeywords(entry: KnowledgeEntry, locale: ChatLocale): Array<{ phrase: string; weight: number }> {
  return LOCALES.flatMap((keywordLocale) =>
    entry.keywords[keywordLocale]
      .map((keyword) => normalize(keyword))
      .filter(Boolean)
      .map((phrase) => ({ phrase, weight: keywordLocale === locale ? 1 : 0.55 })),
  );
}

function buildTokenFrequency(): Map<string, number> {
  const frequency = new Map<string, number>();

  for (const entry of knowledgeBase) {
    const seen = new Set<string>();
    for (const locale of LOCALES) {
      for (const keyword of entry.keywords[locale]) {
        for (const token of keywordTokens(keyword, locale)) seen.add(token);
      }
    }
    for (const token of seen) frequency.set(token, (frequency.get(token) ?? 0) + 1);
  }

  return frequency;
}

const TOKEN_FREQUENCY = buildTokenFrequency();

function tokenWeight(token: string): number {
  const frequency = TOKEN_FREQUENCY.get(token) ?? knowledgeBase.length;
  return 1 + Math.log((knowledgeBase.length + 1) / (frequency + 1));
}

function editDistance(left: string, right: string): number {
  const row = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex++) {
    let diagonal = row[0];
    row[0] = leftIndex;
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex++) {
      const above = row[rightIndex];
      row[rightIndex] = left[leftIndex - 1] === right[rightIndex - 1]
        ? diagonal
        : 1 + Math.min(diagonal, above, row[rightIndex - 1]);
      diagonal = above;
    }
  }

  return row[right.length];
}

function hasFuzzyKeywordMatch(token: string, keywords: Array<{ phrase: string; weight: number }>): boolean {
  if (token.length < 5) return false;

  const candidates = new Set(
    keywords.flatMap(({ phrase }) => phrase.split(' ').map(canonicalToken)).filter((candidate) => candidate.length >= 5),
  );
  const maxDistance = token.length >= 8 ? 3 : 1;
  return [...candidates].some((candidate) => editDistance(token, candidate) <= maxDistance);
}

function scoreEntry(entry: KnowledgeEntry, query: string, tokens: string[], locale: ChatLocale): number {
  const keywords = entryKeywords(entry, locale);
  const queryPadded = ` ${normalize(query)} `;
  const matchedTokens = new Set<string>();
  let score = 0;

  for (const { phrase, weight } of keywords) {
    const phraseTokens = keywordTokens(phrase, locale);
    if (phraseTokens.length <= 1) continue;

    if (queryPadded.includes(` ${phrase} `)) {
      score += (50 + phraseTokens.length * 6) * weight;
      phraseTokens.forEach((token) => matchedTokens.add(token));
      continue;
    }

    const queryPhraseMatch = phraseTokens.every((phraseToken) =>
      tokens.some((token) => token === phraseToken || hasFuzzyKeywordMatch(token, [{ phrase: phraseToken, weight }])),
    );
    if (queryPhraseMatch) score += (50 + phraseTokens.length * 6) * weight * 0.85;
  }

  const directKeywordTokens = new Set<string>();
  for (const { phrase } of keywords) {
    const phraseTokens = keywordTokens(phrase, locale);
    if (phraseTokens.length === 1) directKeywordTokens.add(phraseTokens[0]);
  }

  for (const token of tokens) {
    if (matchedTokens.has(token)) continue;
    const exactMatch = keywords.some(({ phrase }) => keywordTokens(phrase, locale).includes(token));
    const fuzzyMatch = !exactMatch && hasFuzzyKeywordMatch(token, keywords);
    if (exactMatch) {
      score += directKeywordTokens.has(token) ? tokenWeight(token) * 3 : tokenWeight(token);
    } else if (fuzzyMatch) {
      score += tokenWeight(token) * 0.85;
    }
  }

  return score;
}

function hasExactPhrase(entry: KnowledgeEntry, query: string): boolean {
  const queryPadded = ` ${normalize(query)} `;
  return LOCALES.some((locale) => entry.keywords[locale].some((keyword) => {
    const phrase = normalize(keyword);
    return keywordTokens(keyword, locale).length > 1 && queryPadded.includes(` ${phrase} `);
  }));
}

function suggestionFor(entry: KnowledgeEntry, locale: ChatLocale): string {
  return entry.keywords[locale].find((keyword) => keywordTokens(keyword, locale).length > 1)
    ?? entry.keywords[locale][0];
}

/**
 * Detect the language of the query based on indicator words.
 * Falls back to the site locale if no indicators are found.
 */
export function detectLocale(query: string, fallback: ChatLocale): ChatLocale {
  const tokens = rawTokens(query);
  if (tokens.length === 0) return fallback;

  const scores: Record<ChatLocale, number> = { en: 0, es: 0, pt: 0 };
  for (const token of tokens) {
    for (const locale of LOCALES) {
      if (LANG_INDICATORS[locale].has(token)) scores[locale]++;
    }
  }

  const highestScore = Math.max(...LOCALES.map((locale) => scores[locale]));
  if (highestScore === 0) return fallback;

  const winners = LOCALES.filter((locale) => scores[locale] === highestScore);
  return winners.length === 1 ? winners[0] : fallback;
}

export type MatchStatus = 'matched' | 'ambiguous' | 'unmatched';

export interface MatchCandidate {
  id: string;
  prompt: string;
}

export interface MatchResult {
  status: MatchStatus;
  entry: KnowledgeEntry | null;
  score: number;
  detectedLocale: ChatLocale;
  candidates: MatchCandidate[];
}

/**
 * Find the best matching knowledge entry for a query.
 * Detects the query language automatically and searches keywords across
 * all locales, returning the answer in the detected language.
 */
export function findBestMatch(query: string, siteLocale: ChatLocale): MatchResult {
  const detectedLocale = detectLocale(query, siteLocale);
  const tokens = tokenize(query, detectedLocale);
  if (tokens.length === 0) {
    return { status: 'unmatched', entry: null, score: 0, detectedLocale, candidates: [] };
  }

  const hasDomainIntent = knowledgeBase.some(
    (entry) => !isConversationalEntry(entry) && scoreEntry(entry, query, tokens, detectedLocale) > 0,
  );
  const hasUnknownTopicTokens = tokens.some((token) => !TOKEN_FREQUENCY.has(token));
  const scoredEntries = knowledgeBase
    .filter((entry) => (hasDomainIntent || hasUnknownTopicTokens) ? !isConversationalEntry(entry) : true)
    .map((entry) => ({ entry, score: scoreEntry(entry, query, tokens, detectedLocale) }))
    .filter(({ score }) => score > 0)
    .toSorted((left, right) => right.score - left.score);

  const best = scoredEntries[0];
  if (!best || best.score < 1.5) {
    return { status: 'unmatched', entry: null, score: best?.score ?? 0, detectedLocale, candidates: [] };
  }

  const candidates = scoredEntries.slice(0, 3).map(({ entry }) => ({
    id: entry.id,
    prompt: suggestionFor(entry, detectedLocale),
  }));
  const runnerUp = scoredEntries[1];
  const ambiguityMargin = Math.max(0.75, best.score * 0.25);
  if (
    runnerUp
    && !hasExactPhrase(best.entry, query)
    && runnerUp.score >= 1.5
    && best.score - runnerUp.score < ambiguityMargin
  ) {
    return { status: 'ambiguous', entry: null, score: best.score, detectedLocale, candidates };
  }

  return { status: 'matched', entry: best.entry, score: best.score, detectedLocale, candidates };
};