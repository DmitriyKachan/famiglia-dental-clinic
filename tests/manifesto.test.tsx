import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nProvider } from '../src/lib/i18n/context';
import { KineticManifesto } from '../src/components/KineticManifesto';

describe('KineticManifesto component', () => {
  it('renders precision metrics and manifesto quote', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <KineticManifesto />
      </I18nProvider>
    );
    expect(html).toContain('ФІЛОСОФІЯ ТОЧНОСТІ');
    expect(html).toContain('0.02 mm');
    expect(html).toContain('100%');
    expect(html).toContain('15+ р.');
    expect(html).toContain('Тетяни Бибіс');
  });
});
