'use client';

import React from 'react';
import { IconArrowRight, IconCheck, IconRefresh, IconTrendingUp, IconX } from '@tabler/icons-react';
import { ScenarioResultData } from '@/types';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function ScenarioResult({ result, onRetry, onContinue, className }: { result: ScenarioResultData; onRetry: () => void; onContinue: () => void; className?: string; }) {
  const { locale } = useMode();
  const isPassed = result.is_passed;
  return <section className={cn('w-full space-y-4 animate-in fade-in-50 duration-200', className)}>
    <div className={cn('grid overflow-hidden rounded-[28px] lg:grid-cols-[minmax(0,1fr)_320px]', isPassed ? 'bg-primary-muted' : 'bg-red-50')}>
      <div className="p-7 md:p-12">
        <p className="text-xs font-semibold text-primary">QORGAN · {locale === 'kk' ? 'Нәтиже' : 'Результат'}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.05em] md:text-6xl">{isPassed ? (locale === 'kk' ? 'Миссия орындалды' : 'Миссия выполнена') : (locale === 'kk' ? 'Тағы бір рет көріңіз' : 'Попробуйте ещё раз')}</h1>
      </div>
      <div className="flex flex-col justify-between bg-primary p-7 text-white">
        <span className="text-[10px] font-semibold text-white/70">{locale === 'kk' ? 'Қорытынды ұпай' : 'Итоговый балл'}</span>
        <div className="py-8"><span className="text-7xl font-bold tracking-[-0.08em]">{result.score}</span><span className="ml-2 text-sm text-white/60">/ 100</span></div>
        <p className="text-sm font-bold">+{result.xp_earned} XP</p>
      </div>
    </div>

    <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="rounded-[24px] bg-surface p-6 panel-shadow md:p-8">
        <p className="flex items-center gap-2 text-xs font-bold text-primary"><IconTrendingUp size={16} /> {locale === 'kk' ? 'Дағды өсімі' : 'Рост навыков'}</p>
        <div className="mt-6 space-y-5">{result.skill_changes.map((skill) => <div key={skill.skill_slug} className="border-t border-border pt-3"><div className="flex items-center justify-between gap-3"><span className="text-sm font-bold">{locale === 'kk' ? skill.name_kk : skill.name_ru}</span><span className="rounded-full bg-primary-muted px-2.5 py-1 text-xs font-bold text-primary">+{skill.delta}</span></div></div>)}</div>
      </aside>

      <div className="rounded-[24px] bg-surface p-6 panel-shadow md:p-8">
        {result.correct_decisions.length > 0 && <div>
          <p className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.14em]"><IconCheck size={16} /> {locale === 'kk' ? 'ДҰРЫС ШЕШІМДЕР' : 'ВЕРНЫЕ РЕШЕНИЯ'} / {result.correct_decisions.length}</p>
          <div className="mt-4 divide-y divide-border border-y border-border">{result.correct_decisions.map((decision, index) => <div key={index} className="grid gap-2 py-5 md:grid-cols-[42px_minmax(0,1fr)]"><span className="text-xs font-bold text-primary">0{index + 1}</span><div><p className="text-sm font-bold">{locale === 'kk' ? decision.title_kk : decision.title_ru}</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{locale === 'kk' ? decision.reason_kk : decision.reason_ru}</p></div></div>)}</div>
        </div>}
        {result.mistakes.length > 0 && <div className="mt-8">
          <p className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.14em] text-danger"><IconX size={16} /> {locale === 'kk' ? 'ҚАТЕЛЕР' : 'ОШИБКИ'} / {result.mistakes.length}</p>
          <div className="mt-4 divide-y divide-red-100 border-y border-red-100">{result.mistakes.map((mistake, index) => <div key={index} className="grid gap-2 py-5 md:grid-cols-[42px_minmax(0,1fr)]"><span className="text-xs font-bold text-danger">0{index + 1}</span><div><p className="text-sm font-bold">{locale === 'kk' ? mistake.title_kk : mistake.title_ru}</p><p className="mt-2 text-sm leading-relaxed text-danger">{locale === 'kk' ? mistake.correction_kk : mistake.correction_ru}</p></div></div>)}</div>
        </div>}
      </div>
    </div>

    <div className="grid gap-3 md:grid-cols-2">
      <button onClick={onRetry} className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-border bg-surface text-xs font-bold hover:bg-surface-raised"><IconRefresh size={18} /> {locale === 'kk' ? 'Қайта өту' : 'Пройти снова'}</button>
      <button onClick={onContinue} className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-primary text-xs font-bold text-white hover:bg-primary-hover">{locale === 'kk' ? 'Миссияларға оралу' : 'К миссиям'} <IconArrowRight size={18} /></button>
    </div>
  </section>;
}
