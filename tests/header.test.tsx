import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nProvider } from '../src/lib/i18n/context';
import { Header } from '../src/components/Header';
import { MobileStickyBar } from '../src/components/MobileStickyBar';

describe('Header Component', () => {
  it('renders Header with brand name, phone, and logo subtitle in UA', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <Header />
      </I18nProvider>
    );
    expect(html).toContain('Famiglia');
    expect(html).toContain('+380 96 088 9889');
    expect(html).toContain('tel:+380960889889');
    expect(html).toContain('Стоматологія твоєї сімʼї');
    expect(html).toContain('#services');
    expect(html).toContain('#cases');
    expect(html).toContain('#about');
    expect(html).toContain('#reviews');
    expect(html).toContain('#booking');
    expect(html).toContain('#contacts');
    expect(html).toContain('backdrop-blur-md');
    expect(html).toContain('bg-brand-base/90');
    expect(html).toContain('border-brand-border');
    expect(html).toContain('sticky top-0');
  });

  it('renders Header with brand name and logo subtitle in EN', () => {
    const html = renderToString(
      <I18nProvider initialLocale="en">
        <Header />
      </I18nProvider>
    );
    expect(html).toContain('Famiglia');
    expect(html).toContain('+380 96 088 9889');
    expect(html).toContain('Your Family Dentistry');
    expect(html).toContain('Services');
    expect(html).toContain('Cases');
    expect(html).toContain('About Us');
    expect(html).toContain('Reviews');
    expect(html).toContain('Contacts');
    expect(html).toContain('Book Visit');
  });
});

describe('MobileStickyBar Component', () => {
  it('renders MobileStickyBar with Call and Book buttons in UA', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <MobileStickyBar />
      </I18nProvider>
    );
    expect(html).toContain('Зателефонувати');
    expect(html).toContain('Записатися');
    expect(html).toContain('tel:+380960889889');
    expect(html).toContain('href="#booking"');
    expect(html).toContain('fixed bottom-0');
    expect(html).toContain('md:hidden');
  });

  it('renders MobileStickyBar with Call and Book buttons in EN', () => {
    const html = renderToString(
      <I18nProvider initialLocale="en">
        <MobileStickyBar />
      </I18nProvider>
    );
    expect(html).toContain('Call Us');
    expect(html).toContain('Book Visit');
    expect(html).toContain('tel:+380960889889');
    expect(html).toContain('href="#booking"');
    expect(html).toContain('fixed bottom-0');
    expect(html).toContain('md:hidden');
  });
});
