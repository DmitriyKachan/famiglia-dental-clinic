// @vitest-environment jsdom
import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { I18nProvider } from '../src/lib/i18n/context';
import { BeforeAfter } from '../src/components/BeforeAfter';
import { translations } from '../src/lib/i18n/translations';

beforeAll(() => {
  // Mock matchMedia for jsdom environment
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

afterEach(() => {
  cleanup();
});

describe('BeforeAfter Component (Interactive Clinical Cases)', () => {
  it('renders section anchors for new #cases and backward-compatible #results', () => {
    const { container } = render(
      <I18nProvider initialLocale="ua">
        <BeforeAfter />
      </I18nProvider>
    );

    const section = container.querySelector('section#cases');
    expect(section).not.toBeNull();
    const legacyAnchor = container.querySelector('#results');
    expect(legacyAnchor).not.toBeNull();
  });

  it('renders all 3 case selector tabs and switches active case upon click', () => {
    render(
      <I18nProvider initialLocale="ua">
        <BeforeAfter />
      </I18nProvider>
    );

    const veneersTab = screen.getByRole('button', {
      name: translations.ua.cases.tabs.veneers,
    });
    const restorationTab = screen.getByRole('button', {
      name: translations.ua.cases.tabs.restoration,
    });
    const whiteningTab = screen.getByRole('button', {
      name: translations.ua.cases.tabs.whitening,
    });

    expect(veneersTab).not.toBeNull();
    expect(restorationTab).not.toBeNull();
    expect(whiteningTab).not.toBeNull();

    // Initially active: veneers case
    const veneersCase = translations.ua.cases.items.find(
      (c) => c.category === 'veneers'
    )!;
    expect(screen.getAllByText(veneersCase.title).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(veneersCase.problem)).not.toBeNull();
    expect(screen.getByText(veneersCase.solution)).not.toBeNull();
    expect(screen.getByText(veneersCase.visits)).not.toBeNull();

    // Click Artistic Restoration tab
    fireEvent.click(restorationTab);
    const restorationCase = translations.ua.cases.items.find(
      (c) => c.category === 'restoration'
    )!;
    expect(screen.getAllByText(restorationCase.title).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(restorationCase.problem)).not.toBeNull();
    expect(screen.getByText(restorationCase.solution)).not.toBeNull();
    expect(screen.getByText(restorationCase.visits)).not.toBeNull();

    // Click Beyond Whitening tab
    fireEvent.click(whiteningTab);
    const whiteningCase = translations.ua.cases.items.find(
      (c) => c.category === 'whitening'
    )!;
    expect(screen.getAllByText(whiteningCase.title).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(whiteningCase.problem)).not.toBeNull();
    expect(screen.getByText(whiteningCase.solution)).not.toBeNull();
    expect(screen.getByText(whiteningCase.visits)).not.toBeNull();
  });

  it("displays doctor's clinical note card with problem, solution, visits, and duration", () => {
    render(
      <I18nProvider initialLocale="ua">
        <BeforeAfter />
      </I18nProvider>
    );

    // Doctor details
    expect(screen.getByText('Тетяна Бибіс')).not.toBeNull();
    expect(screen.getByText(/Клінічна нотатка/i)).not.toBeNull();

    // Section headers inside clinical note
    expect(screen.getByText(/Скарга \/ Початковий стан/i)).not.toBeNull();
    expect(screen.getByText(/Рішення Тетяни Бибіс/i)).not.toBeNull();
    expect(screen.getByText(/Термін та візити/i)).not.toBeNull();

    const currentCase = translations.ua.cases.items[0];
    expect(screen.getByText(currentCase.problem)).not.toBeNull();
    expect(screen.getByText(currentCase.solution)).not.toBeNull();
    expect(screen.getByText(currentCase.visits)).not.toBeNull();
    expect(screen.getByText(currentCase.duration)).not.toBeNull();

    // Booking CTA button
    const ctaButton = screen.getByRole('link', { name: /Записатися на консультацію/i });
    expect(ctaButton.getAttribute('href')).toBe('#booking');
  });

  it('renders slider divider and handle with <> arrows and clean ДО/ПІСЛЯ pills', () => {
    render(
      <I18nProvider initialLocale="ua">
        <BeforeAfter />
      </I18nProvider>
    );

    // Slider divider line exists
    const divider = screen.getByTestId('slider-divider');
    expect(divider).not.toBeNull();
    expect(divider.className).toContain('bg-brand-gold');

    // Slider handle exists and has luxury styling + <> arrows
    const handle = screen.getByTestId('slider-handle');
    expect(handle).not.toBeNull();
    expect(handle.className).toContain('border-brand-gold');
    expect(handle.className).toContain('bg-brand-surface');
    expect(handle.textContent).toContain('<>');

    // Clean pills
    expect(screen.getByText('ДО')).not.toBeNull();
    expect(screen.getByText('ПІСЛЯ')).not.toBeNull();

    // Slider role & keyboard navigation
    const slider = screen.getByRole('slider');
    expect(slider).not.toBeNull();
    expect(slider.getAttribute('aria-valuenow')).toBe('50');

    // Test keyboard navigation
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider.getAttribute('aria-valuenow')).toBe('55');

    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(slider.getAttribute('aria-valuenow')).toBe('50');
  });

  it('correctly switches locale between UA and EN', () => {
    // 1. Ukrainian
    const { unmount } = render(
      <I18nProvider initialLocale="ua">
        <BeforeAfter />
      </I18nProvider>
    );

    expect(screen.getByText(translations.ua.cases.title)).not.toBeNull();
    expect(screen.getByText('РЕАЛЬНІ КЕЙСИ')).not.toBeNull();
    expect(screen.getByText('ДО')).not.toBeNull();
    expect(screen.getByText('ПІСЛЯ')).not.toBeNull();
    expect(screen.getByText(/Рішення Тетяни Бибіс/i)).not.toBeNull();
    expect(screen.getByText(/Скарга \/ Початковий стан/i)).not.toBeNull();

    unmount();

    // 2. English
    render(
      <I18nProvider initialLocale="en">
        <BeforeAfter />
      </I18nProvider>
    );

    expect(screen.getByText(translations.en.cases.title)).not.toBeNull();
    expect(screen.getByText('CLINICAL CASES')).not.toBeNull();
    expect(screen.getByText('BEFORE')).not.toBeNull();
    expect(screen.getByText('AFTER')).not.toBeNull();
    expect(screen.getByText('Dr. Tetiana Bybis')).not.toBeNull();
    expect(screen.getByText(/Solution by Dr. Tetiana Bybis/i)).not.toBeNull();
    expect(screen.getByText(/Chief Complaint \/ Problem/i)).not.toBeNull();
    expect(screen.getByText(/Visits & Duration/i)).not.toBeNull();

    const enVeneersCase = translations.en.cases.items.find(
      (c) => c.category === 'veneers'
    )!;
    expect(screen.getByText(enVeneersCase.problem)).not.toBeNull();
    expect(screen.getByText(enVeneersCase.solution)).not.toBeNull();
    expect(screen.getByText(enVeneersCase.visits)).not.toBeNull();
  });
});
