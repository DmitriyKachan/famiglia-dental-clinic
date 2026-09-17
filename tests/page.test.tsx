import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from '../src/app/page';

describe('Warm Medical Luxury Full Page Integration', () => {
  it('renders all luxury sections, narrative flow, and anchors on homepage', () => {
    const html = renderToString(<Home />);
    
    // 1. Header & Brand Identity
    expect(html).toContain('Famiglia');
    expect(html).toContain('Стоматологія твоєї сімʼї');
    expect(html).toContain('+380 96 088 9889');

    // 2. Key Section Anchors
    expect(html).toContain('id="services"');
    expect(html).toContain('id="cases"');
    expect(html).toContain('id="results"');
    expect(html).toContain('id="about"');
    expect(html).toContain('id="booking"');
    expect(html).toContain('id="reviews"');
    expect(html).toContain('id="contacts"');

    // 3. Human Warmth & Clinical Excellence
    expect(html).toContain('Тетяна Бибіс');
    expect(html).toContain('вул. Бойківська, 2');
    expect(html).toContain('@famiglia_2022');
    expect(html).toContain('100% без болю');
    expect(html).toContain('Стерильність класу B');
    expect(html).toContain('Дентальний мікроскоп 20x');

    // 4. Mobile Sticky Bar & Actions
    expect(html).toContain('aria-label="Mobile Sticky Bar"');
    expect(html).toContain('tel:+380960889889');

    // 5. Verification: NO dark sci-fi / 3D cyberpunk artifacts remain
    expect(html).not.toContain('id="mirror-inspection"');
    expect(html).not.toContain('3.5x ZOOM');
    expect(html).not.toContain('bg-[#151210]');
  });
});
