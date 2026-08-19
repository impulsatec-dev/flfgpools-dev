'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { PoolCard } from '@/components/pool-card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { pools, poolColors, type PoolShape, type ProductClass } from '@/lib/pools';
import { cn } from '@/lib/utils';
import { Filter, X, SlidersHorizontal, Ruler, Shapes, Tag, Droplets, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sizeOptions = [
  { value: 'all', labelKey: 'allSizes' },
  { value: 'upTo16', labelKey: 'upTo16' },
  { value: '16to22', labelKey: '16to22' },
  { value: '22plus', labelKey: '22plus' },
  { value: 'spa', labelKey: 'spa' },
  { value: 'ledge', labelKey: 'ledge' },
] as const;

const shapeOptions: { value: PoolShape | 'all'; labelKey: string }[] = [
  { value: 'all', labelKey: 'allShapes' },
  { value: 'rectangle', labelKey: 'rectangle' },
  { value: 'freeform', labelKey: 'freeform' },
  { value: 'beach-entry', labelKey: 'beachEntry' },
];

const classOptions: { value: ProductClass | 'all'; labelKey: string }[] = [
  { value: 'all', labelKey: 'allTypes' },
  { value: 'pool', labelKey: 'pool' },
  { value: 'spa', labelKey: 'spaType' },
  { value: 'ledge', labelKey: 'ledgeType' },
];

const capacityOptions = [
  { value: 'all', labelKey: 'allCapacity' },
  { value: 'under5k', labelKey: 'under5k' },
  { value: '5kTo10k', labelKey: '5kTo10k' },
  { value: 'over10k', labelKey: 'over10k' },
] as const;

export default function ProductsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Products');
  const searchParams = useSearchParams();
  const initialSize = (searchParams.get('size') as string) || 'all';
  const [sizeFilter, setSizeFilter] = useState(initialSize);
  const [shapeFilter, setShapeFilter] = useState<PoolShape | 'all'>('all');
  const [classFilter, setClassFilter] = useState<ProductClass | 'all'>('all');
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'default' | 'numeric' | 'popular' | 'smallest' | 'largest'>('default');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const size = searchParams.get('size');
    if (size) {
      setSizeFilter(size);
    }
  }, [searchParams]);

  const filteredPools = useMemo(() => {
    let result = [...pools];
    if (sizeFilter !== 'all') {
      result = result.filter((p) => p.sizeCategory === sizeFilter);
    }
    if (shapeFilter !== 'all') {
      result = result.filter((p) => p.shape === shapeFilter);
    }
    if (classFilter !== 'all') {
      result = result.filter((p) => p.productClass === classFilter);
    }
    if (capacityFilter !== 'all') {
      result = result.filter((p) => {
        const cap = p.waterVolumeGallons;
        if (capacityFilter === 'under5k') return cap < 5000;
        if (capacityFilter === '5kTo10k') return cap >= 5000 && cap <= 10000;
        if (capacityFilter === 'over10k') return cap > 10000;
        return true;
      });
    }
    const classOrder: Record<ProductClass, number> = { pool: 0, spa: 1, ledge: 2 };
    const modelNum = (code: string) => {
      const match = code.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };
    switch (sortBy) {
      case 'smallest':
        result.sort((a, b) => a.lengthFt - b.lengthFt);
        break;
      case 'largest':
        result.sort((a, b) => b.lengthFt - a.lengthFt);
        break;
      case 'numeric':
        result.sort((a, b) => modelNum(a.modelCode) - modelNum(b.modelCode));
        break;
      case 'default':
        result.sort((a, b) => {
          const c = classOrder[a.productClass] - classOrder[b.productClass];
          return c !== 0 ? c : modelNum(a.modelCode) - modelNum(b.modelCode);
        });
        break;
      default:
        result.sort((a, b) => Number(b.popular ?? false) - Number(a.popular ?? false));
    }
    return result;
  }, [sizeFilter, shapeFilter, classFilter, capacityFilter, sortBy]);

  const activeFilterCount =
    (sizeFilter !== 'all' ? 1 : 0) +
    (shapeFilter !== 'all' ? 1 : 0) +
    (classFilter !== 'all' ? 1 : 0) +
    (capacityFilter !== 'all' ? 1 : 0);

  const clearFilters = () => {
    setSizeFilter('all');
    setShapeFilter('all');
    setClassFilter('all');
    setCapacityFilter('all');
  };

  return (
    <>
      {/* Hero */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Breadcrumbs items={[{ name: 'Products', href: '/products' }]} />
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-pool-deep">
          {t('hero.title')}
        </h1>
        <p className="mt-4 text-xl text-pool-deep/70 max-w-2xl">{t('hero.subtitle')}</p>
      </section>

      {/* Color chips */}
      {/* <section className="container mx-auto px-4 py-8">
        <span className="text-2xl font-display font-bold text-pool-deep mb-4 block text-center">
          Opcion 1
        </span>
        <div className="flex flex-wrap justify-center gap-4">
          {poolColors.map((color) => (
            <div
              key={color.name}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div
                className={cn(
                  'w-16 h-16 rounded-full border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-110',
                  `bg-gradient-to-br ${color.gradient}`
                )}
              />
              <span className="text-xs font-medium text-pool-deep/70 group-hover:text-pool-deep transition-colors">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </section> */}

      {/* Color chips */}
      <section className="container mx-auto px-4 py-8">
        {/* <span className="text-2xl font-display font-bold text-pool-deep mb-4 block text-center">
          Opcion 2
        </span> */}
        <div className="flex flex-wrap justify-center gap-4">
          {poolColors.map((color) => (
            <div
              key={color.name}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <img
                src={color.colorChip}
                alt={color.name}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-110 object-cover"
              />
              <span className="text-xs font-medium text-pool-deep/70 group-hover:text-pool-deep transition-colors">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </section>
      

      {/* Filter bar */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <button
            onClick={() => setFiltersOpen(true)}
            className={cn(
              'flex items-center gap-2.5 rounded-full px-4 sm:px-5 py-2.5 text-sm font-semibold tracking-[0.02em] transition-all duration-300 border w-full sm:w-auto justify-center sm:justify-start',
              activeFilterCount > 0
                ? 'bg-pool-aqua text-white border-pool-aqua shadow-sm shadow-pool-aqua/30'
                : 'glass-card text-pool-deep/80 border-pool-deep/10 hover:border-pool-aqua/40 hover:text-pool-deep'
            )}
          >
            <SlidersHorizontal className="h-4 w-4 shrink-0" />
            {t('filter.title')}
            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-bold text-pool-aqua">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2 justify-end">
            <span className="hidden sm:flex text-sm text-pool-deep/50 items-center gap-1.5">
              <ArrowUpDown className="h-3.5 w-3.5" />
              {t('filter.sortBy')}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="glass-chip text-sm cursor-pointer"
            >
              <option value="default">{t('filter.default')}</option>
              <option value="numeric">{t('filter.numeric')}</option>
              {/* <option value="popular">{t('filter.popular')}</option> */}
              <option value="smallest">{t('filter.smallest')}</option>
              <option value="largest">{t('filter.largest')}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Filter side drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-pool-deep/40 backdrop-blur-sm"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white/30 backdrop-blur-2xl shadow-2xl shadow-pool-deep/20 flex flex-col border-l border-pool-deep/10"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-7 py-6 border-b border-pool-deep/10">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="h-5 w-5 text-pool-deep/50" />
                  <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-pool-deep/90">
                    {t('filter.title')}
                  </span>
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-pool-aqua px-1.5 text-[10px] font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="rounded-full p-2 text-pool-deep/40 transition-colors hover:bg-pool-deep/5 hover:text-pool-deep"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Filter sections */}
              <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-5">
                {/* Size */}
                <div className={cn(
                  'rounded-xl border p-4 transition-colors duration-300',
                  sizeFilter !== 'all'
                    ? 'bg-pool-aqua/[0.04] border-pool-aqua/20'
                    : 'bg-pool-deep/[0.02] border-pool-deep/[0.06]'
                )}>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-pool-deep/40" />
                      <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-pool-deep/70">
                        {t('filter.size')}
                      </span>
                    </div>
                    {sizeFilter !== 'all' && (
                      <span className="text-[10px] font-medium text-pool-aqua">
                        {t(`filter.${sizeOptions.find(o => o.value === sizeFilter)?.labelKey}`)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSizeFilter(opt.value)}
                        className={cn(
                          'shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.02em] transition-all duration-300 border whitespace-nowrap',
                          sizeFilter === opt.value
                            ? 'bg-pool-aqua/45 text-white text-[12px] rounded-lg border-pool-aqua shadow-lg shadow-pool-aqua/20'
                            : 'bg-white/25 text-pool-deep/70 border-pool-deep/25 hover:border-pool-aqua/40 hover:text-pool-deep'
                        )}
                      >
                        {t(`filter.${opt.labelKey}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shape */}
                <div className={cn(
                  'rounded-xl border p-4 transition-colors duration-300',
                  shapeFilter !== 'all'
                    ? 'bg-pool-aqua/[0.04] border-pool-aqua/20'
                    : 'bg-pool-deep/[0.02] border-pool-deep/[0.06]'
                )}>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shapes className="h-4 w-4 text-pool-deep/40" />
                      <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-pool-deep/70">
                        {t('filter.shape')}
                      </span>
                    </div>
                    {shapeFilter !== 'all' && (
                      <span className="text-[10px] font-medium text-pool-aqua">
                        {t(`filter.${shapeOptions.find(o => o.value === shapeFilter)?.labelKey}`)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {shapeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setShapeFilter(opt.value)}
                        className={cn(
                          'shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.02em] transition-all duration-300 border whitespace-nowrap',
                          shapeFilter === opt.value
                            ? 'bg-pool-aqua/45 text-white text-[12px] rounded-lg border-pool-aqua shadow-lg shadow-pool-aqua/20'
                            : 'bg-white/25 text-pool-deep/70 border-pool-deep/25 hover:border-pool-aqua/40 hover:text-pool-deep'
                        )}
                      >
                        {t(`filter.${opt.labelKey}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Type */}
                <div className={cn(
                  'rounded-xl border p-4 transition-colors duration-300',
                  classFilter !== 'all'
                    ? 'bg-pool-aqua/[0.04] border-pool-aqua/20'
                    : 'bg-pool-deep/[0.02] border-pool-deep/[0.06]'
                )}>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-pool-deep/40" />
                      <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-pool-deep/70">
                        {t('filter.type')}
                      </span>
                    </div>
                    {classFilter !== 'all' && (
                      <span className="text-[10px] font-medium text-pool-aqua">
                        {t(`filter.${classOptions.find(o => o.value === classFilter)?.labelKey}`)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {classOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setClassFilter(opt.value)}
                        className={cn(
                          'shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.02em] transition-all duration-300 border whitespace-nowrap',
                          classFilter === opt.value
                            ? 'bg-pool-aqua/45 text-white text-[12px] rounded-lg border-pool-aqua shadow-lg shadow-pool-aqua/20'
                            : 'bg-white/25 text-pool-deep/70 border-pool-deep/25 hover:border-pool-aqua/40 hover:text-pool-deep'
                        )}
                      >
                        {t(`filter.${opt.labelKey}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Capacity */}
                <div className={cn(
                  'rounded-xl border p-4 transition-colors duration-300',
                  capacityFilter !== 'all'
                    ? 'bg-pool-aqua/[0.04] border-pool-aqua/20'
                    : 'bg-pool-deep/[0.02] border-pool-deep/[0.06]'
                )}>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-pool-deep/40" />
                      <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-pool-deep/70">
                        {t('filter.capacity')}
                      </span>
                    </div>
                    {capacityFilter !== 'all' && (
                      <span className="text-[10px] font-medium text-pool-aqua">
                        {t(`filter.${capacityOptions.find(o => o.value === capacityFilter)?.labelKey}`)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {capacityOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setCapacityFilter(opt.value)}
                        className={cn(
                          'shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.02em] transition-all duration-300 border whitespace-nowrap',
                          capacityFilter === opt.value
                            ? 'bg-pool-aqua/45 text-white text-[12px] rounded-lg border-pool-aqua shadow-lg shadow-pool-aqua/20'
                            : 'bg-white/30 text-pool-deep/70 border-pool-deep/25 hover:border-pool-aqua/40 hover:text-pool-deep'
                        )}
                      >
                        {t(`filter.${opt.labelKey}`)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-pool-deep/10 px-7 py-5 flex items-center justify-between gap-4">
                <span className="text-[12px] font-medium text-pool-deep/50">
                  {t('filter.results', { count: filteredPools.length })}
                </span>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 rounded-full border border-pool-deep/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-pool-deep/60 transition-colors hover:bg-pool-aqua hover:text-white hover:border-pool-aqua"
                  >
                    <X className="h-5 w-5" />
                    {t('filter.clear')}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Pool grid */}
      <section className="container mx-auto px-4 py-12">
        {filteredPools.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-pool-deep/60">{t('filter.noResults')}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPools.map((pool, i) => (
              <PoolCard key={pool.slug} pool={pool} locale={locale} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}