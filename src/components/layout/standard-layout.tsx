'use client';

import React from 'react';
import { IconBolt, IconShieldCheck, IconTargetArrow } from '@tabler/icons-react';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function StandardLayout({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { locale } = useMode();

  return (
    <div className={cn('flex flex-col gap-6 w-full', className)}>
      <div className="flex items-end justify-between gap-4 px-1">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-primary">
            {locale === 'kk' ? 'Жеке қорғаныс орталығы' : 'Личный центр защиты'}
          </span>
          <h1 className="text-[28px] md:text-[34px] font-bold tracking-[-0.035em] text-foreground">
            {locale === 'kk' ? 'Қайырлы күн, Аслан' : 'Добрый день, Аслан'}
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-primary-muted text-xs text-primary">
          <IconShieldCheck size={16} />
          <span className="font-semibold">
            {locale === 'kk' ? 'Қорғаныс белсенді' : 'Защита активна'}
          </span>
        </div>
      </div>

      {children}
    </div>
  );
}

export function JuniorLayout({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { locale } = useMode();

  return (
    <div className={cn('flex flex-col gap-5 w-full', className)}>
      {/* Junior Mission Accent Banner */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-primary-muted border border-primary/15 text-xs">
        <span className="inline-flex items-center gap-2 font-bold text-primary">
          <IconTargetArrow size={15} />
          {locale === 'kk' ? 'Күнделікті қауіпсіздік миссиясы' : 'Ежедневная миссия безопасности'}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700">
          <IconBolt size={13} />
          +100 XP
        </span>
      </div>

      {children}
    </div>
  );
}
