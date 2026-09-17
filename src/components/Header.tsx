'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { Phone, Menu, X, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { locale, setLocale, t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#services', label: t.nav.services },
    { href: '#results', label: t.nav.results },
    { href: '#about', label: t.nav.about },
    { href: '#reviews', label: t.nav.reviews },
    { href: '#contacts', label: t.nav.contacts },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#EADFCF]/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex flex-col group cursor-pointer">
            <span className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#2D241E] group-hover:text-[#C5A880] transition-colors">
              Famiglia
            </span>
            <span className="text-[11px] font-medium tracking-wider uppercase text-[#6E6259]">
              {locale === 'ua' ? 'Стоматологія твоєї сімʼї' : 'Family Dental Clinic'}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#2D241E] hover:text-[#C5A880] transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Items */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#F6F2EA] rounded-full p-1 border border-[#EADFCF]">
              <button
                type="button"
                onClick={() => setLocale('ua')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  locale === 'ua'
                    ? 'bg-[#2D241E] text-white shadow-sm'
                    : 'text-[#6E6259] hover:text-[#2D241E]'
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
                    ? 'bg-[#2D241E] text-white shadow-sm'
                    : 'text-[#6E6259] hover:text-[#2D241E]'
                }`}
                aria-label="English version"
              >
                EN
              </button>
            </div>

            {/* Direct Phone Call */}
            <a
              href="tel:+380960889889"
              className="flex items-center space-x-2 text-sm font-medium text-[#2D241E] hover:text-[#C5A880] transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#F6F2EA] flex items-center justify-center text-[#C5A880]">
                <Phone className="w-4 h-4" />
              </div>
              <span>+380 96 088 9889</span>
            </a>

            {/* Book Button */}
            <a
              href="#booking"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#2D241E] hover:bg-[#3D312A] rounded-full shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 mr-2 text-[#C5A880]" />
              {t.nav.bookBtn}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            {/* Mobile Language Switcher */}
            <div className="flex items-center bg-[#F6F2EA] rounded-full p-0.5 border border-[#EADFCF]">
              <button
                type="button"
                onClick={() => setLocale('ua')}
                className={`px-2 py-0.5 text-xs font-medium rounded-full cursor-pointer ${
                  locale === 'ua' ? 'bg-[#2D241E] text-white' : 'text-[#6E6259]'
                }`}
              >
                UA
              </button>
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={`px-2 py-0.5 text-xs font-medium rounded-full cursor-pointer ${
                  locale === 'en' ? 'bg-[#2D241E] text-white' : 'text-[#6E6259]'
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2D241E] hover:text-[#C5A880] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF9F5] border-b border-[#EADFCF] px-4 pt-2 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#2D241E] hover:text-[#C5A880] py-1 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-[#EADFCF]/60 flex flex-col space-y-3">
            <a
              href="tel:+380960889889"
              className="flex items-center space-x-3 text-[#2D241E] font-medium py-1"
            >
              <Phone className="w-4 h-4 text-[#C5A880]" />
              <span>+380 96 088 9889</span>
            </a>
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-sm font-semibold text-white bg-[#2D241E] rounded-full shadow cursor-pointer"
            >
              {t.nav.bookBtn}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
