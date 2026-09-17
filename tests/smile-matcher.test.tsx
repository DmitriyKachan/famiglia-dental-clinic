import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nProvider } from '../src/lib/i18n/context';
import { SmileMatcher } from '../src/components/SmileMatcher';

describe('SmileMatcher Component', () => {
  it('renders interactive express smile matcher in UA locale', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <SmileMatcher />
      </I18nProvider>
    );

    expect(html).toContain('ШВИДКИЙ ВИБІР РІШЕННЯ');
    expect(html).toContain('Яка ваша мета сьогодні?');
    expect(html).toContain('Естетика &amp; Престиж');
    expect(html).toContain('Миттєве сяйво');
    expect(html).toContain('Збереження &amp; Комфорт');
    expect(html).toContain('Турбота про дітей');
    expect(html).toContain('Обрати це лікування');
  });

  it('renders interactive express smile matcher in EN locale', () => {
    const html = renderToString(
      <I18nProvider initialLocale="en">
        <SmileMatcher />
      </I18nProvider>
    );

    expect(html).toContain('EXPRESS SMILE SELECTOR');
    expect(html).toContain('What is your main dental goal today?');
    expect(html).toContain('Aesthetics &amp; Prestige');
    expect(html).toContain('Instant Radiance');
    expect(html).toContain('Select this treatment');
  });
});
