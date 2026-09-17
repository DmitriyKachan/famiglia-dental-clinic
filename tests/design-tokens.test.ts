import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import tailwindConfig from '../tailwind.config';
import { BlurFade } from '../src/components/magicui/BlurFade';
import { NumberTicker } from '../src/components/magicui/NumberTicker';
import { ShimmerButton } from '../src/components/magicui/ShimmerButton';

describe('Design System Tokens', () => {
  it('should define Warm Medical Luxury color palette in tailwind.config.ts', () => {
    const colors = tailwindConfig.theme?.extend?.colors as Record<string, string>;
    expect(colors).toBeDefined();
    expect(colors['brand-base']).toBe('#FAF8F5');
    expect(colors['brand-surface']).toBe('#FFFFFF');
    expect(colors['brand-dark']).toBe('#1E1B18');
    expect(colors['brand-muted']).toBe('#6E655F');
    expect(colors['brand-gold']).toBe('#C5A880');
    expect(colors['brand-gold-hover']).toBe('#B8976C');
    expect(colors['brand-sage']).toBe('#2D6A4F');
    expect(colors['brand-border']).toBe('#EFEBE4');
  });

  it('should define Warm Medical Luxury font families', () => {
    const fonts = tailwindConfig.theme?.extend?.fontFamily as Record<string, string[]>;
    expect(fonts).toBeDefined();
    expect(fonts.serif).toContain('Playfair Display');
    expect(fonts.sans).toContain('Plus Jakarta Sans');
  });

  it('should define shimmer-spin keyframes and animation', () => {
    const keyframes = tailwindConfig.theme?.extend?.keyframes as Record<string, any>;
    const animation = tailwindConfig.theme?.extend?.animation as Record<string, string>;
    expect(keyframes['shimmer-spin']).toBeDefined();
    expect(animation['shimmer-spin']).toContain('shimmer-spin');
  });
});

describe('MagicUI BlurFade Primitive Rendering', () => {
  it('renders BlurFade component with children and custom class', () => {
    const html = renderToString(
      React.createElement(
        BlurFade,
        { className: 'custom-fade', delay: 0.2, duration: 0.6, yOffset: 12 },
        React.createElement('span', null, 'Fade Content')
      )
    );
    expect(html).toContain('Fade Content');
    expect(html).toContain('custom-fade');
  });

  it('renders BlurFade with custom blur and inView false', () => {
    const html = renderToString(
      React.createElement(
        BlurFade,
        { inView: false, blur: '10px' },
        React.createElement('p', null, 'Always Visible')
      )
    );
    expect(html).toContain('Always Visible');
    expect(html).toContain('opacity:1');
    expect(html).toContain('blur(0px)');
  });
});

describe('MagicUI NumberTicker Primitive Rendering', () => {
  it('renders NumberTicker component with tabular-nums and value formatting', () => {
    const html = renderToString(
      React.createElement(NumberTicker, {
        value: 15,
        decimalPlaces: 0,
        className: 'font-bold',
      })
    );
    expect(html).toContain('tabular-nums');
    expect(html).toContain('font-bold');
  });

  it('renders NumberTicker component with decimal places (e.g. 4.9 rating)', () => {
    const html = renderToString(
      React.createElement(NumberTicker, {
        value: 4.9,
        decimalPlaces: 1,
      })
    );
    expect(html).toContain('tabular-nums');
  });

  it('renders NumberTicker with down direction initialization', () => {
    const html = renderToString(
      React.createElement(NumberTicker, {
        value: 1000,
        direction: 'down',
        decimalPlaces: 0,
      })
    );
    expect(html).toContain('tabular-nums');
    expect(html).toContain('1000');
  });
});

describe('MagicUI ShimmerButton Primitive Rendering', () => {
  it('renders ShimmerButton with children, type, and luxury styles', () => {
    const html = renderToString(
      React.createElement(
        ShimmerButton,
        { type: 'submit', className: 'custom-btn', shimmerColor: '#C5A880' },
        React.createElement('span', null, 'Записатися')
      )
    );
    expect(html).toContain('Записатися');
    expect(html).toContain('custom-btn');
    expect(html).toContain('type="submit"');
    expect(html).toContain('cursor-pointer');
    expect(html).toContain('--shimmer-color:#C5A880');
  });

  it('renders ShimmerButton disabled state', () => {
    const html = renderToString(
      React.createElement(
        ShimmerButton,
        { disabled: true },
        React.createElement('span', null, 'Disabled Action')
      )
    );
    expect(html).toContain('Disabled Action');
    expect(html).toContain('disabled=""');
  });

  it('renders ShimmerButton with custom background and border radius', () => {
    const html = renderToString(
      React.createElement(
        ShimmerButton,
        {
          background: '#2D6A4F',
          borderRadius: '8px',
          shimmerDuration: '2s',
        },
        React.createElement('span', null, 'Sage Button')
      )
    );
    expect(html).toContain('Sage Button');
    expect(html).toContain('--bg:#2D6A4F');
    expect(html).toContain('--radius:8px');
    expect(html).toContain('--speed:2s');
  });
});
