'use client';

import React, { useState } from 'react';
import { I18nProvider } from '@/lib/i18n/context';
import { EditorialHero } from '@/components/EditorialHero';
import { EditorialServicesDrawer } from '@/components/EditorialServicesDrawer';
import { EditorialCasesDrawer } from '@/components/EditorialCasesDrawer';
import { EditorialBookingModal } from '@/components/EditorialBookingModal';

export default function Home() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCasesOpen, setIsCasesOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');

  const handleSelectService = (service: string) => {
    setPreselectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <I18nProvider initialLocale="ua">
      <main className="h-[100dvh] w-full overflow-hidden bg-[#0d0d0d] text-cream relative font-hn">
        {/* Single Full-Viewport Editorial Hero Composition */}
        <EditorialHero
          onOpenServices={() => setIsServicesOpen(true)}
          onOpenCases={() => setIsCasesOpen(true)}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* Option 1: Editorial Slide-Over Drawers & Booking Sheet */}
        <EditorialServicesDrawer
          isOpen={isServicesOpen}
          onClose={() => setIsServicesOpen(false)}
          onSelectService={handleSelectService}
        />

        <EditorialCasesDrawer
          isOpen={isCasesOpen}
          onClose={() => setIsCasesOpen(false)}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        <EditorialBookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          preselectedService={preselectedService}
        />
      </main>
    </I18nProvider>
  );
}
