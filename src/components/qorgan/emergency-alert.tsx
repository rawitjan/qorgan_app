'use client';

import React from 'react';
import { IconPhoneCall, IconShieldExclamation } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function EmergencyAlert({
  className,
}: {
  className?: string;
}) {
  const { locale } = useMode();

  return (
    <div
      className={cn(
        'flex flex-col gap-3 p-4 rounded-xl border border-red-500/40 bg-red-950/25 text-red-100',
        className
      )}
    >
      <div className="flex items-center gap-2 text-red-400">
        <IconShieldExclamation size={20} className="shrink-0 animate-pulse-subtle" />
        <span className="text-sm font-bold tracking-wide">
          {locale === 'kk' ? 'ШҰҒЫЛ КӨМЕК ҚАЖЕТ ПЕ?' : 'НУЖНА СРОЧНАЯ ПОМОЩЬ?'}
        </span>
      </div>

      <p className="text-xs text-red-200/90 leading-relaxed">
        {locale === 'kk'
          ? 'Егер саған немесе жақындарыңа қауіп төнсе, мемлекеттік сенім телефондары тәулік бойы тегін көмек көрсетеді.'
          : 'Если вам или вашим близким угрожает опасность, государственные горячие линии работают круглосуточно и бесплатно.'}
      </p>

      <div className="grid grid-cols-2 gap-2 mt-1">
        <Button
          variant="sos"
          size="sm"
          className="h-10 text-xs gap-1.5"
          onClick={() => window.open('tel:111')}
        >
          <IconPhoneCall size={14} />
          <span>111 Сенім желісі</span>
        </Button>

        <Button
          variant="destructive"
          size="sm"
          className="h-10 text-xs gap-1.5 bg-red-900/50 text-red-200 border-red-500/40"
          onClick={() => window.open('tel:102')}
        >
          <IconPhoneCall size={14} />
          <span>102 Полиция</span>
        </Button>
      </div>
    </div>
  );
}

export function MascotMessage({
  messageKk,
  messageRu,
  actionTextKk,
  actionTextRu,
  onAction,
  className,
}: {
  messageKk: string;
  messageRu: string;
  actionTextKk?: string;
  actionTextRu?: string;
  onAction?: () => void;
  className?: string;
}) {
  const { locale } = useMode();
  const text = locale === 'kk' ? messageKk : messageRu;
  const actionText = locale === 'kk' ? actionTextKk : actionTextRu;

  return (
    <div
      className={cn(
        'relative flex items-start gap-3 p-3.5 rounded-2xl border border-primary/40 bg-surface-raised shadow-sm',
        className
      )}
    >
      {/* Stylized Cyber-Falcon / Owl Mascot Avatar */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20 border border-primary/40 text-primary">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L4 7v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V7l-8-5z" />
          <circle cx="9" cy="11" r="1" fill="currentColor" />
          <circle cx="15" cy="11" r="1" fill="currentColor" />
          <path d="M12 14v2" />
        </svg>
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <div className="text-[11px] font-bold text-primary tracking-wide uppercase mb-0.5">
          Qorgan-Batyr
        </div>
        <p className="text-xs text-foreground leading-relaxed">
          {text}
        </p>

        {actionText && (
          <button
            onClick={onAction}
            className="mt-2 text-xs font-bold text-primary hover:underline text-left"
          >
            {actionText} →
          </button>
        )}
      </div>
    </div>
  );
}
