import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nProvider } from '../src/lib/i18n/context';
import { BookingForm } from '../src/components/BookingForm';

describe('BookingForm component', () => {
  it('renders all form fields, labels, and submit button in Ukrainian', () => {
    const html = renderToString(
      <I18nProvider initialLocale="ua">
        <BookingForm />
      </I18nProvider>
    );
    expect(html).toContain('Онлайн-запис');
    expect(html).toContain('Ваше ім&#x27;я');
    expect(html).toContain('Номер телефону');
    expect(html).toContain('Оберіть послугу');
    expect(html).toContain('Бажана дата');
    expect(html).toContain('Зручний час');
    expect(html).toContain('Записатися на прийом');
    expect(html).toContain('Ранок');
    expect(html).toContain('День');
    expect(html).toContain('Вечір');
  });

  it('renders labels and buttons in English mode', () => {
    const html = renderToString(
      <I18nProvider initialLocale="en">
        <BookingForm />
      </I18nProvider>
    );
    expect(html).toContain('Online Booking');
    expect(html).toContain('Your Name');
    expect(html).toContain('Phone Number');
    expect(html).toContain('Select Service');
    expect(html).toContain('Preferred Date');
    expect(html).toContain('Book an Appointment');
  });
});
