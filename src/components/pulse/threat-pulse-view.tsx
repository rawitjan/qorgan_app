'use client';

import React, { useState } from 'react';
import {
  IconRadio,
  IconFilter,
  IconSearch,
  IconMapPin,
  IconClock,
  IconShield,
  IconAlertTriangle,
  IconExternalLink,
  IconX,
  IconPhoneCall,
  IconChevronRight,
  IconBuildingBank,
} from '@tabler/icons-react';
import { Threat, ThreatSeverity, ThreatDetail } from '@/types';
import { RiskBadge } from '@/components/qorgan/risk-badge';
import { severityToRiskLevel } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export const sampleThreatsDetailed: ThreatDetail[] = [
  {
    id: 1,
    title: 'OLX / Kazpost арқылы төлем жасау сылтауымен тараған фишинг',
    category: 'phishing',
    severity: 'high',
    region: 'KZ-ALL (Жалпыұлттық)',
    description:
      'Тауарды сатып алу үшін жалған казпочта немесе курьер сілтемелерін жіберіп, карта деректері мен SMS-кодтарды ұрлау әрекеттері көбейді.',
    starts_at: '2026-09-05 12:00',
    status: 'active',
    impact_level: 'high',
    targeted_entities: ['Kazpost', 'OLX.kz', 'Kaspi Bank', 'Halyk Bank'],
    iocs: [
      'kazpost-express-pay.kz',
      'olx-delivery-kz.pay-order.ru',
      'postkz-order-verify.com',
    ],
    indicators_description_kk:
      'Жалған домендер көбінесе KazNIC тіркеуінен өтпеген және Cloudflare немесе шетелдік хостингтерде орналасқан.',
    indicators_description_ru:
      'Поддельные домены размещаются на зарубежных серверах без регистрации в KazNIC.',
    countermeasures_kk: [
      'Ешқашан WhatsApp-қа жіберілген сілтеме бойынша карта деректерін енгізбеңіз.',
      'Төлем жасау алдында доменді Lens арқылы тексеріңіз немесе тек ресми post.kz сайтын ашыңыз.',
      'Егер карта деректерін енгізіп қойсаңыз — банктің мобильді қосымшасында картаны дереу бұғаттаңыз.',
    ],
    countermeasures_ru: [
      'Никогда не вводите данные банковской карты по ссылкам из мессенджеров.',
      'Проверяйте ссылки через QORGAN Lens или используйте только официальный post.kz.',
      'Если данные были введены — немедленно заблокируйте карту в банковском приложении.',
    ],
    official_source: 'CERT.KZ / KZ-CERT & CyberPol 102',
    verified_date: '2026-09-05 11:30',
  },
  {
    id: 2,
    title: 'Сот орындаушылары атынан жалған айыппұл SMS-тері',
    category: 'social_engineering',
    severity: 'critical',
    region: 'KZ-AST (Астана)',
    description:
      'Шоттарды бұғаттаумен және мүлікті тәркілеумен қорқытып, жалған төлем реквизиттеріне ақша аударуды талап ету фактілері тіркелді.',
    starts_at: '2026-09-05 10:30',
    status: 'active',
    impact_level: 'critical',
    targeted_entities: ['АИС ОИП', 'eGov.kz', 'ҚР Әділет Министрлігі'],
    iocs: [
      '+7 708 982-12-40',
      '+7 775 843-00-19',
      'ais-oip-sudebnik.kz',
    ],
    indicators_description_kk:
      'SMS хабарламаларда азаматтарды асықтырып, "2 сағат ішінде төлемесеңіз шот бұғатталады" деген үрей тудыратын сөздер қолданылады.',
    indicators_description_ru:
      'Используются методы запугивания и срочности с требованием немедленной оплаты долга.',
    countermeasures_kk: [
      'Айыппұлдар мен сот өндірістерін тек ресми eGov.kz немесе aisoip.adilet.gov.kz порталынан тексеріңіз.',
      'Бөгде шоттарға немесе телефон нөмірлеріне ақша аудармаңыз.',
      'Мұндай хабарлама алған жағдайда 102 CyberPol желісіне хабарласыңыз.',
    ],
    countermeasures_ru: [
      'Проверяйте наличие исполнительных производств только на eGov.kz или aisoip.adilet.gov.kz.',
      'Не переводите деньги на сторонние номера и счета физических лиц.',
      'При получении угроз сообщите в полицию по номеру 102.',
    ],
    official_source: 'ҚР Әділет Министрлігі & ІІМ Киберқылмысқа қарсы орталығы',
    verified_date: '2026-09-05 09:45',
  },
  {
    id: 3,
    title: 'Instagram: Жеңілдікпен iPhone ұтысы атынан фейк боттар',
    category: 'scam_detection',
    severity: 'moderate',
    region: 'KZ-ALA (Алматы)',
    description:
      'Жеткізу ақысын алдын ала төлеуді сұрап, карта мәліметтерін иемденетін фишинг парақшалары анықталды.',
    starts_at: '2026-09-05 08:15',
    status: 'active',
    impact_level: 'moderate',
    targeted_entities: ['Instagram KZ', 'Kaspi Gold'],
    iocs: ['@apple_giveaway_almaty_fake', 'almaty-iphone-delivery.online'],
    indicators_description_kk:
      'Түсініктемелер өшірілген, ал парақша 48 сағат бұрын ғана ашылған.',
    indicators_description_ru:
      'Комментарии отключены, страница создана менее 48 часов назад.',
    countermeasures_kk: [
      'Тегін сыйлық немесе ұтыс үшін жеткізу ақысын сұраса — бұл 100% алаяқтық.',
      'Белгісіз парақшаларға банк картасының нөмірін жібермеңіз.',
    ],
    countermeasures_ru: [
      'Требование предоплаты доставки бесплатного приза — 100% признак мошенничества.',
      'Никому не сообщайте реквизиты карт в директ.',
    ],
    official_source: 'Almaty Police CyberPol',
    verified_date: '2026-09-05 08:00',
  },
  {
    id: 4,
    title: 'Telegram: Аккаунт ұрлайтын фейк голосование сілтемелері',
    category: 'social_engineering',
    severity: 'high',
    region: 'KZ-ALL (Жалпыұлттық)',
    description:
      '"Балама дауыс берші, байқауға қатысып жатыр" деген хабарламамен тараған Telegram-сессияны ұрлау сілтемелері.',
    starts_at: '2026-09-04 16:00',
    status: 'active',
    impact_level: 'high',
    targeted_entities: ['Telegram Messenger'],
    iocs: ['t-contest-vote-kz.info', 'tg-balalar-bailygy.ru'],
    indicators_description_kk:
      'Сайтқа кіргенде телефон нөмірін және Telegram-нан келетін кіру кодын сұрайды.',
    indicators_description_ru:
      'Сайт запрашивает ввод номера телефона и SMS-кода авторизации в Telegram.',
    countermeasures_kk: [
      'Telegram параметрлерінде екі кезеңді тексеруді (Бұлттық құпиясөз) міндетті түрде қосыңыз.',
      'Ешқандай сайтқа Telegram кіру кодын енгізбеңіз.',
      'Белсенді сессияларды тексеріп, бөтен құрылғыларды өшіріңіз.',
    ],
    countermeasures_ru: [
      'Обязательно включите двухэтапную аутентификацию (облачный пароль) в Telegram.',
      'Никогда не вводите код от Telegram на сторонних сайтах.',
      'Проверьте список активных сессий и завершите чужие подключения.',
    ],
    official_source: 'KZ-CERT',
    verified_date: '2026-09-04 15:30',
  },
];

