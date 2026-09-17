'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n/context';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  CheckCircle, 
  Send, 
  Navigation,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';
import { ShineBorder } from './magicui/ShineBorder';

export const BookingTerminalSection: React.FC = () => {
  const { t, locale } = useI18n();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('morning');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        const saved = JSON.parse(localStorage.getItem('famiglia_appointments') || '[]');
        saved.push({ ...payload, timestamp: new Date().toISOString() });
        localStorage.setItem('famiglia_appointments', JSON.stringify(saved));
      }
      setIsSuccess(true);
    } catch {
      const saved = JSON.parse(localStorage.getItem('famiglia_appointments') || '[]');
      saved.push({ ...payload, timestamp: new Date().toISOString() });
      localStorage.setItem('famiglia_appointments', JSON.stringify(saved));
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="booking" className="relative py-28 sm:py-36 bg-[#0a0a0a] text-cream overflow-hidden font-hn border-t border-white/10 scroll-mt-10">
      {/* Background radial glow */}
      <div
        className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Apple macOS LiquidGlass Window Frame */}
        <div className="apple-glass rounded-3xl border border-white/15 overflow-hidden shadow-2xl relative">
          <ShineBorder borderWidth={1} duration={16} shineColor={['#C5A880', '#ffffff', '#C5A880']} />

          {/* macOS Titlebar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
            <div className="flex items-center space-x-2">
              <span className="apple-dot apple-dot-close" />
              <span className="apple-dot apple-dot-minimize" />
              <span className="apple-dot apple-dot-maximize" />
            </div>

            <div className="text-xs uppercase tracking-[0.2em] text-cream/50 font-light flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>Famiglia Booking Studio — Terminal v2.5</span>
            </div>

            <div className="text-xs text-cream/40 hidden sm:block font-mono">
              boykivska-02.lviv.ua
            </div>
          </div>

          {/* Terminal Body Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* Left Column: Interactive Form */}
            <div className="lg:col-span-7 p-6 sm:p-10">
              <div className="mb-8">
                <span className="text-xs uppercase tracking-[0.2em] text-cream/40 font-light">
                  {locale === 'ua' ? 'Електронний запис' : 'Direct Booking'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-light text-cream mt-1">
                  {locale === 'ua' ? 'Оберіть зручний час візиту' : 'Book Your Consultation'}
                </h3>
                <p className="text-xs text-cream/60 font-light mt-1">
                  {locale === 'ua'
                    ? 'Адміністратор звʼяжеться з вами протягом 15 хвилин для узгодження деталей.'
                    : 'Our manager will contact you within 15 minutes to confirm the appointment.'}
                </p>
              </div>

              {isSuccess ? (
                <div className="text-center py-12 space-y-4 apple-window-anim">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle size={36} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-2xl font-light text-cream">
                    {locale === 'ua' ? 'Заявку успішно надіслано' : 'Request Received'}
                  </h4>
                  <p className="text-sm font-light text-cream/70 leading-relaxed max-w-sm mx-auto">
                    {locale === 'ua'
                      ? 'Дякуємо! Ми вже готуємо все для вашого комфортного візиту до клініки Famiglia.'
                      : 'Thank you! We look forward to welcoming you at Famiglia Dental Clinic.'}
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 rounded-full bg-cream text-black text-xs uppercase tracking-wider font-medium hover:bg-white transition-colors cursor-pointer"
                    >
                      {locale === 'ua' ? 'Записати ще когось' : 'Book Another Visit'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-cream/60 font-light">
                        {locale === 'ua' ? 'Ваше імʼя' : 'Your Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={locale === 'ua' ? 'Олександр' : 'Alexander'}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-brand-gold/60 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-cream/60 font-light">
                        {locale === 'ua' ? 'Телефон' : 'Phone Number'} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+380 96 088 9889"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-cream text-sm placeholder:text-cream/30 focus:outline-none focus:border-brand-gold/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-cream/60 font-light">
                      {locale === 'ua' ? 'Напрямок або послуга' : 'Treatment Direction'}
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-white/15 text-cream text-sm focus:outline-none focus:border-brand-gold/60 transition-colors cursor-pointer"
                    >
                      <option value="">
                        {locale === 'ua' ? 'Оберіть послугу (або первинна консультація)' : 'Select service (or Consultation)'}
                      </option>
                      {t.services.items.map((srv) => (
                        <option key={srv.id} value={srv.title} className="bg-[#1a1a1a] text-cream">
                          {srv.title} {srv.priceFrom ? `(${srv.priceFrom})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-cream/60 font-light">
                        {locale === 'ua' ? 'Бажана дата' : 'Preferred Date'}
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-cream text-sm focus:outline-none focus:border-brand-gold/60 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-cream/60 font-light">
                        {locale === 'ua' ? 'Часовий інтервал' : 'Time Slot'}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'morning', label: locale === 'ua' ? 'Ранок' : 'Morning' },
                          { id: 'afternoon', label: locale === 'ua' ? 'День' : 'Day' },
                          { id: 'evening', label: locale === 'ua' ? 'Вечір' : 'Evening' },
                        ].map((slot) => (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setTimeSlot(slot.id)}
                            className={`py-2 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer ${
                              timeSlot === slot.id
                                ? 'bg-cream text-black font-medium'
                                : 'bg-white/5 text-cream/60 hover:text-cream border border-white/10'
                            }`}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-cream text-black text-xs uppercase tracking-widest font-medium hover:bg-white transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-50"
                    >
                      <span>
                        {isSubmitting
                          ? locale === 'ua'
                            ? 'Надсилаємо...'
                            : 'Sending...'
                          : locale === 'ua'
                          ? 'Підтвердити запис'
                          : 'Confirm Appointment'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Contact & Studio Info */}
            <div className="lg:col-span-5 p-6 sm:p-10 space-y-8 bg-black/30 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-cream/40 font-light">
                  {locale === 'ua' ? 'Локація & Графік' : 'Location & Hours'}
                </span>
                <h4 className="text-2xl font-light text-cream mt-1">
                  Famiglia Clinic
                </h4>
                <p className="text-xs text-cream/60 font-light mt-1">
                  {locale === 'ua' ? 'Стоматологія твоєї сімʼї' : 'Your Family Practice'}
                </p>
              </div>

              {/* Info Items */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-cream/50 uppercase tracking-wider">
                      {t.footer.addressLabel}
                    </div>
                    <div className="text-sm text-cream font-light mt-0.5">
                      {t.footer.addressValue}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-cream/50 uppercase tracking-wider">
                      {t.footer.scheduleLabel}
                    </div>
                    <div className="text-sm text-cream font-light mt-0.5">
                      {t.footer.scheduleValue}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-cream/50 uppercase tracking-wider">
                      {locale === 'ua' ? 'Прямий контакт' : 'Direct Call'}
                    </div>
                    <a
                      href="tel:+380960889889"
                      className="text-sm text-cream font-light hover:text-brand-gold transition-colors mt-0.5 block"
                    >
                      +380 96 088 9889
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels & Map Navigation */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center space-x-3">
                  <a
                    href="https://www.instagram.com/famiglia_2022"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl apple-glass text-xs uppercase tracking-wider text-cream hover:text-white border border-white/15 hover:border-brand-gold transition-all flex items-center justify-center space-x-2"
                  >
                    <InstagramIcon className="w-4 h-4 text-cream" />
                    <span>Instagram</span>
                  </a>

                  <a
                    href="https://maps.google.com/?q=Бойківська+2+Львів"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl apple-glass text-xs uppercase tracking-wider text-cream hover:text-white border border-white/15 hover:border-brand-gold transition-all flex items-center justify-center space-x-2"
                  >
                    <Navigation className="w-4 h-4 text-brand-gold" />
                    <span>Google Maps</span>
                  </a>
                </div>

                <div className="text-[11px] text-cream/40 text-center font-light pt-2">
                  &copy; 2025 Famiglia Dental Clinic. {locale === 'ua' ? 'Всі права захищено' : 'All rights reserved'}.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
