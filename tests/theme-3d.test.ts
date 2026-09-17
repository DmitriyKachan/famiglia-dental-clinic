import { describe, it, expect } from 'vitest';
import tailwindConfig from '../tailwind.config';

describe('3D Theme & Optics Configuration', () => {
  it('should define optical color tokens in tailwind', () => {
    const colors = tailwindConfig.theme?.extend?.colors as Record<string, string>;
    expect(colors['optic-dark']).toBe('#151210');
    expect(colors['optic-gold']).toBe('#D4AF37');
    expect(colors['optic-cyan']).toBe('#38BDF8');
  });
});
