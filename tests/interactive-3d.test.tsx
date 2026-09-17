import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nProvider } from '../src/lib/i18n/context';
import { InteractiveTooth3D } from '../src/components/InteractiveTooth3D';

describe('InteractiveTooth3D Component', () => {
  it('renders 3D interactive diagnostic showcase in UA locale', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <InteractiveTooth3D />
      </I18nProvider>
    );

    expect(html).toContain('ІНТЕРАКТИВНИЙ 3D-ДОСВІД');
    expect(html).toContain('Цифрове моделювання та ювелірна точність');
    expect(html).toContain('Вініри 0.3 мм');
    expect(html).toContain('Емаль та коронка');
    expect(html).toContain('Імплантація');
    expect(html).toContain('Ультратонка кераміка 0.3–0.5 мм');
    expect(html).toContain('Записатися на 3D-діагностику');
  });

  it('renders in EN locale properly', () => {
    const html = renderToString(
      <I18nProvider initialLocale="en">
        <InteractiveTooth3D />
      </I18nProvider>
    );

    expect(html).toContain('INTERACTIVE 3D EXPERIENCE');
    expect(html).toContain('Digital Modeling &amp; Micro-Precision Precision');
    expect(html).toContain('Veneers 0.3mm');
    expect(html).toContain('Book 3D Smile Consultation');
  });
});
