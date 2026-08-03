'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

// === Section Reveal Wrapper ===
export function SectionReveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <section>{children}</section>;
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {children}
    </motion.section>
  );
}

// === Reveal Item ===
export function RevealItem({
  children,
  custom = 0,
  className,
}: {
  children: ReactNode;
  custom?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
        visible: (i: number = 0) => ({
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            delay: i * 0.08,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        }),
      }}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// === Stat Counter ===
import { animate, useInView, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

export function StatCounter({
  to,
  suffix = '+',
  label,
  textValue,
  className,
}: {
  to: number;
  suffix?: string;
  label: string;
  textValue?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce || textValue) {
      setDisplay(to);
      return;
    }

    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });

    return () => controls.stop();
  }, [inView, to, reduce, textValue]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gradient text-center">
      <div className="text-4xl font-bold text-gradient md:text-5xl">
        {textValue ?? `${display.toLocaleString()}${suffix}`}
      </div>
      <div className="mt-1 text-sm text-pool-deep/60">{label}</div>
    </div>
  );
}

// === Parallax Background ===
import { useScroll, useTransform } from 'framer-motion';

export function ParallaxBackground({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  if (!mounted || reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {children}
      </motion.div>
    </div>
  );
}

// === Hero Stagger Container ===
export function HeroReveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
      }}
    >
      {children}
    </motion.div>
  );
}

// === Hero Item — supports custom delay ===
export function HeroItem({
  children,
  custom = 0,
  className,
}: {
  children: ReactNode;
  custom?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
        visible: (i: number = 0) => ({
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            delay: i * 0.1,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          },
        }),
      }}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// === Scroll Indicator — animated mouse / chevron ===
export function ScrollIndicator({ label }: { label: string }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {label}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
    >
      <span className="text-xs tracking-widest uppercase">{label}</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2"
      >
        <motion.div
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-1 h-2 rounded-full bg-white/60"
        />
      </motion.div>
    </motion.div>
  );
}

// === Magnetic Button ===
export function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      style={{ transition: 'transform 0.3s ease' }}
    >
      {children}
    </button>
  );
}