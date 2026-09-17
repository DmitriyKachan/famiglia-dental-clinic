'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Sparkles, ArrowRight, CheckCircle2, Clock, ShieldCheck, Heart, Star } from 'lucide-react';
import { BlurFade } from './magicui/BlurFade';

interface GoalOption {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  tagUa: string;
  tagEn: string;
  titleUa: string;
  titleEn: string;
  procedureUa: string;
  procedureEn: string;
  descUa: string;
  descEn: string;
  highlightsUa: string[];
  highlightsEn: string[];
  durationUa: string;
  durationEn: string;
  priceFrom: string;
  serviceKey: string;
}

const GOALS: GoalOption[] = [
  {
    id: 'veneers',
    icon: Sparkles,
    tagUa: 'Естетика & Престиж',
    tagEn: 'Aesthetics & Prestige',
    titleUa: 'Бездоганна форма та голлівудська усмішка',
    titleEn: 'Flawless Smile Architecture & Veneers',
    procedureUa: 'Керамічні ультратонкі вініри E.max',
    procedureEn: 'Ultra-thin E.max Ceramic Veneers',
    descUa: 'Ювелірне мікро-препарування (0.3 мм). Індивідуальне 3D-моделювання кольору та прозорості за швейцарськими протоколами.',
    descEn: 'Jewelry-grade 0.3mm micro-preparation. Digital 3D custom shade and translucency mapping under Swiss protocols.',
    highlightsUa: ['Без спилювання живих тканин', 'Довічна стійкість кольору', 'Природний блиск при будь-якому світлі'],
    highlightsEn: ['Zero unnecessary tooth reduction', 'Lifetime color stability', 'Natural light refraction in all lighting'],
    durationUa: '2–3 візити',
    durationEn: '2–3 visits',
    priceFrom: 'від 12 000 ₴',
    serviceKey: 'Керамічні вініри',
  },
  {
    id: 'whitening',
    icon: Star,
    tagUa: 'Миттєве сяйво',
    tagEn: 'Instant Radiance',
    titleUa: 'Освітлення усмішки на 6–8 тонів за 1 годину',
    titleEn: '6–8 Shades Whiter in a Single 60-Min Session',
    procedureUa: 'Холодне фотодинамічне відбілювання Beyond II',
    procedureEn: 'Cold Photodynamic Beyond II Whitening',
    descUa: 'Абсолютна безпека для емалі без нагріву тканин. Включає ремінералізуючу терапію та захист від чутливості.',
    descEn: 'Zero heat damage to enamel. Includes protective remineralization therapy and sensitivity shields.',
    highlightsUa: ['100% захист чутливості зубів', 'Результат видно одразу в дзеркалі', 'Стійкість ефекту до 2 років'],
    highlightsEn: ['100% tooth sensitivity protection', 'Instant visible result in the mirror', 'Lasts up to 2 years'],
    durationUa: '60 хвилин',
    durationEn: '60 minutes',
    priceFrom: 'від 4 500 ₴',
    serviceKey: 'Професійна гігієна та відбілювання',
  },
  {
    id: 'microscope',
    icon: ShieldCheck,
    tagUa: 'Збереження & Комфорт',
    tagEn: 'Preservation & Comfort',
    titleUa: 'Лікування зубів без болю під мікроскопом',
    titleEn: 'Microscopic Painless Treatment & Restoration',
    procedureUa: 'Терапія та лікування каналів під збільшенням 20x',
    procedureEn: 'Therapy & Root Canal Treatment under 20x Zoom',
    descUa: 'Німецька оптика дозволяє бачити мікротріщини та зберегти навіть ті зуби, які в інших клініках пропонують видалити.',
    descEn: 'German high-precision optics expose micro-fractures, saving natural teeth from unnecessary extractions.',
    highlightsUa: ['Компʼютерна безболісна анестезія', 'Збереження природного зуба', 'Анатомічна художня реставрація'],
    highlightsEn: ['Gentle computer-guided anesthesia', 'Natural tooth preservation', 'Artistic biomimetic restoration'],
    durationUa: 'від 45 хвилин',
    durationEn: 'from 45 mins',
    priceFrom: 'від 1 800 ₴',
    serviceKey: 'Терапевтична стоматологія',
  },
  {
    id: 'kids',
    icon: Heart,
    tagUa: 'Турбота про дітей',
    tagEn: 'Gentle Pediatric Care',
    titleUa: 'Прийом дитини без сліз, стресу та страху',
    titleEn: 'Stress-Free Pediatric Visit with Zero Tears',
    procedureUa: 'Адаптаційна дитяча стоматологія з подарунками',
    procedureEn: 'Gentle Play-Based Adaptation & Treatment',
    descUa: 'Знайомство у форматі гри, улюблені мультфільми над кріслом та лагідне ставлення лікарів формують любов до догляду за зубами.',
    descEn: 'Playful introduction, ceiling cartoons, and warm empathetic doctors ensure kids love visiting the dentist.',
    highlightsUa: ['Ігрова адаптація без примусу', 'Подарунок кожному сміливцю', 'Безболісне знеболення з фруктовим смаком'],
    highlightsEn: ['Non-coercive gentle adaptation', 'Prize box for every brave kid', 'Fruit-flavored painless numbing gels'],
    durationUa: '30–45 хвилин',
    durationEn: '30–45 mins',
    priceFrom: 'від 900 ₴',
    serviceKey: 'Дитяча стоматологія',
  },
];

