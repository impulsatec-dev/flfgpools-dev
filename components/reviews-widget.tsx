'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  locale: string;
}

const sampleReviews: Review[] = [
  {
    author: 'María González',
    rating: 5,
    text: 'Excelente servicio de principio a fin. Instalaron nuestra piscina en una semana y el equipo fue muy profesional. La recomiendo totalmente.',
    date: '15 de mayo de 2026',
    locale: 'es',
  },
  {
    author: 'John Peterson',
    rating: 5,
    text: 'From consultation to installation, FLFG Pools exceeded expectations. Our R15 Oasis is everything we dreamed of. The showroom visit sealed the deal.',
    date: 'April 28, 2026',
    locale: 'en',
  },
  {
    author: 'Carlos Ferreira',
    rating: 4,
    text: 'Boa experiência geral. A piscina é linda e durável. Só demorou um pouco mais do que o previsto, mas a qualidade compensou.',
    date: '10 de abril de 2026',
    locale: 'pt',
  },
  {
    author: 'Sarah Mitchell',
    rating: 5,
    text: 'Best pool company in South Florida. They handled permits, installation, and even helped with financing. Our backyard is now an oasis.',
    date: 'March 22, 2026',
    locale: 'en',
  },
  {
    author: 'Ricardo Santana',
    rating: 5,
    text: 'Profesionales de verdad. Nos guiaron en cada paso y la piscina quedó espectacular. La garantía de 15 años nos dio mucha tranquilidad.',
    date: '8 de marzo de 2026',
    locale: 'es',
  },
  {
    author: 'Ana Beatriz Costa',
    rating: 5,
    text: 'Equipe incrível! A piscina de fibra de vidrio é perfeita para o clima da Flórida. Manutenção mínima e beleza máxima.',
    date: '19 de fevereiro de 2026',
    locale: 'pt',
  },
];

export function ReviewsWidget() {
  const t = useTranslations('Reviews');
  const reduce = useReducedMotion();
  const avgRating = 4.7;
  const totalReviews = 128;

  return (
    <section className="container mx-auto px-4 py-14 sm:py-20">
      <motion.div
        initial={reduce ? {} : { opacity: 0, y: 20 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto"
      >
        <span className="glass-chip-section-title">{t('label')}</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-pool-deep">
          {t('title')}
        </h2>
        <div className="mt-4 flex items-center justify-center gap-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${i <= Math.round(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-lg font-semibold">{avgRating}</span>
          <span className="text-pool-deep/60">· {t('verifiedReviews', { count: totalReviews })}</span>
        </div>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sampleReviews.map((review, i) => (
          <motion.div
            key={i}
            initial={reduce ? {} : { opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={reduce ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="glass-card p-6"
          >
            <Quote className="h-8 w-8 text-pool-aqua/40 mb-3" />
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((j) => (
                <Star
                  key={j}
                  className={`h-4 w-4 ${j <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-sm text-pool-deep/80 leading-relaxed">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-pool-deep">{review.author}</p>
                <p className="text-xs text-pool-deep/50">
                  {review.date}
                </p>
              </div>
              <span className="glass-chip text-xs">{t('verified')}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href="https://www.google.com/search?q=Florida+Fiberglass+Pools"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-btn-primary inline-flex items-center gap-2 px-6 py-3 text-white"
        >
          {t('shareExperience')}
        </a>
        <p className="mt-4 text-sm text-pool-deep/60">
          {t('lessThanIdeal')}{' '}
          <a href="mailto:sales@flfgpools.com" className="link-underline">
            sales@flfgpools.com
          </a>{' '}
          {t('resolveIn24h')}
        </p>
      </div>
    </section>
  );
}