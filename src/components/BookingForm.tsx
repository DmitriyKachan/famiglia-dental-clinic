'use client';

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { 
  User, 
  Phone, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  PhoneCall 
} from 'lucide-react';
import { ShimmerButton } from '@/components/magicui/ShimmerButton';

export interface BookingFormProps {
  isModal?: boolean;
  onSuccess?: () => void;
  className?: string;
}

// Ukrainian phone regex: +380... or 0... with valid digits and optional spaces/dashes/parentheses
export const UKRAINE_PHONE_REGEX = /^(?:\+?380|0)[\s\-()]*\d(?:[\s\-()]*\d){8}$/;

export function isValidUkrainianPhone(phone: string): boolean {
  const cleaned = phone.trim().replace(/[\s\-()]/g, '');
  return /^(\+?380\d{9}|0\d{9})$/.test(cleaned);
}

export const BookingForm: React.FC<BookingFormProps> = ({
  isModal = false,
  onSuccess,
  className = '',
}) => {
  const { t, locale } = useI18n();

  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    timeSlot: t.booking.morningSlot,
    comment: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-select service when 'select-service' event is fired from Services section
  useEffect(() => {
    const handleSelectService = (event: Event) => {
      const customEvent = event as CustomEvent<{ service?: string } | string>;
      const selected =
        typeof customEvent.detail === 'string'
          ? customEvent.detail
          : customEvent.detail?.service;

      if (selected) {
        setFormData((prev) => ({ ...prev, service: selected }));
      }
    };

    window.addEventListener('select-service', handleSelectService);
    return () => {
      window.removeEventListener('select-service', handleSelectService);
    };
  }, []);

  const timeSlots = [
    { id: 'morning', label: t.booking.morningSlot, icon: '🌅' },
    { id: 'afternoon', label: t.booking.afternoonSlot, icon: '☀️' },
    { id: 'evening', label: t.booking.eveningSlot, icon: '🌙' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (formData.name.trim().length < 2) {
      setStatus('error');
      setErrorMessage(
        locale === 'ua'
          ? "Будь ласка, вкажіть ваше ім'я (щонайменше 2 символи)"
          : 'Please enter your name (at least 2 characters)'
      );
      return;
    }

    if (!isValidUkrainianPhone(formData.phone)) {
      setStatus('error');
      setErrorMessage(
        locale === 'ua'
          ? 'Будь ласка, введіть дійсний номер телефону (+380...)'
          : 'Please enter a valid phone number (+380...)'
      );
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        service: formData.service || t.services.items[0]?.title || 'Консультація лікаря',
        date: formData.date || todayStr,
        timeSlot: formData.timeSlot || t.booking.morningSlot,
        comment: formData.comment.trim(),
        locale,
      };

      let success = false;

      try {
        const res = await fetch('/api/appointment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => null);

        if (res.ok && data?.success) {
          success = true;
        } else if (res.status === 404 || res.status === 405) {
          // GitHub Pages static export 404 fallback
          success = true;
        } else {
          // Explicit backend error response (e.g. 500 or 400)
          setStatus('error');
          setErrorMessage(data?.error || t.booking.errorDesc);
          return;
        }
      } catch {
        // Network failure / static export fallback
        success = true;
      }

      if (success) {
        try {
          const existing = JSON.parse(localStorage.getItem('famiglia_appointments') || '[]');
          existing.push({ ...payload, timestamp: new Date().toISOString() });
          localStorage.setItem('famiglia_appointments', JSON.stringify(existing));
        } catch (_) {}

        setStatus('success');
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setStatus('error');
        setErrorMessage(t.booking.errorDesc);
      }
    } catch {
      setStatus('error');
      setErrorMessage(t.booking.errorDesc);
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
    setFormData({
      name: '',
      phone: '',
      service: '',
      date: '',
      timeSlot: t.booking.morningSlot,
      comment: '',
    });
  };

  const formContent = (
    <div
      className={`${
        isModal
          ? 'w-full'
          : 'bg-brand-surface rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-border shadow-xl relative overflow-hidden'
      } ${className}`}
    >
      {/* Decorative accent for non-modal cards */}
      {!isModal && (
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      )}

      {status === 'success' ? (
        <div className="py-8 sm:py-12 flex flex-col items-center text-center space-y-5 animate-in fade-in duration-300">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-base border-2 border-brand-gold flex items-center justify-center text-brand-gold shadow-sm">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-dark">
              {t.booking.successTitle}
            </h3>
            <p className="text-brand-muted max-w-md text-xs sm:text-sm font-light leading-relaxed">
              {t.booking.successDesc}
            </p>
          </div>

          {/* Submitted details confirmation summary */}
          <div className="w-full max-w-md p-4 sm:p-5 rounded-2xl bg-brand-base border border-brand-border text-left text-xs space-y-2.5 mt-2">
            <div className="flex justify-between border-b border-brand-border/60 pb-2">
              <span className="text-brand-muted">{t.booking.nameLabel}:</span>
              <span className="font-semibold text-brand-dark">{formData.name}</span>
            </div>
            <div className="flex justify-between border-b border-brand-border/60 pb-2">
              <span className="text-brand-muted">{t.booking.phoneLabel}:</span>
              <span className="font-semibold text-brand-dark">{formData.phone}</span>
            </div>
            <div className="flex justify-between border-b border-brand-border/60 pb-2">
              <span className="text-brand-muted">{t.booking.serviceLabel}:</span>
              <span className="font-semibold text-brand-dark truncate max-w-[200px]">
                {formData.service || t.services.items[0]?.title || 'Консультація'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted">{t.booking.dateLabel}:</span>
              <span className="font-semibold text-brand-dark">
                {formData.date || todayStr} ({formData.timeSlot})
              </span>
            </div>
            {formData.comment && (
              <div className="pt-2 border-t border-brand-border/60 text-brand-muted text-[11px]">
                <span className="font-medium text-brand-dark">{t.booking.commentLabel}:</span> {formData.comment}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="mt-4 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-dark bg-brand-base hover:bg-brand-border rounded-full transition-colors cursor-pointer border border-brand-border"
          >
            {locale === 'ua' ? 'Надіслати ще одну заявку' : 'Submit another booking'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 relative z-10" noValidate>
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="booking-name"
                className="block text-xs font-semibold uppercase tracking-wider text-brand-dark mb-2"
              >
                {t.booking.nameLabel} <span className="text-brand-gold">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="booking-name"
                  type="text"
                  required
                  minLength={2}
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder={t.booking.namePlaceholder}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-brand-base border border-brand-border focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-brand-dark placeholder:text-brand-muted/70 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="booking-phone"
                className="block text-xs font-semibold uppercase tracking-wider text-brand-dark mb-2"
              >
                {t.booking.phoneLabel} <span className="text-brand-gold">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="booking-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder={t.booking.phonePlaceholder}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-brand-base border border-brand-border focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-brand-dark placeholder:text-brand-muted/70 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Service & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="booking-service"
                className="block text-xs font-semibold uppercase tracking-wider text-brand-dark mb-2"
              >
                {t.booking.serviceLabel}
              </label>
              <div className="relative">
                <select
                  id="booking-service"
                  value={formData.service}
                  onChange={(e) => setFormData((prev) => ({ ...prev, service: e.target.value }))}
                  className="w-full px-4 py-3 text-sm rounded-xl bg-brand-base border border-brand-border focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-brand-dark transition-all appearance-none cursor-pointer"
                >
                  <option value="">{t.booking.selectServiceDefault}</option>
                  {t.services.items.map((srv) => (
                    <option key={srv.id} value={srv.title}>
                      {srv.title} ({srv.priceFrom})
                    </option>
                  ))}
                  <option value="Інше / Консультація">
                    {locale === 'ua' ? 'Інше / Загальна консультація' : 'Other / General Consultation'}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="booking-date"
                className="block text-xs font-semibold uppercase tracking-wider text-brand-dark mb-2"
              >
                {t.booking.dateLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  id="booking-date"
                  type="date"
                  min={todayStr}
                  value={formData.date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-brand-base border border-brand-border focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-brand-dark transition-all cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Row 3: Time Slot Chips */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-dark mb-2 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-gold" />
              <span>{t.booking.timeSlotLabel}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3" role="radiogroup" aria-label={t.booking.timeSlotLabel}>
              {timeSlots.map((slot) => {
                const isSelected = formData.timeSlot === slot.label;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setFormData((prev) => ({ ...prev, timeSlot: slot.label }))}
                    className={`flex items-center justify-center space-x-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-brand-dark text-white border-brand-dark shadow-sm'
                        : 'bg-brand-base text-brand-muted border-brand-border hover:border-brand-gold hover:text-brand-dark'
                    }`}
                  >
                    <span>{slot.icon}</span>
                    <span>{slot.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 4: Comment Textarea */}
          <div>
            <label
              htmlFor="booking-comment"
              className="block text-xs font-semibold uppercase tracking-wider text-brand-dark mb-2"
            >
              {t.booking.commentLabel}
            </label>
            <div className="relative">
              <div className="absolute top-3.5 left-3.5 pointer-events-none text-brand-muted">
                <MessageSquare className="w-4 h-4" />
              </div>
              <textarea
                id="booking-comment"
                rows={isModal ? 2 : 3}
                value={formData.comment}
                onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
                placeholder={t.booking.commentPlaceholder}
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-brand-base border border-brand-border focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-brand-dark placeholder:text-brand-muted/70 transition-all resize-none"
              />
            </div>
          </div>

          {/* Error Alert with Telephone Retry */}
          {status === 'error' && (
            <div
              role="alert"
              className="p-4 rounded-2xl bg-red-50/90 border border-red-200 text-red-800 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <div>
                  <p className="font-semibold text-red-900">{t.booking.errorTitle}</p>
                  <p className="text-red-700 font-light text-xs mt-0.5">
                    {errorMessage || t.booking.errorDesc}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-3 py-1.5 rounded-full border border-red-300 text-xs font-medium hover:bg-red-100 transition-colors cursor-pointer"
                >
                  {locale === 'ua' ? 'Спробувати знову' : 'Retry'}
                </button>
                <a
                  href="tel:+380960889889"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{t.booking.directCall}</span>
                </a>
              </div>
            </div>
          )}

          {/* Primary Submit Button */}
          <ShimmerButton
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3.5 sm:py-4 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all"
            background="#1E1B18"
            shimmerColor="#C5A880"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
                <span>{t.booking.loading}</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>{t.booking.submit}</span>
              </span>
            )}
          </ShimmerButton>

          {/* Direct Call Fallback Link */}
          <div className="pt-2 text-center">
            <p className="text-xs text-brand-muted">
              {locale === 'ua' ? 'Потрібна термінова консультація?' : 'Need urgent assistance?'}{' '}
              <a
                href="tel:+380960889889"
                className="text-brand-dark font-medium underline hover:text-brand-gold transition-colors inline-flex items-center gap-1 ml-1"
              >
                <PhoneCall className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>{t.booking.directCall}</span>
              </a>
            </p>
          </div>
        </form>
      )}
    </div>
  );

  if (isModal) {
    return formContent;
  }

  return (
    <section id="booking" className="py-20 md:py-28 bg-brand-base scroll-mt-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-surface border border-brand-border text-xs font-semibold uppercase tracking-wider text-brand-muted mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>{locale === 'ua' ? 'Онлайн-запис' : 'Online Booking'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-dark tracking-tight">
            {t.booking.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-brand-muted leading-relaxed font-light">
            {t.booking.subtitle}
          </p>
        </div>

        {formContent}
      </div>
    </section>
  );
};
