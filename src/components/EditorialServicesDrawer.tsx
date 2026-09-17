'use client';

import React from 'react';
import { X, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface EditorialServicesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onSelectService: (service: string) => void;
}

export const EditorialServicesDrawer: React.FC<EditorialServicesDrawerProps> = ({
  isOpen,
  onClose,
  onMinimize,
  onSelectService,
}) => {
  const { t, locale } = useI18n();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-hn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-xl transition-opacity duration-300"
      />

      {/* Slide-over Panel from Right styled as Apple LiquidGlass Sheet */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10 apple-window-anim">
        <div className="w-screen max-w-2xl apple-glass text-cream border-l border-white/15 shadow-2xl p-6 sm:p-10 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Apple Traffic Lights & Window Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="apple-dot apple-dot-close cursor-pointer"
                  title={locale === 'ua' ? 'Закрити' : 'Close'}
                  aria-label="Close"
                />
                <button
                  type="button"
                  onClick={onMinimize || onClose}
                  className="apple-dot apple-dot-minimize cursor-pointer"
                  title={locale === 'ua' ? 'Згорнути в Dock' : 'Minimize to Dock'}
                  aria-label="Minimize"
                />
                <button
                  type="button"
                  onClick={() => {}}
                  className="apple-dot apple-dot-maximize cursor-default opacity-80"
                  title="Expand"
                  aria-label="Expand"
                />
              </div>

              <div className="text-xs uppercase tracking-[0.2em] text-cream/40 font-light">
                {locale === 'ua' ? 'Напрямки лікування • Famiglia' : 'Clinical Portfolio • Famiglia'}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-cream/50 hover:text-cream transition-colors cursor-pointer"
                aria-label="Close services sheet"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Title */}
            <div className="mt-6">
              <h2 className="text-2xl sm:text-3xl font-light text-cream">
                {t.services.title}
              </h2>
              <p className="mt-2 text-sm text-cream/60 font-light">
                {t.services.subtitle}
              </p>
            </div>

            {/* Services List */}
            <div className="divide-y divide-cream/10 mt-6">
              {t.services.items.map((srv) => (
                <div key={srv.id} className="py-6 flex flex-col space-y-3 group">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-light text-cream group-hover:text-cream/80 transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-sm font-light text-cream/60 mt-1 leading-relaxed max-w-lg">
                        {srv.desc}
                      </p>
                    </div>
                    <div className="text-right shrink-0 pl-4">
                      <span className="text-xs uppercase text-cream/40 block font-light">
                        {locale === 'ua' ? 'Вартість' : 'Price'}
                      </span>
                      <span className="text-base font-normal text-cream">
                        {srv.priceFrom}
                      </span>
                    </div>
                  </div>

                  {/* Service perks */}
                  {srv.features && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {srv.features.map((f, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded-full bg-cream/5 border border-cream/10 text-cream/70 font-light"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectService(srv.title);
                      }}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-cream hover:underline cursor-pointer"
                    >
                      <span>{locale === 'ua' ? 'Записатися на прийом' : 'Book this treatment'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-8 border-t border-cream/15 flex items-center justify-between text-xs text-cream/50">
            <span>Famiglia Dental • м. Львів, вул. Бойківська, 2</span>
            <span>+380 96 088 9889</span>
          </div>
        </div>
      </div>
    </div>
  );
};
