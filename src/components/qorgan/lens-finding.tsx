'use client';

import React from 'react';
import { IconAlertTriangle, IconInfoCircle, IconQuote } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { LensFinding } from '@/types';
import { cn } from '@/lib/utils';

export function LensFindingCard({
  finding,
  className,
}: {
  finding: LensFinding;
  className?: string;
}) {
  const isSevere = finding.severity === 'critical' || finding.severity === 'high';

  return (
    <div
      className={cn(
        'flex flex-col gap-2.5 p-4 rounded-xl border bg-surface transition-all',
        finding.severity === 'critical' && 'border-red-500/40 bg-red-950/10',
        finding.severity === 'high' && 'border-orange-500/30 bg-orange-950/10',
        finding.severity === 'medium' && 'border-amber-500/30 bg-amber-950/10',
        finding.severity === 'low' && 'border-emerald-500/30 bg-emerald-950/10',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {isSevere ? (
            <IconAlertTriangle size={16} className="text-red-400 shrink-0" />
          ) : (
            <IconInfoCircle size={16} className="text-amber-400 shrink-0" />
          )}
          <span className="text-xs font-bold text-foreground truncate">
            {finding.title}
          </span>
        </div>

        <Badge
          variant={
            finding.severity === 'critical'
              ? 'risk-critical'
              : finding.severity === 'high'
              ? 'risk-high'
              : finding.severity === 'medium'
              ? 'risk-moderate'
              : 'risk-low'
          }
          className="text-[10px] uppercase font-bold"
        >
          {finding.severity}
        </Badge>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {finding.description}
      </p>

      {/* Evidence Quote if present */}
      {finding.evidence && (
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-surface-raised border border-border/70 text-xs text-secondary-foreground font-mono">
          <IconQuote size={13} className="text-primary shrink-0 mt-0.5" />
          <span className="break-all line-clamp-2">"{finding.evidence}"</span>
        </div>
      )}
    </div>
  );
}
