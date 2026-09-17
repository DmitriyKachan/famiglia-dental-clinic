'use client';

import React from 'react';
import { Award, ShieldCheck, Microscope, Star, Sparkles, ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { NumberTicker } from './magicui/NumberTicker';
import { ShineBorder } from './magicui/ShineBorder';
import { BlurFade } from './magicui/BlurFade';

export const BentoTrust: React.FC = () => {
  const { t, locale } = useI18n();

  return (
    <section className="relative py-24 sm:py-32 bg-[#0d0d0d] text-cream border-t border-cream/10 overflow-hidden font-hn">
      {/* Ambient background light orb */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <BlurFade delay={0.1}>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cream/5 border border-cream/15 text-xs tracking-wider uppercase text-brand-gold mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>{locale === 'ua' ? 'Стандарти Famiglia' : 'Famiglia Standards'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-cream">
              {locale === 'ua'
                ? 'Клінічна досконалість без компромісів'
                : 'Clinical Excellence Without Compromise'}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-cream/60 font-light leading-relaxed">
              {locale === 'ua'
                ? 'Європейські протоколи, німецька оптика та максимальне збереження живої тканини зуба.'
                : 'European protocols, German Carl Zeiss optics, and maximum preservation of natural tooth vitality.'}
            </p>
          </BlurFade>
        </div>

        {/* Apple LiquidGlass Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: 15+ Years (col 12 on mobile, 7 on desktop) */}
          <div className="md:col-span-7 relative group">
            <div className="apple-glass-card rounded-3xl p-8 sm:p-10 h-full flex flex-col justify-between relative overflow-hidden">
              <ShineBorder borderWidth={1} duration={12} shineColor={['#C5A880', '#ffffff', '#C5A880']} />
              
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cream/10 border border-cream/20 flex items-center justify-center text-brand-gold">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-cream/40 font-light">
                  {locale === 'ua' ? 'Досвід лікаря' : 'Experience'}
                </span>
              </div>

              <div className="my-8">
                <div className="flex items-baseline space-x-1">
                  <span className="text-5xl sm:text-6xl font-light text-cream">
                    <NumberTicker value={15} />
                  </span>
                  <span className="text-3xl sm:text-4xl text-brand-gold font-light">+</span>
                  <span className="text-xl text-cream/60 ml-2 font-light">
                    {locale === 'ua' ? 'років практики' : 'years'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-cream mt-3">
                  {locale === 'ua' ? 'Тетяна Бибіс • Головний лікар' : 'Dr. Tetiana Bybis • Chief Doctor'}
                </h3>
                <p className="mt-2 text-sm text-cream/60 font-light leading-relaxed max-w-lg">
                  {locale === 'ua'
                    ? 'Спеціалізується на комплексній естетичній реабілітації, художніх реставраціях та ювелірній роботі з керамікою.'
                    : 'Specialized in comprehensive aesthetic rehabilitation, artistic restorations, and micro-ceramic veneers.'}
                </p>
              </div>

              <div className="pt-4 border-t border-cream/10 flex items-center justify-between text-xs text-cream/50">
                <span>{locale === 'ua' ? 'Понад 1 000 щасливих усмішок' : 'Over 1,000 satisfied patients'}</span>
                <span className="text-brand-gold font-medium">Famiglia Clinic</span>
              </div>
            </div>
          </div>

          {/* Card 2: 5.0 Rating (col 12 on mobile, 5 on desktop) */}
          <div className="md:col-span-5 relative group">
            <div className="apple-glass-card rounded-3xl p-8 sm:p-10 h-full flex flex-col justify-between relative overflow-hidden">
              <ShineBorder borderWidth={1} duration={14} shineColor={['#C5A880', '#FCD34D', '#C5A880']} />

              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cream/10 border border-cream/20 flex items-center justify-center text-amber-300">
                  <Star className="w-6 h-6 fill-amber-300" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-cream/40 font-light">
                  Google & Patients
                </span>
              </div>

              <div className="my-8">
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl sm:text-6xl font-light text-cream">5.0</span>
                  <div className="text-amber-300 text-sm tracking-widest">★★★★★</div>
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-cream mt-3">
                  {locale === 'ua' ? '100% задоволених пацієнтів' : '100% Positive Reviews'}
                </h3>
                <p className="mt-2 text-sm text-cream/60 font-light leading-relaxed">
                  {locale === 'ua'
                    ? 'Турботливе ставлення, тепла домашня атмосфера та лікування абсолютно без страху і болю.'
                    : 'Empathetic care, peaceful atmosphere, and treatment completely free of stress or pain.'}
                </p>
              </div>

              <div className="pt-4 border-t border-cream/10 flex items-center justify-between text-xs text-cream/50">
                <span>{locale === 'ua' ? 'Відгуки у Google' : 'Google Reviews'}</span>
                <span className="text-cream/80">140+ рекомендацій</span>
              </div>
            </div>
          </div>

          {/* Card 3: 20x Carl Zeiss Microscope (col 12 on mobile, 6 on desktop) */}
          <div className="md:col-span-6 relative group">
            <div className="apple-glass-card rounded-3xl p-8 sm:p-10 h-full flex flex-col justify-between relative overflow-hidden">
              <ShineBorder borderWidth={1} duration={16} shineColor="#C5A880" />

              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cream/10 border border-cream/20 flex items-center justify-center text-brand-gold">
                  <Microscope className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-cream/40 font-light">
                  Optics 20x
                </span>
              </div>

              <div className="my-6">
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl sm:text-5xl font-light text-cream">20×</span>
                  <span className="text-sm text-cream/60 ml-2 font-light">
                    {locale === 'ua' ? 'збільшення' : 'magnification'}
                  </span>
                </div>
                <h3 className="text-xl font-light text-cream mt-3">
                  {locale === 'ua' ? 'Дентальний мікроскоп Carl Zeiss' : 'Carl Zeiss Dental Microscope'}
                </h3>
                <p className="mt-2 text-sm text-cream/60 font-light leading-relaxed">
                  {locale === 'ua'
                    ? 'Дозволяє виявляти мікротріщини, які не бачить неозброєне око, і рятувати навіть найскладніші зуби.'
                    : 'Detects microscopic root fractures, preserving natural teeth from unnecessary extractions.'}
                </p>
              </div>

              <div className="pt-4 border-t border-cream/10 text-xs text-cream/50">
                {locale === 'ua' ? 'Збереження живих тканин' : 'Maximum tooth vitality preservation'}
              </div>
            </div>
          </div>

          {/* Card 4: 100% Class B Sterility (col 12 on mobile, 6 on desktop) */}
          <div className="md:col-span-6 relative group">
            <div className="apple-glass-card rounded-3xl p-8 sm:p-10 h-full flex flex-col justify-between relative overflow-hidden">
              <ShineBorder borderWidth={1} duration={16} shineColor="#C5A880" />

              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cream/10 border border-cream/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-cream/40 font-light">
                  Safety Protocol
                </span>
              </div>

              <div className="my-6">
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl sm:text-5xl font-light text-cream">100%</span>
                  <span className="text-sm text-cream/60 ml-2 font-light">
                    {locale === 'ua' ? 'безпека' : 'sterile'}
                  </span>
                </div>
                <h3 className="text-xl font-light text-cream mt-3">
                  {locale === 'ua' ? 'Автоклавування Класу B (Melag)' : 'Class B Autoclaving (Melag)'}
                </h3>
                <p className="mt-2 text-sm text-cream/60 font-light leading-relaxed">
                  {locale === 'ua'
                    ? 'Індивідуальні крафт-пакети, відкриття безпосередньо при пацієнті та багаторівневий хімічний контроль.'
                    : 'Individual sterile pouches opened directly in front of the patient with multi-stage chemical verification.'}
                </p>
              </div>

              <div className="pt-4 border-t border-cream/10 text-xs text-cream/50">
                {locale === 'ua' ? 'Швейцарські стандарти гігієни' : 'Swiss hygiene protocols'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
