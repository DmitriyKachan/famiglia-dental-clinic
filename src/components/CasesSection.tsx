'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Sparkles, ArrowRight, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { getAssetPath } from '@/lib/basePath';
import { ShineBorder } from './magicui/ShineBorder';

type CaseTabKey = 'veneers' | 'restoration' | 'whitening';
const CASE_TABS: CaseTabKey[] = ['whitening', 'restoration', 'veneers'];

const CASE_IMAGES: Record<CaseTabKey, { before: string; after: string }> = {
  veneers: {
    before: getAssetPath('/case_veneers_before.jpg'),
    after: getAssetPath('/case_veneers_after.jpg'),
  },
  restoration: {
    before: getAssetPath('/case_restoration_before.jpg'),
    after: getAssetPath('/case_restoration_after.jpg'),
  },
  whitening: {
    before: getAssetPath('/case_whitening_before.jpg'),
    after: getAssetPath('/case_whitening_after.jpg'),
  },
};

interface CasesSectionProps {
  onOpenBooking: () => void;
}

export const CasesSection: React.FC<CasesSectionProps> = ({ onOpenBooking }) => {
  const { t, locale } = useI18n();
  const [activeTab, setActiveTab] = useState<CaseTabKey>('whitening');
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const currentCase =
    t.cases.items.find((item) => item.category === activeTab) ?? t.cases.items[0];
  const images = CASE_IMAGES[activeTab];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handleMove(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <section id="cases" className="relative py-28 sm:py-36 bg-[#0d0d0d] text-cream overflow-hidden font-hn border-t border-white/10">
      {/* Ambient background light orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cream/5 border border-cream/15 text-xs tracking-wider uppercase text-brand-gold mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{locale === 'ua' ? 'Клінічні результати' : 'Clinical Transformations'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-cream">
            {t.cases.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-cream/60 font-light leading-relaxed">
            {t.cases.subtitle}
          </p>
        </div>

        {/* Apple macOS LiquidGlass Window Container */}
        <div className="apple-glass rounded-3xl border border-white/15 overflow-hidden shadow-2xl relative">
          <ShineBorder borderWidth={1} duration={18} shineColor={['#C5A880', '#ffffff', '#C5A880']} />

          {/* Window Chrome Titlebar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
            <div className="flex items-center space-x-2">
              <span className="apple-dot apple-dot-close" />
              <span className="apple-dot apple-dot-minimize" />
              <span className="apple-dot apple-dot-maximize" />
            </div>

            <div className="text-xs uppercase tracking-[0.2em] text-cream/50 font-light">
              Carl Zeiss 20x Studio — Case Viewer
            </div>

            <div className="text-xs text-brand-gold flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              <span className="hidden sm:inline">{locale === 'ua' ? 'Реальні пацієнти' : 'Real Cases'}</span>
            </div>
          </div>

          {/* Interactive Case Controls Bar */}
          <div className="px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              {CASE_TABS.map((tabKey) => {
                const isActive = activeTab === tabKey;
                const tabTitle =
                  t.cases.tabs[tabKey] ||
                  (tabKey === 'whitening'
                    ? locale === 'ua'
                      ? 'Відбілювання'
                      : 'Whitening'
                    : tabKey === 'restoration'
                    ? locale === 'ua'
                      ? 'Реставрація'
                      : 'Restoration'
                    : locale === 'ua'
                    ? 'Вініри'
                    : 'Veneers');

                return (
                  <button
                    key={tabKey}
                    type="button"
                    onClick={() => {
                      setActiveTab(tabKey);
                      setSliderPosition(50);
                    }}
                    className={`px-4 py-2 text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cream text-black font-medium shadow-md'
                        : 'bg-white/5 text-cream/70 hover:text-cream hover:bg-white/10'
                    }`}
                  >
                    {tabTitle}
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-cream/50 flex items-center space-x-2">
              <ArrowLeftRight className="w-3.5 h-3.5 text-brand-gold" />
              <span>{locale === 'ua' ? 'Потягніть повзунок для порівняння' : 'Drag slider to compare'}</span>
            </div>
          </div>

          {/* Main Content: Slider & Clinical Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
            {/* Left: Interactive Before / After Split View */}
            <div className="lg:col-span-7">
              <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/15 bg-black/60 shadow-xl"
              >
                {/* AFTER Image (Full background) */}
                <img
                  src={images.after}
                  alt="Після лікування"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* BEFORE Image (Clipped layer) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={images.before}
                    alt="До лікування"
                    loading="lazy"
                    className="absolute inset-y-0 left-0 h-full max-w-none object-cover"
                    style={{
                      width: containerRef.current
                        ? `${containerRef.current.clientWidth}px`
                        : '100%',
                    }}
                  />
                </div>

                {/* Divider Line */}
                <div
                  className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none -translate-x-1/2"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Floating Glass Handle */}
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full apple-glass border border-white/40 flex items-center justify-center text-cream shadow-2xl">
                    <ArrowLeftRight className="w-4 h-4 text-brand-gold" />
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] uppercase tracking-wider text-cream/80 border border-white/15">
                    {locale === 'ua' ? 'ДО' : 'BEFORE'}
                  </span>
                </div>
                <div className="absolute top-4 right-4 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-brand-gold/90 backdrop-blur-md text-[11px] uppercase tracking-wider text-black font-semibold shadow-md">
                    {locale === 'ua' ? 'ПІСЛЯ' : 'AFTER'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Clinical Description & Details */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-cream/40 font-light">
                  {locale === 'ua' ? 'Клінічний протокол' : 'Clinical Protocol'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-light text-cream mt-1">
                  {currentCase?.title || 'Художня естетична реставрація'}
                </h3>
                <p className="text-sm text-cream/70 font-light leading-relaxed mt-3">
                  {currentCase?.solution ||
                    (locale === 'ua'
                      ? 'Відновлення анатомічної форми та оптичних властивостей емалі з використанням мікроскопа Carl Zeiss.'
                      : 'Restoration of natural anatomical morphology and enamel luminescence using Carl Zeiss magnification.')}
                </p>
                {currentCase && (
                  <div className="flex items-center space-x-4 text-xs text-cream/50 pt-2">
                    <span>{locale === 'ua' ? 'Візити:' : 'Visits:'} {currentCase.visits}</span>
                    <span>•</span>
                    <span>{locale === 'ua' ? 'Тривалість:' : 'Duration:'} {currentCase.duration}</span>
                  </div>
                )}
              </div>

              {/* Protocol Highlights */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <p className="text-xs text-cream/80 font-light">
                    {locale === 'ua'
                      ? 'Пошарова техніка нанесення наногібридного композиту (Японія / Німеччина)'
                      : 'Multi-layer stratification of nanohybrid composite (Japan / Germany)'}
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <p className="text-xs text-cream/80 font-light">
                    {locale === 'ua'
                      ? 'Індивідуальний підбір прозорості та мікрорельєфу ріжучого краю'
                      : 'Individualized incisal translucency and natural micro-texture'}
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <p className="text-xs text-cream/80 font-light">
                    {locale === 'ua'
                      ? 'Збереження 100% життєздатності зуба без депульпації'
                      : '100% biological preservation without root canal treatment'}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10 flex items-center space-x-4">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-full bg-cream text-black text-xs uppercase tracking-wider font-medium hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all cursor-pointer flex items-center space-x-2"
                >
                  <span>{locale === 'ua' ? 'Хочу такий результат' : 'Get Similar Result'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
