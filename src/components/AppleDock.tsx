'use client';

import React from 'react';
import { Calendar, Layers, Sparkles } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface AppleDockProps {
  minimizedBooking: boolean;
  minimizedServices: boolean;
  minimizedCases: boolean;
  onRestoreBooking: () => void;
  onRestoreServices: () => void;
  onRestoreCases: () => void;
  onOpenBooking: () => void;
}

export const AppleDock: React.FC<AppleDockProps> = ({
  minimizedBooking,
  minimizedServices,
  minimizedCases,
  onRestoreBooking,
  onRestoreServices,
  onRestoreCases,
  onOpenBooking,
}) => {
  const { locale } = useI18n();

  const hasAnyMinimized = minimizedBooking || minimizedServices || minimizedCases;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-3 pointer-events-auto font-hn">
      {/* Minimized Windows Pill */}
      {hasAnyMinimized && (
        <div className="apple-glass rounded-full px-4 py-2 flex items-center space-x-3 border border-white/20 shadow-2xl apple-dock-glow">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-[11px] uppercase tracking-wider text-cream/60">
              {locale === 'ua' ? 'Згорнуто:' : 'Minimized:'}
            </span>
          </div>

          {minimizedBooking && (
            <button
              type="button"
              onClick={onRestoreBooking}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-cream text-xs flex items-center space-x-1.5 transition-all cursor-pointer border border-white/10"
              title={locale === 'ua' ? 'Розгорнути вікно запису' : 'Restore Booking'}
            >
              <Calendar className="w-3.5 h-3.5 text-brand-gold" />
              <span>{locale === 'ua' ? 'Запис' : 'Booking'}</span>
            </button>
          )}

          {minimizedServices && (
            <button
              type="button"
              onClick={onRestoreServices}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-cream text-xs flex items-center space-x-1.5 transition-all cursor-pointer border border-white/10"
              title={locale === 'ua' ? 'Розгорнути послуги' : 'Restore Services'}
            >
              <Layers className="w-3.5 h-3.5 text-amber-300" />
              <span>{locale === 'ua' ? 'Послуги' : 'Services'}</span>
            </button>
          )}

          {minimizedCases && (
            <button
              type="button"
              onClick={onRestoreCases}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-cream text-xs flex items-center space-x-1.5 transition-all cursor-pointer border border-white/10"
              title={locale === 'ua' ? 'Розгорнути кейси' : 'Restore Cases'}
            >
              <Sparkles className="w-3.5 h-3.5 text-cream" />
              <span>{locale === 'ua' ? 'Кейси' : 'Cases'}</span>
            </button>
          )}
        </div>
      )}

      {/* Floating LiquidGlass Quick CTA Pill */}
      <button
        type="button"
        onClick={onOpenBooking}
        className="apple-glass rounded-full px-5 py-2.5 text-xs uppercase tracking-widest text-cream border border-brand-gold/40 hover:border-brand-gold bg-black/60 hover:bg-brand-gold/20 transition-all flex items-center space-x-2 shadow-2xl cursor-pointer group hover:scale-105 active:scale-95"
      >
        <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
        <span className="font-medium text-cream group-hover:text-white transition-colors">
          {locale === 'ua' ? 'Записатися' : 'Book Visit'}
        </span>
      </button>
    </div>
  );
};
