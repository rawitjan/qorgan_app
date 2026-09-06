'use client';

import React, { useState } from 'react';
import { IconArrowUpRight, IconAward, IconBolt, IconClock, IconLockOpen, IconTarget } from '@tabler/icons-react';
import { Scenario } from '@/types';
import { ScenarioPlayer } from '@/components/training/scenario-player';
import { ScenarioResult } from '@/components/training/scenario-result';
import { SkillsView } from '@/components/training/skills-view';
import { AchievementsView } from '@/components/training/achievements-view';
import { useTraining } from '@/hooks/use-training';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

const missionCopy: Record<number, { ru: string; kk: string; code: string }> = {
  1: { ru: 'Фальшивая доставка', kk: 'Жалған жеткізу', code: 'SMS / 01' },
  2: { ru: 'Сделка вне OLX', kk: 'OLX-тен тыс мәміле', code: 'MARKET / 02' },
  3: { ru: 'Подарок в Telegram', kk: 'Telegram сыйлығы', code: 'SOCIAL / 03' },
  4: { ru: 'Звонок из банка', kk: 'Банктен қоңырау', code: 'VOICE / 04' },
  5: { ru: 'Травля в чате', kk: 'Чаттағы буллинг', code: 'CHAT / 05' },
  6: { ru: 'Фальшивый штраф', kk: 'Жалған айыппұл', code: 'LEGAL / 06' },
};

const categoryCopy: Record<string, { ru: string; kk: string }> = {
  all: { ru: 'Все дела', kk: 'Барлық істер' },
  phishing: { ru: 'Фишинг', kk: 'Фишинг' },
  scam_detection: { ru: 'Сделки', kk: 'Мәмілелер' },
  social_engineering: { ru: 'Манипуляции', kk: 'Манипуляция' },
  account_security: { ru: 'Аккаунты', kk: 'Аккаунттар' },
  bullying_response: { ru: 'Буллинг', kk: 'Буллинг' },
  legal_literacy: { ru: 'Право', kk: 'Құқық' },
};

