import React from 'react';
import {
  IconFish,
  IconScanEye,
  IconUsers,
  IconEyeOff,
  IconKey,
  IconHeartHandshake,
  IconRadar,
  IconScale,
  IconShoppingBag,
  IconShield,
} from '@tabler/icons-react';
import { SkillSlug } from '@/types';
import { cn } from '@/lib/utils';

export function SkillIcon({
  slug,
  className,
  size = 18,
}: {
  slug?: string;
  className?: string;
  size?: number;
}) {
  switch (slug as SkillSlug) {
    case 'phishing':
      return <IconFish size={size} className={cn('text-sky-400', className)} />;
    case 'scam_detection':
      return <IconScanEye size={size} className={cn('text-amber-400', className)} />;
    case 'social_engineering':
      return <IconUsers size={size} className={cn('text-indigo-400', className)} />;
    case 'privacy':
      return <IconEyeOff size={size} className={cn('text-purple-400', className)} />;
    case 'account_security':
      return <IconKey size={size} className={cn('text-emerald-400', className)} />;
    case 'bullying_response':
      return <IconHeartHandshake size={size} className={cn('text-rose-400', className)} />;
    case 'threat_awareness':
      return <IconRadar size={size} className={cn('text-teal-400', className)} />;
    case 'legal_literacy':
      return <IconScale size={size} className={cn('text-blue-400', className)} />;
    case 'consumer_rights':
      return <IconShoppingBag size={size} className={cn('text-orange-400', className)} />;
    default:
      return <IconShield size={size} className={cn('text-emerald-400', className)} />;
  }
}
