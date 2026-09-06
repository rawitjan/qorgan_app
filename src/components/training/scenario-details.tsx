'use client';

import React from 'react';
import {
  IconArrowLeft,
  IconClock,
  IconSparkles,
  IconShield,
  IconBrain,
  IconAlertTriangle,
  IconPlayerPlay,
} from '@tabler/icons-react';
import { Scenario } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function ScenarioDetails({
  scenario,
  onStart,
  onBack,
  className,
}: {
  scenario: Scenario;
  onStart: (scenario: Scenario) => void;
  onBack: () => void;
  className?: string;
}) {
  const { locale, mode } = useMode();
  const isJunior = mode === 'junior';

  const getDifficultyLabel = (diff: Scenario['difficulty']) => {
    switch (diff) {
      case 'easy':
        return locale === 'kk' ? 'Оңай' : 'Легко';
      case 'medium':
        return locale === 'kk' ? 'Орташа' : 'Средне';
      case 'hard':
        return locale === 'kk' ? 'Күрделі' : 'Сложно';
    }
  };

  return (
    <div className={cn('flex flex-col gap-5 w-full animate-in fade-in-50 duration-200', className)}>
      {/* Top Header with Back Action */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="touch-target flex h-9 w-9 items-center justify-center rounded-xl bg-surface border border-border text-foreground hover:bg-surface-raised transition-colors"
          aria-label="Back to scenarios"
        >
          <IconArrowLeft size={18} />
        </button>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
            {locale === 'kk' ? 'Миссия брифингі' : 'Брифинг миссии'}
          </span>
          <h2 className="text-base font-bold text-foreground line-clamp-1">{scenario.title}</h2>
        </div>
      </div>

      {/* Hero Briefing Card */}
      <div className="p-5 rounded-2xl border border-primary/30 bg-surface flex flex-col gap-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs uppercase font-mono border-primary/40 text-primary">
            {scenario.category}
          </Badge>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
              <IconClock size={13} />
              {scenario.estimated_time} {locale === 'kk' ? 'мин' : 'мин'}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold font-mono text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/30">
              <IconSparkles size={13} />
              +{scenario.xp_reward} XP
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-foreground tracking-tight">{scenario.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{scenario.description}</p>
        </div>

        {/* Mission Parameters */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
          <div className="p-2.5 rounded-xl bg-surface-raised border border-border flex flex-col gap-0.5">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
              {locale === 'kk' ? 'Күрделілігі' : 'Сложность'}
            </span>
            <span className="text-xs font-bold text-foreground">{getDifficultyLabel(scenario.difficulty)}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-surface-raised border border-border flex flex-col gap-0.5">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
              {locale === 'kk' ? 'Жас санаты' : 'Возраст'}
            </span>
            <span className="text-xs font-bold text-foreground">
              {scenario.age_mode === 'junior'
                ? 'Junior (13–15)'
                : scenario.age_mode === 'adult'
                ? 'Standard (16+)'
                : 'Барлығына / Все'}
            </span>
          </div>
        </div>
      </div>

      {/* Adversary & Tactical Intel */}
      <div className="p-4 rounded-2xl border border-border bg-surface flex flex-col gap-3">
        <div className="flex items-center gap-2 text-foreground font-bold text-xs uppercase tracking-wider">
          <IconAlertTriangle size={15} className="text-amber-400" />
          <span>{locale === 'kk' ? 'Қауіп моделі мен мақсаты' : 'Модель угрозы и цель'}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {locale === 'kk'
            ? 'Бұл симуляцияда сіз нақты алаяқтар қолданатын психологиялық қысым мен фишингтік сілтемелерге тап боласыз. Мақсат — асықпай, күмәнді белгілерді анықтап, қауіпсіз шешім қабылдау.'
            : 'В этой симуляции вы столкнетесь с реальными техниками социальной инженерии и фишинга. Ваша задача — распознать скрытые угрозы и принять верные защитные решения.'}
        </p>
      </div>

      {/* Skills to Level Up */}
      <div className="p-4 rounded-2xl border border-border bg-surface flex flex-col gap-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {locale === 'kk' ? 'Дамитын қауіпсіздік дағдылары' : 'Прокачиваемые навыки'}
        </span>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs gap-1.5 py-1 px-2.5">
            <IconShield size={13} className="text-primary" />
            <span>{locale === 'kk' ? 'Фишингтен қорғану' : 'Защита от фишинга'}</span>
          </Badge>
          <Badge variant="secondary" className="text-xs gap-1.5 py-1 px-2.5">
            <IconBrain size={13} className="text-indigo-400" />
            <span>{locale === 'kk' ? 'Әлеуметтік инженерия' : 'Социальная инженерия'}</span>
          </Badge>
        </div>
      </div>

      {/* Launch Simulation CTA */}
      <Button
        size="lg"
        onClick={() => onStart(scenario)}
        className="w-full h-12 text-sm font-bold gap-2 shadow-lg shadow-primary/20"
      >
        <IconPlayerPlay size={18} />
        <span>{locale === 'kk' ? 'Миссияны бастау' : 'Начать миссию'}</span>
      </Button>
    </div>
  );
}
