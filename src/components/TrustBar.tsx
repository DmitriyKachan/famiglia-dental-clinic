'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Award, ShieldCheck, Smile, Sparkles } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const { t } = useI18n();

  const trustItems = [
    {
      icon: Award,
      stat: t.trust.expYears,
      label: t.trust.expLabel,
    },
    {
      icon: ShieldCheck,
      stat: t.trust.sterilePercent,
      label: t.trust.sterileLabel,
    },
    {
      icon: Smile,
      stat: t.trust.smilesCount,
      label: t.trust.smilesLabel,
    },
    {
      icon: Sparkles,
      stat: t.trust.techLabel,
      label: t.trust.techDesc,
    },
  ];

  return (
    <section className="py-12 bg-[#FFFFFF] border-y border-[#EADFCF]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl bg-[#FBF9F5] border border-[#EADFCF]/50 hover:border-[#C5A880]/50 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F6F2EA] flex items-center justify-center text-[#C5A880] mb-3 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E] tracking-tight">
                  {item.stat}
                </div>
                <div className="text-xs sm:text-sm text-[#6E6259] mt-1 font-medium leading-snug">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
