'use client';

import React, { useState } from 'react';
import { I18nProvider } from '@/lib/i18n/context';
import { ScrollProgress } from '@/components/magicui/ScrollProgress';
import { AppleNavBar } from '@/components/AppleNavBar';
import { EditorialHero } from '@/components/EditorialHero';
import { BentoTrust } from '@/components/BentoTrust';
import { ServicesSection } from '@/components/ServicesSection';
import { CasesSection } from '@/components/CasesSection';
import { DoctorSection } from '@/components/DoctorSection';
import { BookingTerminalSection } from '@/components/BookingTerminalSection';
import { AppleDock } from '@/components/AppleDock';
import { EditorialServicesDrawer } from '@/components/EditorialServicesDrawer';
import { EditorialCasesDrawer } from '@/components/EditorialCasesDrawer';
import { EditorialBookingModal } from '@/components/EditorialBookingModal';

export default function Home() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCasesOpen, setIsCasesOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const [minimizedServices, setMinimizedServices] = useState(false);
  const [minimizedCases, setMinimizedCases] = useState(false);
  const [minimizedBooking, setMinimizedBooking] = useState(false);

  const [preselectedService, setPreselectedService] = useState('');

  const handleSelectService = (service: string) => {
    setPreselectedService(service);
    setIsBookingOpen(true);
    setMinimizedBooking(false);
  };

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
    setMinimizedBooking(false);
  };

  const handleOpenServices = () => {
    setIsServicesOpen(true);
    setMinimizedServices(false);
  };

  const handleOpenCases = () => {
    setIsCasesOpen(true);
    setMinimizedCases(false);
  };

  return (
    <I18nProvider initialLocale="ua">
      {/* Scroll Progress Bar at top edge */}
      <ScrollProgress />

      {/* Floating Apple LiquidGlass Navigation Island */}
      <AppleNavBar
        onOpenBooking={handleOpenBooking}
        onOpenServices={handleOpenServices}
        onOpenCases={handleOpenCases}
      />

      <main className="w-full bg-[#0d0d0d] text-cream relative font-hn overflow-x-hidden selection:bg-brand-gold/30">
        {/* Chapter 1: Single Full-Viewport Editorial Hero Composition */}
        <EditorialHero
          onOpenServices={handleOpenServices}
          onOpenCases={handleOpenCases}
          onOpenBooking={handleOpenBooking}
        />

        {/* Chapter 2: Apple LiquidGlass Bento Trust Grid */}
        <div id="standards">
          <BentoTrust />
        </div>

        {/* Chapter 3: Treatment Architecture */}
        <ServicesSection
          onSelectService={handleSelectService}
          onOpenFullCatalog={handleOpenServices}
        />

        {/* Chapter 4: Clinical Cases Before / After */}
        <CasesSection onOpenBooking={handleOpenBooking} />

        {/* Chapter 5: Chief Doctor & Founder */}
        <DoctorSection onOpenBooking={handleOpenBooking} />

        {/* Chapter 6: macOS Booking Terminal & Studio Contacts */}
        <BookingTerminalSection />

        {/* Apple Dock Indicator for Minimized Windows & Floating Action */}
        <AppleDock
          minimizedBooking={minimizedBooking}
          minimizedServices={minimizedServices}
          minimizedCases={minimizedCases}
          onRestoreBooking={() => {
            setIsBookingOpen(true);
            setMinimizedBooking(false);
          }}
          onRestoreServices={() => {
            setIsServicesOpen(true);
            setMinimizedServices(false);
          }}
          onRestoreCases={() => {
            setIsCasesOpen(true);
            setMinimizedCases(false);
          }}
          onOpenBooking={handleOpenBooking}
        />

        {/* Apple Window Sheets & Modals with Minimize Dynamics */}
        <EditorialServicesDrawer
          isOpen={isServicesOpen && !minimizedServices}
          onClose={() => {
            setIsServicesOpen(false);
            setMinimizedServices(false);
          }}
          onMinimize={() => {
            setIsServicesOpen(false);
            setMinimizedServices(true);
          }}
          onSelectService={handleSelectService}
        />

        <EditorialCasesDrawer
          isOpen={isCasesOpen && !minimizedCases}
          onClose={() => {
            setIsCasesOpen(false);
            setMinimizedCases(false);
          }}
          onMinimize={() => {
            setIsCasesOpen(false);
            setMinimizedCases(true);
          }}
          onOpenBooking={handleOpenBooking}
        />

        <EditorialBookingModal
          isOpen={isBookingOpen && !minimizedBooking}
          onClose={() => {
            setIsBookingOpen(false);
            setMinimizedBooking(false);
          }}
          onMinimize={() => {
            setIsBookingOpen(false);
            setMinimizedBooking(true);
          }}
          preselectedService={preselectedService}
        />
      </main>
    </I18nProvider>
  );
}
