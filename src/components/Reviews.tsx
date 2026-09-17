'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Star, MessageSquareQuote, CheckCircle } from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';

export const Reviews: React.FC = () => {
  const { t, locale } = useI18n();

  return (
    <section id="reviews" className="py-24 bg-[#FFFFFF] border-b border-[#EADFCF]/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#F6F2EA] border border-[#EADFCF] text-xs font-semibold uppercase tracking-wider text-[#6E6259] mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{locale === 'ua' ? 'Довіра наших пацієнтів' : 'Patient Trust'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2D241E] tracking-tight">
            {t.reviews.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6E6259] leading-relaxed font-light">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.reviews.items.map((review, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-8 rounded-3xl bg-[#FBF9F5] border border-[#EADFCF]/80 hover:border-[#C5A880] shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* Rating & Platform */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex text-[#C5A880]">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-[#6E6259] bg-[#FFFFFF] px-2.5 py-1 rounded-full border border-[#EADFCF]/60">
                    <InstagramIcon className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Instagram</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-[#2D241E] leading-relaxed font-light italic mb-6">
                  «{review.text}»
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#EADFCF]/60 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#2D241E]">
                    {review.name}
                  </h4>
                  <p className="text-xs text-[#6E6259] font-light">
                    {review.date}
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <CheckCircle className="w-3 h-3" />
                  <span>{locale === 'ua' ? 'Перевірено' : 'Verified'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