export function TrainingModule({ className }: { className?: string }) {
  const { locale } = useMode();
  const {
    scenarios, skills, achievements, currentView, setCurrentView, selectedScenario,
    activeSimulation, currentStepIndex, simulatedMessages, userDecisions,
    simulationResult, isAiResponding, startSimulation, makeDecision, sendCustomMessage,
  } = useTraining();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', ...Array.from(new Set(scenarios.map((scenario) => scenario.category)))];
  const filteredScenarios = scenarios.filter((scenario) => selectedCategory === 'all' || scenario.category === selectedCategory);

  if (currentView === 'player' && activeSimulation) {
    return <ScenarioPlayer simulation={activeSimulation} currentStepIndex={currentStepIndex} messages={simulatedMessages} lastDecision={userDecisions.at(-1)} isAiResponding={isAiResponding} onMakeDecision={makeDecision} onSendCustomMessage={sendCustomMessage} onExit={() => setCurrentView('home')} className={className} />;
  }
  if (currentView === 'result' && simulationResult) {
    return <ScenarioResult result={simulationResult} onRetry={() => selectedScenario && startSimulation(selectedScenario)} onContinue={() => setCurrentView('home')} className={className} />;
  }
  if (currentView === 'skills') return <SkillsView skills={skills} onBack={() => setCurrentView('home')} className={className} />;
  if (currentView === 'achievements') return <AchievementsView achievements={achievements} onBack={() => setCurrentView('home')} className={className} />;

  return (
    <section className={cn('w-full space-y-6', className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold text-primary">{locale === 'kk' ? 'Қауіпсіздік академиясы' : 'Академия безопасности'}</p>
          <h1 className="text-3xl font-bold tracking-[-0.04em] md:text-4xl">{locale === 'kk' ? 'Миссиялар' : 'Миссии'}</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{locale === 'kk' ? 'Нақты жағдайларда алаяқтықты тануды үйреніңіз.' : 'Тренируйтесь распознавать обман в ситуациях из реальной жизни.'}</p>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button onClick={() => setCurrentView('skills')} className="lab-quiet-button"><IconTarget size={17} /> {locale === 'kk' ? 'Дағдылар' : 'Навыки'}</button>
          <button onClick={() => setCurrentView('achievements')} className="lab-quiet-button"><IconAward size={17} /> {locale === 'kk' ? 'Белгілер' : 'Награды'}</button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.5fr)]">
        <div className="rounded-[28px] bg-primary p-6 text-white shadow-[0_24px_52px_-32px_rgba(39,117,246,0.85)] md:p-8">
          <div className="mb-10 flex items-center justify-between text-xs font-semibold text-white/70"><span>{locale === 'kk' ? 'БҮГІНГІ МИССИЯ' : 'МИССИЯ ДНЯ'}</span><span className="rounded-full bg-white/15 px-3 py-1 text-white">+120 XP</span></div>
          <h2 className="max-w-2xl text-2xl font-bold leading-tight tracking-[-0.03em] md:text-4xl">{locale === 'kk' ? 'Жалған жеткізу хабарламасын тексер' : 'Разбери подозрительное сообщение о доставке'}</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">{locale === 'kk' ? 'Сілтемені, жіберушіні және төлем талабын зерттеп, қауіпсіз шешім қабылдаңыз.' : 'Проверьте ссылку, отправителя и требование оплаты, затем примите безопасное решение.'}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button onClick={() => startSimulation(scenarios[0])} className="inline-flex h-12 items-center gap-2 rounded-2xl bg-white px-5 text-sm font-bold text-primary shadow-sm transition-colors hover:bg-blue-50">{locale === 'kk' ? 'Бастау' : 'Начать'} <IconArrowUpRight size={19} /></button>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-white/70"><IconClock size={15} /> 4 {locale === 'kk' ? 'мин' : 'мин'} · 3 {locale === 'kk' ? 'қадам' : 'шага'}</span>
          </div>
        </div>
        <div className="rounded-[28px] bg-surface p-6 panel-shadow md:p-7">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-muted text-primary"><IconBolt size={22} /></span>
          <p className="mt-6 text-base font-bold">{locale === 'kk' ? 'Қалай жұмыс істейді' : 'Как это работает'}</p>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li><strong className="mr-2 text-primary">01</strong>{locale === 'kk' ? 'Хабарламаны зертте' : 'Изучи сообщение'}</li>
            <li><strong className="mr-2 text-primary">02</strong>{locale === 'kk' ? 'Күдікті белгілерді тап' : 'Найди тревожные признаки'}</li>
            <li><strong className="mr-2 text-primary">03</strong>{locale === 'kk' ? 'Қауіпсіз шешім қабылда' : 'Прими безопасное решение'}</li>
          </ol>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto rounded-[20px] bg-surface-raised p-1.5 no-scrollbar">
        {categories.map((category) => <button key={category} onClick={() => setSelectedCategory(category)} className={cn('min-h-10 shrink-0 rounded-2xl px-4 text-xs font-semibold transition-colors', selectedCategory === category ? 'bg-surface text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground')}>{locale === 'kk' ? categoryCopy[category]?.kk : categoryCopy[category]?.ru}</button>)}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {filteredScenarios.map((scenario: Scenario, index) => {
          const copy = missionCopy[scenario.id];
          return <button key={scenario.id} onClick={() => startSimulation(scenario)} className="group flex min-h-40 w-full flex-col justify-between rounded-[24px] bg-surface p-5 text-left panel-shadow transition-transform hover:-translate-y-0.5">
            <span className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground"><span>{copy?.code ?? `CASE / ${String(index + 1).padStart(2, '0')}`}</span><span className="flex items-center gap-1 rounded-full bg-surface-raised px-2.5 py-1"><IconLockOpen size={13} /> {scenario.estimated_time} {locale === 'kk' ? 'мин' : 'мин'}</span></span>
            <span className="mt-5"><span className="block text-lg font-bold tracking-[-0.02em]">{locale === 'kk' ? copy?.kk : copy?.ru}</span><span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">{scenario.description}</span></span>
            <span className="mt-5 flex items-center justify-between border-t border-border pt-3 text-xs font-semibold text-primary"><span>{locale === 'kk' ? 'Миссияны ашу' : 'Открыть миссию'}</span><IconArrowUpRight size={18} /></span>
          </button>;
        })}
      </div>
    </section>
  );
}
