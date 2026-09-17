import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nProvider } from '../src/lib/i18n/context';
import { Header } from '../src/components/Header';
import { Hero } from '../src/components/Hero';
import { TrustBar } from '../src/components/TrustBar';

describe('Header, Hero and TrustBar components', () => {
  it('renders Header with brand name and phone', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <Header />
      </I18nProvider>
    );
    expect(html).toContain('Famiglia');
    expect(html).toContain('+380 96 088 9889');
    expect(html).toContain('Стоматологія твоєї сімʼї');
  });

  it('renders Hero with main title and CTAs', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <Hero />
      </I18nProvider>
    );
    expect(html).toContain('Творимо здорові та щасливі усмішки');
    expect(html).toContain('Записатися на прийом');
    expect(html).toContain('Наші послуги');
  });

  it('renders TrustBar with statistics', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <TrustBar />
      </I18nProvider>
    );
    expect(html).toContain('15+');
    expect(html).toContain('100%');
    expect(html).toContain('1000+');
  });

  it('renders correctly in English mode', () => {
    const html = renderToString(
      <I18nProvider initialLocale="en">
        <Hero />
      </I18nProvider>
    );
    expect(html).toContain('Book an Appointment');
    expect(html).toContain('Our Services');
  });
});
