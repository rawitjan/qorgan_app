'use client';

import React, { useState } from 'react';
import {
  IconBuildingCommunity,
  IconUsers,
  IconFolder,
  IconClipboardCheck,
  IconChartBar,
  IconShieldLock,
  IconArrowLeft,
  IconTrendingUp,
  IconAlertTriangle,
  IconCheck,
  IconEyeOff,
  IconClock,
  IconChevronRight,
  IconX,
  IconPlus,
} from '@tabler/icons-react';
import { useOrganization } from '@/hooks/use-organization';
import { OrgMember, OrgGroup, OrgAssignment } from '@/types';
import { RiskBadge } from '@/components/qorgan/risk-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function OrganizationWorkspace({
  onExitToPersonal,
  className,
}: {
  onExitToPersonal: () => void;
  className?: string;
}) {
  const { locale } = useMode();
  const {
    orgName,
    currentTab,
    setCurrentTab,
    members,
    groups,
    assignments,
    analytics,
    selectedMember,
    setSelectedMember,
  } = useOrganization();

  const [groupFilter, setGroupFilter] = useState<string>('all');

  const filteredMembers = members.filter((m) => {
    if (groupFilter === 'all') return true;
    return m.group_name === groupFilter;
  });

  return (
    <div className={cn('flex flex-col gap-4 w-full animate-in fade-in-50 duration-200', className)}>
      {/* 1. Organization Header Bar */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-surface border border-border shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/30">
            <IconBuildingCommunity size={22} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                {locale === 'kk' ? 'Ұйымдық басқару' : 'Организация'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <h2 className="text-xs font-bold text-foreground truncate max-w-[200px]">
              {orgName}
            </h2>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onExitToPersonal}
          className="h-8 px-2.5 text-xs font-bold gap-1 border-border hover:bg-surface-raised"
        >
          <IconArrowLeft size={13} />
          <span>{locale === 'kk' ? 'Жеке профиль' : 'Личный'}</span>
        </Button>
      </div>

      {/* 2. Mandatory Zero-Knowledge Privacy Banner */}
      <div className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 flex items-start gap-2.5 shadow-sm">
        <IconShieldLock size={18} className="text-primary shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-bold text-emerald-300">
            {locale === 'kk' ? 'Құпиялылық кепілдігі (Zero-Knowledge)' : 'Гарантия конфиденциальности'}
          </span>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {locale === 'kk'
              ? 'Ұйым жетекшісі пайдаланушылардың жеке Lens сараптамаларын (сілтемелер, фотолар, SMS) КӨРЕ АЛМАЙДЫ. Тек жиынтық қауіпсіздік индексі мен тапсырма нәтижелері көрсетіледі.'
              : 'Менеджер НЕ видит персональный контент Lens (ссылки, фото, переписки). Доступны только обобщенные индексы безопасности и прогресс миссий.'}
          </p>
        </div>
      </div>

      {/* 3. Responsive Navigation Tabs (Cards/Pills, touch target >= 44px) */}
      <div className="grid grid-cols-5 gap-1 p-1 rounded-xl bg-surface border border-border select-none">
        <button
          onClick={() => setCurrentTab('overview')}
          className={cn(
            'touch-target flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-lg text-xs font-semibold transition-colors',
            currentTab === 'overview'
              ? 'bg-surface-raised text-primary border border-primary/30 font-bold shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <IconChartBar size={15} />
          <span className="text-[10px]">{locale === 'kk' ? 'Шолу' : 'Обзор'}</span>
        </button>

        <button
          onClick={() => setCurrentTab('members')}
          className={cn(
            'touch-target flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-lg text-xs font-semibold transition-colors',
            currentTab === 'members'
              ? 'bg-surface-raised text-primary border border-primary/30 font-bold shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <IconUsers size={15} />
          <span className="text-[10px]">{locale === 'kk' ? 'Мүшелер' : 'Участники'}</span>
        </button>

        <button
          onClick={() => setCurrentTab('groups')}
          className={cn(
            'touch-target flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-lg text-xs font-semibold transition-colors',
            currentTab === 'groups'
              ? 'bg-surface-raised text-primary border border-primary/30 font-bold shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <IconFolder size={15} />
          <span className="text-[10px]">{locale === 'kk' ? 'Топтар' : 'Группы'}</span>
        </button>

        <button
          onClick={() => setCurrentTab('assignments')}
          className={cn(
            'touch-target flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-lg text-xs font-semibold transition-colors',
            currentTab === 'assignments'
              ? 'bg-surface-raised text-primary border border-primary/30 font-bold shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <IconClipboardCheck size={15} />
          <span className="text-[10px]">{locale === 'kk' ? 'Тапсырма' : 'Задания'}</span>
        </button>

        <button
          onClick={() => setCurrentTab('analytics')}
          className={cn(
            'touch-target flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-lg text-xs font-semibold transition-colors',
            currentTab === 'analytics'
              ? 'bg-surface-raised text-primary border border-primary/30 font-bold shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <IconTrendingUp size={15} />
          <span className="text-[10px]">{locale === 'kk' ? 'Аналитика' : 'Аналитика'}</span>
        </button>
      </div>

      {/* 4. Tab Views */}

      {/* TAB 1: OVERVIEW */}
      {currentTab === 'overview' && (
        <div className="flex flex-col gap-4 animate-in fade-in-50 duration-150">
          {/* KPI Summary Grid (Responsive: 2 on mobile, 4 on desktop) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl border border-border bg-surface flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {locale === 'kk' ? 'Қатысушылар' : 'Участников'}
              </span>
              <span className="text-2xl font-extrabold font-mono text-foreground">
                {analytics.total_participants}
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                <IconTrendingUp size={12} />
                +14 осы айда
              </span>
            </div>

            <div className="p-3.5 rounded-2xl border border-primary/30 bg-surface flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {locale === 'kk' ? 'Орташа QORGAN' : 'Средний балл'}
              </span>
              <span className="text-2xl font-extrabold font-mono text-primary">
                {analytics.avg_score} <span className="text-xs font-normal text-muted-foreground">/ 1000</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                <IconTrendingUp size={12} />
                +38 ұпай өсім
              </span>
            </div>
          </div>

          {/* Risk Tier Distribution */}
          <div className="p-4 rounded-2xl border border-border bg-surface flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {locale === 'kk' ? 'Қауіп деңгейі бойынша бөліну' : 'Распределение по рискам'}
            </span>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {locale === 'kk' ? 'Қауіпсіз (Low)' : 'Безопасные'}
                </span>
                <span className="font-mono font-bold text-foreground">
                  {analytics.risk_distribution.low} ({Math.round((analytics.risk_distribution.low / analytics.total_participants) * 100)}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-raised overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${(analytics.risk_distribution.low / analytics.total_participants) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-yellow-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  {locale === 'kk' ? 'Назар аудару (Moderate)' : 'Внимание'}
                </span>
                <span className="font-mono font-bold text-foreground">
                  {analytics.risk_distribution.moderate} ({Math.round((analytics.risk_distribution.moderate / analytics.total_participants) * 100)}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-raised overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${(analytics.risk_distribution.moderate / analytics.total_participants) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-red-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  {locale === 'kk' ? 'Жоғары қауіп (High Risk)' : 'Высокий риск'}
                </span>
                <span className="font-mono font-bold text-foreground">
                  {analytics.risk_distribution.high} ({Math.round((analytics.risk_distribution.high / analytics.total_participants) * 100)}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-raised overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${(analytics.risk_distribution.high / analytics.total_participants) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MEMBERS (Responsive Mobile Cards & Drawers — NO wide desktop tables!) */}
      {currentTab === 'members' && (
        <div className="flex flex-col gap-3 animate-in fade-in-50 duration-150">
          {/* Group Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar select-none">
            <button
              onClick={() => setGroupFilter('all')}
              className={cn(
                'touch-target shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors',
                groupFilter === 'all'
                  ? 'bg-primary text-primary-foreground font-bold'
                  : 'bg-surface border border-border text-muted-foreground'
              )}
            >
              {locale === 'kk' ? 'Барлығы' : 'Все'}
            </button>
            {groups.map((g) => (
              <button
                key={g.id}
                onClick={() => setGroupFilter(g.name)}
                className={cn(
                  'touch-target shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors',
                  groupFilter === g.name
                    ? 'bg-primary text-primary-foreground font-bold'
                    : 'bg-surface border border-border text-muted-foreground'
                )}
              >
                {g.name}
              </button>
            ))}
          </div>

          {/* Members List (Responsive Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="p-3.5 rounded-2xl border border-border bg-surface hover:border-primary/40 hover:bg-surface-raised transition-all flex items-center justify-between cursor-pointer active:scale-[0.99] group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-raised border border-border text-foreground font-bold text-sm group-hover:border-primary/50 transition-colors">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground leading-tight">
                      {member.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {member.group_name} • {member.last_active}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-mono font-bold text-primary">
                      {member.qorgan_score}
                    </span>
                    <RiskBadge level={member.risk_level} size="sm" />
                  </div>
                  <IconChevronRight size={16} className="text-muted-foreground group-hover:text-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GROUPS */}
      {currentTab === 'groups' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in-50 duration-150">
          {groups.map((grp) => (
            <div
              key={grp.id}
              className="p-4 rounded-2xl border border-border bg-surface flex flex-col gap-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <IconFolder size={18} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-foreground">{grp.name}</h4>
                    <span className="text-[11px] text-muted-foreground">
                      {grp.member_count} {locale === 'kk' ? 'оқушы' : 'учеников'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-sm font-mono font-bold text-primary">
                    {grp.avg_score} / 1000
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {locale === 'kk' ? 'Орташа ұпай' : 'Средний балл'}
                  </span>
                </div>
              </div>

              {/* Vulnerability Alert for Group */}
              <div className="p-2.5 rounded-xl bg-surface-raised border border-border flex items-center gap-2 text-xs">
                <IconAlertTriangle size={14} className="text-amber-400 shrink-0" />
                <span className="text-muted-foreground">
                  {locale === 'kk' ? 'Әлсіз тұс:' : 'Уязвимость:'}{' '}
                  <strong className="text-foreground">{grp.dominant_vulnerability}</strong>
                </span>
              </div>

              {/* Progress Completion Bar */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">{locale === 'kk' ? 'Миссияларды орындау' : 'Прогресс заданий'}</span>
                  <span className="font-mono font-bold text-foreground">{grp.completion_rate}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-raised overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${grp.completion_rate}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: ASSIGNMENTS */}
      {currentTab === 'assignments' && (
        <div className="flex flex-col gap-3 animate-in fade-in-50 duration-150">
          <Button size="sm" className="w-full h-10 text-xs font-bold gap-1.5 mb-1">
            <IconPlus size={15} />
            <span>{locale === 'kk' ? 'Жаңа миссия тағайындау' : 'Назначить новую миссию'}</span>
          </Button>

          {assignments.map((asg) => (
            <div
              key={asg.id}
              className="p-4 rounded-2xl border border-border bg-surface flex flex-col gap-3 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <Badge variant="outline" className="w-fit text-[10px] uppercase border-primary/40 text-primary mb-1">
                    {asg.status}
                  </Badge>
                  <h4 className="text-sm font-bold text-foreground leading-snug">
                    {locale === 'kk' ? asg.title_kk : asg.title_ru}
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold text-primary">
                  {Math.round((asg.completed_count / asg.total_assigned) * 100)}%
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <span>{locale === 'kk' ? 'Топтар:' : 'Группы:'} {asg.target_groups.join(', ')}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border">
                <span className="flex items-center gap-1">
                  <IconClock size={12} />
                  {asg.due_date}
                </span>
                <span className="font-mono">
                  {asg.completed_count} / {asg.total_assigned} {locale === 'kk' ? 'тапсырды' : 'сдали'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: ANALYTICS (Skill Profile, Before/After Intervention) */}
      {currentTab === 'analytics' && (
        <div className="flex flex-col gap-4 animate-in fade-in-50 duration-150">
          {/* Before vs After Intervention Comparison Card */}
          <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                {locale === 'kk' ? 'Тренингке дейін / Кейін (Нәтиже)' : 'До / После вмешательства'}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                +{analytics.before_after.improvement_pct}% ӨСІМ
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-3 rounded-xl bg-surface/80 border border-border flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                  {locale === 'kk' ? 'Тренингке дейін' : 'До тренинга'}
                </span>
                <span className="text-xl font-extrabold font-mono text-muted-foreground">
                  {analytics.before_after.before_score}
                </span>
                <span className="text-[10px] text-red-400 mt-0.5">
                  Қауіпті тану: {analytics.before_after.detection_rate_before}%
                </span>
              </div>

              <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 flex flex-col">
                <span className="text-[10px] text-primary uppercase font-semibold">
                  {locale === 'kk' ? 'Тренингтен кейін' : 'После тренинга'}
                </span>
                <span className="text-xl font-extrabold font-mono text-primary">
                  {analytics.before_after.after_score}
                </span>
                <span className="text-[10px] text-emerald-400 mt-0.5">
                  Қауіпті тану: {analytics.before_after.detection_rate_after}%
                </span>
              </div>
            </div>
          </div>

          {/* Skill Profile Breakdown across all participants */}
          <div className="p-4 rounded-2xl border border-border bg-surface flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {locale === 'kk' ? 'Ұжымдық дағдылар профилі' : 'Коллективный профиль навыков'}
            </span>

            <div className="flex flex-col gap-2.5">
              {analytics.skill_averages.map((sk) => (
                <div key={sk.slug} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">
                      {locale === 'kk' ? sk.name_kk : sk.name_ru}
                    </span>
                    <span className="font-mono font-bold text-primary">{sk.score} / 100</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface-raised overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${sk.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Member Detail Drawer / Modal (NO private Lens content!) */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-surface border border-border rounded-t-3xl sm:rounded-3xl p-5 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary font-bold">
                  {selectedMember.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-foreground">{selectedMember.name}</h3>
                  <span className="text-xs text-muted-foreground">{selectedMember.group_name}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="touch-target flex h-8 w-8 items-center justify-center rounded-full bg-surface-raised text-muted-foreground hover:text-foreground"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Zero-Knowledge Notice for Manager */}
            <div className="p-2.5 rounded-xl bg-surface-raised border border-border flex items-center gap-2 text-[11px] text-muted-foreground">
              <IconEyeOff size={15} className="text-primary shrink-0" />
              <span>
                {locale === 'kk'
                  ? 'Жеке Lens сканерлеулері жасырылған. Тек білімдік дайындық көрсетілген.'
                  : 'Личные сканирования Lens скрыты. Доступен только индекс готовности.'}
              </span>
            </div>

            {/* Member KPI */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-surface-raised border border-border flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">QORGAN Score</span>
                <span className="text-lg font-bold font-mono text-primary">{selectedMember.qorgan_score}</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-raised border border-border flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                  {locale === 'kk' ? 'Тапсырмалар' : 'Задания'}
                </span>
                <span className="text-lg font-bold font-mono text-foreground">
                  {selectedMember.assignments_completed} / {selectedMember.total_assignments}
                </span>
              </div>
            </div>

            <Button onClick={() => setSelectedMember(null)} className="w-full h-11 text-xs font-bold">
              {locale === 'kk' ? 'Жабу' : 'Закрыть'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
