'use client';

import React from 'react';
import {
  IconFlame,
  IconSparkles,
  IconArrowRight,
  IconScan,
} from '@tabler/icons-react';
import { MascotMessage } from '@/components/qorgan/emergency-alert';
import { MissionCard } from '@/components/qorgan/mission-card';
import { SkillJourney } from '@/components/dashboard/skill-journey';
import { JuniorLayout } from '@/components/layout/standard-layout';
import { Button } from '@/components/ui/button';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import { useMode } from '@/context/mode-context';
import { Scenario } from '@/types';
import { cn } from '@/lib/utils';

export function JuniorDashboard({
  onNavigateToLens,
  onStartMission,
  className,
}: {
  onNavigateToLens?: () => void;
  onStartMission?: (scenario: Scenario) => void;
  className?: string;
}) {
  const { locale } = useMode();
  const {
    level,
    xp,
    streak,
    todayMission,
    skillJourney,
  } = useDashboardData();

  const levelTitle = locale === 'kk' ? level.title_kk : level.title_ru;

  return (
    <JuniorLayout className={cn('w-full', className)}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Mascot Guidance, XP Level & Lens CTA (5 cols on desktop) */}
        <div className="md:col-span-5 flex flex-col gap-5">
          {/* 1. Mascot Guidance from "Qorgan-Batyr" */}
          <MascotMessage
            messageKk="Сәлем, жас қорғаушы! Бүгін фишингке қарсы 1 миссия орындасаң, 4-күндік страйкіңді сақтап қаласың!"
            messageRu="Привет, юный защитник! Пройди сегодня 1 миссию по фишингу, чтобы удержать 4-дневный страйк!"
            actionTextKk="Миссияны бастау"
            actionTextRu="Начать миссию"
            onAction={() => onStartMission?.(todayMission)}
          />

          {/* 2. Level, XP Progress Bar & Streak Highlight */}
          <section className="flex flex-col gap-2.5 p-5 rounded-[24px] border border-amber-200 bg-amber-50/70 panel-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-800 font-extrabold text-sm border border-amber-200">
                  {level.number}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">
                    {levelTitle}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium">
                    Level {level.number} Digital Guardian
                  </span>
                </div>
              </div>

              {/* Animated Daily Streak Flame */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-700 font-bold text-xs">
                <IconFlame size={15} className="fill-orange-500 text-orange-500 animate-bounce" />
                <span>
                  {streak.days} {locale === 'kk' ? 'күндік страйк' : 'дня подряд'}
                </span>
              </div>
            </div>

            {/* XP Telemetry Bar */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
                <span>{locale === 'kk' ? 'Тәжірибе ұпайы (XP)' : 'Опыт (XP)'}</span>
                <span className="font-mono text-foreground font-bold">
                  {xp.current} / {xp.next_level_xp} XP
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${(xp.current / xp.next_level_xp) * 100}%` }}
                />
              </div>
            </div>
          </section>

          {/* 3. Junior QORGAN Lens CTA */}
          <section className="p-5 rounded-[24px] border border-primary/15 bg-primary-muted flex items-center justify-between gap-3 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white font-bold shadow-sm">
                <IconScan size={24} />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-sm font-extrabold text-foreground">
                  {locale === 'kk' ? 'QORGAN Lens Тексерісі' : 'Проверка через Lens'}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {locale === 'kk'
                    ? 'Скриншот немесе сілтемені тексеру'
                    : 'Быстрый анализ скриншота или ссылки'}
                </span>
              </div>
            </div>

            <Button
              size="sm"
              className="shrink-0 h-10 px-4 text-xs font-bold gap-1"
              onClick={onNavigateToLens}
            >
              <span>{locale === 'kk' ? 'Тексеру' : 'Проверить'}</span>
              <IconArrowRight size={14} />
            </Button>
          </section>
        </div>

        {/* Right Column: Mission Quest & Skill Journey (7 cols on desktop) */}
        <div className="md:col-span-7 flex flex-col gap-5">
          {/* 4. Today Mission Quest Card */}
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <IconSparkles size={14} className="text-amber-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  {locale === 'kk' ? 'Бүгінгі басты тапсырма' : 'Главная миссия дня'}
                </span>
              </div>
              <span className="text-xs font-bold text-amber-700">
                +{todayMission.xp_reward} XP
              </span>
            </div>

            <MissionCard
              scenario={todayMission}
              onStart={onStartMission}
            />
          </section>

          {/* 5. Skill Journey Interactive Pathway */}
          <SkillJourney milestones={skillJourney} />
        </div>
      </div>
    </JuniorLayout>
  );
}
