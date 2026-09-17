'use client';

import React from 'react';
import { X, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface EditorialServicesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (service: string) => void;
}

export const EditorialServicesDrawer: React.FC<EditorialServicesDrawerProps> = ({
  isOpen,
  onClose,
  onSelectService,
}) => {
  const { t, locale } = useI18n();

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
        <div className="w-screen max-w-2xl bg-[#141414] text-cream border-l border-cream/20 shadow-2xl p-6 sm:p-10 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-cream/15">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-cream/50">
                  {locale === 'ua' ? 'Напрямки лікування' : 'Clinical Directions'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-cream mt-1">
                  {t.services.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-cream hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Close services sheet"
              >
                <X size={26} strokeWidth={1.5} />
              </button>
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
