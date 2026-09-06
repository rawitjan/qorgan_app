'use client';

import React, { useState } from 'react';
import { IconCheck, IconChevronDown, IconCrosshair, IconHelpCircle, IconHome, IconLanguage, IconRadar, IconTargetArrow, IconUserCircle } from '@tabler/icons-react';
import { QorganLogo } from '@/components/common/qorgan-logo';
import { NavTabId } from '@/components/layout/bottom-navigation';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export type DemoAccountId = 'standard' | 'junior' | 'manager' | 'admin';
export interface DemoAccount { id: DemoAccountId; name: string; email: string; roleKk: string; roleRu: string; badge: string; }
export const DEMO_ACCOUNTS: DemoAccount[] = [
  { id: 'standard', name: 'Аслан Нұрланұлы', email: 'standard@qorgan.kz', roleKk: 'Standard пайдаланушы (16+)', roleRu: 'Standard пользователь (16+)', badge: 'STD' },
  { id: 'junior', name: 'Әлихан Болатұлы', email: 'junior@qorgan.kz', roleKk: 'Junior пайдаланушы (13–15)', roleRu: 'Junior пользователь (13–15)', badge: 'JUN' },
  { id: 'manager', name: 'Айдар Серікұлы', email: 'manager@qorgan.kz', roleKk: 'Мектеп менеджері', roleRu: 'Менеджер школы', badge: 'ORG' },
  { id: 'admin', name: 'Система Әкімшісі', email: 'admin@qorgan.kz', roleKk: 'Платформа әкімшісі', roleRu: 'Администратор платформы', badge: 'ADM' },
];

export function DesktopHeader({ activeTab = 'dashboard', onTabChange, workspace = 'personal', onToggleWorkspace, onSelectDemoAccount, className }: {
  activeTab?: NavTabId; onTabChange?: (tab: NavTabId) => void; streakDays?: number; workspace?: 'personal' | 'organization'; onToggleWorkspace?: () => void; onSelectDemoAccount?: (account: DemoAccount) => void; className?: string;
}) {
  const { mode, setMode, locale, toggleLocale } = useMode();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<DemoAccountId>(workspace === 'organization' ? 'manager' : mode === 'junior' ? 'junior' : 'standard');
  const current = DEMO_ACCOUNTS.find((account) => account.id === selectedId) || DEMO_ACCOUNTS[0];
  const nav = [
    { id: 'dashboard' as NavTabId, kk: 'Басты', ru: 'Главная', icon: <IconHome size={17} /> },
    { id: 'lens' as NavTabId, kk: 'Зертхана', ru: 'Лаборатория', icon: <IconCrosshair size={17} /> },
    { id: 'training' as NavTabId, kk: 'Миссиялар', ru: 'Миссии', icon: <IconTargetArrow size={17} /> },
    { id: 'pulse' as NavTabId, kk: 'Қауіптер', ru: 'Угрозы', icon: <IconRadar size={17} /> },
    { id: 'help' as NavTabId, kk: 'Көмек', ru: 'Помощь', icon: <IconHelpCircle size={17} /> },
  ];

  const selectAccount = (account: DemoAccount) => {
    setSelectedId(account.id);
    setOpen(false);
    if (account.id === 'junior') setMode('junior'); else setMode('standard');
    const shouldBeOrg = account.id === 'manager' || account.id === 'admin';
    if ((workspace === 'organization') !== shouldBeOrg) onToggleWorkspace?.();
    onSelectDemoAccount?.(account);
  };

  return <header className={cn('sticky top-0 z-40 hidden h-[76px] w-full items-center justify-between bg-surface px-8 shadow-[0_8px_30px_-25px_rgba(31,70,120,0.75)] md:flex xl:px-10', className)}>
    <button onClick={() => onTabChange?.('dashboard')} className="flex items-center" aria-label={locale === 'kk' ? 'Басты бет' : 'Главная'}><QorganLogo size={32} /></button>
    {workspace === 'personal' ? <nav className="flex items-center gap-1 rounded-2xl bg-surface-raised p-1.5">
      {nav.map((item) => <button key={item.id} onClick={() => onTabChange?.(item.id)} className={cn('flex h-10 items-center gap-1.5 rounded-xl px-3 xl:px-4 text-[11px] font-semibold transition-colors hover:bg-surface hover:text-primary', activeTab === item.id ? 'bg-surface text-primary shadow-sm' : 'text-muted-foreground')}>{item.icon}{locale === 'kk' ? item.kk : item.ru}</button>)}
    </nav> : <p className="text-sm font-semibold text-muted-foreground">№48 IT · QORGAN ұйымы</p>}
    <div className="flex items-center gap-3">
      <div className="relative">
        <button onClick={() => setOpen((value) => !value)} className="flex h-11 items-center gap-2 rounded-2xl border border-border bg-surface px-3 text-left shadow-sm hover:border-primary/25" aria-expanded={open}><IconUserCircle size={20} className="text-primary" /><span><span className="block max-w-28 truncate text-xs font-bold">{current.name.split(' ')[0]}</span><span className="block text-[9px] font-semibold text-muted-foreground">{current.badge} · {locale.toUpperCase()}</span></span><IconChevronDown size={15} className="text-muted-foreground" /></button>
        {open && <div className="absolute right-0 top-[calc(100%+10px)] w-80 rounded-2xl border border-border bg-surface p-2 panel-shadow">
          <div className="mb-2 flex gap-2 border-b border-border p-2">
            <button onClick={toggleLocale} className="lab-quiet-button flex-1"><IconLanguage size={16} /> {locale === 'kk' ? 'Русский' : 'Қазақша'}</button>
          </div>
          {DEMO_ACCOUNTS.map((account) => <button key={account.id} onClick={() => selectAccount(account)} className={cn('flex w-full items-center justify-between rounded-xl p-3 text-left hover:bg-primary-muted', selectedId === account.id && 'bg-primary-muted')}><span><span className="block text-xs font-bold">{account.name}</span><span className="mt-1 block text-[10px] text-muted-foreground">{locale === 'kk' ? account.roleKk : account.roleRu}</span></span>{selectedId === account.id && <IconCheck size={17} className="text-primary" />}</button>)}
        </div>}
      </div>
    </div>
  </header>;
}
