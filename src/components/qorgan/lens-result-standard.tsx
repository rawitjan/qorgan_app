'use client';

import React, { useState } from 'react';
import {
  IconShieldCheck,
  IconInfoCircle,
  IconChevronDown,
  IconChevronUp,
  IconServer,
  IconRefresh,
} from '@tabler/icons-react';
import { RiskBadge, RiskGauge } from '@/components/qorgan/risk-badge';
import { LensFindingCard } from '@/components/qorgan/lens-finding';
import { LegalRecommendation } from '@/components/qorgan/legal-recommendation';
import { MissionCard } from '@/components/qorgan/mission-card';
import { Button } from '@/components/ui/button';
import { LensScan, LensTechnicalDetails, Scenario } from '@/types';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function LensResultStandard({
  scan,
  technicalDetails,
  onReset,
  onStartTraining,
  className,
}: {
  scan: LensScan;
  technicalDetails?: LensTechnicalDetails | null;
  onReset?: () => void;
  onStartTraining?: (scenario: Scenario) => void;
  className?: string;
}) {
  const { locale } = useMode();
  const [techOpen, setTechOpen] = useState(false);

  const score = scan.risk_score ?? 87;
  const riskLevel = scan.risk_level ?? 'CRITICAL';
  const isHighRisk = riskLevel === 'CRITICAL' || riskLevel === 'HIGH';

  const recommendedMission: Scenario = {
    id: 101,
    slug: 'kazpost-spoof-defense',
    title:
      locale === 'kk'
        ? 'Kazpost және курьерлік фишингтен қорғану'
        : 'Защита от почтового и курьерского фишинга',
    category: 'phishing',
    difficulty: 'medium',
    age_mode: 'adult',
    description:
      locale === 'kk'
        ? 'Жалған төлем беттері мен алаяқтық хаттарды тану бойынша жедел тренинг.'
        : 'Практический тренинг по распознаванию поддельных платежных страниц и писем.',
    estimated_time: 5,
    xp_reward: 120,
  };

  return (
    <div className={cn('flex flex-col gap-4 w-full animate-in fade-in-50 duration-250', className)}>
      {/* 1. Primary Risk Verdict Card */}
      <div
        className={cn(
          'p-5 rounded-2xl border bg-surface flex flex-col gap-4 shadow-md',
          isHighRisk ? 'border-red-500/40 bg-red-950/10' : 'border-emerald-500/40 bg-emerald-950/10'
        )}
      >
        <div className="flex items-center justify-between">
          <RiskBadge level={riskLevel} size="default" />
          <div className="flex items-center gap-1 font-mono text-xs font-bold text-muted-foreground">
            <span>RISK INDEX:</span>
            <span className={cn('text-sm', isHighRisk ? 'text-red-400' : 'text-emerald-400')}>
              {score} / 100
            </span>
          </div>
        </div>

        {/* Visual Segmented Risk Gauge */}
        <RiskGauge score={score} />

        <div className="flex flex-col gap-1.5 pt-1">
          <h3 className="text-base font-bold text-foreground">
            {isHighRisk
              ? locale === 'kk'
                ? 'Аса қауіпті нысан анықталды'
                : 'Обнаружен опасный объект'
              : locale === 'kk'
              ? 'Қауіп белгілері анықталған жоқ'
              : 'Угрозы не обнаружены'}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {scan.summary}
          </p>
        </div>
      </div>

      {/* 2. "Why" Forensic Explanation */}
      <div className="p-4 rounded-xl border border-border bg-surface flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <IconInfoCircle size={15} className="text-primary" />
          <span>{locale === 'kk' ? 'Неліктен бұл қауіпті? (Себебі)' : 'Почему это опасно? (Причина)'}</span>
        </div>
        <p className="text-xs text-foreground/90 leading-relaxed">
          {locale === 'kk'
            ? 'Сайт домені ресми мекемелермен байланыссыз. Қолданушының банк картасы деректерін, CVV кодын және 3D-Secure SMS растау кодын жасырын тартып алуға бағытталған фишингтік скрипттер тіркелді.'
            : 'Домен не принадлежит официальным ведомствам. Зафиксированы фишинговые сценарии для перехвата реквизитов карты, CVV-кода и разовых 3D-Secure SMS-паролей.'}
        </p>
      </div>

      {/* 3. Detailed Forensic Findings Breakdown */}
      {scan.findings && scan.findings.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
            {locale === 'kk'
              ? `Анықталған сигналдар (${scan.findings.length})`
              : `Выявленные сигналы (${scan.findings.length})`}
          </span>
          <div className="flex flex-col gap-2">
            {scan.findings.map((finding) => (
              <LensFindingCard key={finding.id} finding={finding} />
            ))}
          </div>
        </div>
      )}

      {/* 4. Prioritized Recommended Actions */}
      <div className="p-4 rounded-xl border border-border bg-surface flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
          <IconShieldCheck size={16} className="text-primary" />
          <span>{locale === 'kk' ? 'Ұсынылатын іс-қимылдар' : 'Рекомендуемые действия'}</span>
        </div>

        <ol className="flex flex-col gap-2 text-xs text-muted-foreground list-decimal list-inside leading-relaxed">
          <li>
            <strong className="text-foreground">
              {locale === 'kk' ? 'Сілтемені дереу жабыңыз: ' : 'Закройте ресурс: '}
            </strong>
            {locale === 'kk'
              ? 'Ешқандай деректі, телефон нөмірін немесе SMS кодты енгізбеңіз.'
              : 'Ни в коем случае не вводите номера телефонов, пароли или SMS-коды.'}
          </li>
          <li>
            <strong className="text-foreground">
              {locale === 'kk' ? 'Картаны бұғаттау: ' : 'Блокировка карты: '}
            </strong>
            {locale === 'kk'
              ? 'Егер деректер енгізіліп қойса, банк қосымшасында (Kaspi, Halyk) картаны бұғаттап, қолдау қызметіне хабарласыңыз.'
              : 'Если данные уже введены, немедленно заблокируйте карту в приложении банка.'}
          </li>
          <li>
            <strong className="text-foreground">
              {locale === 'kk' ? 'Нөмірді бұғаттау: ' : 'Блокировка отправителя: '}
            </strong>
            {locale === 'kk'
              ? 'Хабарлама келген WhatsApp/SMS нөмірін спам ретінде белгілеңіз.'
              : 'Пометьте номер отправителя как спам и заблокируйте.'}
          </li>
        </ol>
      </div>

      {scan.legal_recommendation && (
        <LegalRecommendation recommendation={scan.legal_recommendation} />
      )}

      {/* 5. Collapsible Technical Details (Forensics) */}
      {technicalDetails && (
        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <button
            onClick={() => setTechOpen(!techOpen)}
            className="w-full flex items-center justify-between p-3.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-surface-raised/40 transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <IconServer size={15} />
              <span>{locale === 'kk' ? 'Техникалық телеметрия (Forensics)' : 'Техническая телеметрия (Forensics)'}</span>
            </div>
            {techOpen ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
          </button>

          {techOpen && (
            <div className="p-4 border-t border-border/60 flex flex-col gap-2 font-mono text-[11px] text-muted-foreground bg-surface-raised/30">
              <div className="flex justify-between">
                <span>Target:</span>
                <span className="text-foreground break-all max-w-[220px]">{technicalDetails.target}</span>
              </div>
              {technicalDetails.resolved_ip && (
                <div className="flex justify-between">
                  <span>Resolved IP:</span>
                  <span className="text-foreground">{technicalDetails.resolved_ip}</span>
                </div>
              )}
              {technicalDetails.registered_region && (
                <div className="flex justify-between">
                  <span>Geo Region:</span>
                  <span className="text-foreground">{technicalDetails.registered_region}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>SSL Status:</span>
                <span className={technicalDetails.ssl_certified ? 'text-emerald-400' : 'text-amber-400'}>
                  {technicalDetails.ssl_certified ? 'Certified TLS' : 'Untrusted / Self-signed'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>SHA-256:</span>
                <span className="text-foreground truncate max-w-[160px]">{technicalDetails.sha256_hash}</span>
              </div>
              <div className="flex justify-between">
                <span>Scan Duration:</span>
                <span className="text-foreground">{technicalDetails.execution_duration_ms} ms</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. Recommended Training Simulation */}
      <div className="flex flex-col gap-2 mt-1">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
          {locale === 'kk' ? 'Дағдыны бекіту үшін тренинг' : 'Обучение для закрепления навыка'}
        </span>
        <MissionCard
          scenario={recommendedMission}
          onStart={onStartTraining}
        />
      </div>

      {/* Reset & New Scan Trigger */}
      <Button
        variant="outline"
        className="w-full h-11 text-xs gap-1.5 mt-2"
        onClick={onReset}
      >
        <IconRefresh size={14} />
        <span>{locale === 'kk' ? 'Жаңа тексеру бастау' : 'Начать новую проверку'}</span>
      </Button>
    </div>
  );
}
