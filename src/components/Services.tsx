'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import { 
  Sparkles, 
  Smile, 
  Baby, 
  Palette, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight 
} from 'lucide-react';

const serviceIcons = [
  Sparkles,     // therapy
  Smile,        // ortho
  Baby,         // kids
  Palette,      // esthetics
  ShieldCheck,  // surgery
  Zap           // hygiene
];

export const Services: React.FC = () => {
  const { t, locale } = useI18n();

  return (
    <section id="services" className="py-24 bg-[#FBF9F5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F6F2EA] border border-[#EADFCF] text-xs font-semibold uppercase tracking-wider text-[#6E6259] mb-4">
            <span>{locale === 'ua' ? 'Напрямки лікування' : 'Treatment Areas'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2D241E] tracking-tight">
            {t.services.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6E6259] leading-relaxed font-light">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((item, index) => {
            const Icon = serviceIcons[index] || Sparkles;
            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between p-8 rounded-3xl bg-[#FFFFFF] border border-[#EADFCF]/70 hover:border-[#C5A880] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Top Row: Icon & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#F6F2EA] group-hover:bg-[#C5A880] flex items-center justify-center text-[#C5A880] group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#F6F2EA] text-[#2D241E] border border-[#EADFCF]/60">
                      {item.priceFrom}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl font-serif font-bold text-[#2D241E] group-hover:text-[#C5A880] transition-colors mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#6E6259] leading-relaxed font-light mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-4 border-t border-[#EADFCF]/40 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#6E6259]">
                    {locale === 'ua' ? 'Індивідуальний підхід' : 'Individual care'}
                  </span>
                  <a
                    href="#booking"
                    className="inline-flex items-center text-xs font-semibold text-[#2D241E] group-hover:text-[#C5A880] transition-colors cursor-pointer"
                  >
                    <span>{locale === 'ua' ? 'Записатися' : 'Book Now'}</span>
                    <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
