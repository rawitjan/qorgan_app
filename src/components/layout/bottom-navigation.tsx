'use client';

import React from 'react';
import { IconCrosshair, IconHelpCircle, IconHome, IconRadar, IconTargetArrow } from '@tabler/icons-react';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export type NavTabId = 'dashboard' | 'lens' | 'training' | 'pulse' | 'help';

export function BottomNavigation({ activeTab = 'dashboard', onTabChange, className }: { activeTab?: NavTabId; onTabChange?: (tab: NavTabId) => void; className?: string; }) {
  const { locale } = useMode();
  const tabs = [
    { id: 'dashboard' as NavTabId, kk: 'Басты', ru: 'Главная', icon: <IconHome size={19} /> },
    { id: 'lens' as NavTabId, kk: 'Зертхана', ru: 'Лаб', icon: <IconCrosshair size={20} /> },
    { id: 'training' as NavTabId, kk: 'Миссия', ru: 'Миссии', icon: <IconTargetArrow size={20} /> },
    { id: 'pulse' as NavTabId, kk: 'Қауіп', ru: 'Угрозы', icon: <IconRadar size={20} /> },
    { id: 'help' as NavTabId, kk: 'Көмек', ru: 'Помощь', icon: <IconHelpCircle size={20} /> },
  ];
  return <nav className={cn('fixed bottom-3 left-3 right-3 z-40 mx-auto max-w-[410px] rounded-[24px] border border-border/80 bg-surface/95 p-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] floating-nav-shadow', className)}><div className="grid grid-cols-5 gap-1">{tabs.map((tab) => <button key={tab.id} onClick={() => onTabChange?.(tab.id)} className={cn('flex min-h-[54px] flex-col items-center justify-center gap-1 rounded-[18px] text-[9px] font-semibold transition-colors', activeTab === tab.id ? 'bg-primary-muted text-primary' : 'text-muted-foreground hover:bg-surface-raised hover:text-foreground')} aria-label={locale === 'kk' ? tab.kk : tab.ru}>{tab.icon}<span className="max-w-full truncate px-1">{locale === 'kk' ? tab.kk : tab.ru}</span></button>)}</div></nav>;
}
