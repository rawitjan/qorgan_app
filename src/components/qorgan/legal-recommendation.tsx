'use client';

import { useState } from 'react';
import {
  IconCheck,
  IconCopy,
  IconExternalLink,
  IconFileText,
  IconPhone,
  IconScale,
} from '@tabler/icons-react';
import { LegalRecommendation as LegalRecommendationData } from '@/types';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function LegalRecommendation({
  recommendation,
  className,
}: {
  recommendation: LegalRecommendationData;
  className?: string;
}) {
  const { locale } = useMode();
  const [copied, setCopied] = useState(false);
  const [showFullTemplate, setShowFullTemplate] = useState(false);
  const [templateLang, setTemplateLang] = useState<'kz' | 'ru'>(locale === 'ru' ? 'ru' : 'kz');

  const template = recommendation.eotinish_template;
  const templateText = template
    ? templateLang === 'ru'
      ? template.body_ru
      : template.body_kz
    : '';

  const handleCopy = async () => {
    if (!templateText) return;
    try {
      await navigator.clipboard.writeText(templateText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback if clipboard API unavailable
      const textArea = document.createElement('textarea');
      textArea.value = templateText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section className={cn('rounded-2xl border border-blue-500/25 bg-blue-500/[0.06] p-4 flex flex-col gap-4', className)}>
      {/* 1. Header & Situation Summary */}
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
          <IconScale size={20} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
            {locale === 'kk' ? 'Құқықтық навигация' : 'Правовая навигация'}
          </p>
          <h3 className="mt-0.5 text-sm font-bold text-foreground">
            {locale === 'kk' && (!recommendation.title || recommendation.title === 'Правовая рекомендация')
              ? 'Құқықтық ұсыным және көмек'
              : recommendation.title || (locale === 'kk' ? 'Құқықтық ұсыным және көмек' : 'Правовая рекомендация')}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {recommendation.situation_explanation}
          </p>
        </div>
      </div>

      {/* 2. Ready eOtinish Police Claim Template (Pitch Deck Promised Feature) */}
      {template && (
        <div className="rounded-xl border border-blue-500/35 bg-surface p-4 flex flex-col gap-3.5 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                <IconFileText size={16} />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">
                    {locale === 'kk' ? '«e-Otinish» дайын арыз үлгісі' : 'Готовый шаблон заявления в «e-Otinish»'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-500/15 text-[10px] font-bold text-blue-400 border border-blue-500/30">
                    CyberPol · {locale === 'kk' ? 'ҚР ҚК 190' : 'ст. 190 УК'}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {locale === 'kk'
                    ? 'Интернет-алаяқтық бойынша құқық қорғау органдарына жолданатын ресми құжат.'
                    : 'Официальное заявление в полицию по факту интернет-мошенничества.'}
                </p>
              </div>
            </div>

            {/* Language toggle */}
            <div className="flex items-center rounded-lg border border-border bg-surface-raised p-0.5 text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setTemplateLang('kz')}
                className={cn(
                  'px-2 py-0.5 rounded transition-colors',
                  templateLang === 'kz' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                ҚАЗ
              </button>
              <button
                type="button"
                onClick={() => setTemplateLang('ru')}
                className={cn(
                  'px-2 py-0.5 rounded transition-colors',
                  templateLang === 'ru' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                РУС
              </button>
            </div>
          </div>

          {/* Legal Meta Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded-lg bg-surface-raised border border-border/80">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                {locale === 'kk' ? 'Құқықтық саралау:' : 'Правовая квалификация:'}
              </span>
              <span className="font-semibold text-foreground">
                {templateLang === 'ru' ? template.article_ru || template.article : template.article}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-surface-raised border border-border/80">
              <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                {locale === 'kk' ? 'Адресат:' : 'Адресат:'}
              </span>
              <span className="font-semibold text-foreground">
                {templateLang === 'ru' ? template.authority_ru || template.authority : template.authority}
              </span>
            </div>
          </div>

          {/* Template Content Box */}
          <div className="relative rounded-lg border border-border bg-black/40 p-3 text-[11px] font-mono leading-relaxed text-foreground/90 max-h-56 overflow-y-auto whitespace-pre-wrap select-all">
            {templateText}
          </div>

          {/* Action Buttons: Copy & Go to eOtinish */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
            >
              {copied ? (
                <>
                  <IconCheck size={15} />
                  <span>{locale === 'kk' ? 'Мәтін көшірілді!' : 'Скопировано!'}</span>
                </>
              ) : (
                <>
                  <IconCopy size={15} />
                  <span>{locale === 'kk' ? 'Арыз мәтінін көшіріп алу' : 'Скопировать заявление'}</span>
                </>
              )}
            </button>

            <a
              href={template.portal_url || 'https://eotinish.kz'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 text-xs font-bold text-blue-400 hover:bg-blue-500/20 transition-colors"
            >
              <span>{locale === 'kk' ? 'eOtinish.kz порталына өту' : 'Перейти на eOtinish.kz'}</span>
              <IconExternalLink size={14} />
            </a>
          </div>

          {/* Instruction Steps */}
          <div className="p-2.5 rounded-lg bg-blue-500/[0.04] border border-blue-500/15 text-[11px] text-muted-foreground flex flex-col gap-1">
            <span className="font-bold text-foreground">
              {locale === 'kk' ? 'Өтініш беру тәртібі (3 қадам):' : 'Порядок подачи (3 шага):'}
            </span>
            <span className="leading-relaxed">
              {locale === 'kk'
                ? '1. Жоғарыдағы «Арыз мәтінін көшіріп алу» батырмасын басыңыз → 2. eOtinish.kz сайтына ЭЦҚ немесе SMS арқылы кіріңіз → 3. «Өтініш беру» батырмасын басып, мемлекеттік органға (ІІМ / Киберпол) осы көшірілген мәтінді қойыңыз.'
                : '1. Нажмите кнопку «Скопировать заявление» → 2. Войдите на eOtinish.kz через ЭЦП или SMS → 3. В разделе «Подать обращение» выберите орган (МВД / CyberPol) и вставьте скопированный текст.'}
            </span>
          </div>
        </div>
      )}

      {/* 3. Recommended Steps */}
      {recommendation.recommended_steps.length > 0 && (
        <ol className="grid gap-2 border-t border-blue-500/15 pt-3 text-xs leading-relaxed text-foreground/90">
          {recommendation.recommended_steps.map((step, index) => (
            <li key={`${index}-${step}`} className="flex gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/15 font-mono text-[10px] font-bold text-blue-400">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}

      {/* 4. Official Resources Directory Contacts */}
      {recommendation.official_resources.length > 0 && (
        <div className="grid gap-2 border-t border-blue-500/15 pt-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {locale === 'kk' ? 'Ресми байланыс арналары' : 'Официальные каналы связи'}
          </p>
          {recommendation.official_resources.map((resource) => (
            <div key={`${resource.name}-${resource.contact}`} className="rounded-xl border border-border bg-surface p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground">{resource.name}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{resource.description}</p>
                </div>
                {resource.contact && (
                  <a
                    href={`tel:${resource.contact.replace(/[^+\d]/g, '')}`}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] font-bold text-foreground hover:border-blue-500/40 hover:text-blue-400"
                  >
                    <IconPhone size={13} aria-hidden="true" />
                    {resource.contact}
                  </a>
                )}
              </div>
              {resource.url && (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400 hover:text-blue-300"
                >
                  {locale === 'kk' ? 'Ресми сайт' : 'Официальный сайт'}
                  <IconExternalLink size={12} aria-hidden="true" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 5. Legal Disclaimer */}
      <p className="border-t border-blue-500/15 pt-2.5 text-[10px] leading-relaxed text-muted-foreground">
        {recommendation.disclaimer}
      </p>
    </section>
  );
}
