'use client';

import React, { useState } from 'react';
import { IconAlertTriangle, IconArrowLeft, IconArrowUpRight, IconCheck, IconExternalLink, IconFingerprint, IconLoader2, IconSend } from '@tabler/icons-react';
import { ScenarioSimulation, SimulationMessage, SimulationDecisionOption } from '@/types';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

const evidenceByType: Record<string, { ru: string[]; kk: string[] }> = {
  messenger: { ru: ['Подмена домена', 'Давление временем', 'Запрос личных данных'], kk: ['Жалған домен', 'Уақытпен қысым', 'Жеке деректерді сұрау'] },
  marketplace: { ru: ['Переход из приложения', 'Фальшивая оплата', 'Запрос CVV-кода'], kk: ['Қосымшадан шығару', 'Жалған төлем', 'CVV-кодты сұрау'] },
  bank_notification: { ru: ['Звонок не с номера банка', 'Запрос SMS-кода', 'Запугивание блокировкой'], kk: ['Бөгде банк нөмірі', 'SMS-кодты сұрау', 'Бұғаттаумен қорқыту'] },
  legal_situation: { ru: ['Нет номера дела', 'Неофициальный адрес', 'Срочная оплата'], kk: ['Іс нөмірі жоқ', 'Ресми емес мекенжай', 'Шұғыл төлем'] },
};

