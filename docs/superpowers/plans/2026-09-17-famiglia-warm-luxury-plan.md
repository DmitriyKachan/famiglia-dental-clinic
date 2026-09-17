# Famiglia Dental Clinic: Warm Medical Luxury Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Famiglia Dental Clinic into a Warm Medical Luxury web experience with human warmth, Dr. Tetiana Bybis as the focal point, clear pricing, clinical Before/After cases, Telegram booking, and subtle MagicUI animations.

**Architecture:** Next.js 14 App Router with Tailwind CSS tokens (`#FAF8F5`, `#1E1B18`, `#C5A880`, `#2D6A4F`), MagicUI micro-interactions (BlurFade, NumberTicker, ShimmerButton), clean component hierarchy, client-side i18n, accessible booking dialogs, and `/api/appointment` Telegram notification backend.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Lucide Icons, MagicUI primitives, Zod, Vitest.

**Spec:** [`docs/superpowers/specs/2026-09-17-famiglia-warm-luxury-design.md`](file:///C:/Users/Dmytro/.gemini/antigravity/scratch/famiglia-dental-clinic/docs/superpowers/specs/2026-09-17-famiglia-warm-luxury-design.md)

## Global Constraints
- Primary background: `#FAF8F5` (warm alabaster silk); Cards: `#FFFFFF` with border `#EFEBE4`; Text: `#1E1B18` (deep espresso, WCAG 12:1 contrast); Muted: `#6E655F`; Gold: `#C5A880`; Sage: `#2D6A4F`.
- Strictly NO dark cyberpunk / sci-fi aesthetics (no neon lasers, no coordinate grids, no artificial 3D sapphire dental mirrors).
- Authentic clinic data verbatim: Founder Dr. Tetiana Bybis, Instagram `@famiglia_2022`, phone `+380 96 088 9889`, address `м. Львів, вул. Бойківська, 2`.
- Minimum 44×44px touch targets on mobile with 8px+ spacing.
- All tests must pass with 100% success rate (`npm test`), and `npm run build` must succeed with 0 errors.

---

### Task 1: Design System Tokens & MagicUI Animation Primitives

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Create: `src/components/magicui/BlurFade.tsx`
- Create: `src/components/magicui/NumberTicker.tsx`
- Create: `src/components/magicui/ShimmerButton.tsx`
- Create: `tests/design-tokens.test.ts`

**Interfaces:**
- Produces: Tailwind color utility classes (`bg-brand-base`, `bg-brand-surface`, `text-brand-dark`, `text-brand-muted`, `border-brand-border`, `text-brand-gold`, `bg-brand-sage`), `BlurFade` component, `NumberTicker` component, `ShimmerButton` component.

- [ ] **Step 1: Write failing test for design tokens and animation helpers**

```typescript
// tests/design-tokens.test.ts
import { describe, it, expect } from 'vitest';
import tailwindConfig from '../tailwind.config';

describe('Design System Tokens', () => {
  it('should define Warm Medical Luxury color palette', () => {
    const colors = tailwindConfig.theme?.extend?.colors as Record<string, string>;
    expect(colors['brand-base']).toBe('#FAF8F5');
    expect(colors['brand-surface']).toBe('#FFFFFF');
    expect(colors['brand-dark']).toBe('#1E1B18');
    expect(colors['brand-muted']).toBe('#6E655F');
    expect(colors['brand-gold']).toBe('#C5A880');
    expect(colors['brand-sage']).toBe('#2D6A4F');
    expect(colors['brand-border']).toBe('#EFEBE4');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/design-tokens.test.ts`  
Expected: FAIL due to missing or mismatched color tokens.

- [ ] **Step 3: Update `tailwind.config.ts`, `globals.css` and implement MagicUI primitives**

Update `tailwind.config.ts` with exact Warm Medical Luxury tokens. Implement `src/components/magicui/BlurFade.tsx`, `NumberTicker.tsx`, and `ShimmerButton.tsx` with pure CSS and React transitions without heavy runtime overhead.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/design-tokens.test.ts`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts src/app/globals.css src/components/magicui/ tests/design-tokens.test.ts
git commit -m "feat(design): implement Warm Medical Luxury design tokens and MagicUI primitives"
```

---

### Task 2: Bilingual Localization (UA / EN) Refinement

**Files:**
- Modify: `src/lib/i18n/translations.ts`
- Modify: `tests/i18n.test.ts`

**Interfaces:**
- Consumes: `useI18n()` hook.
- Produces: Complete translation keys across `ua` and `en` for `nav`, `hero`, `trust`, `services`, `cases`, `about`, `reviews`, `booking`, `footer`.

- [ ] **Step 1: Update failing tests for new dictionary keys**

Update `tests/i18n.test.ts` to assert that all new Warm Medical Luxury keys exist and match across `ua` and `en`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/i18n.test.ts`  
Expected: FAIL due to missing new keys (e.g. `cases`, `mobileSticky`).

- [ ] **Step 3: Update `src/lib/i18n/translations.ts` with refined copy**

Fill all Ukrainian and English texts reflecting Dr. Tetiana Bybis, the warm clinical atmosphere, transparent pricing, 6 services, and mobile action buttons.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/i18n.test.ts`  
Expected: PASS with 100% key parity.

- [ ] **Step 5: Commit**

```bash
git add src/lib/i18n/translations.ts tests/i18n.test.ts
git commit -m "feat(i18n): update translations for Warm Medical Luxury narrative and mobile actions"
```

---

### Task 3: Header, Mobile Drawer & Mobile Sticky Action Bar

**Files:**
- Modify: `src/components/Header.tsx`
- Create: `src/components/MobileStickyBar.tsx`
- Modify: `tests/header.test.tsx`

**Interfaces:**
- Consumes: `useI18n()` from `src/lib/i18n/context.tsx`.
- Produces: `Header` with warm blur background, phone click-to-call, language switcher, smooth anchor scrolling, and `MobileStickyBar` fixed at viewport bottom on screens < 768px.

- [ ] **Step 1: Write test for Header and MobileStickyBar**

Write tests in `tests/header.test.tsx` asserting that:
- Header displays "Famiglia" and "Стоматологія твоєї сімʼї".
- Phone link points to `tel:+380960889889`.
- MobileStickyBar renders Call and Book buttons.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/header.test.tsx`  
Expected: FAIL.

- [ ] **Step 3: Implement `Header.tsx` and `MobileStickyBar.tsx`**

Implement `Header.tsx` with light warm blur, serif branding, UA/EN switch, and `MobileStickyBar.tsx` with 44px+ touch targets and smooth elevation.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/header.test.tsx`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx src/components/MobileStickyBar.tsx tests/header.test.tsx
git commit -m "feat(ui): implement warm luxury Header and MobileStickyBar"
```

---

### Task 4: Hero Section with Dr. Tetiana Bybis & Trust Bar

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/TrustBar.tsx`
- Create: `tests/hero-trust.test.tsx`

**Interfaces:**
- Consumes: `useI18n()`, `BlurFade`, `NumberTicker`, `ShimmerButton`.
- Produces: 2-column Hero section and 4-card TrustBar.

- [ ] **Step 1: Write tests in `tests/hero-trust.test.tsx`**

Assert that:
- Hero renders Dr. Tetiana Bybis photo card, 15+ years experience badge, and location badge.
- TrustBar renders 4 trust pillars (100% painless, Class B sterility, 20x microscope, pediatric comfort).

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/hero-trust.test.tsx`  
Expected: FAIL.

- [ ] **Step 3: Implement `Hero.tsx` and `TrustBar.tsx`**

Build the empathetic 2-column Hero with Dr. Tetiana Bybis portrait, rating card (4.9 ★), location pin, and the 4 clean trust cards with warm styling.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/hero-trust.test.tsx`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/TrustBar.tsx tests/hero-trust.test.tsx
git commit -m "feat(ui): implement warm Hero with Dr. Tetiana Bybis and TrustBar"
```

---

### Task 5: Services Grid with Transparent Pricing

**Files:**
- Modify: `src/components/Services.tsx`
- Create: `tests/services.test.tsx`

**Interfaces:**
- Consumes: `useI18n()`, `BlurFade`.
- Produces: Responsive 6-card services deck with transparent prices, procedure details, and direct-booking action.

- [ ] **Step 1: Write test in `tests/services.test.tsx`**

Assert that all 6 services are displayed with prices ("від ... грн"), title, and "Записатися" button.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/services.test.tsx`  
Expected: FAIL.

- [ ] **Step 3: Implement `Services.tsx`**

Build clean, warm service cards with price tags, duration badges, and smooth hover elevation.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/services.test.tsx`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Services.tsx tests/services.test.tsx
git commit -m "feat(ui): implement warm luxury Services grid with transparent pricing"
```

---

### Task 6: Interactive Clinical Cases (Before & After) with Doctor's Note

**Files:**
- Modify: `src/components/BeforeAfter.tsx`
- Create: `tests/before-after.test.tsx`

**Interfaces:**
- Consumes: `useI18n()`.
- Produces: Natural split slider before/after comparison with case tabs and doctor's explanation card.

- [ ] **Step 1: Write test in `tests/before-after.test.tsx`**

Assert that BeforeAfter component renders tabs, clinical case info card (Problem → Solution → Visits → Result), and slider handle.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/before-after.test.tsx`  
Expected: FAIL.

- [ ] **Step 3: Implement `BeforeAfter.tsx`**

Build the natural comparison slider with soft divider handle (no neon lines), smooth touch/mouse dragging, and clinical note panel.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/before-after.test.tsx`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/BeforeAfter.tsx tests/before-after.test.tsx
git commit -m "feat(ui): implement natural Before/After case comparison with doctor clinical notes"
```

---

### Task 7: About Doctor & Patient Reviews

**Files:**
- Modify: `src/components/AboutDoctor.tsx`
- Modify: `src/components/Reviews.tsx`
- Create: `tests/about-reviews.test.tsx`

**Interfaces:**
- Consumes: `useI18n()`, `BlurFade`.
- Produces: Doctor profile section and verified patient reviews section.

- [ ] **Step 1: Write test in `tests/about-reviews.test.tsx`**

Assert that Dr. Tetiana Bybis story, clinic interior card, and reviews render properly with star ratings.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/about-reviews.test.tsx`  
Expected: FAIL.

- [ ] **Step 3: Implement `AboutDoctor.tsx` and `Reviews.tsx`**

Create personal story narrative, clinic values (Safety, Painless, Family warmth), and patient reviews with Google Maps & Instagram verification badges.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/about-reviews.test.tsx`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/AboutDoctor.tsx src/components/Reviews.tsx tests/about-reviews.test.tsx
git commit -m "feat(ui): implement warm AboutDoctor profile and verified patient Reviews"
```

---

### Task 8: Booking Section, Modal Dialog & Telegram Notification

**Files:**
- Modify: `src/components/BookingForm.tsx`
- Create: `src/components/BookingModal.tsx`
- Modify: `src/app/api/appointment/route.ts`
- Modify: `src/lib/telegram.ts`
- Create: `tests/booking.test.tsx`

**Interfaces:**
- Consumes: `appointmentSchema`, `useI18n()`.
- Produces: In-page `BookingForm` and accessible `BookingModal` (using HTML `<dialog>` / accessible overlay).

- [ ] **Step 1: Write tests for BookingForm, Modal, and API**

Write tests checking:
- Form submission with valid data calls `/api/appointment`.
- Modal opens and closes properly.
- Validation displays clear helper messages.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/booking.test.tsx`  
Expected: FAIL.

- [ ] **Step 3: Implement `BookingForm.tsx` and `BookingModal.tsx`**

Build clean, accessible booking form with service select, date picker, time slot chips (Ранок / День / Вечір), Telegram dispatch, and modal wrapper.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/booking.test.tsx`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/BookingForm.tsx src/components/BookingModal.tsx tests/booking.test.tsx
git commit -m "feat(booking): implement warm luxury BookingForm and accessible BookingModal"
```

---

### Task 9: Location, Map Preview, Footer & Full Page Assembly

**Files:**
- Modify: `src/components/LocationFooter.tsx`
- Modify: `src/app/page.tsx`
- Delete: `src/components/PrecisionMirror3D.tsx` (unwanted 3D gimmick)
- Delete: `src/components/KineticManifesto.tsx` (unwanted sci-fi text)
- Create: `tests/full-page.test.tsx`

**Interfaces:**
- Assembles: `Header`, `Hero`, `TrustBar`, `Services`, `BeforeAfter`, `AboutDoctor`, `Reviews`, `BookingForm`, `LocationFooter`, `MobileStickyBar`, `BookingModal`.

- [ ] **Step 1: Write full page assembly test in `tests/full-page.test.tsx`**

Verify that `page.tsx` renders all Warm Medical Luxury sections in logical narrative order without any 3D mirror or sci-fi elements.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/full-page.test.tsx`  
Expected: FAIL.

- [ ] **Step 3: Update `LocationFooter.tsx` and assemble `src/app/page.tsx`**

Integrate all components seamlessly in `src/app/page.tsx`. Clean up obsolete sci-fi components.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/full-page.test.tsx`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/LocationFooter.tsx src/app/page.tsx tests/full-page.test.tsx
git commit -m "feat(assembly): assemble Warm Medical Luxury page and clean up sci-fi components"
```

---

### Task 10: Full Regression Testing, Production Build & Visual Verification

**Files:**
- Verification only

- [ ] **Step 1: Run complete Vitest suite**

Run: `npm test`  
Expected: 100% tests passing across all test files.

- [ ] **Step 2: Run production Next.js build**

Run: `npm run build`  
Expected: Clean build with 0 TypeScript and 0 lint errors.

- [ ] **Step 3: Launch dev server and capture desktop & mobile preview screenshots**

Run `npm run dev`, fetch `http://localhost:3000`, take screenshot of the new Warm Medical Luxury design, and verify visual contrast, typography, and polish.

- [ ] **Step 4: Final commit**

```bash
git commit --allow-empty -m "chore(release): complete Warm Medical Luxury redesign verification"
```
