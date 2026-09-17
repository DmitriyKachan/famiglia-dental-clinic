'use client';

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Calendar, Phone, ArrowUpRight } from 'lucide-react';

interface AppleNavBarProps {
  onOpenBooking: () => void;
  onOpenServices: () => void;
  onOpenCases: () => void;
}

export const AppleNavBar: React.FC<AppleNavBarProps> = ({
  onOpenBooking,
  onOpenServices,
  onOpenCases,
}) => {
  const { locale, setLocale } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-4 inset-x-0 z-40 px-4 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Apple LiquidGlass Floating Island */}
        <div
          className={`pointer-events-auto w-full apple-glass rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between border border-white/15 shadow-2xl transition-all duration-300 ${
            isScrolled ? 'bg-black/75 backdrop-blur-2xl' : 'bg-black/40 backdrop-blur-xl'
          }`}
        >
          {/* Brand & Status */}
          <div className="flex items-center space-x-3">
            <a
              href="#"
              className="text-sm sm:text-base font-hn font-medium tracking-tight text-cream hover:text-white transition-colors"
            >
              Famiglia
            </a>
            <div className="hidden sm:flex items-center space-x-1.5 pl-3 border-l border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider text-cream/60 font-light">
                {locale === 'ua' ? 'Львів • Запис відкритий' : 'Lviv • Open for Booking'}
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-light text-cream/75">
            <a
              href="#standards"
              className="hover:text-cream transition-colors tracking-wider"
            >
              {locale === 'ua' ? 'Стандарти' : 'Standards'}
            </a>
            <button
              type="button"
              onClick={onOpenServices}
              className="hover:text-cream transition-colors tracking-wider cursor-pointer"
            >
              {locale === 'ua' ? 'Послуги' : 'Services'}
            </button>
            <button
              type="button"
              onClick={onOpenCases}
              className="hover:text-cream transition-colors tracking-wider cursor-pointer"
            >
              {locale === 'ua' ? 'Кейси' : 'Cases'}
            </button>
            <a
              href="#doctor"
              className="hover:text-cream transition-colors tracking-wider"
            >
              {locale === 'ua' ? 'Про лікаря' : 'Doctor'}
            </a>
            <a
              href="#booking"
              className="hover:text-cream transition-colors tracking-wider"
            >
              {locale === 'ua' ? 'Контакти' : 'Contacts'}
            </a>
          </nav>

          {/* Language Switcher & Quick CTA */}
          <div className="flex items-center space-x-2.5">
            {/* Language Toggle */}
            <div className="flex items-center bg-white/5 rounded-full p-0.5 border border-white/10 text-[11px]">
              <button
                type="button"
                onClick={() => setLocale('ua')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  locale === 'ua'
                    ? 'bg-cream text-black font-medium'
                    : 'text-cream/60 hover:text-cream'
                }`}
              >
                UA
              </button>
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  locale === 'en'
                    ? 'bg-cream text-black font-medium'
                    : 'text-cream/60 hover:text-cream'
                }`}
              >
                EN
              </button>
            </div>

            {/* Direct Booking Pill Button */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-3.5 sm:px-4 py-1.5 rounded-full bg-cream text-black text-xs font-medium uppercase tracking-wider hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-black" />
              <span className="hidden sm:inline">
                {locale === 'ua' ? 'Записатися' : 'Book'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
