import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nProvider } from '../src/lib/i18n/context';
import { Services } from '../src/components/Services';
import { translations } from '../src/lib/i18n/translations';

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#x27;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

describe('Services component', () => {
  it('renders all 6 services with titles, prices, descriptions, features, and CTA buttons in Ukrainian', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <Services />
      </I18nProvider>
    );

    // Section anchor id
    expect(html).toContain('id="services"');

    // Section header
    expect(html).toContain('НАПРЯМКИ ЛІКУВАННЯ');
    expect(html).toContain(escapeHtml(translations.ua.services.title));
    expect(html).toContain(escapeHtml(translations.ua.services.subtitle));

    // 6 services verification
    const expectedUaServices = translations.ua.services.items;
    expect(expectedUaServices).toHaveLength(6);

    for (const service of expectedUaServices) {
      expect(html).toContain(escapeHtml(service.title));
      expect(html).toContain(escapeHtml(service.desc));
      expect(html).toContain(escapeHtml(service.priceFrom));
      expect(html).toContain(escapeHtml(service.duration));
      for (const feature of service.features) {
        expect(html).toContain(escapeHtml(feature));
      }
    }

    // CTA button verification
    expect(html).toContain('Записатися');
    expect(html).toContain('href="#booking"');
    // Ensure all 6 CTA buttons exist
    const ctaMatches = html.match(/Записатися/g);
    expect(ctaMatches).toHaveLength(6);
  });

  it('renders all 6 services with English translations, prices, descriptions, and CTA buttons', () => {
    const html = renderToString(
      <I18nProvider initialLocale="en">
        <Services />
      </I18nProvider>
    );

    // Section header in English
    expect(html).toContain('OUR SERVICES');
    expect(html).toContain(escapeHtml(translations.en.services.title));
    expect(html).toContain(escapeHtml(translations.en.services.subtitle));

    // 6 services verification
    const expectedEnServices = translations.en.services.items;
    expect(expectedEnServices).toHaveLength(6);

    for (const service of expectedEnServices) {
      expect(html).toContain(escapeHtml(service.title));
      expect(html).toContain(escapeHtml(service.desc));
      expect(html).toContain(escapeHtml(service.priceFrom));
      expect(html).toContain(escapeHtml(service.duration));
      for (const feature of service.features) {
        expect(html).toContain(escapeHtml(feature));
      }
    }

    // CTA button in English
    expect(html).toContain('Book Appointment');
    expect(html).toContain('href="#booking"');
    const ctaMatches = html.match(/Book Appointment/g);
    expect(ctaMatches).toHaveLength(6);
  });
});
