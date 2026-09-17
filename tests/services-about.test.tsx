import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nProvider } from '../src/lib/i18n/context';
import { Services } from '../src/components/Services';
import { BeforeAfter } from '../src/components/BeforeAfter';
import { AboutDoctor } from '../src/components/AboutDoctor';

describe('Services, BeforeAfter and AboutDoctor components', () => {
  it('renders Services with 6 treatment categories', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <Services />
      </I18nProvider>
    );
    expect(html).toContain('Напрямки лікування');
    expect(html).toContain('Ортодонтія');
    expect(html).toContain('Дитяча стоматологія 🧸');
    expect(html).toContain('від 1 500 ₴');
  });

  it('renders BeforeAfter comparison gallery with tabs', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <BeforeAfter />
      </I18nProvider>
    );
    expect(html).toContain('Галерея робіт');
    expect(html).toContain('Естетична реставрація');
    expect(html).toContain('Ортодонтія');
    expect(html).toContain('Відбілювання');
    expect(html).toContain('До');
    expect(html).toContain('Після');
  });

  it('renders AboutDoctor with Dr. Tetiana Bybis and clinic story', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <AboutDoctor />
      </I18nProvider>
    );
    expect(html).toContain('Тетяна Бибіс');
    expect(html).toContain('@famiglia_2022');
    expect(html).toContain('15+ років');
  });
});
