import { describe, expect, it } from 'vitest';
import { detectLocale, findBestMatch } from './matcher';

describe('detectLocale', () => {
  it('keeps the visible site locale when language indicators are tied', () => {
    expect(detectLocale('piscina', 'pt')).toBe('pt');
  });

  it('detects Spanish and Portuguese queries independently from the site locale', () => {
    expect(detectLocale('¿Cuánto cuesta una piscina?', 'en')).toBe('es');
    expect(detectLocale('Quanto custa uma piscina?', 'en')).toBe('pt');
  });
});

describe('findBestMatch', () => {
  it.each([
    ['How long does installation take?', 'en', 'faq-installation-time'],
    ['¿Cuánto cuesta una piscina?', 'es', 'info-pricing'],
    ['Quanto custa uma piscina?', 'pt', 'info-pricing'],
    ['What warranty do you offer?', 'en', 'faq-warranty'],
    ['Que garantias existen?', 'es', 'faq-warranty'],
    ['¿Qué glrantia ofrecen?', 'es', 'faq-warranty'],
    ['Talk me about the querrenty', 'en', 'faq-warranty'],
    ['¿Dónde queda el showroom?', 'es', 'about-showroom'],
  ] as const)('matches %s to %s', (query, locale, expectedId) => {
    const result = findBestMatch(query, locale);

    expect(result.status).toBe('matched');
    expect(result.entry?.id).toBe(expectedId);
  });

  it.each([
    ['What makes fiberglass pools different?', 'faq-fiberglass-different'],
    ['What warranty do you offer?', 'faq-warranty'],
    ['How long does fiberglass pool installation take?', 'faq-installation-time'],
    ['Are fiberglass pools easier to maintain?', 'faq-maintenance'],
    ['How do fiberglass pools compare to concrete pools?', 'faq-fiberglass-vs-concrete'],
    ['Can I customize my fiberglass pool?', 'faq-customize'],
    ['Who installs your fiberglass pools?', 'faq-who-installs'],
    ['Do you handle permits?', 'faq-permits'],
    ['Can I see pools in person?', 'about-showroom'],
    ['Do you offer financing?', 'faq-financing'],
    ['What areas do you serve?', 'about-service-area'],
    ['Are rectangle fiberglass pools a good choice for modern backyards?', 'faq-rectangle'],
    ['Can a fiberglass pool increase home value?', 'faq-home-value'],
    ['Do you offer a DIY option?', 'faq-diy'],
    ['Why choose our fiberglass pools from FLFG Pools?', 'faq-why-flfg'],
  ] as const)('covers the FAQ question: %s', (question, expectedId) => {
    const result = findBestMatch(question, 'en');

    expect(result.status).toBe('matched');
    expect(result.entry?.id).toBe(expectedId);
  });

  it.each([
    ['¿Puedo ver las piscinas en persona?', 'es', 'about-showroom'],
    ['Posso ver as piscinas pessoalmente?', 'pt', 'about-showroom'],
    ['¿Por qué elegir nuestras piscinas de fibra de vidrio?', 'es', 'faq-why-flfg'],
    ['Por que escolher as piscinas de fibra de vidro?', 'pt', 'faq-why-flfg'],
  ] as const)('covers the localized FAQ question: %s', (question, locale, expectedId) => {
    const result = findBestMatch(question, locale);
    result;

    expect(result.status).toBe('matched');
    expect(result.entry?.id).toBe(expectedId);
  });

  it('prioritizes a commercial question over a greeting in the same message', () => {
    const result = findBestMatch('Hola, ¿cuánto cuesta una piscina?', 'es');

    expect(result.status).toBe('matched');
    expect(result.entry?.id).toBe('info-pricing');
  });

  it('asks for clarification when two supported topics are equally relevant', () => {
    const result = findBestMatch('I need permits for installation', 'en');

    expect(result.status).toBe('ambiguous');
    expect(result.entry).toBeNull();
    expect(result.candidates.map((candidate) => candidate.id)).toEqual(
      expect.arrayContaining(['faq-permits', 'faq-installation-time']),
    );
  });

  it('does not use generic conversation words as a contact answer', () => {
    const result = findBestMatch('Talk me about the querrenty', 'en');
    const genericResult = findBestMatch('Talk me about this', 'en');

    expect(result.entry?.id).not.toBe('contact-phone');
    expect(genericResult.status).toBe('unmatched');
  });

  it('keeps valid contact questions mapped to the phone entry', () => {
    const result = findBestMatch('How can I contact you?', 'en');

    expect(result.status).toBe('matched');
    expect(result.entry?.id).toBe('contact-phone');
  });

  it('does not invent an answer for an unsupported subject', () => {
    const result = findBestMatch('Can you tell me about rocket launches?', 'en');

    expect(result.status).toBe('unmatched');
    expect(result.entry).toBeNull();
  });

  it.each([
    ['pools', 'en', 'products-pools'],
    ['pool', 'en', 'products-pools'],
    ['spas', 'en', 'products-spas'],
    ['colors', 'en', 'products-colors'],
    ['pricing', 'en', 'info-pricing'],
    ['warranty', 'en', 'faq-warranty'],
    ['financing', 'en', 'faq-financing'],
    ['piscinas', 'es', 'products-pools'],
    ['piscina', 'es', 'products-pools'],
    ['precios', 'es', 'info-pricing'],
    ['garantia', 'es', 'faq-warranty'],
  ] as const)('matches single-word query %s to %s', (query, locale, expectedId) => {
    const result = findBestMatch(query, locale);

    expect(result.status).toBe('matched');
    expect(result.entry?.id).toBe(expectedId);
  });
});
