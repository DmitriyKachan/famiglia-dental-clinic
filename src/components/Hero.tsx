'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Star, ArrowRight, ShieldCheck, MapPin, Heart } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, locale } = useI18n();

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#FBF9F5] via-[#F6F2EA] to-[#FBF9F5]">
      {/* Decorative ambient blurred shapes */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#EADFCF]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EADFCF] shadow-sm">
              <div className="flex text-[#C5A880]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#2D241E]">
                {t.hero.badge}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2D241E] leading-[1.15] tracking-tight">
              {t.hero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#6E6259] leading-relaxed max-w-2xl font-light">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto pt-2">
              <a
                href="#booking"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[#2D241E] hover:bg-[#3D312A] rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <span>{t.hero.ctaBooking}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center px-7 py-4 text-base font-medium text-[#2D241E] bg-[#FFFFFF] hover:bg-[#F6F2EA] border border-[#EADFCF] rounded-full transition-colors cursor-pointer"
              >
                {t.hero.ctaServices}
              </a>
            </div>

            {/* Micro proof tags */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#6E6259]">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>{locale === 'ua' ? '100% стерильність та безпека' : '100% sterile & safe'}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Heart className="w-4 h-4 text-[#C5A880]" />
                <span>{locale === 'ua' ? 'Безболісне лікування' : 'Painless treatment'}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-[#C5A880]" />
                <span>{locale === 'ua' ? 'м. Львів, вул. Бойківська, 2' : 'Lviv, 2 Boikivska St.'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Aesthetic Photo Composition */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Main Visual Frame */}
            <div className="relative w-full max-w-md">
              {/* Decorative background accent border */}
              <div className="absolute -inset-3 rounded-3xl border-2 border-dashed border-[#C5A880]/30 -z-10 rotate-1" />

              {/* Main Photo Card */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#EFE8DD] to-[#DFD3C2] p-1 shadow-xl">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#2D241E]/5">
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
                    alt="Famiglia Dental Clinic Atmosphere"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/70 via-transparent to-transparent" />

                  {/* Caption on image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
                      Famiglia • Львів
                    </p>
                    <p className="text-sm font-serif italic mt-1 text-white/95">
                      «{locale === 'ua' ? 'Творимо здорові та щасливі усмішки кожного дня' : 'Creating healthy and happy smiles every day'}»
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: 15+ years */}
              <div className="absolute -top-4 -left-4 bg-[#FFFFFF] rounded-2xl p-3.5 shadow-lg border border-[#EADFCF] flex items-center space-x-3 animate-pulse-subtle">
                <div className="w-10 h-10 rounded-full bg-[#F6F2EA] flex items-center justify-center text-[#C5A880] font-bold text-sm">
                  15+
                </div>
                <div className="text-left pr-1">
                  <p className="text-[11px] uppercase tracking-wider text-[#6E6259] font-medium">
                    {locale === 'ua' ? 'Клінічний досвід' : 'Experience'}
                  </p>
                  <p className="text-xs font-bold text-[#2D241E]">
                    {locale === 'ua' ? 'Тетяна Бибіс' : 'Tetiana Bybis'}
                  </p>
                </div>
              </div>

              {/* Floating Badge 2: Google & Instagram Rating */}
              <div className="absolute -bottom-5 -right-4 bg-[#FFFFFF] rounded-2xl p-4 shadow-lg border border-[#EADFCF] flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#C5A880] flex items-center justify-center text-white">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div className="text-left">
                  <div className="flex items-center space-x-1">
                    <span className="text-base font-bold text-[#2D241E]">4.9</span>
                    <span className="text-xs text-[#C5A880]">★★★★★</span>
                  </div>
                  <p className="text-[11px] text-[#6E6259]">
                    {locale === 'ua' ? '1 000+ задоволених родин' : '1,000+ happy families'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
