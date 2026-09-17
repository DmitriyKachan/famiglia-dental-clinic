# Famiglia Dental Clinic: Warm Medical Luxury Design Specification

**Date:** 2026-09-17  
**Status:** Approved  
**Aesthetic Direction:** Warm Medical Luxury (UI/UX Pro Max & Modern Web Guidance)  
**Location:** м. Львів, вул. Бойківська, 2  
**Founder & Head Doctor:** Тетяна Бибіс (@tetiana_bybis)  
**Instagram:** @famiglia_2022  
**Phone:** +380 96 088 9889  

---

## 1. Executive Summary & Design Rationale

The previous version contained sci-fi tropes (dark graphite/coffee backgrounds, neon laser dividers, coordinate lines, 3D sapphire dental mirrors with artificial zoom, and robotic typography), which generated an unwanted "generic AI tech demo" impression.

This specification redesigns the presentation layer into **Warm Medical Luxury**:
- **Aesthetic Principles:** Calm, human-centric, sterile, and welcoming. Replacing dark cyberpunk tones with warm alabaster, soft cream, rich espresso typography, and subtle sand gold / medical sage accents.
- **Core Narrative:** Highlighting Dr. Tetiana Bybis, her 15+ years of clinical practice, family atmosphere, painless treatment (computerized anesthesia), and real patient smile transformations.
- **Conversion Architecture:** Hybrid booking funnel featuring clear desktop section booking, responsive mobile sticky action bar (Call + Book dialog), transparent service pricing ("від ... грн"), and direct Telegram notification dispatch.

---

## 2. Design System Tokens & Typography (UI/UX Pro Max)

### 2.1 Color Tokens
| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| `bg-base` | `#FAF8F5` | Primary page background (warm alabaster silk) |
| `bg-surface` | `#FFFFFF` | Card & container surfaces with subtle warm border `#EFEBE4` |
| `bg-muted` | `#F4EFEB` | Secondary pill & input background |
| `text-main` | `#1E1B18` | Deep rich espresso (WCAG contrast > 12:1) |
| `text-muted` | `#6E655F` | Warm taupe gray for captions & secondary notes |
| `accent-gold` | `#C5A880` | Subtle sand gold for badges, stars, and focus rings |
| `accent-gold-hover` | `#B8976C` | Darker sand gold for active/hover states |
| `accent-sage` | `#2D6A4F` | Medical sage green for health, sterility, and comfort badges |
| `border-subtle` | `#EFEBE4` | Soft natural divider color |

### 2.2 Typography
- **Headings (H1, H2, H3):** Elegant serif font stack (`Playfair Display`, `Cormorant Garamond`, `Georgia`, serif) for warmth and boutique medical excellence.
- **Body & Interface:** Clean modern sans-serif (`Figtree`, `Inter`, system-ui, sans-serif) with generous line height (`leading-relaxed` / 1.6) for effortless reading.

### 2.3 UX & Accessibility Standards
- Minimum touch targets of 44×44px with 8px+ spacing.
- Visible keyboard focus indicators (`focus-visible:ring-2 focus-visible:ring-[#C5A880] focus-visible:outline-none`).
- Smooth transitions (150–200ms) with `cursor-pointer` on all interactive triggers.
- Support for `prefers-reduced-motion`.
- No emojis used as standalone iconography; all icons are curated Lucide SVG components.

---

## 3. Page Structure & Component Architecture

### 3.1 Header (`src/components/Header.tsx`)
- Fixed blur glass header with warm background (`backdrop-blur-md bg-[#FAF8F5]/90 border-b border-[#EFEBE4]`).
- Brand typography: "Famiglia" with cursive subtitle "Стоматологія твоєї сімʼї".
- Navigation anchor links: Послуги (`#services`), До/Після (`#cases`), Про лікаря (`#about`), Відгуки (`#reviews`), Контакти (`#contacts`).
- Direct phone link: `+380 96 088 9889`.
- Language toggle: `UA | EN`.
- Primary CTA: "Записатися" (smooth scrolls to `#booking` or triggers booking dialog).
- Mobile burger menu with slide-down drawer.

### 3.2 Hero Section (`src/components/Hero.tsx`)
- **Split 2-column layout:**
  - **Left column:**
    - Location badge: "м. Львів • вул. Бойківська, 2".
    - Heading: "Стоматологія, де турбота відчувається в кожній деталі" (UA) / "Dentistry where care is felt in every detail" (EN).
    - Subtitle: Painless, warm, and precise treatment for the whole family led by Dr. Tetiana Bybis.
    - CTAs: Primary "Записатися на прийом" (fills booking state) & Secondary "Послуги та ціни" (scrolls to `#services`).
    - Trust badges: 4.9 ★ patient rating, 15+ years experience, 1000+ happy smiles.
  - **Right column:**
    - High-quality portrait card of Dr. Tetiana Bybis in her modern clinic environment.
    - Floating badges: "Тетяна Бибіс — головний лікар", "Безболісне лікування без страху".

