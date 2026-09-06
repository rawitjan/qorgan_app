'use client';

import React from 'react';
import { RiskLevel } from '@/types';
import { getRiskMeta } from '@/lib/utils';
import { RiskIcon } from '@/components/common/risk-icon';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function RiskBadge({
  level = 'LOW',
  className,
  size = 'default',
}: {
  level?: RiskLevel | null;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}) {
  const { locale } = useMode();
  const meta = getRiskMeta(level);
  const label = locale === 'kk' ? meta.label_kk : meta.label_ru;

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] gap-1',
    default: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3.5 py-1.5 text-sm gap-2',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border font-semibold tracking-wide select-none',
        meta.badgeClass,
        sizeStyles[size],
        className
      )}
    >
      <RiskIcon level={level} size={size === 'sm' ? 14 : size === 'lg' ? 18 : 15} />
      <span>{label}</span>
    </div>
  );
}

export function RiskGauge({
  score = 0, // 0 - 100
  className,
}: {
  score?: number | null;
  className?: string;
}) {
  const safeScore = Math.min(100, Math.max(0, score ?? 0));

  return (
    <div className={cn('flex flex-col gap-1 w-full', className)}>
      <div className="flex justify-between items-center text-[11px] font-semibold text-muted-foreground">
        <span>Risk Index</span>
        <span className="tabular-nums font-bold text-foreground">{safeScore} / 100</span>
      </div>

      {/* 4-Segmented Risk Track */}
      <div className="grid grid-cols-4 gap-1 h-2 w-full rounded-full overflow-hidden bg-muted/60 p-0.5">
        {/* 0-24 Low */}
        <div
          className={cn(
            'h-full rounded-sm transition-colors',
            safeScore >= 0 ? 'bg-emerald-500' : 'bg-muted'
          )}
        />
        {/* 25-49 Moderate */}
        <div
          className={cn(
            'h-full rounded-sm transition-colors',
            safeScore >= 25 ? 'bg-amber-500' : 'bg-muted'
          )}
        />
        {/* 50-74 High */}
        <div
          className={cn(
            'h-full rounded-sm transition-colors',
            safeScore >= 50 ? 'bg-orange-500' : 'bg-muted'
          )}
        />
        {/* 75-100 Critical */}
        <div
          className={cn(
            'h-full rounded-sm transition-colors',
            safeScore >= 75 ? 'bg-red-500 animate-pulse-subtle' : 'bg-muted'
          )}
        />
      </div>
    </div>
  );
}
