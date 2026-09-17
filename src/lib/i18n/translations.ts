export type Locale = 'ua' | 'en';

export interface NavTranslations {
  logo: string;
  logoSubtitle: string;
  services: string;
  cases: string;
  results: string;
  about: string;
  reviews: string;
  contacts: string;
  bookBtn: string;
  callBtn: string;
}

export interface HeroTranslations {
  badge: string;
  title: string;
  subtitle: string;
  ctaBooking: string;
  ctaServices: string;
  ratingValue: string;
  ratingCount: string;
  founderBadge: string;
  experienceBadge: string;
  ratingNote: string;
}

export interface TrustTranslations {
  painlessTitle: string;
  painlessDesc: string;
  sterileTitle: string;
  sterileDesc: string;
  microscopeTitle: string;
  microscopeDesc: string;
  kidsTitle: string;
  kidsDesc: string;
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
  duration: string;
  features: string[];
}

export interface ServicesTranslations {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface CaseItem {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  visits: string;
  duration: string;
}

export interface CasesTabs {
  veneers: string;
  restoration: string;
  whitening: string;
}

export interface CasesTranslations {
  title: string;
  subtitle: string;
  tabs: CasesTabs;
  items: CaseItem[];
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
  bioP1: string;
  bioP2: string;
  clinicAddress: string;
  instagramHandle: string;
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
  service: string;
  role: string;
  comment: string;
  text: string;
  rating: number;
  date: string;
}

export interface ReviewsTranslations {
  title: string;
  subtitle: string;
  items: ReviewItem[];
}

export interface MobileStickyTranslations {
  call: string;
  book: string;
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
  cases: CasesTranslations;
  beforeAfter: BeforeAfterTranslations;
  about: AboutTranslations;
  booking: BookingTranslations;
  reviews: ReviewsTranslations;
  mobileSticky: MobileStickyTranslations;
  footer: FooterTranslations;
}

export const translations: Record<Locale, Translations> = {
  ua: {
    nav: {
      logo: 'Famiglia',
      logoSubtitle: 'Стоматологія твоєї сімʼї',
      services: 'Послуги',
      cases: 'Кейси',
      results: 'Результати',
      about: 'Про клініку',
      reviews: 'Відгуки',
      contacts: 'Контакти',
      bookBtn: 'Записатися',
      callBtn: 'Зателефонувати',
    },
    hero: {
      badge: 'м. Львів • вул. Бойківська, 2',
      title: 'Стоматологія, де турбота відчувається в кожній деталі',
      subtitle: 'Безболісне, спокійне та естетичне лікування зубів для всієї родини від лікаря Тетяни Бибіс.',
      ctaBooking: 'Записатися на прийом',
      ctaServices: 'Послуги та ціни',
      ratingValue: '5.0',
      ratingCount: '500+ оцінок',
      founderBadge: 'Тетяна Бибіс • Головний лікар',
      experienceBadge: '15+ років практики',
      ratingNote: 'Понад 1000 задоволених пацієнтів',
    },
    trust: {
      painlessTitle: '100% без болю',
      painlessDesc: "Комп'ютерна анестезія STA без оніміння та дискомфорту",
      sterileTitle: 'Стерильність класу B',
      sterileDesc: 'Європейські автоклави та індивідуальні крафт-пакети',
      microscopeTitle: 'Дентальний мікроскоп 20x',
      microscopeDesc: 'Збереження здорових тканин та прецизійна точність',
      kidsTitle: 'Затишок для дітей',
      kidsDesc: 'Адаптаційні візити без сліз, мультфільми та подарунки',
      expYears: '15+',
      expLabel: 'років клінічного досвіду',
      sterilePercent: '100%',
      sterileLabel: 'стерильність та безпека',
      smilesCount: '1000+',
      smilesLabel: 'щасливих усмішок',
      techLabel: 'Сучасне обладнання',
      techDesc: "Лікування під мікроскопом, точна комп'ютерна діагностика та безболісна анестезія",
    },
    services: {
      title: 'Напрямки лікування',
      subtitle: 'Повний спектр стоматологічної допомоги для всієї родини з турботою та гарантією',
      items: [
        {
          id: 'therapy',
          title: 'Терапевтична стоматологія',
          desc: 'Лікування карієсу, пульпіту та кореневих каналів під мікроскопом із відновленням анатомії зуба.',
          priceFrom: 'від 1 500 ₴',
          duration: '45–60 хв',
          features: [
            'Оптика Carl Zeiss 20x',
            'Анатомічне моделювання емалі',
            "Комп'ютерна анестезія STA",
          ],
        },
        {
          id: 'veneers',
          title: 'Керамічні вініри',
          desc: 'Ультратонкі керамічні накладки ручної роботи для бездоганної, гармонійної та природної усмішки.',
          priceFrom: 'від 8 500 ₴',
          duration: '2–3 візити',
          features: [
            'Кераміка E-max',
            'Digital Smile Design',
            'Мінімальне препарування',
          ],
        },
        {
          id: 'ortho',
          title: 'Ортодонтія та елайнери',
          desc: 'Виправлення прикусу та вирівнювання зубів прозорими елайнерами або перевіреними брекет-системами.',
          priceFrom: 'від 18 000 ₴',
          duration: 'від 6 місяців',
          features: [
            'Прозорі елайнери',
            'Самолігуючі брекети',
            '3D-моделювання результату',
          ],
        },
        {
          id: 'kids',
          title: 'Дитяча стоматологія 🧸',
          desc: 'Адаптаційні візити в ігровій формі, дбайливе лікування молочних зубів без болю та сліз.',
          priceFrom: 'від 900 ₴',
          duration: '30–45 хв',
          features: [
            'Адаптаційні візити без сліз',
            'Мультфільми під час процедури',
            'Подарунок кожному маленькому пацієнту',
          ],
        },
        {
          id: 'surgery',
          title: 'Хірургія та імплантація',
          desc: 'Атравматичне видалення зубів будь-якої складності та встановлення імплантатів світових виробників.',
          priceFrom: 'від 14 000 ₴',
          duration: '40–90 хв',
          features: [
            'Преміум-імплантати світових лідерів',
            'Пʼєзохірургія (ультразвук)',
            'Швидке та легке загоєння',
          ],
        },
        {
          id: 'hygiene',
          title: 'Професійна гігієна',
          desc: 'Комплексне очищення Air-Flow, ультразвукове видалення зубного каменю та ремінералізація емалі.',
          priceFrom: 'від 1 200 ₴',
          duration: '45–60 хв',
          features: [
            'Швейцарський протокол GBT',
            'Безпечний делікатний порошок',
            'SPA-догляд для ясен',
          ],
        },
      ],
    },
    cases: {
      title: 'Клінічні кейси та результати',
      subtitle: 'Реальні історії перевтілення усмішок пацієнтів клініки Famiglia',
      tabs: {
        veneers: 'Керамічні вініри',
        restoration: 'Художня реставрація',
        whitening: 'Відбілювання',
      },
      items: [
        {
          id: 'case-veneers-1',
          title: 'Повна естетична реабілітація зони посмішки',
          category: 'veneers',
          problem: 'Множинні неестетичні пломби, стирання країв та дисколорит емалі',
          solution: 'Встановлення 8 ультратонких керамічних вінірів E-max із мікроінвазивним препаруванням',
          visits: '2 візити',
          duration: '10 днів',
        },
        {
          id: 'case-restoration-1',
          title: 'Художня реставрація фронтальних різців',
          category: 'restoration',
          problem: 'Скол ріжучого краю внаслідок травми та вторинний карієс',
          solution: 'Пошарова біоміметична реставрація під мікроскопом з відтворенням макро- і мікрорельєфу',
          visits: '1 візит',
          duration: '90 хв',
        },
        {
          id: 'case-whitening-1',
          title: 'Безпечне кабінетне фотовибілювання холодним світлом',
          category: 'whitening',
          problem: 'Потемніння емалі від кави та тютюну, бажання освітлити тон',
          solution: 'Апаратне відбілювання за щадною технологією + ремінералізуюча терапія без гіперчутливості (+7 тонів)',
          visits: '1 візит',
          duration: '60 хв',
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
      founderRole: 'Засновниця та головний лікар',
      quote: '«Для мене стоматологія — це не просто професія, це мистецтво повертати людям впевненість та радість щирої усмішки в затишній сімейній атмосфері.»',
      bioP1: 'Клініка Famiglia створена як простір, де кожен гість відчуває щиру турботу та максимальний спокій. Ми відмовилися від атмосфери класичних лікарень на користь затишку, естетики та довірливих стосунків між лікарем і пацієнтом.',
      bioP2: 'Використовуючи прогресивні цифрові протоколи, оптику Carl Zeiss та сертифіковані біосумісні матеріали, ми гарантуємо довговічність та природний вигляд кожної реставрації.',
      clinicAddress: 'м. Львів, вул. Бойківська, 2',
      instagramHandle: '@famiglia_2022',
      descP1: 'Клініка Famiglia створена як простір, де кожен гість відчуває щиру турботу та максимальний спокій. Ми відмовилися від атмосфери класичних лікарень на користь затишку, естетики та довірливих стосунків між лікарем і пацієнтом.',
      descP2: 'Використовуючи прогресивні цифрові протоколи, оптику Carl Zeiss та сертифіковані біосумісні матеріали, ми гарантуємо довговічність та природний вигляд кожної реставрації.',
    },
    booking: {
      title: 'Запис на прийом',
      subtitle: "Залиште контакти — наш адміністратор зв'яжеться з вами протягом 15 хвилин для узгодження часу.",
      nameLabel: "Ваше ім'я",
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
      commentLabel: "Коментар або побажання (необов'язково)",
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
      subtitle: "Відгуки тих, хто вже довірив здоров'я своєї усмішки клініці Famiglia",
      items: [
        {
          id: 'rev-1',
          name: 'Олена Ковальчук',
          service: 'Керамічні вініри',
          role: 'Естетична реставрація',
          comment: 'Безмежно вдячна Тетяні Бибіс за мою нову усмішку! Робила керамічні вініри — результат перевершив усі очікування. Дуже дбайливий підхід, атмосфера повного спокою та жодного болю.',
          text: 'Безмежно вдячна Тетяні Бибіс за мою нову усмішку! Робила керамічні вініри — результат перевершив усі очікування. Дуже дбайливий підхід, атмосфера повного спокою та жодного болю.',
          rating: 5,
          date: 'Серпень 2026',
        },
        {
          id: 'rev-2',
          name: 'Маркіян Савицький',
          service: 'Ортодонтія (елайнери)',
          role: 'Ортодонтія (елайнери)',
          comment: 'Проходив курс лікування елайнерами в Famiglia. Все чітко, сучасно, бездоганний сервіс та турбота на кожному візиті. Клініка на Бойківській — це справжній оазис спокою та комфорту.',
          text: 'Проходив курс лікування елайнерами в Famiglia. Все чітко, сучасно, бездоганний сервіс та турбота на кожному візиті. Клініка на Бойківській — це справжній оазис спокою та комфорту.',
          rating: 5,
          date: 'Липень 2026',
        },
        {
          id: 'rev-3',
          name: 'Ірина та син Данилко',
          service: 'Дитяча стоматологія',
          role: 'Дитяча стоматологія',
          comment: 'Вперше син пішов від стоматолога з усмішкою і подарунком, а не зі сльозами! Дякуємо за терпіння, мультфільми та щиру любов до дітей. Тепер на огляди тільки сюди всією родиною.',
          text: 'Вперше син пішов від стоматолога з усмішкою і подарунком, а не зі сльозами! Дякуємо за терпіння, мультфільми та щиру любов до дітей. Тепер на огляди тільки сюди всією родиною.',
          rating: 5,
          date: 'Вересень 2026',
        },
        {
          id: 'rev-4',
          name: 'Андрій Мельник',
          service: 'Терапія під мікроскопом',
          role: 'Терапевтична стоматологія',
          comment: "Лікував складні кореневі канали під мікроскопом. Лікар Тетяна Бибіс врятувала зуб, який в іншій клініці радили видаляти. Комп'ютерна анестезія STA — це фантастика, взагалі нічого не відчув!",
          text: "Лікував складні кореневі канали під мікроскопом. Лікар Тетяна Бибіс врятувала зуб, який в іншій клініці радили видаляти. Комп'ютерна анестезія STA — це фантастика, взагалі нічого не відчув!",
          rating: 5,
          date: 'Червень 2026',
        },
      ],
    },
    mobileSticky: {
      call: 'Зателефонувати',
      book: 'Записатися',
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
      logoSubtitle: 'Your Family Dentistry',
      services: 'Services',
      cases: 'Cases',
      results: 'Results',
      about: 'About Us',
      reviews: 'Reviews',
      contacts: 'Contacts',
      bookBtn: 'Book Visit',
      callBtn: 'Call Us',
    },
    hero: {
      badge: 'м. Львів • вул. Бойківська, 2',
      title: 'Dentistry where care is felt in every detail',
      subtitle: 'Painless, tranquil, and aesthetic dental care for the whole family by Dr. Tetiana Bybis.',
      ctaBooking: 'Book an Appointment',
      ctaServices: 'Services & Pricing',
      ratingValue: '5.0',
      ratingCount: '500+ reviews',
      founderBadge: 'Tetiana Bybis • Chief Doctor',
      experienceBadge: '15+ years of practice',
      ratingNote: 'Over 1,000 satisfied patients',
    },
    trust: {
      painlessTitle: '100% Pain-Free',
      painlessDesc: 'Computer-assisted STA anesthesia without numbness or discomfort',
      sterileTitle: 'Class B Sterility',
      sterileDesc: 'European autoclaves and individual craft pouch sterilization',
      microscopeTitle: '20x Dental Microscope',
      microscopeDesc: 'Preservation of healthy tooth tissue and pinpoint precision',
      kidsTitle: 'Child-Friendly Comfort',
      kidsDesc: 'Tear-free adaptation visits, cartoons, and gifts',
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
          duration: '45–60 min',
          features: [
            'Carl Zeiss 20x Optics',
            'Anatomical Enamel Sculpting',
            'Computer-Controlled STA Anesthesia',
          ],
        },
        {
          id: 'veneers',
          title: 'Porcelain Veneers',
          desc: 'Handcrafted ultra-thin ceramic veneers for a flawless, harmonious, and natural smile.',
          priceFrom: 'from 8,500 ₴',
          duration: '2–3 visits',
          features: [
            'E-max Ceramic',
            'Digital Smile Design',
            'Minimal Preparation',
          ],
        },
        {
          id: 'ortho',
          title: 'Orthodontics & Aligners',
          desc: 'Bite correction and teeth alignment using clear aligners or premier bracket systems.',
          priceFrom: 'from 18,000 ₴',
          duration: 'from 6 months',
          features: [
            'Clear Aligners',
            'Self-Ligating Braces',
            '3D Outcome Simulation',
          ],
        },
        {
          id: 'kids',
          title: 'Pediatric Dentistry 🧸',
          desc: 'Playful adaptation visits and gentle treatment of milk teeth without pain, tears, or fear.',
          priceFrom: 'from 900 ₴',
          duration: '30–45 min',
          features: [
            'Tear-Free Adaptation Visits',
            'Cartoons During Procedure',
            'Gift for Every Little Hero',
          ],
        },
        {
          id: 'surgery',
          title: 'Surgery & Implants',
          desc: 'Atraumatic extractions and premium dental implants with long-term reliability and warranty.',
          priceFrom: 'from 14,000 ₴',
          duration: '40–90 min',
          features: [
            'Global Premium Implant Systems',
            'Piezosurgery Ultrasonic Unit',
            'Rapid Tissue Recovery',
          ],
        },
        {
          id: 'hygiene',
          title: 'Professional Hygiene',
          desc: 'Deep Air-Flow cleaning, ultrasonic tartar removal, and gentle medical teeth whitening.',
          priceFrom: 'from 1,200 ₴',
          duration: '45–60 min',
          features: [
            'Swiss GBT Protocol',
            'Gentle Air-Flow Powder',
            'Gum SPA Care',
          ],
        },
      ],
    },
    cases: {
      title: 'Clinical Cases & Results',
      subtitle: 'Real smile transformation stories from Famiglia clinic patients',
      tabs: {
        veneers: 'Porcelain Veneers',
        restoration: 'Aesthetic Restoration',
        whitening: 'Teeth Whitening',
      },
      items: [
        {
          id: 'case-veneers-1',
          title: 'Complete Aesthetic Smile Zone Rehabilitation',
          category: 'veneers',
          problem: 'Multiple defective composite fillings, incisal wear and persistent discoloration',
          solution: 'Placement of 8 ultra-thin E-max porcelain veneers with minimally invasive preparation',
          visits: '2 visits',
          duration: '10 days',
        },
        {
          id: 'case-restoration-1',
          title: 'Direct Aesthetic Restoration of Front Incisors',
          category: 'restoration',
          problem: 'Chipped incisal edge from minor trauma and secondary carious lesion',
          solution: 'Layered biomimetic composite restoration under microscope replicating natural micro-texture',
          visits: '1 visit',
          duration: '90 min',
        },
        {
          id: 'case-whitening-1',
          title: 'Safe In-Office Cold-Light Photowhitening',
          category: 'whitening',
          problem: 'Coffee staining and intrinsic enamel darkening, desiring a brighter smile',
          solution: 'Gentle cold-light power bleaching + remineralizing therapy without sensitivity (+7 shades)',
          visits: '1 visit',
          duration: '60 min',
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
      founderRole: 'Founder & Chief Doctor',
      quote: '“To me, dentistry is more than a profession — it is the art of restoring confidence and genuine smiles in a warm, family atmosphere.”',
      bioP1: 'Famiglia clinic was designed as a space where every patient experiences heartfelt care and total peace of mind. We replaced clinical tension with warmth, modern aesthetics, and trust.',
      bioP2: 'Using advanced digital protocols, magnification optics, and certified biocompatible materials, we guarantee long-lasting durability and natural appearance for every restoration.',
      clinicAddress: '2 Boikivska St, Lviv',
      instagramHandle: '@famiglia_2022',
      descP1: 'Famiglia clinic was designed as a space where every patient experiences heartfelt care and total peace of mind. We replaced clinical tension with warmth, modern aesthetics, and trust.',
      descP2: 'Using advanced digital protocols, magnification optics, and certified biocompatible materials, we guarantee long-lasting durability and natural appearance for every restoration.',
    },
    booking: {
      title: 'Book an Appointment',
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
          service: 'Porcelain Veneers',
          role: 'Aesthetic Restoration',
          comment: 'Endlessly grateful to Dr. Tetiana Bybis for my new smile! The restoration looks completely natural. Such a caring approach with zero discomfort.',
          text: 'Endlessly grateful to Dr. Tetiana Bybis for my new smile! The restoration looks completely natural. Such a caring approach with zero discomfort.',
          rating: 5,
          date: 'August 2026',
        },
        {
          id: 'rev-2',
          name: 'Markiian Savytskyi',
          service: 'Orthodontics (Aligners)',
          role: 'Orthodontics (Aligners)',
          comment: 'Completed clear aligner treatment at Famiglia. Modern equipment, clear plan, flexible scheduling. The clinic on Boikivska is amazingly welcoming.',
          text: 'Completed clear aligner treatment at Famiglia. Modern equipment, clear plan, flexible scheduling. The clinic on Boikivska is amazingly welcoming.',
          rating: 5,
          date: 'July 2026',
        },
        {
          id: 'rev-3',
          name: 'Iryna & son Danylko',
          service: 'Pediatric Dentistry',
          role: 'Pediatric Dentistry',
          comment: 'For the first time, my son left the dental office with a smile and a toy instead of tears! Thank you for patience and warmth. Best clinic for families.',
          text: 'For the first time, my son left the dental office with a smile and a toy instead of tears! Thank you for patience and warmth. Best clinic for families.',
          rating: 5,
          date: 'September 2026',
        },
        {
          id: 'rev-4',
          name: 'Andrii Melnyk',
          service: 'Microscope Endodontics',
          role: 'Therapeutic Dentistry',
          comment: 'Treated complex root canals under a dental microscope. Dr. Tetiana Bybis saved a tooth that another clinic advised removing. STA computer anesthesia was incredible — zero discomfort.',
          text: 'Treated complex root canals under a dental microscope. Dr. Tetiana Bybis saved a tooth that another clinic advised removing. STA computer anesthesia was incredible — zero discomfort.',
          rating: 5,
          date: 'June 2026',
        },
      ],
    },
    mobileSticky: {
      call: 'Call Us',
      book: 'Book Visit',
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
