'use client';

import React from 'react';
import { I18nProvider } from '@/lib/i18n/context';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { KineticManifesto } from '@/components/KineticManifesto';
import { PrecisionMirror3D } from '@/components/PrecisionMirror3D';
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
      <div className="min-h-screen bg-[#151210] text-[#F7F4EE] selection:bg-[#D4AF37]/40 selection:text-white">
        <Header />
        <main>
          {/* Act 1: Dimensional 3D Layered Hero */}
          <Hero />

          {/* Act 2: Precision Manifesto & Metrics */}
          <KineticManifesto />

          {/* Act 3: Signature Move — 3D Precision Dental Mirror */}
          <PrecisionMirror3D />

          {/* Trust Bar telemetry */}
          <TrustBar />

          {/* Act 4: Spatial 3D Service Deck */}
          <Services />

          {/* Act 5: Cinematic Smile Curtain (Before & After) */}
          <BeforeAfter />

          {/* Founder & Clinical Atmosphere */}
          <AboutDoctor />

          {/* Act 6: Tactile Booking Station */}
          <BookingForm />

          {/* Social Proof & Patient Reviews */}
          <Reviews />
        </main>
        <LocationFooter />
      </div>
    </I18nProvider>
  );
}
