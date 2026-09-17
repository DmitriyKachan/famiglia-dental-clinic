'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { 
  Sparkles, 
  Smile, 
  Baby, 
  ShieldCheck, 
  Droplets, 
  Check, 
  ChevronDown, 
  ArrowUpRight,
  Sparkle
} from 'lucide-react';
import { ShineBorder } from './magicui/ShineBorder';

const serviceIconsMap: Record<string, React.ComponentType<{ className?: string }>> = {
  therapy: Sparkles,
  veneers: Sparkle,
  ortho: Smile,
  kids: Baby,
  surgery: ShieldCheck,
  hygiene: Droplets,
};

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
  onOpenFullCatalog: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenFullCatalog,
}) => {
  const { t, locale } = useI18n();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="services" className="relative py-28 sm:py-36 bg-[#0d0d0d] text-cream overflow-hidden font-hn border-t border-white/10">
      {/* Background radial gradient glow */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cream/5 border border-cream/15 text-xs tracking-wider uppercase text-brand-gold mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>{locale === 'ua' ? 'Напрямки лікування' : 'Treatment Architecture'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-cream">
              {t.services.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-cream/60 font-light leading-relaxed">
              {t.services.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenFullCatalog}
            className="self-start md:self-end px-5 py-2.5 rounded-full apple-glass text-xs uppercase tracking-widest text-cream hover:text-white border border-white/20 hover:border-brand-gold transition-all flex items-center space-x-2 cursor-pointer group"
          >
            <span>{locale === 'ua' ? 'Повний каталог послуг' : 'Full Treatment Catalog'}</span>
            <ArrowUpRight className="w-4 h-4 text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Apple LiquidGlass Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((item, idx) => {
            const Icon = serviceIconsMap[item.id] || Sparkles;
            const isExpanded = expandedId === item.id;
            const isFeatured = item.id === 'veneers' || item.id === 'therapy';

            return (
              <div
                key={item.id}
                className="apple-glass-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-400"
              >
                {isFeatured && (
                  <ShineBorder borderWidth={1} duration={14} shineColor={['#C5A880', '#ffffff', '#C5A880']} />
                )}

                <div>
                  {/* Top Bar: Icon + Price Tag */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-cream/10 border border-cream/20 flex items-center justify-center text-brand-gold group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    {item.priceFrom && (
                      <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-cream/5 border border-cream/10 text-cream/70 font-light">
                        {item.priceFrom}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-light text-cream mb-2 tracking-tight group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-cream/60 font-light leading-relaxed mb-5">
                    {item.desc}
                  </p>

                  {/* Features Collapsible Sheet */}
                  {item.features && item.features.length > 0 && (
                    <div className="mb-5">
                      <button
                        type="button"
                        onClick={() => toggleExpand(item.id)}
                        className="text-xs text-brand-gold flex items-center space-x-1.5 hover:underline cursor-pointer py-1 font-light"
                      >
                        <span>
                          {isExpanded
                            ? locale === 'ua'
                              ? 'Згорнути деталі'
                              : 'Hide details'
                            : locale === 'ua'
                            ? 'Деталі протоколу'
                            : 'Protocol details'}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <ul className="mt-3 space-y-2 pt-3 border-t border-cream/10 apple-window-anim">
                          {item.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-center text-xs text-cream/80 font-light space-x-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer: Book CTA */}
                <div className="pt-5 border-t border-cream/10 flex items-center justify-between mt-auto">
                  <span className="text-[11px] uppercase tracking-wider text-cream/40 font-light">
                    {locale === 'ua' ? 'Carl Zeiss протокол' : 'Zeiss Protocol'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectService(item.title)}
                    className="px-4 py-1.5 rounded-full bg-cream/10 hover:bg-cream text-cream hover:text-black text-xs uppercase tracking-wider font-medium transition-all duration-300 cursor-pointer"
                  >
                    {locale === 'ua' ? 'Записатися' : 'Book'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
