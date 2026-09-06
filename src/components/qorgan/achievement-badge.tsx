'use client';

import React from 'react';
import { IconTrophy, IconLock, IconSparkles } from '@tabler/icons-react';
import { Achievement } from '@/types';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function AchievementBadge({
  achievement,
  unlocked = false,
  className,
}: {
  achievement: Achievement;
  unlocked?: boolean;
  className?: string;
}) {
  const { locale, mode } = useMode();
  const isJunior = mode === 'junior';

  const name = locale === 'kk' ? achievement.name_kk : achievement.name_ru;
  const description =
    locale === 'kk' ? achievement.description_kk : achievement.description_ru;

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3.5 rounded-xl border bg-surface transition-all select-none',
        unlocked
          ? isJunior
            ? 'border-yellow-500/40 bg-yellow-500/10 shadow-[0_0_16px_-4px_rgba(250,204,21,0.2)]'
            : 'border-emerald-500/30 bg-surface-raised'
          : 'border-border opacity-60',
        className
      )}
    >
      {/* Hexagonal / Emblem Icon Box */}
      <div
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all',
          unlocked
            ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400'
            : 'bg-muted border-border text-muted-foreground'
        )}
      >
        {unlocked ? (
          <IconTrophy size={20} className="text-yellow-400" />
        ) : (
          <IconLock size={18} className="text-muted-foreground" />
        )}
      </div>

      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1">
          <span className="text-xs font-bold text-foreground truncate">
            {name}
          </span>
          {unlocked && (
            <span className="flex items-center gap-0.5 text-[10px] font-bold text-yellow-400 bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/30">
              <IconSparkles size={11} />
              +{achievement.xp_bonus} XP
            </span>
          )}
        </div>

        <p className="text-[11px] text-muted-foreground leading-snug line-clamp-1 mt-0.5">
          {description}
        </p>

        {unlocked && achievement.unlocked_at && (
          <span className="text-[9px] font-mono text-muted-foreground/70 mt-0.5">
            {achievement.unlocked_at}
          </span>
        )}
      </div>
    </div>
  );
}
