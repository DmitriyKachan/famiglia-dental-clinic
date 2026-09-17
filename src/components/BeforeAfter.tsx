'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Sparkles, MoveHorizontal, CheckCircle2, Sliders } from 'lucide-react';

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
      beforeImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85',
      afterImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=85',
      details: locale === 'ua' ? 'Відновлення форми, мікротекстури та природної прозорості емалі за 1 візит.' : 'Restoration of shape, micro-texture and natural enamel translucency in 1 visit.',
    },
    ortho: {
      id: 'ortho',
      category: t.beforeAfter.tabs.ortho,
      title: locale === 'ua' ? 'Вирівнювання прикусу прозорими елайнерами' : 'Clear Aligner Teeth Straightening',
      beforeImg: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=85',
      afterImg: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85',
      details: locale === 'ua' ? 'Корекція викривлення зубного ряду без брекетів за 9 місяців.' : 'Correction of tooth crowding without metal braces in 9 months.',
    },
    whitening: {
      id: 'whitening',
      category: t.beforeAfter.tabs.whitening,
      title: locale === 'ua' ? 'Професійне кабінетне відбілювання' : 'In-Office Professional Whitening',
      beforeImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85',
      afterImg: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=1200&q=85',
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
    <section id="results" className="relative py-28 bg-[#151210] text-white border-b border-[#D4AF37]/20 scroll-mt-20 overflow-hidden">
      {/* Background Laser Lines */}
      <div className="absolute inset-0 bg-laser-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1E1916] border border-[#D4AF37]/40 text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{locale === 'ua' ? 'РЕАЛЬНІ КЕЙСИ' : 'CLINICAL RESULTS'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            {t.beforeAfter.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#DFD3C2] leading-relaxed font-light">
            {t.beforeAfter.subtitle}
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-[#1E1916] border border-[#D4AF37]/30 space-x-2">
            {(['restoration', 'ortho', 'whitening'] as const).map((tabKey) => (
              <button
                key={tabKey}
                type="button"
                onClick={() => {
                  setActiveTab(tabKey);
                  setSliderPosition(50);
                }}
                className={`px-5 py-2.5 text-xs sm:text-sm font-mono tracking-wider uppercase rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === tabKey
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5C378] text-[#151210] font-bold shadow-lg'
                    : 'text-[#DFD3C2] hover:text-white'
                }`}
              >
                {t.beforeAfter.tabs[tabKey]}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Cinema Frame */}
        <div className="max-w-5xl mx-auto bg-[#1E1916] rounded-3xl p-4 sm:p-8 border border-[#D4AF37]/30 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37]">
                {currentCase.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                {currentCase.title}
              </h3>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#D4AF37] bg-[#151210] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30">
              <MoveHorizontal className="w-4 h-4 text-[#38BDF8]" />
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
            className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-[#D4AF37]/40 shadow-inner bg-black"
          >
            {/* After Image (Full background) */}
            <img
              src={currentCase.afterImg}
              alt="After treatment"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none filter brightness-105 contrast-105"
            />
            {/* After Laser Badge */}
            <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 bg-[#151210]/90 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-mono font-bold tracking-wider uppercase rounded-full shadow-lg">
              {locale === 'ua' ? 'Після' : 'After'}
            </div>

            {/* Before Image (Clipped layer) */}
            <div
              style={{ width: `${sliderPosition}%` }}
              className="absolute inset-0 overflow-hidden pointer-events-none border-r-2 border-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.8)]"
            >
              <img
                src={currentCase.beforeImg}
                alt="Before treatment"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none filter saturate-60 contrast-100"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
              />
              {/* Before Laser Badge */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 bg-[#151210]/90 backdrop-blur-md text-[#DFD3C2] border border-[#DFD3C2]/40 text-xs font-mono font-bold tracking-wider uppercase rounded-full shadow-lg">
                {locale === 'ua' ? 'До' : 'Before'}
              </div>
            </div>

            {/* Laser Divider Wipe Line & Handle */}
            <div
              style={{ left: `${sliderPosition}%` }}
              className="absolute top-0 bottom-0 -ml-4 w-8 flex items-center justify-center pointer-events-none z-20"
            >
              <div className="w-9 h-9 rounded-full bg-[#151210] border-2 border-[#38BDF8] shadow-[0_0_25px_rgba(56,189,248,0.8)] flex items-center justify-center text-[#38BDF8]">
                <MoveHorizontal className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Details & CTA */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#D4AF37]/20">
            <div className="flex items-center space-x-2 text-sm text-[#DFD3C2]">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{currentCase.details}</span>
            </div>
            <a
              href="#booking"
              className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#151210] bg-gradient-to-r from-[#D4AF37] to-[#E5C378] hover:brightness-110 rounded-full transition-all cursor-pointer shrink-0 shadow-md"
            >
              {locale === 'ua' ? 'Отримати таку усмішку' : 'Get this smile'}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
