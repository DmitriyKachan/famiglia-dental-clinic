# Task 3 Brief: Telegram Bot API Endpoint (/api/appointment)

## Objective
Implement server-side Next.js route /api/appointment and Telegram message formatter with Zod validation.

## Files to Create
- src/lib/telegram.ts
- src/app/api/appointment/route.ts
- 	ests/telegram.test.ts

## Requirements
1. src/lib/telegram.ts:
   - Zod schema ppointmentSchema:
     - 
ame: string, min(2)
     - phone: string, regex for international / UA format (e.g. ^\+?[0-9\s\-()]{10,20}$)
     - service: string, min(2)
     - date: string, min(4)
     - 	imeSlot: string, min(2)
     - comment: string optional
     - locale: 'ua' | 'en' (default 'ua')
   - Function ormatTelegramMessage(data: AppointmentData): string generating well-formatted HTML with emoji and structured fields.
   - Function sendTelegramNotification(data: AppointmentData): Promise<{ success: boolean; mode: 'real' | 'mock'; message?: string }>:
     - If process.env.TELEGRAM_BOT_TOKEN and process.env.TELEGRAM_CHAT_ID are present, send POST request to https://api.telegram.org/bot/sendMessage with parse_mode: 'HTML'.
     - If not set, log formatted message to console (console.log) and return { success: true, mode: 'mock' }.
2. src/app/api/appointment/route.ts:
   - Handles POST requests.
   - Parses request body, validates with ppointmentSchema. If invalid, returns 400 with validation errors.
   - Calls sendTelegramNotification. If success, returns 200 { success: true, mode, message }.
   - Handles exceptions gracefully (returns 500 with user-friendly error).
3. 	ests/telegram.test.ts:
   - Tests ppointmentSchema on valid and invalid payloads.
   - Tests ormatTelegramMessage output.
   - Tests sendTelegramNotification in mock mode.
   - Tests must pass via 
px vitest run tests/telegram.test.ts.

## Report File
Write your report to .superpowers/sdd/famiglia-dental-landing/task-3-report.md.
