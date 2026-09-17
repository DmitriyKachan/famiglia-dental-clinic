'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Heart, ShieldCheck, Home, Sparkles, ArrowRight } from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';
import { BlurFade } from '@/components/magicui/BlurFade';
import { getAssetPath } from '@/lib/basePath';

export const AboutDoctor: React.FC = () => {
  const { t, locale } = useI18n();

  const clinicValues = [
    {
      icon: Heart,
      title: locale === 'ua' ? '100% Безболісність та комфорт' : '100% Painless & Comfort',
      desc:
        locale === 'ua'
          ? 'Компʼютерна анестезія STA без оніміння, максимальна делікатність та спокійна атмосфера.'
          : 'STA computer-controlled anesthesia without numbness, gentle approach, and complete peace of mind.',
    },
    {
      icon: ShieldCheck,
      title:
        locale === 'ua'
          ? 'Європейські протоколи та стерильність класу B'
          : 'European Protocols & Class B Sterility',
      desc:
        locale === 'ua'
          ? 'Багаторівнева стерилізація Melag, індивідуальні крафт-пакети та німецька оптика Carl Zeiss.'
          : 'Multi-stage Melag autoclaving, sealed individual craft pouches, and Carl Zeiss precision optics.',
    },
    {
      icon: Home,
      title:
        locale === 'ua'
          ? 'Затишок для всієї родини на вул. Бойківській, 2'
          : 'Cozy Atmosphere for the Entire Family at 2 Boikivska St',
      desc:
        locale === 'ua'
          ? 'Затишний простір біля парку, адаптаційні візити для дітей без сліз та турбота про кожного.'
          : 'Tranquil space near park greenery, tear-free pediatric dental care, and care for every family member.',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-brand-base text-brand-dark scroll-mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurFade delay={0.1} duration={0.6}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Visual Column: Doctor & Clinic Space Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Doctor Photo Card */}
              <div className="relative rounded-3xl overflow-hidden bg-brand-surface p-2.5 border border-brand-border shadow-md">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-brand-base">
                  <img
                    src={getAssetPath('/tetiana_bybis.jpg')}
                    alt={t.about.founderName}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/20 to-transparent" />

                  {/* Doctor Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block px-3 py-1 rounded-full bg-brand-gold text-[11px] font-semibold tracking-wider uppercase text-brand-dark mb-2 shadow-xs">
                      {locale === 'ua' ? '15+ років практики' : '15+ years practice'}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                      {t.about.founderName}
                    </h3>
                    <p className="text-xs text-[#EADFCF] mt-1 font-sans">
                      {t.about.founderRole}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Warm Narrative & Clinic Values */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              {/* Header Badge & Title */}
              <div>
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-surface border border-brand-border text-xs font-semibold uppercase tracking-wider text-brand-muted mb-3 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{t.about.title}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-dark tracking-tight leading-[1.2]">
                  {t.about.founderName}
                </h2>
                <p className="text-brand-gold font-serif text-lg sm:text-xl mt-1 font-medium">
                  {t.about.founderRole}
                </p>
              </div>

              {/* Founder Quote Card */}
              <div className="p-6 rounded-2xl bg-brand-surface border-l-4 border-brand-gold border-y border-r border-brand-border shadow-sm">
                <p className="text-base sm:text-lg font-serif italic text-brand-dark leading-relaxed">
                  {t.about.quote}
                </p>
                <p className="text-xs font-semibold text-brand-gold mt-3 uppercase tracking-wider">
                  — {t.about.founderName}, {t.about.founderRole}
                </p>
              </div>

              {/* Bio Paragraphs */}
              <div className="space-y-4 text-brand-muted text-sm sm:text-base leading-relaxed font-normal">
                <p>{t.about.bioP1}</p>
                <p>{t.about.bioP2}</p>
              </div>

              {/* 3 Clinic Values Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {clinicValues.map((val, idx) => {
                  const Icon = val.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-brand-surface border border-brand-border shadow-xs hover:border-brand-gold/60 transition-all duration-200 flex flex-col"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-base flex items-center justify-center text-brand-gold mb-3 border border-brand-border shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-brand-dark font-serif mb-2 leading-snug">
                        {val.title}
                      </h4>
                      <p className="text-xs text-brand-muted leading-relaxed font-light mt-auto">
                        {val.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Action Link to Consultation */}
              <div className="pt-2">
                <a
                  href="#booking"
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-dark hover:text-brand-gold transition-colors cursor-pointer group"
                >
                  <span>{locale === 'ua' ? 'Познайомитися з нами на консультації' : 'Meet us at a consultation'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-gold" />
                </a>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};
