'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { getAssetPath } from '@/lib/basePath';

interface EditorialHeroProps {
  onOpenServices?: () => void;
  onOpenCases?: () => void;
  onOpenBooking?: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  onOpenServices,
  onOpenCases,
  onOpenBooking,
}) => {
  const { locale, setLocale } = useI18n();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [bgSrc, setBgSrc] = useState(getAssetPath('/editorial_bg.webp'));
  const [frontSrc, setFrontSrc] = useState(getAssetPath('/editorial_front.webp'));

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  const navItems = [
    { label: locale === 'ua' ? 'Послуги' : 'Services', action: onOpenServices },
    { label: locale === 'ua' ? 'Кейси' : 'Cases', action: onOpenCases },
    { label: locale === 'ua' ? 'Запис' : 'Book', action: onOpenBooking },
  ];

  const socialItems = [
    { label: 'Instagram', href: 'https://www.instagram.com/famiglia_2022/' },
    { label: 'Telegram', href: 'https://t.me/famiglia_dental' },
    { label: '+380 96 088 9889', href: 'tel:+380960889889' },
  ];

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#0d0d0d] text-cream select-none font-hn">
      {/* ========================================================================= */}
      {/* LAYER 1: Full-bleed Background image (z-0) */}
      {/* ========================================================================= */}
      <img
        src={bgSrc}
        alt=""
        onError={() =>
          setBgSrc(
            'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85'
          )
        }
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover anim-fade-in pointer-events-none"
      />

      {/* Subtle cinematic vignette */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* LAYER 2: Marquee name (z-10, behind front portrait) */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-x-0 top-[16vh] sm:top-[14vh] z-10 overflow-hidden pointer-events-none anim-fade-up"
        style={{ animationDelay: '500ms' }}
        aria-hidden="true"
      >
        <div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] sm:text-[26vh] leading-none text-cream tracking-tight font-medium">
          {/* First track span */}
          <span className="inline-flex items-center pr-[6vw]">
            <span>Famiglia</span>
            <span className="mx-4 sm:mx-8">&mdash;</span>
            <span>Tetiana&nbsp;Bybis</span>
          </span>
          {/* Duplicate track span for seamless 30s linear infinite loop */}
          <span className="inline-flex items-center pr-[6vw]">
            <span>Famiglia</span>
            <span className="mx-4 sm:mx-8">&mdash;</span>
            <span>Tetiana&nbsp;Bybis</span>
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LAYER 3: Horizontal Cream Rule (z-10, above footer) */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-x-6 sm:inset-x-10 bottom-[5.5rem] sm:bottom-28 z-10 h-0.5 bg-cream anim-line pointer-events-none"
        style={{ animationDelay: '1200ms' }}
      />

      {/* ========================================================================= */}
      {/* LAYER 4: Desktop Footer (sm:z-10) */}
      {/* ========================================================================= */}
      <footer className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-5 sm:px-10 sm:pb-8 text-xs sm:text-sm leading-relaxed font-hn text-cream pointer-events-auto sm:z-10">
        {/* Left Column: 3 lines */}
        <div className="anim-fade-up text-left" style={{ animationDelay: '1400ms' }}>
          <p className="font-normal text-cream/90">
            {locale === 'ua' ? 'Стоматологія твоєї сімʼї' : 'Family Dental Practice'}
          </p>
          <p className="font-light text-cream/70">
            {locale === 'ua' ? 'Естетика & Цифрова Точність' : 'Aesthetic & Digital Precision'}
          </p>
          <p className="font-light text-cream/70">
            {locale === 'ua' ? 'м. Львів, вул. Бойківська, 2' : 'Lviv, 2 Boykivska St'}
          </p>
        </div>

        {/* Right Column: Right-aligned 2 lines */}
        <div className="anim-fade-up text-right" style={{ animationDelay: '1550ms' }}>
          <p className="text-cream/70 text-[11px] sm:text-xs uppercase tracking-wider font-light">
            {locale === 'ua' ? 'Головний лікар' : 'Chief Doctor'}
          </p>
          <p className="text-sm sm:text-base font-medium text-cream tracking-wide">
            {locale === 'ua' ? 'Тетяна Бибіс' : 'Tetiana Bybis'}
          </p>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* LAYER 5: Front portrait cutout (z-20, sits ON TOP of giant marquee) */}
      {/* ========================================================================= */}
      <img
        src={frontSrc}
        alt="Portrait"
        onError={() =>
          setFrontSrc(
            'https://stone-expand-60400629.figma.site/_assets/v11/8da570354e86aa0d44ac3e4aa335a72c8e750d68.png'
          )
        }
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none z-20 anim-rise-in"
        style={{ animationDelay: '300ms' }}
      />

      {/* ========================================================================= */}
      {/* LAYER 6: Header Chrome (z-30) */}
      {/* ========================================================================= */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8 pointer-events-auto">
        {/* Brand Link (top-left) */}
        <div className="anim-fade-up" style={{ animationDelay: '800ms' }}>
          <a
            href="#"
            className="font-hn text-xl sm:text-2xl tracking-wide text-cream hover:opacity-80 transition-opacity duration-300 font-semibold inline-block"
          >
            Famiglia
          </a>
        </div>

        {/* Desktop Triple Column Cluster */}
        <div className="hidden sm:flex items-start gap-16 lg:gap-24">
          {/* Year Column */}
          <div className="anim-fade-up text-sm font-light text-cream/80" style={{ animationDelay: '900ms' }}>
            <span>2025</span>
          </div>

          {/* Nav Column (vertical stack) */}
          <nav className="flex flex-col gap-1 text-sm font-light text-left" aria-label="Desktop Navigation">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={item.action}
                className="anim-fade-up text-cream hover:opacity-60 transition-opacity duration-300 text-left cursor-pointer"
                style={{ animationDelay: `${1000 + idx * 80}ms` }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Social / Contact Column (vertical stack) */}
          <div className="flex flex-col gap-1 text-sm font-light text-left">
            {socialItems.map((soc, idx) => (
              <a
                key={idx}
                href={soc.href}
                target={soc.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="anim-fade-up text-cream hover:opacity-60 transition-opacity duration-300 text-left"
                style={{ animationDelay: `${1150 + idx * 80}ms` }}
              >
                {soc.label}
              </a>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="anim-fade-up flex items-center gap-1.5 text-xs font-medium border border-cream/30 rounded-full px-2.5 py-1 text-cream" style={{ animationDelay: '1350ms' }}>
            <button
              type="button"
              onClick={() => setLocale('ua')}
              className={`hover:opacity-80 transition-opacity cursor-pointer ${locale === 'ua' ? 'underline font-bold text-cream' : 'text-cream/60'}`}
            >
              UA
            </button>
            <span className="text-cream/40">/</span>
            <button
              type="button"
              onClick={() => setLocale('en')}
              className={`hover:opacity-80 transition-opacity cursor-pointer ${locale === 'en' ? 'underline font-bold text-cream' : 'text-cream/60'}`}
            >
              EN
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LAYER 8: Mobile Hamburger / Close Button (z-50) */}
        {/* ========================================================================= */}
        <button
          type="button"
          onClick={() => setIsDrawerOpen((prev) => !prev)}
          className="sm:hidden relative z-50 h-10 w-10 flex items-center justify-center anim-fade-up text-cream focus:outline-none cursor-pointer"
          style={{ animationDelay: '900ms' }}
          aria-label={isDrawerOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          <div className="relative h-4 w-6 flex flex-col justify-between">
            {/* Top Bar */}
            <span
              className={`h-0.5 w-full bg-cream transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isDrawerOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            {/* Middle Bar */}
            <span
              className={`h-0.5 w-full bg-cream transition-opacity duration-300 ${
                isDrawerOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {/* Bottom Bar */}
            <span
              className={`h-0.5 w-full bg-cream transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isDrawerOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </header>

      {/* ========================================================================= */}
      {/* LAYER 7: Mobile Drawer (sm:hidden, z-40) */}
      {/* ========================================================================= */}
      <div
        className={`sm:hidden fixed inset-0 z-40 transition-opacity duration-500 ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop blur */}
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Right Slide-in Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[#141414] text-cream px-8 py-10 flex flex-col justify-between transition-transform duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] border-l border-cream/20 shadow-2xl ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close icon button inside drawer header */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className={`p-2 text-cream hover:opacity-70 transition-all duration-300 cursor-pointer ${
                isDrawerOpen ? 'rotate-0 opacity-100 delay-300' : 'rotate-90 opacity-0'
              }`}
              aria-label="Close drawer"
            >
              <X size={26} strokeWidth={1.5} />
            </button>
          </div>

          {/* Top section: Site Index */}
          <div className="flex flex-col space-y-6">
            <p
              className={`text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500 ${
                isDrawerOpen ? 'opacity-100 translate-y-0 delay-250' : 'opacity-0 translate-y-4'
              }`}
            >
              Site Index
            </p>

            <nav className="flex flex-col space-y-4">
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    if (item.action) item.action();
                  }}
                  className={`text-3xl font-hn font-light text-cream hover:opacity-60 transition-all duration-500 text-left cursor-pointer ${
                    isDrawerOpen
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6'
                  }`}
                  style={{
                    transitionDelay: isDrawerOpen ? `${300 + idx * 80}ms` : '0ms',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Bottom section: Find Me & Socials */}
          <div className="flex flex-col space-y-4 border-t border-cream/10 pt-6">
            <p
              className={`text-xs uppercase tracking-[0.2em] text-cream/50 transition-all duration-500 ${
                isDrawerOpen ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-4'
              }`}
            >
              Find Me
            </p>

            <div className="flex flex-col space-y-2">
              {socialItems.map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  target={soc.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className={`text-sm text-cream/80 hover:text-cream transition-all duration-500 ${
                    isDrawerOpen
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: isDrawerOpen ? `${550 + idx * 60}ms` : '0ms',
                  }}
                >
                  {soc.label}
                </a>
              ))}
            </div>

            {/* Language switcher for mobile */}
            <div className="pt-2 flex items-center space-x-3 text-xs text-cream/70 font-medium">
              <button
                type="button"
                onClick={() => setLocale('ua')}
                className={locale === 'ua' ? 'text-cream font-bold underline' : ''}
              >
                Українська
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={locale === 'en' ? 'text-cream font-bold underline' : ''}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
