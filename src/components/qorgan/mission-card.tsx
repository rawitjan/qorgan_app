'use client';

import React from 'react';
import { IconBolt, IconClock, IconArrowRight } from '@tabler/icons-react';
import { Scenario } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function MissionCard({
  scenario,
  onStart,
  className,
}: {
  scenario: Scenario;
  onStart?: (scenario: Scenario) => void;
  className?: string;
}) {
  const { mode, locale } = useMode();
  const isJunior = mode === 'junior';

  const diffLabels = {
    easy: locale === 'kk' ? 'Оңай' : 'Легко',
    medium: locale === 'kk' ? 'Орташа' : 'Средне',
    hard: locale === 'kk' ? 'Күрделі' : 'Сложно',
  };

  return (
    <div
      className={cn(
        'flex flex-col justify-between p-5 rounded-[24px] border border-border/80 bg-surface panel-shadow transition-all',
        isJunior
          ? 'hover:border-primary/50 shadow-sm rounded-2xl'
          : 'hover:border-primary/25 hover:-translate-y-0.5',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <Badge variant="outline" className="text-[10px] uppercase font-bold text-muted-foreground">
            {diffLabels[scenario.difficulty] || scenario.difficulty}
          </Badge>

          <Badge variant="xp" className="text-xs">
            <IconBolt size={11} className="text-amber-700 fill-amber-500" />
            <span>+{scenario.xp_reward} XP</span>
          </Badge>
        </div>

        <h4 className="text-base font-bold tracking-[-0.01em] text-foreground leading-snug mb-1.5">
          {scenario.title}
        </h4>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
          {scenario.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/60">
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <IconClock size={12} />
          <span>{scenario.estimated_time} {locale === 'kk' ? 'мин' : 'мин'}</span>
        </div>

        <Button
          size="sm"
          variant={isJunior ? 'junior' : 'default'}
          className="h-8 px-3 text-xs gap-1.5"
          onClick={() => onStart?.(scenario)}
        >
          <span>{locale === 'kk' ? 'Бастау' : 'Начать'}</span>
          <IconArrowRight size={13} />
        </Button>
      </div>
    </div>
  );
}
