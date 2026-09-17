'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Award, Heart, Shield, ArrowRight } from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';

export const AboutDoctor: React.FC = () => {
  const { t, locale } = useI18n();

  const values = [
    {
      icon: Heart,
      title: locale === 'ua' ? 'Турбота як про рідних' : 'Care like family',
      desc: locale === 'ua' ? 'Кожен візит починається зі щирої бесіди, уважного вислуховування та комфортної атмосфери.' : 'Every visit begins with sincere conversation, careful listening and a cozy atmosphere.',
    },
    {
      icon: Shield,
      title: locale === 'ua' ? 'Безкомпромісна безпека' : 'Uncompromising safety',
      desc: locale === 'ua' ? 'Сучасні автоклави класу B, потрійна стерилізація інструментів та одноразові витратні матеріали.' : 'Class B modern autoclaves, triple instrument sterilization and disposable consumables.',
    },
    {
      icon: Award,
      title: locale === 'ua' ? '15+ років експертизи' : '15+ years expertise',
      desc: locale === 'ua' ? 'Безперервне навчання у провідних фахівців Європи та застосування сучасних методик лікування.' : 'Continuous learning from leading European experts and adoption of modern treatment protocols.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#FBF9F5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Founder Photo & Bio Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative background shape */}
              <div className="absolute -top-6 -left-6 w-full h-full rounded-3xl bg-[#EADFCF]/50 -z-10 -rotate-2" />

              {/* Main Photo Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#FFFFFF] p-2 border border-[#EADFCF]">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#2D241E]/10">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
                    alt={t.about.founderName}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/80 via-transparent to-transparent" />

                  {/* Overlay Name */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
                      {t.about.founderRole}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white mt-1">
                      {t.about.founderName}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Instagram Floating Tag */}
              <a
                href="https://www.instagram.com/famiglia_2022"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-5 right-4 inline-flex items-center space-x-2.5 px-5 py-3 rounded-full bg-[#FFFFFF] border border-[#EADFCF] shadow-lg hover:shadow-xl hover:scale-105 transition-all text-[#2D241E] cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] flex items-center justify-center text-white">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold tracking-tight">@famiglia_2022</span>
              </a>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F6F2EA] border border-[#EADFCF] text-xs font-semibold uppercase tracking-wider text-[#6E6259] w-fit">
              <span>{locale === 'ua' ? 'Про затишок та покликання' : 'About comfort & purpose'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2D241E] leading-[1.2] tracking-tight">
              {t.about.title}
            </h2>

            {/* Founder Quote Card */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border-l-4 border-[#C5A880] border-y border-r border-[#EADFCF] shadow-sm">
              <p className="text-base sm:text-lg font-serif italic text-[#2D241E] leading-relaxed">
                «{t.about.quote}»
              </p>
              <p className="text-xs font-semibold text-[#C5A880] mt-3 uppercase tracking-wider">
                — {t.about.founderName}, {locale === 'ua' ? 'засновниця клініки' : 'clinic founder'}
              </p>
            </div>

            {/* Body Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[#6E6259] leading-relaxed font-light">
              <p>{t.about.descP1}</p>
              <p>{t.about.descP2}</p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#FFFFFF] border border-[#EADFCF]/70 shadow-2xs"
                  >
                    <Icon className="w-5 h-5 text-[#C5A880] mb-2" />
                    <h4 className="text-xs font-bold text-[#2D241E] uppercase tracking-wider mb-1">
                      {v.title}
                    </h4>
                    <p className="text-[12px] text-[#6E6259] leading-normal font-light">
                      {v.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Direct Booking CTA */}
            <div className="pt-2">
              <a
                href="#booking"
                className="inline-flex items-center space-x-2 text-sm font-semibold text-[#2D241E] hover:text-[#C5A880] transition-colors cursor-pointer group"
              >
                <span>{locale === 'ua' ? 'Познайомитися з нами на консультації' : 'Meet us at a consultation'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
