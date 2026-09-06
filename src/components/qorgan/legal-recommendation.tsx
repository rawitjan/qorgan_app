'use client';

import { IconExternalLink, IconPhone, IconScale } from '@tabler/icons-react';
import { LegalRecommendation as LegalRecommendationData } from '@/types';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function LegalRecommendation({
  recommendation,
  className,
}: {
  recommendation: LegalRecommendationData;
  className?: string;
}) {
  const { locale } = useMode();

  return (
    <section className={cn('rounded-2xl border border-blue-500/25 bg-blue-500/[0.06] p-4', className)}>
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
          <IconScale size={20} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
            {locale === 'kk' ? 'Құқықтық навигация' : 'Правовая навигация'}
          </p>
          <h3 className="mt-0.5 text-sm font-bold text-foreground">
            {locale === 'kk' && (!recommendation.title || recommendation.title === 'Правовая рекомендация')
              ? 'Құқықтық ұсыным'
              : recommendation.title || (locale === 'kk' ? 'Құқықтық ұсыным' : 'Правовая рекомендация')}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {recommendation.situation_explanation}
          </p>
        </div>
      </div>

      {recommendation.recommended_steps.length > 0 && (
        <ol className="mt-4 grid gap-2 border-t border-blue-500/15 pt-4 text-xs leading-relaxed text-foreground/90">
          {recommendation.recommended_steps.map((step, index) => (
            <li key={`${index}-${step}`} className="flex gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/15 font-mono text-[10px] font-bold text-blue-400">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}

      {recommendation.official_resources.length > 0 && (
        <div className="mt-4 grid gap-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {locale === 'kk' ? 'Ресми арналар' : 'Официальные каналы'}
          </p>
          {recommendation.official_resources.map((resource) => (
            <div key={`${resource.name}-${resource.contact}`} className="rounded-xl border border-border bg-surface p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground">{resource.name}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{resource.description}</p>
                </div>
                {resource.contact && (
                  <a
                    href={`tel:${resource.contact.replace(/[^+\d]/g, '')}`}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] font-bold text-foreground hover:border-blue-500/40 hover:text-blue-400"
                  >
                    <IconPhone size={13} aria-hidden="true" />
                    {resource.contact}
                  </a>
                )}
              </div>
              {resource.url && (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300"
                >
                  {locale === 'kk' ? 'Ресми сайт' : 'Официальный сайт'}
                  <IconExternalLink size={12} aria-hidden="true" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="mt-4 border-t border-blue-500/15 pt-3 text-[10px] leading-relaxed text-muted-foreground">
        {recommendation.disclaimer}
      </p>
    </section>
  );
}
