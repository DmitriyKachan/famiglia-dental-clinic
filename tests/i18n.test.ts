import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { translations, Locale, Translations } from '../src/lib/i18n/translations';
import { I18nProvider, useI18n } from '../src/lib/i18n/context';

describe('i18n Translations Dictionary', () => {
  it('should export translations for ua and en locales', () => {
    expect(translations).toBeDefined();
    expect(translations.ua).toBeDefined();
    expect(translations.en).toBeDefined();
  });

  it('should have matching top-level keys between ua and en', () => {
    const uaKeys = Object.keys(translations.ua).sort();
    const enKeys = Object.keys(translations.en).sort();
    expect(uaKeys).toEqual(enKeys);
    expect(uaKeys).toEqual([
      'about',
      'beforeAfter',
      'booking',
      'footer',
      'hero',
      'nav',
      'reviews',
      'services',
      'trust',
    ]);
  });

  it('should contain all required nav keys', () => {
    const requiredNavKeys = ['logo', 'services', 'about', 'results', 'reviews', 'contacts', 'bookBtn'];
    for (const key of requiredNavKeys) {
      expect(translations.ua.nav[key as keyof typeof translations.ua.nav]).toBeDefined();
      expect(translations.en.nav[key as keyof typeof translations.en.nav]).toBeDefined();
    }
  });

  it('should contain all required hero keys and content', () => {
    const requiredHeroKeys = ['badge', 'title', 'subtitle', 'ctaBooking', 'ctaServices', 'ratingNote'];
    for (const key of requiredHeroKeys) {
      expect(translations.ua.hero[key as keyof typeof translations.ua.hero]).toBeDefined();
      expect(translations.en.hero[key as keyof typeof translations.en.hero]).toBeDefined();
    }
    expect(translations.ua.hero.title).toBeTruthy();
    expect(translations.en.hero.title).toBeTruthy();
  });

  it('should contain all required trust metrics', () => {
    const requiredTrustKeys = [
      'expYears',
      'expLabel',
      'sterilePercent',
      'sterileLabel',
      'smilesCount',
      'smilesLabel',
      'techLabel',
      'techDesc',
    ];
    for (const key of requiredTrustKeys) {
      expect(translations.ua.trust[key as keyof typeof translations.ua.trust]).toBeDefined();
      expect(translations.en.trust[key as keyof typeof translations.en.trust]).toBeDefined();
    }
    expect(translations.ua.trust.expYears).toBe('15+');
    expect(translations.ua.trust.sterilePercent).toBe('100%');
    expect(translations.ua.trust.smilesCount).toBe('1000+');
  });

  it('should contain exactly 6 services with required properties', () => {
    expect(translations.ua.services.title).toBeDefined();
    expect(translations.en.services.title).toBeDefined();
    expect(translations.ua.services.subtitle).toBeDefined();
    expect(translations.en.services.subtitle).toBeDefined();

    expect(translations.ua.services.items).toHaveLength(6);
    expect(translations.en.services.items).toHaveLength(6);

    const expectedServiceIds = ['therapy', 'orthodontics', 'kids', 'esthetics', 'surgery', 'hygiene'];

    for (let i = 0; i < 6; i++) {
      const uaItem = translations.ua.services.items[i];
      const enItem = translations.en.services.items[i];

      expect(uaItem.id).toBe(expectedServiceIds[i]);
      expect(enItem.id).toBe(expectedServiceIds[i]);

      expect(uaItem.title).toBeTruthy();
      expect(enItem.title).toBeTruthy();

      expect(uaItem.desc).toBeTruthy();
      expect(enItem.desc).toBeTruthy();

      expect(uaItem.priceFrom).toBeTruthy();
      expect(enItem.priceFrom).toBeTruthy();
    }
  });

  it('should contain all required beforeAfter keys and tabs', () => {
    expect(translations.ua.beforeAfter.title).toBeDefined();
    expect(translations.en.beforeAfter.title).toBeDefined();
    expect(translations.ua.beforeAfter.subtitle).toBeDefined();
    expect(translations.en.beforeAfter.subtitle).toBeDefined();
    expect(translations.ua.beforeAfter.compareLabel).toBeDefined();
    expect(translations.en.beforeAfter.compareLabel).toBeDefined();

    const requiredTabs = ['restoration', 'ortho', 'whitening'];
    for (const tab of requiredTabs) {
      expect(translations.ua.beforeAfter.tabs[tab as keyof typeof translations.ua.beforeAfter.tabs]).toBeDefined();
      expect(translations.en.beforeAfter.tabs[tab as keyof typeof translations.en.beforeAfter.tabs]).toBeDefined();
    }
  });

  it('should contain about section with exact founder name', () => {
    expect(translations.ua.about.title).toBeDefined();
    expect(translations.en.about.title).toBeDefined();
    expect(translations.ua.about.founderName).toBe('Тетяна Бибіс');
    expect(translations.en.about.founderName).toBe('Tetiana Bybis');
    expect(translations.ua.about.founderRole).toBeDefined();
    expect(translations.en.about.founderRole).toBeDefined();
    expect(translations.ua.about.quote).toBeDefined();
    expect(translations.en.about.quote).toBeDefined();
    expect(translations.ua.about.descP1).toBeDefined();
    expect(translations.en.about.descP1).toBeDefined();
    expect(translations.ua.about.descP2).toBeDefined();
    expect(translations.en.about.descP2).toBeDefined();
  });

  it('should contain all booking form fields and states', () => {
    const requiredBookingKeys = [
      'title',
      'subtitle',
      'nameLabel',
      'namePlaceholder',
      'phoneLabel',
      'phonePlaceholder',
      'serviceLabel',
      'selectServiceDefault',
      'dateLabel',
      'timeSlotLabel',
      'morningSlot',
      'afternoonSlot',
      'eveningSlot',
      'commentLabel',
      'commentPlaceholder',
      'submit',
      'loading',
      'successTitle',
      'successDesc',
      'errorTitle',
      'errorDesc',
      'directCall',
    ];

    for (const key of requiredBookingKeys) {
      expect(translations.ua.booking[key as keyof typeof translations.ua.booking]).toBeDefined();
      expect(translations.en.booking[key as keyof typeof translations.en.booking]).toBeDefined();
    }

    expect(translations.ua.booking.submit).toBe('Записатися на прийом');
    expect(translations.en.booking.submit).toBe('Book an Appointment');
  });

  it('should contain at least 3 genuine reviews', () => {
    expect(translations.ua.reviews.title).toBeDefined();
    expect(translations.en.reviews.title).toBeDefined();
    expect(translations.ua.reviews.subtitle).toBeDefined();
    expect(translations.en.reviews.subtitle).toBeDefined();

    expect(translations.ua.reviews.items.length).toBeGreaterThanOrEqual(3);
    expect(translations.en.reviews.items.length).toBeGreaterThanOrEqual(3);

    for (const item of translations.ua.reviews.items) {
      expect(item.name).toBeTruthy();
      expect(item.text).toBeTruthy();
      expect(item.rating).toBe(5);
    }
  });

  it('should contain exact footer contact and location information', () => {
    expect(translations.ua.footer.addressValue).toBe('м. Львів, вул. Бойківська, 2');
    expect(translations.ua.footer.scheduleValue).toBe('Пн–Пт 10:00–19:00');
    expect(translations.ua.footer.phoneValue).toBe('+380 96 088 9889');
    expect(translations.en.footer.phoneValue).toBe('+380 96 088 9889');
    expect(translations.ua.footer.instagramLabel).toBe('@famiglia_2022');
    expect(translations.en.footer.instagramLabel).toBe('@famiglia_2022');
    expect(translations.ua.footer.copyright).toContain('Famiglia');
  });

  it('should deeply mirror all keys between UA and EN objects', () => {
    function compareObjectShape(uaObj: any, enObj: any, path = '') {
      const uaKeys = Object.keys(uaObj).sort();
      const enKeys = Object.keys(enObj).sort();
      expect(enKeys, `Keys mismatch at path "${path}"`).toEqual(uaKeys);

      for (const key of uaKeys) {
        const currentPath = path ? `${path}.${key}` : key;
        const uaVal = uaObj[key];
        const enVal = enObj[key];

        expect(typeof enVal, `Type mismatch at path "${currentPath}"`).toBe(typeof uaVal);

        if (typeof uaVal === 'object' && uaVal !== null && !Array.isArray(uaVal)) {
          compareObjectShape(uaVal, enVal, currentPath);
        } else if (Array.isArray(uaVal)) {
          expect(Array.isArray(enVal), `Expected array at path "${currentPath}"`).toBe(true);
          expect(enVal.length, `Array length mismatch at path "${currentPath}"`).toBe(uaVal.length);
        }
      }
    }

    compareObjectShape(translations.ua, translations.en);
  });
});

describe('i18n Context and Hook', () => {
  it('should provide default ua locale and translations', () => {
    function TestConsumer() {
      const { locale, t } = useI18n();
      return React.createElement('div', { id: 'test' }, `${locale}|${t.nav.bookBtn}`);
    }

    const html = renderToString(
      React.createElement(I18nProvider, null, React.createElement(TestConsumer))
    );

    expect(html).toContain('ua|');
  });

  it('should allow setting initial locale', () => {
    function TestConsumer() {
      const { locale, t } = useI18n();
      return React.createElement('div', { id: 'test' }, `${locale}|${t.nav.bookBtn}`);
    }

    const html = renderToString(
      React.createElement(I18nProvider, { initialLocale: 'en' }, React.createElement(TestConsumer))
    );

    expect(html).toContain('en|');
  });

  it('should throw error when useI18n is used outside I18nProvider', () => {
    function TestConsumer() {
      useI18n();
      return null;
    }

    expect(() => {
      renderToString(React.createElement(TestConsumer));
    }).toThrow(/useI18n must be used within an I18nProvider/);
  });
});
