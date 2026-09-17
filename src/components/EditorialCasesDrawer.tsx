'use client';

import React, { useState, useRef, useCallback } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { getAssetPath } from '@/lib/basePath';

type CaseTabKey = 'veneers' | 'restoration' | 'whitening';
const CASE_TABS: CaseTabKey[] = ['veneers', 'restoration', 'whitening'];

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

interface EditorialCasesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const EditorialCasesDrawer: React.FC<EditorialCasesDrawerProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-hn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Slide-over Panel from Right */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-3xl bg-[#141414] text-cream border-l border-cream/20 shadow-2xl p-6 sm:p-10 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-cream/15">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-cream/50">
                  {locale === 'ua' ? 'Клінічні результати' : 'Clinical Cases'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-cream mt-1">
                  {t.cases.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-cream hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Close cases sheet"
              >
                <X size={26} strokeWidth={1.5} />
              </button>
            </div>

            {/* Case Tabs Selector */}
            <div className="flex items-center space-x-2 pb-2">
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
                    className={`px-4 py-2 text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cream text-black font-semibold'
                        : 'bg-cream/10 text-cream/70 hover:text-cream hover:bg-cream/20'
                    }`}
                  >
                    {t.cases.tabs[tabKey]}
                  </button>
                );
              })}
            </div>

            {/* Before / After Interactive Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-cream/60">
                <span>{currentCase.title}</span>
                <span>
                  {locale === 'ua' ? 'Потягніть повзунок для порівняння' : 'Drag slider to compare'}
                </span>
              </div>

              <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchMove={(e) => e.touches[0] && handleMove(e.touches[0].clientX)}
                className="relative aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-cream/20 bg-black shadow-lg"
              >
                {/* After Image */}
                <img
                  src={images.after}
                  alt="After"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-cream border border-cream/20 text-xs font-light uppercase tracking-wider">
                  {locale === 'ua' ? 'ПІСЛЯ' : 'AFTER'}
                </div>

                {/* Before Image */}
                <div
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <img
                    src={images.before}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-cream border border-cream/20 text-xs font-light uppercase tracking-wider">
                    {locale === 'ua' ? 'ДО' : 'BEFORE'}
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{ left: `${sliderPosition}%` }}
                  className="absolute top-0 bottom-0 -ml-[1px] w-[2px] bg-cream pointer-events-none z-20"
                />
              </div>

              {/* Preset buttons */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setSliderPosition(100)}
                    className="px-3 py-1 text-xs rounded-md bg-cream/10 hover:bg-cream/20 text-cream/80 cursor-pointer"
                  >
                    100% До
                  </button>
                  <button
                    type="button"
                    onClick={() => setSliderPosition(50)}
                    className="px-3 py-1 text-xs rounded-md bg-cream/10 hover:bg-cream/20 text-cream/80 cursor-pointer"
                  >
                    50 / 50
                  </button>
                  <button
                    type="button"
                    onClick={() => setSliderPosition(0)}
                    className="px-3 py-1 text-xs rounded-md bg-cream/10 hover:bg-cream/20 text-cream/80 cursor-pointer"
                  >
                    100% Після
                  </button>
                </div>
                <span className="text-xs text-cream/50 font-mono">
                  {Math.round(sliderPosition)}% / {100 - Math.round(sliderPosition)}%
                </span>
              </div>
            </div>

            {/* Doctor Note */}
            <div className="p-5 rounded-xl bg-cream/5 border border-cream/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-cream/60 pb-2 border-b border-cream/10">
                <span>{locale === 'ua' ? 'Клінічна нотатка лікаря' : 'Clinical Doctor Note'}</span>
                <span>{locale === 'ua' ? 'Тетяна Бибіс' : 'Dr. Tetiana Bybis'}</span>
              </div>
              <p className="text-sm font-light text-cream/80 leading-relaxed">
                {currentCase.solution}
              </p>
              <div className="flex items-center space-x-4 text-xs text-cream/50 pt-1">
                <span>{locale === 'ua' ? 'Візити:' : 'Visits:'} {currentCase.visits}</span>
                <span>•</span>
                <span>{locale === 'ua' ? 'Тривалість:' : 'Duration:'} {currentCase.duration}</span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-8 border-t border-cream/15">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-cream text-black text-xs uppercase tracking-[0.15em] font-medium hover:bg-cream/90 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{locale === 'ua' ? 'Записатися на консультацію' : 'Book Consultation'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
