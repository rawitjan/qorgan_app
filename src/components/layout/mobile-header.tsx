'use client';

import React from 'react';
import { IconBell, IconLanguage } from '@tabler/icons-react';
import { QorganLogo } from '@/components/common/qorgan-logo';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function MobileHeader({ className }: { streakDays?: number; workspace?: 'personal' | 'organization'; onToggleWorkspace?: () => void; className?: string; }) {
  const { locale, toggleLocale } = useMode();
  return <header className={cn('sticky top-0 z-40 flex h-[72px] w-full items-center justify-between bg-surface px-4 select-none shadow-[0_8px_24px_-22px_rgba(31,70,120,0.7)]', className)}>
    <QorganLogo size={30} />
    <div className="flex items-center gap-2">
      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-raised text-muted-foreground" aria-label={locale === 'kk' ? 'Хабарламалар' : 'Уведомления'}><IconBell size={18} /></button>
      <button onClick={toggleLocale} className="flex h-10 min-w-12 items-center justify-center gap-1 rounded-full border border-border bg-surface font-mono text-[10px] font-bold text-foreground"><IconLanguage size={14} />{locale.toUpperCase()}</button>
    </div>
  </header>;
}
