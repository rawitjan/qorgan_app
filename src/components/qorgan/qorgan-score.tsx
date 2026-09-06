'use client';

import React from 'react';
import { IconShield, IconSparkles } from '@tabler/icons-react';
import { getScoreTier } from '@/lib/utils';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function QorganScore({
  score = 750,
  ratingKk = 'Қорғаныс мықты',
  ratingRu = 'Надёжная защита',
  size = 'default',
  className,
}: {
  score?: number;
  ratingKk?: string;
  ratingRu?: string;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}) {
  const { locale, mode } = useMode();
  const tier = getScoreTier(score);
  const ratingText = locale === 'kk' ? ratingKk : ratingRu;

  // Normalized progress (0 to 1000 -> 0 to 1)
  const normalized = Math.min(1000, Math.max(0, score)) / 1000;
  // Circumference for the telemetry arc
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  // 240 degrees arc for the perimeter gauge
  const arcLength = circumference * (240 / 360);
  const strokeDashoffset = arcLength * (1 - normalized);

  const isJunior = mode === 'junior';
  const sizeClass = size === 'sm' ? 'py-4' : size === 'lg' ? 'py-8' : 'py-5 md:py-7';

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center px-5 md:px-7 rounded-[28px] bg-surface overflow-hidden transition-all select-none panel-shadow',
        sizeClass,
        isJunior ? 'bg-[#fffef7]' : 'bg-surface',
        className
      )}
    >
      {/* Guardian score */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-120" viewBox="0 0 160 160">
          {/* Background Track Arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
            className="text-muted"
          />
          {/* Active Telemetry Score Arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn(
              'transition-all duration-1000 ease-out',
              tier.colorClass
            )}
          />
        </svg>

        {/* Central Hexagonal Shield Badge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-[0.18em] text-muted-foreground mb-1">
            <IconShield size={12} className={tier.colorClass} />
            <span>{locale === 'kk' ? 'ҚОРҒАНЫС ИНДЕКСІ' : 'ИНДЕКС ЗАЩИТЫ'}</span>
          </div>

          {/* Large Tabular Score */}
          <div className="text-5xl font-bold tracking-[-0.06em] tabular-nums text-foreground">
            {score}
          </div>

          <div className="text-[11px] font-semibold text-muted-foreground/80 mt-[-2px]">
            / 1000
          </div>
        </div>

      </div>

      {/* Qualitative Rating Pill */}
      <div className="mt-1 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-primary/15 bg-primary-muted text-primary">
        <div
          className={cn(
            'w-2 h-2 rounded-full',
            score >= 700 ? 'bg-primary animate-pulse-subtle' : 'bg-amber-600'
          )}
        />
        <span className="text-xs font-semibold tracking-wide">
          {ratingText}
        </span>
        {score >= 900 && (
          <IconSparkles size={12} className="text-primary ml-0.5" />
        )}
      </div>
    </div>
  );
}
