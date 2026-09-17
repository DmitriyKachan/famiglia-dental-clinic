# Task 7 Brief: Reviews, Location Map & Footer, and Page Integration

## Objective
Implement Reviews section, Location & Footer section, and assemble all components into src/app/page.tsx for a complete, production-ready landing page.

## Files to Create/Modify
- src/components/Reviews.tsx
- src/components/LocationFooter.tsx
- src/app/page.tsx
- 	ests/page.test.tsx

## Requirements
1. src/components/Reviews.tsx:
   - Display real reviews from patients from 	.reviews.items.
   - Star rating (5/5) with Star icon in rand-gold.
   - Verified patient tag / source tag (Instagram / Google Maps).
2. src/components/LocationFooter.tsx:
   - Address: м. Львів, вул. Бойківська, 2 with map pin MapPin.
   - Interactive OpenStreetMap iframe or stylized map card with direct link to Google Maps navigation.
   - Schedule: Пн–Пт 10:00–19:00, Сб–Нд за записом.
   - Phone: +380 96 088 9889 (clickable 	el:).
   - Instagram: @famiglia_2022 (direct link with Instagram icon).
   - Quick navigation links and copyright.
3. src/app/page.tsx:
   - Integrates all components wrapped inside I18nProvider:
     - Header
     - Hero
     - TrustBar
     - Services
     - BeforeAfter
     - AboutDoctor
     - BookingForm
     - Reviews
     - LocationFooter
   - Full responsive layout, smooth scrolling anchor targets matching IDs: services, esults, bout, ooking, eviews, contacts.
4. Tests: 	ests/page.test.tsx verifying full page assembly and anchor links.
5. Verification: 
pm run build must compile with 0 errors.

## Report File
Write your report to .superpowers/sdd/famiglia-dental-landing/task-7-report.md.
