# Task 5 Brief: UI Components — Services Grid, Interactive Before/After Gallery & About Doctor

## Objective
Implement three core visual sections:
1. src/components/Services.tsx: 6 dental services grid with clean cards, icons, pricing badges, and a direct 'Записатися' trigger.
2. src/components/BeforeAfter.tsx: Interactive image slider comparing before & after states for restorations, whitening, and orthodontic alignment.
3. src/components/AboutDoctor.tsx: Warm, personal presentation of founder Dr. Tetiana Bybis and clinic philosophy.

## Files to Create
- src/components/Services.tsx
- src/components/BeforeAfter.tsx
- src/components/AboutDoctor.tsx
- 	ests/services-about.test.tsx

## Requirements
1. Services.tsx:
   - Maps through 	.services.items.
   - Category tags, descriptions, starting prices (e.g. від 1 400 ₴).
   - Action button on each card that smoothly scrolls to #booking and pre-selects or focuses the service.
   - Hover card micro-interactions with gentle border glow in rand-gold.
2. BeforeAfter.tsx:
   - Tab buttons for different procedures: *Художня реставрація*, *Ортодонтія (елайнери)*, *Професійне відбілювання*.
   - Interactive slider component (drag handle with left/right arrows, responsive touch support).
   - SVG visual comparisons / dental case imagery with Before / After badges.
3. AboutDoctor.tsx:
   - Warm photo of Tetiana Bybis (@tetiana_bybis) in clinical aesthetic interior.
   - 15 years experience highlight, warm quotes, list of clinic principles (без болю, стерильність, затишок).
   - Link/badge to Instagram @famiglia_2022.
4. Tests: 	ests/services-about.test.tsx ensuring components render correctly with I18nProvider.

## Report File
Write your report to .superpowers/sdd/famiglia-dental-landing/task-5-report.md.
