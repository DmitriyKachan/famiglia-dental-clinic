import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from '../src/app/page';

describe('Full Page Integration', () => {
  it('renders all sections and anchors on homepage', () => {
    const html = renderToString(<Home />);
    
    // Header & Logo
    expect(html).toContain('Famiglia');
    expect(html).toContain('+380 96 088 9889');

    // Section IDs for smooth scroll anchors
    expect(html).toContain('id="services"');
    expect(html).toContain('id="results"');
    expect(html).toContain('id="about"');
    expect(html).toContain('id="booking"');
    expect(html).toContain('id="reviews"');
    expect(html).toContain('id="contacts"');

    // Doctor and Clinic Info
    expect(html).toContain('Тетяна Бибіс');
    expect(html).toContain('Бойківська, 2');
    expect(html).toContain('@famiglia_2022');
  });
});
