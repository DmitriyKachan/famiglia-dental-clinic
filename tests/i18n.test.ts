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

  it('should have matching top-level keys between ua and en including new sections', () => {
    const uaKeys = Object.keys(translations.ua).sort();
    const enKeys = Object.keys(translations.en).sort();
    expect(uaKeys).toEqual(enKeys);
    expect(uaKeys).toEqual([
      'about',
      'beforeAfter',
      'booking',
      'cases',
      'footer',
      'hero',
      'mobileSticky',
      'nav',
      'reviews',
      'services',
      'trust',
    ]);
  });

  it('should contain all required nav keys and Warm Medical Luxury values', () => {
    const requiredNavKeys = [
      'logo',
      'logoSubtitle',
      'services',
      'cases',
      'results',
      'about',
      'reviews',
      'contacts',
      'bookBtn',
      'callBtn',
    ];
    for (const key of requiredNavKeys) {
      expect(translations.ua.nav[key as keyof typeof translations.ua.nav]).toBeDefined();
      expect(translations.en.nav[key as keyof typeof translations.en.nav]).toBeDefined();
    }
    expect(translations.ua.nav.logoSubtitle).toBe('Стоматологія твоєї сімʼї');
    expect(translations.en.nav.logoSubtitle).toBe('Your Family Dentistry');
    expect(translations.ua.nav.callBtn).toBe('Зателефонувати');
    expect(translations.en.nav.callBtn).toBe('Call Us');
  });

  it('should contain all required hero keys and Warm Medical Luxury values', () => {
    const requiredHeroKeys = [
      'badge',
      'title',
      'subtitle',
      'ctaBooking',
      'ctaServices',
      'ratingValue',
      'ratingCount',
      'founderBadge',
      'experienceBadge',
      'ratingNote',
    ];
    for (const key of requiredHeroKeys) {
      expect(translations.ua.hero[key as keyof typeof translations.ua.hero]).toBeDefined();
      expect(translations.en.hero[key as keyof typeof translations.en.hero]).toBeDefined();
    }

    expect(translations.ua.hero.badge).toBe('м. Львів • вул. Бойківська, 2');
    expect(translations.ua.hero.title).toBe('Стоматологія, де турбота відчувається в кожній деталі');
    expect(translations.en.hero.title).toBe('Dentistry where care is felt in every detail');
    expect(translations.ua.hero.subtitle).toBe('Безболісне, спокійне та естетичне лікування зубів для всієї родини від лікаря Тетяни Бибіс.');
    expect(translations.en.hero.subtitle).toBe('Painless, tranquil, and aesthetic dental care for the whole family by Dr. Tetiana Bybis.');
    expect(translations.ua.hero.ctaBooking).toBe('Записатися на прийом');
    expect(translations.ua.hero.ctaServices).toBe('Послуги та ціни');
    expect(translations.ua.hero.ratingValue).toBe('4.9');
    expect(translations.ua.hero.ratingCount).toBe('500+ оцінок');
    expect(translations.ua.hero.founderBadge).toBe('Тетяна Бибіс • Головний лікар');
    expect(translations.ua.hero.experienceBadge).toBe('15+ років практики');
  });

  it('should contain all required trust pillars and metrics', () => {
    const requiredTrustKeys = [
      'painlessTitle',
      'painlessDesc',
      'sterileTitle',
      'sterileDesc',
      'microscopeTitle',
      'microscopeDesc',
      'kidsTitle',
      'kidsDesc',
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

    // 4 pillars specific assertions
    expect(translations.ua.trust.painlessTitle).toBe('100% без болю');
    expect(translations.ua.trust.painlessDesc).toBe("Комп'ютерна анестезія STA без оніміння та дискомфорту");
    expect(translations.ua.trust.sterileTitle).toBe('Стерильність класу B');
    expect(translations.ua.trust.sterileDesc).toBe('Європейські автоклави та індивідуальні крафт-пакети');
    expect(translations.ua.trust.microscopeTitle).toBe('Дентальний мікроскоп 20x');
    expect(translations.ua.trust.microscopeDesc).toBe('Збереження здорових тканин та прецизійна точність');
    expect(translations.ua.trust.kidsTitle).toBe('Затишок для дітей');
    expect(translations.ua.trust.kidsDesc).toBe('Адаптаційні візити без сліз, мультфільми та подарунки');
  });

  it('should contain 6 services with id, title, desc, priceFrom, duration, and features array', () => {
    expect(translations.ua.services.title).toBeDefined();
    expect(translations.en.services.title).toBeDefined();
    expect(translations.ua.services.subtitle).toBeDefined();
    expect(translations.en.services.subtitle).toBeDefined();

    expect(translations.ua.services.items).toHaveLength(6);
    expect(translations.en.services.items).toHaveLength(6);

    const expectedServiceIds = ['therapy', 'veneers', 'ortho', 'kids', 'surgery', 'hygiene'];

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

      expect(uaItem.duration).toBeTruthy();
      expect(enItem.duration).toBeTruthy();

      expect(Array.isArray(uaItem.features)).toBe(true);
      expect(Array.isArray(enItem.features)).toBe(true);
      expect(uaItem.features.length).toBeGreaterThan(0);
      expect(enItem.features.length).toBe(uaItem.features.length);
    }
  });

  it('should contain cases section with tabs and detailed case items', () => {
    expect(translations.ua.cases.title).toBeDefined();
    expect(translations.en.cases.title).toBeDefined();
    expect(translations.ua.cases.subtitle).toBeDefined();
    expect(translations.en.cases.subtitle).toBeDefined();

    expect(translations.ua.cases.tabs.veneers).toBeDefined();
    expect(translations.ua.cases.tabs.restoration).toBeDefined();
    expect(translations.ua.cases.tabs.whitening).toBeDefined();
    expect(translations.en.cases.tabs.veneers).toBeDefined();
    expect(translations.en.cases.tabs.restoration).toBeDefined();
    expect(translations.en.cases.tabs.whitening).toBeDefined();

    expect(translations.ua.cases.items.length).toBeGreaterThanOrEqual(3);
    expect(translations.en.cases.items.length).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < translations.ua.cases.items.length; i++) {
      const uaCase = translations.ua.cases.items[i];
      const enCase = translations.en.cases.items[i];

      expect(uaCase.id).toBe(enCase.id);
      expect(uaCase.title).toBeTruthy();
      expect(enCase.title).toBeTruthy();
      expect(uaCase.category).toBe(enCase.category);
      expect(uaCase.problem).toBeTruthy();
      expect(enCase.problem).toBeTruthy();
      expect(uaCase.solution).toBeTruthy();
      expect(enCase.solution).toBeTruthy();
      expect(uaCase.visits).toBeTruthy();
      expect(enCase.visits).toBeTruthy();
      expect(uaCase.duration).toBeTruthy();
      expect(enCase.duration).toBeTruthy();
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

  it('should contain about section with exact founder name, role, bio, address and instagram', () => {
    expect(translations.ua.about.title).toBeDefined();
    expect(translations.en.about.title).toBeDefined();
    expect(translations.ua.about.founderName).toBe('Тетяна Бибіс');
    expect(translations.en.about.founderName).toBe('Tetiana Bybis');
    expect(translations.ua.about.founderRole).toBe('Засновниця та головний лікар');
    expect(translations.en.about.founderRole).toBe('Founder & Chief Doctor');
    expect(translations.ua.about.quote).toBeDefined();
    expect(translations.en.about.quote).toBeDefined();
    expect(translations.ua.about.bioP1).toBeDefined();
    expect(translations.en.about.bioP1).toBeDefined();
    expect(translations.ua.about.bioP2).toBeDefined();
    expect(translations.en.about.bioP2).toBeDefined();
    expect(translations.ua.about.clinicAddress).toBe('м. Львів, вул. Бойківська, 2');
    expect(translations.en.about.clinicAddress).toBe('2 Boikivska St, Lviv');
    expect(translations.ua.about.instagramHandle).toBe('@famiglia_2022');
    expect(translations.en.about.instagramHandle).toBe('@famiglia_2022');
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

  it('should contain at least 4 verified reviews with name, service, date, rating, and comment', () => {
    expect(translations.ua.reviews.title).toBeDefined();
    expect(translations.en.reviews.title).toBeDefined();
    expect(translations.ua.reviews.subtitle).toBeDefined();
    expect(translations.en.reviews.subtitle).toBeDefined();

    expect(translations.ua.reviews.items.length).toBeGreaterThanOrEqual(4);
    expect(translations.en.reviews.items.length).toBeGreaterThanOrEqual(4);

    for (const item of translations.ua.reviews.items) {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.service).toBeTruthy();
      expect(item.comment).toBeTruthy();
      expect(item.text).toBeTruthy();
      expect(item.rating).toBe(5);
      expect(item.date).toBeTruthy();
    }

    for (const item of translations.en.reviews.items) {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.service).toBeTruthy();
      expect(item.comment).toBeTruthy();
      expect(item.text).toBeTruthy();
      expect(item.rating).toBe(5);
      expect(item.date).toBeTruthy();
    }
  });

  it('should contain mobileSticky actions for phone and booking', () => {
    expect(translations.ua.mobileSticky.call).toBe('Зателефонувати');
    expect(translations.ua.mobileSticky.book).toBe('Записатися');
    expect(translations.en.mobileSticky.call).toBe('Call Us');
    expect(translations.en.mobileSticky.book).toBe('Book Visit');
  });

  it('should contain exact footer contact and location information', () => {
    expect(translations.ua.footer.addressValue).toBe('м. Львів, вул. Бойківська, 2');
    expect(translations.en.footer.addressValue).toBe('2 Boikivska St, Lviv');
    expect(translations.ua.footer.scheduleValue).toBe('Пн–Пт 10:00–19:00');
    expect(translations.en.footer.scheduleValue).toBe('Mon–Fri 10:00–19:00');
    expect(translations.ua.footer.phoneValue).toBe('+380 96 088 9889');
    expect(translations.en.footer.phoneValue).toBe('+380 96 088 9889');
    expect(translations.ua.footer.instagramLabel).toBe('@famiglia_2022');
    expect(translations.en.footer.instagramLabel).toBe('@famiglia_2022');
    expect(translations.ua.footer.copyright).toContain('Famiglia');
    expect(translations.en.footer.copyright).toContain('Famiglia');
  });

  it('should deeply mirror all keys, types and array lengths between UA and EN objects (100% key parity)', () => {
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
          for (let i = 0; i < uaVal.length; i++) {
            if (typeof uaVal[i] === 'object' && uaVal[i] !== null) {
              compareObjectShape(uaVal[i], enVal[i], `${currentPath}[${i}]`);
            }
          }
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
