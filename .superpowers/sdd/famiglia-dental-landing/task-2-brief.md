# Task 2 Brief: Localization Context & Translations Dictionary (i18n)

## Objective
Create bilingual i18n support (UA and EN) with React Context, custom hook useI18n(), and complete dictionaries covering all sections of the landing page without missing keys.

## Files to Create
- src/lib/i18n/translations.ts
- src/lib/i18n/context.tsx
- 	ests/i18n.test.ts

## Requirements
1. Dictionaries must support:
   - 
av: logo, services, about, results, reviews, contacts, bookBtn
   - hero: badge, title, subtitle, ctaBooking, ctaServices, ratingNote
   - 	rust: expYears, expLabel, sterilePercent, sterileLabel, smilesCount, smilesLabel, techLabel, techDesc
   - services: title, subtitle, items (6 items: Therapy, Orthodontics, Kids, Esthetics, Surgery, Hygiene) with id, title, desc, priceFrom
   - eforeAfter: title, subtitle, tabs (restoration, ortho, whitening), compareLabel
   - bout: title, founderName, founderRole, quote, descP1, descP2
   - ooking: title, subtitle, nameLabel, namePlaceholder, phoneLabel, phonePlaceholder, serviceLabel, selectServiceDefault, dateLabel, timeSlotLabel, morningSlot, afternoonSlot, eveningSlot, commentLabel, commentPlaceholder, submit, loading, successTitle, successDesc, errorTitle, errorDesc, directCall
   - eviews: title, subtitle, items (at least 3 real testimonials)
   - ooter: addressLabel, addressValue, scheduleLabel, scheduleValue, phoneLabel, phoneValue, instagramLabel, copyright
2. React Context I18nProvider with useI18n() hook exposing { locale, setLocale, t }. Default locale is 'ua'.
3. Vitest test 	ests/i18n.test.ts verifying all top-level keys exist in both 'ua' and 'en'.

## Report File
Write your report to .superpowers/sdd/famiglia-dental-landing/task-2-report.md.
