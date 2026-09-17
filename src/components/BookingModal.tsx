'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { BookingForm } from './BookingForm';

export interface BookingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
}) => {
  const { t, locale } = useI18n();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const isControlled = typeof controlledIsOpen === 'boolean';
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleClose = useCallback(() => {
    if (controlledOnClose) {
      controlledOnClose();
    }
    if (!isControlled) {
      setInternalIsOpen(false);
    }
  }, [controlledOnClose, isControlled]);

  // Listen for 'open-booking-modal' custom event
  useEffect(() => {
    const handleOpenModal = () => {
      setInternalIsOpen(true);
    };

    window.addEventListener('open-booking-modal', handleOpenModal);
    return () => {
      window.removeEventListener('open-booking-modal', handleOpenModal);
    };
  }, []);

  // Close on ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      data-testid="booking-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-brand-dark/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        // Close on backdrop overlay click
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-brand-surface rounded-3xl border border-brand-border shadow-2xl p-5 sm:p-8 text-brand-dark"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label={locale === 'ua' ? 'Закрити модальне вікно' : 'Close modal'}
          className="absolute top-4 right-4 p-2 rounded-full text-brand-muted hover:text-brand-dark hover:bg-brand-base transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-base border border-brand-border text-[11px] font-semibold uppercase tracking-wider text-brand-muted mb-2">
            <Sparkles className="w-3 h-3 text-brand-gold" />
            <span>{locale === 'ua' ? 'Онлайн-запис' : 'Online Booking'}</span>
          </div>
          <h2
            id="booking-modal-title"
            className="text-2xl sm:text-3xl font-serif font-bold text-brand-dark tracking-tight"
          >
            {t.booking.title}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-brand-muted font-light leading-relaxed">
            {t.booking.subtitle}
          </p>
        </div>

        {/* Compact Form */}
        <BookingForm isModal={true} onSuccess={handleClose} />
      </div>
    </div>
  );
};
