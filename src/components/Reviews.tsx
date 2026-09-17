'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Star, MessageSquareQuote, CheckCircle } from 'lucide-react';
import { BlurFade } from '@/components/magicui/BlurFade';

export const Reviews: React.FC = () => {
  const { t, locale } = useI18n();

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-brand-base text-brand-dark scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurFade delay={0.1} duration={0.6}>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-surface border border-brand-border text-xs font-semibold uppercase tracking-wider text-brand-muted mb-4 shadow-xs">
              <MessageSquareQuote className="w-3.5 h-3.5 text-brand-gold" />
              <span>{locale === 'ua' ? 'Довіра наших пацієнтів' : 'Patient Trust'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-dark tracking-tight">
              {t.reviews.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-light">
              {t.reviews.subtitle}
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {t.reviews.items.map((review, index) => (
              <div
                key={review.id || index}
                className="bg-brand-surface border border-brand-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Rating & Verified Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center space-x-1" aria-label="5 stars">
                      {[...Array(review.rating || 5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-brand-gold fill-brand-gold"
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-brand-base border border-brand-border text-[11px] font-medium text-brand-muted shrink-0">
                      <CheckCircle className="w-3 h-3 text-brand-gold shrink-0" />
                      <span>
                        {locale === 'ua'
                          ? 'Перевірений відгук • Google Maps / Instagram'
                          : 'Verified Review • Google Maps / Instagram'}
                      </span>
                    </div>
                  </div>

                  {/* Procedure / Service Tag */}
                  <div className="mb-3">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-brand-base border border-brand-border text-xs font-medium text-brand-muted">
                      {review.service}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-sm sm:text-base text-brand-dark leading-relaxed font-light italic mb-6">
                    «{review.text || review.comment}»
                  </p>
                </div>

                {/* Author Info & Date */}
                <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-brand-dark">
                      {review.name}
                    </h4>
                    <p className="text-xs text-brand-muted mt-0.5 font-light">
                      {review.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
};
