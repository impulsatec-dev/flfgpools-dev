import { Waves, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from '@/i18n/navigation';

type StatusPageProps = {
  code: string;
  eyebrow: string;
  title: string;
  description: string;
  homeLabel: string;
  retryLabel?: string;
  onRetry?: () => void;
};

export function StatusPage({
  code,
  eyebrow,
  title,
  description,
  homeLabel,
  retryLabel,
  onRetry,
}: StatusPageProps) {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-7rem)] items-center overflow-hidden bg-pool-cream px-4 py-28 sm:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-pool-mist/70 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-pool-sand/80 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-px w-[min(90vw,68rem)] -translate-x-1/2 rotate-[-8deg] bg-pool-deep/10" />
        <div className="absolute left-1/2 top-1/2 h-px w-[min(90vw,68rem)] -translate-x-1/2 rotate-[8deg] bg-pool-deep/10" />
      </div>

      <div className="container mx-auto">
        <div className="glass-card mx-auto max-w-4xl overflow-visible p-7 sm:p-12 md:p-16">
          <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div className="relative flex min-h-48 items-center justify-center sm:min-h-56">
              <span className="font-display text-[clamp(8rem,24vw,14rem)] font-bold leading-none tracking-[-0.12em] text-pool-deep/[0.08]">
                {code}
              </span>
              <div className="absolute flex h-24 w-24 items-center justify-center rounded-full border border-pool-aqua/40 bg-white/40 text-pool-aqua shadow-[0_0_0_14px_rgba(14,165,233,0.08)] backdrop-blur-sm sm:h-28 sm:w-28">
                <Waves className="h-12 w-12" strokeWidth={1.25} aria-hidden="true" />
              </div>
            </div>

            <div>
              <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-pool-aqua">
                {eyebrow}
              </p>
              <h1 className="max-w-xl text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-pool-deep sm:text-5xl md:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-pool-deep/65 sm:text-lg">
                {description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/" className="glass-btn-primary inline-flex items-center gap-2 px-5 py-3 font-semibold text-white">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  {homeLabel}
                </Link>
                {onRetry && retryLabel ? (
                  <button type="button" onClick={onRetry} className="glass-btn inline-flex items-center gap-2 px-5 py-3 font-semibold text-pool-deep">
                    <RefreshCw className="h-4 w-4" aria-hidden="true" />
                    {retryLabel}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
