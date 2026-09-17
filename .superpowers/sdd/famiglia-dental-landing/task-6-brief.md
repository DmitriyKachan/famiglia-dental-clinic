# Task 6 Brief: Booking Form with Date Picker, Time Slots & Telegram Feedback

## Objective
Create the interactive booking form component src/components/BookingForm.tsx integrating with /api/appointment and providing real-time validation, date selection, time slots, loading feedback, and success/error modals.

## Files to Create
- src/components/BookingForm.tsx
- 	ests/booking-form.test.tsx

## Requirements
1. src/components/BookingForm.tsx:
   - Interactive fields:
     - 
ame: input with icon User.
     - phone: input with icon Phone, formatted placeholder (e.g. +380 96 123 4567).
     - service: interactive selector or select dropdown populated from 	.services.items + 'Інше / Other'.
     - date: HTML5 date input with min set to today (
ew Date().toISOString().split('T')[0]) and icon Calendar.
     - 	imeSlot: 3 interactive time-of-day buttons with icons:
       * 🌅 Ранок (10:00–13:00) / Morning (10:00–13:00)
       * ☀️ День (13:00–16:00) / Afternoon (13:00–16:00)
       * 🌙 Вечір (16:00–19:00) / Evening (16:00–19:00)
     - comment: optional textarea with icon MessageSquare.
   - Submission:
     - Sends POST request to /api/appointment with payload { name, phone, service, date, timeSlot, comment, locale }.
     - Loading state on button with spinner Loader2 and text 	.booking.loading.
     - Success state: smooth transition to a confirmation card with checkmark CheckCircle2, summary of submitted details, and reassuring text.
     - Error state: alerts with message and direct clickable call button 	el:+380960889889.
   - Accessible, meets WCAG 4.5:1 contrast, inputs have visible labels and focus rings in rand-gold.
2. Tests: 	ests/booking-form.test.tsx verifying validation, time slot selection, and fetch call handling.

## Report File
Write your report to .superpowers/sdd/famiglia-dental-landing/task-6-report.md.
