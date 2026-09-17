'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { 
  Sparkles, 
  Smile, 
  Baby, 
  Palette, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight,
  Crosshair
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-28 bg-[#1E1916] text-white scroll-mt-20 overflow-hidden">
      {/* Laser grid background */}
      <div className="absolute inset-0 bg-laser-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#151210] border border-[#D4AF37]/30 text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-4 shadow-sm">
            <Crosshair className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{locale === 'ua' ? 'НАПРЯМКИ ЛІКУВАННЯ' : 'TREATMENT DISCIPLINES'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            {t.services.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#DFD3C2] leading-relaxed font-light">
            {t.services.subtitle}
          </p>
        </div>

        {/* 3D Spatial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {t.services.items.map((item, index) => {
            const Icon = serviceIcons[index] || Sparkles;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transform: isHovered 
                    ? 'scale3d(1.03, 1.03, 1.03) rotateX(3deg) translateY(-6px)' 
                    : 'scale3d(1, 1, 1) rotateX(0deg) translateY(0px)',
                  transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.25s ease, box-shadow 0.25s ease',
                }}
                className="relative flex flex-col justify-between p-8 rounded-3xl glass-panel-dark border border-[#D4AF37]/30 hover:border-[#D4AF37] shadow-xl hover:shadow-[0_15px_40px_rgba(212,175,55,0.25)] preserve-3d"
              >
                {/* Laser Corner Accent */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/60 rounded-tr-3xl pointer-events-none" />

                <div>
                  {/* Top: Icon & Price Pill */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#151210] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:text-[#38BDF8] group-hover:border-[#38BDF8] shadow-inner transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider rounded-full bg-[#151210] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm">
                      {item.priceFrom}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#DFD3C2] leading-relaxed font-light mb-8">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Trigger */}
                <div className="pt-5 border-t border-[#D4AF37]/20 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#A09388]">
                    {locale === 'ua' ? 'Оптика Carl Zeiss' : 'Zeiss Optics'}
                  </span>
                  <a
                    href="#booking"
                    className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider text-[#D4AF37] hover:text-white transition-colors cursor-pointer"
                  >
                    <span>{locale === 'ua' ? 'Записатися' : 'Book Area'}</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
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
