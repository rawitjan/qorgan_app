'use client';

import React, { useState } from 'react';
import {
  IconUser,
  IconShield,
  IconTrophy,
  IconHistory,
  IconSettings,
  IconLanguage,
  IconLock,
  IconTrash,
  IconAlertTriangle,
  IconCheck,
  IconChevronRight,
  IconSparkles,
  IconFlame,
} from '@tabler/icons-react';
import { QorganScore } from '@/components/qorgan/qorgan-score';
import { SkillProgress } from '@/components/qorgan/skill-progress';
import { AchievementBadge } from '@/components/qorgan/achievement-badge';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import { useMode } from '@/context/mode-context';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ProfileView({
  onDeleteLensHistory,
  onNavigateToSkills,
  onNavigateToAchievements,
  className,
}: {
  onDeleteLensHistory?: () => void;
  onNavigateToSkills?: () => void;
  onNavigateToAchievements?: () => void;
  className?: string;
}) {
  const { mode, toggleMode, locale, setLocale } = useMode();
  const { score, skills, level, xp, streak, recentActivities } = useDashboardData();
  const { showToast } = useToast();

  const isJunior = mode === 'junior';

  // Local settings toggles
  const [telemetrySharing, setTelemetrySharing] = useState(true);
  const [localEncryption, setLocalEncryption] = useState(true);
  const [showClearHistoryConfirm, setShowClearHistoryConfirm] = useState(false);
  const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] = useState(false);

  const handleClearHistory = () => {
    onDeleteLensHistory?.();
    setShowClearHistoryConfirm(false);
    showToast({
      title: locale === 'kk' ? 'Lens тарихы өшірілді' : 'История Lens очищена',
      description: locale === 'kk' ? 'Барлық сақталған сканерлеулер жойылды' : 'Все сохраненные сканирования удалены',
      type: 'success',
    });
  };

  const handleDeleteAccount = () => {
    setShowDeleteAccountConfirm(false);
    showToast({
      title: locale === 'kk' ? 'Тіркелгіні жою сұранысы қабылданды' : 'Запрос на удаление принят',
      description: locale === 'kk' ? 'Деректер 24 сағат ішінде өшіріледі' : 'Данные будут стерты в течение 24 часов',
      type: 'warning',
    });
  };

  return (
    <div className={cn('w-full animate-in fade-in-50 duration-200', className)}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Identity, Score & Skills (6 cols on desktop) */}
        <div className="md:col-span-6 flex flex-col gap-5">
          {/* 1. Profile Identity Header */}
          <div className="p-5 rounded-2xl border border-border bg-surface flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary border border-primary/40 font-bold text-xl">
                  {isJunior ? '👦' : <IconUser size={28} />}
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-black text-[10px] font-extrabold border-2 border-surface">
                  {level.number}
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="text-base font-bold text-foreground">
                  {locale === 'kk' ? 'Аслан Нұрланұлы' : 'Аслан Нурланов'}
                </h3>
                <span className="text-xs text-primary font-semibold">
                  {locale === 'kk' ? level.title_kk : level.title_ru} • {xp.current} XP
                </span>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                  <IconFlame size={12} className="text-orange-400" />
                  <span>{streak.days} {locale === 'kk' ? 'күндік страйк' : 'дня подряд'}</span>
                </div>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border border-primary/30 bg-primary/10 text-primary">
              {isJunior ? 'JUNIOR' : 'STANDARD'}
            </span>
          </div>

          {/* 2. QORGAN Score Telemetry Shield */}
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {locale === 'kk' ? 'Қауіпсіздік индексі' : 'Индекс безопасности'}
              </span>
              <span className="text-xs font-mono font-bold text-primary">
                {score} / 1000
              </span>
            </div>

            <QorganScore
              score={score}
              ratingKk="Қорғаныс деңгейі жоғары"
              ratingRu="Высокий уровень защиты"
            />
          </section>

          {/* 3. Skills Preview */}
          <section className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {locale === 'kk' ? 'Дағдылар профилі' : 'Профиль навыков'}
              </span>
              {onNavigateToSkills && (
                <button
                  onClick={onNavigateToSkills}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
                >
                  <span>{locale === 'kk' ? 'Барлық 9 дағды' : 'Все 9 навыков'}</span>
                  <IconChevronRight size={14} />
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {skills.slice(0, 3).map((skill) => (
                <SkillProgress key={skill.id} skill={skill} />
              ))}
            </div>
          </section>

          {/* 4. Recent Activity Log */}
          <section className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {locale === 'kk' ? 'Соңғы белсенділік' : 'История активности'}
              </span>
            </div>

            <div className="flex flex-col gap-2 p-3 rounded-2xl border border-border bg-surface">
              {recentActivities.map((act) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 text-xs"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">
                      {locale === 'kk' ? act.title_kk : act.title_ru}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{act.timestamp}</span>
                  </div>
                  {act.score_delta && (
                    <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      +{act.score_delta}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Settings & Security Controls (6 cols on desktop) */}
        <div className="md:col-span-6 flex flex-col gap-5">
          {/* 5. Settings Section */}
          <section className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
              {locale === 'kk' ? 'Баптаулар мен құпиялылық' : 'Настройки и приватность'}
            </span>

            <div className="p-4 rounded-2xl border border-border bg-surface flex flex-col gap-4">
              {/* Language Setting */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconLanguage size={18} className="text-primary" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">
                      {locale === 'kk' ? 'Қолданба тілі' : 'Язык приложения'}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {locale === 'kk' ? 'Қазақша / Русский' : 'Казахский / Русский'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-raised border border-border">
                  <button
                    onClick={() => setLocale('kk')}
                    className={cn(
                      'touch-target px-2.5 py-1 rounded-lg text-xs font-bold transition-colors',
                      locale === 'kk'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    KK
                  </button>
                  <button
                    onClick={() => setLocale('ru')}
                    className={cn(
                      'touch-target px-2.5 py-1 rounded-lg text-xs font-bold transition-colors',
                      locale === 'ru'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    RU
                  </button>
                </div>
              </div>

              {/* Interface Mode Switcher */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <IconShield size={18} className="text-primary" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">
                      {locale === 'kk' ? 'Интерфейс режимі' : 'Режим интерфейса'}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {isJunior ? 'Junior (13–15)' : 'Standard (16+)'}
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleMode}
                  className="h-8 text-xs font-bold"
                >
                  {isJunior ? 'Standard-қа ауысу' : 'Junior-ге ауысу'}
                </Button>
              </div>

              {/* Privacy Telemetry Toggle */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <IconLock size={18} className="text-emerald-400" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">
                      {locale === 'kk' ? 'Анонимді қауіп телеметриясы' : 'Анонимная телеметрия'}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {locale === 'kk' ? 'Pulse қауіптерін жаңарту үшін' : 'Для обновления базы Pulse'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setTelemetrySharing(!telemetrySharing)}
                  className={cn(
                    'w-11 h-6 rounded-full transition-colors relative p-0.5',
                    telemetrySharing ? 'bg-primary' : 'bg-surface-raised border border-border'
                  )}
                >
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full bg-white transition-transform',
                      telemetrySharing ? 'translate-x-5' : 'translate-x-0'
                    )}
                  />
                </button>
              </div>

              {/* Delete Lens History Button */}
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">
                    {locale === 'kk' ? 'Lens тарихын өшіру' : 'Очистить историю Lens'}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {locale === 'kk' ? 'Сканерленген сілтемелер мен фотоларды тазарту' : 'Удалить все локальные сканирования'}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowClearHistoryConfirm(true)}
                  className="h-8 text-xs text-red-400 border-red-500/30 hover:bg-red-500/10 gap-1"
                >
                  <IconTrash size={13} />
                  <span>{locale === 'kk' ? 'Тазарту' : 'Очистить'}</span>
                </Button>
              </div>
            </div>

            {/* Danger Zone: Delete Account */}
            <div className="p-4 rounded-2xl border border-red-500/30 bg-red-950/10 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-red-400">
                  {locale === 'kk' ? 'Тіркелгіні жою' : 'Удаление аккаунта'}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {locale === 'kk'
                    ? 'Барлық дағдылар мен деректер біржола өшіріледі'
                    : 'Все навыки и прогресс будут безвозвратно удалены'}
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteAccountConfirm(true)}
                className="h-8 text-xs text-red-400 border-red-500/40 hover:bg-red-500/20"
              >
                {locale === 'kk' ? 'Тіркелгіні жою' : 'Удалить'}
              </Button>
            </div>
          </section>
        </div>
      </div>

      {/* Confirmation Modal: Clear Lens History */}
      {showClearHistoryConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in-50 duration-150">
          <div className="w-full max-w-sm p-5 rounded-2xl border border-border bg-surface-raised flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
                <IconTrash size={20} />
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold text-foreground">
                  {locale === 'kk' ? 'Lens тарихын өшіру?' : 'Очистить историю Lens?'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {locale === 'kk'
                    ? 'Барлық тексерілген фотолар мен сілтемелер құрылғыдан жойылады.'
                    : 'Все проверенные сканирования будут удалены с устройства.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowClearHistoryConfirm(false)}
                className="h-9 px-3 text-xs"
              >
                {locale === 'kk' ? 'Бас тарту' : 'Отмена'}
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleClearHistory}
                className="h-9 px-3 text-xs bg-red-500 hover:bg-red-600 text-white font-bold"
              >
                {locale === 'kk' ? 'Иә, тазарту' : 'Да, очистить'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Delete Account */}
      {showDeleteAccountConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in-50 duration-150">
          <div className="w-full max-w-sm p-5 rounded-2xl border border-red-500/50 bg-surface-raised flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
                <IconAlertTriangle size={20} />
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold text-foreground">
                  {locale === 'kk' ? 'Тіркелгіні шынымен жоясыз ба?' : 'Действительно удалить аккаунт?'}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {locale === 'kk'
                    ? 'Бұл әрекет қайтарылмайды. Барлық жетістіктеріңіз жойылады.'
                    : 'Это действие необратимо. Весь прогресс и достижения будут удалены.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteAccountConfirm(false)}
                className="h-9 px-3 text-xs"
              >
                {locale === 'kk' ? 'Бас тарту' : 'Отмена'}
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleDeleteAccount}
                className="h-9 px-3 text-xs bg-red-500 hover:bg-red-600 text-white font-bold"
              >
                {locale === 'kk' ? 'Иә, жою' : 'Да, удалить'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
