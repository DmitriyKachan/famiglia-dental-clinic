'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Phone, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { locale, setLocale, t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#services', label: t.nav.services },
    { href: '#cases', label: t.nav.cases },
    { href: '#about', label: t.nav.about },
    { href: '#reviews', label: t.nav.reviews },
    { href: '#booking', label: t.nav.bookBtn },
    { href: '#contacts', label: t.nav.contacts },
  ];

  return (
    <header className="backdrop-blur-md bg-brand-base/90 border-b border-brand-border z-50 sticky top-0 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Typography Logo */}
          <a
            href="#"
            className="flex flex-col group cursor-pointer focus:outline-none"
            aria-label="Famiglia Dental Clinic"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-brand-dark group-hover:text-brand-gold transition-colors">
              Famiglia
            </span>
            <span className="font-serif italic text-xs sm:text-sm text-brand-muted group-hover:text-brand-gold transition-colors">
              {t.nav.logoSubtitle}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-dark/80 hover:text-brand-gold transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Action Items */}
          <div className="hidden md:flex items-center space-x-5 lg:space-x-6">
            {/* Language Toggle */}
            <div className="flex items-center bg-brand-surface rounded-full p-1 border border-brand-border shadow-inner">
              <button
                type="button"
                onClick={() => setLocale('ua')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  locale === 'ua'
                    ? 'bg-brand-dark text-white shadow-sm'
                    : 'text-brand-muted hover:text-brand-dark'
                }`}
                aria-label="Українська версія"
              >
                UA
              </button>
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  locale === 'en'
                    ? 'bg-brand-dark text-white shadow-sm'
                    : 'text-brand-muted hover:text-brand-dark'
                }`}
                aria-label="English version"
              >
                EN
              </button>
            </div>

            {/* Direct Phone Link */}
            <a
              href="tel:+380960889889"
              className="flex items-center space-x-2 text-sm font-medium text-brand-dark hover:text-brand-gold transition-colors cursor-pointer group"
              aria-label="Зателефонувати: +380 96 088 9889"
            >
              <div className="w-8 h-8 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all shadow-sm">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="whitespace-nowrap tracking-tight">+380 96 088 9889</span>
            </a>

            {/* CTA Button Scrolling to #booking */}
            <a
              href="#booking"
              className="bg-brand-dark text-white rounded-full px-5 py-2.5 text-sm font-medium hover:bg-brand-dark/90 transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              {t.nav.bookBtn}
            </a>
          </div>

          {/* Mobile Actions: Language switch + Burger Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <div className="flex items-center bg-brand-surface rounded-full p-0.5 border border-brand-border">
              <button
                type="button"
                onClick={() => setLocale('ua')}
                className={`px-2 py-0.5 text-xs font-semibold rounded-full transition-all ${
                  locale === 'ua' ? 'bg-brand-dark text-white' : 'text-brand-muted'
                }`}
                aria-label="UA"
              >
                UA
              </button>
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={`px-2 py-0.5 text-xs font-semibold rounded-full transition-all ${
                  locale === 'en' ? 'bg-brand-dark text-white' : 'text-brand-muted'
                }`}
                aria-label="EN"
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-dark hover:text-brand-gold transition-colors cursor-pointer rounded-lg"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-base border-b border-brand-border px-6 pt-4 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 shadow-lg">
          <nav className="flex flex-col space-y-2.5" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-brand-dark hover:text-brand-gold py-1 border-b border-brand-border/40 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-brand-border flex flex-col space-y-3">
            <a
              href="tel:+380960889889"
              className="flex items-center space-x-3 text-brand-dark font-medium py-1 hover:text-brand-gold transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-gold">
                <Phone className="w-4 h-4" />
              </div>
              <span>+380 96 088 9889</span>
            </a>
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-sm font-semibold text-white bg-brand-dark rounded-full shadow hover:bg-brand-dark/90 transition-all cursor-pointer"
            >
              {t.nav.bookBtn}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
