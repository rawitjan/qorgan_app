import React from 'react';
import {
  IconShieldCheck,
  IconAlertTriangle,
  IconShieldExclamation,
  IconAlertOctagon,
} from '@tabler/icons-react';
import { RiskLevel } from '@/types';
import { cn, normalizeRiskLevel } from '@/lib/utils';

export function RiskIcon({
  level,
  score,
  className,
  size = 18,
}: {
  level?: RiskLevel | string | null;
  score?: number | null;
  className?: string;
  size?: number;
}) {
  const norm = normalizeRiskLevel(level, score);
  switch (norm) {
    case 'CRITICAL':
      return (
        <IconAlertOctagon
          size={size}
          className={cn('text-red-400 shrink-0 animate-pulse-subtle', className)}
        />
      );
    case 'HIGH':
      return (
        <IconShieldExclamation
          size={size}
          className={cn('text-orange-400 shrink-0', className)}
        />
      );
    case 'MODERATE':
      return (
        <IconAlertTriangle
          size={size}
          className={cn('text-amber-400 shrink-0', className)}
        />
      );
    case 'LOW':
    default:
      return (
        <IconShieldCheck
          size={size}
          className={cn('text-emerald-400 shrink-0', className)}
        />
      );
  }
}
