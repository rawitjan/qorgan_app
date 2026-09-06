'use client';

import React, { useState } from 'react';
import {
  IconArrowLeft,
  IconTrophy,
  IconSparkles,
  IconLock,
  IconCheck,
} from '@tabler/icons-react';
import { Achievement } from '@/types';
import { AchievementBadge } from '@/components/qorgan/achievement-badge';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function AchievementsView({
  achievements,
  onBack,
  className,
}: {
  achievements: Achievement[];
  onBack: () => void;
  className?: string;
}) {
  const { locale } = useMode();
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const unlockedCount = achievements.filter((a) => a.unlocked_at).length;

  const filtered = achievements.filter((a) => {
    if (filter === 'unlocked') return !!a.unlocked_at;
    if (filter === 'locked') return !a.unlocked_at;
    return true;
  });

  return (
    <div className={cn('flex flex-col gap-5 w-full animate-in fade-in-50 duration-200', className)}>
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="touch-target flex h-9 w-9 items-center justify-center rounded-xl bg-surface border border-border text-foreground hover:bg-surface-raised transition-colors"
          aria-label="Back"
        >
          <IconArrowLeft size={18} />
        </button>
        <div className="flex flex-col">
          <h2 className="text-base font-bold text-foreground">
            {locale === 'kk' ? 'Қауіпсіздік жетістіктері' : 'Достижения безопасности'}
          </h2>
          <span className="text-[11px] text-primary font-semibold font-mono">
            {unlockedCount} / {achievements.length} {locale === 'kk' ? 'ашылды' : 'разблокировано'}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-surface border border-border">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            'touch-target py-1.5 text-xs font-semibold rounded-lg transition-colors',
            filter === 'all'
              ? 'bg-surface-raised text-primary font-bold shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {locale === 'kk' ? 'Барлығы' : 'Все'} ({achievements.length})
        </button>
        <button
          onClick={() => setFilter('unlocked')}
          className={cn(
            'touch-target py-1.5 text-xs font-semibold rounded-lg transition-colors',
            filter === 'unlocked'
              ? 'bg-surface-raised text-primary font-bold shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {locale === 'kk' ? 'Ашылған' : 'Открытые'} ({unlockedCount})
        </button>
        <button
          onClick={() => setFilter('locked')}
          className={cn(
            'touch-target py-1.5 text-xs font-semibold rounded-lg transition-colors',
            filter === 'locked'
              ? 'bg-surface-raised text-primary font-bold shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {locale === 'kk' ? 'Жабық' : 'Закрытые'} ({achievements.length - unlockedCount})
        </button>
      </div>

      {/* Badges Grid */}
      <div className="flex flex-col gap-2.5">
        {filtered.map((ach) => (
          <AchievementBadge
            key={ach.id}
            achievement={ach}
            unlocked={!!ach.unlocked_at}
          />
        ))}
      </div>
    </div>
  );
}
