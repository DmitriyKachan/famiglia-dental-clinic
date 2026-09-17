'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import { HeartHandshake, ShieldCheck, Microscope, Smile } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const { t } = useI18n();

  const trustPillars = [
    {
      icon: HeartHandshake,
      title: t.trust.painlessTitle,
      desc: t.trust.painlessDesc,
      iconColor: 'text-brand-gold',
      iconBg: 'bg-brand-gold/10',
    },
    {
      icon: ShieldCheck,
      title: t.trust.sterileTitle,
      desc: t.trust.sterileDesc,
      iconColor: 'text-brand-sage',
      iconBg: 'bg-brand-sage/10',
    },
    {
      icon: Microscope,
      title: t.trust.microscopeTitle,
      desc: t.trust.microscopeDesc,
      iconColor: 'text-brand-gold',
      iconBg: 'bg-brand-gold/10',
    },
    {
      icon: Smile,
      title: t.trust.kidsTitle,
      desc: t.trust.kidsDesc,
      iconColor: 'text-brand-sage',
      iconBg: 'bg-brand-sage/10',
    },
  ];

  return (
    <section id="trust" className="py-12 sm:py-16 bg-brand-base border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="bg-brand-surface rounded-2xl p-6 border border-brand-border shadow-sm hover:shadow-md transition-all flex flex-col items-start text-left group"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${pillar.iconBg} ${pillar.iconColor} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-brand-dark tracking-tight mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
