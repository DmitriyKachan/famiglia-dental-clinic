'use client';

import React, { useState } from 'react';
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

export const BookingForm: React.FC = () => {
  const { t, locale } = useI18n();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    timeSlot: 'Ранок (10:00–13:00)',
    comment: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  const timeSlots = [
    { id: 'morning', label: t.booking.morningSlot, icon: '🌅' },
    { id: 'afternoon', label: t.booking.afternoonSlot, icon: '☀️' },
    { id: 'evening', label: t.booking.eveningSlot, icon: '🌙' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          service: formData.service || t.services.items[0]?.title || 'Консультація',
          date: formData.date || todayStr,
          timeSlot: formData.timeSlot,
          comment: formData.comment,
          locale,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || t.booking.errorDesc);
      }
    } catch {
      setStatus('error');
      setErrorMessage(t.booking.errorDesc);
    }
  };

  return (
    <section id="booking" className="py-24 bg-[#F6F2EA] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#EADFCF] text-xs font-semibold uppercase tracking-wider text-[#6E6259] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{locale === 'ua' ? 'Онлайн-запис' : 'Online Booking'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2D241E] tracking-tight">
            {t.booking.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#6E6259] leading-relaxed font-light">
            {t.booking.subtitle}
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#EADFCF] shadow-xl relative overflow-hidden">
          {/* Subtle Decorative Gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

          {status === 'success' ? (
            <div className="py-12 flex flex-col items-center text-center space-y-5 animate-in fade-in duration-300">
              <div className="w-20 h-20 rounded-full bg-[#F6F2EA] border-2 border-[#C5A880] flex items-center justify-center text-[#C5A880]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D241E]">
                {t.booking.successTitle}
              </h3>
              <p className="text-[#6E6259] max-w-md text-sm sm:text-base font-light leading-relaxed">
                {t.booking.successDesc}
              </p>

              {/* Submitted Details Review Card */}
              <div className="w-full max-w-md p-4 rounded-2xl bg-[#FBF9F5] border border-[#EADFCF] text-left text-xs space-y-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-[#6E6259]">{t.booking.nameLabel}:</span>
                  <span className="font-semibold text-[#2D241E]">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E6259]">{t.booking.phoneLabel}:</span>
                  <span className="font-semibold text-[#2D241E]">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E6259]">{t.booking.dateLabel}:</span>
                  <span className="font-semibold text-[#2D241E]">{formData.date || todayStr} ({formData.timeSlot})</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setFormData({
                    name: '',
                    phone: '',
                    service: '',
                    date: '',
                    timeSlot: t.booking.morningSlot,
                    comment: '',
                  });
                }}
                className="mt-4 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#2D241E] bg-[#F6F2EA] hover:bg-[#EADFCF] rounded-full transition-colors cursor-pointer"
              >
                {locale === 'ua' ? 'Надіслати ще одну заявку' : 'Submit another booking'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D241E] mb-2">
                    {t.booking.nameLabel} <span className="text-[#C5A880]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6E6259]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.booking.namePlaceholder}
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-[#EADFCF] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-[#2D241E] placeholder:text-[#A09388] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D241E] mb-2">
                    {t.booking.phoneLabel} <span className="text-[#C5A880]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6E6259]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t.booking.phonePlaceholder}
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-[#EADFCF] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-[#2D241E] placeholder:text-[#A09388] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Service & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D241E] mb-2">
                    {t.booking.serviceLabel}
                  </label>
                  <div className="relative">
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-[#EADFCF] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-[#2D241E] transition-all appearance-none cursor-pointer"
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D241E] mb-2">
                    {t.booking.dateLabel}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6E6259]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="date"
                      min={todayStr}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-[#EADFCF] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-[#2D241E] transition-all cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Time Slot Chips */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D241E] mb-2 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{t.booking.timeSlotLabel}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {timeSlots.map((slot) => {
                    const isSelected = formData.timeSlot === slot.label;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeSlot: slot.label })}
                        className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#2D241E] text-white border-[#2D241E] shadow-sm'
                            : 'bg-[#FBF9F5] text-[#6E6259] border-[#EADFCF] hover:border-[#C5A880]'
                        }`}
                      >
                        <span>{slot.icon}</span>
                        <span>{slot.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Comment */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D241E] mb-2">
                  {t.booking.commentLabel}
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 pointer-events-none text-[#6E6259]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder={t.booking.commentPlaceholder}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-[#EADFCF] focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-[#2D241E] placeholder:text-[#A09388] transition-all"
                  />
                </div>
              </div>

              {/* Error Notice */}
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage || t.booking.errorDesc}</span>
                  </div>
                  <a
                    href="tel:+380960889889"
                    className="inline-flex items-center font-bold underline shrink-0 ml-2 hover:text-red-900"
                  >
                    <PhoneCall className="w-3.5 h-3.5 mr-1" />
                    {t.booking.directCall}
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 px-8 rounded-full text-base font-semibold text-white bg-[#2D241E] hover:bg-[#3D312A] shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-75 flex items-center justify-center space-x-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#C5A880]" />
                    <span>{t.booking.loading}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-[#C5A880]" />
                    <span>{t.booking.submit}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
