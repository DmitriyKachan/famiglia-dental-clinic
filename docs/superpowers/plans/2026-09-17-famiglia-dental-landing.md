# Famiglia Dental Clinic Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Створити преміальний, конверсійний та двомовний (UA/EN) веб-сайт для стоматологічної клініки «Famiglia» (м. Львів, вул. Бойківська, 2) на Next.js 14+ / Tailwind CSS з розширеною формою запису та Telegram-ботом для миттєвих сповіщень.

**Architecture:** Модульний односторінковий лендинг (Next.js App Router) із клієнтським контекстом перемикання мов (`i18n`), адаптивною дизайн-системою в теплих бежево-кавових тонах Instagram `@famiglia_2022`, клієнтською валідацією форми та серверним роутом `/api/appointment`, який транслює структуровані заявки у Telegram Bot API.

**Tech Stack:** Next.js 14+ (App Router, TypeScript), Tailwind CSS, Lucide Icons (`lucide-react`), Zod, Vitest / Node Test Runner.

**Spec:** `docs/superpowers/specs/2026-09-17-famiglia-dental-landing-design.md`

## Global Constraints

- Всі клікабельні елементи повинні мати `cursor-pointer` та плавні переходи (150-300ms).
- Мінімальний розмір інтерактивних елементів на мобільних пристроях: 44x44px.
- Кольори: жодного холодного лікарняного блакитного; дотримуватися палітри `brand-dark` (`#2D241E`), `brand-gold` (`#C5A880`), `brand-beige` (`#F6F2EA`), `brand-bg` (`#FBF9F5`).
- Telegram API роут повинен працювати в режимі `mock` без помилок, якщо змінні оточення `TELEGRAM_BOT_TOKEN` та `TELEGRAM_CHAT_ID` не задані.
- Перемикання мови між `UA` та `EN` повинно відбуватися миттєво без перезавантаження сторінки.

---

### Task 1: Project Scaffolding & Design System Tokens

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Test: `tests/config.test.ts`

**Interfaces:**
- Produces: Base Next.js app structure, Tailwind color tokens (`brand-dark`, `brand-gold`, `brand-beige`, `brand-bg`, `brand-surface`, `brand-text-muted`), base CSS variables and fonts.

- [ ] **Step 1: Write test for Tailwind color tokens and theme setup**

```typescript
// tests/config.test.ts
import { describe, it, expect } from 'vitest';
import tailwindConfig from '../tailwind.config';

describe('Tailwind Theme Configuration', () => {
  it('should define brand color tokens', () => {
    const colors = tailwindConfig.theme?.extend?.colors as Record<string, string>;
    expect(colors['brand-dark']).toBe('#2D241E');
    expect(colors['brand-gold']).toBe('#C5A880');
    expect(colors['brand-beige']).toBe('#F6F2EA');
    expect(colors['brand-bg']).toBe('#FBF9F5');
  });
});
```

- [ ] **Step 2: Initialize project and install dependencies**

Run:
```bash
npm init -y
npm install next@14.2.5 react@18.3.1 react-dom@18.3.1 lucide-react@^0.400.0 clsx tailwind-merge zod
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss postcss autoprefixer vitest
```

- [ ] **Step 3: Create Tailwind config, TypeScript config and Global CSS**

Configure `tailwind.config.ts` with custom brand colors and `src/app/globals.css` with smooth scroll behavior.

- [ ] **Step 4: Run test to verify configuration passes**

Run: `npx vitest run tests/config.test.ts`
Expected: PASS

---

### Task 2: Localization Context & Translations Dictionary (i18n)

**Files:**
- Create: `src/lib/i18n/translations.ts`
- Create: `src/lib/i18n/context.tsx`
- Test: `tests/i18n.test.ts`

**Interfaces:**
- Consumes: None
- Produces: `useI18n()` hook exposing `{ locale, setLocale, t }` and translation keys for navigation, hero, services, about, booking form, reviews, footer.

- [ ] **Step 1: Write test for translations and fallback**

```typescript
// tests/i18n.test.ts
import { describe, it, expect } from 'vitest';
import { translations } from '../src/lib/i18n/translations';

describe('Translations Dictionary', () => {
  it('should contain matching keys in both UA and EN', () => {
    expect(translations.ua.hero.title).toBeDefined();
    expect(translations.en.hero.title).toBeDefined();
    expect(translations.ua.booking.submit).toBe('Записатися на прийом');
    expect(translations.en.booking.submit).toBe('Book an Appointment');
  });
});
```

- [ ] **Step 2: Implement translation dictionaries and Context Provider**

Create `translations.ts` with complete UA and EN texts for all sections (no missing keys), and `context.tsx` with React context for locale state.

- [ ] **Step 3: Run test to verify i18n passes**

Run: `npx vitest run tests/i18n.test.ts`
Expected: PASS

---

### Task 3: Telegram Bot API Endpoint (`/api/appointment`)

**Files:**
- Create: `src/app/api/appointment/route.ts`
- Create: `src/lib/telegram.ts`
- Test: `tests/telegram.test.ts`

**Interfaces:**
- Consumes: POST JSON `{ name, phone, service, date, timeSlot, comment, locale }`
- Produces: Response `{ success: true, message: string, mode: "real" | "mock" }`