### 3.3 Trust Bar (`src/components/TrustBar.tsx`)
- 4 human-centered assurance cards:
  1. **100% без болю:** Комп'ютерна анестезія STA без оніміння обличчя та дискомфорту.
  2. **Стерильність класу B:** Європейські протоколи, індивідуальні крафт-пакети, що відкриваються при вас.
  3. **Лікування під мікроскопом:** 20-кратне оптичне збереження природних тканин зуба.
  4. **Турбота про дітей:** Адаптаційні візити без сліз, ігрова форма та подарунки.

### 3.4 Services & Pricing (`src/components/Services.tsx`)
- 6 categorized cards with clear pricing ("від ... грн"), duration, and included items:
  1. Терапія та лікування каналів (від 1 200 грн)
  2. Керамічні вініри та естетична реставрація (від 9 500 грн)
  3. Ортодонтія (брекети та елайнери) (від 15 000 грн)
  4. Дитяча стоматологія та профілактика (від 800 грн)
  5. Хірургія та імплантація (від 14 000 грн)
  6. Професійна гігієна та відбілювання Beyond (від 1 400 грн)
- "Обрати послугу" action pre-populates the booking form.

### 3.5 Clinical Cases: Before & After (`src/components/BeforeAfter.tsx`)
- Elegant interactive split slider with smooth drag interaction (no neon lasers).
- Case selector tabs:
  - Керамічні вініри (зона посмішки)
  - Художня реставрація передніх зубів
  - Професійне відбілювання та гігієна
- Doctor's Clinical Note Card:
  - Скарги пацієнта
  - План лікування Тетяни Бибіс
  - Кількість візитів та термін
  - Результат

### 3.6 About Doctor & Clinic Atmosphere (`src/components/AboutDoctor.tsx`)
- Story of Dr. Tetiana Bybis: Why Famiglia was created as a stress-free dental clinic in Lviv.
- Focus on family approach, clinical ethics, continuous international training.
- Clinic photos showing comfortable modern interiors on Boikivska 2.

### 3.7 Reviews (`src/components/Reviews.tsx`)
- Verified patient feedback from Google Maps and Instagram.
- Star ratings, author names, treatment types, and genuine quotes.

### 3.8 Online Booking (`src/components/BookingForm.tsx` & `BookingModal.tsx`)
- Input fields:
  - Name (min 2 chars)
  - Phone (+380...)
  - Service selection dropdown
  - Preferred date
  - Preferred time slot: Ранок (10:00–13:00), День (13:00–16:00), Вечір (16:00–19:00)
  - Optional comment
- Submit sends payload to `/api/appointment`.
- Success card with confirmation details; fallback error alert with direct phone button.

### 3.9 Mobile Sticky Bar (`src/components/MobileStickyBar.tsx`)
- Fixed bottom bar on viewports < 768px:
  - "Зателефонувати" (`tel:+380960889889`)
  - "Записатися" (opens `<dialog>` modal with booking form)

### 3.10 Location & Footer (`src/components/LocationFooter.tsx`)
- Address: м. Львів, вул. Бойківська, 2.
- Schedule: Пн–Пт 10:00–19:00, Сб за записом, Нд вихідний.
- Navigation links to Google Maps.
- Social links (@famiglia_2022, @tetiana_bybis).

---

## 4. API & Telegram Integration

- Endpoint: `POST /api/appointment`
- Zod schema validation:
  ```typescript
  export const appointmentSchema = z.object({
    name: z.string().min(2),
    phone: z.string().regex(/^\+?[0-9\s\-()]{10,18}$/),
    service: z.string().min(1),
    date: z.string().min(1),
    timeSlot: z.enum(['morning', 'afternoon', 'evening']),
    comment: z.string().optional(),
    locale: z.enum(['ua', 'en']).default('ua')
  });
  ```
- HTML Telegram Message Format:
  Dispatches to `TELEGRAM_BOT_TOKEN` & `TELEGRAM_CHAT_ID` or logs in mock mode if env variables are not present.

---

## 5. Verification Plan

1. **Unit & Integration Tests (Vitest):**
   - Verify i18n key equivalence between UA and EN.
   - Verify appointment API route, Zod schema validation, and Telegram HTML formatting.
   - Verify rendering of all UI components (`Header`, `Hero`, `TrustBar`, `Services`, `BeforeAfter`, `AboutDoctor`, `Reviews`, `BookingForm`, `MobileStickyBar`, `LocationFooter`).
2. **Build Verification:**
   - Run `npm run build` to guarantee 0 TypeScript/ESLint compiler errors.
3. **Browser & Visual Verification:**
   - Run local dev server, capture visual snapshot of the new Warm Medical Luxury design on desktop and mobile viewports.
