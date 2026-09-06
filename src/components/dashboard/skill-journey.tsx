'use client';

import React from 'react';
import {
  IconCheck,
  IconLock,
  IconSparkles,
  IconMapPin,
  IconChevronRight,
} from '@tabler/icons-react';
import { SkillJourneyMilestone } from '@/hooks/use-dashboard-data';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function SkillJourney({
  milestones,
  className,
}: {
  milestones: SkillJourneyMilestone[];
  className?: string;
}) {
  const { locale } = useMode();

  return (
    <div className={cn('flex flex-col gap-2.5 w-full', className)}>
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <IconMapPin size={14} className="text-primary" />
          <span className="text-xs font-bold uppercase tracking-wider text-foreground">
            {locale === 'kk' ? 'Дағдылар картасы (Journey)' : 'Карта навыков (Journey)'}
          </span>
        </div>
        <span className="text-[11px] font-bold text-amber-700">
          XP Trail
        </span>
      </div>

      <div className="flex flex-col gap-2 relative">
        {milestones.map((m, idx) => {
          const name = locale === 'kk' ? m.name_kk : m.name_ru;
          const isCompleted = m.status === 'completed';
          const isCurrent = m.status === 'current';
          const isLocked = m.status === 'locked';

          return (
            <div
              key={m.id}
              className={cn(
                'flex items-center justify-between p-3.5 rounded-2xl border transition-all select-none',
                isCompleted && 'border-emerald-200 bg-emerald-50 text-emerald-800',
                isCurrent &&
                  'border-amber-300 bg-amber-50 shadow-sm ring-1 ring-amber-200',
                isLocked && 'border-border/60 bg-surface/50 opacity-65'
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Milestone Step Indicator Circle */}
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-xs border transition-all',
                    isCompleted && 'bg-emerald-600 border-emerald-600 text-white',
                    isCurrent && 'bg-amber-100 border-amber-400 text-amber-800 animate-pulse',
                    isLocked && 'bg-muted border-border text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <IconCheck size={16} className="stroke-[3]" />
                  ) : isLocked ? (
                    <IconLock size={14} />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-foreground truncate">
                      {name}
                    </span>
                    {isCurrent && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                        {locale === 'kk' ? 'Ағымдағы' : 'Текущий'}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    Level {m.level} • {m.reward_xp} XP
                  </span>
                </div>
              </div>

              {isCurrent && (
                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700">
                  <IconSparkles size={13} />
                  <span>+{m.reward_xp} XP</span>
                </div>
              )}
              {isLocked && (
                <span className="text-[10px] text-muted-foreground font-mono">
                  {m.xp_required} XP
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