- [ ] **Step 1: Write test for Telegram message formatter and Zod validation**

```typescript
// tests/telegram.test.ts
import { describe, it, expect } from 'vitest';
import { appointmentSchema, formatTelegramMessage } from '../src/lib/telegram';

describe('Telegram Integration', () => {
  it('should validate valid appointment payload', () => {
    const validData = {
      name: 'Олена',
      phone: '+380961234567',
      service: 'Ортодонтія',
      date: '2026-09-20',
      timeSlot: 'Ранок (10:00–13:00)',
      comment: 'Консультація',
      locale: 'ua'
    };
    const result = appointmentSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid phone numbers', () => {
    const invalidData = {
      name: 'Олена',
      phone: '1234',
      service: 'Ортодонтія',
      date: '2026-09-20',
      timeSlot: 'Ранок',
      locale: 'ua'
    };
    const result = appointmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should format Telegram HTML message properly', () => {
    const msg = formatTelegramMessage({
      name: 'Олена',
      phone: '+380961234567',
      service: 'Ортодонтія',
      date: '2026-09-20',
      timeSlot: 'Ранок (10:00–13:00)',
      comment: 'Тест',
      locale: 'ua'
    });
    expect(msg).toContain('🦷 <b>Новий запис на прийом: Famiglia</b>');
    expect(msg).toContain('+380961234567');
  });
});
```

- [ ] **Step 2: Implement validation schema and route handler**

Create `src/lib/telegram.ts` with Zod schema and formatting.
Create `src/app/api/appointment/route.ts` with fallback handling if env vars are not set.

- [ ] **Step 3: Run test to verify validation and formatting**

Run: `npx vitest run tests/telegram.test.ts`
Expected: PASS

---

### Task 4: UI Components — Header, Hero & Trust Bar

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/TrustBar.tsx`
- Test: `tests/header.test.tsx`

**Interfaces:**
- Consumes: `useI18n()`
- Produces: Responsive navigation header with language toggle, hero banner with direct CTA, and trust statistics.

- [ ] **Step 1: Write tests for header navigation and language switcher**
- [ ] **Step 2: Implement Header, Hero and TrustBar components**
  - Use Lucide icons (`Phone`, `MapPin`, `Calendar`, `Sparkles`, `ShieldCheck`, `Clock`).
  - Add smooth scrolling anchor links `#services`, `#about`, `#results`, `#booking`, `#contacts`.
- [ ] **Step 3: Run test and verify render**

---

### Task 5: UI Components — Services Grid & Interactive Before/After Gallery

**Files:**
- Create: `src/components/Services.tsx`
- Create: `src/components/BeforeAfter.tsx`
- Create: `src/components/AboutDoctor.tsx`

**Interfaces:**
- Consumes: `useI18n()`
- Produces: Service cards with pricing badges, interactive before/after image slider with touch support, and founder profile section.

- [ ] **Step 1: Implement Services grid with hover elevation and booking triggers**
- [ ] **Step 2: Implement interactive Before/After comparison slider (with slider drag & touch)**
- [ ] **Step 3: Implement About Doctor section featuring Tetiana Bybis and clinic atmosphere**

---

### Task 6: Booking Form with Date Picker, Time Slots & Telegram Feedback

**Files:**
- Create: `src/components/BookingForm.tsx`
- Test: `tests/booking-form.test.tsx`

**Interfaces:**
- Consumes: `useI18n()`, calls `/api/appointment`
- Produces: Full interactive appointment form with time slots, validation, loading spinner, success and error states.

- [ ] **Step 1: Implement BookingForm component**
  - Name and phone inputs with client-side phone formatting.
  - Interactive service selection chips.
  - Native accessible date picker with minimum date set to today.
  - Interactive time of day buttons: *Ранок (10:00–13:00)*, *День (13:00–16:00)*, *Вечір (16:00–19:00)*.
  - Post request to `/api/appointment` with loading feedback.
  - Success modal / banner with reassurance message.
- [ ] **Step 2: Write test for booking form state handling**
- [ ] **Step 3: Verify form interaction and submission**

---

### Task 7: Reviews, Location Map & Footer

**Files:**
- Create: `src/components/Reviews.tsx`
- Create: `src/components/LocationFooter.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: All components assembled in `src/app/page.tsx`
- Produces: Complete page layout with working navigation, reviews carousel/grid, OpenStreetMap / directions widget, and social links.

- [ ] **Step 1: Implement Reviews section with star ratings and quotes from Instagram**
- [ ] **Step 2: Implement LocationFooter with address (вул. Бойківська, 2), interactive map link and contact methods**
- [ ] **Step 3: Assemble everything in `src/app/page.tsx`**
- [ ] **Step 4: Run build check: `npm run build`**

---

### Task 8: End-to-End Verification & Telegram Setup Guide

**Files:**
- Create: `.env.example`
- Create: `README.md` (with step-by-step instructions for getting `TELEGRAM_BOT_TOKEN` via @BotFather and finding `CHAT_ID`)
- Test: Comprehensive verification of form submissions and visual polish.

- [ ] **Step 1: Create `.env.example` with clear instructions**
- [ ] **Step 2: Perform full verification in browser (form submit, language switch, responsive breakpoints)**
- [ ] **Step 3: Final polish and documentation**
