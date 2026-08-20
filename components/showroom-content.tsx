'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SectionReveal } from '@/lib/motion/scroll-components';
import { showroomProjects, getPoolByCode, type ShowroomZone, type ShowroomStyle, type ShowroomProject } from '@/lib/pools';
import { cn } from '@/lib/utils';
import { useRouter } from '@/i18n/navigation';
import { MapPin, Home, Clock, ArrowRight, Search, X, Award, Calendar, SlidersHorizontal, CircleCheck } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const zoneOptions: { value: ShowroomZone | 'all'; labelKey: string }[] = [
  { value: 'all', labelKey: 'allZones' },
  { value: 'miami-dade', labelKey: 'miamiDade' },
  { value: 'broward', labelKey: 'broward' },
  { value: 'palm-beach', labelKey: 'palmBeach' },
  { value: 'other', labelKey: 'other' },
];

const sizeOptions: { value: 'all' | 'upTo16' | '16to22' | '22plus'; labelKey: string }[] = [
  { value: 'all', labelKey: 'allSizes' },
  { value: 'upTo16', labelKey: 'upTo16' },
  { value: '16to22', labelKey: '16to22' },
  { value: '22plus', labelKey: '22plus' },
];

const styleOptions: { value: ShowroomStyle | 'all'; labelKey: string }[] = [
  { value: 'all', labelKey: 'allStyles' },
  { value: 'family', labelKey: 'family' },
  { value: 'resort', labelKey: 'resort' },
  { value: 'lap', labelKey: 'lap' },
  { value: 'compact', labelKey: 'compact' },
];

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.02em] transition-all duration-300',
        'border whitespace-nowrap flex items-center gap-1.5',
        active
          ? 'bg-pool-aqua text-white border-pool-aqua shadow-sm shadow-pool-aqua/30'
          : 'bg-white/5 text-white/70 border-white/25 hover:border-white/45 hover:text-white/95 hover:bg-white/10'
      )}
    >
      {/* {active && <CircleCheck className="h-3 w-3 shrink-0" />} */}
      {children}
    </button>
  );
}

