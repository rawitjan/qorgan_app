'use client';

import React from 'react';
import {
  IconScan,
  IconTrophy,
  IconFlame,
  IconAlertTriangle,
  IconTrendingUp,
} from '@tabler/icons-react';
import { ActivityItem } from '@/types';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function RecentActivityList({
  activities,
  className,
}: {
  activities: ActivityItem[];
  className?: string;
}) {
  const { locale } = useMode();

  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'scan':
        return <IconScan size={14} className="text-primary" />;
      case 'training':
        return <IconTrophy size={14} className="text-amber-700" />;
      case 'streak':
        return <IconFlame size={14} className="text-orange-700" />;
      case 'threat_alert':
        return <IconAlertTriangle size={14} className="text-red-700" />;
      default:
        return <IconTrendingUp size={14} className="text-primary" />;
    }
  };

  return (
    <div className={cn('flex flex-col gap-2 w-full', className)}>
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {locale === 'kk' ? 'Соңғы белсенділік' : 'Последняя активность'}
        </span>
        <span className="text-[11px] text-muted-foreground font-mono">SEC-LOG</span>
      </div>

      <div className="flex flex-col rounded-2xl border border-border/80 bg-surface divide-y divide-border/60 panel-shadow overflow-hidden">
        {activities.map((item) => {
          const title = locale === 'kk' ? item.title_kk : item.title_ru;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 p-3 text-xs hover:bg-surface-raised/40 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-raised border border-border">
                  {getIcon(item.type)}
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-foreground truncate leading-tight">
                    {title}
                  </span>
                  <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                    {item.timestamp}
                  </span>
                </div>
              </div>

              {item.score_delta && (
                <span className="shrink-0 text-[11px] font-bold tabular-nums text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  +{item.score_delta}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
