import { describe, it, expect } from 'vitest';
import tailwindConfig from '../tailwind.config';

describe('Tailwind Theme Configuration', () => {
  it('should define brand color tokens', () => {
    const colors = tailwindConfig.theme?.extend?.colors as Record<string, string>;
    expect(colors).toBeDefined();
    expect(colors['brand-dark']).toBe('#1E1B18');
    expect(colors['brand-gold']).toBe('#C5A880');
    expect(colors['brand-base']).toBe('#FAF8F5');
    expect(colors['brand-surface']).toBe('#FFFFFF');
    expect(colors['brand-muted']).toBe('#6E655F');
    expect(colors['brand-sage']).toBe('#2D6A4F');
  });
});
