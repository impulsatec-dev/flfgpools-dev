'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { poolColors } from '@/lib/pools';
import { cn } from '@/lib/utils';
import { Breadcrumbs } from '@/components/breadcrumbs';

export default function ColorsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Products');

  return (
    <>
      {/* Hero */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Breadcrumbs locale={locale} items={[{ name: 'Info', href: '/info' }, { name: 'Colors', href: '/info/colors' }]} />
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-pool-deep">
          {t('colors.title')}
        </h1>
        <p className="mt-4 text-xl text-pool-deep/70 max-w-2xl">{t('colors.subtitle')}</p>
      </section>

      {/* Pool colors showcase */}
      <section className="container mx-auto px-4 py-16">
        <div className="space-y-16">
          {poolColors.map((color, index) => (
            <div
              key={color.name}
              className={cn(
                'grid md:grid-cols-2 gap-8 items-center',
                index % 2 === 1 ? 'md:grid-flow-col-dense' : ''
              )}
            >
              <div className={cn(
                'order-2 md:order-1',
                index % 2 === 1 ? 'md:order-2' : ''
              )}>
                <div className="relative">
                  <div className="relative w-full rounded-2xl shadow-xl overflow-hidden aspect-[2/1]">
                    <Image
                      src={color.modelImage}
                      alt={`${color.name} pool`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                    <Image
                      src={color.colorChip}
                      alt={`${color.name} color chip`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className={cn(
                'order-1 md:order-2',
                index % 2 === 1 ? 'md:order-1' : ''
              )}>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-pool-deep mb-3">
                  {color.name}
                </h3>
                <div className={cn(
                  'w-16 h-1 rounded-full mb-4',
                  `bg-gradient-to-r ${color.gradient}`
                )} />
                <p className="text-pool-deep/70 leading-relaxed mb-4">
                  {t(`colors.${color.name.toLowerCase().replace(/\s+/g, '')}.description1`)}
                </p>
                <p className="text-pool-deep/70 leading-relaxed">
                  {t(`colors.${color.name.toLowerCase().replace(/\s+/g, '')}.description2`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
