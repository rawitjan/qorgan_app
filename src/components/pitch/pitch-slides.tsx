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
  IconQrcode,
  IconMessageCircle,
  IconEye,
  IconFileText,
  IconDatabase,
  IconAlertCircle,
  IconChecklist,
  IconPhoneCall,
  IconShieldCheck,
  IconShieldX,
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
        glow && 'drop-shadow-[0_0_12px_rgba(39,117,246,0.6)]',
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full animate-[spin_24s_linear_infinite]"
      >
        <circle cx="12" cy="12" r="9" strokeOpacity="0.2" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
      </svg>
    </div>
  );
}

// Reusable Base Slide Layout Frame
export function SlideFrame({
  children,
  metaLeft,
  metaRight,
  className,
}: {
  children: React.ReactNode;
  metaLeft: string;
  metaRight: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative w-full h-full flex flex-col justify-between p-6 sm:p-10 xl:p-12 select-none overflow-hidden bg-[#ebeae5] text-[#121620]',
        className
      )}
    >
      {/* Top Metadata Header */}
      <header className="flex items-center justify-between pb-3 border-b border-[#121620]/10 text-xs sm:text-sm font-extrabold tracking-wider uppercase text-[#121620]/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2775f6]" />
          <span>{metaLeft}</span>
        </div>
        <div className="font-mono text-xs sm:text-sm tracking-widest text-[#121620] font-black">
          {metaRight}
        </div>
      </header>

      {/* Main Slide Content Area */}
      <main className="flex-1 py-4 sm:py-6 flex flex-col justify-center min-h-0">
        {children}
      </main>

      {/* Bottom Footer */}
      <footer className="flex items-center justify-between pt-3 border-t border-[#121620]/10 text-[11px] sm:text-xs font-bold text-[#121620]/50 tracking-wider">
        <div className="flex items-center gap-3">
          <span>QORGAN AI DEFENSE OS · ЖЮРИ PITCH 2026</span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#121620]/30" />
          <span className="hidden sm:inline-block font-mono text-[10px]">ALEMAI · QWEN 3 8B</span>
        </div>
        <Link
          href="/"
          target="_blank"
          className="text-[#2775f6] hover:text-[#1b62d8] transition-colors font-extrabold inline-flex items-center gap-1"
        >
          qorgan.kz <IconExternalLink size={12} />
        </Link>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------
// SLIDE 01: HERO / COVER (01/15)
// -------------------------------------------------------------
export function Slide01Hero({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Басқалар киберқауіпті талқылап жатқанда — біз оны тоқтатамыз" : "Пока другие обсуждают киберугрозы — мы их нейтрализуем"}
      metaRight="01/15"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-center">
        {/* Left Headline Area */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#121620]/15 bg-white/70 text-[#121620] text-xs font-black uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#2775f6] animate-pulse" />
              {isKk ? "🇰🇿 Ұлттық AI-стартап · Қазақстан 2026" : "🇰🇿 Национальный AI-стартап · Казахстан 2026"}
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-[#121620] tracking-tight leading-[1.02] uppercase">
              QORGAN
              <span className="block text-[#2775f6] font-bold normal-case text-2xl sm:text-4xl xl:text-5xl mt-1 tracking-normal">
                {isKk ? "Цифрлық қалқан және құқықтық навигатор" : "Цифровой щит и правовой навигатор"}
              </span>
            </h1>

            <p className="mt-4 text-[#121620]/80 text-sm sm:text-base max-w-xl leading-relaxed font-semibold">
              {isKk ? (
                <>
                  Қазақстандағы күдікті сілтемелер мен хабарламаларды <strong>отандық жасанды интеллектпен (AlemAI / Qwen 3 8B)</strong> тексеріп, азаматты қаржылық шығын мен кибербуллингтен қорғайтын кешенді қауіпсіздік платформасы.
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
              <div className="mt-2">
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
              <div className="mt-2">
                <div className="text-2xl sm:text-3xl font-black">AlemAI</div>
                <div className="text-[11px] text-white/85 font-bold">Qwen 3 8B Local API</div>
              </div>
            </div>

            <div className="rounded-[24px] bg-[#121620] text-white p-3.5 sm:p-4 flex flex-col justify-between shadow-md">
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/60">
                  {isKk ? "Скоринг" : "Скоринг"}
                </span>
                <StarburstBadge size={20} className="text-[#38bdf8]" />
              </div>
              <div className="mt-2">
                <div className="text-2xl sm:text-3xl font-black text-[#38bdf8]">100%</div>
                <div className="text-[11px] text-white/70 font-bold">
                  {isKk ? "Детерминистік" : "Детерминированный"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Hero Visual Card */}
        <div className="lg:col-span-5 h-full flex flex-col justify-center">
          <div className="relative rounded-[32px] bg-[#121620] p-6 sm:p-8 text-white flex flex-col justify-between overflow-hidden shadow-2xl border border-white/10 h-full max-h-[500px]">
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold tracking-wider text-white/90">
                <IconLock size={14} className="text-[#38bdf8]" /> QORGAN LENS SYSTEM
              </div>
              <StarburstBadge size={32} className="text-[#38bdf8]" glow />
            </div>

            <div className="relative z-10 my-auto rounded-2xl bg-white/5 border border-white/15 p-4 sm:p-5 backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-[#38bdf8] font-bold">LENS_ID: #KZ-98241</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ec5562]/20 border border-[#ec5562]/40 text-[#ff6b77] text-[11px] font-black">
                  CRITICAL 100/100
                </span>
              </div>
              <div className="mt-3 space-y-2 text-xs font-semibold">
                <div className="text-slate-300 font-mono truncate">
                  Нысан: <span className="text-white font-bold">fake-kaspi-security.kz</span>
                </div>
                <div className="text-emerald-400 flex items-center gap-1.5">
                  <IconCheck size={14} stroke={3} /> AlemAI фишинг схемасы мен манипуляцияны ашты
                </div>
                <div className="text-emerald-400 flex items-center gap-1.5">
                  <IconCheck size={14} stroke={3} /> ҚР ҚК 190 бабы бойынша Киберполға eOtinish арызы дайын
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 text-xs text-slate-400 font-semibold">
              <span>Тікелей жұмыс: Fullstack + AlemAI</span>
              <span className="font-mono text-white font-black">KZ 2026</span>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 02: FINANCIAL FRAUD & 60B KZT LOSS (02/15)
// -------------------------------------------------------------
export function Slide02Problem({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "ҚР Бас прокуратурасы және ІІМ ресми деректері (2024–2026)" : "Официальная статистика ГП РК и МВД (2024–2026)"}
      metaRight="02/15"
    >
      <div className="flex flex-col h-full justify-between space-y-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec5562]/15 text-[#ec5562] text-xs font-black uppercase tracking-wider mb-2">
            <IconAlertTriangle size={14} />
            {isKk ? "ҚР ҚК 190 (Алаяқтық) · Жыл сайынғы шығын дағдарысы" : "ст. 190 УК (Мошенничество) · Кризис потерь"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
            {isKk ? "60 млрд теңге шығын: " : "Ущерб 60 млрд тенге: "}
            <span className="text-[#ec5562] block sm:inline">
              {isKk ? "Интернет-алаяқтық дағдарысы" : "Кризис интернет-мошенничества"}
            </span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#121620]/75 max-w-2xl font-semibold">
            {isKk
              ? "Қазақстанда өткен жылы 22 100-ден астам интернет-алаяқтық тіркеліп, халық 50+ млрд теңгесінен айырылды. Биыл қауіп 60 миллиардтан асады."
              : "В РК зафиксировано более 22 100 преступлений, ущерб превысил 50 млрд тенге. В 2026 году риски оцениваются свыше 60 млрд тенге."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 flex-1 items-stretch">
          {/* Card 1: Stats */}
          <div className="rounded-[26px] bg-[#121620] text-white p-5 flex flex-col justify-between shadow-lg border border-white/10">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-[#ec5562]/20 text-[#ff6b77] text-[11px] font-black uppercase">
                  2024–2026 Тренды
                </span>
                <span className="font-mono text-xs text-[#ec5562] font-black">ҚР ҚК 190</span>
              </div>
              <h3 className="mt-3 text-lg font-black leading-snug">
                45,5 млрд ₸ → 60+ млрд ₸ шығын қаупі
              </h3>
              <div className="mt-3 space-y-2 text-xs text-slate-300 font-semibold">
                <div className="flex justify-between pb-1 border-b border-white/10">
                  <span className="text-slate-400">2024 жыл:</span>
                  <span className="font-bold text-white">22 100+ іс · 45,5 млрд ₸</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-white/10">
                  <span className="text-slate-400">2025 жыл:</span>
                  <span className="font-bold text-white">24 500+ іс · 52+ млрд ₸</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">2026 жыл:</span>
                  <span className="font-bold text-[#ff7582]">60+ млрд ₸ шығын</span>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 font-bold">
              Дереккөз: ҚР ІІМ Киберпол & Бас Прокуратура
            </div>
          </div>

          {/* Card 2: Brand Clones */}
          <div className="rounded-[26px] bg-white p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-[#2775f6]/10 text-[#2775f6] text-[11px] font-black uppercase">
                  Бренд клондары
                </span>
                <span className="font-mono text-xs font-black text-[#2775f6]">84%</span>
              </div>
              <h3 className="mt-3 text-lg font-black text-[#121620] leading-snug">
                Kaspi, eGov, «Қазпошта» жамылғандар
              </h3>
              <p className="mt-2 text-xs text-[#121620]/75 leading-relaxed font-semibold">
                Халықтың 84%-ы фишингтік доменді ресми қызметтен ажырата алмай, SMS-код пен картасын өз қолымен береді.
              </p>
              <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-red-700">● Жалған SMS: «Сәлемдемеңіз тоқтатылды»</div>
                <div className="text-slate-600">● Жалған қоңырау: «Қауіпсіздік қызметі»</div>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-[#2775f6] font-bold">
              Қарапайым адамдар психологиялық қысымға төтеп бере алмайды
            </div>
          </div>

          {/* Card 3: Helplessness */}
          <div className="rounded-[26px] bg-[#dbe2ec] p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-white/70 text-[#121620]/70 text-[11px] font-black uppercase">
                  Қауқарсыздық
                </span>
                <span className="text-2xl font-black text-[#ec5562]">0%</span>
              </div>
              <h3 className="mt-3 text-lg font-black text-[#121620] leading-snug">
                Неге адамдар қорғансыз?
              </h3>
              <ul className="mt-2 space-y-1.5 text-xs text-[#121620]/75 font-semibold">
                <li className="flex items-start gap-1.5"><span className="text-red-500 font-bold">✕</span> Шетелдік антивирустар қазақ тілін білмейді</li>
                <li className="flex items-start gap-1.5"><span className="text-red-500 font-bold">✕</span> Kaspi мен eGov жергілікті мәтінін түсінбейді</li>
                <li className="flex items-start gap-1.5"><span className="text-red-500 font-bold">✕</span> Ақша кеткен соң полицияға арыз беру 2 аптаға созылады</li>
                <li className="flex items-start gap-1.5"><span className="text-red-500 font-bold">✕</span> Алғашқы 15 минутта жедел көмек құралы жоқ</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-[#121620]/10 text-[11px] text-[#121620]/60 font-bold">
              Жергілікті, отандық қауіпсіздік жүйесі жоқ
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 03: CYBERBULLYING & ADOLESCENTS (03/15)
// -------------------------------------------------------------
export function Slide03Cyberbullying({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "ЮНИСЕФ және ҚР Оқу-ағарту министрлігі деректері" : "Данные ЮНИСЕФ и Минпросвещения РК"}
      metaRight="03/15"
    >
      <div className="flex flex-col h-full justify-between space-y-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec5562]/15 text-[#ec5562] text-xs font-black uppercase tracking-wider mb-2">
            <IconAlertCircle size={14} />
            {isKk ? "ҚР ӘҚБтК 127-2 (Буллинг және кибербуллинг)" : "ст. 127-2 КоАП (Буллинг и кибербуллинг)"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
            {isKk ? "Жасырын дағдарыс: " : "Скрытый кризис: "}
            <span className="text-[#ec5562] block sm:inline">
              {isKk ? "Жасөспірімдер және Кибербуллинг" : "Подростки и Кибербуллинг"}
            </span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#121620]/75 max-w-2xl font-semibold">
            {isKk
              ? "Қауіп тек банктік шоттарда емес — мектеп чаттары мен жасөспірімдер мессенджерлеріндегі қорқыту, бопсалау және психологиялық травляда."
              : "Угроза не только в банках, но и в детских чатах: травля, вымогательство и шантаж наносят удар по здоровью школьников."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 flex-1 items-stretch">
          {/* Card 1: UNICEF */}
          <div className="rounded-[26px] bg-[#121620] text-white p-5 flex flex-col justify-between shadow-lg border border-white/10">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-[#ec5562]/20 text-[#ff6b77] text-[11px] font-black uppercase">
                  ЮНИСЕФ дерегі
                </span>
                <span className="text-3xl font-black text-[#ec5562]">20%</span>
              </div>
              <h3 className="mt-3 text-lg font-black leading-snug">
                Әрбір 5-ші бала кибербуллингке тап болады
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed font-semibold">
                Қазақстандағы мектеп оқушыларының 20%-ы әлеуметтік желілер мен WhatsApp/Telegram топтарында жүйелі түрде мазақтау мен қорқытуға ұшырайды.
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 font-bold">
              3.8 миллион қазақстандық оқушы қауіп аймағында
            </div>
          </div>

          {/* Card 2: 52% Silence */}
          <div className="rounded-[26px] bg-white p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-black uppercase">
                  Үнсіздік синдромы
                </span>
                <span className="text-3xl font-black text-amber-600">52%</span>
              </div>
              <h3 className="mt-3 text-lg font-black text-[#121620] leading-snug">
                52% бала ата-анасына тіс жарып айтпайды
              </h3>
              <p className="mt-2 text-xs text-[#121620]/75 leading-relaxed font-semibold">
                Жасөспірімдер ұялғаннан немесе қорқытылғаннан үндемей қалады. Салдары: күйзеліс, оқудың құлдырауы және психологиялық ауыр зардаптар.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-amber-700 font-bold">
              Сенімді цифрлық қорғаныс арнасы қажет
            </div>
          </div>

          {/* Card 3: Law 127-2 & 111 */}
          <div className="rounded-[26px] bg-[#dbe2ec] p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-[#2775f6]/10 text-[#2775f6] text-[11px] font-black uppercase">
                  Құқықтық тетік
                </span>
                <span className="font-mono text-xs font-black text-[#2775f6]">127-2 БАП</span>
              </div>
              <h3 className="mt-3 text-lg font-black text-[#121620] leading-snug">
                Заң бар, бірақ дәлелдеу тетігі жоқ
              </h3>
              <p className="mt-2 text-xs text-[#121620]/75 leading-relaxed font-semibold">
                ҚР ӘҚБтК 127-2 бабы жауапкершілік көздейді, бірақ балалар да, ата-аналар да дәлелді қалай сақтауды білмейді. Скриншоттар өшіріліп кетеді.
              </p>
              <div className="mt-3 p-2.5 rounded-xl bg-white border border-[#121620]/10 text-xs">
                <div className="font-black text-[#2775f6]">📞 Мемлекеттік 111 Сенім желісі</div>
                <div className="text-slate-600 mt-0.5">Жедел заңдық және психологиялық көмек</div>
              </div>
            </div>
            <div className="pt-3 border-t border-[#121620]/10 text-[11px] text-[#2775f6] font-bold">
              QORGAN Junior режимі дәлелді бұрмаланбайтын түрде сақтайды
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 04: QORGAN ECOSYSTEM / 4 PILLARS (04/15)
// -------------------------------------------------------------
export function Slide04Solution({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Жай ғана уәде емес, толыққанды қауіпсіздік контуры" : "Не обещания, а целостная экосистема безопасности"}
      metaRight="04/15"
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
                  ? "Сілтеме, скриншот, SMS немесе QR-кодты сканерлейді. Домен клондарын және фишинг айлаларын ашып көрсетеді."
                  : "Мультимодальный AI-сканер ссылок, скриншотов, SMS и QR. Раскрывает клоны доменов и скрытые ловушки."}
              </p>
              <div className="mt-3 p-2.5 rounded-xl bg-white/10 border border-white/20 text-[11px] font-mono">
                <div className="flex items-center justify-between text-white/90">
                  <span>fake-kaspi.kz</span>
                  <span className="text-[#ff7582] font-black">CRITICAL</span>
                </div>
                <div className="text-[10px] text-white/70 mt-1">✓ AlemAI сараптамасы дайын</div>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-white/20 flex items-center justify-between">
              <span className="text-xs font-mono text-white/80 font-bold">{isKk ? "Мультимодальды" : "Мультимодальный"}</span>
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
                  ? "ҚР ҚК 190-бабы («Алаяқтық») бойынша Киберполға eOtinish арқылы ресми арыз жасау және банкті 15 минутта бұғаттау алгоритмі."
                  : "Шаблоны заявлений по ст. 190 УК РК (мошенничество) и алгоритм экстренной блокировки счетов за 15 минут."}
              </p>
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

          {/* Pillar 03: XP Academy */}
          <div className="rounded-[26px] bg-[#121620] text-white p-4 sm:p-5 flex flex-col justify-between shadow-lg border border-white/10 relative overflow-hidden">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#38bdf8]">
                  {isKk ? "03 / Тәжірибе" : "03 / Практика"}
                </span>
                <StarburstBadge size={22} className="text-[#38bdf8]" />
              </div>
              <h3 className="mt-2 text-xl font-black">{isKk ? "Миссиялар (XP)" : "Миссии (XP)"}</h3>
              <p className="mt-1.5 text-xs text-white/75 leading-relaxed font-semibold">
                {isKk
                  ? "Қазақстандағы шынайы схемалармен (Kaspi, сәлемдеме, жалған қоңырау) интерактивті жаттығу. Қатені қауіпсіз ортада тану."
                  : "Интерактивный симулятор на реальных кейсах Казахстана. Ошибки совершаются в безопасной среде тренажера."}
              </p>
              <div className="mt-3 p-2.5 rounded-xl bg-white/5 border border-white/15 text-[11px] font-mono">
                <div className="flex items-center justify-between text-[#38bdf8] font-bold">
                  <span>{isKk ? "Миссия #4: Сәлемдеме" : "Миссия #4: Посылка"}</span>
                  <span>+150 XP</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">✓ Фишингтік маркер табылды</div>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-[#38bdf8] font-bold">{isKk ? "Геймификация" : "Геймификация"}</span>
              <span className="text-3xl font-black tracking-tighter text-[#38bdf8]">03</span>
            </div>
          </div>

          {/* Pillar 04: Junior Mode */}
          <div className="rounded-[26px] bg-white text-[#121620] p-4 sm:p-5 flex flex-col justify-between border border-[#121620]/10 shadow-sm relative overflow-hidden">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
                  {isKk ? "04 / Жасөспірім" : "04 / Дети"}
                </span>
                <StarburstBadge size={22} className="text-emerald-500" />
              </div>
              <h3 className="mt-2 text-xl font-black">{isKk ? "Junior Режимі" : "Режим Junior"}</h3>
              <p className="mt-1.5 text-xs text-[#121620]/75 leading-relaxed font-semibold">
                {isKk
                  ? "13–15 жастағы жасөспірімдерге бейімделген қарапайым тіл, буллингтен қорғау және мемлекеттік «111» сенім телефонына жедел байланыс."
                  : "Понятный язык для подростков 13–15 лет, защита от буллинга и прямая связь с горячей линией доверия «111»."}
              </p>
              <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-950">
                <div className="flex items-center justify-between font-bold">
                  <span>ӘҚБтК 127-2 / Сенім 111</span>
                  <span className="text-emerald-700">ҚАУІПСІЗ</span>
                </div>
                <div className="text-[10px] text-emerald-800 mt-1">✓ Дәлелдер сейфіне сақталды</div>
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-[#121620]/10 flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-700 font-bold">{isKk ? "Балалар қорғаны" : "Защита детей"}</span>
              <span className="text-3xl font-black tracking-tighter text-emerald-800">04</span>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 05: MULTIMODAL LENS SCANNER (05/15)
// -------------------------------------------------------------
export function Slide05MultimodalLens({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Мультимодальды сканерлеу тетіктері" : "Механизмы мультимодального сканирования"}
      metaRight="05/15"
    >
      <div className="flex flex-col h-full justify-between space-y-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2775f6]/10 text-[#2775f6] text-xs font-black uppercase tracking-wider mb-2">
            <IconCrosshair size={14} /> {isKk ? "Бір терезеде мультимодальды сканер" : "Единое окно сканирования"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
            {isKk ? "QORGAN Lens: 4 форматты қатар талдау" : "QORGAN Lens: 4 формата анализа"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#121620]/75 max-w-2xl font-semibold">
            {isKk
              ? "Пайдаланушыға техникалық білімнің қажеті жоқ — скриншотты, сілтемені немесе SMS-ті енгізу жеткілікті."
              : "Пользователю не нужны IT-знания: достаточно вставить ссылку, скриншот чата или текст подозрительного SMS."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 flex-1 items-stretch">
          {/* 1. OCR */}
          <div className="rounded-[26px] bg-white p-4 sm:p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-3xl mb-2">🖼️</div>
              <h4 className="text-base sm:text-lg font-black text-[#121620]">OCR Vision</h4>
              <p className="mt-2 text-xs text-[#121620]/75 leading-relaxed font-semibold">
                {isKk
                  ? "Қазақ және орыс тіліндегі скриншоттарды, WhatsApp/Telegram чаттары мен SMS скриншоттарын қатесіз цифрлайды."
                  : "Оптическое распознавание скриншотов чатов и SMS на казахском и русском языках."}
              </p>
            </div>
            <div className="pt-2.5 border-t border-slate-100 text-[11px] font-mono text-[#2775f6] font-bold">
              ✓ Кирил & Латын қолдауы
            </div>
          </div>

          {/* 2. URL Defanging */}
          <div className="rounded-[26px] bg-[#2775f6] text-white p-4 sm:p-5 flex flex-col justify-between shadow-md">
            <div>
              <div className="text-3xl mb-2">🔗</div>
              <h4 className="text-base sm:text-lg font-black text-white">URL Defanging</h4>
              <p className="mt-2 text-xs text-white/85 leading-relaxed font-semibold">
                {isKk
                  ? "Зиянды сілтемені залалсыздандырып көрсетеді (hxxp://...), доменнің жасын, DNS-ін және банктік клон базасын тексереді."
                  : "Безопасная изоляция ссылок (hxxp://...), проверка возраста домена, DNS и клонов банков."}
              </p>
            </div>
            <div className="pt-2.5 border-t border-white/20 text-[11px] font-mono text-white/90 font-bold">
              ✓ WHOIS + VirusTotal API
            </div>
          </div>

          {/* 3. QR Decoder */}
          <div className="rounded-[26px] bg-[#121620] text-white p-4 sm:p-5 flex flex-col justify-between shadow-lg border border-white/10">
            <div>
              <div className="text-3xl mb-2">📱</div>
              <h4 className="text-base sm:text-lg font-black text-white">QR-код декодері</h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed font-semibold">
                {isKk
                  ? "Көшедегі жалған жарнамалар мен төлем баннерлеріндегі жасырын сілтемелерді құрылғыға өткізбей оқшаулап оқиды."
                  : "Декодирование фальшивых QR-кодов на улице и в квитанциях в защищенной песочнице."}
              </p>
            </div>
            <div className="pt-2.5 border-t border-white/10 text-[11px] font-mono text-[#38bdf8] font-bold">
              ✓ Қауіпсіз Sandbox дешифрлеу
            </div>
          </div>

          {/* 4. Text Semantics */}
          <div className="rounded-[26px] bg-[#dbe2ec] p-4 sm:p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-3xl mb-2">💬</div>
              <h4 className="text-base sm:text-lg font-black text-[#121620]">Мәтіндік семантика</h4>
              <p className="mt-2 text-xs text-[#121620]/75 leading-relaxed font-semibold">
                {isKk
                  ? "Алаяқтық хабарламалардағы «шұғыл бұғаттау», «ұтыс ұтып алдыңыз» сияқты әлеуметтік инженерия айла-тәсілдерін анықтайды."
                  : "Распознавание социальной инженерии («срочно подтвердите», «вам положена выплата»)."}
              </p>
            </div>
            <div className="pt-2.5 border-t border-[#121620]/10 text-[11px] font-mono text-[#2775f6] font-bold">
              ✓ Психологиялық маркерлер
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 06: 5-STAGE AI PIPELINE & ALEMAI (06/15)
// -------------------------------------------------------------
export function Slide06TechPipeline({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "AlemAI (Qwen 3 8B) ұлттық моделі және 5 сатылы сараптама" : "Национальная модель AlemAI (Qwen 3 8B) и 5-стадийный контур"}
      metaRight="06/15"
    >
      <div className="flex flex-col h-full justify-between space-y-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2775f6]/10 text-[#2775f6] text-xs font-black uppercase tracking-wider mb-2">
            <IconCpu size={14} /> {isKk ? "Отандық LLM Инфрақұрылымы" : "Отечественная LLM-инфраструктура"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
            {isKk ? "5 сатылы терең сараптама құбыры" : "5-стадийный глубокий AI-контур"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#121620]/75 max-w-2xl font-semibold">
            {isKk
              ? "Өңдеу тек кодты тексерумен бітпейді: мәтіндік семантика, әлеуметтік инженерия және манипуляциялық қысым сатылап талданады."
              : "Анализ не ограничивается проверкой кода: исследуются семантика, социальная инженерия и психологическое давление."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 flex-1 items-stretch">
          {/* Stage 1 */}
          <div className="rounded-[22px] bg-white p-3.5 sm:p-4 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <span className="font-mono text-xs font-black text-[#2775f6]">1-САТЫ</span>
              <h4 className="mt-2 text-sm sm:text-base font-black text-[#121620]">OCR & Қалыптау</h4>
              <p className="mt-2 text-xs text-[#121620]/75 leading-relaxed font-semibold">
                Мультимодальды кіріс деректерін тазарту, қазақша/орысша мәтінді нормалдау және URL бөліп алу.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 font-mono text-[10px] text-slate-500 font-bold">
              Vision Normalizer
            </div>
          </div>

          {/* Stage 2 */}
          <div className="rounded-[22px] bg-white p-3.5 sm:p-4 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <span className="font-mono text-xs font-black text-[#2775f6]">2-САТЫ</span>
              <h4 className="mt-2 text-sm sm:text-base font-black text-[#121620]">Threat Intel</h4>
              <p className="mt-2 text-xs text-[#121620]/75 leading-relaxed font-semibold">
                Домен жасы, DNS, SSL, WHOIS және Kaspi/Halyk банктік клон базасын тексеру.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 font-mono text-[10px] text-slate-500 font-bold">
              VT & Local Clones
            </div>
          </div>

          {/* Stage 3 */}
          <div className="rounded-[22px] bg-[#2775f6] text-white p-3.5 sm:p-4 flex flex-col justify-between shadow-md">
            <div>
              <span className="font-mono text-xs font-black text-white">3-САТЫ</span>
              <h4 className="mt-2 text-sm sm:text-base font-black text-white">AlemAI Сарабы</h4>
              <p className="mt-2 text-xs text-white/90 leading-relaxed font-semibold">
                Qwen 3 8B отандық моделі мәтіндегі манипуляцияны, асықтыруды және қорқытуды таниды.
              </p>
            </div>
            <div className="pt-2 border-t border-white/20 font-mono text-[10px] text-white/90 font-bold">
              Психологиялық детектор
            </div>
          </div>

          {/* Stage 4 */}
          <div className="rounded-[22px] bg-[#121620] text-white p-3.5 sm:p-4 flex flex-col justify-between shadow-lg border border-white/10">
            <div>
              <span className="font-mono text-xs font-black text-[#38bdf8]">4-САТЫ</span>
              <h4 className="mt-2 text-sm sm:text-base font-black text-white">Risk Engine</h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed font-semibold">
                Сигналдарды қатаң математикалық салмақтармен біріктіріп, 0–100 нақты қауіп индексін шығарады.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 font-mono text-[10px] text-[#38bdf8] font-bold">
              Детерминистік скоринг
            </div>
          </div>

          {/* Stage 5 */}
          <div className="rounded-[22px] bg-white p-3.5 sm:p-4 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <span className="font-mono text-xs font-black text-emerald-700">5-САТЫ</span>
              <h4 className="mt-2 text-sm sm:text-base font-black text-emerald-800">Құқықтық шешім</h4>
              <p className="mt-2 text-xs text-[#121620]/75 leading-relaxed font-semibold">
                Қазақша/орысша түсіндірме, банкті шұғыл бұғаттау алгоритмі және Киберполға eOtinish арызы.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 font-mono text-[10px] text-emerald-700 font-bold">
              ҚР ҚК 190 / 127-2
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 07: DETERMINISTIC RISK ENGINE (07/15)
// -------------------------------------------------------------
export function Slide07RiskEngine({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Математикалық кепілдік · 100% тұрақты детерминистік есептеу" : "Математическая гарантия · 100% стабильный детерминированный расчет"}
      metaRight="07/15"
    >
      <div className="flex flex-col h-full justify-between space-y-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2775f6]/10 text-[#2775f6] text-xs font-black uppercase tracking-wider mb-2">
            <IconBrain size={14} /> {isKk ? "120 Автоматтандырылған тесттен өткен сенімділік" : "Протестировано на 120 авто-тестах"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
            {isKk ? "Deterministic Risk Engine: " : "Deterministic Risk Engine: "}
            <span className="text-[#2775f6] block sm:inline">
              {isKk ? "Неге AI галлюцинация жасамайды?" : "Защита от галлюцинаций"}
            </span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#121620]/75 max-w-2xl font-semibold">
            {isKk
              ? "Көптеген AI стартаптар субъективті балдармен қателеседі. QORGAN-да жасанды интеллект балл ойлап таппайды — балл қатаң формуламен есептеледі."
              : "AI не выдумывает оценку из воздуха. AlemAI распознает факты, а расчет ведет математический движок."}
          </p>
        </div>

        {/* Formula Banner */}
        <div className="rounded-[20px] bg-white p-3.5 sm:p-4 border-2 border-[#2775f6]/30 shadow-sm flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-[#2775f6] text-white font-mono text-xs font-black">
              ФОРМУЛА
            </span>
            <span className="font-mono text-sm sm:text-base font-black text-[#121620]">
              Risk Score = min(100, &sum; Сигналдар Салмағы)
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-[#2775f6] bg-[#2775f6]/10 px-3 py-1 rounded-full">
            AI = Таксономия, Мотор = Математика
          </span>
        </div>

        {/* 5 Signal Weights */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 font-mono text-xs">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-red-950">
            <div className="text-xl font-black text-red-700">+60 БАЛЛ</div>
            <div className="font-bold mt-1 text-[11px]">{isKk ? "Зиянды URL" : "Вредоносный URL"}</div>
            <div className="text-[10px] text-red-800/80 mt-0.5">Threat Intel / Клон</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3 text-orange-950">
            <div className="text-xl font-black text-orange-700">+40 БАЛЛ</div>
            <div className="font-bold mt-1 text-[11px]">{isKk ? "Карта дерегі" : "Данные карты"}</div>
            <div className="text-[10px] text-orange-800/80 mt-0.5">PAN 16 сан, CVV</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-amber-950">
            <div className="text-xl font-black text-amber-700">+30 БАЛЛ</div>
            <div className="font-bold mt-1 text-[11px]">{isKk ? "OTP / SMS коды" : "Код из SMS"}</div>
            <div className="text-[10px] text-amber-800/80 mt-0.5">Бірреттік кодты сұрау</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-blue-950">
            <div className="text-xl font-black text-blue-700">+25 БАЛЛ</div>
            <div className="font-bold mt-1 text-[11px]">{isKk ? "Бренд көшірмесі" : "Клон бренда"}</div>
            <div className="text-[10px] text-blue-800/80 mt-0.5">Kaspi, eGov, Halyk</div>
          </div>
          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-3 text-slate-900 col-span-2 sm:col-span-1">
            <div className="text-xl font-black text-slate-700">+10 БАЛЛ</div>
            <div className="font-bold mt-1 text-[11px]">{isKk ? "Асықтыру / Қорқыту" : "Спешка / Давление"}</div>
            <div className="text-[10px] text-slate-600 mt-0.5">«Шұғыл бұғатталады»</div>
          </div>
        </div>

        {/* 4 Severity Thresholds */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 border-l-4 border-l-emerald-500">
            <div className="font-mono font-black text-emerald-700 text-[11px]">0–29: ҚАУІПСІЗ</div>
            <div className="text-[11px] text-slate-600 mt-0.5">Анықталған қауіп жоқ</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 border-l-4 border-l-amber-500">
            <div className="font-mono font-black text-amber-700 text-[11px]">30–59: ОРТАША</div>
            <div className="text-[11px] text-slate-600 mt-0.5">Күдікті белгілер бар</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 border-l-4 border-l-orange-500">
            <div className="font-mono font-black text-orange-700 text-[11px]">60–74: ЖОҒАРЫ</div>
            <div className="text-[11px] text-slate-600 mt-0.5">Алаяқтық сипат, сақ болыңыз</div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#121620] text-white border border-red-500/40 border-l-4 border-l-red-500">
            <div className="font-mono font-black text-red-400 text-[11px]">75–100: CRITICAL</div>
            <div className="text-[11px] text-slate-300 mt-0.5">Тікелей шабуыл, бұғаттаңыз!</div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 08: GOLDEN 15 MINUTES & LEGAL NAVIGATOR (08/15)
// -------------------------------------------------------------
export function Slide08LegalNavigator({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "ҚР Ұлттық Банкі, «Төлемдер туралы» Заң және ҚК 190" : "Нацбанк РК, Закон «О платежах» и ст. 190 УК"}
      metaRight="08/15"
    >
      <div className="flex flex-col h-full justify-between space-y-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2775f6]/10 text-[#2775f6] text-xs font-black uppercase tracking-wider mb-2">
            <IconScale size={14} /> {isKk ? "Шұғыл құқықтық көмек" : "Экстренная правовая помощь"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
            {isKk ? "«Алтын 15 минут» және Құқықтық Навигатор" : "«Золотые 15 минут» и Правовой Навигатор"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#121620]/75 max-w-2xl font-semibold">
            {isKk
              ? "Егер азамат алданып ақша аударса — әр минут санаулы. Жүйе қаражатты бұғаттау мен полицияға жүгінуді лезде автоматтандырады."
              : "Если деньги переведены мошенникам — дорога каждая минута. Сервис дает точный план блокировки и готовое заявление в полицию."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 flex-1 items-stretch">
          {/* Card 1: 15-Min Freeze */}
          <div className="rounded-[26px] bg-[#2775f6] text-white p-5 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-white/20 text-[11px] font-black uppercase">
                  1-кезең: Банк
                </span>
                <span className="text-2xl font-black">15 мин</span>
              </div>
              <h3 className="mt-3 text-lg font-black leading-snug">
                Транзакцияны жедел бұғаттау
              </h3>
              <p className="mt-2 text-xs text-white/90 leading-relaxed font-semibold">
                Ұлттық Банктің антифрод ережелері мен «Төлемдер туралы» Заңы бойынша алғашқы 15 минутта транзакцияны тоқтату мүмкіндігі ең жоғары.
              </p>
              <div className="mt-3 p-2.5 rounded-xl bg-white/15 text-xs font-semibold">
                ✓ Банк колл-орталығының нөмірлері мен шұғыл сөздік скрипті
              </div>
            </div>
            <div className="pt-3 border-t border-white/20 text-[11px] text-white/80 font-bold">
              Қаржыны құтқарудың соңғы терезесі
            </div>
          </div>

          {/* Card 2: eOtinish Police Claim */}
          <div className="rounded-[26px] bg-[#121620] text-white p-5 flex flex-col justify-between shadow-lg border border-white/10">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-[#38bdf8] text-[11px] font-black uppercase">
                  2-кезең: Полиция
                </span>
                <span className="font-mono text-xs font-black text-[#38bdf8]">ҚР ҚК 190</span>
              </div>
              <h3 className="mt-3 text-lg font-black leading-snug">
                eOtinish / CyberPol арыз генераторы
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed font-semibold">
                Азаматқа заңгер жалдаудың қажеті жоқ. QORGAN оқиғаның уақыты, сомасы, реквизиттері жазылған дайын құқықтық арыз жасайды.
              </p>
              <div className="mt-3 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-[#38bdf8]">
                ✓ eOtinish арқылы 1 кликпен ресми тіркеу
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 font-bold">
              Ресми тергеу ісін ашуға толық негіз
            </div>
          </div>

          {/* Card 3: Evidence Vault */}
          <div className="rounded-[26px] bg-white p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-black uppercase">
                  3-кезең: Дәлелдер
                </span>
                <span className="text-xl">🔒</span>
              </div>
              <h3 className="mt-3 text-lg font-black text-[#121620] leading-snug">
                Дәлелдер сейфі (Evidence Vault)
              </h3>
              <p className="mt-2 text-xs text-[#121620]/75 leading-relaxed font-semibold">
                Алаяқтар чатты өшіріп үлгермей тұрып, сайт скриншоты, домен жазбалары және төлем түбіртектері уақыт белгісімен сақталады.
              </p>
              <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold">
                ✓ Сотта бұлтартпас айғақ ретінде жарамды
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] text-[#2775f6] font-bold">
              Азаматтың қалтасындағы цифрлық адвокаты
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 09: LIVE PRODUCT DEMO (09/15)
// -------------------------------------------------------------
export function Slide09Demo({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Нақты инцидентті 1 минутта анықтау және шешу" : "Реальный сценарий проверки за 1 минуту"}
      metaRight="09/15"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full items-center">
        {/* Left: Scan Breakdown */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2775f6]/10 text-[#2775f6] text-xs font-black uppercase tracking-wider mb-2">
              <IconCrosshair size={14} /> {isKk ? "QORGAN Lens іс жүзінде" : "Демонстрация QORGAN Lens"}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
              {isKk ? "Тікелей өнім демосы: 100/100 Қатер" : "Демонстрация: 100/100 Угроза"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#121620]/75 font-semibold">
              {isKk
                ? "Қолданушыға «Kaspi картаңыз бұғатталды, fake-kaspi-security.kz сайтына өтіңіз» деген SMS келді. Жүйенің лездік әрекеті:"
                : "Пользователь загружает подозрительное SMS под видом Kaspi. Система мгновенно классифицирует угрозу."}
            </p>
          </div>

          {/* 3 Finding Cards */}
          <div className="space-y-2">
            <div className="rounded-[18px] bg-white p-3 border border-[#121620]/10 flex items-start gap-3 shadow-sm">
              <div className="w-7 h-7 rounded-xl bg-[#ec5562]/15 text-[#ec5562] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                ⚠️
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-[#121620]">
                  {isKk ? "Жалған домен клон" : "Клон домена"}
                </h4>
                <p className="text-[11px] text-[#121620]/70 mt-0.5 font-semibold">
                  {isKk ? "fake-kaspi-security.kz домені ресми Kaspi.kz сервисіне еш қатысы жоқ." : "Домен зарегистрирован недавно и маскируется под банк."}
                </p>
              </div>
            </div>

            <div className="rounded-[18px] bg-white p-3 border border-[#121620]/10 flex items-start gap-3 shadow-sm">
              <div className="w-7 h-7 rounded-xl bg-[#e7a52e]/15 text-[#e7a52e] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                ⏳
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-[#121620]">
                  {isKk ? "Шұғылдық қысымы & OTP талабы" : "Спешка и запрос OTP"}
                </h4>
                <p className="text-[11px] text-[#121620]/70 mt-0.5 font-semibold">
                  {isKk ? "AlemAI карта мәліметтерін және SMS кодты ұрлау айласын таныды." : "AlemAI определил попытку хищения SMS-кода под давлением срочности."}
                </p>
              </div>
            </div>

            <div className="rounded-[18px] bg-[#2775f6] text-white p-3 flex items-start gap-3 shadow-md">
              <div className="w-7 h-7 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                ⚖️
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-white">
                  {isKk ? "8 Қадамдық қазақша нұсқаулық" : "8 Шагов действий"}
                </h4>
                <p className="text-[11px] text-white/90 mt-0.5 font-semibold">
                  {isKk ? "1. Кодты енгізбеу. 2. Kaspi сессиясын жабу. 3. Картаны бұғаттау. 4. eOtinish арызы." : "1. Не вводить код. 2. Закрыть сессии в банке. 3. Заблокировать карту."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: UI Result Mockup */}
        <div className="lg:col-span-6 h-full flex flex-col justify-center">
          <div className="rounded-[28px] bg-[#121620] text-white p-5 sm:p-6 border border-white/10 shadow-2xl flex flex-col justify-between h-full max-h-[460px]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ec5562]" />
                <span className="text-xs font-mono font-bold text-white/80">{isKk ? "ҚАУІПСІЗДІК ЕСЕБІ" : "ОТЧЕТ БЕЗОПАСНОСТИ"}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#ec5562] text-white text-xs font-black">
                CRITICAL · 100/100
              </span>
            </div>

            <div className="my-auto space-y-2.5 py-2 font-semibold">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-mono text-[#38bdf8] font-bold">{isKk ? "ТАЛДАУ НЫСАНЫ:" : "ИСТОЧНИК:"}</div>
                <div className="text-xs font-mono text-white mt-1 break-all">
                  hxxps://fake-kaspi-security.kz
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-mono text-slate-400 font-bold">{isKk ? "ALEMAI ШЕШІМІ:" : "ВЫВОД ALEMAI:"}</div>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                  {isKk
                    ? "«Kaspi банкінің атын жамылған қауіпті фишингтік шабуыл. Сіздің картаңыздың толық деректері мен SMS-кодты ұрлауға бағытталған.»"
                    : "«Фишинговая атака под бренд Kaspi. Попытка компрометации полных реквизитов карты и одноразового SMS-кода.»"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-base font-black text-[#ec5562]">100 / 100</div>
                  <div className="text-[10px] text-slate-400">Risk Score (Детерминистік)</div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-base font-black text-emerald-400">Қазақ тілінде</div>
                  <div className="text-[10px] text-slate-400">Толық түсіндірме</div>
                </div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-white/60 font-bold">
              <span>{isKk ? "Шынайы тікелей тестілеу нәтижесі" : "Результат реального сканирования"}</span>
              <span className="text-[#38bdf8] font-black">QORGAN KZ</span>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 10: COMPETITIVE ADVANTAGE / DIFFERENTIATION (10/15)
// -------------------------------------------------------------
export function Slide10Differentiation({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Бәсекелестерден айырмашылық және қорғаныс кешені" : "Конкурентное преимущество и барьеры входа"}
      metaRight="10/15"
    >
      <div className="flex flex-col h-full justify-between space-y-3.5">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
            {isKk ? "Неге шетелдік жүйелер қауқарсыз?" : "Почему другие системы бессильны?"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#121620]/75 max-w-2xl font-semibold">
            {isKk
              ? "IT нарығы күрделі инженерлік сервистерге толы, алайда олардың ешқайсысы қарапайым қазақстандықты әлеуметтік инженериядан қорғамайды."
              : "Рынок переполнен утилитами, но ни одна из них не защищает обычного гражданина от социальной инженерии в правовом поле РК."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 items-stretch">
          {/* Column 1: Antivirus */}
          <div className="rounded-[26px] bg-white p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-wider">
                {isKk ? "Дәстүрлі антивирустар" : "Антивирусы (Kaspersky)"}
              </span>
              <h4 className="mt-3 text-lg font-black text-[#121620]">
                {isKk ? "Тек файлдарды тексереді" : "Защита файлов, а не людей"}
              </h4>
              <ul className="mt-2 space-y-2 text-xs text-[#121620]/75 font-semibold">
                <li className="flex items-start gap-2">
                  <span className="text-[#ec5562] font-black">✕</span> {isKk ? "Мессенджердегі және SMS фишингті елемейді" : "Игнорируют фишинг в мессенджерах"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ec5562] font-black">✕</span> {isKk ? "Қазақстанның құқықтық ерекшелігін білмейді" : "Ноль правовой помощи в РК"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ec5562] font-black">✕</span> {isKk ? "Қазақ тілінде мүлдем сөйлемейді" : "Нет казахского языка"}
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 font-bold">
              {isKk ? "2010 жылдардың ескірген парадигмасы" : "Устаревшая парадигма 2010-х"}
            </div>
          </div>

          {/* Column 2: Tech Checkers */}
          <div className="rounded-[26px] bg-[#dbe2ec] p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/70 text-[#121620]/70 text-xs font-black uppercase tracking-wider">
                {isKk ? "Шетелдік AI / Чекерлер" : "Чекеры (VirusTotal, ChatGPT)"}
              </span>
              <h4 className="mt-3 text-lg font-black text-[#121620]">
                {isKk ? "Түсініксіз код пен шу" : "Непонятный технический шум"}
              </h4>
              <ul className="mt-2 space-y-2 text-xs text-[#121620]/75 font-semibold">
                <li className="flex items-start gap-2">
                  <span className="text-[#ec5562] font-black">✕</span> {isKk ? "99% адам JSON есептерін түсінбейді" : "99% граждан не поймут JSON-лог"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ec5562] font-black">✕</span> {isKk ? "Kaspi мен eGov бренд клондарын танымайды" : "Не знают клонов Kaspi и eGov"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ec5562] font-black">✕</span> {isKk ? "Зардап шеккен соң ҚР заңымен арыз жасамайды" : "Не дают готовых заявлений в полицию"}
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-[#121620]/10 text-xs text-[#121620]/50 font-bold">
              {isKk ? "Жергілікті контекст мүлдем жоқ" : "Нет локального контекста"}
            </div>
          </div>

          {/* Column 3: QORGAN */}
          <div className="rounded-[26px] bg-[#2775f6] text-white p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
                  QORGAN Defense OS
                </span>
                <StarburstBadge size={22} className="text-white" />
              </div>
              <h4 className="mt-3 text-lg font-black text-white">
                {isKk ? "Әрбір қазақстандыққа арналған қалқан" : "Щит для каждого гражданина РК"}
              </h4>
              <ul className="mt-2 space-y-2 text-xs text-white/95 font-semibold">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-300 font-black">✓</span> <strong>ҚР-ға 100% бейімделген:</strong> Kaspi, Halyk, eGov
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-300 font-black">✓</span> <strong>Отандық AlemAI:</strong> қазақша/орысша психологиялық талдау
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-300 font-black">✓</span> <strong>Құқықтық навигатор:</strong> ҚК 190 және ӘҚБтК 127-2 арызы
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-300 font-black">✓</span> <strong>Junior Режимі:</strong> балалар мен мектептерге арналған
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-white/20 text-xs text-white/80 font-bold">
              {isKk ? "Толық циклді ұлттық қауіпсіздік шешімі" : "Национальное решение полного цикла"}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 11: MARKET SIZE (11/15)
// -------------------------------------------------------------
export function Slide11Market({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Нарықтық әлеует және пайдаланушылар сұранысы" : "Масштаб рынка и потенциал проникновения"}
      metaRight="11/15"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-center">
        {/* Left: Summary */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121620]/10 text-[#121620] text-xs font-black uppercase tracking-wider mb-2">
              <IconUsers size={14} /> {isKk ? "Нарықтық ауқым" : "Масштаб рынка"}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
              {isKk ? "Үлкен сұранысқа ие нарық" : "Рынок с высоким спросом"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#121620]/75 font-semibold">
              {isKk
                ? "Қазақстан — халықтың 90%-дан астамы мобильді банкинг пен мемлекеттік қызметтерді қолданатын цифрлық мемлекет. Қауіпсіздікке деген мұқтаждық өте жоғары."
                : "Казахстан — страна с проникновением мобильного банкинга свыше 90%. Потребность в защите остра как никогда."}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-[22px] bg-white p-3.5 border border-[#121620]/10 shadow-sm">
              <span className="text-[11px] font-extrabold uppercase text-[#121620]/60">B2C Нарық</span>
              <div className="text-2xl sm:text-3xl font-black text-[#2775f6] mt-1">20M+</div>
              <span className="text-[11px] text-[#121620]/70 font-bold">ҚР азаматтары</span>
            </div>
            <div className="rounded-[22px] bg-white p-3.5 border border-[#121620]/10 shadow-sm">
              <span className="text-[11px] font-extrabold uppercase text-[#121620]/60">Финтех</span>
              <div className="text-2xl sm:text-3xl font-black text-[#121620] mt-1">12M</div>
              <span className="text-[11px] text-[#121620]/70 font-bold">Белсенді карталар</span>
            </div>
            <div className="rounded-[22px] bg-white p-3.5 border border-[#121620]/10 shadow-sm">
              <span className="text-[11px] font-extrabold uppercase text-[#121620]/60">Оқушылар</span>
              <div className="text-2xl sm:text-3xl font-black text-[#ec5562] mt-1">3.8M</div>
              <span className="text-[11px] text-[#121620]/70 font-bold">Мектеп жасында</span>
            </div>
          </div>
        </div>

        {/* Right: TAM / SAM / SOM */}
        <div className="lg:col-span-6 h-full flex flex-col justify-center">
          <div className="rounded-[30px] bg-[#121620] text-white p-6 sm:p-7 border border-white/10 shadow-2xl flex flex-col justify-between h-full space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider font-black">
                TAM · SAM · SOM МАТРИЦАСЫ
              </span>
              <StarburstBadge size={26} className="text-[#38bdf8]" />
            </div>

            <div className="space-y-3 my-auto">
              <div className="border-l-4 border-[#2775f6] pl-3 py-0.5">
                <div className="text-[11px] font-mono text-slate-400">TAM (ЖАЛПЫ СЫЙЫМДЫЛЫҚ)</div>
                <div className="text-lg font-black text-white">$45 000 000+ / жыл</div>
                <div className="text-xs text-slate-300">Қазақстан мен Орталық Азиядағы B2C және EdTech/FinTech SecOps нарығы</div>
              </div>

              <div className="border-l-4 border-[#38bdf8] pl-3 py-0.5">
                <div className="text-[11px] font-mono text-slate-400">SAM (ҚОЛЖЕТІМДІ НАРЫҚ)</div>
                <div className="text-lg font-black text-[#38bdf8]">$12 000 000 / жыл</div>
                <div className="text-xs text-slate-300">12 млн мобильді банкинг қолданушылары және 7 500+ мектептер</div>
              </div>

              <div className="border-l-4 border-emerald-500 pl-3 py-0.5">
                <div className="text-[11px] font-mono text-slate-400">SOM (2026–2027 МАҚСАТ)</div>
                <div className="text-lg font-black text-emerald-400">$1 200 000 / жыл</div>
                <div className="text-xs text-slate-300">500 000 белсенді B2C жазылушы және 150+ білім беру / қаржы мекемелері</div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-xs text-slate-400 font-bold">
              Өсім көзі: Мемлекеттік талаптар және қаржылық сауаттылық бағдарламалары
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 12: BUSINESS MODEL (12/15)
// -------------------------------------------------------------
export function Slide08BusinessModel({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Тұрақты табыс моделі: B2C Freemium, B2B және GovTech" : "Модель устойчивой монетизации: B2C Freemium, B2B и GovTech"}
      metaRight="12/15"
    >
      <div className="flex flex-col h-full justify-between space-y-3.5">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
            {isKk ? "Бизнес-модель және Монетизация" : "Бизнес-модель и монетизация"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#121620]/75 max-w-2xl font-semibold">
            {isKk
              ? "Әлеуметтік қолжетімділік пен коммерциялық табыстың үйлесімі."
              : "Сочетание социальной миссии (доступность для всех) и высокой маржинальности B2B."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 items-stretch">
          {/* Freemium */}
          <div className="rounded-[26px] bg-white p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-wider">
                B2C ТЕГІН ҚАБАТ
              </span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-[#121620]">0 ₸</span>
                <span className="text-xs text-slate-500 font-bold">/ мәңгілік</span>
              </div>
              <h4 className="mt-2 text-base sm:text-lg font-black text-[#121620]">Әлеуметтік қорғаныс</h4>
              <ul className="mt-2 space-y-1.5 text-xs text-[#121620]/75 font-semibold">
                <li>✓ Күдікті сілтемелер мен SMS-ті сканерлеу</li>
                <li>✓ Тәулігіне 3 тексеру лимиті</li>
                <li>✓ Негізгі құқықтық кеңестер</li>
                <li>✓ Халықты жаппай тарту драйвері</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 font-bold">
              Пайдаланушы базасын тез өсіру (Viral Loop)
            </div>
          </div>

          {/* PRO */}
          <div className="rounded-[26px] bg-[#2775f6] text-white p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
                  B2C PREMIUM
                </span>
                <StarburstBadge size={22} className="text-white" />
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-white">990 ₸</span>
                <span className="text-xs text-white/80 font-bold">/ айына</span>
              </div>
              <h4 className="mt-2 text-base sm:text-lg font-black text-white">QORGAN PRO (Отбасылық)</h4>
              <ul className="mt-2 space-y-1.5 text-xs text-white/95 font-semibold">
                <li>✓ Шектеусіз мультимодальды сканерлеу</li>
                <li>✓ CyberPol eOtinish PDF арызын генерациялау</li>
                <li>✓ Отбасылық 5 құрылғыны бақылау (Junior Safe)</li>
                <li>✓ Darknet-те жеке деректерді мониторингтеу</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-white/20 text-xs text-white/85 font-bold">
              Бір шыны кофе құнына 100% қорғаныс
            </div>
          </div>

          {/* B2B */}
          <div className="rounded-[26px] bg-[#121620] text-white p-5 flex flex-col justify-between shadow-lg border border-white/10">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#38bdf8] text-xs font-black uppercase tracking-wider">
                B2B & GOVTECH
              </span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-[#38bdf8]">SaaS / API</span>
              </div>
              <h4 className="mt-2 text-base sm:text-lg font-black text-white">Мектептер мен Банктер</h4>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-300 font-semibold">
                <li>✓ <strong>Мектептер:</strong> буллинг радары (ӘҚБтК 127-2)</li>
                <li>✓ <strong>Банктер:</strong> фишингке қарсы API шлюзі</li>
                <li>✓ <strong>Корпорациялар:</strong> қызметкерлерді оқыту (XP)</li>
                <li>✓ Жоғары LTV және мемлекеттік гранттар</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-white/10 text-xs text-[#38bdf8] font-bold">
              Жоғары маржиналды B2B лицензиялар
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 13: 2026 ROADMAP (13/15)
// -------------------------------------------------------------
export function Slide09Roadmap({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "2026 жылға арналған нақты даму жоспары" : "Дорожная карта развития на 2026 год"}
      metaRight="13/15"
    >
      <div className="flex flex-col h-full justify-between space-y-3.5">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
            {isKk ? "2026 Жол картасы: Тұжырымдамадан Ұлттық қалқанға" : "Дорожная карта 2026"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#121620]/75 max-w-2xl font-semibold">
            {isKk
              ? "Бүгінгі жұмыс істеп тұрған жүйеден жыл соңында мемлекеттік интеграцияларға дейін."
              : "От работающего сегодня MVP к национальной интеграции до конца года."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 flex-1 items-stretch font-semibold">
          {/* Q1 */}
          <div className="rounded-[26px] bg-[#2775f6] text-white p-5 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-white/20 text-[11px] font-black uppercase tracking-wider">
                  Q1 2026 · {isKk ? "ҚАЗІР" : "СЕЙЧАС"}
                </span>
                <IconCheck size={18} stroke={3} className="text-white" />
              </div>
              <h4 className="mt-4 text-xl font-black text-white">{isKk ? "Жұмыс істейтін MVP" : "Рабочий MVP"}</h4>
              <ul className="mt-3 space-y-1.5 text-xs text-white/90">
                <li>• QORGAN Lens (URL, QR, скрин)</li>
                <li>• AlemAI (Qwen 3 8B) сараптамасы</li>
                <li>• Deterministic Risk Engine (120 тест)</li>
                <li>• ҚР ҚК 190 бабы арыз үлгісі</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-white/20 text-[11px] font-mono text-white/85">
              {isKk ? "Статус: 100% Жұмыс істеп тұр" : "Статус: 100% Работает"}
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
                <li>• Safari және Chrome кеңейтімдері</li>
                <li>• Telegram/WhatsApp тексеру боты</li>
                <li>• 100 000 белсенді қолданушы</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-[#2775f6] font-bold">
              {isKk ? "Қолжетімділікті кеңейту" : "Расширение доступности"}
            </div>
          </div>

          {/* Q3 */}
          <div className="rounded-[26px] bg-[#dbe2ec] p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-white/70 text-[#121620]/70 text-[11px] font-black uppercase tracking-wider">
                  Q3 2026
                </span>
                <IconBuildingStore size={18} className="text-[#2775f6]" />
              </div>
              <h4 className="mt-4 text-xl font-black text-[#121620]">{isKk ? "B2B EdTech Пилот" : "B2B EdTech Пилот"}</h4>
              <ul className="mt-3 space-y-1.5 text-xs text-[#121620]/75">
                <li>• Астана мен Алматы мектептерінде пилот</li>
                <li>• Буллингке қарсы анонимді радар</li>
                <li>• «111» сенім желісімен байланыс</li>
                <li>• 50+ білім беру ұйымын қосу</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-[#121620]/10 text-[11px] font-mono text-[#2775f6] font-bold">
              {isKk ? "Әлеуметтік әсерді масштабтау" : "Масштабирование эффекта"}
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
              <h4 className="mt-4 text-xl font-black text-white">{isKk ? "Ұлттық Интеграция" : "Нац. Интеграция"}</h4>
              <ul className="mt-3 space-y-1.5 text-xs text-white/75">
                <li>• Ұлттық Банк Антифрод шлюзімен API</li>
                <li>• CyberPol eOtinish тікелей интеграциясы</li>
                <li>• Орталық Азия (Өзбекстан) нарығына шығу</li>
                <li>• 500 000+ пайдаланушы мен тұрақты пайда</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-[#38bdf8] font-bold">
              {isKk ? "Ұлттық стандартқа айналу" : "Национальный стандарт"}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 14: DATA PRIVACY & SOVEREIGNTY (14/15)
// -------------------------------------------------------------
export function Slide14DataPrivacy({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Privacy-by-Design қағидаты және Деректер суверенитеті" : "Принцип Privacy-by-Design и Суверенитет данных"}
      metaRight="14/15"
    >
      <div className="flex flex-col h-full justify-between space-y-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
            <IconShieldCheck size={14} /> {isKk ? "Сенім және Деректер Егемендігі" : "Доверие и Суверенитет данных"}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#121620] tracking-tight uppercase leading-[1.04]">
            {isKk ? "Деректер қауіпсіздігі және Құпиялылық" : "Безопасность данных и приватность"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#121620]/75 max-w-2xl font-semibold">
            {isKk
              ? "Қауіпсіздік өнімінің өзі 100% қауіпсіз болуы тиіс. Біз қолданушының құпиясын ең жоғары стандартпен қорғаймыз."
              : "Продукт безопасности сам должен быть на 100% безопасным. Данные обрабатываются внутри контура РК."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 flex-1 items-stretch">
          {/* Pillar 1 */}
          <div className="rounded-[26px] bg-white p-4 sm:p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-3xl mb-2">🛡️</div>
              <h4 className="text-base sm:text-lg font-black text-[#121620]">Автоматты маскалау</h4>
              <p className="mt-2 text-xs text-[#121620]/75 leading-relaxed font-semibold">
                Банк картасы нөмірлері (PAN 16 сан), CVV кодтар мен құпия сөздер клиентте автоматты бүркемеленеді.
              </p>
            </div>
            <div className="pt-2.5 border-t border-slate-100 text-[11px] font-mono text-emerald-700 font-bold">
              Серверге ашық түрде өтпейді
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-[26px] bg-[#2775f6] text-white p-4 sm:p-5 flex flex-col justify-between shadow-md">
            <div>
              <div className="text-3xl mb-2">⛓️</div>
              <h4 className="text-base sm:text-lg font-black text-white">URL Оқшаулау</h4>
              <p className="mt-2 text-xs text-white/90 leading-relaxed font-semibold">
                Күдікті сілтемелер дефангингтеледі (hxxp://...). Азаматтың байқаусызда басып кету қаупі 0%.
              </p>
            </div>
            <div className="pt-2.5 border-t border-white/20 text-[11px] font-mono text-white/90 font-bold">
              Қауіпсіз Sandbox дефангинг
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-[26px] bg-[#121620] text-white p-4 sm:p-5 flex flex-col justify-between shadow-lg border border-white/10">
            <div>
              <div className="text-3xl mb-2">🇰🇿</div>
              <h4 className="text-base sm:text-lg font-black text-white">Ұлттық серверлер</h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed font-semibold">
                ҚР Заңына сәйкес, деректер базасы мен AlemAI инфрақұрылымы тек Қазақстан аумағында орналасқан.
              </p>
            </div>
            <div className="pt-2.5 border-t border-white/10 text-[11px] font-mono text-[#38bdf8] font-bold">
              Деректер шетелге жіберілмейді
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="rounded-[26px] bg-[#dbe2ec] p-4 sm:p-5 border border-[#121620]/10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-3xl mb-2">⚖️</div>
              <h4 className="text-base sm:text-lg font-black text-[#121620]">Ашық этика</h4>
              <p className="mt-2 text-xs text-[#121620]/75 leading-relaxed font-semibold">
                AI шешімдері жабық емес. Әрбір нәтижеге негіз болған сигналдар мен баптар ашық көрсетіледі.
              </p>
            </div>
            <div className="pt-2.5 border-t border-[#121620]/10 text-[11px] font-mono text-[#2775f6] font-bold">
              100% Түсіндірмелі AI (Explainable)
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE 15: CONCLUSION & JURY ACCESS (15/15)
// -------------------------------------------------------------
export function Slide15Final({ lang = 'kk' }: { lang?: PitchLang }) {
  const isKk = lang === 'kk';
  return (
    <SlideFrame
      metaLeft={isKk ? "Қазақстанның қауіпсіз цифрлық болашағы" : "Будущее безопасного интернета Казахстана"}
      metaRight="15/15"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full items-center">
        {/* Left: Final Clean Vision */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-3.5">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#121620]/15 bg-white/60 text-[#121620] text-xs font-black uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {isKk ? "QORGAN — Қазақстанның Цифрлық Қалқаны" : "QORGAN — Цифровой Щит Казахстана"}
            </div>

            <h2 className="text-3xl sm:text-5xl xl:text-6xl font-black text-[#121620] tracking-tight uppercase leading-[1.02]">
              {isKk ? "Қауіпсіз Қазақстан" : "Безопасный Казахстан"}
              <span className="text-[#2775f6] block">{isKk ? "QORGAN-нан басталады." : "начинается с QORGAN."}</span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-[#121620]/80 max-w-xl leading-relaxed font-semibold">
              {isKk
                ? "Біз жай ғана тұжырымдама емеспіз — отандық AlemAI моделі, қатаң математикалық скорингі және құқықтық навигаторы жұмыс істеп тұрған дайын ұлттық жүйені ұсынамыз."
                : "Перед вами полноценно готовый национальный продукт с реальной моделью AlemAI, правовой защитой и детерминированным расчетом рисков."}
            </p>
          </div>

          {/* 3 Core Pillars Summary */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 rounded-2xl bg-white border border-[#121620]/10 shadow-sm">
              <div className="text-xs font-black text-[#2775f6]">01 / ТЕХНОЛОГИЯ</div>
              <div className="text-[11px] text-[#121620]/75 font-bold mt-0.5">AlemAI + 0% Галлюцинация</div>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#121620]/10 shadow-sm">
              <div className="text-xs font-black text-[#2775f6]">02 / ҚҰҚЫҚ</div>
              <div className="text-[11px] text-[#121620]/75 font-bold mt-0.5">ҚК 190 & ӘҚБтК 127-2</div>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#121620]/10 shadow-sm">
              <div className="text-xs font-black text-[#2775f6]">03 / АУДИТОРИЯ</div>
              <div className="text-[11px] text-[#121620]/75 font-bold mt-0.5">Junior & Standard (20M+)</div>
            </div>
          </div>

          {/* Project Contacts Badge */}
          <div className="p-3.5 rounded-2xl bg-[#ebeae5] border border-[#121620]/15 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-[#121620]">
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
          <div className="rounded-[30px] bg-[#121620] text-white p-5 sm:p-6 border border-white/10 shadow-2xl flex flex-col justify-between h-full space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider font-black">
                {isKk ? "ЖЮРИ ҮШІН ДЕМО-АККАУНТТАР" : "ДЕМО-ДОСТУП ДЛЯ ЖЮРИ"}
              </span>
              <StarburstBadge size={26} className="text-[#38bdf8]" glow />
            </div>

            <div className="space-y-2 text-xs font-semibold my-auto">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-black text-white">{isKk ? "Standard пайдаланушы (16+)" : "Standard пользователь (16+)"}</div>
                  <div className="text-[11px] text-slate-400 font-mono">standard@qorgan.kz · password</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-white/15 text-slate-200 text-[10px] font-black">STD</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-black text-white">{isKk ? "Junior пайдаланушы (13–15 жас)" : "Junior пользователь (13–15 лет)"}</div>
                  <div className="text-[11px] text-slate-400 font-mono">junior@qorgan.kz · password</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#2775f6]/30 text-[#38bdf8] text-[10px] font-black">JUN</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-black text-white">{isKk ? "Мектеп менеджері (B2B Workspace)" : "Менеджер школы (B2B Workspace)"}</div>
                  <div className="text-[11px] text-slate-400 font-mono">manager@qorgan.kz · password</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-black">ORG</span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-bold">
              <span>Fullstack MVP: Next.js + AlemAI</span>
              <span className="font-mono text-white font-black">QORGAN KZ · 2026</span>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// -------------------------------------------------------------
// SLIDE REGISTRY (15 SLIDES)
// -------------------------------------------------------------
export const PITCH_SLIDES = [
  { id: 1, titleKk: 'Титулдық слайд', titleRu: 'Титульный слайд', subKk: 'QORGAN цифрлық қалқаны', subRu: 'Цифровой щит РК', component: Slide01Hero },
  { id: 2, titleKk: '60 млрд ₸ шығын және фишинг', titleRu: 'Ущерб 60 млрд ₸ и фишинг', subKk: 'Интернет-алаяқтық дағдарысы', subRu: 'Кризис мошенничества', component: Slide02Problem },
  { id: 3, titleKk: 'Кибербуллинг және балалар', titleRu: 'Кибербуллинг и подростки', subKk: 'ӘҚБтК 127-2 · ЮНИСЕФ', subRu: 'ст. 127-2 КоАП · ЮНИСЕФ', component: Slide03Cyberbullying },
  { id: 4, titleKk: 'QORGAN экожүйесі', titleRu: 'Экосистема QORGAN', subKk: '4 қорғаныс бағаны', subRu: '4 столпа защиты', component: Slide04Solution },
  { id: 5, titleKk: 'QORGAN Lens сканері', titleRu: 'Мультимодальный Lens', subKk: 'Скриншот, URL, SMS, QR', subRu: 'Скриншот, URL, SMS, QR', component: Slide05MultimodalLens },
  { id: 6, titleKk: '5 Сатылы AI-Құбыр', titleRu: '5 стадий AI-контура', subKk: 'AlemAI (Qwen 3 8B)', subRu: 'AlemAI (Qwen 3 8B)', component: Slide06TechPipeline },
  { id: 7, titleKk: 'Deterministic Risk Engine', titleRu: 'Deterministic Risk Engine', subKk: 'Галлюцинациясыз скоринг', subRu: 'Скоринг без галлюцинаций', component: Slide07RiskEngine },
  { id: 8, titleKk: '«Алтын 15 минут» & Құқық', titleRu: '«Золотые 15 минут» & Право', subKk: 'ҚР ҚК 190 · eOtinish арызы', subRu: 'ст. 190 УК · Заявление в CyberPol', component: Slide08LegalNavigator },
  { id: 9, titleKk: 'Тікелей өнім демосы', titleRu: 'Live Demo Lens', subKk: '100/100 Қатерлі инцидент', subRu: '100/100 Критический инцидент', component: Slide09Demo },
  { id: 10, titleKk: 'Бәсекелестік басымдық', titleRu: 'Дифференциация', subKk: 'Неге шетелдіктер қауқарсыз?', subRu: 'Почему другие бессильны?', component: Slide10Differentiation },
  { id: 11, titleKk: 'Нарық көлемі (TAM/SAM)', titleRu: 'Объем рынка (TAM/SAM)', subKk: '20M халық · $45M нарық', subRu: '20M граждан · $45M рынок', component: Slide11Market },
  { id: 12, titleKk: 'Бизнес-модель', titleRu: 'Бизнес-модель', subKk: 'Freemium, PRO 990 ₸, B2B', subRu: 'Freemium, PRO 990 ₸, B2B', component: Slide08BusinessModel },
  { id: 13, titleKk: '2026 Жол картасы', titleRu: 'Дорожная карта 2026', subKk: 'Q1 MVP-ден Q4 шлюзге дейін', subRu: 'От Q1 MVP до Q4 интеграций', component: Slide09Roadmap },
  { id: 14, titleKk: 'Құпиялылық & Егемендік', titleRu: 'Приватность & Суверенитет', subKk: 'Privacy-by-Design · Деректер РК', subRu: 'Privacy-by-Design · Данные в РК', component: Slide14DataPrivacy },
  { id: 15, titleKk: 'Қорытынды & Демо-кіру', titleRu: 'Финал & Демо-доступ', subKk: 'Жюри үшін демо-аккаунттар', subRu: 'Живые аккаунты для жюри', component: Slide15Final },
];
