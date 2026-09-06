import React from 'react';
import { IconShieldLock } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

export function QorganLogo({
  className,
  size = 28,
  showText = true,
}: {
  className?: string;
  size?: number;
  showText?: boolean;
}) {
  return (
    <div className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      <span className="flex items-center justify-center rounded-xl bg-primary p-1.5 text-white shadow-[0_8px_20px_-12px_rgba(39,117,246,0.9)]">
        <IconShieldLock size={size - 8} stroke={2.2} aria-hidden="true" />
      </span>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-extrabold tracking-[0.08em] text-[15px] leading-none text-foreground">
            QORGAN
          </span>
          <span className="text-[9px] tracking-[0.14em] text-muted-foreground font-semibold leading-tight">
            Digital safety
          </span>
        </div>
      )}
    </div>
  );
}
