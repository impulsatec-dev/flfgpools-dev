'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  aspectClass = 'aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]',
  className = '',
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);

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

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') touchStartX.current = event.clientX;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch' || touchStartX.current === null) return;
    const distance = event.clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 45) return;
    if (distance > 0) prev();
    else next();
  };

  if (count === 0) return null;

  return (
    <div
      className={`glass-card relative self-start overflow-hidden ${className}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        touchStartX.current = null;
      }}
    >
      {/* Slides */}
      <div className={`relative overflow-hidden ${aspectClass} touch-pan-y`}>
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
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </AnimatePresence>
        {/* Gradient overlay for controls legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Prev / Next arrows */}
      {count > 1 && (
        <div className="flex min-h-14 items-center justify-between gap-3 border-t border-pool-deep/10 bg-white/60 px-3 py-2 backdrop-blur-sm sm:px-4">
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className="glass-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-pool-deep transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pool-deep/40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 overflow-x-auto py-1" aria-label="Image navigation">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i, i > index ? 1 : -1)}
                className={`h-2 shrink-0 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pool-deep/40 ${
                  i === index
                    ? 'w-6 bg-pool-deep'
                    : 'w-2 bg-pool-deep/30 hover:bg-pool-deep/60'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className="glass-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-pool-deep transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pool-deep/40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
