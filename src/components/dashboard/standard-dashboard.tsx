'use client';

import React from 'react';
import {
  IconTrendingUp,
  IconArrowRight,
  IconRadar,
  IconScan,
  IconShieldCheck,
} from '@tabler/icons-react';
import { QorganScore } from '@/components/qorgan/qorgan-score';
import { SkillProgress } from '@/components/qorgan/skill-progress';
import { ThreatCard } from '@/components/qorgan/threat-card';
import { MissionCard } from '@/components/qorgan/mission-card';
import { RecentActivityList } from '@/components/dashboard/recent-activity';
import { StandardLayout } from '@/components/layout/standard-layout';
import { Button } from '@/components/ui/button';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import { useMode } from '@/context/mode-context';
import { Scenario } from '@/types';
import { cn } from '@/lib/utils';

export function StandardDashboard({
  onNavigateToLens,
  onNavigateToPulse,
  onStartMission,
  className,
}: {
  onNavigateToLens?: () => void;
  onNavigateToPulse?: () => void;
  onStartMission?: (scenario: Scenario) => void;
  className?: string;
}) {
  const { locale } = useMode();
  const {
    score,
    scoreChange,
    skills,
    threats,
    todayMission,
    recentActivities,
  } = useDashboardData();

  return (
    <StandardLayout className={cn('w-full', className)}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Telemetry, Score & Skills Profile (5 columns on desktop) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          {/* 1. QORGAN Score & Telemetry Header */}
          <section className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {locale === 'kk' ? 'Қауіпсіздік индексі' : 'Индекс безопасности'}
              </span>

              {/* Telemetry Score Change Chip */}
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <IconTrendingUp size={12} />
                <span>
                  +{scoreChange.delta} {locale === 'kk' ? 'ұпай осы аптада' : 'баллов за неделю'}
                </span>
              </div>
            </div>

            <QorganScore
              score={score}
              ratingKk="Қорғаныс деңгейі жоғары"
              ratingRu="Высокий уровень защиты"
            />
          </section>

          {/* 2. QORGAN Lens Diagnostic CTA */}
          <section className="relative overflow-hidden p-5 rounded-[24px] border border-primary/15 bg-primary-muted flex items-center justify-between gap-3 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <IconScan size={22} />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-foreground">
                  {locale === 'kk' ? 'QORGAN Lens диагностикасы' : 'Диагностика QORGAN Lens'}
                </span>
                <span className="text-[11px] text-muted-foreground line-clamp-1">
                  {locale === 'kk'
                    ? 'Күдікті сілтемелер мен файлдарды сараптау'
                    : 'Анализ подозрительных ссылок и файлов'}
                </span>
              </div>
            </div>

            <Button
              size="sm"
              className="shrink-0 h-10 px-3.5 text-xs gap-1 shadow-sm"
              onClick={onNavigateToLens}
            >
              <span>{locale === 'kk' ? 'Тексеру' : 'Проверить'}</span>
              <IconArrowRight size={13} />
            </Button>
          </section>

          {/* 3. Skills Telemetry Breakdown (All 9 Competency Skills) */}
          <section className="flex flex-col gap-3 p-5 rounded-[24px] border border-border/80 bg-surface panel-shadow">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {locale === 'kk' ? 'Қауіпсіздік дағдылары' : 'Профиль навыков'}
              </span>
              <span className="text-[11px] text-muted-foreground font-mono">
                {skills.length} / 9 {locale === 'kk' ? 'белсенді' : 'активно'}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {skills.map((skill) => (
                <SkillProgress key={skill.id} skill={skill} />
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Mission Quest, Threats & Audit Log (7 columns on desktop) */}
        <div className="md:col-span-7 flex flex-col gap-6">
          {/* 4. Recommended Training Mission Quest */}
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {locale === 'kk' ? 'Ұсынылған миссия' : 'Рекомендуемая миссия'}
              </span>
              <span className="text-[11px] text-primary font-semibold">
                +{todayMission.xp_reward} XP
              </span>
            </div>

            <MissionCard
              scenario={todayMission}
              onStart={onStartMission}
            />
          </section>

          {/* 5. Current Threats (Threat Pulse Radar) */}
          <section className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <IconRadar size={14} className="text-orange-700" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {locale === 'kk' ? 'Жедел қауіптер (Pulse)' : 'Оперативные угрозы (Pulse)'}
                </span>
              </div>

              <button
                onClick={onNavigateToPulse}
                className="text-[11px] font-semibold text-primary hover:underline inline-flex items-center gap-0.5"
              >
                <span>{locale === 'kk' ? 'Барлығы' : 'Все'}</span>
                <IconArrowRight size={11} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {threats.map((threat) => (
                <ThreatCard key={threat.id} threat={threat} />
              ))}
            </div>
          </section>

          {/* 6. Recent Activity Audit Log */}
          <RecentActivityList activities={recentActivities} />
        </div>
      </div>
    </StandardLayout>
  );
}
