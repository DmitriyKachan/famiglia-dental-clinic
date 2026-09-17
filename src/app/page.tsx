'use client';

import React from 'react';
import { I18nProvider } from '@/lib/i18n/context';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { Services } from '@/components/Services';
import { BeforeAfter } from '@/components/BeforeAfter';
import { AboutDoctor } from '@/components/AboutDoctor';
import { BookingForm } from '@/components/BookingForm';
import { Reviews } from '@/components/Reviews';
import { LocationFooter } from '@/components/LocationFooter';

export default function Home() {
  return (
    <I18nProvider initialLocale="ua">
      <div className="min-h-screen bg-[#FBF9F5] text-[#2D241E] selection:bg-[#C5A880]/30 selection:text-[#2D241E]">
        <Header />
        <main>
          <Hero />
          <TrustBar />
          <Services />
          <BeforeAfter />
          <AboutDoctor />
          <BookingForm />
          <Reviews />
        </main>
        <LocationFooter />
      </div>
    </I18nProvider>
  );
}
