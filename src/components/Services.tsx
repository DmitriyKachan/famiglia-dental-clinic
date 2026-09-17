'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import { BlurFade } from '@/components/magicui/BlurFade';
import { 
  Sparkles, 
  Smile, 
  Baby, 
  ShieldCheck, 
  Droplets, 
  Check, 
  Clock, 
  ArrowRight,
  Sparkle
} from 'lucide-react';

const serviceIconsMap: Record<string, React.ComponentType<{ className?: string }>> = {
  therapy: Sparkles,
  veneers: Sparkle,
  ortho: Smile,
  kids: Baby,
  surgery: ShieldCheck,
  hygiene: Droplets,
};

export const Services: React.FC = () => {
  const { t, locale } = useI18n();

  const handleSelectService = (serviceTitle: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('select-service', {
          detail: { service: serviceTitle },
        })
      );
      const select = document.querySelector<HTMLSelectElement>('#booking select');
      if (select) {
        select.value = serviceTitle;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-brand-base text-brand-dark scroll-mt-20 overflow-hidden">
      {/* Warm Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-brand-gold/10 via-brand-beige/20 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with BlurFade */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BlurFade delay={0.1}>
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-surface border border-brand-border text-xs font-semibold uppercase tracking-wider text-brand-muted mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>{locale === 'ua' ? 'НАПРЯМКИ ЛІКУВАННЯ' : 'OUR SERVICES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-brand-dark">
              {t.services.title}
            </h2>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed font-light">
              {t.services.subtitle}
            </p>
          </BlurFade>
        </div>

        {/* Responsive Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.services.items.map((item, index) => {
            const Icon = serviceIconsMap[item.id] || Sparkles;

            return (
              <BlurFade key={item.id} delay={0.1 + index * 0.05} className="h-full">
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-7 hover:border-brand-gold/70 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2 flex flex-col justify-between h-full group">
                  <div>
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-brand-base border border-brand-border/80 flex items-center justify-center text-brand-gold mb-5 group-hover:scale-110 group-hover:bg-brand-gold/15 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Title in elegant serif */}
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mb-2.5 tracking-tight">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-brand-muted leading-relaxed font-light mb-6">
                      {item.desc}
                    </p>

                    {/* Features checklist with Check icon */}
                    {item.features && item.features.length > 0 && (
                      <ul className="space-y-2.5 mb-7">
                        {item.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start text-xs sm:text-sm text-brand-dark/90">
                            <span className="w-4 h-4 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center mr-2.5 mt-0.5 shrink-0">
                              <Check className="w-3 h-3 text-brand-gold stroke-[2.5]" />
                            </span>
                            <span className="leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Bottom Row: Price tag, Duration badge, and Booking CTA */}
                  <div className="pt-5 border-t border-brand-border/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-brand-muted font-medium block">
                          {locale === 'ua' ? 'Вартість' : 'Price'}
                        </span>
                        <span className="text-lg font-bold text-brand-dark font-sans">
                          {item.priceFrom}
                        </span>
                      </div>
                      {item.duration && (
                        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-brand-base border border-brand-border text-xs text-brand-muted font-medium">
                          <Clock className="w-3 h-3 text-brand-gold" />
                          <span>{item.duration}</span>
                        </div>
                      )}
                    </div>

                    <a
                      href="#booking"
                      onClick={() => handleSelectService(item.title)}
                      className="w-full inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-brand-base hover:bg-brand-gold hover:text-white text-brand-dark text-xs sm:text-sm font-semibold tracking-wide border border-brand-border hover:border-brand-gold transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer group/btn"
                    >
                      <span>{locale === 'ua' ? 'Записатися' : 'Book Appointment'}</span>
                      <ArrowRight className="w-4 h-4 text-brand-gold group-hover/btn:text-white transition-transform group-hover/btn:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
};
