export type Locale = 'ua' | 'en';

export interface NavTranslations {
  logo: string;
  services: string;
  about: string;
  results: string;
  reviews: string;
  contacts: string;
  bookBtn: string;
}

export interface HeroTranslations {
  badge: string;
  title: string;
  subtitle: string;
  ctaBooking: string;
  ctaServices: string;
  ratingNote: string;
}

export interface TrustTranslations {
  expYears: string;
  expLabel: string;
  sterilePercent: string;
  sterileLabel: string;
  smilesCount: string;
  smilesLabel: string;
  techLabel: string;
  techDesc: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  priceFrom: string;
}

export interface ServicesTranslations {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface BeforeAfterTabs {
  restoration: string;
  ortho: string;
  whitening: string;
}

export interface BeforeAfterTranslations {
  title: string;
  subtitle: string;
  tabs: BeforeAfterTabs;
  compareLabel: string;
}

export interface AboutTranslations {
  title: string;
  founderName: string;
  founderRole: string;
  quote: string;
  descP1: string;
  descP2: string;
}

export interface BookingTranslations {
  title: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  serviceLabel: string;
  selectServiceDefault: string;
  dateLabel: string;
  timeSlotLabel: string;
  morningSlot: string;
  afternoonSlot: string;
  eveningSlot: string;
  commentLabel: string;
  commentPlaceholder: string;
  submit: string;
  loading: string;
  successTitle: string;
  successDesc: string;
  errorTitle: string;
  errorDesc: string;
  directCall: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
}

export interface ReviewsTranslations {
  title: string;
  subtitle: string;
  items: ReviewItem[];
}

export interface FooterTranslations {
  addressLabel: string;
  addressValue: string;
  scheduleLabel: string;
  scheduleValue: string;
  phoneLabel: string;
  phoneValue: string;
  instagramLabel: string;
  copyright: string;
}

export interface Translations {
  nav: NavTranslations;
  hero: HeroTranslations;
  trust: TrustTranslations;
  services: ServicesTranslations;
  beforeAfter: BeforeAfterTranslations;
  about: AboutTranslations;
  booking: BookingTranslations;
  reviews: ReviewsTranslations;
  footer: FooterTranslations;
}

export const translations: Record<Locale, Translations> = {
  ua: {
    nav: {
      logo: 'Famiglia',
      services: 'Послуги',
      about: 'Про клініку',
      results: 'Результати',
      reviews: 'Відгуки',
      contacts: 'Контакти',
      bookBtn: 'Записатися',
    },
    hero: {
      badge: '★ 4.9 рейтинг у Львові • 15+ років практики',
      title: 'Творимо здорові та щасливі усмішки для всієї родини',
      subtitle: 'Сучасна стоматологія на вул. Бойківській, 2. Безболісне лікування, турбота про дітей та естетичні реставрації світового рівня.',
      ctaBooking: 'Записатися на прийом',
      ctaServices: 'Наші послуги',
      ratingNote: 'Понад 1000 задоволених пацієнтів',
    },
    trust: {
      expYears: '15+',
      expLabel: 'років клінічного досвіду',
      sterilePercent: '100%',
      sterileLabel: 'стерильність та безпека',
      smilesCount: '1000+',
      smilesLabel: 'щасливих усмішок',
      techLabel: 'Сучасне обладнання',
      techDesc: 'Лікування під мікроскопом, точна комп\'ютерна діагностика та безболісна анестезія',
    },
    services: {
      title: 'Напрямки лікування',
      subtitle: 'Повний спектр стоматологічної допомоги для всієї родини з турботою та гарантією',
      items: [
        {
          id: 'therapy',
          title: 'Терапевтична стоматологія',
          desc: 'Лікування карієсу, пульпіту та каналів під мікроскопом із відновленням анатомії зуба.',
          priceFrom: 'від 1 500 ₴',
        },
        {
          id: 'orthodontics',
          title: 'Ортодонтія',
          desc: 'Брекет-системи провідних світових брендів та прозорі елайнери для бездоганного прикусу.',
          priceFrom: 'від 18 000 ₴',
        },
        {
          id: 'kids',
          title: 'Дитяча стоматологія 🧸',
          desc: 'Адаптаційні візити в ігровій формі, лікування молочних зубів без болю та сліз.',
          priceFrom: 'від 900 ₴',
        },
        {
          id: 'esthetics',
          title: 'Естетична реставрація та вініри',
          desc: 'Художнє моделювання та ультратонкі керамічні вініри для сяючої та природної усмішки.',
          priceFrom: 'від 8 500 ₴',
        },
        {
          id: 'surgery',
          title: 'Хірургія та імплантація',
          desc: 'Атравматичне видалення зубів та встановлення перевірених імплантатів світових виробників.',
          priceFrom: 'від 14 000 ₴',
        },
        {
          id: 'hygiene',
          title: 'Професійна гігієна та відбілювання',
          desc: 'Комплексна чистка Air-Flow, ультразвукове зняття каменю та безпечне відбілювання емалі.',
          priceFrom: 'від 1 200 ₴',
        },
      ],
    },
    beforeAfter: {
      title: 'Результати лікування',
      subtitle: 'Реальні трансформації усмішок пацієнтів клініки Famiglia',
      tabs: {
        restoration: 'Естетична реставрація',
        ortho: 'Ортодонтія',
        whitening: 'Відбілювання',
      },
      compareLabel: 'Потягніть для порівняння',
    },
    about: {
      title: 'Про клініку Famiglia',
      founderName: 'Тетяна Бибіс',
      founderRole: 'Головний лікар, засновниця клініки Famiglia',
      quote: '«Для мене стоматологія — це не просто професія, це мистецтво повертати людям впевненість та радість щирої усмішки в затишній сімейній атмосфері.»',
      descP1: 'Клініка Famiglia створена як простір, де кожен гість відчуває щиру турботу та максимальний спокій. Ми відмовилися від атмосфери класичних лікарень на користь затишку, естетики та довірливих стосунків між лікарем і пацієнтом.',
      descP2: 'Використовуючи прогресивні цифрові протоколи, оптику Carl Zeiss та сертифіковані біосумісні матеріали, ми гарантуємо довговічність та природний вигляд кожної реставрації.',
    },
    booking: {
      title: 'Запис на консультацію',
      subtitle: 'Залиште контакти — наш адміністратор зв\'яжеться з вами протягом 15 хвилин для узгодження часу.',
      nameLabel: 'Ваше ім\'я',
      namePlaceholder: 'Оксана Мельник',
      phoneLabel: 'Номер телефону',
      phonePlaceholder: '+380 (96) 000-00-00',
      serviceLabel: 'Бажана послуга',
      selectServiceDefault: 'Оберіть послугу зі списку',
      dateLabel: 'Бажана дата візиту',
      timeSlotLabel: 'Зручний час доби',
      morningSlot: 'Ранок (10:00–13:00)',
      afternoonSlot: 'День (13:00–16:00)',
      eveningSlot: 'Вечір (16:00–19:00)',
      commentLabel: 'Коментар або побажання (необов\'язково)',
      commentPlaceholder: 'Опишіть, що вас турбує або поставте питання...',
      submit: 'Записатися на прийом',
      loading: 'Надсилання заявки...',
      successTitle: 'Заявку успішно прийнято!',
      successDesc: 'Дякуємо! Наш адміністратор зателефонує вам найближчим часом для узгодження деталей.',
      errorTitle: 'Не вдалося надіслати заявку',
      errorDesc: 'Будь ласка, перевірте введені дані або зателефонуйте нам безпосередньо.',
      directCall: 'Зателефонувати в клініку',
    },
    reviews: {
      title: 'Що кажуть наші пацієнти',
      subtitle: 'Відгуки тих, хто вже довірив здоров\'я своєї усмішки клініці Famiglia',
      items: [
        {
          id: 'rev-1',
          name: 'Олена Ковальчук',
          role: 'Естетична реставрація',
          text: 'Безмежно вдячна Тетяні Бибіс за мою нову усмішку! Робила реставрацію передніх зубів — результат перевершив усі очікування. Дуже дбайливий підхід та повна відсутність болю.',
          rating: 5,
          date: 'Серпень 2026',
        },
        {
          id: 'rev-2',
          name: 'Маркіян Савицький',
          role: 'Ортодонтія (елайнери)',
          text: 'Проходив курс лікування елайнерами в Famiglia. Все чітко, сучасно, графік візитів ідеально підлаштовували під мене. Клініка на Бойківській — надзвичайно затишна.',
          rating: 5,
          date: 'Липень 2026',
        },
        {
          id: 'rev-3',
          name: 'Ірина та син Данилко',
          role: 'Дитяча стоматологія',
          text: 'Вперше син пішов від стоматолога з усмішкою і подарунком, а не зі сльозами! Дякуємо за терпіння, гру та щиру любов до дітей. Тепер на огляди тільки сюди.',
          rating: 5,
          date: 'Вересень 2026',
        },
      ],
    },
    footer: {
      addressLabel: 'Адреса клініки',
      addressValue: 'м. Львів, вул. Бойківська, 2',
      scheduleLabel: 'Графік прийому',
      scheduleValue: 'Пн–Пт 10:00–19:00',
      phoneLabel: 'Контактний телефон',
      phoneValue: '+380 96 088 9889',
      instagramLabel: '@famiglia_2022',
      copyright: '© 2026 Стоматологічна клініка Famiglia. Всі права захищено.',
    },
  },
  en: {
    nav: {
      logo: 'Famiglia',
      services: 'Services',
      about: 'About Us',
      results: 'Results',
      reviews: 'Reviews',
      contacts: 'Contacts',
      bookBtn: 'Book Visit',
    },
    hero: {
      badge: '★ 4.9 Rating in Lviv • 15+ Years Practice',
      title: 'Crafting Healthy & Beautiful Smiles for the Whole Family',
      subtitle: 'Modern dental clinic at 2 Boikivska St. Painless treatment, gentle pediatric care, and world-class aesthetic restorations.',
      ctaBooking: 'Book an Appointment',
      ctaServices: 'Our Services',
      ratingNote: 'Over 1,000 satisfied patients',
    },
    trust: {
      expYears: '15+',
      expLabel: 'Years of clinical experience',
      sterilePercent: '100%',
      sterileLabel: 'Sterilization & safety standard',
      smilesCount: '1000+',
      smilesLabel: 'Happy smiles created',
      techLabel: 'Advanced Equipment',
      techDesc: 'Microscope-assisted therapy, precise 3D diagnostics, and pain-free anesthesia',
    },
    services: {
      title: 'Our Dental Services',
      subtitle: 'Comprehensive dental care for the entire family with gentle care and high standards',
      items: [
        {
          id: 'therapy',
          title: 'Therapeutic Dentistry',
          desc: 'Treatment of cavities, pulpitis, and root canals under a microscope with anatomical restoration.',
          priceFrom: 'from 1,500 ₴',
        },
        {
          id: 'orthodontics',
          title: 'Orthodontics',
          desc: 'Modern bracket systems and clear aligners to correct bite alignment at any age.',
          priceFrom: 'from 18,000 ₴',
        },
        {
          id: 'kids',
          title: 'Pediatric Dentistry 🧸',
          desc: 'Gentle, fear-free dental visits in a playful environment for kids of all ages.',
          priceFrom: 'from 900 ₴',
        },
        {
          id: 'esthetics',
          title: 'Esthetic Restoration & Veneers',
          desc: 'Artistic modeling and ultrathin porcelain veneers for a flawless, natural Hollywood smile.',
          priceFrom: 'from 8,500 ₴',
        },
        {
          id: 'surgery',
          title: 'Surgery & Implants',
          desc: 'Atraumatic extractions and premium dental implants with long-term reliability and warranty.',
          priceFrom: 'from 14,000 ₴',
        },
        {
          id: 'hygiene',
          title: 'Hygiene & Whitening',
          desc: 'Deep Air-Flow cleaning, ultrasonic tartar removal, and gentle medical teeth whitening.',
          priceFrom: 'from 1,200 ₴',
        },
      ],
    },
    beforeAfter: {
      title: 'Before & After Results',
      subtitle: 'Real smile transformations from Famiglia clinical practice',
      tabs: {
        restoration: 'Restoration',
        ortho: 'Orthodontics',
        whitening: 'Whitening',
      },
      compareLabel: 'Drag to compare',
    },
    about: {
      title: 'About Famiglia Clinic',
      founderName: 'Tetiana Bybis',
      founderRole: 'Lead Doctor & Founder of Famiglia Clinic',
      quote: '“To me, dentistry is more than a profession — it is the art of restoring confidence and genuine smiles in a warm, family atmosphere.”',
      descP1: 'Famiglia clinic was designed as a space where every patient experiences heartfelt care and total peace of mind. We replaced clinical tension with warmth, modern aesthetics, and trust.',
      descP2: 'Using advanced digital protocols, magnification optics, and certified biocompatible materials, we guarantee long-lasting durability and natural appearance for every restoration.',
    },
    booking: {
      title: 'Book a Consultation',
      subtitle: 'Leave your contact details — our coordinator will contact you within 15 minutes to confirm.',
      nameLabel: 'Your Name',
      namePlaceholder: 'Jane Doe',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '+380 (96) 000-00-00',
      serviceLabel: 'Select Service',
      selectServiceDefault: 'Choose a dental service',
      dateLabel: 'Preferred Date',
      timeSlotLabel: 'Convenient Time',
      morningSlot: 'Morning (10:00–13:00)',
      afternoonSlot: 'Afternoon (13:00–16:00)',
      eveningSlot: 'Evening (16:00–19:00)',
      commentLabel: 'Comment or specific wishes (optional)',
      commentPlaceholder: 'Tell us about your concerns or questions...',
      submit: 'Book an Appointment',
      loading: 'Submitting appointment...',
      successTitle: 'Appointment Request Received!',
      successDesc: 'Thank you! Our coordinator will contact you shortly to confirm details.',
      errorTitle: 'Failed to Submit Request',
      errorDesc: 'Please check your details or give us a direct phone call.',
      directCall: 'Call the Clinic Directly',
    },
    reviews: {
      title: 'Patient Testimonials',
      subtitle: 'Stories and experiences from patients who trust Famiglia with their smiles',
      items: [
        {
          id: 'rev-1',
          name: 'Olena Kovalchuk',
          role: 'Aesthetic Restoration',
          text: 'Endlessly grateful to Dr. Tetiana Bybis for my new smile! The restoration looks completely natural. Such a caring approach with zero discomfort.',
          rating: 5,
          date: 'August 2026',
        },
        {
          id: 'rev-2',
          name: 'Markiian Savytskyi',
          role: 'Orthodontics (Aligners)',
          text: 'Completed clear aligner treatment at Famiglia. Modern equipment, clear plan, flexible scheduling. The clinic on Boikivska is amazingly welcoming.',
          rating: 5,
          date: 'July 2026',
        },
        {
          id: 'rev-3',
          name: 'Iryna & son Danylko',
          role: 'Pediatric Dentistry',
          text: 'For the first time, my son left the dental office with a smile and a toy instead of tears! Thank you for patience and warmth. Best clinic for families.',
          rating: 5,
          date: 'September 2026',
        },
      ],
    },
    footer: {
      addressLabel: 'Clinic Address',
      addressValue: '2 Boikivska St, Lviv',
      scheduleLabel: 'Working Hours',
      scheduleValue: 'Mon–Fri 10:00–19:00',
      phoneLabel: 'Phone Contact',
      phoneValue: '+380 96 088 9889',
      instagramLabel: '@famiglia_2022',
      copyright: '© 2026 Famiglia Dental Clinic. All rights reserved.',
    },
  },
};
