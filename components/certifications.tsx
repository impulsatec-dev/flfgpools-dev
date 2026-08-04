import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SectionReveal, RevealItem } from '@/lib/motion/scroll-components';

const certifications = [
  { src: '/certi-brand/PSN-PNG-380x380.png', key: 'psn' },
  { src: '/certi-brand/pmg-150x150.jpg', key: 'pmg' },
  { src: '/certi-brand/New-ES_Mark_BLK-1-380x380.jpg', key: 'esMark' },
  { src: '/certi-brand/LOGO-POOL-AND-HOT-1-380x380.png', key: 'phta' },
  // { src: '/certi-brand/SELO-10-ANOS.png', key: 'tenYears' },
  { src: '/about/13-years.png', key: '13Years' },
] as const;

const financing = [
  { src: '/certi-brand/hearthfinance.bak.jpg', key: 'hearth', href: 'https://www.hearth.com' },
  { src: '/about/hfs-logo-new.webp', key: 'hfs', href: 'https://www.hfsfinancial.net/' },
] as const;

export function Certifications({ variant = 'home' }: { variant?: 'home' | 'about' }) {
  const t = useTranslations('Certifications');

  return (
    <SectionReveal>
      <section className="container mx-auto px-4 py-14 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <RevealItem>
            <span className="glass-chip-section-title">{t('label')}</span>
          </RevealItem>
          <RevealItem custom={1}>
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-display font-bold text-pool-deep">
              {t('title')}
            </h2>
          </RevealItem>
          <RevealItem custom={2}>
            <p className="mt-4 text-pool-deep/70">{t('subtitle')}</p>
          </RevealItem>
        </div>

        {/* Certifications grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
          {certifications.map((cert, i) => (
            <RevealItem key={cert.key} custom={i}>
              <div className="glass-card p-4 sm:p-6 flex flex-col items-center justify-center h-full w-[150px] sm:w-[170px]">
                <Image
                  src={cert.src}
                  alt={t(`items.${cert.key}.alt`)}
                  width={180}
                  height={180}
                  className="h-16 w-16 sm:h-20 sm:w-20 object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                />
                <p className="mt-3 text-xs sm:text-sm font-medium text-pool-deep/60 text-center">
                  {t(`items.${cert.key}.name`)}
                </p>
              </div>
            </RevealItem>
          ))}



          
        </div>

        {/* Financing partners */}
        <RevealItem custom={5}>
          <div className="glass-panel p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="text-center sm:text-left">
              <p className="text-2xl sm:text-2xl md:text-xl font-semibold font-display uppercase tracking-wide text-pool-deep">
                {t('financingLabel')}
              </p>
              <p className="mt-1 text-lg text-pool-deep/80">{t('financingText')}</p>
            </div>
            {financing.map((fin) => (
              <a
                key={fin.key}
                href={fin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 flex items-center justify-center transition-all hover:scale-105"
              >
                <Image
                  src={fin.src}
                  alt={t(`items.${fin.key}.alt`)}
                  width={286}
                  height={286}
                  style={{ width: 'auto', height: 'auto' }}
                  className="h-9 w-auto"
                  priority
                />
              </a>
            ))}
          </div>
        </RevealItem>
      </section>
    </SectionReveal>
  );
}
