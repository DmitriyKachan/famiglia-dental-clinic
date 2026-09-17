// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { I18nProvider } from '../src/lib/i18n/context';
import { BookingForm } from '../src/components/BookingForm';
import { BookingModal } from '../src/components/BookingModal';
import { translations } from '../src/lib/i18n/translations';

describe('BookingForm and BookingModal', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
    global.fetch = originalFetch;
  });

  describe('BookingForm component', () => {
    it('renders all fields, labels, time slot chips, and phone link in Ukrainian', () => {
      const { container } = render(
        <I18nProvider initialLocale="ua">
          <BookingForm />
        </I18nProvider>
      );

      // Section ID
      const section = container.querySelector('#booking');
      expect(section).not.toBeNull();

      // Name input
      const nameInput = screen.getByPlaceholderText(translations.ua.booking.namePlaceholder);
      expect(nameInput).toBeDefined();
      expect(screen.getByText(translations.ua.booking.nameLabel)).toBeDefined();

      // Phone input
      const phoneInput = screen.getByPlaceholderText(translations.ua.booking.phonePlaceholder);
      expect(phoneInput).toBeDefined();
      expect(screen.getByText(translations.ua.booking.phoneLabel)).toBeDefined();

      // Service select
      const serviceSelect = container.querySelector('select');
      expect(serviceSelect).not.toBeNull();
      expect(screen.getByText(translations.ua.booking.selectServiceDefault)).toBeDefined();
      // Should include all 6 services
      translations.ua.services.items.forEach((srv) => {
        expect(container.textContent).toContain(srv.title);
      });

      // Date picker
      const dateInput = container.querySelector('input[type="date"]');
      expect(dateInput).not.toBeNull();
      const todayStr = new Date().toISOString().split('T')[0];
      expect(dateInput?.getAttribute('min')).toBe(todayStr);

      // Time slot chips
      expect(screen.getByText(translations.ua.booking.morningSlot)).toBeDefined();
      expect(screen.getByText(translations.ua.booking.afternoonSlot)).toBeDefined();
      expect(screen.getByText(translations.ua.booking.eveningSlot)).toBeDefined();

      // Comment textarea
      const commentInput = screen.getByPlaceholderText(translations.ua.booking.commentPlaceholder);
      expect(commentInput).toBeDefined();

      // Submit button
      expect(screen.getByText(translations.ua.booking.submit)).toBeDefined();

      // Direct call fallback phone link
      const phoneLink = container.querySelector('a[href="tel:+380960889889"]');
      expect(phoneLink).not.toBeNull();
      expect(phoneLink?.textContent).toContain(translations.ua.booking.directCall);
    });

    it('renders compact mode when isModal={true}', () => {
      const { container } = render(
        <I18nProvider initialLocale="ua">
          <BookingForm isModal={true} />
        </I18nProvider>
      );

      // Should not render the outer section with #booking
      const section = container.querySelector('section#booking');
      expect(section).toBeNull();

      // Should still render all essential form elements
      expect(screen.getByPlaceholderText(translations.ua.booking.namePlaceholder)).toBeDefined();
      expect(screen.getByPlaceholderText(translations.ua.booking.phonePlaceholder)).toBeDefined();
      expect(screen.getByText(translations.ua.booking.submit)).toBeDefined();
    });

    it('updates service selection on window select-service event', () => {
      const { container } = render(
        <I18nProvider initialLocale="ua">
          <BookingForm />
        </I18nProvider>
      );

      const select = container.querySelector('select') as HTMLSelectElement;
      expect(select.value).toBe('');

      const targetService = translations.ua.services.items[1].title; // Керамічні вініри
      fireEvent(
        window,
        new CustomEvent('select-service', {
          detail: { service: targetService },
        })
      );

      expect(select.value).toBe(targetService);
    });

    it('submits valid form data to /api/appointment and displays success screen', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, mode: 'mock' }),
      });
      global.fetch = mockFetch;

      const { container } = render(
        <I18nProvider initialLocale="ua">
          <BookingForm />
        </I18nProvider>
      );

      const nameInput = screen.getByPlaceholderText(translations.ua.booking.namePlaceholder);
      const phoneInput = screen.getByPlaceholderText(translations.ua.booking.phonePlaceholder);
      const select = container.querySelector('select') as HTMLSelectElement;
      const submitBtn = screen.getByRole('button', { name: new RegExp(translations.ua.booking.submit, 'i') });

      fireEvent.change(nameInput, { target: { value: 'Оксана Мельник' } });
      fireEvent.change(phoneInput, { target: { value: '+380961234567' } });
      fireEvent.change(select, { target: { value: translations.ua.services.items[0].title } });

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/appointment',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: expect.stringContaining('Оксана Мельник'),
          })
        );
      });

      // Verify success screen is rendered
      await waitFor(() => {
        expect(screen.getByText(translations.ua.booking.successTitle)).toBeDefined();
        expect(screen.getByText(translations.ua.booking.successDesc)).toBeDefined();
        expect(container.textContent).toContain('Оксана Мельник');
        expect(container.textContent).toContain('+380961234567');
      });
    });

    it('handles API error and displays error alert with retry and direct call fallback', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ success: false, error: 'Telegram dispatch failed' }),
      });
      global.fetch = mockFetch;

      const { container } = render(
        <I18nProvider initialLocale="ua">
          <BookingForm />
        </I18nProvider>
      );

      const nameInput = screen.getByPlaceholderText(translations.ua.booking.namePlaceholder);
      const phoneInput = screen.getByPlaceholderText(translations.ua.booking.phonePlaceholder);
      const select = container.querySelector('select') as HTMLSelectElement;
      const submitBtn = screen.getByRole('button', { name: new RegExp(translations.ua.booking.submit, 'i') });

      fireEvent.change(nameInput, { target: { value: 'Оксана Мельник' } });
      fireEvent.change(phoneInput, { target: { value: '+380961234567' } });
      fireEvent.change(select, { target: { value: translations.ua.services.items[0].title } });

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });

      // Verify error alert
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeDefined();
        expect(container.textContent).toContain('Telegram dispatch failed');
      });

      // Direct call fallback link in error alert
      const callLinks = container.querySelectorAll('a[href="tel:+380960889889"]');
      expect(callLinks.length).toBeGreaterThan(0);
    });

    it('shows validation error when entering invalid phone number', async () => {
      const mockFetch = vi.fn();
      global.fetch = mockFetch;

      render(
        <I18nProvider initialLocale="ua">
          <BookingForm />
        </I18nProvider>
      );

      const nameInput = screen.getByPlaceholderText(translations.ua.booking.namePlaceholder);
      const phoneInput = screen.getByPlaceholderText(translations.ua.booking.phonePlaceholder);
      const submitBtn = screen.getByRole('button', { name: new RegExp(translations.ua.booking.submit, 'i') });

      fireEvent.change(nameInput, { target: { value: 'Оксана' } });
      fireEvent.change(phoneInput, { target: { value: 'invalid-phone-123' } });

      fireEvent.click(submitBtn);

      // Should not call fetch due to validation error
      expect(mockFetch).not.toHaveBeenCalled();
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeDefined();
      });
    });
  });

  describe('BookingModal component', () => {
    it('is initially closed and opens when open-booking-modal event is dispatched', async () => {
      const { container } = render(
        <I18nProvider initialLocale="ua">
          <BookingModal />
        </I18nProvider>
      );

      // Initially closed
      expect(screen.queryByRole('dialog')).toBeNull();

      // Dispatch event
      fireEvent(window, new CustomEvent('open-booking-modal'));

      // Modal opens
      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeDefined();
        expect(dialog.getAttribute('aria-modal')).toBe('true');
      });

      // Embedded BookingForm should be present
      expect(screen.getByPlaceholderText(translations.ua.booking.namePlaceholder)).toBeDefined();
    });

    it('closes on close button click', async () => {
      render(
        <I18nProvider initialLocale="ua">
          <BookingModal />
        </I18nProvider>
      );

      fireEvent(window, new CustomEvent('open-booking-modal'));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeDefined();
      });

      const closeButton = screen.getByLabelText(/close|закрити/i);
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeNull();
      });
    });

    it('closes on Escape key press', async () => {
      render(
        <I18nProvider initialLocale="ua">
          <BookingModal />
        </I18nProvider>
      );

      fireEvent(window, new CustomEvent('open-booking-modal'));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeDefined();
      });

      fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeNull();
      });
    });

    it('closes on backdrop overlay click', async () => {
      render(
        <I18nProvider initialLocale="ua">
          <BookingModal />
        </I18nProvider>
      );

      fireEvent(window, new CustomEvent('open-booking-modal'));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeDefined();
      });

      const overlay = screen.getByRole('dialog');
      fireEvent.click(overlay);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).toBeNull();
      });
    });
  });
});
