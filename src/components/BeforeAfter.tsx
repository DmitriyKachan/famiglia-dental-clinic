'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Sparkles, MoveHorizontal, CheckCircle2 } from 'lucide-react';

interface CaseItem {
  id: string;
  category: string;
  title: string;
  beforeImg: string;
  afterImg: string;
  details: string;
}

export const BeforeAfter: React.FC = () => {
  const { t, locale } = useI18n();
  const [activeTab, setActiveTab] = useState<'restoration' | 'ortho' | 'whitening'>('restoration');
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const cases: Record<'restoration' | 'ortho' | 'whitening', CaseItem> = {
    restoration: {
      id: 'restoration',
      category: t.beforeAfter.tabs.restoration,
      title: locale === 'ua' ? 'Художня реставрація фронтальних зубів' : 'Direct Aesthetic Restoration',
      beforeImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
      details: locale === 'ua' ? 'Відновлення форми, мікротекстури та природної прозорості емалі за 1 візит.' : 'Restoration of shape, micro-texture and natural enamel translucency in 1 visit.',
    },
    ortho: {
      id: 'ortho',
      category: t.beforeAfter.tabs.ortho,
      title: locale === 'ua' ? 'Вирівнювання прикусу прозорими елайнерами' : 'Clear Aligner Teeth Straightening',
      beforeImg: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      details: locale === 'ua' ? 'Корекція викривлення зубного ряду без брекетів за 9 місяців.' : 'Correction of tooth crowding without metal braces in 9 months.',
    },
    whitening: {
      id: 'whitening',
      category: t.beforeAfter.tabs.whitening,
      title: locale === 'ua' ? 'Професійне кабінетне відбілювання' : 'In-Office Professional Whitening',
      beforeImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      afterImg: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=800&q=80',
      details: locale === 'ua' ? 'Освітлення на 6-8 тонів за технологією холодного світла без гіперчутливості.' : 'Lightened by 6-8 shades using cold-light technology without sensitivity.',
    },
  };

  const currentCase = cases[activeTab];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  }, [handleMove]);

  return (
    <section id="results" className="py-24 bg-[#FFFFFF] border-b border-[#EADFCF]/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#F6F2EA] border border-[#EADFCF] text-xs font-semibold uppercase tracking-wider text-[#6E6259] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{locale === 'ua' ? 'Галерея робіт' : 'Results Gallery'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2D241E] tracking-tight">
            {t.beforeAfter.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6E6259] leading-relaxed font-light">
            {t.beforeAfter.subtitle}
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-[#F6F2EA] border border-[#EADFCF] space-x-2">
            {(['restoration', 'ortho', 'whitening'] as const).map((tabKey) => (
              <button
                key={tabKey}
                type="button"
                onClick={() => {
                  setActiveTab(tabKey);
                  setSliderPosition(50);
                }}
                className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === tabKey
                    ? 'bg-[#2D241E] text-white shadow-md'
                    : 'text-[#6E6259] hover:text-[#2D241E]'
                }`}
              >
                {t.beforeAfter.tabs[tabKey]}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Card */}
        <div className="max-w-4xl mx-auto bg-[#FBF9F5] rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-lg">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">
                {currentCase.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2D241E] mt-1">
                {currentCase.title}
              </h3>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-[#6E6259] bg-[#FFFFFF] px-3 py-1.5 rounded-full border border-[#EADFCF]">
              <MoveHorizontal className="w-4 h-4 text-[#C5A880]" />
              <span>{t.beforeAfter.compareLabel}</span>
            </div>
          </div>

          {/* Interactive Image Slider */}
          <div
            ref={containerRef}
            onMouseDown={() => (isDragging.current = true)}
            onMouseUp={() => (isDragging.current = false)}
            onMouseLeave={() => (isDragging.current = false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-[#EADFCF]/80 shadow-inner"
          >
            {/* After Image (Full background) */}
            <img
              src={currentCase.afterImg}
              alt="After treatment"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />
            {/* After Badge */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-[#2D241E]/80 backdrop-blur-md text-white text-xs font-semibold rounded-full shadow">
              {locale === 'ua' ? 'Після' : 'After'}
            </div>

            {/* Before Image (Clipped layer) */}
            <div
              style={{ width: `${sliderPosition}%` }}
              className="absolute inset-0 overflow-hidden pointer-events-none border-r-2 border-white shadow-2xl"
            >
              <img
                src={currentCase.beforeImg}
                alt="Before treatment"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none filter saturate-50"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
              />
              {/* Before Badge */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#2D241E]/80 backdrop-blur-md text-white text-xs font-semibold rounded-full shadow">
                {locale === 'ua' ? 'До' : 'Before'}
              </div>
            </div>

            {/* Drag Handle Divider */}
            <div
              style={{ left: `${sliderPosition}%` }}
              className="absolute top-0 bottom-0 -ml-4 w-8 flex items-center justify-center pointer-events-none z-20"
            >
              <div className="w-8 h-8 rounded-full bg-[#FFFFFF] border-2 border-[#C5A880] shadow-xl flex items-center justify-center text-[#2D241E]">
                <MoveHorizontal className="w-4 h-4 text-[#2D241E]" />
              </div>
            </div>
          </div>

          {/* Details & CTA */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#EADFCF]/60">
            <div className="flex items-center space-x-2 text-sm text-[#6E6259]">
              <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>{currentCase.details}</span>
            </div>
            <a
              href="#booking"
              className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2D241E] hover:bg-[#3D312A] rounded-full transition-colors cursor-pointer shrink-0"
            >
              {locale === 'ua' ? 'Отримати таку усмішку' : 'Get this smile'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
