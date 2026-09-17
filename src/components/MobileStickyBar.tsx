'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Phone, Calendar } from 'lucide-react';

export const MobileStickyBar: React.FC = () => {
  const { t } = useI18n();

  const handleBookingClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-booking-modal'));
    }
  };

  return (
    <aside
      aria-label="Mobile Sticky Bar"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-brand-surface/95 backdrop-blur-md border-t border-brand-border p-3 shadow-lg"
    >
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
        {/* Call button */}
        <a
          href="tel:+380960889889"
          className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-full text-sm font-medium bg-brand-surface border border-brand-border text-brand-dark hover:bg-brand-base transition-colors shadow-sm cursor-pointer"
        >
          <Phone className="w-4 h-4 text-brand-gold shrink-0" />
          <span className="truncate">{t.mobileSticky.call}</span>
        </a>

        {/* Book button */}
        <a
          href="#booking"
          onClick={handleBookingClick}
          className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-full text-sm font-medium bg-brand-dark text-white hover:bg-brand-dark/90 transition-all shadow-md cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-brand-gold shrink-0" />
          <span className="truncate">{t.mobileSticky.book}</span>
        </a>
      </div>
    </aside>
  );
};
