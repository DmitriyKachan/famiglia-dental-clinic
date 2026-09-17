import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nProvider } from '../src/lib/i18n/context';
import { translations } from '../src/lib/i18n/translations';
import { AboutDoctor } from '../src/components/AboutDoctor';
import { Reviews } from '../src/components/Reviews';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#x27;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

describe('AboutDoctor Component', () => {
  it('renders Dr. Tetiana Bybis name, quote, bio, values, and Instagram link in UA', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <AboutDoctor />
      </I18nProvider>
    );

    // Section ID
    expect(html).toContain('id="about"');

    // Doctor name, role, and experience
    expect(html).toContain(translations.ua.about.founderName);
    expect(html).toContain(translations.ua.about.founderRole);
    expect(html).toContain('15+ років');

    // Quote and Bio
    expect(html).toContain(escapeHtml(translations.ua.about.quote));
    expect(html).toContain(escapeHtml(translations.ua.about.bioP1));
    expect(html).toContain(escapeHtml(translations.ua.about.bioP2));

    // 3 Clinic Values Cards
    expect(html).toContain('100% Безболісність та комфорт');
    expect(html).toContain('Європейські протоколи та стерильність класу B');
    expect(html).toContain('Затишок для всієї родини на вул. Бойківській, 2');

    // Instagram link & handle on clinic space photo card
    expect(html).toContain('href="https://instagram.com/famiglia_2022"');
    expect(html).toContain('@famiglia_2022');
  });

  it('renders Dr. Tetiana Bybis name, quote, bio, and Instagram link in EN', () => {
    const html = renderToString(
      <I18nProvider initialLocale="en">
        <AboutDoctor />
      </I18nProvider>
    );

    // Section ID
    expect(html).toContain('id="about"');

    // Doctor name and role in EN
    expect(html).toContain(translations.en.about.founderName);
    expect(html).toContain(escapeHtml(translations.en.about.founderRole));

    // Quote and Bio in EN
    expect(html).toContain(escapeHtml(translations.en.about.quote));
    expect(html).toContain(escapeHtml(translations.en.about.bioP1));
    expect(html).toContain(escapeHtml(translations.en.about.bioP2));

    // Instagram link & handle
    expect(html).toContain('href="https://instagram.com/famiglia_2022"');
    expect(html).toContain('@famiglia_2022');
  });
});

describe('Reviews Component', () => {
  it('renders all 4 verified reviews with 5-star ratings in UA', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <Reviews />
      </I18nProvider>
    );

    // Section ID
    expect(html).toContain('id="reviews"');

    // Header
    expect(html).toContain(escapeHtml(translations.ua.reviews.title));
    expect(html).toContain(escapeHtml(translations.ua.reviews.subtitle));

    const uaItems = translations.ua.reviews.items;
    expect(uaItems.length).toBe(4);

    // All 4 patient reviews rendered
    for (const item of uaItems) {
      expect(html).toContain(escapeHtml(item.name));
      expect(html).toContain(escapeHtml(item.service));
      expect(html).toContain(escapeHtml(item.text));
      expect(html).toContain(escapeHtml(item.date));
    }

    // 5-star ratings for all 4 cards (4 * 5 = 20 stars)
    const starMatches = html.match(/text-brand-gold fill-brand-gold/g);
    expect(starMatches).not.toBeNull();
    expect(starMatches?.length).toBe(20);

    // Verified badge
    expect(html).toContain('Перевірений відгук • Google Maps / Instagram');

    // Card styling
    expect(html).toContain(
      'bg-brand-surface border border-brand-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all'
    );
  });

  it('renders all 4 verified reviews with 5-star ratings in EN', () => {
    const html = renderToString(
      <I18nProvider initialLocale="en">
        <Reviews />
      </I18nProvider>
    );

    // Section ID
    expect(html).toContain('id="reviews"');

    // Header
    expect(html).toContain(escapeHtml(translations.en.reviews.title));
    expect(html).toContain(escapeHtml(translations.en.reviews.subtitle));

    const enItems = translations.en.reviews.items;
    expect(enItems.length).toBe(4);

    // All 4 patient reviews rendered
    for (const item of enItems) {
      expect(html).toContain(escapeHtml(item.name));
      expect(html).toContain(escapeHtml(item.service));
      expect(html).toContain(escapeHtml(item.text));
      expect(html).toContain(escapeHtml(item.date));
    }

    // 5-star ratings for all 4 cards (4 * 5 = 20 stars)
    const starMatches = html.match(/text-brand-gold fill-brand-gold/g);
    expect(starMatches).not.toBeNull();
    expect(starMatches?.length).toBe(20);

    // Verified badge
    expect(html).toContain('Google Maps / Instagram');

    // Card styling
    expect(html).toContain(
      'bg-brand-surface border border-brand-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all'
    );
  });
});
