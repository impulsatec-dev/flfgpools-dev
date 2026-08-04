'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className="space-y-4">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;

        return (
          <div key={i} className="space-y-3">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              className="glass-card flex w-full items-center gap-3 px-5 py-4 text-left"
            >
              <HelpCircle className="h-5 w-5 shrink-0 text-pool-aqua" />
              <span className="flex-1 font-display text-base font-semibold text-pool-deep sm:text-lg">
                {faq.q}
              </span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-pool-deep/10 bg-pool-deep/5">
                <ChevronDown
                  className={`h-4 w-4 text-pool-deep/70 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${i}`}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={
                    reduce ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="overflow-hidden"
                  style={{ paddingBottom: '0.4rem' }}
                >
                  <motion.div
                    initial={reduce ? false : { x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={reduce ? undefined : { x: -16, opacity: 0 }}
                    transition={
                      reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
                    }
                    className="glass-card ml-8 mt-3 flex items-start gap-4 px-5 py-4 sm:ml-14"
                    style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'}}
                  >
                    <p className="flex-1 text-sm text-pool-deep/90 font-semibold sm:text-base">{faq.a}</p>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-pool-deep/10 bg-pool-deep/5">
                      <MessageCircle className="h-4 w-4 text-pool-deep/70" />
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
