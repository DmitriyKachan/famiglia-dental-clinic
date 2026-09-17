# Task 3 Report: Telegram Bot API Endpoint (/api/appointment)

**Status:** DONE  
**Commit:** `feat(api): telegram bot appointment endpoint with validation` (`8856635`)

## Summary of Accomplishments

1. **Telegram Integration Library (`src/lib/telegram.ts`):**
   - **`appointmentSchema`**: Zod validation schema matching all criteria:
     - `name`: string, min 2 characters, trimmed.
     - `phone`: regex validation for Ukrainian & international phone formats (`^\+?[0-9\s\-()]{10,20}$`).
     - `service`: string, min 2 characters, trimmed.
     - `date`: string, min 4 characters, trimmed.
     - `timeSlot`: string, min 2 characters, trimmed.
     - `comment`: optional string.
     - `locale`: `'ua' | 'en'` enum with default `'ua'`.
   - **`formatTelegramMessage(data)`**: Creates structured HTML messages for Telegram with emojis (`🦷`, `👤`, `📞`, `🩺`, `📅`, `⏰`, `💬`, `🌐`) including title `🦷 <b>Новий запис на прийом: Famiglia</b>`, formatted fields, and secure entity escaping via `escapeTelegramHtml` to prevent markup injection.
   - **`sendTelegramNotification(data)`**:
     - When `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are present in `process.env`, sends an HTTP POST request to `https://api.telegram.org/bot${token}/sendMessage` with `parse_mode: 'HTML'`.
     - When env variables are absent, logs the formatted message to `console.log` and returns `{ success: true, mode: 'mock' }`.
     - Gracefully handles non-200 Telegram API responses and network connection errors.

2. **Next.js App Router API Endpoint (`src/app/api/appointment/route.ts`):**
   - Implements `POST(request: Request)` route handler.
   - Parses and validates JSON body against `appointmentSchema`.
   - Returns HTTP 400 with flattened validation error details on invalid payload or malformed JSON.
   - Dispatches notification via `sendTelegramNotification(data)`.
   - Returns HTTP 200 with `{ success: true, mode, message }` on success.
   - Returns HTTP 500 with user-friendly error message on upstream Telegram failure or uncaught exceptions.

3. **Vitest Configuration (`vitest.config.mts`):**
   - Added TypeScript path alias mapping (`@/* -> ./src/*`) for Vite/Vitest to support seamless App Router module resolution across unit and integration tests.

4. **Testing & Verification (`tests/telegram.test.ts`):**
   - Unit tests covering:
     - `appointmentSchema`: full valid payloads, optional fields default resolution, English and Ukrainian locales, multiple international and local phone number formats, rejected malformed numbers, short names, and missing required properties.
     - `formatTelegramMessage`: presence of exact title and emoji layout, comment fallback when omitted, and HTML entity escaping.
     - `sendTelegramNotification`: mock mode console logging, real mode POST payload dispatch, HTTP error responses, and network failure resilience.
     - `POST /api/appointment`: route handler HTTP 200 response, 400 validation error responses, malformed JSON handling, and 500 error responses.
   - Verification commands:
     - `npx vitest run tests/telegram.test.ts`: **PASSED** (19/19 tests passed).
     - `npm test`: **PASSED** (35/35 tests passed across full suite).
     - `npx tsc --noEmit`: **PASSED** (0 TypeScript errors).
     - `npm run build`: **PASSED** (production Next.js build created dynamic endpoint `/api/appointment`).
