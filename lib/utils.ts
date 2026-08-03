import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const localeMap: Record<string, string> = {
  en: 'en-US',
  es: 'es-US',
  pt: 'pt-BR',
};

export function formatCurrency(amount: number, locale: string = 'en-US'): string {
  const fullLocale = localeMap[locale] || locale;
  return new Intl.NumberFormat(fullLocale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getPoolSizeCategory(lengthFt: number): 'upTo16' | '16to22' | '22plus' | 'spa' {
  if (lengthFt <= 16) return 'upTo16';
  if (lengthFt <= 22) return '16to22';
  return '22plus';
}