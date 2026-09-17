import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from '../src/app/page';

describe('Full 3D Scroll-Craft Page Integration', () => {
  it('renders all 3D acts, signature move, and anchors on homepage', () => {
    const html = renderToString(<Home />);
    
    // Header & Brand
    expect(html).toContain('Famiglia');
    expect(html).toContain('+380 96 088 9889');

    // Key Section IDs
    expect(html).toContain('id="mirror-inspection"');
    expect(html).toContain('id="services"');
    expect(html).toContain('id="results"');
    expect(html).toContain('id="about"');
    expect(html).toContain('id="booking"');
    expect(html).toContain('id="reviews"');
    expect(html).toContain('id="contacts"');

    // 3D Elements & Signature Move
    expect(html).toContain('3D Інспекція мікроскопа');
    expect(html).toContain('ФІЛОСОФІЯ ТОЧНОСТІ');
    expect(html).toContain('3.5x ZOOM');

    // Doctor and Clinic Info
    expect(html).toContain('Тетяна Бибіс');
    expect(html).toContain('вул. Бойківська, 2');
    expect(html).toContain('@famiglia_2022');
  });
});
