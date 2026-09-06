'use client';

import React from 'react';
import Link from 'next/link';
import {
  IconShieldLock,
  IconCrosshair,
  IconCpu,
  IconScale,
  IconAlertTriangle,
  IconCheck,
  IconArrowRight,
  IconSparkles,
  IconBrandTelegram,
  IconExternalLink,
  IconLock,
  IconUsers,
  IconBuildingStore,
  IconServer,
  IconRocket,
  IconDeviceMobile,
  IconCode,
  IconBrain,
  IconClock,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';

export type PitchLang = 'kk' | 'ru';

// Embedded Radar Icon to prevent any dynamic import or bundling ReferenceErrors
export function SafeIconRadar({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M21 12h-8a1 1 0 1 0 -1 1v8a9 9 0 0 0 9 -9" />
      <path d="M16 9a5 5 0 1 0 -7 7" />
      <path d="M20.486 9a9 9 0 1 0 -11.482 11.495" />
    </svg>
  );
}

// Signature NEXT SHIFT style Starburst Icon
export function StarburstBadge({
  className,
  size = 28,
  glow = false,
}: {
  className?: string;
  size?: number;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full shrink-0',
        glow && 'shadow-[0_0_20px_rgba(39,117,246,0.35)]',
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full animate-[spin_26s_linear_infinite]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
        <line x1="12" y1="2" x2="12" y2="22" strokeLinecap="round" />
        <line x1="2" y1="12" x2="22" y2="12" strokeLinecap="round" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" strokeLinecap="round" />
        <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" strokeLinecap="round" />
        <line x1="12" y1="4" x2="12" y2="8" strokeWidth="2.4" />
        <line x1="12" y1="16" x2="12" y2="20" strokeWidth="2.4" />
        <line x1="4" y1="12" x2="8" y2="12" strokeWidth="2.4" />
        <line x1="16" y1="12" x2="20" y2="12" strokeWidth="2.4" />
      </svg>
    </div>
  );
}

// Slide Wrapper Component with Nunito Font
export function SlideFrame({
  metaLeft,
  metaRight,
  children,
  className,
}: {
  metaLeft: string;
  metaRight: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-[#ebeae5] text-[#121620] overflow-hidden select-none font-['Nunito',sans-serif]",
        className
      )}
    >
      {/* Top Metadata Header (NEXT SHIFT style) */}
      <header className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#121620]/12 text-[11px] sm:text-[13px] font-extrabold tracking-wider text-[#121620]/70 uppercase">
        <span className="flex items-center gap-2 truncate pr-4">
          <span className="w-2 h-2 rounded-full bg-[#2775f6]" />
          {metaLeft}
        </span>
        <span className="font-mono font-black tracking-widest text-[#121620]">
          {metaRight}
        </span>
      </header>

      {/* Main Slide Body */}
      <main className="relative flex-1 py-4 sm:py-6 flex flex-col justify-center min-h-0">
        {children}
      </main>

      {/* Subtle Slide Bottom Bar */}
      <footer className="pt-2 sm:pt-3 border-t border-[#121620]/12 flex items-center justify-between text-[10px] sm:text-[12px] font-bold text-[#121620]/55 tracking-wide">
        <span>QORGAN AI DEFENSE OS · ЖЮРИ PITCH 2026</span>
        <span className="flex items-center gap-1.5 text-[#2775f6] font-black">
          <IconShieldLock size={14} stroke={2.5} />
          qorgan.kz
        </span>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------
// SLIDE 01: HERO / COVER (ҚАЗАҚША / РУССКИЙ)
// -------------------------------------------------------------
export function Slide01Hero({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Басқалар киберқауіпті талқылап жатқанда — біз оны тоқтатамыз" : "Пока другие обсуждают киберугрозы — мы их нейтрализуем"}
      metaRight="01/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 h-full items-center">
        {/* Left Headline Area */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#121620]/15 bg-white/70 text-[#121620] text-xs font-black uppercase tracking-wider mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-[#2775f6] animate-pulse" />
              {isKk ? "🇰🇿 Ұлттық AI-стартап · Қазақстан 2026" : "🇰🇿 Национальный AI-стартап · Казахстан 2026"}
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-[#121620] tracking-tight leading-[1.02] uppercase">
              QORGAN
              <span className="block text-[#2775f6] font-bold normal-case text-2xl sm:text-4xl xl:text-5xl mt-1 tracking-normal">
                {isKk ? "Цифрлық қалқан және құқықтық навигатор" : "Цифровой щит и правовой навигатор"}
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-[#121620]/80 text-base sm:text-lg max-w-xl leading-relaxed font-semibold">
              {isKk ? (
                <>
                  Қазақстандағы күдікті сілтемелер мен хабарламаларды <strong>отандық жасанды интеллектпен (AlemAI / Qwen 3 8B)</strong> 1 секундта тексеретін және азаматқа ҚР заңы бойынша <strong>нақты құқықтық жол картасын</strong> беретін кешенді қауіпсіздік платформасы.
                </>
              ) : (
                <>
                  Первая в Казахстане платформа, которая объединяет <strong>мультимодальный AI-анализ угроз в 1 клик</strong> (AlemAI / Qwen 3 8B) с <strong>конкретным правовым планом действий</strong> для граждан и организаций.
                </>
              )}
            </p>
          </div>

          {/* 3 Bento Pill Cards at Bottom */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="rounded-[24px] bg-white p-3.5 sm:p-4 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#121620]/60">
                  {isKk ? "AI сатысы" : "Стадии AI"}
                </span>
                <StarburstBadge size={20} className="text-[#2775f6]" />
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-black text-[#121620]">
                  {isKk ? "5 кезең" : "5 уровней"}
                </div>
                <div className="text-[11px] text-[#121620]/70 font-bold">
                  {isKk ? "Терең сараптама" : "Глубокой проверки"}
                </div>
              </div>
            </div>

            <div className="rounded-[24px] bg-[#2775f6] text-white p-3.5 sm:p-4 flex flex-col justify-between shadow-md">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/75">
                  {isKk ? "AI Модель" : "Модель"}
                </span>
                <StarburstBadge size={20} className="text-white" />
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-black">AlemAI</div>
                <div className="text-[11px] text-white/85 font-bold">Qwen 3 8B Local API</div>
              </div>
            </div>

            <div className="rounded-[24px] bg-[#121620] text-white p-3.5 sm:p-4 flex flex-col justify-between shadow-md">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/60">
                  {isKk ? "Жылдамдық" : "Отклик"}
                </span>
                <StarburstBadge size={20} className="text-[#38bdf8]" />
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-black text-[#38bdf8]">&lt; 3 сек</div>
                <div className="text-[11px] text-white/70 font-bold">
                  {isKk ? "Шешім + заңгерлік көмек" : "Результат + правовой план"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Hero Visual Card */}
        <div className="lg:col-span-5 h-full flex flex-col justify-center">
          <div className="relative rounded-[32px] bg-[#121620] p-6 sm:p-8 text-white flex flex-col justify-between overflow-hidden shadow-2xl border border-white/10 h-full max-h-[500px]">
            {/* Ambient Glow */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#2775f6]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#38bdf8]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold tracking-wider text-white/90">
                <IconLock size={14} className="text-[#38bdf8]" /> QORGAN LENS SYSTEM
              </div>
              <StarburstBadge size={32} className="text-[#38bdf8]" glow />
            </div>

            {/* Simulated Live Lens Scan Card */}
            <div className="relative z-10 my-auto rounded-2xl bg-white/5 border border-white/15 p-4 sm:p-5 backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-[#38bdf8] font-bold">LENS_ID: #KZ-98241</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ec5562]/20 border border-[#ec5562]/40 text-[#ff6b77] text-[11px] font-black">
                  CRITICAL 94/100
                </span>
              </div>
              <div className="mt-3 space-y-2 text-xs font-semibold">
                <div className="text-slate-300 font-mono truncate">
                  {isKk ? "Нысан:" : "Target:"} <span className="text-white">kaspi-security-online.kz/auth</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <IconCheck size={14} stroke={3} /> {isKk ? "Отандық AlemAI фишинг схемасын дәлелдеді" : "Сигналы фишинга подтверждены AlemAI"}
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <IconCheck size={14} stroke={3} /> {isKk ? "ҚР ІІМ CyberPol-ға дайын өтініш жасалды" : "Подготовлена заявка в CyberPol МВД РК"}
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs text-white/60 pt-2 border-t border-white/10 font-bold">
              <span>{isKk ? "MVP дайындығы: 100% (Fullstack + AI)" : "Готовность MVP: 100% (Frontend + Backend + LLM)"}</span>
              <span className="font-mono text-white/90 font-black">KZ 2026</span>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 02: PROBLEM / 2024–2026 ТРЕНДТЕР ЖӘНЕ КИБЕРБУЛЛИНГ ДАҒДАРЫСЫ
// -------------------------------------------------------------
export function Slide02Problem({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "ҚР Бас прокуратурасы, ІІМ және ЮНИСЕФ ресми деректері (2024–2026)" : "Официальная статистика ГП РК, МВД и ЮНИСЕФ (2024–2026)"}
      metaRight="02/10"
    >
      <div className="flex flex-col h-full justify-between space-y-3.5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec5562]/10 text-[#ec5562] text-xs font-black uppercase tracking-wider mb-1">
            <IconAlertTriangle size={14} />
            {isKk ? "ҚР ҚК 190 (Алаяқтық) · ҚР ӘҚБтК 127-2 (Кибербуллинг)" : "ст. 190 УК (Мошенничество) · ст. 127-2 КоАП (Кибербуллинг)"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
            {isKk ? "Цифрлық қауіптер дағдарысы: " : "Кризис цифровых угроз: "}
            <span className="text-[#ec5562]">
              {isKk ? "Алаяқтық және Кибербуллинг" : "Мошенничество и Кибербуллинг"}
            </span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#121620]/75 max-w-3xl font-semibold">
            {isKk
              ? "2024–2026 жылдары қауіп тек қаржылық алаяқтықпен шектелмей, жасөспірімдердің психологиялық денсаулығына (кибербуллинг, бопсалау) тікелей шабуылға айналды."
              : "В 2024–2026 гг. киберугрозы бьют не только по кошелькам граждан, но и по детям (кибербуллинг, травля и шантаж в мессенджерах)."}
          </p>
        </div>

        {/* 3 Bento Cards with 2024-2026 Comparison, Cyberbullying & Qorgan Assistance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 flex-1 items-stretch">
          {/* Card 1: 2024-2026 Trend Comparison */}
          <div className="rounded-[28px] bg-[#121620] text-white p-5 flex flex-col justify-between border border-white/10 shadow-lg relative overflow-hidden">
            <div>
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-0.5 rounded-full bg-[#ec5562]/20 text-[#ff7582] text-[11px] font-black uppercase tracking-wider">
                  {isKk ? "2024–2026 Салыстыру" : "Сравнение 2024–2026"}
                </span>
                <span className="text-xs font-mono font-bold text-[#ec5562]">ҚР ҚК 190</span>
              </div>
              <h3 className="mt-3 text-lg sm:text-xl font-black text-white leading-snug">
                {isKk ? "45,5 млрд ₸ → 60+ млрд ₸ шығын қаупі" : "45,5 млрд ₸ → 60+ млрд ₸ ущерба"}
              </h3>
              
              <div className="mt-2.5 space-y-1.5 text-xs text-white/75 font-semibold">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-slate-400">2024 жыл (ресми):</span>
                  <span className="font-bold text-white">22 100+ іс · 45,5 млрд ₸</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-slate-400">2025 жыл (шарықтау):</span>
                  <span className="font-bold text-white">24 500+ іс · 52+ млрд ₸</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">2026 жыл (AI қаупі):</span>
                  <span className="font-bold text-[#ff7582]">60+ млрд ₸ · Дауыс & фишинг</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-baseline justify-between text-xs">
              <span className="text-[#ec5562] font-black">&lt; 8% қайтарым</span>
              <span className="text-white/60 font-bold">{isKk ? "Дропперлер арқылы 30 мин шығады" : "Вывод через дропперов за 30 мин"}</span>
            </div>
          </div>

          {/* Card 2: Cyberbullying (UNICEF & Art 127-2 CoAO RK) */}
          <div className="rounded-[28px] bg-[#2775f6] text-white p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-black uppercase tracking-wider">
                  {isKk ? "ЮНИСЕФ & ӘҚБтК 127-2" : "ЮНИСЕФ & ст. 127-2 КоАП"}
                </span>
                <StarburstBadge size={22} className="text-white" />
              </div>
              <h3 className="mt-3 text-lg sm:text-xl font-black text-white leading-snug">
                {isKk ? "Балалардың 21%-ы буллингке ұшырайды" : "21% детей сталкиваются с буллингом"}
              </h3>
              <p className="mt-2 text-xs text-white/90 leading-relaxed font-semibold">
                {isKk
                  ? "ҚР балаларының 52%-ы қорланғанын ата-анасына айтпайды! 2024 жылғы 16 маусымнан бастап ҚР ӘҚБтК 127-2-бабы («Кәмелетке толмағанды қорлау (кибербуллинг)», 10-30 АЕК айыппұл) енгізілді. 2025 жылы 404 іс қаралды."
                  : "52% детей молчат о травле! С 16 июня 2024 г. введена ст. 127-2 КоАП РК (травля/кибербуллинг ребенка, штраф 10–30 МРП). В 2025 заведено 404 дела."}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-white/20 flex items-baseline justify-between">
              <span className="text-2xl font-black text-white">52% жасырады</span>
              <span className="text-[11px] text-white/80 font-black uppercase">
                {isKk ? "«111» желісі & Латенттілік" : "Линия «111» & Латентность"}
              </span>
            </div>
          </div>

          {/* Card 3: How Qorgan Solves Cyberbullying & Fraud */}
          <div className="rounded-[28px] bg-[#dbe2ec] text-[#121620] p-5 flex flex-col justify-between border border-[#121620]/10 shadow-sm relative overflow-hidden">
            <div>
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-0.5 rounded-full bg-[#2775f6]/15 text-[#2775f6] text-[11px] font-black uppercase tracking-wider">
                  {isKk ? "QORGAN шешімі" : "Помощь QORGAN"}
                </span>
                <span className="text-xs font-mono font-bold text-[#2775f6]">«111» байланыс</span>
              </div>
              <h3 className="mt-3 text-lg sm:text-xl font-black text-[#121620] leading-snug">
                {isKk ? "Дәлелдеме сақтау & Құқықтық көмек" : "Фиксация улик и правовой щит"}
              </h3>
              <ul className="mt-2 text-xs text-[#121620]/80 space-y-1.5 font-semibold">
                <li>• <strong>Дәлелдемені бекіту:</strong> Агрессор чатты өшіргенге дейін скриншоттан уақыты мен ID-ін заңды PDF етеді.</li>
                <li>• <strong>AlemAI қолдауы:</strong> Психологиялық қысым мен бопсалауды талдап, баланы сабырға шақырады.</li>
                <li>• <strong>ӘҚБтК 127-2 арызы:</strong> Мектепке/полицияға дайын арыз үлгісі және «111» желісіне тікелей қосылу.</li>
              </ul>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#121620]/10 flex items-baseline justify-between">
              <span className="text-xl font-black text-[#2775f6]">100% заңды</span>
              <span className="text-[11px] text-[#121620]/70 font-extrabold uppercase">
                {isKk ? "Балалар мен отбасы қорғаны" : "Защита детей и семей"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 03: SOLUTION / 4-PILLAR ARCHITECTURE WITH UI CARDS
// -------------------------------------------------------------
export function Slide03Solution({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Жай ғана уәде емес, толыққанды қауіпсіздік контуры" : "Не обещания, а целостная экосистема безопасности"}
      metaRight="03/10"
    >
      <div className="flex flex-col h-full justify-between space-y-3.5">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
            {isKk ? "QORGAN: Киберқауіпке кешенді ұлттық жауап" : "QORGAN: Комплексный ответ на киберугрозы"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#121620]/75 max-w-2xl font-semibold">
            {isKk
              ? "Лезде техникалық тексеру, қазақ тіліндегі AI, ҚР заңнамасына сай құқықтық көмек және интерактивті оқыту бір жүйеде."
              : "Объединяем мгновенную проверку, отечественный AI, правовую помощь по законам РК и интерактивное обучение в едином контуре."}
          </p>
        </div>

        {/* 4 Rich Pillars with UI Previews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 flex-1 items-stretch">
          {/* Pillar 01: Lens */}
          <div className="rounded-[26px] bg-[#2775f6] text-white p-4 sm:p-5 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-black uppercase tracking-wider text-white/80">
                  {isKk ? "01 / Құрал" : "01 / Модуль"}
                </span>
                <StarburstBadge size={22} className="text-white" />
              </div>
              <h3 className="mt-2 text-xl font-black">QORGAN Lens</h3>
              <p className="mt-1.5 text-xs text-white/85 leading-relaxed font-semibold">
                {isKk
                  ? "Сілтеме, скриншот, SMS немесе QR-кодты 3 секундта сканерлейді. Домен клондарын (typosquatting) және фишинг айлаларын ашып көрсетеді."
                  : "Мультимодальный AI-сканер ссылок, скриншотов, SMS и QR за 3 сек. Раскрывает клоны доменов и скрытые психологические ловушки."}
              </p>

              {/* UI Snippet */}
              <div className="mt-3 p-2.5 rounded-xl bg-white/10 border border-white/20 text-[11px] font-mono">
                <div className="flex items-center justify-between text-white/90">
                  <span>Kaspi-bonus.kz</span>
                  <span className="text-[#ff7582] font-black">CRITICAL</span>
                </div>
                <div className="text-[10px] text-white/70 mt-1">✓ AlemAI сараптамасы дайын</div>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-white/20 flex items-center justify-between">
              <span className="text-xs font-mono text-white/80 font-bold">{isKk ? "Сканерлеу: 1 клик" : "Анализ в 1 клик"}</span>
              <span className="text-3xl font-black tracking-tighter opacity-95">01</span>
            </div>
          </div>

          {/* Pillar 02: Legal Guide */}
          <div className="rounded-[26px] bg-[#dbe2ec] text-[#121620] p-4 sm:p-5 flex flex-col justify-between border border-[#121620]/10 shadow-sm relative overflow-hidden">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#121620]/60">
                  {isKk ? "02 / Құқық" : "02 / Навигация"}
                </span>
                <StarburstBadge size={22} className="text-[#2775f6]" />
              </div>
              <h3 className="mt-2 text-xl font-black">{isKk ? "Құқықтық навигатор" : "Правовой гид"}</h3>
              <p className="mt-1.5 text-xs text-[#121620]/75 leading-relaxed font-semibold">
                {isKk
                  ? "ҚР ҚК 190-бабы («Алаяқтық») бойынша Киберполға eOtinish арқылы ресми арыз жасау және ҚР банктерінде шоттарды 15 минутта бұғаттау алгоритмі."
                  : "Готовые шаблоны заявлений в полицию по ст. 190 УК РК (мошенничество) и алгоритм экстренной блокировки счетов в банках за 15 минут."}
              </p>

              {/* UI Snippet */}
              <div className="mt-3 p-2.5 rounded-xl bg-white/60 border border-[#121620]/10 text-[11px] font-mono text-[#121620]">
                <div className="flex items-center justify-between font-bold">
                  <span>eOtinish / CyberPol</span>
                  <span className="text-[#2775f6]">СТ. 190</span>
                </div>
                <div className="text-[10px] text-[#121620]/65 mt-1">✓ Дәлелдер базасы бекітілді</div>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-[#121620]/10 flex items-center justify-between">
              <span className="text-xs font-mono text-[#121620]/70 font-bold">{isKk ? "Заңгерлік қорғаныс" : "Юридическая защита"}</span>
              <span className="text-3xl font-black tracking-tighter text-[#121620]/80">02</span>
            </div>
          </div>

          {/* Pillar 03: Interactive Academy */}
          <div className="rounded-[26px] bg-[#121620] text-white p-4 sm:p-5 flex flex-col justify-between shadow-lg border border-white/10 relative overflow-hidden">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-black uppercase tracking-wider text-white/60">
                  {isKk ? "03 / Тәжірибе" : "03 / Практика"}
                </span>
                <StarburstBadge size={22} className="text-[#38bdf8]" />
              </div>
              <h3 className="mt-2 text-xl font-black">{isKk ? "Миссиялар (XP)" : "Миссии и XP"}</h3>
              <p className="mt-1.5 text-xs text-white/70 leading-relaxed font-semibold">
                {isKk
                  ? "Қазақстандағы шынайы схемалармен (Kaspi хабарлама, жеткізу курьері, жалған қоңырау) интерактивті жаттығу. Қатені қауіпсіз ортада тану."
                  : "Интерактивные симуляции реальных атак Казахстана (Kaspi, курьеры, лжеинвестиции). Практика в безопасной среде с начислением XP."}
              </p>

              {/* UI Snippet */}
              <div className="mt-3 p-2.5 rounded-xl bg-white/5 border border-white/15 text-[11px] font-mono text-slate-200">
                <div className="flex items-center justify-between text-[#38bdf8] font-bold">
                  <span>Миссия #4: Сәлемдеме</span>
                  <span>+150 XP</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">✓ Фишинг тестінен сәтті өтті</div>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-white/60 font-bold">{isKk ? "Тәжірибелік дағды" : "Практический навык"}</span>
              <span className="text-3xl font-black tracking-tighter text-[#38bdf8]">03</span>
            </div>
          </div>

          {/* Pillar 04: Adaptive UX & Cyberbullying Defense */}
          <div className="rounded-[26px] bg-white text-[#121620] p-4 sm:p-5 flex flex-col justify-between border border-[#121620]/10 shadow-sm relative overflow-hidden">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#121620]/60">
                  {isKk ? "04 / Қорғаныс" : "04 / Защита"}
                </span>
                <StarburstBadge size={22} className="text-[#2775f6]" />
              </div>
              <h3 className="mt-2 text-xl font-black">{isKk ? "Junior & Буллингтен қорғау" : "Junior & Защита от травли"}</h3>
              <p className="mt-1.5 text-xs text-[#121620]/75 leading-relaxed font-semibold">
                {isKk
                  ? "13–15 жастағы жасөспірімдерге бопсалау мен қорлауды (ӘҚБтК 127-2) тану, чаттарды өшіруге дейін сақтау, «111» желісі және жеңіл интерфейс."
                  : "Адаптивный режим для подростков 13–15 лет: фиксация травли и шантажа (ст. 127-2 КоАП), экстренная связь с линией «111» и понятный язык."}
              </p>

              {/* UI Snippet */}
              <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-[#121620]">
                <div className="flex items-center justify-between font-bold">
                  <span>{isKk ? "Junior · Буллинг қорғанысы" : "Junior · Анти-буллинг"}</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#2775f6]/10 text-[#2775f6] text-[9px]">JUN</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">✓ Чат дәлелі сақталды · «111» желісі</div>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-[#121620]/10 flex items-center justify-between">
              <span className="text-xs font-mono text-[#121620]/70 font-bold">{isKk ? "ӘҚБтК 127-2 бабы" : "ст. 127-2 КоАП РК"}</span>
              <span className="text-3xl font-black tracking-tighter text-[#121620]/80">04</span>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 04: TECHNOLOGY, LEGAL LAWS & 3-STAGE ASSISTANCE
// -------------------------------------------------------------
export function Slide04TechPipeline({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Технологиялық құбыр және көмек көрсету кезеңдері" : "Технологический контур и стадии защиты"}
      metaRight="04/10"
    >
      <div className="flex flex-col h-full justify-between space-y-3.5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2775f6]/10 text-[#2775f6] text-xs font-black uppercase tracking-wider mb-1">
            <IconCpu size={14} /> {isKk ? "AlemAI (Qwen 3 8B) және ҚР Заңдары" : "AlemAI (Qwen 3 8B) и законы РК"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
            {isKk ? "QORGAN қалай нақты көмектеседі?" : "Как QORGAN защищает пользователя?"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#121620]/75 max-w-2xl font-semibold">
            {isKk
              ? "Біз тек қауіпті анықтап қоймаймыз, инцидентке дейін және одан кейін адамның қаржысы мен құқығын толық қорғаймыз."
              : "Не просто констатируем угрозу, а сопровождаем человека до инцидента и в критические первые минуты после него."}
          </p>
        </div>

        {/* 3 Chronological Help Stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 flex-1 items-stretch">
          {/* Stage 1: Prevention */}
          <div className="rounded-[24px] bg-white p-4 sm:p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[11px] font-mono font-black text-[#2775f6]">1-КЕЗЕҢ: АЛДЫН АЛУ</span>
                <SafeIconRadar size={16} className="text-[#2775f6]" />
              </div>
              <h4 className="mt-3 text-lg font-black text-[#121620]">{isKk ? "Профилактика және Радар" : "Профилактика и Радар"}</h4>
              <p className="mt-2 text-xs text-[#121620]/70 leading-relaxed font-semibold">
                {isKk
                  ? "Қазақстанда жаңадан шыққан фишингтік схемалар мен жалған акциялар қауіптер радарына (Pulse) лезде енеді. Пайдаланушы алдын ала хабардар болып, күдікті сілтемені ашпайды."
                  : "Свежие схемы обмана под бренды РК немедленно поступают в радар угроз (Pulse). Пользователь знает о схеме до того, как мошенники напишут ему."}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-mono text-[#2775f6] font-bold">
              ✓ {isKk ? "Кибергигиена + Тәжірибелік XP" : "Кибергигиена + Практический XP"}
            </div>
          </div>

          {/* Stage 2: Instant Scan */}
          <div className="rounded-[24px] bg-[#2775f6] text-white p-4 sm:p-5 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/20">
                <span className="text-[11px] font-mono font-black text-white/90">2-КЕЗЕҢ: 3 СЕКУНД</span>
                <IconBrain size={16} className="text-white" />
              </div>
              <h4 className="mt-3 text-lg font-black text-white">{isKk ? "AlemAI Сараптамасы" : "Анализ AlemAI (Qwen 3)"}</h4>
              <p className="mt-2 text-xs text-white/85 leading-relaxed font-semibold">
                {isKk
                  ? "Скриншот немесе сілтеме түскенде: OCR қазақ/орыс мәтінін оқиды, AlemAI манипуляциялық қысымды анықтайды, доменнің клонын 3 секундта тауып, Risk Score есептейді."
                  : "OCR читает казахский и русский текст со скрина, AlemAI выявляет психологический триггер («срочно», «бонус»), а движок верифицирует возраст домена и SSL за 3 сек."}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/20 text-[10px] font-mono text-white font-bold">
              ✓ {isKk ? "Жауап уақыты: 1.8 - 3 секунд" : "Время отклика: 1.8 - 3 сек"}
            </div>
          </div>

          {/* Stage 3: The Golden 15 Minutes */}
          <div className="rounded-[24px] bg-[#121620] text-white p-4 sm:p-5 flex flex-col justify-between shadow-lg border border-white/10">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-[11px] font-mono font-black text-[#38bdf8]">3-КЕЗЕҢ: «АЛТЫН 15 МИНУТ»</span>
                <IconScale size={16} className="text-[#38bdf8]" />
              </div>
              <h4 className="mt-3 text-lg font-black text-white">{isKk ? "Құқықтық шұғыл әрекет" : "Правовое реагирование"}</h4>
              <p className="mt-2 text-xs text-white/75 leading-relaxed font-semibold">
                {isKk
                  ? "Қаржы кетсе: «Төлемдер туралы» Заң & ҰБ ережесімен шотты 15 мин бұғаттау + ҚР ҚК 190 бабымен Киберполға арыз. Кибербуллинг кезінде: ӘҚБтК 127-2 дәлелін бекітіп, «111» желісіне қосады."
                  : "Если деньги ушли: блокировка счетов за 15 мин по закону «О платежах» + заявление в CyberPol по ст. 190 УК. При буллинге: фиксация доказательств по ст. 127-2 КоАП и связь с линией «111»."}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/10 text-[10px] font-mono text-[#38bdf8] font-bold">
              ✓ {isKk ? "ҚК 190 (Алаяқтық) & ӘҚБтК 127-2 (Буллинг)" : "ст. 190 УК (Обман) & ст. 127-2 КоАП (Буллинг)"}
            </div>
          </div>
        </div>

        {/* Deterministic Risk Engine Scoring Formula Banner */}
        <div className="rounded-[20px] bg-gradient-to-r from-white to-slate-50 p-3 sm:p-3.5 border border-[#2775f6]/25 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#2775f6] text-white font-mono text-[10px] font-black uppercase">
                {isKk ? "СКОРИНГ АЛГОРИТМІ" : "АЛГОРИТМ СКОРИНГА"}
              </span>
              <h5 className="font-black text-xs text-[#121620]">
                {isKk ? "Deterministic Risk Engine: Неге AI галлюцинация жасамайды?" : "Deterministic Risk Engine: Защита от галлюцинаций AI"}
              </h5>
            </div>
            <span className="font-mono font-black text-[#2775f6] text-xs bg-[#2775f6]/10 px-2.5 py-0.5 rounded-full">
              Score = min(100, &sum; Signals)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] font-mono">
            <div className="bg-red-50 border border-red-200 rounded-lg p-1.5 text-red-900">
              <div className="font-black">+60 БАЛЛ</div>
              <div className="text-[9px] opacity-80">{isKk ? "Зиянды URL (Threat Intel)" : "Вредоносный URL"}</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-1.5 text-orange-900">
              <div className="font-black">+40 БАЛЛ</div>
              <div className="text-[9px] opacity-80">{isKk ? "Карта деректерін сұрау" : "Запрос данных карты"}</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-1.5 text-amber-900">
              <div className="font-black">+30 БАЛЛ</div>
              <div className="text-[9px] opacity-80">{isKk ? "OTP/SMS кодын талап ету" : "Запрос OTP/SMS кода"}</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-1.5 text-blue-900">
              <div className="font-black">+25 БАЛЛ</div>
              <div className="text-[9px] opacity-80">{isKk ? "Брендті көшіру (Kaspi/eGov)" : "Имитация бренда"}</div>
            </div>
            <div className="bg-slate-100 border border-slate-200 rounded-lg p-1.5 text-slate-800 col-span-2 sm:col-span-1">
              <div className="font-black">+10 БАЛЛ</div>
              <div className="text-[9px] opacity-80">{isKk ? "Асықтыру / Қорқыту" : "Спешка / Запугивание"}</div>
            </div>
          </div>
        </div>

        {/* Tech Pipeline Strip */}
        <div className="rounded-[20px] bg-white p-2.5 sm:p-3 border border-[#121620]/10 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
          <span className="font-mono text-[#121620] font-black text-[11px]">
            5 САТЫЛЫ AI ҚҰБЫР:
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-[#121620]/80 text-[11px]">1. OCR / Қалыпқа келтіру</span>
          <span className="text-slate-300">→</span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-[#121620]/80 text-[11px]">2. Эвристика & WHOIS</span>
          <span className="text-slate-300">→</span>
          <span className="px-2 py-0.5 rounded bg-[#2775f6]/15 text-[#2775f6] font-bold text-[11px]">3. AlemAI (Qwen 3 8B)</span>
          <span className="text-slate-300">→</span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-[#121620]/80 text-[11px]">4. Risk Engine (0-100)</span>
          <span className="text-slate-300">→</span>
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">5. ҚР ҚК 190 / ӘҚБтК 127-2 арызы</span>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 05: LIVE PRODUCT DEMO / LENS В ДЕЙСТВИИ
// -------------------------------------------------------------
export function Slide05Demo({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Нақты инцидентті 3 секундта анықтау және шешу" : "Реальный сценарий проверки за 3 секунды"}
      metaRight="05/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full items-center">
        {/* Left: Scan Breakdown */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2775f6]/10 text-[#2775f6] text-xs font-black uppercase tracking-wider mb-2">
              <IconCrosshair size={14} /> {isKk ? "QORGAN Lens іс жүзінде" : "Демонстрация QORGAN Lens"}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
              {isKk ? "Күдіктен айқындыққа дейін 1 батырма" : "От подозрения к ясности за один клик"}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#121620]/75 font-semibold">
              {isKk
                ? "Пайдаланушы мессенджерден күдікті сілтемені салады. Жүйе оны түсініксіз техникалық кодпен қалдырмай, нақты шешім береді."
                : "Пользователь загружает скриншот или ссылку. Система не бросает его с непонятным логом, а дает понятный вердикт и действия."}
            </p>
          </div>

          {/* 3 Finding Cards */}
          <div className="space-y-2.5">
            <div className="rounded-[20px] bg-white p-3.5 border border-[#121620]/10 flex items-start gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-[#ec5562]/15 text-[#ec5562] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                ⚠️
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-[#121620]">
                  {isKk ? "Жалған домен (IDN Typosquatting)" : "Поддельный домен (IDN Typosquatting)"}
                </h4>
                <p className="text-[11px] text-[#121620]/70 mt-0.5 font-semibold">
                  {isKk ? "Kaspi атын жамылған сайт 2 күн бұрын анонимді түрде тіркелген." : "Сайт зарегистрирован 2 дня назад на анонимном хостинге, маскируется под банк."}
                </p>
              </div>
            </div>

            <div className="rounded-[20px] bg-white p-3.5 border border-[#121620]/10 flex items-start gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-[#e7a52e]/15 text-[#e7a52e] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                ⏳
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-[#121620]">
                  {isKk ? "Психологиялық шұғылдық қысымы" : "Психологический триггер срочности"}
                </h4>
                <p className="text-[11px] text-[#121620]/70 mt-0.5 font-semibold">
                  {isKk ? "AlemAI «15 минутта растамасаңыз шотыңыз жабылады» манипуляциясын таныды." : "AlemAI определил фразу «Ваш счет будет заблокирован через 15 минут» как манипуляцию."}
                </p>
              </div>
            </div>

            <div className="rounded-[20px] bg-[#2775f6] text-white p-3.5 flex items-start gap-3 shadow-md">
              <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold">
                ⚖️
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-white">
                  {isKk ? "Құқықтық дайын нұсқаулық" : "Готовая правовая инструкция"}
                </h4>
                <p className="text-[11px] text-white/90 mt-0.5 font-semibold">
                  {isKk ? "1. Kaspi қосымшасында картаны жабу. 2. eGov арқылы CyberPol-ға өтініш жіберу." : "1. Блокировка карты в Kaspi/Halyk. 2. Обращение в CyberPol МВД РК через eGov.kz."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: UI Result Mockup */}
        <div className="lg:col-span-6 h-full flex flex-col justify-center">
          <div className="rounded-[30px] bg-[#121620] text-white p-6 border border-white/10 shadow-2xl flex flex-col justify-between h-full max-h-[460px]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ec5562]" />
                <span className="text-xs font-mono font-bold text-white/80">{isKk ? "ҚАУІПСІЗДІК ЕСЕБІ" : "ОТЧЕТ БЕЗОПАСНОСТИ"}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#ec5562] text-white text-xs font-black">
                CRITICAL · 94/100
              </span>
            </div>

            <div className="my-auto space-y-3 py-2 font-semibold">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-mono text-[#38bdf8] font-bold">{isKk ? "ТАЛДАУ НЫСАНЫ:" : "ИСТОЧНИК УГРОЗЫ:"}</div>
                <div className="text-xs font-mono text-white mt-1 break-all">
                  https://kaspi-otbasy-bonus-2026.kz/claim-prize
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-mono text-slate-400 font-bold">{isKk ? "ALEMAI ШЕШІМІ:" : "ВЫВОД ИСКУССТВЕННОГО ИНТЕЛЛЕКТА (ALEMAI):"}</div>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  {isKk
                    ? "«Мемлекеттік әлеуметтік төлем атын жамылып, азаматтың Kaspi шотының SMS құпия кодтарын тартып алуға бағытталған фишинг сайт.»"
                    : "«Обнаружена попытка хищения банковских учетных данных под видом выплаты государственного бонуса. Фиксация сбора одноразовых SMS-кодов.»"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-lg font-black text-[#ec5562]">{isKk ? "3 маркер" : "3 сигнала"}</div>
                  <div className="text-[10px] text-slate-400">{isKk ? "Критикалық белгі" : "Критических маркера"}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-lg font-black text-emerald-400">1.8 сек</div>
                  <div className="text-[10px] text-slate-400">{isKk ? "AI өңдеу уақыты" : "Время распознавания"}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60 font-bold">
              <span>{isKk ? "Standard және Junior режимдерінде" : "Доступно в режиме Standard и Junior"}</span>
              <span className="text-[#38bdf8] font-black">QORGAN KZ</span>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 06: DIFFERENTIATION / ПОЧЕМУ МЫ ПОБЕЖДАЕМ
// -------------------------------------------------------------
export function Slide06Differentiation({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Бәсекелестерден айырмашылық және қорғаныс кешені" : "Конкурентное преимущество и барьеры входа"}
      metaRight="06/10"
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
            {isKk ? "Неге қолданыстағы құралдар құтқармайды?" : "Почему существующие решения не спасают?"}
          </h2>
          <p className="mt-1 text-sm sm:text-base text-[#121620]/75 max-w-2xl font-semibold">
            {isKk
              ? "IT нарығы күрделі инженерлік сервистерге толы, алайда олардың ешқайсысы қарапайым қазақстандықты әлеуметтік инженериядан қорғамайды."
              : "Рынок переполнен сложными техническими утилитами, но ни одна из них не защищает обычного человека от социальной инженерии в правовом поле Казахстана."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 items-stretch">
          {/* Column 1 */}
          <div className="rounded-[26px] bg-white p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-wider">
                {isKk ? "Дәстүрлі антивирустар" : "Антивирусы (Kaspersky и др.)"}
              </span>
              <h4 className="mt-4 text-lg font-black text-[#121620]">
                {isKk ? "Тек файлдарды тексереді" : "Защита от файлов, а не от людей"}
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-[#121620]/75 font-semibold">
                <li className="flex items-start gap-2">
                  <span className="text-[#ec5562] font-black">✕</span> {isKk ? "Мессенджердегі және SMS фишингті елемейді" : "Игнорируют фишинг в SMS и мессенджерах"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ec5562] font-black">✕</span> {isKk ? "Қазақстанның құқықтық ерекшелігін білмейді" : "Ноль юридической помощи в РК"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ec5562] font-black">✕</span> {isKk ? "Компьютерді ауырлататын десктоп бағдарлама" : "Тяжелые десктопные агенты"}
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 font-bold">
              {isKk ? "2010 жылдардың ескірген парадигмасы" : "Устаревшая парадигма 2010-х"}
            </div>
          </div>

          {/* Column 2 */}
          <div className="rounded-[26px] bg-[#dbe2ec] p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/70 text-[#121620]/70 text-xs font-black uppercase tracking-wider">
                {isKk ? "Техникалық чекерлер" : "Чекеры (VirusTotal, WHOIS)"}
              </span>
              <h4 className="mt-4 text-lg font-black text-[#121620]">
                {isKk ? "Түсініксіз код пен шу" : "Непонятный технический шум"}
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-[#121620]/75 font-semibold">
                <li className="flex items-start gap-2">
                  <span className="text-[#ec5562] font-black">✕</span> {isKk ? "99% адам JSON/IP есептерін түсінбейді" : "99% людей не поймут JSON-ответ или IP"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ec5562] font-black">✕</span> {isKk ? "Мәтіннің айла-тәсілін бағаламайды" : "Нет оценки контекста и манипуляций"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ec5562] font-black">✕</span> {isKk ? "Зардап шеккен соң не істеу керегін айтпайды" : "Не дают инструкции, что делать дальше"}
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-[#121620]/10 text-xs text-[#121620]/50 font-bold">
              {isKk ? "Тек IT мамандарына арналған құрал" : "Инструменты только для IT-шников"}
            </div>
          </div>

          {/* Column 3: QORGAN */}
          <div className="rounded-[26px] bg-[#2775f6] text-white p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
                  QORGAN Defense OS
                </span>
                <StarburstBadge size={24} className="text-white" />
              </div>
              <h4 className="mt-4 text-lg font-black text-white">
                {isKk ? "Әрбір қазақстандыққа арналған қалқан" : "Комплексный щит для каждого"}
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-white/95 font-semibold">
                <li className="flex items-start gap-2">
                  <IconCheck size={16} stroke={3} className="text-white shrink-0 mt-0.5" />
                  <strong>{isKk ? "ҚР-ға 100% бейімделген:" : "Локализация под РК:"}</strong> Kaspi, Halyk, eGov, МВД
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck size={16} stroke={3} className="text-white shrink-0 mt-0.5" />
                  <strong>AlemAI:</strong> {isKk ? "айла-тәсілді қазақша/орысша тану" : "отечественный AI-анализ манипуляций"}
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck size={16} stroke={3} className="text-white shrink-0 mt-0.5" />
                  <strong>{isKk ? "Құқықтық навигатор:" : "Правовой навигатор:"}</strong> {isKk ? "нақты құтқару қадамдары" : "конкретный план действий"}
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck size={16} stroke={3} className="text-white shrink-0 mt-0.5" />
                  <strong>Junior Mode:</strong> {isKk ? "балалар мен зейнеткерлерге қолжетімді" : "безопасность для детей и пожилых"}
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-white/20 text-xs text-white/85 font-black">
              {isKk ? "Толық циклді ұлттық шешім" : "Решение полного цикла"}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 07: MARKET & STATS
// -------------------------------------------------------------
export function Slide07Market({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Нарықтық әлеует және пайдаланушылар сұранысы" : "Масштаб рынка и потенциал проникновения"}
      metaRight="07/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full items-center">
        {/* Left Headline */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121620]/10 text-[#121620] text-xs font-black uppercase tracking-wider mb-2">
              {isKk ? "Нарықтық ауқым" : "Рыночный потенциал"}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
              {isKk ? "Үлкен сұранысқа ие нарық" : "Рынок с острой необходимостью"}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#121620]/75 font-semibold">
              {isKk
                ? "Қазақстан — халықтың 90%-дан астамы мобильді банкинг пен мемлекеттік қызметтерді қолданатын цифрлық мемлекет. Қауіпсіздікке деген мұқтаждық өте жоғары."
                : "Казахстан входит в число мировых лидеров по уровню финтех-проникновения (Kaspi, QR-платежи, госуслуги). Но оборотная сторона — колоссальный рост атак на неподготовленных граждан."}
            </p>
          </div>

          {/* 3 Stat Cards */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="rounded-[24px] bg-white p-4 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#121620]/60">{isKk ? "B2C Нарық" : "B2C Рынок"}</span>
              <div className="mt-3">
                <div className="text-2xl sm:text-4xl font-black text-[#121620]">20M+</div>
                <div className="text-[11px] text-[#121620]/70 font-black uppercase mt-1">{isKk ? "ҚР тұрғындары" : "Граждан РК"}</div>
              </div>
            </div>

            <div className="rounded-[24px] bg-[#2775f6] text-white p-4 flex flex-col justify-between shadow-md">
              <span className="text-[11px] font-black uppercase tracking-wider text-white/75">{isKk ? "B2B Клиенттер" : "B2B Клиенты"}</span>
              <div className="mt-3">
                <div className="text-2xl sm:text-4xl font-black">500k+</div>
                <div className="text-[11px] text-white/85 font-black uppercase mt-1">{isKk ? "ШОБ ұйымдары" : "Компаний МСБ"}</div>
              </div>
            </div>

            <div className="rounded-[24px] bg-[#121620] text-white p-4 flex flex-col justify-between shadow-md border border-white/10">
              <span className="text-[11px] font-black uppercase tracking-wider text-white/60">{isKk ? "Орталық Азия" : "Центр. Азия"}</span>
              <div className="mt-3">
                <div className="text-2xl sm:text-4xl font-black text-[#38bdf8]">$45M</div>
                <div className="text-[11px] text-white/70 font-black uppercase mt-1">{isKk ? "SecTech нарығы" : "Рынок SecTech"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Target Segments */}
        <div className="lg:col-span-6 h-full flex flex-col justify-center">
          <div className="rounded-[30px] bg-white p-6 border border-[#121620]/10 shadow-sm flex flex-col justify-between h-full space-y-3">
            <h3 className="text-lg font-black text-[#121620] uppercase tracking-wide">
              {isKk ? "Мақсатты аудитория сегменттері" : "Целевые сегменты аудитории"}
            </h3>

            <div className="space-y-2.5 font-semibold">
              <div className="p-3.5 rounded-2xl bg-[#dbe2ec]/40 border border-[#121620]/5 flex items-center justify-between">
                <div>
                  <div className="font-black text-xs sm:text-sm text-[#121620]">Junior (12–17 {isKk ? "жас" : "лет"})</div>
                  <div className="text-[11px] text-[#121620]/70">{isKk ? "Ойындардағы, Telegram және маркетплейстегі алаяқтықтан қорғау" : "Защита от скама в играх, Telegram и маркетплейсах"}</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#2775f6] text-white text-xs font-black">2.4M</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#dbe2ec]/40 border border-[#121620]/5 flex items-center justify-between">
                <div>
                  <div className="font-black text-xs sm:text-sm text-[#121620]">{isKk ? "Белсенді азаматтар (18–55 жас)" : "Активные пользователи (18–55 лет)"}</div>
                  <div className="text-[11px] text-[#121620]/70">{isKk ? "Мобильді банкинг, онлайн сауда, инвестициялық қауіпсіздік" : "Защита онлайн-банкинга, инвестиций, e-commerce"}</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#2775f6] text-white text-xs font-black">11.8M</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#dbe2ec]/40 border border-[#121620]/5 flex items-center justify-between">
                <div>
                  <div className="font-black text-xs sm:text-sm text-[#121620]">{isKk ? "Аға буын (55+ жас)" : "Старшее поколение (55+)"}</div>
                  <div className="text-[11px] text-[#121620]/70">{isKk ? "Телефондық алдау мен жалған мемлекеттік төлемдерден қорғау" : "Главная цель телефонных мошенников и псевдо-банков"}</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#2775f6] text-white text-xs font-black">3.2M</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#121620] text-white flex items-center justify-between">
                <div>
                  <div className="font-black text-xs sm:text-sm text-white">{isKk ? "Мектептер мен корпорациялар" : "Школы, колледжи и корпорации"}</div>
                  <div className="text-[11px] text-white/70">{isKk ? "Organization Workspace арқылы қызметкерлерді оқыту" : "Organization Workspace для трекинга цифровой гигиены"}</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#38bdf8] text-[#121620] text-xs font-black">B2B SaaS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 08: BUSINESS MODEL / FREEMIUM VS PRO & B2B ROADMAP
// -------------------------------------------------------------
export function Slide08BusinessModel({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Бизнес-модель: Freemium vs PRO және Ұйымдар болашағы" : "Бизнес-модель: Freemium vs PRO и B2B Родмап"}
      metaRight="08/10"
    >
      <div className="flex flex-col h-full justify-between space-y-3.5">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
            {isKk ? "Бизнес-модель: B2C Freemium & Болашақ B2B" : "Бизнес-модель: B2C Freemium & Будущий B2B"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#121620]/75 max-w-2xl font-semibold">
            {isKk
              ? "Массалық B2C қолжетімділік арқылы сенім жинап, жоғары маржиналды PRO жазылымдар мен болашақ ұйымдық лицензияларға өту."
              : "Массовый B2C охват через бесплатный сканер с конверсией в PRO-подписку и стратегическим выходом на организации (B2B)."}
          </p>
        </div>

        {/* 3 Columns: Free vs PRO vs Future B2B */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 flex-1 items-stretch font-semibold">
          {/* Column 1: FREE Tier */}
          <div className="rounded-[26px] bg-white p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-wider">
                  FREE / {isKk ? "ТЕГІН" : "БАЗОВЫЙ"}
                </span>
                <span className="text-xs font-mono font-black text-slate-500">0 ₸</span>
              </div>
              <h4 className="mt-3 text-lg font-black text-[#121620]">
                {isKk ? "Барлық азаматтар үшін" : "Для каждого жителя"}
              </h4>
              <p className="mt-1 text-xs text-[#121620]/70 leading-relaxed">
                {isKk ? "Әрбір қазақстандықтың цифрлық қалқаны болуы тиіс." : "Базовая гигиена должна быть бесплатной и доступной."}
              </p>

              <ul className="mt-3 space-y-2 text-xs text-[#121620]/80">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-black">✓</span>
                  <span>{isKk ? "Күніне 5 тексеру (сілтеме мен мәтін)" : "5 проверок в день (ссылки, текст)"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-black">✓</span>
                  <span>{isKk ? "Қауіп деңгейі (Қауіпсіз / Қауіпті)" : "Вердикт (Безопасно / Опасно)"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-black">✓</span>
                  <span>{isKk ? "Қоғамдық қауіптер радары (Pulse)" : "Публичный радар угроз (Pulse)"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 font-black">—</span>
                  <span className="text-slate-400 line-through">{isKk ? "Мультимодальді сараптама" : "Мультимодальный анализ"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 font-black">—</span>
                  <span className="text-slate-400 line-through">{isKk ? "Киберпол арыз конструкторы" : "Генератор заявлений в МВД"}</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-bold">
              {isKk ? "Вирусты өсім мен халық сенімі" : "Виральный рост и доверие граждан"}
            </div>
          </div>

          {/* Column 2: PRO Tier (Highlight) */}
          <div className="rounded-[26px] bg-[#2775f6] text-white p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
                  QORGAN PRO
                </span>
                <span className="text-xs font-mono font-black text-white">990 ₸/{isKk ? "ай" : "мес"}</span>
              </div>
              <h4 className="mt-3 text-lg font-black text-white">
                {isKk ? "Қорған Премиум қорғанысы" : "Премиум-защита семьи"}
              </h4>
              <p className="mt-1 text-xs text-white/85 leading-relaxed">
                {isKk ? "Айына 1 шыны кофе бағасына толық тыныштық." : "Полное спокойствие по цене одной чашки кофе."}
              </p>

              <ul className="mt-3 space-y-2 text-xs text-white/95">
                <li className="flex items-start gap-2">
                  <span className="text-white font-black">★</span>
                  <span><strong>{isKk ? "Шектеусіз мультимодальді сараптама:" : "Безлимитный мультимодал:"}</strong> скриншоттар, төлемдер, аудио, келісімдер</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-black">★</span>
                  <span><strong>{isKk ? "Киберпол арыз генераторы:" : "Генератор в CyberPol:"}</strong> ҚР ҚК 190 бабы, eOtinish үшін дайын PDF</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-black">★</span>
                  <span><strong>{isKk ? "Anti-Fraud Банк көмекшісі:" : "Anti-Fraud банкинг:"}</strong> шоттарды 15 мин бұғаттау скрипті</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-black">★</span>
                  <span><strong>{isKk ? "Darknet Leak Check:" : "Darknet Leak Check:"}</strong> ИИН мен нөмірдің таралуын бақылау</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-black">★</span>
                  <span><strong>{isKk ? "Family Shield (Junior):" : "Family Shield (Junior):"}</strong> балаға қауіп келгенде ата-анаға лезде Telegram-хабар</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-white/20 text-[11px] font-mono text-white/90 font-black">
              {isKk ? "100k юзер = 99 млн ₸ / ай (MRR)" : "100k юзеров = 99 млн ₸ / мес (MRR)"}
            </div>
          </div>

          {/* Column 3: B2B Organizations (Future Roadmap Strategy) */}
          <div className="rounded-[26px] bg-[#121620] text-white p-5 flex flex-col justify-between shadow-lg border border-white/10 relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-[#38bdf8] text-xs font-black uppercase tracking-wider">
                  B2B / {isKk ? "ҰЙЫМДАР РОДМАПЫ" : "РОДМАП ДЛЯ ОРГАНИЗАЦИЙ"}
                </span>
                <span className="text-xs font-mono font-black text-[#38bdf8]">Q3–Q4 2026</span>
              </div>
              <h4 className="mt-3 text-lg font-black text-white">
                {isKk ? "Мектептер мен Компаниялар" : "Школы и Корпорации"}
              </h4>
              <p className="mt-1 text-xs text-white/75 leading-relaxed">
                {isKk
                  ? "Неге болашақ бағыты? Мемлекеттік мектептер мен корпорациялар ұзақ тендерлік бюрократияны қажет етеді. Сондықтан B2B ауқымды B2C база қалыптасқан соң іске қосылады."
                  : "Почему как роадмап? Госзакупки и тендеры требуют времени. Стратегия: набрать B2C-базу и выходить на школы/корпорации как признанный стандарт."}
              </p>

              <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1.5">
                <div className="font-black text-[#38bdf8]">{isKk ? "B2B Organization Workspace:" : "B2B Organization Workspace:"}</div>
                <div className="text-[11px] text-slate-300">• Оқушылар мен қызметкерлердің қауіпсіздік дашборды</div>
                <div className="text-[11px] text-slate-300">• Фишинг шабуылдарының оқу симуляциясы</div>
                <div className="text-[11px] text-slate-300">• Ұйымның цифрлық гигиена сертификаты</div>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-[#38bdf8] font-bold">
              {isKk ? "Корпоративтік жоғары LTV түсім" : "Высокий корпоративный LTV"}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 09: ROADMAP 2026
// -------------------------------------------------------------
export function Slide09Roadmap({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "12 айға арналған нақты даму стратегиясы" : "Стратегический план реализации на 12 месяцев"}
      metaRight="09/10"
    >
      <div className="flex flex-col h-full justify-between space-y-3.5">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
            {isKk ? "Даму жол картасы: 2026" : "Дорожная карта развития: 2026"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#121620]/75 max-w-2xl font-semibold">
            {isKk
              ? "Хакатондағы толыққанды жұмыс істейтін MVP өнімінен — ұлттық киберқауіпсіздік стандартына дейін."
              : "От работающего MVP на хакатоне к национальному стандарту киберзащиты."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 flex-1 items-stretch font-semibold">
          {/* Q1 */}
          <div className="rounded-[26px] bg-[#2775f6] text-white p-5 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-white/20 text-[11px] font-black uppercase tracking-wider">
                  Q1 2026 · {isKk ? "ДАЙЫН" : "ГОТОВО"}
                </span>
                <IconCheck size={18} stroke={3} className="text-white" />
              </div>
              <h4 className="mt-4 text-xl font-black text-white">{isKk ? "Жұмыс істейтін MVP" : "Рабочий MVP"}</h4>
              <ul className="mt-3 space-y-1.5 text-xs text-white/90">
                <li>• QORGAN Lens (URL, QR, скрин)</li>
                <li>• AlemAI (Qwen 3 8B) сараптамасы</li>
                <li>• ҚР ҚК 190 бабы арыз үлгісі</li>
                <li>• Junior және Standard режимдері</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-white/20 text-[11px] font-mono text-white/85">
              {isKk ? "MVP 100% дайын әрі тестіленген" : "MVP 100% готов и протестирован"}
            </div>
          </div>

          {/* Q2 */}
          <div className="rounded-[26px] bg-white p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-black uppercase tracking-wider">
                  Q2 2026
                </span>
                <IconDeviceMobile size={18} className="text-[#2775f6]" />
              </div>
              <h4 className="mt-4 text-xl font-black text-[#121620]">{isKk ? "Мобильді B2C өсім" : "Мобильный B2C запуск"}</h4>
              <ul className="mt-3 space-y-1.5 text-xs text-[#121620]/75">
                <li>• iOS және Android қосымшалары</li>
                <li>• Мессенджерден 1 шертумен бөлісу</li>
                <li>• Telegram/WhatsApp тексеру боты</li>
                <li>• QORGAN PRO жазылымын іске қосу</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-[#2775f6] font-bold">
              {isKk ? "100k+ белсенді пайдаланушы" : "100k+ активных пользователей"}
            </div>
          </div>

          {/* Q3 */}
          <div className="rounded-[26px] bg-white p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-black uppercase tracking-wider">
                  Q3 2026
                </span>
                <IconBuildingStore size={18} className="text-[#2775f6]" />
              </div>
              <h4 className="mt-4 text-xl font-black text-[#121620]">{isKk ? "B2B Мектептер & ШОБ" : "B2B Школы и МСБ"}</h4>
              <ul className="mt-3 space-y-1.5 text-xs text-[#121620]/75">
                <li>• Organization Workspace толық релизі</li>
                <li>• Мектептерде оқушыларды тренингтен өткізу</li>
                <li>• 50+ ұйыммен пилоттық келісімшарт</li>
                <li>• Корпоративтік фишинг-симуляция</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-[#2775f6] font-bold">
              {isKk ? "Ұйымдық B2B кірісті бастау" : "Запуск регулярной B2B выручки"}
            </div>
          </div>

          {/* Q4 */}
          <div className="rounded-[26px] bg-[#121620] text-white p-5 flex flex-col justify-between shadow-lg border border-white/10">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-[#38bdf8] text-[11px] font-black uppercase tracking-wider">
                  Q4 2026
                </span>
                <IconRocket size={18} className="text-[#38bdf8]" />
              </div>
              <h4 className="mt-4 text-xl font-black text-white">{isKk ? "Киберпол & ҰБ API" : "CyberPol и Нацбанк"}</h4>
              <ul className="mt-3 space-y-1.5 text-xs text-white/75">
                <li>• ҚР ІІМ CyberPol жүйесімен API шлюзі</li>
                <li>• Ұлттық Банк Антифрод-орталығы серіктестігі</li>
                <li>• Банктердің төлем алдындағы фид интеграциясы</li>
                <li>• Дауыстық және дипфейк қорғанысы</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-[#38bdf8] font-bold">
              {isKk ? "Ұлттық қауіпсіздік инфрақұрылымы" : "Инфраструктура нацбезопасности"}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 10: CONCLUSION & JURY ACCESS (NO BUTTONS)
// -------------------------------------------------------------
export function Slide10Final({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Қазақстанның қауіпсіз цифрлық болашағы" : "Будущее безопасного интернета Казахстана"}
      metaRight="10/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full items-center">
        {/* Left: Final Clean Vision (No Action Buttons) */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#121620]/15 bg-white/60 text-[#121620] text-xs font-black uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {isKk ? "QORGAN — Қазақстанның Цифрлық Қалқаны" : "QORGAN — Цифровой Щит Казахстана"}
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-[#121620] tracking-tight uppercase leading-[1.02]">
              {isKk ? "Қауіпсіз Қазақстан" : "Безопасный Казахстан"}
              <span className="text-[#2775f6] block">{isKk ? "QORGAN-нан басталады." : "начинается с QORGAN."}</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[#121620]/80 max-w-xl leading-relaxed font-semibold">
              {isKk
                ? "Біз жай ғана тұжырымдама немесе бос идея емес — жұмыс істеп тұрған AlemAI моделі бар, ҚР ҚК 190-бабына негізделген құқықтық навигаторы мен бейімделгіш интерфейсі толық дайын ұлттық өнімді ұсынамыз."
                : "Перед вами не концепт и не слайды — полноценно готовый национальный продукт с реальной моделью AlemAI, правовой защитой по ст. 190 УК РК и адаптивным интерфейсом для всех поколений."}
            </p>
          </div>

          {/* 3 Core Pillars Summary */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 rounded-2xl bg-white border border-[#121620]/10 shadow-sm">
              <div className="text-xs font-black text-[#2775f6]">01 / ТЕХНОЛОГИЯ</div>
              <div className="text-[11px] text-[#121620]/75 font-bold mt-0.5">AlemAI (Qwen 3 8B) + 3 сек жауап</div>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#121620]/10 shadow-sm">
              <div className="text-xs font-black text-[#2775f6]">02 / ҚҰҚЫҚ</div>
              <div className="text-[11px] text-[#121620]/75 font-bold mt-0.5">ҚР ҚК 190 бабы & Киберпол арызы</div>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#121620]/10 shadow-sm">
              <div className="text-xs font-black text-[#2775f6]">03 / АУДИТОРИЯ</div>
              <div className="text-[11px] text-[#121620]/75 font-bold mt-0.5">Junior & Standard (20M+ халық)</div>
            </div>
          </div>

          {/* Project Contacts Badge (Clean presentation closing) */}
          <div className="p-4 rounded-2xl bg-[#ebeae5] border border-[#121620]/15 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-[#121620]">
            <div>
              <span className="text-slate-500 font-mono">Байланыс:</span> info@qorgan.kz
            </div>
            <div>
              <span className="text-slate-500 font-mono">Локация:</span> Astana Hub / Алматы, Қазақстан
            </div>
            <div className="font-mono text-[#2775f6] font-black">
              QORGAN KZ · 2026
            </div>
          </div>
        </div>

        {/* Right: Juror Demo Accounts & Credentials */}
        <div className="lg:col-span-5 h-full flex flex-col justify-center">
          <div className="rounded-[30px] bg-[#121620] text-white p-6 sm:p-7 border border-white/10 shadow-2xl flex flex-col justify-between h-full space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider font-black">
                {isKk ? "ЖЮРИ ҮШІН ДЕМО-АККАУНТТАР" : "ДЕМО-ДОСТУП ДЛЯ ЖЮРИ"}
              </span>
              <StarburstBadge size={28} className="text-[#38bdf8]" glow />
            </div>

            <div className="space-y-2.5 text-xs font-semibold">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-black text-white">{isKk ? "Standard пайдаланушы (16+)" : "Standard пользователь (16+)"}</div>
                  <div className="text-[11px] text-slate-400 font-mono">standard@qorgan.kz · password</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-white/15 text-slate-200 text-[10px] font-black">STD</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-black text-white">{isKk ? "Junior пайдаланушы (13–15 жас)" : "Junior пользователь (13–15 лет)"}</div>
                  <div className="text-[11px] text-slate-400 font-mono">junior@qorgan.kz · password</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#2775f6]/30 text-[#38bdf8] text-[10px] font-black">JUN</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-black text-white">{isKk ? "Мектеп менеджері (B2B Workspace)" : "Менеджер школы (B2B Workspace)"}</div>
                  <div className="text-[11px] text-slate-400 font-mono">manager@qorgan.kz · password</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-black">ORG</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-bold">
              <span>Fullstack MVP: Next.js + AlemAI</span>
              <span className="font-mono text-white font-black">QORGAN KZ · 2026</span>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// Slide registry
export const PITCH_SLIDES = [
  { id: 1, titleKk: 'Титулдық слайд', titleRu: 'Титульный слайд', subKk: 'QORGAN цифрлық қалқаны', subRu: 'Цифровой щит РК', component: Slide01Hero },
  { id: 2, titleKk: 'Нарықтық проблема', titleRu: 'Боль рынка', subKk: 'Киберқауіптер дағдарысы', subRu: 'Кризис доверия и фишинг', component: Slide02Problem },
  { id: 3, titleKk: 'QORGAN экожүйесі', titleRu: 'Решение QORGAN', subKk: '4 негізгі бағыт', subRu: '4 ключевых модуля', component: Slide03Solution },
  { id: 4, titleKk: 'Технология & AI', titleRu: 'Технологии & AI', subKk: 'AlemAI 5 сатылы сараптама', subRu: '5 стадий анализа на AlemAI', component: Slide04TechPipeline },
  { id: 5, titleKk: 'Тікелей өнім демосы', titleRu: 'Live Demo Lens', subKk: '3 секундта анықтау', subRu: 'Сканирование за 3 сек', component: Slide05Demo },
  { id: 6, titleKk: 'Бәсекелестік артықшылық', titleRu: 'Дифференциация', subKk: 'Неге біз жеңеміз', subRu: 'Почему мы побеждаем', component: Slide06Differentiation },
  { id: 7, titleKk: 'Нарық және сегменттер', titleRu: 'Рынок и сегменты', subKk: '20M+ аудитория', subRu: '20M+ аудитория в РК', component: Slide07Market },
  { id: 8, titleKk: 'Бизнес-модель', titleRu: 'Бизнес-модель', subKk: 'B2C, B2B SaaS, GovTech API', subRu: 'B2C, B2B SaaS, GovTech API', component: Slide08BusinessModel },
  { id: 9, titleKk: 'Жол картасы (2026)', titleRu: 'Дорожная карта', subKk: '12 айға арналған стратегия', subRu: 'План развития 2026', component: Slide09Roadmap },
  { id: 10, titleKk: 'Қорытынды және Демо', titleRu: 'Финал & Демо', subKk: 'Жюри үшін демо-аккаунттар', subRu: 'Запуск живого продукта', component: Slide10Final },
];
