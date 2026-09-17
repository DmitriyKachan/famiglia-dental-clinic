'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/context';
import { MapPin, Phone, Clock, Navigation, Heart } from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';

export const LocationFooter: React.FC = () => {
  const { t, locale } = useI18n();

  return (
    <footer id="contacts" className="bg-brand-dark text-brand-base pt-20 pb-28 md:pb-12 scroll-mt-20 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-brand-base/10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-3xl font-serif font-bold tracking-tight text-white">
                Famiglia
              </span>
              <p className="text-xs uppercase tracking-wider text-brand-gold mt-1 font-medium font-serif italic">
                {locale === 'ua' ? 'Стоматологія твоєї сімʼї' : 'Your Family Dentistry'}
              </p>
            </div>
            <p className="text-sm text-brand-base/75 font-light leading-relaxed max-w-sm">
              {locale === 'ua'
                ? 'Затишне авторське місце у Львові для лікування, естетики та профілактики здоров’я усмішок дорослих і дітей.'
                : 'A cozy boutique clinic in Lviv dedicated to painless treatment, aesthetics and preventive oral health for the whole family.'}
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/famiglia_2022"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3 py-2 rounded-full bg-brand-base/10 hover:bg-brand-gold hover:text-brand-dark text-brand-base transition-colors text-xs font-medium"
                aria-label="Instagram @famiglia_2022"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>@famiglia_2022</span>
              </a>
              <a
                href="tel:+380960889889"
                className="w-10 h-10 rounded-full bg-brand-base/10 hover:bg-brand-gold hover:text-brand-dark flex items-center justify-center text-brand-base transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Details */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
              {locale === 'ua' ? 'Контактна інформація' : 'Contact Information'}
            </h3>

            <div className="space-y-4 text-sm text-brand-base/80">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-brand-base/50 font-medium uppercase tracking-wider">
                    {t.footer.addressLabel}
                  </p>
                  <p className="text-white font-medium mt-0.5">{t.footer.addressValue}</p>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-brand-base/50 font-medium uppercase tracking-wider">
                    {t.footer.scheduleLabel}
                  </p>
                  <p className="text-white font-medium mt-0.5">{t.footer.scheduleValue}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-brand-base/50 font-medium uppercase tracking-wider">
                    {t.footer.phoneLabel}
                  </p>
                  <a
                    href="tel:+380960889889"
                    className="text-white hover:text-brand-gold font-medium transition-colors mt-0.5 inline-block"
                  >
                    {t.footer.phoneValue}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Location Map Card */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
              {locale === 'ua' ? 'Як нас знайти' : 'Location & Navigation'}
            </h3>

            <div className="relative rounded-2xl overflow-hidden bg-brand-base/5 border border-brand-base/10 p-4 text-left">
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-brand-dark relative mb-3">
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
                className="inline-flex items-center justify-center w-full py-2.5 px-4 text-xs font-semibold rounded-xl bg-brand-gold hover:bg-brand-gold-hover text-brand-dark transition-colors cursor-pointer shadow-sm"
              >
                <Navigation className="w-4 h-4 mr-1.5" />
                <span>{locale === 'ua' ? 'Маршрут у Google Maps' : 'Open in Google Maps'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-base/50 gap-4">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center space-x-1">
            <span>{locale === 'ua' ? 'Створено з' : 'Crafted with'}</span>
            <Heart className="w-3.5 h-3.5 text-brand-gold fill-current" />
            <span>{locale === 'ua' ? 'для посмішок кожного дня' : 'for healthy smiles every day'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
