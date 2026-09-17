'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { BlurFade } from './magicui/BlurFade';
import { Sparkles, CheckCircle2, AlertCircle, Calendar, Clock } from 'lucide-react';

export type CaseTabKey = 'veneers' | 'restoration' | 'whitening';

const CASE_TABS: CaseTabKey[] = ['veneers', 'restoration', 'whitening'];

const CASE_IMAGES: Record<CaseTabKey, { before: string; after: string }> = {
  veneers: {
    before: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85',
    after: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=85',
  },
  restoration: {
    before: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=85',
    after: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85',
  },
  whitening: {
    before: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85',
    after: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=1200&q=85',
  },
};

export const BeforeAfter: React.FC = () => {
  const { t, locale } = useI18n();
  const [activeTab, setActiveTab] = useState<CaseTabKey>('veneers');
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
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <section
      id="cases"
      className="relative py-20 sm:py-28 bg-brand-base text-brand-dark border-b border-brand-border scroll-mt-20 overflow-hidden"
    >
      {/* Compatibility anchor so old links to #results don't break */}
      <div id="results" className="absolute -top-20" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <BlurFade delay={0.05}>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-surface border border-brand-border text-xs font-semibold uppercase tracking-wider text-brand-gold mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>{locale === 'ua' ? 'РЕАЛЬНІ КЕЙСИ' : 'CLINICAL CASES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-brand-dark">
              {t.cases.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-light">
              {t.cases.subtitle}
            </p>
          </div>

          {/* Case Tabs Selector */}
          <div className="flex justify-center mb-10 sm:mb-12">
            <div className="inline-flex p-1.5 rounded-full bg-brand-surface border border-brand-border shadow-inner space-x-1 sm:space-x-2">
              {CASE_TABS.map((tabKey) => {
                const isActive = activeTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    type="button"
                    onClick={() => {
                      setActiveTab(tabKey);
                      setSliderPosition(50);
                    }}
                    className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-brand-dark text-white shadow-sm'
                        : 'text-brand-muted hover:text-brand-dark hover:bg-brand-base'
                    }`}
                  >
                    {t.cases.tabs[tabKey]}
                  </button>
                );
              })}
            </div>
          </div>
        </BlurFade>

        {/* Interactive Comparison & Doctor's Clinical Note */}
        <BlurFade delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Interactive Before / After Slider */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              <div className="flex items-center justify-between text-xs text-brand-muted px-1">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="font-medium text-brand-dark">{currentCase.title}</span>
                </div>
                <span className="hidden sm:inline-block">
                  {locale === 'ua' ? 'Потягніть повзунок для порівняння' : 'Drag slider to compare'}
                </span>
              </div>

              {/* Slider Viewport */}
              <div
                ref={containerRef}
                role="slider"
                tabIndex={0}
                aria-label={locale === 'ua' ? 'Повзунок порівняння До та Після' : 'Before and After comparison slider'}
                aria-valuenow={Math.round(sliderPosition)}
                aria-valuemin={0}
                aria-valuemax={100}
                onKeyDown={handleKeyDown}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden cursor-ew-resize select-none border border-brand-border bg-brand-base shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
              >
                {/* After Image (Background layer) */}
                <img
                  src={images.after}
                  alt={locale === 'ua' ? 'Після лікування' : 'After treatment'}
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
                />
                {/* AFTER Pill */}
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-brand-surface/90 backdrop-blur-md text-brand-dark border border-brand-border/80 text-xs font-semibold uppercase tracking-wider shadow-sm select-none">
                  {locale === 'ua' ? 'ПІСЛЯ' : 'AFTER'}
                </div>

                {/* Before Image (Clipped overlay layer) */}
                <div
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  className="absolute inset-0 pointer-events-none select-none"
                >
                  <img
                    src={images.before}
                    alt={locale === 'ua' ? 'До лікування' : 'Before treatment'}
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
                  />
                  {/* BEFORE Pill */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-brand-surface/90 backdrop-blur-md text-brand-dark border border-brand-border/80 text-xs font-semibold uppercase tracking-wider shadow-sm select-none">
                    {locale === 'ua' ? 'ДО' : 'BEFORE'}
                  </div>
                </div>

                {/* Slider Divider Line */}
                <div
                  data-testid="slider-divider"
                  style={{ left: `${sliderPosition}%` }}
                  className="absolute top-0 bottom-0 -ml-[1px] w-[2px] bg-brand-gold pointer-events-none z-20 shadow-sm"
                />

                {/* Natural Slider Handle: round luxury knob with gold accent border and <> arrows */}
                <div
                  data-testid="slider-handle"
                  style={{ left: `${sliderPosition}%` }}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-surface border-2 border-brand-gold shadow-md flex items-center justify-center text-brand-gold pointer-events-none z-20"
                >
                  <span className="text-xs font-bold tracking-tight text-brand-gold select-none" aria-hidden="true">&lt;&gt;</span>
                  <span className="sr-only">&lt;&gt;</span>
                </div>
              </div>
            </div>

            {/* Right: Doctor's Clinical Note Card */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-brand-surface rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-brand-border shadow-sm">
              <div className="space-y-5">
                {/* Doctor Note Header */}
                <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold font-serif font-bold text-sm">
                      ТБ
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-brand-dark">
                        {locale === 'ua' ? 'Тетяна Бибіс' : 'Dr. Tetiana Bybis'}
                      </h4>
                      <p className="text-xs text-brand-muted">
                        {locale === 'ua' ? 'Головний лікар • Клінічна нотатка' : 'Chief Doctor • Clinical Note'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-base text-brand-gold border border-brand-border">
                    {t.cases.tabs[activeTab]}
                  </span>
                </div>

                {/* Case Title */}
                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-brand-dark">
                    {currentCase.title}
                  </h3>
                </div>

                {/* Problem / Скарга */}
                <div className="space-y-1.5 p-4 rounded-2xl bg-brand-base border border-brand-border/60">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-muted flex items-center space-x-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{locale === 'ua' ? 'Скарга / Початковий стан' : 'Chief Complaint / Problem'}</span>
                  </div>
                  <p className="text-sm text-brand-dark leading-relaxed">
                    {currentCase.problem}
                  </p>
                </div>

                {/* Solution / Рішення Тетяни Бибіс */}
                <div className="space-y-1.5 p-4 rounded-2xl bg-brand-base border border-brand-border/60">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-sage flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-sage" />
                    <span>{locale === 'ua' ? 'Рішення Тетяни Бибіс' : 'Solution by Dr. Tetiana Bybis'}</span>
                  </div>
                  <p className="text-sm text-brand-dark leading-relaxed">
                    {currentCase.solution}
                  </p>
                </div>

                {/* Time & Visits / Термін та візити */}
                <div className="pt-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
                    {locale === 'ua' ? 'Термін та візити' : 'Visits & Duration'}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-brand-base border border-brand-border/60">
                      <Calendar className="w-4 h-4 text-brand-gold shrink-0" />
                      <div>
                        <div className="text-[11px] text-brand-muted">
                          {locale === 'ua' ? 'Візити' : 'Visits'}
                        </div>
                        <div className="text-sm font-semibold text-brand-dark">
                          {currentCase.visits}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-brand-base border border-brand-border/60">
                      <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                      <div>
                        <div className="text-[11px] text-brand-muted">
                          {locale === 'ua' ? 'Термін' : 'Duration'}
                        </div>
                        <div className="text-sm font-semibold text-brand-dark">
                          {currentCase.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="pt-6 mt-6 border-t border-brand-border">
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center w-full px-6 py-3.5 text-sm font-medium text-white bg-brand-dark hover:bg-brand-gold transition-colors duration-200 rounded-full shadow-sm cursor-pointer text-center"
                >
                  {locale === 'ua' ? 'Записатися на консультацію' : 'Book a Consultation'}
                </a>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};