export const SmileMatcher: React.FC = () => {
  const { locale } = useI18n();
  const [selectedId, setSelectedId] = useState<string>('veneers');

  const selected = GOALS.find((g) => g.id === selectedId) || GOALS[0];
  const Icon = selected.icon;

  const handleBookSelected = () => {
    if (typeof window !== 'undefined') {
      const select = document.querySelector<HTMLSelectElement>('#booking select');
      if (select) {
        select.value = selected.serviceKey;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative py-16 sm:py-24 bg-brand-surface border-b border-brand-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <BlurFade delay={0.05}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-base border border-brand-border text-xs font-semibold uppercase tracking-wider text-brand-gold mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>{locale === 'ua' ? 'ШВИДКИЙ ВИБІР РІШЕННЯ' : 'EXPRESS SMILE SELECTOR'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-brand-dark">
              {locale === 'ua' ? 'Яка ваша мета сьогодні?' : 'What is your main dental goal today?'}
            </h2>
            <p className="mt-3 text-base text-brand-muted font-light">
              {locale === 'ua'
                ? 'Оберіть пріоритет — отримайте рекомендацію лікаря, терміни та орієнтовну вартість в один дотик.'
                : 'Select your priority to view doctor recommendations, timing, and transparent pricing instantly.'}
            </p>
          </div>

          {/* 4 Interactive Goal Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
            {GOALS.map((goal) => {
              const GoalIcon = goal.icon;
              const isSelected = goal.id === selectedId;
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setSelectedId(goal.id)}
                  className={`inline-flex items-center space-x-2 px-4 sm:px-5 py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-brand-dark text-white shadow-md scale-102 ring-2 ring-brand-gold/30'
                      : 'bg-brand-base text-brand-muted hover:text-brand-dark hover:bg-stone-200/60 border border-brand-border/80'
                  }`}
                >
                  <GoalIcon className={`w-4 h-4 ${isSelected ? 'text-brand-gold' : 'text-brand-muted'}`} />
                  <span>{locale === 'ua' ? goal.tagUa : goal.tagEn}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Liquid Glass Matcher Card */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-brand-base via-white to-brand-base/60 border border-brand-border/80 p-6 sm:p-10 shadow-[0_12px_36px_rgba(45,36,30,0.05)] backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Column: Solution description & perks */}
              <div className="md:col-span-8 space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold text-xs font-semibold">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{locale === 'ua' ? selected.procedureUa : selected.procedureEn}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark tracking-tight">
                  {locale === 'ua' ? selected.titleUa : selected.titleEn}
                </h3>

                <p className="text-sm text-brand-muted leading-relaxed">
                  {locale === 'ua' ? selected.descUa : selected.descEn}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {(locale === 'ua' ? selected.highlightsUa : selected.highlightsEn).map((hl, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs font-medium text-brand-dark">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Pricing & Action */}
              <div className="md:col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-white border border-brand-border shadow-xs space-y-5">
                <div>
                  <div className="flex items-center space-x-1.5 text-xs text-brand-muted mb-1">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{locale === 'ua' ? 'Орієнтовний час:' : 'Est. time:'}</span>
                    <span className="font-semibold text-brand-dark">
                      {locale === 'ua' ? selected.durationUa : selected.durationEn}
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-[11px] uppercase tracking-wider text-brand-muted block font-medium">
                      {locale === 'ua' ? 'Орієнтовна вартість' : 'Estimated price'}
                    </span>
                    <span className="text-2xl font-bold font-sans text-brand-dark">
                      {selected.priceFrom}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleBookSelected}
                  className="inline-flex items-center justify-center space-x-2 w-full py-3.5 px-4 rounded-xl bg-brand-dark text-white text-xs sm:text-sm font-semibold hover:bg-stone-800 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>{locale === 'ua' ? 'Обрати це лікування' : 'Select this treatment'}</span>
                  <ArrowRight className="w-4 h-4 text-brand-gold" />
                </button>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};