export function ScenarioPlayer({ simulation, currentStepIndex, messages, lastDecision, isAiResponding, onMakeDecision, onSendCustomMessage, onExit, className }: {
  simulation: ScenarioSimulation;
  currentStepIndex: number;
  messages: SimulationMessage[];
  lastDecision?: SimulationDecisionOption;
  isAiResponding?: boolean;
  onMakeDecision: (option: SimulationDecisionOption) => void;
  onSendCustomMessage?: (text: string) => void;
  onExit: () => void;
  className?: string;
}) {
  const { locale } = useMode();
  const [customText, setCustomText] = useState('');
  const currentStep = simulation.steps[currentStepIndex] || simulation.steps[0];
  const options = currentStep.options || [];
  const evidence = evidenceByType[simulation.type] || evidenceByType.messenger;
  const labels = locale === 'kk' ? evidence.kk : evidence.ru;
  const progress = Math.min(100, ((currentStepIndex + 1) / simulation.steps.length) * 100);

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    if (!customText.trim()) return;
    onSendCustomMessage?.(customText.trim());
    setCustomText('');
  };

  return (
    <section className={cn('w-full space-y-4', className)}>
      <div className="flex min-h-16 items-center justify-between rounded-[20px] bg-surface px-4 panel-shadow md:px-6">
        <button onClick={onExit} className="lab-quiet-button border-0 px-0" aria-label={locale === 'kk' ? 'Шығу' : 'Выйти'}><IconArrowLeft size={18} /> {locale === 'kk' ? 'Істер' : 'Все дела'}</button>
        <div className="text-center"><p className="text-[10px] font-semibold text-primary">{locale === 'kk' ? 'Тікелей симуляция' : 'Живая симуляция'}</p><p className="text-xs font-bold md:text-sm">{locale === 'kk' ? simulation.platform_name_kk : simulation.platform_name_ru}</p></div>
        <p className="font-mono text-xs font-bold">{String(currentStepIndex + 1).padStart(2, '0')} / {String(simulation.steps.length).padStart(2, '0')}</p>
      </div>

      <div className="grid min-h-[560px] gap-4 lg:grid-cols-[240px_minmax(0,1fr)_250px]">
        <aside className="flex flex-col rounded-[24px] bg-primary-muted p-6 text-foreground lg:p-7">
          <p className="text-[10px] font-semibold text-primary">{locale === 'kk' ? 'Миссия мақсаты' : 'Цель миссии'}</p>
          <h1 className="mt-5 text-2xl font-bold leading-tight tracking-[-0.04em]">{locale === 'kk' ? 'Алаяқтықтың 3 белгісін тап' : 'Найди 3 признака обмана'}</h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{locale === 'kk' ? currentStep.scenario_context_kk : currentStep.scenario_context_ru}</p>
          <div className="mt-10 space-y-4">
            {labels.map((label, index) => <div key={label} className="flex items-start gap-3 border-t border-primary/10 pt-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-[10px] font-bold text-primary">{index + 1}</span><span className="text-xs font-semibold leading-snug text-foreground/80">{label}</span></div>)}
          </div>
          <div className="mt-auto pt-10"><div className="mb-2 flex justify-between text-[10px] font-semibold text-muted-foreground"><span>{locale === 'kk' ? 'Прогресс' : 'Прогресс'}</span><span>{Math.round(progress)}%</span></div><div className="h-2 overflow-hidden rounded-full bg-surface"><div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} /></div></div>
        </aside>

        <main className="rounded-[24px] bg-surface-raised p-4 md:p-7">
          <div className="mb-4 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground"><span>{locale === 'kk' ? 'ЗЕРТТЕЛЕТІН АРТЕФАКТ' : 'АРТЕФАКТ НА ПРОВЕРКУ'}</span><span className="flex items-center gap-1.5 text-danger"><IconFingerprint size={15} /> CASE #{simulation.scenario_id}0{currentStepIndex + 1}</span></div>
          <article className="mx-auto max-w-2xl overflow-hidden rounded-[24px] border border-border bg-white panel-shadow">
            <header className="flex items-center gap-3 border-b border-border p-4 md:p-5"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-danger text-lg font-bold text-white">{simulation.opponent_name.charAt(0)}</div><div className="min-w-0"><p className="truncate text-sm font-bold">{simulation.opponent_name}</p><p className="truncate text-[10px] text-muted-foreground">{simulation.opponent_handle || 'Неизвестный отправитель'}</p></div><span className="ml-auto rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-bold text-danger">{locale === 'kk' ? 'Тексерілмеген' : 'Не проверен'}</span></header>
            <div className="space-y-5 p-5 md:p-8">
              {messages.map((message, messageIndex) => <div key={message.id} className={cn('relative rounded-2xl bg-surface-raised p-4', message.sender === 'user' && 'bg-primary-muted')}><span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white ring-4 ring-white">{Math.min(3, messageIndex + 1)}</span><p className="whitespace-pre-wrap text-sm font-semibold leading-relaxed md:text-base">{locale === 'kk' ? message.text_kk : message.text_ru}</p>{message.attachment && <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4"><div className="flex items-center justify-between gap-3"><div className="min-w-0"><p className="truncate text-xs font-bold">{message.attachment.title}</p><p className="mt-1 truncate text-[11px] font-semibold text-danger">{message.attachment.url}</p></div><IconExternalLink className="shrink-0 text-danger" size={19} /></div></div>}<p className="mt-2 text-[10px] text-muted-foreground">{message.timestamp}</p></div>)}
              {isAiResponding && <div className="flex items-center gap-2 border-t border-foreground/20 pt-4 text-xs font-bold uppercase text-muted-foreground"><IconLoader2 className="animate-spin" size={16} /> {locale === 'kk' ? 'Жаңа дәлел жүктелуде' : 'Загружается новая улика'}</div>}
            </div>
          </article>
          {lastDecision && isAiResponding && <div className={cn('mx-auto mt-5 max-w-2xl rounded-2xl border p-4 text-sm font-semibold', lastDecision.is_correct ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-danger')}><div className="mb-1 flex items-center gap-2 font-bold">{lastDecision.is_correct ? <IconCheck size={18} /> : <IconAlertTriangle size={18} />}{lastDecision.is_correct ? (locale === 'kk' ? 'Дәлел қабылданды' : 'Верное наблюдение') : (locale === 'kk' ? 'Қауіпті шешім' : 'Опасное решение')}</div>{locale === 'kk' ? lastDecision.explanation_kk : lastDecision.explanation_ru}</div>}
        </main>

        <aside className="flex flex-col rounded-[24px] bg-surface p-5 panel-shadow md:p-7">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-danger">{locale === 'kk' ? 'АЙҒАҚТАР' : 'УЛИКИ'}</p>
          <h2 className="mt-3 text-xl font-bold leading-tight tracking-[-0.035em]">{locale === 'kk' ? 'Неліктен күмәнді' : 'Почему это подозрительно'}</h2>
          <div className="mt-7 divide-y divide-border border-y border-border">
            {labels.map((label, index) => <div key={label} className="grid grid-cols-[30px_minmax(0,1fr)] gap-2 py-4"><span className="font-mono text-xs font-black text-danger">0{index + 1}</span><div><p className="text-xs font-black uppercase leading-snug">{label}</p><p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{locale === 'kk' ? 'Хабарламадағы сигналды дәлелмен салыстыр.' : 'Сопоставьте сигнал с текстом сообщения.'}</p></div></div>)}
          </div>
          {currentStep.allow_free_input && <form onSubmit={handleSend} className="mt-auto border-t border-border pt-5"><label className="text-[10px] font-semibold text-muted-foreground">{locale === 'kk' ? 'Өз жауабың' : 'Свой ответ'}</label><div className="mt-2 flex overflow-hidden rounded-2xl border border-border bg-white"><input value={customText} onChange={(event) => setCustomText(event.target.value)} placeholder={locale === 'kk' ? 'Жауап жаз...' : 'Написать ответ...'} className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" /><button type="submit" disabled={!customText.trim() || isAiResponding} className="flex h-11 w-11 items-center justify-center bg-primary text-white disabled:opacity-40" aria-label={locale === 'kk' ? 'Жіберу' : 'Отправить'}><IconSend size={17} /></button></div></form>}
        </aside>
      </div>

      <div className="grid gap-3 lg:grid-cols-[240px_repeat(3,minmax(0,1fr))]">
        <div className="flex min-h-24 flex-col justify-center rounded-[24px] bg-primary p-5 text-white"><span className="text-[10px] font-semibold text-white/70">{locale === 'kk' ? 'Сенің шешімің' : 'Ваше решение'}</span><span className="mt-2 text-lg font-bold leading-none">{locale === 'kk' ? 'Келесі қадамды таңда' : 'Выберите действие'}</span></div>
        {options.map((option, index) => <button key={option.id} onClick={() => onMakeDecision(option)} disabled={isAiResponding} className={cn('group min-h-28 rounded-[24px] border border-border bg-surface p-5 text-left panel-shadow transition-colors disabled:cursor-wait disabled:opacity-45', index === 0 && 'border-red-200 hover:bg-red-50', index === 1 && 'border-blue-200 hover:bg-primary-muted')}><span className="mb-4 flex items-center justify-between text-[10px] font-semibold text-muted-foreground">{locale === 'kk' ? 'Әрекет' : 'Действие'} 0{index + 1} <IconArrowUpRight size={17} /></span><span className="block text-sm font-bold leading-snug">{locale === 'kk' ? option.label_kk : option.label_ru}</span></button>)}
      </div>
    </section>
  );
}
