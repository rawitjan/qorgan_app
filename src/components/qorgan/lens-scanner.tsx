'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import {
  IconLink,
  IconFileText,
  IconPhoto,
  IconCamera,
  IconQrcode,
  IconCrosshair,
  IconScan,
  IconLoader2,
  IconHistory,
  IconAlertTriangle,
  IconRefresh,
  IconClipboard,
} from '@tabler/icons-react';
import { LensInputType, LensScanStage, LensFailureReason } from '@/types';
import { Button } from '@/components/ui/button';
import { useMode } from '@/context/mode-context';
import { cn } from '@/lib/utils';

export function LensProgressPipeline({
  stage,
  className,
}: {
  stage: LensScanStage;
  className?: string;
}) {
  const { locale } = useMode();

  const stages: Array<{ key: LensScanStage; label_kk: string; label_ru: string }> = [
    { key: 'preparing', label_kk: 'Дайындау', label_ru: 'Подготовка' },
    { key: 'extracting', label_kk: 'Мәтінді оқу', label_ru: 'Извлечение' },
    { key: 'checking', label_kk: 'Базаны тексеру', label_ru: 'Проверка баз' },
    { key: 'analyzing', label_kk: 'Талдау жасау', label_ru: 'Анализ угроз' },
    { key: 'scoring', label_kk: 'Қауіп индексі', label_ru: 'Расчёт риска' },
  ];

  const order: LensScanStage[] = [
    'idle',
    'preparing',
    'extracting',
    'checking',
    'analyzing',
    'scoring',
    'completed',
  ];
  const currentIndex = order.indexOf(stage);

  return (
    <div className={cn('flex flex-col gap-2.5 w-full p-4 rounded-xl border border-primary/40 bg-surface shadow-sm', className)}>
      <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
        <div className="flex items-center gap-1.5 text-primary">
          <IconLoader2 size={14} className="animate-spin" />
          <span className="font-bold uppercase tracking-wider text-[10px]">QORGAN Core Pipeline</span>
        </div>
        <span className="text-primary font-mono text-[11px] capitalize font-bold">{stage}...</span>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {stages.map((st) => {
          const stageIndex = order.indexOf(st.key);
          const isDone = currentIndex > stageIndex || stage === 'completed';
          const isCurrent = stage === st.key;

          return (
            <div key={st.key} className="flex flex-col items-center text-center gap-1">
              <div
                className={cn(
                  'h-1.5 w-full rounded-full transition-all duration-300',
                  isDone
                    ? 'bg-emerald-400'
                    : isCurrent
                    ? 'bg-primary animate-pulse shadow-[0_0_8px_rgba(41,184,122,0.8)]'
                    : 'bg-muted'
                )}
              />
              <span
                className={cn(
                  'text-[9px] leading-tight font-medium',
                  isDone || isCurrent ? 'text-foreground font-bold' : 'text-muted-foreground'
                )}
              >
                {locale === 'kk' ? st.label_kk : st.label_ru}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LensScanner({
  stage = 'idle',
  inputType = 'url',
  inputPayload = '',
  filePreview = null,
  failureReason = null,
  onSelectType,
  onPayloadChange,
  onFileUpload,
  onScan,
  onRetry,
  onOpenHistory,
  className,
}: {
  stage?: LensScanStage;
  inputType?: LensInputType;
  inputPayload?: string;
  filePreview?: string | null;
  failureReason?: LensFailureReason | null;
  onSelectType?: (type: LensInputType) => void;
  onPayloadChange?: (val: string) => void;
  onFileUpload?: (file: File) => void;
  onScan?: (type: LensInputType, payload: string, forceError?: LensFailureReason) => void;
  onRetry?: () => void;
  onOpenHistory?: () => void;
  className?: string;
}) {
  const { locale } = useMode();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const isScanning = stage !== 'idle' && stage !== 'completed' && stage !== 'failed';

  // Sample presets for quick testing
  const urlPresets = [
    { label: 'Kazpost Spoof', url: 'https://olx-kazpost-pay.kz/track/4892' },
    { label: 'Kaspi Bonus Fake', url: 'https://kaspi-bonus-almaty.net/login' },
    { label: 'eGov.kz (Clean)', url: 'https://egov.kz/cms/ru/services' },
  ];

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) onPayloadChange?.(text);
    } catch {
      // Fallback
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload?.(file);
    }
  };

  return (
    <div className={cn('flex flex-col gap-4 w-full', className)}>
      {/* Top Controls: Input Mode Tabs + History Toggle */}
      <div className="flex items-center justify-between gap-2">
        <div className="grid grid-cols-5 gap-1 p-1.5 rounded-[20px] bg-surface-raised flex-1">
          <button
            onClick={() => onSelectType?.('url')}
            disabled={isScanning}
            className={cn(
              'touch-target flex flex-col items-center justify-center gap-1 py-1.5 px-0.5 rounded-2xl text-xs font-semibold transition-colors',
              inputType === 'url'
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
            title="URL"
          >
            <IconLink size={15} />
            <span className="text-[10px] leading-none">{locale === 'kk' ? 'Сілтеме' : 'Ссылка'}</span>
          </button>

          <button
            onClick={() => onSelectType?.('text')}
            disabled={isScanning}
            className={cn(
              'touch-target flex flex-col items-center justify-center gap-1 py-1.5 px-0.5 rounded-lg text-xs font-semibold transition-colors',
              inputType === 'text'
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
            title="Text"
          >
            <IconFileText size={15} />
            <span className="text-[10px] leading-none">{locale === 'kk' ? 'Мәтін' : 'Текст'}</span>
          </button>

          <button
            onClick={() => {
              onSelectType?.('screenshot');
              cameraInputRef.current?.click();
            }}
            disabled={isScanning}
            className={cn(
              'touch-target flex flex-col items-center justify-center gap-1 py-1.5 px-0.5 rounded-lg text-xs font-semibold transition-colors',
              inputType === 'screenshot'
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
            title="Camera"
          >
            <IconCamera size={15} />
            <span className="text-[10px] leading-none">{locale === 'kk' ? 'Камера' : 'Камера'}</span>
          </button>

          <button
            onClick={() => {
              onSelectType?.('image');
              fileInputRef.current?.click();
            }}
            disabled={isScanning}
            className={cn(
              'touch-target flex flex-col items-center justify-center gap-1 py-1.5 px-0.5 rounded-lg text-xs font-semibold transition-colors',
              inputType === 'image'
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
            title="Image"
          >
            <IconPhoto size={15} />
            <span className="text-[10px] leading-none">{locale === 'kk' ? 'Фото' : 'Фото'}</span>
          </button>

          <button
            onClick={() => onSelectType?.('qr')}
            disabled={isScanning}
            className={cn(
              'touch-target flex flex-col items-center justify-center gap-1 py-1.5 px-0.5 rounded-lg text-xs font-semibold transition-colors',
              inputType === 'qr'
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
            title="QR Code"
          >
            <IconQrcode size={15} />
            <span className="text-[10px] leading-none">QR</span>
          </button>
        </div>

        {/* History Button */}
        {onOpenHistory && (
          <Button
            variant="outline"
            size="sm"
            className="h-11 px-3 text-xs gap-1 shrink-0 rounded-xl"
            onClick={onOpenHistory}
            title="Lens History"
          >
            <IconHistory size={16} />
            <span className="hidden sm:inline">{locale === 'kk' ? 'Тарих' : 'История'}</span>
          </Button>
        )}
      </div>

      {/* Hidden File / Camera Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Calm scan surface based on the selected mobile reference. */}
      <div className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-[28px] bg-surface p-6 panel-shadow">
        <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-4 text-center">
          <div
            className={cn(
              'flex h-24 w-24 items-center justify-center rounded-full bg-primary-muted text-primary shadow-[0_18px_45px_-24px_rgba(39,117,246,0.75)] transition-all',
              isScanning
                ? 'animate-pulse'
                : 'text-primary'
            )}
          >
            {isScanning ? (
              <IconLoader2 size={40} className="animate-spin text-primary" />
            ) : inputType === 'qr' ? (
              <IconQrcode size={40} />
            ) : inputType === 'image' || inputType === 'screenshot' ? (
              <IconPhoto size={40} />
            ) : (
              <IconScan size={40} />
            )}
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-lg font-bold tracking-[-0.02em] text-foreground">
              {isScanning
                ? locale === 'kk'
                  ? 'Нысанды саралау жүріп жатыр...'
                  : 'Идёт сканирование объекта...'
                : inputType === 'url'
                ? locale === 'kk'
                  ? 'Күдікті веб-сілтемені енгіз'
                  : 'Введите подозрительную ссылку'
                : inputType === 'text'
                ? locale === 'kk'
                  ? 'Күдікті хат немесе SMS мәтінін қой'
                  : 'Вставьте текст подозрительного SMS'
                : inputType === 'qr'
                ? locale === 'kk'
                  ? 'QR-кодты сканерге бағытта'
                  : 'Наведите камеру на QR-код'
                : locale === 'kk'
                ? 'Скриншотты таңдаңыз немесе фотоға түсіріңіз'
                : 'Выберите скриншот или сделайте снимок'}
            </span>
            <span className="text-xs leading-relaxed text-muted-foreground">
              {locale === 'kk'
                ? 'Фишинг, алаяқтық және зиянды скрипттерді анықтау'
                : 'Определение фишинга, скама и вредоносных скриптов'}
            </span>
          </div>

          {/* Image Thumbnail Preview if uploaded */}
          {filePreview && (
            <div className="relative w-24 h-24 rounded-xl border border-primary/50 overflow-hidden shadow-md my-1">
              <Image src={filePreview} alt={locale === 'kk' ? 'Жүктелген сурет' : 'Загруженное изображение'} fill unoptimized className="object-cover" />
            </div>
          )}

          {/* Dynamic Input Controls */}
          {inputType === 'url' && (
            <div className="flex flex-col gap-2 w-full mt-1">
              <div className="flex w-full gap-2">
                <input
                  type="url"
                  value={inputPayload}
                  onChange={(e) => onPayloadChange?.(e.target.value)}
                  placeholder="https://..."
                  disabled={isScanning}
                  className="flex-1 h-12 px-4 text-sm rounded-2xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 text-xs shadow-sm"
                />
                <Button
                  onClick={() => onScan?.('url', inputPayload)}
                  disabled={isScanning || !inputPayload.trim()}
                  className="h-12 px-5 text-xs font-bold shrink-0 rounded-2xl"
                >
                  {locale === 'kk' ? 'Тексеру' : 'Проверить'}
                </Button>
              </div>

              {/* Quick Test Preset Chips */}
              <div className="flex items-center gap-1.5 flex-wrap justify-center mt-1">
                <span className="text-[10px] text-muted-foreground font-semibold">
                  {locale === 'kk' ? 'Үлгілер:' : 'Примеры:'}
                </span>
                {urlPresets.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => {
                      onPayloadChange?.(chip.url);
                    }}
                    className="text-[10px] px-2 py-0.5 rounded-full border border-border bg-surface-raised text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {inputType === 'text' && (
            <div className="flex flex-col gap-2 w-full mt-1">
              <div className="relative w-full">
                <textarea
                  rows={3}
                  value={inputPayload}
                  onChange={(e) => onPayloadChange?.(e.target.value)}
                  placeholder={
                    locale === 'kk'
                      ? 'Күдікті SMS, WhatsApp хабарламасын осында қойыңыз...'
                      : 'Вставьте текст подозрительного SMS или сообщения...'
                  }
                  disabled={isScanning}
                  className="w-full p-3 text-xs rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                <button
                  type="button"
                  onClick={handlePaste}
                  className="absolute right-2.5 bottom-3 text-[10px] px-2 py-1 rounded bg-surface border border-border text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                >
                  <IconClipboard size={12} />
                  <span>{locale === 'kk' ? 'Қою' : 'Вставить'}</span>
                </button>
              </div>

              <Button
                onClick={() => onScan?.('text', inputPayload)}
                disabled={isScanning || !inputPayload.trim()}
                className="w-full h-11 text-xs font-bold"
              >
                {locale === 'kk' ? 'Мәтінді тексеру' : 'Проверить текст'}
              </Button>
            </div>
          )}

          {(inputType === 'image' || inputType === 'screenshot' || inputType === 'qr') && (
            <div className="flex flex-col gap-2 w-full mt-1">
              <Button
                onClick={() => onScan?.(inputType, inputPayload || 'image_sample')}
                disabled={isScanning}
                className="w-full h-11 text-xs font-bold gap-1.5"
              >
                <IconCrosshair size={16} />
                <span>
                  {inputType === 'qr'
                    ? locale === 'kk'
                      ? 'QR-кодты тану'
                      : 'Распознать QR'
                    : locale === 'kk'
                    ? 'Скриншотты талдау'
                    : 'Анализировать скриншот'}
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 5-Stage Progressive Pipeline Tracker while scanning */}
      {isScanning && <LensProgressPipeline stage={stage} />}

      {/* Resilient Error & Degraded Fallback States */}
      {stage === 'failed' && failureReason && (
        <div className="p-4 rounded-xl border border-red-500/40 bg-red-950/20 text-red-100 flex flex-col gap-2.5 animate-in fade-in-50">
          <div className="flex items-center gap-2 text-red-400">
            <IconAlertTriangle size={18} className="shrink-0" />
            <span className="text-xs font-bold">
              {failureReason === 'ai_unavailable'
                ? locale === 'kk'
                  ? 'Сыртқы AI қызметі қолжетімсіз (Автономды режим)'
                  : 'Внешний сервис AI недоступен (Автономный режим)'
                : failureReason === 'provider_unavailable'
                ? locale === 'kk'
                  ? 'Провайдермен байланыс үзілді'
                  : 'Связь с провайдером прервана'
                : locale === 'kk'
                ? 'Сканерлеу сәтсіз аяқталды'
                : 'Ошибка при сканировании'}
            </span>
          </div>

          <p className="text-[11px] text-red-200/90 leading-relaxed">
            {failureReason === 'ai_unavailable'
              ? locale === 'kk'
                ? 'Жүйе эвристикалық жергілікті деректер қорына көшті. Қайта көруге немесе жедел көмекке жүгінуге болады.'
                : 'Система перешла на локальный эвристический анализ. Вы можете повторить попытку.'
              : locale === 'kk'
              ? 'Желілік қосылымды тексеріп, қайтадан көріңіз.'
              : 'Проверьте сетевое подключение и повторите попытку.'}
          </p>

          <Button
            size="sm"
            variant="destructive"
            className="h-9 text-xs gap-1.5 self-start mt-1"
            onClick={onRetry}
          >
            <IconRefresh size={14} />
            <span>{locale === 'kk' ? 'Қайта көру' : 'Повторить попытку'}</span>
          </Button>
        </div>
      )}
    </div>
  );
}
