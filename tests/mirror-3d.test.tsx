import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nProvider } from '../src/lib/i18n/context';
import { PrecisionMirror3D } from '../src/components/PrecisionMirror3D';

describe('PrecisionMirror3D Component (Signature Move)', () => {
  it('renders 3D mirror stage, zoom tags, and optical telemetry in UA', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <PrecisionMirror3D />
      </I18nProvider>
    );
    expect(html).toContain('3D Інспекція мікроскопа');
    expect(html).toContain('АВТОРСЬКИЙ ІНТЕРАКТИВ');
    expect(html).toContain('3.5x ZOOM');
    expect(html).toContain('ZEISS 25X LOUPE');
    expect(html).toContain('Керамічний вінір e.max');
  });

  it('renders correctly in English mode', () => {
    const html = renderToString(
      <I18nProvider initialLocale="en">
        <PrecisionMirror3D />
      </I18nProvider>
    );
    expect(html).toContain('SIGNATURE MOVE');
    expect(html).toContain('3D Optical Microscope Inspection');
    expect(html).toContain('Ceramic Veneer e.max');
  });
});
