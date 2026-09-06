'use client';

import React from 'react';
import { IconMapPin, IconClock } from '@tabler/icons-react';
import { Threat } from '@/types';
import { RiskBadge } from '@/components/qorgan/risk-badge';
import { severityToRiskLevel } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function ThreatCard({
  threat,
  className,
}: {
  threat: Threat;
  className?: string;
}) {
  const riskLevel = severityToRiskLevel(threat.severity);

  return (
    <div
      className={cn(
        'flex flex-col gap-2.5 p-4 rounded-2xl border border-border/80 bg-surface panel-shadow hover:-translate-y-0.5 transition-all',
        threat.severity === 'critical' && 'border-red-200 bg-red-50/50',
        threat.severity === 'high' && 'border-orange-200 bg-orange-50/50',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <RiskBadge level={riskLevel} size="sm" />
        {threat.region && (
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium bg-surface-raised px-2 py-0.5 rounded border border-border">
            <IconMapPin size={11} className="text-primary" />
            <span>{threat.region}</span>
          </div>
        )}
      </div>

      <h4 className="text-sm font-semibold text-foreground leading-snug">
        {threat.title}
      </h4>

      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
        {threat.description}
      </p>

      {threat.starts_at && (
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground/80 mt-1">
          <IconClock size={11} />
          <span>{threat.starts_at}</span>
        </div>
      )}
    </div>
  );
}