function FilterGroup({
  label,
  children,
  stacked = false,
}: {
  label: string;
  children: React.ReactNode;
  stacked?: boolean;
}) {
  if (stacked) {
    return (
      <div className="flex flex-col gap-2.5">
        <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/80">
          {label}
        </span>
        <div className="flex flex-wrap gap-2">{children}</div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2.5 overflow-x-auto sm:overflow-visible -mx-3 px-3 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.14em] text-white/80">
        {label}
      </span>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

function Divider() {
  return <span className="hidden 2xl:block h-4 w-px bg-white/40" />;
}

const projectLayouts = [
  { aspect: 'aspect-[4/5]', width: 'w-[78%]', mt: '', align: '' },
  { aspect: 'aspect-square', width: 'w-[82%]', mt: 'md:mt-52', align: 'ml-auto' },
  { aspect: 'aspect-square', width: 'w-[70%]', mt: '', align: 'ml-auto' },
  { aspect: 'aspect-[3/4]', width: 'w-[84%]', mt: 'md:mt-64', align: 'ml-auto' },
  { aspect: 'aspect-[5/4]', width: 'w-[70%]', mt: '', align: '' },
  { aspect: 'aspect-square', width: 'w-[86%]', mt: 'md:mt-52', align: 'ml-auto' },
];

const layoutOffsets = [
  { parallax: [-18, 18], scale: 1.1, hoverScale: 1.16 },
  { parallax: [-14, 14], scale: 1.08, hoverScale: 1.14 },
  { parallax: [-16, 16], scale: 1.1, hoverScale: 1.15 },
  { parallax: [-20, 20], scale: 1.1, hoverScale: 1.17 },
  { parallax: [-12, 12], scale: 1.07, hoverScale: 1.13 },
  { parallax: [-15, 15], scale: 1.09, hoverScale: 1.15 },
];

function ProjectFigure({
  project,
  layout,
  offset,
  reduce,
  onHoverStart,
  onSelect,
  isSelected,
}: {
  project: ShowroomProject;
  layout: (typeof projectLayouts)[number];
  offset: (typeof layoutOffsets)[number];
  reduce: boolean | null;
  onHoverStart: (p: ShowroomProject | null) => void;
  onSelect: (p: ShowroomProject) => void;
  isSelected: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : offset.parallax);

  return (
    <motion.figure
      className={cn('group/figure relative cursor-pointer md:cursor-none', layout.width, layout.mt, layout.align)}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={reduce ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onHoverStart(project)}
      onMouseLeave={() => onHoverStart(null)}
      onClick={() => onSelect(project)}
    >
      <div ref={ref} className={cn('relative overflow-hidden', layout.aspect)}>
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src={project.image}
            alt={`${project.title} — ${project.location}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/figure:scale-[1.15]"
            style={{ scale: offset.scale }}
            loading="lazy"
          />
        </motion.div>
        {/* Subtle gradient overlay on hover */}
        <div className={cn('absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-500', isSelected ? 'opacity-100 md:opacity-0 group-hover/figure:opacity-100' : 'opacity-0 group-hover/figure:opacity-100')} />
      </div>
      {/* Mobile caption */}
      <figcaption className="mt-3 flex items-baseline justify-between text-[10px] font-mono uppercase tracking-[0.1em] text-white/40 md:hidden">
        <div>
          <strong className="font-semibold text-white/80">{project.title}</strong>
          <span className="block mt-0.5">{project.location}</span>
        </div>
        {project.modelCode && (
          <span className="text-white/65 tabular-nums border-[1.5px] border-white/55 px-1.5 py-0.5 text-[11px]">{project.modelCode}</span>
        )}
      </figcaption>
      {/* Desktop caption */}
      <figcaption className="hidden md:flex mt-4 items-baseline justify-between text-[11px] font-mono uppercase tracking-[0.12em] text-white/50">
        <div className="flex items-baseline gap-3">
          <strong className="font-semibold text-white/90">{project.title}</strong>
          <span className="text-white/45">{project.location}</span>
        </div>
        {project.modelCode && (
          <span className="text-pool-aqua tabular-nums border-[1.8px] border-pool-aqua/50 px-1.5 py-0.5 text-[12px] font-semibold">
            {project.modelCode}
          </span>
        )}
      </figcaption>
    </motion.figure>
  );
}

export function ShowroomContent({ locale }: { locale: string }) {
  const t = useTranslations('Showroom');
  const reduce = useReducedMotion();
  const router = useRouter();
  const [zoneFilter, setZoneFilter] = useState<ShowroomZone | 'all'>('all');
  const [sizeFilter, setSizeFilter] = useState<'all' | 'upTo16' | '16to22' | '22plus'>('all');
  const [styleFilter, setStyleFilter] = useState<ShowroomStyle | 'all'>('all');
  const [hoveredProject, setHoveredProject] = useState<ShowroomProject | null>(null);
  const [selectedProject, setSelectedProject] = useState<ShowroomProject | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleSelectProject = (project: ShowroomProject) => {
    setSelectedProject(project);
    if (project.modelCode) {
      const pool = getPoolByCode(project.modelCode);
      if (pool) {
        const basePath = pool.productClass === 'spa' ? '/products/spa' : '/products/pools';
        router.push(`${basePath}/${pool.slug}`);
        return;
      }
    }
  };
  const filterBarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const el = filterBarRef.current;
      if (el) {
        const stuck = el.getBoundingClientRect().top <= 0;
        window.dispatchEvent(new CustomEvent('showroom-filter-stuck', { detail: { stuck } }));
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const filteredProjects = useMemo(() => {
    return showroomProjects.filter((p) => {
      if (zoneFilter !== 'all' && p.zone !== zoneFilter) return false;
      if (sizeFilter !== 'all' && p.sizeCategory !== sizeFilter) return false;
      if (styleFilter !== 'all' && p.style !== styleFilter) return false;
      return true;
    });
  }, [zoneFilter, sizeFilter, styleFilter]);

  const activeFilterCount =
    (zoneFilter !== 'all' ? 1 : 0) +
    (sizeFilter !== 'all' ? 1 : 0) +
    (styleFilter !== 'all' ? 1 : 0);
  const hoveredModel = hoveredProject?.modelCode ? getPoolByCode(hoveredProject.modelCode) : undefined;

  const clearFilters = () => {
    setZoneFilter('all');
    setSizeFilter('all');
    setStyleFilter('all');
  };

  return (
    <>
      {/* Editorial Hero */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/iso-models/Pools/Neblina-Grande/Showroom/Neblina-Grande_Blythewood_11-1.avif"
            alt={t('hero.title')}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pool-deep via-pool-deep/60 to-pool-deep/30" />
        </div>

        <div className="container relative mx-auto px-4 py-12 flex flex-col justify-end min-h-[63vh]">
          {/* <div className="mb-6">
            <Breadcrumbs items={[{ name: t('hero.title'), href: '/showroom' }]} />
          </div> */}
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight text-white">
              {t('hero.title')}
            </h1>
            <p className="mt-4 text-xl font-medium font-serif text-white/80 max-w-2xl">
              {t('hero.subtitle')}
            </p>

            {/* Metrics bar */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              <span className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-1 text-[14px] font-medium text-white/80">
                <Award className="h-3.5 w-3.5 text-white/60" />
                {t('metrics.completed')}
              </span>
              <span className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-1 text-[14px] font-medium text-white/80">
                <MapPin className="h-3.5 w-3.5 text-white/60" />
                {t('metrics.zones')}
              </span>
              <span className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-1 text-[14px] font-medium text-white/80">
                <Calendar className="h-3.5 w-3.5 text-white/60" />
                {t('metrics.years')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Filters — minimal premium bar */}
      <section ref={filterBarRef} className={cn(
        'sticky top-0 z-40 bg-black/40 backdrop-blur-2xl border-b border-white/10 transition-all duration-300',
        scrolled ? 'py-1' : 'py-2'
      )}>
        <div className="container mx-auto w-full px-2 sm:px-4 lg:px-6 2xl:px-1">
          {/* Mobile header: toggle + active count */}
          <div className={cn('flex items-center justify-between transition-all duration-300 2xl:hidden', scrolled ? 'py-2' : 'py-3.5')}>
            <button
              onClick={() => setFiltersOpen((s) => !s)}
              className={cn(
                'flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[14px] font-semibold tracking-[0.02em] transition-all duration-300',
                filtersOpen
                  ? 'bg-pool-aqua text-white'
                  : 'bg-white/5 text-white/70 border border-white/25'
              )}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {t('filters.title')}
              {activeFilterCount > 0 && (
                <span className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-pool-aqua text-[9px] font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {activeFilterCount > 0 && !filtersOpen && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-[11px] font-semibold text-pool-aqua hover:text-white transition-colors duration-300"
              >
                <X className="h-4 w-4" />
                {t('filters.clear')}
              </button>
            )}
          </div>

          {/* Desktop full bar — 2xl+ */}
          <div className={cn('hidden 2xl:flex 2xl:flex-nowrap 2xl:flex-row 2xl:items-center 2xl:justify-between 2xl:gap-x-3 transition-all duration-300', scrolled ? '2xl:py-2' : '2xl:py-4')}>
            {/* Filter group: Zone */}
            <FilterGroup label={t('filters.zone')}>
              {zoneOptions.map((opt) => (
                <FilterPill
                  key={opt.value}
                  active={zoneFilter === opt.value}
                  onClick={() => setZoneFilter(opt.value)}
                >
                  {t(`filters.${opt.labelKey}`)}
                </FilterPill>
              ))}
            </FilterGroup>

            <Divider />

            {/* Filter group: Size */}
            <FilterGroup label={t('filters.size')}>
              {sizeOptions.map((opt) => (
                <FilterPill
                  key={opt.value}
                  active={sizeFilter === opt.value}
                  onClick={() => setSizeFilter(opt.value)}
                >
                  {t(`filters.${opt.labelKey}`)}
                </FilterPill>
              ))}
            </FilterGroup>

            <Divider />

            {/* Filter group: Style */}
            <FilterGroup label={t('filters.style')}>
              {styleOptions.map((opt) => (
                <FilterPill
                  key={opt.value}
                  active={styleFilter === opt.value}
                  onClick={() => setStyleFilter(opt.value)}
                >
                  {t(`filters.${opt.labelKey}`)}
                </FilterPill>
              ))}
            </FilterGroup>

            <div className="flex items-center gap-3 ml-auto">
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-[11px] font-semibold text-pool-aqua hover:text-white transition-colors duration-300"
                >
                  <X className="h-3 w-3" />
                  {t('filters.clear')}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile bottom sheet — filters */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-white/15 px-5 pb-8 pt-4 shadow-2xl shadow-black/50 sm:hidden border-t border-white/20"
            >
              <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-white/20" />
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.12em] text-white/80">
                  {t('filters.title')}
                </span>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                <FilterGroup label={t('filters.zone')} stacked>
                  {zoneOptions.map((opt) => (
                    <FilterPill
                      key={opt.value}
                      active={zoneFilter === opt.value}
                      onClick={() => setZoneFilter(opt.value)}
                    >
                      {t(`filters.${opt.labelKey}`)}
                    </FilterPill>
                  ))}
                </FilterGroup>

                <FilterGroup label={t('filters.size')} stacked>
                  {sizeOptions.map((opt) => (
                    <FilterPill
                      key={opt.value}
                      active={sizeFilter === opt.value}
                      onClick={() => setSizeFilter(opt.value)}
                    >
                      {t(`filters.${opt.labelKey}`)}
                    </FilterPill>
                  ))}
                </FilterGroup>

                <FilterGroup label={t('filters.style')} stacked>
                  {styleOptions.map((opt) => (
                    <FilterPill
                      key={opt.value}
                      active={styleFilter === opt.value}
                      onClick={() => setStyleFilter(opt.value)}
                    >
                      {t(`filters.${opt.labelKey}`)}
                    </FilterPill>
                  ))}
                </FilterGroup>
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-6 w-full rounded-full border border-white/25 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {t('filters.clear')}
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Tablet side drawer — filters */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm hidden sm:block 2xl:hidden"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-black/5 backdrop-blur-2xl shadow-2xl shadow-black/30 hidden sm:flex flex-col 2xl:hidden border-l border-white/20"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-7 py-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="h-4 w-4 text-white/50" />
                  <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/90">
                    {t('filters.title')}
                  </span>
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-pool-aqua px-1.5 text-[10px] font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Filter sections */}
              <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-5">
                {/* Zone */}
                <div className={cn(
                  'rounded-xl border p-4 transition-colors duration-300',
                  zoneFilter !== 'all'
                    ? 'bg-pool-aqua/[0.06] border-pool-aqua/20'
                    : 'bg-white/[0.03] border-white/[0.06]'
                )}>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-white/40" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                        {t('filters.zone')}
                      </span>
                    </div>
                    {zoneFilter !== 'all' && (
                      <span className="text-[10px] font-medium text-pool-aqua/80">
                        {t(`filters.${zoneOptions.find(o => o.value === zoneFilter)?.labelKey}`)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {zoneOptions.map((opt) => (
                      <FilterPill
                        key={opt.value}
                        active={zoneFilter === opt.value}
                        onClick={() => setZoneFilter(opt.value)}
                      >
                        {t(`filters.${opt.labelKey}`)}
                      </FilterPill>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className={cn(
                  'rounded-xl border p-4 transition-colors duration-300',
                  sizeFilter !== 'all'
                    ? 'bg-pool-aqua/[0.06] border-pool-aqua/20'
                    : 'bg-white/[0.03] border-white/[0.06]'
                )}>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Home className="h-3.5 w-3.5 text-white/40" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                        {t('filters.size')}
                      </span>
                    </div>
                    {sizeFilter !== 'all' && (
                      <span className="text-[10px] font-medium text-pool-aqua/80">
                        {t(`filters.${sizeOptions.find(o => o.value === sizeFilter)?.labelKey}`)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((opt) => (
                      <FilterPill
                        key={opt.value}
                        active={sizeFilter === opt.value}
                        onClick={() => setSizeFilter(opt.value)}
                      >
                        {t(`filters.${opt.labelKey}`)}
                      </FilterPill>
                    ))}
                  </div>
                </div>

                {/* Style */}
                <div className={cn(
                  'rounded-xl border p-4 transition-colors duration-300',
                  styleFilter !== 'all'
                    ? 'bg-pool-aqua/[0.06] border-pool-aqua/20'
                    : 'bg-white/[0.03] border-white/[0.06]'
                )}>
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-3.5 w-3.5 text-white/40" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                        {t('filters.style')}
                      </span>
                    </div>
                    {styleFilter !== 'all' && (
                      <span className="text-[10px] font-medium text-pool-aqua/80">
                        {t(`filters.${styleOptions.find(o => o.value === styleFilter)?.labelKey}`)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {styleOptions.map((opt) => (
                      <FilterPill
                        key={opt.value}
                        active={styleFilter === opt.value}
                        onClick={() => setStyleFilter(opt.value)}
                      >
                        {t(`filters.${opt.labelKey}`)}
                      </FilterPill>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 px-7 py-5 flex items-center justify-between gap-4">
                <span className="text-[12px] font-medium text-white/50">
                  {t('filters.results', { count: filteredProjects.length })}
                </span>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                    {t('filters.clear')}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Editorial Project Grid — quiet luxury gallery */}
      <section
        className="relative overflow-hidden px-5 py-24 md:px-6 md:py-30"
        onMouseMove={handleMouseMove}
      >
        {/* Fixed background image with dark overlay */}
        <div className="fixed inset-0 -z-10">
          <Image
            src="/showroom/Columbian-Beach.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>

        <div className="mx-auto grid max-w-[75rem] grid-cols-1 gap-x-6 gap-y-24 md:grid-cols-2 lg:gap-x-[3.4rem] lg:gap-y-56">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-24">
              <Search className="mx-auto h-10 w-10 text-white/20" />
              <p className="mt-4 text-sm text-white/40">{t('filters.noResults')}</p>
              <button
                onClick={clearFilters}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-pool-aqua hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
                {t('filters.clear')}
              </button>
            </div>
          ) : (
            filteredProjects.map((project, i) => (
              <ProjectFigure
                key={project.id}
                project={project}
                layout={projectLayouts[i % projectLayouts.length]}
                offset={layoutOffsets[i % layoutOffsets.length]}
                reduce={reduce}
                onHoverStart={setHoveredProject}
                onSelect={handleSelectProject}
                isSelected={selectedProject?.id === project.id}
              />
            ))
          )}
        </div>
      </section>

      {/* Mobile/tablet tap bubble — centered overlay */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-1/2 top-1/2 z-[61] -translate-x-1/2 -translate-y-1/2 bg-white px-5 py-4 shadow-2xl shadow-black/40 md:hidden"
              onClick={() => setSelectedProject(null)}
            >
              <div className="min-w-[200px] max-w-[280px]">
                <div className="flex items-center justify-between gap-4">
                  <strong className="text-[12px] font-mono uppercase tracking-[0.1em] text-black">
                    {selectedProject.title}
                  </strong>
                  {selectedProject.modelCode && (
                    <span className="text-[10px] font-mono font-semibold tabular-nums text-pool-aqua border border-pool-aqua/30 px-1.5 py-0.5">
                      {selectedProject.modelCode}
                    </span>
                  )}
                </div>
                <span className="mt-2 block text-[10px] font-mono uppercase tracking-wider text-black/50">
                  {selectedProject.location} · {t(`filters.${selectedProject.style}`)}
                </span>
                <span className="mt-1 block text-[10px] font-mono uppercase tracking-wider text-black/65">
                  {(selectedProject.modelCode ? getPoolByCode(selectedProject.modelCode)?.dimensionsText.length : '')} × {(selectedProject.modelCode ? getPoolByCode(selectedProject.modelCode)?.dimensionsText.width : '')} · {selectedProject.size}
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating cursor label — desktop only, outside overflow-hidden section */}
      <div
        className="hidden md:block fixed pointer-events-none z-[60]"
        style={{ left: mousePos.x + 14, top: mousePos.y, transform: 'translateY(-50%)' }}
      >
        <motion.div
          className="bg-white px-5 py-4 shadow-2xl shadow-black/25"
          animate={{
            opacity: hoveredProject ? 1 : 0,
            scale: hoveredProject ? 1 : 0.92,
          }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
          }}
        >
        <div className="min-w-[190px] max-w-[260px]">
          <div className="flex items-center justify-between gap-4">
            <strong className="text-[11px] font-mono uppercase tracking-[0.1em] text-black">
              {hoveredProject?.title}
            </strong>
            {hoveredProject?.modelCode && (
              <span className="text-[10px] font-mono font-semibold tabular-nums text-pool-aqua border border-pool-aqua/30 px-1.5 py-0.5">
                {hoveredProject.modelCode}
              </span>
            )}
          </div>
          {hoveredProject && (
            <>
              <span className="mt-2 block text-[10px] font-mono uppercase tracking-wider text-black/50">
                {hoveredProject.location} · {t(`filters.${hoveredProject.style}`)}
              </span>
              <span className="mt-1 block text-[10px] font-mono uppercase tracking-wider text-black/65">
                {hoveredModel?.dimensionsText.length} × {hoveredModel?.dimensionsText.width} · {hoveredProject.size}
              </span>
            </>
          )}
        </div>
        </motion.div>
      </div>

      {/* CTA: Visit Our Showroom */}
      <SectionReveal>
        <section className="container mx-auto px-4 py-16">
          <div className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-pool-aqua/30 flex items-center justify-center">
                <Home className="h-8 w-8 text-pool-aqua" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-pool-deep">
              {t('cta.title')}
            </h2>
            <p className="mt-4 text-lg text-pool-deep/70 max-w-xl mx-auto">
              {t('cta.subtitle')}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-pool-deep/70">
                <MapPin className="h-5 w-5 text-pool-aqua" />
                <span className="text-lg font-medium">{t('cta.address')}</span>
              </div>
              <div className="flex items-center gap-2 text-pool-deep/70">
                <Clock className="h-5 w-5 text-pool-aqua" />
                <span className="text-lg font-medium">{t('cta.hours')}</span>
              </div>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 glass-btn-primary inline-flex items-center gap-2 px-6 py-3 text-white font-medium"
            >
              {t('cta.button')}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </SectionReveal>
    </>
  );
}
