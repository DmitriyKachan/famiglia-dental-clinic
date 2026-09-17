'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Clock, Calendar, User, Phone, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface EditorialBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const EditorialBookingModal: React.FC<EditorialBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService = '',
}) => {
  const { t, locale } = useI18n();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(preselectedService);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('morning');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const payload = {
      name,
      phone,
      service: service || t.services.items[0]?.title || 'Консультація',
      date: date || new Date().toISOString().split('T')[0],
      timeSlot,
      comment,
      locale,
    };

    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Fallback for static hosting (GitHub Pages)
        const saved = JSON.parse(localStorage.getItem('famiglia_appointments') || '[]');
        saved.push({ ...payload, timestamp: new Date().toISOString() });
        localStorage.setItem('famiglia_appointments', JSON.stringify(saved));
      }
      setIsSuccess(true);
    } catch {
      // Offline / static export fallback
      const saved = JSON.parse(localStorage.getItem('famiglia_appointments') || '[]');
      saved.push({ ...payload, timestamp: new Date().toISOString() });
      localStorage.setItem('famiglia_appointments', JSON.stringify(saved));
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 font-hn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#141414] text-cream border border-cream/20 shadow-2xl rounded-2xl p-6 sm:p-8 z-10">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 text-cream/60 hover:text-cream transition-colors cursor-pointer"
          aria-label="Close booking modal"
        >
          <X size={24} strokeWidth={1.5} />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center text-cream">
              <CheckCircle size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-light text-cream">
              {locale === 'ua' ? 'Заявку успішно прийнято' : 'Appointment Request Received'}
            </h3>
            <p className="text-sm font-light text-cream/70 leading-relaxed max-w-sm mx-auto">
              {locale === 'ua'
                ? 'Адміністратор клініки Famiglia звʼяжеться з вами протягом 15 хвилин для підтвердження часу візиту.'
                : 'Our receptionist will contact you within 15 minutes to confirm your preferred consultation time.'}
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-full bg-cream text-black text-xs uppercase tracking-wider font-medium hover:bg-cream/90 transition-colors cursor-pointer"
              >
                {locale === 'ua' ? 'Зрозуміло' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-cream/50">
                Famiglia Dental
              </span>
              <h3 className="text-2xl font-light text-cream mt-1">
                {locale === 'ua' ? 'Запис на візит' : 'Book Consultation'}
              </h3>
              <p className="text-xs text-cream/60 font-light mt-1">
                {locale === 'ua'
                  ? 'вул. Бойківська, 2 • Пн–Пт 10:00–19:00'
                  : '2 Boykivska St • Mon–Fri 10:00–19:00'}
              </p>
            </div>

            {errorMsg && (
              <div className="text-xs text-red-400 bg-red-950/40 p-3 rounded-lg border border-red-800/40">
                {errorMsg}
              </div>
            )}

            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-cream/60">
                {locale === 'ua' ? 'Ваше імʼя' : 'Your Name'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={locale === 'ua' ? 'Олександр' : 'John Doe'}
                className="w-full px-4 py-2.5 rounded-xl bg-cream/5 border border-cream/15 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-cream/50"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-cream/60">
                {locale === 'ua' ? 'Номер телефону' : 'Phone Number'}
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+380 96 000 0000"
                className="w-full px-4 py-2.5 rounded-xl bg-cream/5 border border-cream/15 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-cream/50"
              />
            </div>

            {/* Service Selection */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-cream/60">
                {locale === 'ua' ? 'Бажана послуга' : 'Treatment Direction'}
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1a1a1a] border border-cream/15 text-cream text-sm focus:outline-none focus:border-cream/50"
              >
                <option value="">{locale === 'ua' ? 'Оберіть послугу...' : 'Select service...'}</option>
                {t.services.items.map((srv) => (
                  <option key={srv.id} value={srv.title} className="bg-[#141414] text-cream">
                    {srv.title} ({srv.priceFrom})
                  </option>
                ))}
              </select>
            </div>

            {/* Time Slot */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-cream/60">
                {locale === 'ua' ? 'Зручний час' : 'Preferred Time'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'morning', labelUa: 'Ранок (10–13)', labelEn: 'Morning' },
                  { id: 'afternoon', labelUa: 'День (13–16)', labelEn: 'Afternoon' },
                  { id: 'evening', labelUa: 'Вечір (16–19)', labelEn: 'Evening' },
                ].map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setTimeSlot(slot.id)}
                    className={`py-2 px-2 text-xs rounded-lg transition-colors border cursor-pointer ${
                      timeSlot === slot.id
                        ? 'bg-cream text-black border-cream font-medium'
                        : 'bg-cream/5 text-cream/70 border-cream/10 hover:bg-cream/10'
                    }`}
                  >
                    {locale === 'ua' ? slot.labelUa : slot.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-cream/60">
                {locale === 'ua' ? 'Коментар або запитання' : 'Notes'}
              </label>
              <textarea
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={locale === 'ua' ? 'Опишіть, що вас турбує...' : 'Any details...'}
                className="w-full px-4 py-2 rounded-xl bg-cream/5 border border-cream/15 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-cream/50"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-cream text-black text-xs uppercase tracking-[0.15em] font-medium hover:bg-cream/90 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
              >
                <span>{isSubmitting ? (locale === 'ua' ? 'Відправка...' : 'Sending...') : (locale === 'ua' ? 'Підтвердити запис' : 'Confirm Booking')}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
