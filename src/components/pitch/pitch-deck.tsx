'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  IconChevronLeft,
  IconChevronRight,
  IconMaximize,
  IconMinimize,
  IconLayoutGrid,
  IconPrinter,
  IconPlayerPlay,
  IconHome,
  IconX,
  IconKeyboard,
  IconShieldLock,
  IconLanguage,
  IconEyeOff,
  IconEye,
} from '@tabler/icons-react';
import { PITCH_SLIDES, PitchLang } from './pitch-slides';
import { cn } from '@/lib/utils';

export function PitchDeck() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isGridMode, setIsGridMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [isHudHidden, setIsHudHidden] = useState(false);
  const [lang, setLang] = useState<PitchLang>('kk');
  const touchStartX = useRef<number | null>(null);

  const totalSlides = PITCH_SLIDES.length;
  const currentSlide = PITCH_SLIDES[currentSlideIndex];
  const CurrentSlideComponent = currentSlide.component;

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index);
      setIsGridMode(false);
    }
  }, [totalSlides]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'kk' ? 'ru' : 'kk'));
  }, []);

  const handleLaunchDemo = useCallback(() => {
    router.push('/');
  }, [router]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'Space':
        case 'PageDown':
        case 'l':
        case 'L':
          e.preventDefault();
          nextSlide();
          break;

        case 'ArrowLeft':
        case 'Backspace':
        case 'PageUp':
          e.preventDefault();
          prevSlide();
          break;

        case 'h':
        case 'H':
          e.preventDefault();
          setIsHudHidden((prev) => !prev);
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;

        case 'g':
        case 'G':
        case 'o':
        case 'O':
          e.preventDefault();
          setIsGridMode((prev) => !prev);
          break;

        case 't':
        case 'T':
          e.preventDefault();
          toggleLang();
          break;

        case 'p':
        case 'P':
          if (e.ctrlKey || e.metaKey) return; // allow default print shortcut
          e.preventDefault();
          window.print();
          break;

        case '?':
          e.preventDefault();
          setShowKeyboardHelp((prev) => !prev);
          break;

        case 'Escape':
          e.preventDefault();
          if (isGridMode) {
            setIsGridMode(false);
          } else if (showKeyboardHelp) {
            setShowKeyboardHelp(false);
          } else if (isHudHidden) {
            setIsHudHidden(false);
          }
          break;

        // Number keys 1-9
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          const idx = parseInt(e.key, 10) - 1;
          if (idx < totalSlides) {
            goToSlide(idx);
          }
          break;

        case '0':
          goToSlide(9); // 10th slide
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, toggleFullscreen, toggleLang, goToSlide, isGridMode, showKeyboardHelp, isHudHidden, totalSlides]);

  // Touch Swipe Support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  const isKk = lang === 'kk';

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-[#121620] flex flex-col justify-center items-center select-none font-['Nunito',sans-serif]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 16:9 Presentation Stage */}
      <div className="relative w-full h-full max-w-[1920px] max-h-[1080px] aspect-video bg-[#ebeae5] shadow-2xl flex flex-col overflow-hidden sm:rounded-none lg:border lg:border-white/10">
        <CurrentSlideComponent lang={lang} />
      </div>

      {/* Floating HUD / Controls Dock or Discreet Trigger Button */}
      {isHudHidden ? (
        <button
          onClick={() => setIsHudHidden(false)}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#121620]/80 hover:bg-[#121620] backdrop-blur-xl border border-white/20 text-white/70 hover:text-white shadow-xl transition-all cursor-pointer group text-xs font-bold print:hidden"
          title={isKk ? "Навигацияны көрсету (H)" : "Показать навигацию (H)"}
          aria-label="Показать навигацию"
        >
          <IconEye size={16} className="text-[#38bdf8]" />
          <span className="hidden group-hover:inline">
            {isKk ? "Навигация (H)" : "Панель (H)"}
          </span>
        </button>
      ) : (
        <div className="fixed bottom-4 sm:bottom-6 z-50 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#121620]/90 backdrop-blur-xl border border-white/15 text-white shadow-[0_10px_35px_rgba(0,0,0,0.6)] print:hidden transition-all hover:bg-[#121620]">
          {/* Language Switcher Button */}
          <button
            onClick={toggleLang}
            className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-[#2775f6]/30 border border-white/15 text-xs font-black tracking-wider flex items-center gap-1.5 transition-all cursor-pointer text-[#38bdf8]"
            title={isKk ? "Орыс тіліне ауыстыру (T)" : "Переключить на казахский (T)"}
            aria-label="Сменить язык"
          >
            <IconLanguage size={15} />
            <span>{isKk ? '🇰🇿 KZ' : '🇷🇺 RU'}</span>
          </button>

          <div className="w-[1px] h-4 bg-white/20 mx-0.5" />

          {/* Prev Slide */}
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="p-1.5 rounded-full hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            title={isKk ? "Алдыңғы слайд (← немесе Backspace)" : "Предыдущий слайд (← или Backspace)"}
            aria-label="Алдыңғы слайд"
          >
            <IconChevronLeft size={20} />
          </button>

          {/* Slide Counter & Title Dropdown Button */}
          <button
            onClick={() => setIsGridMode(true)}
            className="px-3 py-1 rounded-full hover:bg-white/10 flex items-center gap-2 text-xs sm:text-sm font-bold font-mono tracking-wider transition-colors cursor-pointer"
            title={isKk ? "Барлық слайдтар шолуы (G)" : "Сетка всех слайдов (G)"}
          >
            <span className="text-[#38bdf8]">
              {String(currentSlideIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-white/40">/</span>
            <span className="text-white/70">
              {String(totalSlides).padStart(2, '0')}
            </span>
            <span className="hidden md:inline-block text-[11px] font-sans font-medium text-white/60 ml-1 border-l border-white/20 pl-2">
              {isKk ? currentSlide.titleKk : currentSlide.titleRu}
            </span>
          </button>

          {/* Next Slide */}
          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className="p-1.5 rounded-full hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            title={isKk ? "Келесі слайд (→ немесе Space)" : "Следующий слайд (→ или Space)"}
            aria-label="Келесі слайд"
          >
            <IconChevronRight size={20} />
          </button>

          <div className="w-[1px] h-4 bg-white/20 mx-1 hidden sm:block" />

          {/* Grid Overview Toggle */}
          <button
            onClick={() => setIsGridMode((prev) => !prev)}
            className={cn(
              'p-1.5 rounded-full transition-colors cursor-pointer',
              isGridMode ? 'bg-[#2775f6] text-white' : 'hover:bg-white/15 text-white/80'
            )}
            title={isKk ? "Слайдтар торы (G)" : "Обзор всех слайдов (G)"}
            aria-label="Обзор всех слайдов"
          >
            <IconLayoutGrid size={18} />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-full hover:bg-white/15 text-white/80 transition-colors cursor-pointer hidden sm:block"
            title={isKk ? "Толық экран режимі (F)" : "Полный экран (F)"}
            aria-label="Полный экран"
          >
            {isFullscreen ? <IconMinimize size={18} /> : <IconMaximize size={18} />}
          </button>

          {/* Print / PDF Export */}
          <button
            onClick={() => window.print()}
            className="p-1.5 rounded-full hover:bg-white/15 text-white/80 transition-colors cursor-pointer hidden md:block"
            title={isKk ? "PDF форматында басып шығару (P)" : "Экспорт в PDF / Печать (P)"}
            aria-label="Экспорт в PDF"
          >
            <IconPrinter size={18} />
          </button>

          {/* Keyboard Shortcuts Help */}
          <button
            onClick={() => setShowKeyboardHelp((prev) => !prev)}
            className="p-1.5 rounded-full hover:bg-white/15 text-white/80 transition-colors cursor-pointer hidden sm:block"
            title={isKk ? "Пернелер көмекшісі (?)" : "Горячие клавиши (?)"}
            aria-label="Горячие клавиши"
          >
            <IconKeyboard size={18} />
          </button>

          {/* Hide HUD Toggle */}
          <button
            onClick={() => setIsHudHidden(true)}
            className="p-1.5 rounded-full hover:bg-white/15 text-white/80 transition-colors cursor-pointer hidden sm:block"
            title={isKk ? "Навигацияны жасыру (H)" : "Скрыть панель (H)"}
            aria-label="Скрыть навигацию"
          >
            <IconEyeOff size={18} />
          </button>

          <div className="w-[1px] h-4 bg-white/20 mx-1" />

          {/* Direct Link to Live App Demo */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2775f6] hover:bg-[#1e65de] text-white text-xs font-bold transition-all shadow-md"
            title={isKk ? "QORGAN қосымшасына өту" : "Перейти в приложение QORGAN"}
          >
            <IconShieldLock size={15} />
            <span className="hidden sm:inline">QORGAN App</span>
          </Link>
        </div>
      )}

      {/* Grid Overview Modal / Overlay */}
      {isGridMode && (
        <div className="fixed inset-0 z-50 bg-[#121620]/95 backdrop-blur-2xl p-6 sm:p-10 overflow-y-auto flex flex-col justify-between animate-in fade-in duration-200 font-['Nunito',sans-serif]">
          <div className="flex items-center justify-between pb-6 border-b border-white/10 max-w-7xl mx-auto w-full">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                {isKk ? "Барлық слайдтар шолуы" : "Обзор всех слайдов презентации"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                {isKk
                  ? "Өту үшін кез келген слайдты басыңыз немесе шығу үшін Esc түймесін басыңыз"
                  : "Выберите любой слайд для перехода или нажмите Esc для возврата"}
              </p>
            </div>
            <button
              onClick={() => setIsGridMode(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Жабу"
            >
              <IconX size={22} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 py-8 max-w-7xl mx-auto w-full">
            {PITCH_SLIDES.map((slide, index) => {
              const isActive = index === currentSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'group relative rounded-2xl p-4 text-left border transition-all cursor-pointer flex flex-col justify-between h-44',
                    isActive
                      ? 'bg-[#2775f6] text-white border-white/40 shadow-xl shadow-[#2775f6]/40 scale-[1.03]'
                      : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/10 hover:border-white/25'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold opacity-80">
                      #{String(slide.id).padStart(2, '0')}
                    </span>
                    {isActive && (
                      <span className="px-2 py-0.5 rounded-full bg-white text-[#2775f6] text-[10px] font-black uppercase">
                        {isKk ? "Ағымдағы" : "Текущий"}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-sm sm:text-base leading-tight group-hover:text-[#38bdf8] transition-colors">
                      {isKk ? slide.titleKk : slide.titleRu}
                    </h3>
                    <p className="text-[11px] opacity-75 mt-1 line-clamp-2">
                      {isKk ? slide.subKk : slide.subRu}
                    </p>
                  </div>

                  <div className="text-[10px] font-mono opacity-50 uppercase">
                    {isKk ? "Өту үшін басыңыз →" : "Нажмите для перехода →"}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-center text-xs text-slate-500 pt-4 border-t border-white/10 max-w-7xl mx-auto w-full">
            {isKk
              ? "Жылдам өту үшін пернетақтадағы 1–9 немесе 0 пернелерін басыңыз"
              : "Нажмите цифру 1–9 или 0 на клавиатуре для мгновенного перехода"}
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {showKeyboardHelp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-['Nunito',sans-serif]">
          <div className="rounded-3xl bg-[#121620] border border-white/15 p-6 sm:p-8 max-w-md w-full text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold">
                {isKk ? "Питчті басқару пернелері" : "Горячие клавиши питча"}
              </h3>
              <button
                onClick={() => setShowKeyboardHelp(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <IconX size={20} />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-300">
                  {isKk ? "Тілді ауыстыру (KZ / RU)" : "Переключить язык (KZ / RU)"}
                </span>
                <span className="font-mono bg-white/10 px-2 py-1 rounded text-[#38bdf8]">T</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-300">
                  {isKk ? "Келесі слайд" : "Следующий слайд"}
                </span>
                <span className="font-mono bg-white/10 px-2 py-1 rounded">→ / Space / L</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-300">
                  {isKk ? "Алдыңғы слайд" : "Предыдущий слайд"}
                </span>
                <span className="font-mono bg-white/10 px-2 py-1 rounded">← / Backspace</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-300">
                  {isKk ? "Навигацияны жасыру / көрсету" : "Скрыть / показать панель"}
                </span>
                <span className="font-mono bg-white/10 px-2 py-1 rounded text-[#38bdf8]">H</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-300">
                  {isKk ? "Толық экран режимі" : "Полноэкранный режим"}
                </span>
                <span className="font-mono bg-white/10 px-2 py-1 rounded">F</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-300">
                  {isKk ? "Слайдтар торы" : "Сетка всех слайдов"}
                </span>
                <span className="font-mono bg-white/10 px-2 py-1 rounded">G немесе O</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-300">
                  {isKk ? "PDF экспорт / Басып шығару" : "Экспорт в PDF / Печать"}
                </span>
                <span className="font-mono bg-white/10 px-2 py-1 rounded">P</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-300">
                  {isKk ? "1–10 слайдқа өту" : "Переход на слайд 1–10"}
                </span>
                <span className="font-mono bg-white/10 px-2 py-1 rounded">1–9, 0</span>
              </div>
            </div>

            <button
              onClick={() => setShowKeyboardHelp(false)}
              className="w-full py-2.5 rounded-xl bg-[#2775f6] text-white font-bold text-xs hover:bg-[#1f62d4] transition-colors"
            >
              {isKk ? "Түсінікті" : "Понятно"}
            </button>
          </div>
        </div>
      )}

      {/* Print-only container rendering all 10 slides sequentially */}
      <div className="hidden print:block w-full">
        {PITCH_SLIDES.map((slide) => {
          const SlideComp = slide.component;
          return (
            <div
              key={slide.id}
              className="w-[100vw] h-[100vh] page-break-after-always overflow-hidden"
              style={{ breakAfter: 'page', pageBreakAfter: 'always' }}
            >
              <SlideComp lang={lang} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

