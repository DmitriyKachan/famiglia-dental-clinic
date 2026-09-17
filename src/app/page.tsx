'use client';

import React from 'react';
import { I18nProvider } from '@/lib/i18n/context';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { Services } from '@/components/Services';
import { BeforeAfter } from '@/components/BeforeAfter';
import { AboutDoctor } from '@/components/AboutDoctor';
import { Reviews } from '@/components/Reviews';
import { BookingForm } from '@/components/BookingForm';
import { LocationFooter } from '@/components/LocationFooter';
import { MobileStickyBar } from '@/components/MobileStickyBar';
import { BookingModal } from '@/components/BookingModal';

export default function Home() {
  return (
    <I18nProvider initialLocale="ua">
      <div className="min-h-screen bg-brand-base text-brand-dark selection:bg-brand-gold/30 selection:text-brand-dark relative font-sans">
        {/* Navigation Header */}
        <Header />

        <main>
          {/* Section 1: Warm Hero with Dr. Tetiana Bybis */}
          <Hero />

          {/* Section 2: Four Comfort & Trust Pillars */}
          <TrustBar />

          {/* Section 3: Transparent Services & Pricing */}
          <Services />

          {/* Section 4: Clinical Cases (Before & After with Doctor's Notes) */}
          <BeforeAfter />

          {/* Section 5: Doctor Philosophy & Clinic Atmosphere */}
          <AboutDoctor />

          {/* Section 6: Verified Patient Reviews */}
          <Reviews />

          {/* Section 7: Online Booking Form */}
          <BookingForm />
        </main>

        {/* Location & Navigation Footer */}
        <LocationFooter />

        {/* Mobile Sticky Quick Action Bar */}
        <MobileStickyBar />

        {/* Accessible Booking Modal Dialog */}
        <BookingModal />
      </div>
    </I18nProvider>
  );
}
