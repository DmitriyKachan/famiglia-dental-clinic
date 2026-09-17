import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from '../src/app/page';

describe('Editorial Black & Cream Full Page Integration', () => {
  it('renders single full-viewport hero composition with marquee, cream rule, and chrome', () => {
    const html = renderToString(<Home />);

    // 1. Single full-viewport hero
    expect(html).toContain('h-[100dvh]');
    expect(html).toContain('overflow-hidden');
    expect(html).toContain('font-hn');

    // 2. Brand Identity & Header
    expect(html).toContain('Famiglia');
    expect(html).toContain('2025');
    expect(html).toContain('Послуги');
    expect(html).toContain('Кейси');
    expect(html).toContain('Запис');

    // 3. Layering & Marquee
    expect(html).toContain('marquee');
    expect(html).toContain('Tetiana');
    expect(html).toContain('Bybis');
    expect(html).toContain('anim-line');
    expect(html).toContain('anim-fade-in');
    expect(html).toContain('anim-rise-in');

    // 4. Footers & Contacts
    expect(html).toContain('Стоматологія твоєї сімʼї');
    expect(html).toContain('Тетяна Бибіс');
    expect(html).toContain('+380 96 088 9889');

    // 5. Verification: 3D interactive element removed as requested
    expect(html).not.toContain('ІНТЕРАКТИВНИЙ 3D-ДОСВІД');
    expect(html).not.toContain('InteractiveTooth3D');
  });
});
