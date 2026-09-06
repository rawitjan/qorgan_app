'use client';

import React, { useState } from 'react';
import {
  IconHistory,
  IconLink,
  IconFileText,
  IconPhoto,
  IconQrcode,
  IconTrash,
  IconArrowRight,
  IconCheck,
  IconAlertTriangle,
} from '@tabler/icons-react';
import { LensScanHistoryItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function LensHistory({
  history,
  onSelectScan,
  onClearHistory,
  onClose,
  className,
}: {
  history: LensScanHistoryItem[];
  onSelectScan: (item: LensScanHistoryItem) => void;
  onClearHistory?: () => void;
  onClose?: () => void;
  className?: string;
}) {
  const { locale } = useMode();
  const [filter, setFilter] = useState<'all' | 'high_risk' | 'safe'>('all');

  const filtered = history.filter((item) => {
    if (filter === 'high_risk') return item.risk_level === 'CRITICAL' || item.risk_level === 'HIGH';
    if (filter === 'safe') return item.risk_level === 'LOW';
    return true;
  });

  const getInputIcon = (type: LensScanHistoryItem['input_type']) => {
    switch (type) {
      case 'url':
        return <IconLink size={14} className="text-primary" />;
      case 'text':
        return <IconFileText size={14} className="text-amber-400" />;
      case 'image':
      case 'screenshot':
        return <IconPhoto size={14} className="text-indigo-400" />;
      case 'qr':
        return <IconQrcode size={14} className="text-purple-400" />;
      default:
        return <IconLink size={14} className="text-primary" />;
    }
  };

  return (
    <div className={cn('flex flex-col gap-3 w-full animate-in fade-in-50 duration-200', className)}>
      {/* Header & Filter Controls */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <IconHistory size={16} className="text-primary" />
          <span className="text-xs font-bold uppercase tracking-wider text-foreground">
            {locale === 'kk' ? 'Тексеру тарихы' : 'История проверок'}
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">({history.length})</span>
        </div>

        {history.length > 0 && onClearHistory && (
          <button
            onClick={onClearHistory}
            className="text-[11px] text-red-400 hover:underline inline-flex items-center gap-1"
          >
            <IconTrash size={12} />
            <span>{locale === 'kk' ? 'Тазарту' : 'Очистить'}</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface border border-border">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            'flex-1 py-1 px-2 rounded-lg text-xs font-semibold transition-colors',
            filter === 'all'
              ? 'bg-surface-raised text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {locale === 'kk' ? 'Барлығы' : 'Все'} ({history.length})
        </button>
        <button
          onClick={() => setFilter('high_risk')}
          className={cn(
            'flex-1 py-1 px-2 rounded-lg text-xs font-semibold transition-colors',
            filter === 'high_risk'
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {locale === 'kk' ? 'Қауіпті' : 'Опасные'}
        </button>
        <button
          onClick={() => setFilter('safe')}
          className={cn(
            'flex-1 py-1 px-2 rounded-lg text-xs font-semibold transition-colors',
            filter === 'safe'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {locale === 'kk' ? 'Қауіпсіз' : 'Чистые'}
        </button>
      </div>

      {/* History List or Empty State */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-border text-center gap-2 bg-surface/40">
          <IconHistory size={28} className="text-muted-foreground/60" />
          <span className="text-xs font-semibold text-foreground">
            {locale === 'kk' ? 'Тарих бос' : 'История пуста'}
          </span>
          <span className="text-[11px] text-muted-foreground max-w-xs">
            {locale === 'kk'
              ? 'Сіз тексерген күдікті сілтемелер мен мәліметтер осында сақталады.'
              : 'Здесь будут сохраняться все проверенные вами ссылки и данные.'}
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((item) => {
            const isCritical = item.risk_level === 'CRITICAL' || item.risk_level === 'HIGH';
            const summary = locale === 'kk' ? item.summary_kk : item.summary_ru;

            return (
              <div
                key={item.id}
                onClick={() => onSelectScan(item)}
                className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border bg-surface hover:border-primary/50 cursor-pointer transition-all active:scale-[0.99] select-none"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-raised border border-border mt-0.5">
                    {getInputIcon(item.input_type)}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-foreground truncate max-w-[200px]">
                      {item.payload_preview}
                    </span>
                    <span className="text-[11px] text-muted-foreground truncate max-w-[220px]">
                      {summary}
                    </span>
                    <span className="text-[10px] text-muted-foreground/80 font-mono mt-0.5">
                      {item.created_at}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={cn(
                      'text-xs font-mono font-bold px-2 py-0.5 rounded border',
                      isCritical
                        ? 'bg-red-500/15 border-red-500/40 text-red-400'
                        : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                    )}
                  >
                    {item.risk_score}/100
                  </span>
                  <IconArrowRight size={14} className="text-muted-foreground" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {onClose && (
        <Button
          variant="outline"
          size="sm"
          className="w-full h-10 text-xs mt-2"
          onClick={onClose}
        >
          {locale === 'kk' ? 'Сканерге оралу' : 'Вернуться к сканеру'}
        </Button>
      )}
    </div>
  );
}
