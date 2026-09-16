import { describe, it, expect } from 'vitest';
import tailwindConfig from '../tailwind.config';

describe('Tailwind Theme Configuration', () => {
  it('should define brand color tokens', () => {
    const colors = tailwindConfig.theme?.extend?.colors as Record<string, string>;
    expect(colors).toBeDefined();
    expect(colors['brand-dark']).toBe('#2D241E');
    expect(colors['brand-gold']).toBe('#C5A880');
    expect(colors['brand-beige']).toBe('#F6F2EA');
    expect(colors['brand-bg']).toBe('#FBF9F5');
    expect(colors['brand-surface']).toBe('#FFFFFF');
    expect(colors['brand-text-muted']).toBe('#6E6259');
  });
});