export function ThreatPulseModule({ className }: { className?: string }) {
  const { locale } = useMode();
  const [threats] = useState<ThreatDetail[]>(sampleThreatsDetailed);
  const [selectedThreat, setSelectedThreat] = useState<ThreatDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const filteredThreats = threats.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity =
      selectedSeverity === 'all' || t.severity === selectedSeverity;

    const matchesRegion =
      selectedRegion === 'all' || (t.region && t.region.includes(selectedRegion));

    return matchesSearch && matchesSeverity && matchesRegion;
  });

  return (
    <div className={cn('flex flex-col gap-4 w-full', className)}>
      {/* 1. Header with Live Telemetry Pulse Dot */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground">Threat Pulse</h2>
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
          </div>
          <p className="text-xs text-muted-foreground">
            {locale === 'kk'
              ? 'Қазақстандағы нақты уақыттағы киберқауіптер мен алаяқтық легі.'
              : 'Сводка актуальных цифровых угроз и атак по Казахстану в реальном времени.'}
          </p>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
          <IconRadio size={13} className="animate-pulse" />
          <span>LIVE</span>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="flex flex-col gap-2">
        <div className="relative w-full">
          <IconSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              locale === 'kk'
                ? 'Қауіпті іздеу (Kaspi, фишинг, айыппұл...)'
                : 'Поиск угроз (Kaspi, фишинг, штрафы...)'
            }
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
        </div>

        {/* Severity Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar select-none">
          <button
            onClick={() => setSelectedSeverity('all')}
            className={cn(
              'touch-target shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors',
              selectedSeverity === 'all'
                ? 'bg-surface-raised text-primary border border-primary/30 font-bold'
                : 'bg-surface border border-border text-muted-foreground hover:text-foreground'
            )}
          >
            {locale === 'kk' ? 'Барлық қауіптер' : 'Все уровни'}
          </button>
          <button
            onClick={() => setSelectedSeverity('critical')}
            className={cn(
              'touch-target shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors',
              selectedSeverity === 'critical'
                ? 'bg-red-950/40 text-red-400 border border-red-500/50 font-bold'
                : 'bg-surface border border-border text-muted-foreground hover:text-foreground'
            )}
          >
            CRITICAL
          </button>
          <button
            onClick={() => setSelectedSeverity('high')}
            className={cn(
              'touch-target shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors',
              selectedSeverity === 'high'
                ? 'bg-orange-950/40 text-orange-400 border border-orange-500/50 font-bold'
                : 'bg-surface border border-border text-muted-foreground hover:text-foreground'
            )}
          >
            HIGH
          </button>
          <button
            onClick={() => setSelectedSeverity('moderate')}
            className={cn(
              'touch-target shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors',
              selectedSeverity === 'moderate'
                ? 'bg-yellow-950/40 text-yellow-400 border border-yellow-500/50 font-bold'
                : 'bg-surface border border-border text-muted-foreground hover:text-foreground'
            )}
          >
            MODERATE
          </button>
        </div>
      </div>

      {/* 3. Threat List Cards (Responsive Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredThreats.length === 0 ? (
          <div className="p-8 rounded-2xl border border-border bg-surface text-center flex flex-col items-center gap-2 text-muted-foreground">
            <IconAlertTriangle size={24} className="text-muted-foreground/60" />
            <span className="text-xs">
              {locale === 'kk'
                ? 'Сұраныс бойынша қауіптер табылған жоқ'
                : 'Угроз по вашему запросу не найдено'}
            </span>
          </div>
        ) : (
          filteredThreats.map((threat) => {
            const riskLevel = severityToRiskLevel(threat.severity);
            return (
              <div
                key={threat.id}
                onClick={() => setSelectedThreat(threat)}
                className={cn(
                  'p-4 rounded-2xl border bg-surface hover:border-primary/50 hover:bg-surface-raised cursor-pointer transition-all flex flex-col gap-2.5 shadow-sm active:scale-[0.99] group',
                  threat.severity === 'critical' && 'border-red-500/40 bg-red-950/10',
                  threat.severity === 'high' && 'border-orange-500/30 bg-orange-950/10'
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <RiskBadge level={riskLevel} size="sm" />
                  {threat.region && (
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium bg-surface px-2 py-0.5 rounded-full border border-border">
                      <IconMapPin size={11} className="text-primary" />
                      <span>{threat.region}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {threat.title}
                  </h4>
                  <IconChevronRight
                    size={18}
                    className="text-muted-foreground group-hover:text-primary shrink-0 transition-transform group-hover:translate-x-0.5 mt-0.5"
                  />
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {threat.description}
                </p>

                <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/50">
                  <span className="font-mono text-primary font-semibold">
                    {threat.category.toUpperCase()}
                  </span>
                  {threat.starts_at && (
                    <span className="flex items-center gap-1 font-mono">
                      <IconClock size={10} />
                      {threat.starts_at}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 4. Threat Details Modal / Drawer */}
      {selectedThreat && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in-50 duration-200">
          <div className="w-full max-w-md max-h-[85vh] overflow-y-auto bg-surface border border-border rounded-t-3xl sm:rounded-3xl p-5 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-bottom-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <RiskBadge level={severityToRiskLevel(selectedThreat.severity)} size="sm" />
                <span className="text-xs font-mono text-muted-foreground">
                  {selectedThreat.region}
                </span>
              </div>
              <button
                onClick={() => setSelectedThreat(null)}
                className="touch-target flex h-8 w-8 items-center justify-center rounded-full bg-surface-raised text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Title & Description */}
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-bold text-foreground leading-snug">
                {selectedThreat.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {selectedThreat.description}
              </p>
            </div>

            {/* Targeted Entities */}
            {selectedThreat.targeted_entities.length > 0 && (
              <div className="p-3 rounded-xl bg-surface-raised border border-border flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <IconBuildingBank size={12} className="text-primary" />
                  <span>{locale === 'kk' ? 'Нысанаға алынған ұйымдар' : 'Атакуемые платформы'}</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedThreat.targeted_entities.map((org, i) => (
                    <Badge key={i} variant="secondary" className="text-[10px]">
                      {org}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Indicators of Compromise (IOCs) */}
            {selectedThreat.iocs.length > 0 && (
              <div className="p-3 rounded-xl bg-surface-raised border border-border flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <IconAlertTriangle size={12} />
                  <span>{locale === 'kk' ? 'Анықталған қауіпті реквизиттер (IOCs)' : 'Индикаторы компрометации (IOCs)'}</span>
                </span>
                <div className="flex flex-col gap-1">
                  {selectedThreat.iocs.map((ioc, i) => (
                    <div
                      key={i}
                      className="p-1.5 rounded-lg bg-background font-mono text-[11px] text-red-400 border border-red-500/20 truncate"
                    >
                      {ioc}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Countermeasures Checklist */}
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <IconShield size={14} />
                <span>{locale === 'kk' ? 'Қалай қорғану керек?' : 'Рекомендуемые действия'}</span>
              </span>
              <ul className="space-y-1.5 text-xs text-foreground/90">
                {(locale === 'kk' ? selectedThreat.countermeasures_kk : selectedThreat.countermeasures_ru).map(
                  (action, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span className="leading-snug">{action}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Source & Reporting Footer */}
            <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-2 border-t border-border">
              <span>{locale === 'kk' ? 'Дереккөз:' : 'Источник:'} {selectedThreat.official_source}</span>
              <span className="font-mono">{selectedThreat.verified_date}</span>
            </div>

            <Button
              onClick={() => setSelectedThreat(null)}
              className="w-full h-11 text-xs font-bold"
            >
              {locale === 'kk' ? 'Түсіндім / Жабу' : 'Понятно / Закрыть'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
