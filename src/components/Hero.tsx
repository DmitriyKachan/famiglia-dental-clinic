'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { MapPin, ArrowRight, Star, Award, HeartHandshake } from 'lucide-react';
import { ShimmerButton } from '@/components/magicui/ShimmerButton';
import { NumberTicker } from '@/components/magicui/NumberTicker';
import { BlurFade } from '@/components/magicui/BlurFade';

export const Hero: React.FC = () => {
  const { t, locale } = useI18n();
  const [imgSrc, setImgSrc] = useState('/tetiana_bybis.jpg');

  return (
    <section className="relative pt-10 pb-12 sm:pt-12 md:pt-14 md:pb-20 overflow-hidden bg-brand-base text-brand-dark">
      {/* Ambient Warm Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-brand-gold/10 via-brand-beige/40 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ========================================================================= */}
          {/* Left Column: Warm Brand Copy, Heading, CTAs & Metrics */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8 text-left">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-surface border border-brand-border text-xs sm:text-sm font-medium text-brand-muted shadow-xs">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
              <span>{t.hero.badge}</span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-dark leading-[1.14] tracking-tight">
              {t.hero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-brand-muted leading-relaxed max-w-2xl font-light">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <a href="#booking" className="inline-block cursor-pointer">
                <ShimmerButton
                  className="w-full sm:w-auto px-8 py-4 text-base font-semibold shadow-md hover:shadow-lg"
                  shimmerColor="#C5A880"
                  background="#1E1B18"
                >
                  <span>{t.hero.ctaBooking}</span>
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </ShimmerButton>
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center px-7 py-4 text-base font-medium text-brand-dark bg-brand-surface border border-brand-border hover:bg-brand-base rounded-full shadow-xs transition-all duration-300 cursor-pointer text-center"
              >
                <span>{t.hero.ctaServices}</span>
              </a>
            </div>

            {/* Trust Metrics Row */}
            <div className="pt-6 sm:pt-8 border-t border-brand-border/80 w-full flex flex-wrap items-center gap-6 sm:gap-10">
              {/* Rating Metric */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-gold shadow-xs">
                  <Star className="w-5 h-5 fill-brand-gold text-brand-gold" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="text-xl font-bold font-serif text-brand-dark">
                      <NumberTicker
                        value={parseFloat(t.hero.ratingValue) || 4.9}
                        decimalPlaces={1}
                      />
                    </span>
                    <span className="text-xs font-semibold text-brand-gold flex items-center gap-0.5">
                      <span>★</span>
                      <span className="text-brand-dark font-medium ml-1">
                        ({t.hero.ratingValue})
                      </span>
                    </span>
                  </div>
                  <span className="text-xs text-brand-muted mt-1 font-medium">
                    {t.hero.ratingCount}
                  </span>
                </div>
              </div>

              {/* Practice Metric */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-gold shadow-xs font-serif font-bold text-base">
                  15+
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-0.5 leading-none text-xl font-bold font-serif text-brand-dark">
                    <NumberTicker value={15} />
                    <span>+</span>
                    <span className="text-sm font-sans font-normal text-brand-muted ml-1.5">
                      {locale === 'ua' ? 'років' : 'years'}
                    </span>
                  </div>
                  <span className="text-xs text-brand-muted mt-1 font-medium">
                    {t.hero.experienceBadge}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Right Column: Dr. Tetiana Bybis Portrait Card & Floating Badges */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 relative flex justify-center">
            <BlurFade delay={0.2} duration={0.6} className="relative w-full max-w-md">
              {/* Warm Ambient Blur behind Card */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-gold/20 via-brand-beige/50 to-brand-gold/10 rounded-3xl blur-2xl opacity-70 -z-10" />

              {/* Portrait Container */}
              <div className="relative rounded-3xl overflow-hidden bg-brand-surface p-3 border border-brand-border shadow-xl">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-brand-base">
                  <img
                    src={imgSrc}
                    alt={t.hero.founderBadge}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onError={() =>
                      setImgSrc(
                        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80'
                      )
                    }
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent pointer-events-none" />

                  {/* Doctor Info Overlay */}
                  <div className="absolute bottom-5 left-5 right-5 text-white text-left">
                    <p className="text-xs uppercase tracking-wider text-brand-gold font-semibold">
                      {t.about.founderRole}
                    </p>
                    <p className="text-xl font-serif font-bold text-white mt-0.5">
                      {t.about.founderName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Founder Badge */}
              <div className="absolute -top-2 -left-4 sm:-left-6 bg-brand-surface/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-brand-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-gold shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-brand-dark leading-snug">
                    {t.hero.founderBadge}
                  </p>
                  <p className="text-[11px] text-brand-muted mt-0.5 font-medium">
                    {t.hero.experienceBadge}
                  </p>
                </div>
              </div>

              {/* Floating Badge 2: Painless Treatment */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-brand-surface/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-brand-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-sage/15 flex items-center justify-center text-brand-sage shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-brand-dark leading-snug">
                    {locale === 'ua'
                      ? 'Безболісне лікування без страху'
                      : 'Painless treatment without fear'}
                  </p>
                  <p className="text-[11px] text-brand-muted mt-0.5 font-medium">
                    {t.trust.painlessTitle}
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
