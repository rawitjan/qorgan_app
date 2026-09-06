'use client';

import React from 'react';
import {
  IconAlertOctagon,
  IconBan,
  IconClock,
  IconKey,
  IconLink,
  IconRefresh,
  IconShield,
  IconShieldCheck,
  IconUserCheck,
} from '@tabler/icons-react';
import { MascotMessage } from '@/components/qorgan/emergency-alert';
import { MissionCard } from '@/components/qorgan/mission-card';
import { LegalRecommendation } from '@/components/qorgan/legal-recommendation';
import { Button } from '@/components/ui/button';
import { LensScan, Scenario } from '@/types';
import { useMode } from '@/context/mode-context';
import { cn, normalizeRiskLevel } from '@/lib/utils';

export function LensResultJunior({
  scan,
  onReset,
  onStartTraining,
  className,
}: {
  scan: LensScan;
  onReset?: () => void;
  onStartTraining?: (scenario: Scenario) => void;
  className?: string;
}) {
  const { locale } = useMode();
  const score = scan.risk_score ?? (scan.risk_level ? 0 : 87);
  const riskLevel = normalizeRiskLevel(scan.risk_level, score);
  const isHighRisk = riskLevel === 'CRITICAL' || riskLevel === 'HIGH' || score >= 50;
  const isModerate = riskLevel === 'MODERATE' || (score >= 30 && score < 50);
  const simpleFindings = (scan.findings ?? []).slice(0, 3);
  const findingIcons = [IconKey, IconLink, IconClock];

  const juniorMission: Scenario = {
    id: 102,
    slug: 'stop-the-imposter',
    title:
      locale === 'kk'
        ? 'Алаяқ ботты анықта: Жедел ойын'
        : 'Распознай бота-обманщика: Быстрая игра',
    category: 'scam_detection',
    difficulty: 'easy',
    age_mode: 'junior',
    description:
      locale === 'kk'
        ? 'Саған сыйлық уәде еткен жалған аккаунтты әшкерелеуді үйрен.'
        : 'Научись разоблачать фейковые аккаунты с бесплатными призами.',
    estimated_time: 4,
    xp_reward: 150,
  };

  return (
    <div className={cn('flex flex-col gap-4 w-full animate-in fade-in-50 duration-250', className)}>
      {/* 1. Large Junior Headline Alert Box */}
      <div
        className={cn(
          'p-5 rounded-3xl border flex flex-col items-center text-center gap-3 shadow-lg select-none',
          isHighRisk
            ? 'border-red-500/50 bg-red-950/20 text-red-200 shadow-[0_0_24px_-4px_rgba(239,68,68,0.25)]'
            : 'border-emerald-500/50 bg-emerald-950/20 text-emerald-200'
        )}
      >
        <div
          className={cn(
            'flex h-16 w-16 items-center justify-center rounded-2xl border transition-all',
            isHighRisk
              ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
              : 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
          )}
        >
          {isHighRisk ? <IconAlertOctagon size={36} /> : <IconShield size={36} />}
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
            {isHighRisk
              ? locale === 'kk'
                ? 'ТОҚТА!'
                : 'СТОП!'
              : locale === 'kk'
              ? 'БӘРІ ДҰРЫС!'
              : 'ВСЁ ЧИСТО!'}
          </h2>
          <p className="text-sm font-bold text-red-400">
            {isHighRisk
              ? locale === 'kk'
                ? 'Бұл қауіпті болуы мүмкін.'
                : 'Это может быть опасно.'
              : locale === 'kk'
              ? 'Бұл сілтеме қауіпсіз.'
              : 'Эта ссылка безопасна.'}
          </p>
        </div>

        {/* Real Score indicator without fake percentage */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-raised border border-border text-xs font-mono font-bold text-foreground">
          <span>{locale === 'kk' ? 'Қауіп деңгейі:' : 'Индекс риска:'}</span>
          <span className={isHighRisk ? 'text-red-400' : 'text-emerald-400'}>
            {score} / 100 ({riskLevel})
          </span>
        </div>
      </div>

      {/* 2. Simple Findings (3 Clear Signs) */}
      {isHighRisk && simpleFindings.length > 0 && (
        <div className="p-4 rounded-2xl border border-border bg-surface flex flex-col gap-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-foreground">
            {locale === 'kk'
              ? `QORGAN ${simpleFindings.length} күмәнді белгі тапты:`
              : `QORGAN обнаружил ${simpleFindings.length} подозрительных сигнала:`}
          </span>

          <div className="flex flex-col gap-2">
            {simpleFindings.map((finding, index) => {
              const FindingIcon = findingIcons[index] ?? IconShield;

              return (
                <div key={finding.id} className="flex items-center gap-2.5 rounded-xl border border-border bg-surface-raised p-2.5 text-xs font-semibold text-foreground">
                  <FindingIcon size={17} className="shrink-0 text-red-400" aria-hidden="true" />
                  <span>{finding.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Large Safety Actions (What to do?) */}
      <div className="p-4 rounded-2xl border border-emerald-500/30 bg-surface flex flex-col gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          {locale === 'kk' ? 'Не істеу керек?' : 'Что делать?'}
        </span>

        <div className="flex flex-col gap-2.5">
          {isHighRisk || isModerate ? (
            <>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-red-950/20 border border-red-500/30 text-xs font-bold text-red-200">
                <IconKey size={19} className="shrink-0" aria-hidden="true" />
                <span>{locale === 'kk' ? 'Кодты берме' : 'Не отдавай код'}</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-red-950/20 border border-red-500/30 text-xs font-bold text-red-200">
                <IconBan size={19} className="shrink-0" aria-hidden="true" />
                <span>{locale === 'kk' ? 'Сілтемені ашпа' : 'Не открывай ссылку'}</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs font-bold text-emerald-300">
                <IconUserCheck size={19} className="shrink-0" aria-hidden="true" />
                <span>
                  {locale === 'kk'
                    ? 'Сенетін ересек адамға көрсет'
                    : 'Покажи взрослому, которому доверяешь'}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs font-bold text-emerald-300">
                <IconShieldCheck size={19} className="shrink-0 text-emerald-400" aria-hidden="true" />
                <span>{locale === 'kk' ? 'Сілтеме қауіпсіз, аша беруге болады' : 'Ссылка безопасна, можно открывать'}</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-950/20 border border-blue-500/30 text-xs font-bold text-blue-200">
                <IconKey size={19} className="shrink-0 text-blue-400" aria-hidden="true" />
                <span>{locale === 'kk' ? 'Бірақ ереже: SMS кодты ешкімге айтпа' : 'Но помни: никому не говори SMS-код'}</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-raised border border-border text-xs font-bold text-foreground">
                <IconUserCheck size={19} className="shrink-0 text-primary" aria-hidden="true" />
                <span>
                  {locale === 'kk'
                    ? 'Күмәндансаң, әрқашан үлкендерден сұра'
                    : 'Если сомневаешься, всегда спроси у взрослых'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {scan.legal_recommendation && (
        <LegalRecommendation recommendation={scan.legal_recommendation} />
      )}

      {/* 4. Mascot Message from "Qorgan-Batyr" */}
      <MascotMessage
        messageKk="Жарайсың! Күмәнді сілтемені бірден ашпай, QORGAN Lens-ке салғаның өте дұрыс болды. Қауіпсіздік ережелерін ұстан!"
        messageRu="Отлично, что ты сначала проверил ссылку здесь, а не открыл её сам! Всегда будь осторожен в сети!"
        actionTextKk="Түсіндім"
        actionTextRu="Понятно"
        onAction={onReset}
      />

      {/* 5. Recommended Cyber Mission */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
          {locale === 'kk' ? 'Тапсырманы орындап, XP ал' : 'Пройди миссию и получи XP'}
        </span>
        <MissionCard
          scenario={juniorMission}
          onStart={onStartTraining}
        />
      </div>

      {/* Reset Trigger */}
      <Button
        variant="junior"
        className="w-full h-12 text-xs font-bold gap-1.5 shadow-md mt-1"
        onClick={onReset}
      >
        <IconRefresh size={16} />
        <span>{locale === 'kk' ? 'Тағы біреуін тексеру' : 'Проверить ещё раз'}</span>
      </Button>
    </div>
  );
}
