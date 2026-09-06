'use client';

import React from 'react';
import { IconFlame, IconSparkles } from '@tabler/icons-react';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function StreakIndicator({
  days = 1,
  activeToday = true,
  className,
}: {
  days?: number;
  activeToday?: boolean;
  className?: string;
}) {
  const { locale } = useMode();

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border border-orange-200 bg-orange-50 select-none',
        className
      )}
    >
      <IconFlame
        size={14}
        className={cn(
          'text-orange-500 fill-orange-500',
          activeToday ? 'animate-bounce' : 'opacity-60'
        )}
      />
      <span className="text-xs font-bold tabular-nums text-orange-700">
        {days}
      </span>
      <span className="text-[10px] uppercase font-semibold text-orange-700/80">
        {locale === 'kk' ? 'күн' : 'дн'}
      </span>
    </div>
  );
}

export function XpIndicator({
  currentXp = 0,
  nextLevelXp = 250,
  levelNumber = 1,
  levelTitle = 'Бастаушы',
  className,
}: {
  currentXp?: number;
  nextLevelXp?: number;
  levelNumber?: number;
  levelTitle?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-xl border border-yellow-500/30 bg-surface-raised select-none',
        className
      )}
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-yellow-500/20 text-yellow-400 font-extrabold text-xs">
        {levelNumber}
      </div>

      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-foreground truncate">
            {levelTitle}
          </span>
          <IconSparkles size={11} className="text-yellow-400 shrink-0" />
        </div>
        <div className="text-[10px] text-muted-foreground tabular-nums">
          {currentXp} / {nextLevelXp} XP
        </div>
      </div>
    </div>
  );
}
