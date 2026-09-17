'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import { MapPin, Phone, Clock, Navigation, Heart } from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';

export const LocationFooter: React.FC = () => {
  const { t, locale } = useI18n();

  return (
    <footer id="contacts" className="bg-[#2D241E] text-[#FBF9F5] pt-20 pb-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#4A3B32]">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-3xl font-serif font-bold tracking-tight text-[#FFFFFF]">
                Famiglia
              </span>
              <p className="text-xs uppercase tracking-wider text-[#C5A880] mt-1 font-medium">
                {locale === 'ua' ? 'Стоматологія твоєї сімʼї' : 'Family Dental Clinic'}
              </p>
            </div>
            <p className="text-sm text-[#DFD3C2] font-light leading-relaxed max-w-sm">
              {locale === 'ua'
                ? 'Затишне авторське місце у Львові для лікування, естетики та профілактики здоров’я усмішок дорослих і дітей.'
                : 'A cozy boutique clinic in Lviv dedicated to painless treatment, aesthetics and preventive oral health for the whole family.'}
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://www.instagram.com/famiglia_2022"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3D312A] hover:bg-[#C5A880] flex items-center justify-center text-[#FFFFFF] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="tel:+380960889889"
                className="w-10 h-10 rounded-full bg-[#3D312A] hover:bg-[#C5A880] flex items-center justify-center text-[#FFFFFF] transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Details */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#C5A880]">
              {locale === 'ua' ? 'Контактна інформація' : 'Contact Information'}
            </h3>

            <div className="space-y-4 text-sm text-[#DFD3C2]">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#A09388] font-medium uppercase">
                    {t.footer.addressLabel}
                  </p>
                  <p className="text-white font-medium">{t.footer.addressValue}</p>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#A09388] font-medium uppercase">
                    {t.footer.scheduleLabel}
                  </p>
                  <p className="text-white font-medium">{t.footer.scheduleValue}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#A09388] font-medium uppercase">
                    {t.footer.phoneLabel}
                  </p>
                  <a
                    href="tel:+380960889889"
                    className="text-white hover:text-[#C5A880] font-medium transition-colors"
                  >
                    {t.footer.phoneValue}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Location Map Card */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#C5A880]">
              {locale === 'ua' ? 'Як нас знайти' : 'Location & Navigation'}
            </h3>

            <div className="relative rounded-2xl overflow-hidden bg-[#3D312A] border border-[#4A3B32] p-4 text-left">
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#241D18] relative mb-3">
                {/* Embedded Stylized Map Preview */}
                <iframe
                  title="Famiglia Dental Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=24.005%2C49.815%2C24.025%2C49.825&amp;layer=mapnik&amp;marker=49.820%2C24.015"
                  className="w-full h-full border-0 filter invert-[0.9] hue-rotate-180 contrast-[0.9] opacity-80"
                  loading="lazy"
                />
              </div>

              <a
                href="https://maps.google.com/?q=Львів,+вулиця+Бойківська,+2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 text-xs font-semibold rounded-xl bg-[#C5A880] hover:bg-[#B89368] text-[#2D241E] transition-colors cursor-pointer"
              >
                <Navigation className="w-4 h-4 mr-1.5" />
                <span>{locale === 'ua' ? 'Маршрут у Google Maps' : 'Open in Google Maps'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A09388] gap-4">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center space-x-1">
            <span>{locale === 'ua' ? 'Створено з' : 'Crafted with'}</span>
            <Heart className="w-3.5 h-3.5 text-[#C5A880] fill-current" />
            <span>{locale === 'ua' ? 'для посмішок кожного дня' : 'for healthy smiles every day'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
