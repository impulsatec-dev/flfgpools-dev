'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import type { Locale } from '@/i18n/routing';
import type { ChatLocale } from '@/lib/chatbot/knowledge-base';
import { findBestMatch, detectLocale } from '@/lib/chatbot/matcher';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  link?: string;
  suggestions?: string[];
}

export function Chatbot() {
  const t = useTranslations('Chatbot');
  const currentLocale = useLocale() as Locale;
  const chatLocale: ChatLocale = currentLocale;
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = t.raw('suggestions') as string[];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text?: string) => {
    const query = (text ?? input).trim();
    if (!query) return;

    setMessages((prev) => [...prev, { role: 'user', text: query }]);
    setInput('');

    const result = findBestMatch(query, chatLocale);
    const entry = result.entry;
    if (result.status === 'matched' && entry) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: entry.answer[result.detectedLocale],
          link: entry.link?.[result.detectedLocale],
        },
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: 'bot',
        text: t(result.status === 'ambiguous' ? 'clarify' : 'noMatch'),
        suggestions: result.candidates.length > 0 ? result.candidates.map((candidate) => candidate.prompt) : suggestions,
      },
    ]);
  };

  const handleRestart = () => {
    setMessages([]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <React.Fragment>
      {/* Floating button with pulse ring and mascot */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 18, stiffness: 280 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pool-aqua to-pool-deep shadow-xl shadow-pool-deep/30 transition-transform hover:scale-105 active:scale-95"
            aria-label={t('openLabel')}
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-pool-aqua/30 [animation-duration:3s]" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm overflow-hidden ring-1 ring-white/20">
              <Image
                src="/favicon-flfg.png"
                alt="FLFG"
                width={25}
                height={25}
                className="object-contain"
              />
            </div>
            <Image
              src="/Tobias/Tobias_3/Tobias_3.2.2-Trans.png"
              alt=""
              width={90}
              height={90}
              className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 object-contain drop-shadow-lg"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed bottom-6 right-6 z-50 flex h-[520px] w-[calc(100vw-3rem)] max-w-[380px] flex-col overflow-hidden rounded-glass border border-white/20 bg-gradient-to-b from-[#c5dae4]/90 to-[#a8cfd9]/85 shadow-2xl shadow-pool-deep/20 backdrop-blur-glass"
            role="dialog"
            aria-label={t('title')}
          >
            {/* Header with gradient and online indicator */}
            <div className="relative flex items-center justify-between bg-gradient-to-r from-pool-deep/90 to-pool-deep/70 px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm overflow-hidden ring-1 ring-white/15">
                  <Image
                    src="/favicon-flfg.png"
                    alt="FLFG"
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-bold text-white/95 leading-tight">
                    {t('title')}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-pool-mist/70 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px] shadow-emerald-400/50" />
                    Online
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-1 rounded-full px-2 py-1.5 text-[10px] font-medium text-white/65 transition-all hover:bg-white/10 hover:text-white active:scale-90"
                  aria-label={t('restartLabel')}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>{t('restart')}</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 text-white/50 transition-all hover:bg-white/10 hover:text-white active:scale-90"
                  aria-label={t('closeLabel')}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages area with fixed background */}
            <div className="relative flex-1">
              {/* Fixed background: Tobias_2 when empty, Tobias_1 when messages exist */}
              {messages.length === 0 ? (
                <div
                  className="pointer-events-none absolute inset-0 bg-contain bg-center bg-no-repeat opacity-50"
                  style={{ backgroundImage: "url('/Tobias/Tobias_2/Tobias_2_transparency_shadows.png')", width: "320px", height: "320px", alignContent: "center", marginRight: "30px", marginTop: "6.5rem"}}
                />
              ) : (
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-contain bg-bottom bg-no-repeat opacity-30"
                  style={{ backgroundImage: "url('/Tobias/Tobias_1/Tobias_1.png')", width: "378px", height: "520px", alignContent: "center", marginRight: "30px", marginTop: "6.5rem"}}
                />
              )}

              {/* Scrollable messages on top */}
              <div
                ref={scrollRef}
                className="absolute inset-0 space-y-3 overflow-y-auto px-4 py-4 [scrollbar-width:thin]"
              >
                <div className="relative">
                  {messages.length === 0 && (
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pool-deep/80 ring-1 ring-white/10">
                          <Image
                            src="/favicon-flfg.png"
                            alt=""
                            width={16}
                            height={16}
                            className="object-contain"
                          />
                        </div>
                        <div className="rounded-2xl rounded-tl-sm bg-white/50 px-3.5 py-2.5 text-sm text-pool-deep/85 shadow-sm backdrop-blur-sm">
                          {t('welcome')}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 pl-9">
                        {suggestions.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(s)}
                            className="shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.02em] transition-all duration-300 border whitespace-nowrap flex items-center gap-1.5 bg-white/40 text-pool-deep/80 border-pool-aqua/25 hover:border-pool-aqua/50 hover:bg-pool-aqua/15 hover:text-pool-deep active:scale-95"
                          >
                            <Sparkles className="h-3 w-3 text-pool-aqua/60" />
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                          msg.role === 'user'
                            ? 'rounded-tr-sm bg-gradient-to-br from-pool-aqua/80 to-pool-aqua/60 text-white'
                            : 'rounded-tl-sm bg-white/55 text-pool-deep/85 backdrop-blur-sm'
                        }`}
                      >
                        <p>{msg.text}</p>
                        {msg.link && (
                          <Link
                            href={msg.link}
                            onClick={() => setIsOpen(false)}
                            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-pool-aqua hover:gap-2 transition-all"
                          >
                            {t('learnMore')} →
                          </Link>
                        )}
                        {msg.suggestions && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {msg.suggestions.map((suggestion) => (
                              <button
                                key={suggestion}
                                onClick={() => handleSend(suggestion)}
                                className="rounded-full border border-pool-aqua/30 bg-pool-aqua/10 px-2.5 py-1 text-[11px] font-semibold text-pool-deep/80 transition-colors hover:bg-pool-aqua/20"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Input area */}
            <div className="border-t border-white/15 bg-gradient-to-r from-pool-deep/90 to-pool-deep/70 px-3 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('placeholder')}
                  className="flex-1 rounded-full border border-white/10 bg-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-pool-aqua/50 focus:bg-white/20 focus:outline-none focus:ring-1 focus:ring-pool-aqua/30 transition-all"
                  aria-label={t('placeholder')}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pool-aqua to-pool-aqua/80 text-white shadow-md shadow-pool-aqua/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
                  aria-label={t('send')}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
