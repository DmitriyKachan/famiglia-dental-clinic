import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nProvider } from '../src/lib/i18n/context';
import { AppleNavBar } from '../src/components/AppleNavBar';
import { AppleDock } from '../src/components/AppleDock';
import { ServicesSection } from '../src/components/ServicesSection';
import { CasesSection } from '../src/components/CasesSection';
import { DoctorSection } from '../src/components/DoctorSection';
import { BookingTerminalSection } from '../src/components/BookingTerminalSection';
import Home from '../src/app/page';

describe('Apple LiquidGlass & Window Folding Suite', () => {
  it('renders AppleNavBar with floating island, brand, and booking action', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <AppleNavBar
          onOpenBooking={() => {}}
          onOpenServices={() => {}}
          onOpenCases={() => {}}
        />
      </I18nProvider>
    );

    expect(html).toContain('apple-glass');
    expect(html).toContain('Famiglia');
    expect(html).toContain('Запис відкритий');
    expect(html).toContain('Стандарти');
    expect(html).toContain('Послуги');
    expect(html).toContain('Кейси');
    expect(html).toContain('UA');
    expect(html).toContain('EN');
  });

  it('renders AppleDock when windows are minimized', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <AppleDock
          minimizedBooking={true}
          minimizedServices={true}
          minimizedCases={false}
          onRestoreBooking={() => {}}
          onRestoreServices={() => {}}
          onRestoreCases={() => {}}
          onOpenBooking={() => {}}
        />
      </I18nProvider>
    );

    expect(html).toContain('apple-dock-glow');
    expect(html).toContain('Згорнуто:');
    expect(html).toContain('Запис');
    expect(html).toContain('Послуги');
  });

  it('renders ServicesSection with Apple LiquidGlass cards and protocol details', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <ServicesSection
          onSelectService={() => {}}
          onOpenFullCatalog={() => {}}
        />
      </I18nProvider>
    );

    expect(html).toContain('apple-glass-card');
    expect(html).toContain('Напрямки лікування');
    expect(html).toContain('Деталі протоколу');
    expect(html).toContain('Carl Zeiss протокол');
  });

  it('renders CasesSection with Apple macOS titlebar and traffic lights', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <CasesSection onOpenBooking={() => {}} />
      </I18nProvider>
    );

    expect(html).toContain('apple-dot-close');
    expect(html).toContain('apple-dot-minimize');
    expect(html).toContain('apple-dot-maximize');
    expect(html).toContain('Carl Zeiss 20x Studio');
    expect(html).toContain('Потягніть повзунок для порівняння');
  });

  it('renders DoctorSection with Dr. Tetiana Bybis editorial portrait', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <DoctorSection onOpenBooking={() => {}} />
      </I18nProvider>
    );

    expect(html).toContain('Тетяна Бибіс');
    expect(html).toContain('Carl Zeiss Specialist');
    expect(html).toContain('Мікроскоп 20x');
    expect(html).toContain('Клас B Melag');
  });

  it('renders BookingTerminalSection with macOS window and booking inputs', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <BookingTerminalSection />
      </I18nProvider>
    );

    expect(html).toContain('Famiglia Booking Studio — Terminal v2.5');
    expect(html).toContain('apple-dot-close');
    expect(html).toContain('+380 96 088 9889');
    expect(html).toContain('м. Львів, вул. Бойківська, 2');
    expect(html).toContain('Підтвердити запис');
  });

  it('renders full multi-chapter page seamlessly with all Apple LiquidGlass sections', () => {
    const html = renderToString(<Home />);

    expect(html).toContain('h-[100dvh]');
    expect(html).toContain('standards');
    expect(html).toContain('services');
    expect(html).toContain('cases');
    expect(html).toContain('doctor');
    expect(html).toContain('booking');
  });
});
