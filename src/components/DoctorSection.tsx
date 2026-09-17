'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Heart, ShieldCheck, Microscope, Award, ArrowRight } from 'lucide-react';
import { getAssetPath } from '@/lib/basePath';
import { ShineBorder } from './magicui/ShineBorder';

interface DoctorSectionProps {
  onOpenBooking: () => void;
}

export const DoctorSection: React.FC<DoctorSectionProps> = ({ onOpenBooking }) => {
  const { t, locale } = useI18n();

  return (
    <section id="doctor" className="relative py-28 sm:py-36 bg-[#0d0d0d] text-cream overflow-hidden font-hn border-t border-white/10">
      {/* Background glow orb */}
      <div
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Doctor Portrait Card with Apple LiquidGlass styling */}
          <div className="lg:col-span-5 relative group">
            <div className="apple-glass rounded-3xl p-3 sm:p-4 border border-white/15 overflow-hidden shadow-2xl relative">
              <ShineBorder borderWidth={1} duration={14} shineColor={['#C5A880', '#ffffff', '#C5A880']} />

              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black/60">
                <img
                  src={getAssetPath('/tetiana_bybis.jpg')}
                  alt={t.about.founderName}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Floating LiquidGlass Credential Badge */}
                <div className="absolute bottom-4 left-4 right-4 apple-glass rounded-xl p-3.5 border border-white/20 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-brand-gold font-light">
                        {locale === 'ua' ? '15+ років досвіду' : '15+ Years Experience'}
                      </div>
                      <div className="text-sm font-light text-white mt-0.5">
                        {t.about.founderName}
                      </div>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-cream/10 border border-cream/20 text-cream/80">
                      Carl Zeiss Specialist
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Biography & Philosophy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cream/5 border border-cream/15 text-xs tracking-wider uppercase text-brand-gold mb-4 backdrop-blur-md">
                <Award className="w-3.5 h-3.5 text-brand-gold" />
                <span>{locale === 'ua' ? 'Головний лікар & Засновниця' : 'Chief Doctor & Founder'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-cream">
                {t.about.founderName}
              </h2>
              <p className="mt-2 text-base text-brand-gold font-light">
                {t.about.founderRole}
              </p>
            </div>

            {/* Apple LiquidGlass Quote Card */}
            <div className="apple-glass-card rounded-2xl p-6 sm:p-7 border border-white/15 relative">
              <p className="text-base sm:text-lg text-cream/90 font-light italic leading-relaxed">
                {locale === 'ua'
                  ? '«Усмішка не повинна виглядати штучною. Наша філософія — біоміметична точність, збереження живих тканин зуба та абсолютний психологічний комфорт пацієнта».'
                  : '“A smile should never appear artificial. Our philosophy is biomimetic precision, preserving living tooth structure, and complete emotional comfort for every patient.”'}
              </p>
            </div>

            {/* 3 Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="apple-glass rounded-2xl p-4 border border-white/10">
                <Microscope className="w-5 h-5 text-brand-gold mb-2" />
                <h4 className="text-xs uppercase tracking-wider text-cream font-medium">
                  {locale === 'ua' ? 'Мікроскоп 20x' : '20x Microscope'}
                </h4>
                <p className="text-xs text-cream/60 font-light mt-1">
                  {locale === 'ua' ? 'Ювелірна точність крайового прилягання' : 'Precision margins'}
                </p>
              </div>

              <div className="apple-glass rounded-2xl p-4 border border-white/10">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-xs uppercase tracking-wider text-cream font-medium">
                  {locale === 'ua' ? 'Клас B Melag' : 'Class B Melag'}
                </h4>
                <p className="text-xs text-cream/60 font-light mt-1">
                  {locale === 'ua' ? '100% стерильність крафт-пакетів' : '100% sterile protocols'}
                </p>
              </div>

              <div className="apple-glass rounded-2xl p-4 border border-white/10">
                <Heart className="w-5 h-5 text-amber-300 mb-2" />
                <h4 className="text-xs uppercase tracking-wider text-cream font-medium">
                  {locale === 'ua' ? 'STA Анестезія' : 'STA Anesthesia'}
                </h4>
                <p className="text-xs text-cream/60 font-light mt-1">
                  {locale === 'ua' ? 'Компʼютерне знеболення без оніміння' : 'Comfort without numbness'}
                </p>
              </div>
            </div>

            {/* Consultation CTA */}
            <div className="pt-2 flex items-center space-x-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-full bg-cream text-black text-xs uppercase tracking-wider font-medium hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all cursor-pointer flex items-center space-x-2"
              >
                <span>{locale === 'ua' ? 'Консультація з Тетяною Бибіс' : 'Consult with Dr. Bybis'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
