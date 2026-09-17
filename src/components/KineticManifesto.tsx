'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Sparkles, Microscope, HeartHandshake, ShieldCheck } from 'lucide-react';

export const KineticManifesto: React.FC = () => {
  const { locale } = useI18n();

  const manifestoPoints = [
    {
      metric: '0.02 mm',
      label: locale === 'ua' ? 'Точність прилягання' : 'Margin Precision',
      desc: locale === 'ua' ? 'Ювелірне позиціонування вінірів та реставрацій під мікроскопом 25x' : 'Micro-precision veneer positioning under 25x magnification',
      icon: Microscope,
    },
    {
      metric: '100%',
      label: locale === 'ua' ? 'Безболісність' : 'Painless Guarantee',
      desc: locale === 'ua' ? 'Комп’ютерна анестезія та делікатна седація без стресу і сліз' : 'Computerized anesthesia and gentle sedation without fear',
      icon: HeartHandshake,
    },
    {
      metric: '15+ р.',
      label: locale === 'ua' ? 'Клінічний досвід' : 'Clinical Experience',
      desc: locale === 'ua' ? 'Особиста експертиза Тетяни Бибіс та постійний контроль якості кожного етапу' : 'Personal expertise of Tetiana Bybis and strict multi-stage quality control',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative py-28 bg-[#1E1916] text-white border-y border-[#D4AF37]/20 overflow-hidden">
      {/* Ambient Laser Beam */}
      <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent opacity-40" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#151210] border border-[#D4AF37]/30 text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-8 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>{locale === 'ua' ? 'ФІЛОСОФІЯ ТОЧНОСТІ' : 'PRECISION MANIFESTO'}</span>
        </div>

        {/* Big Editorial Quote / Manifesto */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light leading-[1.25] tracking-tight max-w-4xl mx-auto mb-16 text-white">
          {locale === 'ua' ? (
            <>
              «Ми створили <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F7F4EE]">Famiglia</span> не як чергову лікарню, а як простір, де технології оптичного мікроскопа поєднуються з теплом і турботою справжньої родини.»
            </>
          ) : (
            <>
              «We created <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F7F4EE]">Famiglia</span> not as another hospital, but as a space where high-power microscope optics meet genuine family warmth.»
            </>
          )}
        </h2>

        {/* 3 Metric Glass Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {manifestoPoints.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="glass-panel-dark rounded-3xl p-8 hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#151210] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:text-[#38BDF8] group-hover:border-[#38BDF8] transition-colors mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight mb-2">
                  {pt.metric}
                </div>
                <h3 className="text-sm uppercase tracking-wider font-semibold text-[#D4AF37] mb-2 font-mono">
                  {pt.label}
                </h3>
                <p className="text-xs sm:text-sm text-[#A09388] font-light leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
