'use client';

import React from 'react';
import { Skill } from '@/types';
import { SkillIcon } from '@/components/common/skill-icon';
import { Progress } from '@/components/ui/progress';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function SkillProgress({
  skill,
  className,
}: {
  skill: Skill;
  className?: string;
}) {
  const { locale } = useMode();
  const name = locale === 'kk' ? skill.name_kk : skill.name_ru;

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 rounded-2xl border border-transparent bg-surface-raised/65 hover:border-primary/15 hover:bg-primary-muted/55 transition-colors',
        className
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface border border-border/70">
        <SkillIcon slug={skill.slug} size={20} />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-foreground truncate">
            {name}
          </span>
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-surface-raised border border-border text-muted-foreground">
              Lvl {skill.level}
            </span>
            <span className="text-xs font-bold tabular-nums text-primary">
              {skill.score}%
            </span>
          </div>
        </div>

        <Progress value={skill.score} className="h-1.5" />
      </div>
    </div>
  );
}
