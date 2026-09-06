'use client';

import React from 'react';
import { IconCheck, IconShield, IconArrowRight, IconAlertCircle } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export interface SafetyActionItem {
  id: string | number;
  title: string;
  description: string;
  priority?: 'critical' | 'high' | 'medium' | 'low';
  completed?: boolean;
}

export function SafetyAction({
  action,
  onToggle,
  onLearnMore,
  className,
}: {
  action: SafetyActionItem;
  onToggle?: (id: string | number) => void;
  onLearnMore?: (action: SafetyActionItem) => void;
  className?: string;
}) {
  const { locale } = useMode();

  return (
    <div
      className={cn(
        'flex items-start justify-between gap-3 p-3.5 rounded-xl border bg-surface transition-all select-none',
        action.completed
          ? 'border-emerald-500/30 bg-emerald-950/10'
          : action.priority === 'critical'
          ? 'border-red-500/40 bg-red-950/10'
          : 'border-border hover:border-border/80',
        className
      )}
    >
      <div className="flex items-start gap-2.5 min-w-0 flex-1">
        <button
          onClick={() => onToggle?.(action.id)}
          className={cn(
            'touch-target mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all',
            action.completed
              ? 'bg-emerald-500 border-emerald-500 text-obsidian'
              : 'border-muted-foreground/40 hover:border-primary'
          )}
          aria-label="Toggle action completion"
        >
          {action.completed && <IconCheck size={14} className="stroke-[3]" />}
        </button>

        <div className="flex flex-col min-w-0">
          <span
            className={cn(
              'text-xs font-semibold leading-snug',
              action.completed
                ? 'line-through text-muted-foreground'
                : 'text-foreground'
            )}
          >
            {action.title}
          </span>
          <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2 mt-0.5">
            {action.description}
          </p>
        </div>
      </div>

      {onLearnMore && (
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 p-0 shrink-0 text-muted-foreground hover:text-foreground"
          onClick={() => onLearnMore(action)}
          aria-label="Learn more about action"
        >
          <IconArrowRight size={14} />
        </Button>
      )}
    </div>
  );
}
