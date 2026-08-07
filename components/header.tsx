'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Phone, Instagram, Facebook, MessageCircle, Globe, ChevronDown } from 'lucide-react';
import { SOCIAL_LINKS } from '@/config/site';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { locales, type Locale } from '@/i18n/routing';

export function Header() {
  const t = useTranslations('Nav');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filterStuck, setFilterStuck] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale() as Locale;
  const isShowroom = pathname.includes('showroom');

  const localeLabels: Record<Locale, string> = {
    en: 'English',
    es: 'Español',
    pt: 'Português',
  };

  const changeLocale = (locale: Locale) => {
    router.replace(pathname, { locale });
    setLangOpen(false);
    setOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onFilterStuck = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setFilterStuck(detail?.stuck ?? false);
    };
    window.addEventListener('showroom-filter-stuck', onFilterStuck);
    return () => window.removeEventListener('showroom-filter-stuck', onFilterStuck);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navItemsBefore = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
  ];

  const navItemsAfter = [
    { href: '/showroom', label: t('showroom') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none',
          open && 'z-[70]',
          scrolled
            ? isShowroom && filterStuck
              ? 'py-1 lg:pt-[4.5rem] lg:pb-1'
              : 'py-1 lg:py-3'
            : 'py-6'
        )}
      >
        <div className="container mx-auto">
          <nav
            className={cn(
              'glass-nav pointer-events-auto',
              scrolled && 'glass-nav-scrolled',
              open && 'invisible'
            )}
          >
            <div className="flex min-w-0 items-center gap-4">
              {/* Logo */}
              <Link href="/" className={cn('flex shrink-0 items-center', scrolled && 'hidden lg:flex')}>
                <Image
                  src="/header/logo-alta.png"
                  alt="FLFG Pools"
                  width={130}
                  height={36}
                  className={cn(
                    'w-auto transition-all duration-300',
                    scrolled ? 'h-8 lg:h-9' : 'h-9 lg:h-10'
                  )}
                  priority
                />
              </Link>

              {/* Desktop nav */}
              <ul className="hidden lg:flex items-center gap-0.5">
                {navItemsBefore.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-sm font-semibold transition-colors',
                        pathname === item.href
                          ? 'bg-pool-aqua text-white'
                          : 'text-pool-deep/80 hover:text-pool-aqua'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {/* Products dropdown */}
                <li className="relative">
                  <button
                    onClick={() => setProductsOpen(!productsOpen)}
                    className={cn(
                      'flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors',
                      pathname.startsWith('/products')
                        ? 'bg-pool-aqua text-white'
                        : 'text-pool-deep/80 hover:text-pool-aqua'
                    )}
                    aria-expanded={productsOpen}
                  >
                    {t('products')}
                    <ChevronDown className={cn('h-3 w-3 transition-transform', productsOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {productsOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setProductsOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full mt-2 z-50 glass-modal rounded-xl py-1 min-w-[160px]"
                        >
                          <Link
                            href="/products"
                            onClick={() => setProductsOpen(false)}
                            className="block px-4 py-2 text-sm font-medium text-pool-deep hover:bg-pool-mist/30 transition-colors"
                          >
                            {t('pools')}
                          </Link>
                          <Link
                            href="/products?size=spa"
                            onClick={() => setProductsOpen(false)}
                            className="block px-4 py-2 text-sm font-medium text-pool-deep hover:bg-pool-mist/30 transition-colors"
                          >
                            {t('spa')}
                          </Link>
                          <Link
                            href="/products?size=ledge"
                            onClick={() => setProductsOpen(false)}
                            className="block px-4 py-2 text-sm font-medium text-pool-deep hover:bg-pool-mist/30 transition-colors"
                          >
                            {t('ledge')}
                          </Link>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </li>
                {navItemsAfter.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-sm font-semibold transition-colors',
                        pathname === item.href
                          ? 'bg-pool-aqua text-white'
                          : 'text-pool-deep/80 hover:text-pool-aqua'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {/* Info dropdown */}
                <li className="relative">
                  <button
                    onClick={() => setInfoOpen(!infoOpen)}
                    className={cn(
                      'flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors',
                      pathname.startsWith('/info')
                        ? 'bg-pool-aqua text-white'
                        : 'text-pool-deep/80 hover:text-pool-aqua'
                    )}
                    aria-expanded={infoOpen}
                  >
                    {t('info')}
                    <ChevronDown className={cn('h-3 w-3 transition-transform', infoOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {infoOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setInfoOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full mt-2 z-50 glass-modal rounded-xl py-1 min-w-[200px]"
                        >
                          <Link
                            href="/info/faqs"
                            onClick={() => setInfoOpen(false)}
                            className="block px-4 py-2 text-sm font-medium text-pool-deep hover:bg-pool-mist/30 transition-colors"
                          >
                            {t('faqs')}
                          </Link>
                          <Link
                            href="/info/pool-benefits"
                            onClick={() => setInfoOpen(false)}
                            className="block px-4 py-2 text-sm font-medium text-pool-deep hover:bg-pool-mist/30 transition-colors"
                          >
                            {t('poolBenefits')}
                          </Link>
                          <Link
                            href="/info/pool-pricing-guide"
                            onClick={() => setInfoOpen(false)}
                            className="block px-4 py-2 text-sm font-medium text-pool-deep hover:bg-pool-mist/30 transition-colors"
                          >
                            {t('poolPricingGuide')}
                          </Link>
                          <Link
                            href="/info/fiberglass-concrete"
                            onClick={() => setInfoOpen(false)}
                            className="block px-4 py-2 text-sm font-medium text-pool-deep hover:bg-pool-mist/30 transition-colors"
                          >
                            {t('fiberglassVsConcrete')}
                          </Link>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </li>
              </ul>

              {/* Language switcher — desktop */}
            <div className="hidden lg:block relative shrink-0">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="glass-chip flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-pool-deep/80 hover:text-pool-aqua transition-colors"
                aria-label="Change language"
                aria-expanded={langOpen}
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="uppercase">{currentLocale}</span>
                <ChevronDown className={cn('h-3 w-3 transition-transform', langOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setLangOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 z-50 glass-modal rounded-xl py-1 min-w-[140px]"
                    >
                      {locales.map((locale) => (
                        <button
                          key={locale}
                          onClick={() => changeLocale(locale)}
                          className={cn(
                            'block w-full text-left px-4 py-2 text-sm font-medium transition-colors',
                            locale === currentLocale
                              ? 'text-pool-aqua bg-pool-mist/50'
                              : 'text-pool-deep hover:bg-pool-mist/30'
                          )}
                        >
                          {localeLabels[locale]}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Social icons — desktop only */}
             <div className="hidden lg:flex shrink-0 items-center gap-1.5">
              <a
                href={SOCIAL_LINKS.instagram}
                aria-label="Instagram"
                className="glass-chip glass-chip-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                aria-label="Facebook"
                className="glass-chip glass-chip-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-3.5 w-3.5" />
              </a>
              <a
                href={`https://wa.me/${SOCIAL_LINKS.whatsapp}`}
                aria-label="WhatsApp"
                className="glass-chip glass-chip-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle  className="h-3.5 w-3.5" />
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/></svg> */}
              </a>
             </div>
            </div>

            

            {/* Phone CTA */}
            {/* <a
              href={`tel:${SOCIAL_LINKS.phone}`}
              className="hidden lg:flex items-center gap-2 glass-btn-primary px-5 py-2 text-sm font-medium text-white"
            >
              <Phone className="h-4 w-4" />
              
            </a> */}

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 shrink-0"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden pointer-events-auto"
          >
            <div
              className="absolute inset-0 bg-pool-deep/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 flex h-dvh max-h-dvh w-80 flex-col overflow-y-auto overscroll-contain glass-modal p-6"
            >
              <div className="sticky top-0 z-10 -mx-2 mb-6 flex shrink-0 items-center justify-between rounded-2xl px-2 py-2 ">
                <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
                  <Image
                    src="/header/logo-alta.png"
                    alt="FLFG Pools"
                    width={190}
                    height={53}
                    className="h-auto w-[190px]"
                    priority
                  />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="shrink-0 rounded-full p-2 text-pool-deep transition-colors hover:bg-pool-mist/50"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <ul className="flex flex-col space-y-2">
                {navItemsBefore.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block px-4 py-3 rounded-xl text-lg font-medium transition-colors',
                        pathname === item.href
                          ? 'bg-pool-aqua text-white'
                          : 'text-pool-deep hover:bg-pool-mist'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {/* Products dropdown — mobile */}
                <li>
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className={cn(
                      'flex items-center justify-between w-full px-4 py-3 rounded-xl text-lg font-medium transition-colors',
                      pathname.startsWith('/products')
                        ? 'bg-pool-aqua text-white'
                        : 'text-pool-deep hover:bg-pool-mist'
                    )}
                  >
                    {t('products')}
                    <ChevronDown className={cn('h-4 w-4 transition-transform', mobileProductsOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <Link
                          href="/products"
                          onClick={() => setOpen(false)}
                          className="block pl-8 pr-4 py-2.5 rounded-lg text-base font-medium text-pool-deep/80 hover:bg-pool-mist transition-colors"
                        >
                          {t('pools')}
                        </Link>
                        <Link
                          href="/products?size=spa"
                          onClick={() => setOpen(false)}
                          className="block pl-8 pr-4 py-2.5 rounded-lg text-base font-medium text-pool-deep/80 hover:bg-pool-mist transition-colors"
                        >
                          {t('spa')}
                        </Link>
                        <Link
                          href="/products?size=ledge"
                          onClick={() => setOpen(false)}
                          className="block pl-8 pr-4 py-2.5 rounded-lg text-base font-medium text-pool-deep/80 hover:bg-pool-mist transition-colors"
                        >
                          {t('ledge')}
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
                {navItemsAfter.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block px-4 py-3 rounded-xl text-lg font-medium transition-colors',
                        pathname === item.href
                          ? 'bg-pool-aqua text-white'
                          : 'text-pool-deep hover:bg-pool-mist'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {/* Info dropdown — mobile */}
                <li>
                  <button
                    onClick={() => setMobileInfoOpen(!mobileInfoOpen)}
                    className={cn(
                      'flex items-center justify-between w-full px-4 py-3 rounded-xl text-lg font-medium transition-colors',
                      pathname.startsWith('/info')
                        ? 'bg-pool-aqua text-white'
                        : 'text-pool-deep hover:bg-pool-mist'
                    )}
                  >
                    {t('info')}
                    <ChevronDown className={cn('h-4 w-4 transition-transform', mobileInfoOpen && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {mobileInfoOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <Link
                          href="/info/faqs"
                          onClick={() => setOpen(false)}
                          className="block pl-8 pr-4 py-2.5 rounded-lg text-base font-medium text-pool-deep/80 hover:bg-pool-mist transition-colors"
                        >
                          {t('faqs')}
                        </Link>
                        <Link
                          href="/info/pool-benefits"
                          onClick={() => setOpen(false)}
                          className="block pl-8 pr-4 py-2.5 rounded-lg text-base font-medium text-pool-deep/80 hover:bg-pool-mist transition-colors"
                        >
                          {t('poolBenefits')}
                        </Link>
                        <Link
                          href="/info/pool-pricing-guide"
                          onClick={() => setOpen(false)}
                          className="block pl-8 pr-4 py-2.5 rounded-lg text-base font-medium text-pool-deep/80 hover:bg-pool-mist transition-colors"
                        >
                          {t('poolPricingGuide')}
                        </Link>
                        <Link
                          href="/info/fiberglass-concrete"
                          onClick={() => setOpen(false)}
                          className="block pl-8 pr-4 py-2.5 rounded-lg text-base font-medium text-pool-deep/80 hover:bg-pool-mist transition-colors"
                        >
                          {t('fiberglassVsConcrete')}
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </ul>
              {/* Language switcher — mobile */}
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-pool-deep/50 mb-2">
                  {t('language')}
                </p>
                <div className="flex gap-2">
                  {locales.map((locale) => (
                    <button
                      key={locale}
                      onClick={() => changeLocale(locale)}
                      className={cn(
                        'flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors',
                        locale === currentLocale
                          ? 'bg-pool-aqua text-white'
                          : 'glass-chip text-pool-deep'
                      )}
                    >
                      {localeLabels[locale]}
                    </button>
                  ))}
                </div>
              </div>
              <a
                href={`tel:${SOCIAL_LINKS.phone}`}
                className="mt-6 flex items-center justify-center gap-2 glass-btn-primary px-5 py-3 text-white"
              >
                <Phone className="h-4 w-4" />
                {SOCIAL_LINKS.phoneDisplay}
              </a>
              <div className="mt-4 flex items-center justify-center gap-3">
                <a
                  href={SOCIAL_LINKS.instagram}
                  aria-label="Instagram"
                  className="glass-chip"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={SOCIAL_LINKS.facebook}
                  aria-label="Facebook"
                  className="glass-chip"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={`https://wa.me/${SOCIAL_LINKS.whatsapp}`}
                  aria-label="WhatsApp"
                  className="glass-chip"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle  className="h-4 w-4" />
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}