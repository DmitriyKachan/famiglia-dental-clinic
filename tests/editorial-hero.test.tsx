import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nProvider } from '../src/lib/i18n/context';
import { EditorialHero } from '../src/components/EditorialHero';

describe('EditorialHero Component', () => {
  it('renders editorial hero with marquee, cream rule, triple column, and footer in UA locale', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <EditorialHero />
      </I18nProvider>
    );

    // Full-viewport & typography
    expect(html).toContain('h-[100dvh]');
    expect(html).toContain('font-hn');
    expect(html).toContain('text-cream');

    // Header & Brand
    expect(html).toContain('Famiglia');
    expect(html).toContain('2025');
    expect(html).toContain('Послуги');
    expect(html).toContain('Кейси');
    expect(html).toContain('Запис');

    // Marquee & Cutout
    expect(html).toContain('marquee');
    expect(html).toContain('Famiglia');
    expect(html).toContain('Tetiana');
    expect(html).toContain('Bybis');
    expect(html).toContain('anim-line');
    expect(html).toContain('alt="Portrait"');

    // Footers
    expect(html).toContain('Стоматологія твоєї сімʼї');
    expect(html).toContain('Тетяна Бибіс');
    expect(html).toContain('м. Львів, вул. Бойківська, 2');
  });

  it('renders editorial hero in EN locale', () => {
    const html = renderToString(
      <I18nProvider initialLocale="en">
        <EditorialHero />
      </I18nProvider>
    );

    expect(html).toContain('Services');
    expect(html).toContain('Cases');
    expect(html).toContain('Book');
    expect(html).toContain('Chief Doctor');
    expect(html).toContain('Tetiana Bybis');
  });
});
