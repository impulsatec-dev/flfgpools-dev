'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type CarouselImage = {
  src: string;
  alt: string;
};

export type CarouselProps = {
  images: CarouselImage[];
  /** Autoplay interval in ms. Set to 0 to disable. Default: 4000 */
  autoplayMs?: number;
  /** Tailwind aspect ratio classes, e.g. "aspect-[4/3]". Default: "aspect-[4/3] sm:aspect-[5/4]" */
  aspectClass?: string;
  /** Extra classes for the outer container */
  className?: string;
};

export function Carousel({
  images,
  autoplayMs = 4000,
  aspectClass = 'aspect-[4/3] sm:aspect-[5/4]',
  className = '',
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const count = images.length;

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => go(index + 1, 1), [index, go]);
  const prev = useCallback(() => go(index - 1, -1), [index, go]);

  useEffect(() => {
    if (autoplayMs <= 0 || count <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((p) => (p + 1) % count);
    }, autoplayMs);
    return () => clearInterval(timer);
  }, [autoplayMs, count]);

  if (count === 0) return null;

  return (
    <div className={`glass-card overflow-hidden relative group self-start h-fit ${className}`}>
      {/* Slides */}
      <div className={`relative ${aspectClass}`}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={index}
            src={images[index].src}
            alt={images[index].alt}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient overlay for controls legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Prev / Next arrows */}
      <button
        type="button"
        aria-label="Previous image"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass-btn flex items-center justify-center text-pool-deep opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next image"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full glass-btn flex items-center justify-center text-pool-deep opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to image ${i + 1}`}
            onClick={() => go(i, i > index ? 1 : -1)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index
                ? 'w-6 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
