import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nProvider } from '../src/lib/i18n/context';
import { translations } from '../src/lib/i18n/translations';
import { Hero } from '../src/components/Hero';
import { TrustBar } from '../src/components/TrustBar';

// Helper to decode HTML entities produced by React's renderToString
const decodeHtml = (html: string) =>
  html
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');

describe('Hero and TrustBar Components', () => {
  describe('Hero Component', () => {
    it('renders Ukrainian Hero with Dr. Tetiana Bybis card, rating, location badge, and CTAs', () => {
      const rawHtml = renderToString(
        <I18nProvider initialLocale="ua">
          <Hero />
        </I18nProvider>
      );
      const html = decodeHtml(rawHtml);

      // Location badge
      expect(html).toContain(translations.ua.hero.badge);
      expect(html).toContain('Бойківська, 2');

      // Main title & subtitle
      expect(html).toContain(translations.ua.hero.title);
      expect(html).toContain(translations.ua.hero.subtitle);

      // CTAs
      expect(html).toContain(translations.ua.hero.ctaBooking);
      expect(html).toContain('#booking');
      expect(html).toContain(translations.ua.hero.ctaServices);
      expect(html).toContain('#services');

      // Trust metrics & rating
      expect(html).toContain(translations.ua.hero.ratingValue);
      expect(html).toContain(translations.ua.hero.ratingCount);
      expect(html).toContain(translations.ua.hero.experienceBadge);

      // Doctor Tetiana Bybis card & floating badges
      expect(html).toContain('/tetiana_bybis.jpg');
      expect(html).toContain(translations.ua.hero.founderBadge);
      expect(html).toContain('Безболісне лікування без страху');
    });

    it('renders English Hero with Dr. Tetiana Bybis card, rating, location badge, and CTAs', () => {
      const rawHtml = renderToString(
        <I18nProvider initialLocale="en">
          <Hero />
        </I18nProvider>
      );
      const html = decodeHtml(rawHtml);

      expect(html).toContain(translations.en.hero.title);
      expect(html).toContain(translations.en.hero.subtitle);
      expect(html).toContain(translations.en.hero.ctaBooking);
      expect(html).toContain(translations.en.hero.ctaServices);
      expect(html).toContain(translations.en.hero.ratingCount);
      expect(html).toContain(translations.en.hero.founderBadge);
      expect(html).toContain('Painless treatment without fear');
    });
  });

  describe('TrustBar Component', () => {
    it('renders all 4 pillars in Ukrainian', () => {
      const rawHtml = renderToString(
        <I18nProvider initialLocale="ua">
          <TrustBar />
        </I18nProvider>
      );
      const html = decodeHtml(rawHtml);

      // 1. Painless
      expect(html).toContain(translations.ua.trust.painlessTitle);
      expect(html).toContain(translations.ua.trust.painlessDesc);

      // 2. Sterile
      expect(html).toContain(translations.ua.trust.sterileTitle);
      expect(html).toContain(translations.ua.trust.sterileDesc);

      // 3. Microscope
      expect(html).toContain(translations.ua.trust.microscopeTitle);
      expect(html).toContain(translations.ua.trust.microscopeDesc);

      // 4. Kids
      expect(html).toContain(translations.ua.trust.kidsTitle);
      expect(html).toContain(translations.ua.trust.kidsDesc);
    });

    it('renders all 4 pillars in English', () => {
      const rawHtml = renderToString(
        <I18nProvider initialLocale="en">
          <TrustBar />
        </I18nProvider>
      );
      const html = decodeHtml(rawHtml);

      // 1. Painless
      expect(html).toContain(translations.en.trust.painlessTitle);
      expect(html).toContain(translations.en.trust.painlessDesc);

      // 2. Sterile
      expect(html).toContain(translations.en.trust.sterileTitle);
      expect(html).toContain(translations.en.trust.sterileDesc);

      // 3. Microscope
      expect(html).toContain(translations.en.trust.microscopeTitle);
      expect(html).toContain(translations.en.trust.microscopeDesc);

      // 4. Kids
      expect(html).toContain(translations.en.trust.kidsTitle);
      expect(html).toContain(translations.en.trust.kidsDesc);
    });
  });
});
