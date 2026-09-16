import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  appointmentSchema,
  formatTelegramMessage,
  sendTelegramNotification,
  escapeTelegramHtml,
  type AppointmentData,
} from '../src/lib/telegram';
import { POST } from '../src/app/api/appointment/route';

describe('Telegram Integration', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
    vi.restoreAllMocks();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe('appointmentSchema validation', () => {
    it('should validate valid appointment payload', () => {
      const validData = {
        name: 'Олена',
        phone: '+380961234567',
        service: 'Ортодонтія',
        date: '2026-09-20',
        timeSlot: 'Ранок (10:00–13:00)',
        comment: 'Консультація',
        locale: 'ua' as const,
      };
      const result = appointmentSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('Олена');
        expect(result.data.phone).toBe('+380961234567');
        expect(result.data.locale).toBe('ua');
      }
    });

    it('should apply default locale "ua" when locale is omitted', () => {
      const payloadWithoutLocale = {
        name: 'Тарас',
        phone: '+380501112233',
        service: 'Терапія та лікування карієсу',
        date: '2026-09-25',
        timeSlot: 'День (13:00–16:00)',
      };
      const result = appointmentSchema.safeParse(payloadWithoutLocale);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.locale).toBe('ua');
      }
    });

    it('should accept "en" as a valid locale', () => {
      const payloadEn = {
        name: 'John Doe',
        phone: '+1 555 123 4567',
        service: 'Aesthetic Dentistry',
        date: '2026-10-01',
        timeSlot: 'Evening (16:00–19:00)',
        comment: 'First visit',
        locale: 'en' as const,
      };
      const result = appointmentSchema.safeParse(payloadEn);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.locale).toBe('en');
      }
    });

    it('should accept various valid phone number formats', () => {
      const validPhones = [
        '+380961234567',
        '0961234567',
        '+38 (096) 123-45-67',
        '+380 96 123 45 67',
        '+1 (555) 019-2834',
        '0322233445',
      ];

      for (const phone of validPhones) {
        const result = appointmentSchema.safeParse({
          name: 'Тест',
          phone,
          service: 'Огляд',
          date: '2026-09-22',
          timeSlot: 'Ранок',
        });
        expect(result.success, `Expected phone "${phone}" to be valid`).toBe(true);
      }
    });

    it('should reject invalid phone numbers', () => {
      const invalidPhones = [
        '1234',
        'phone-number',
        '+38096abc4567',
        '',
        '+3809612345678901234567890', // too long
      ];

      for (const phone of invalidPhones) {
        const result = appointmentSchema.safeParse({
          name: 'Олена',
          phone,
          service: 'Ортодонтія',
          date: '2026-09-20',
          timeSlot: 'Ранок',
          locale: 'ua',
        });
        expect(result.success, `Expected phone "${phone}" to be invalid`).toBe(false);
      }
    });

    it('should reject names shorter than 2 characters', () => {
      const invalidData = {
        name: 'A',
        phone: '+380961234567',
        service: 'Ортодонтія',
        date: '2026-09-20',
        timeSlot: 'Ранок',
      };
      const result = appointmentSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject missing required fields', () => {
      expect(appointmentSchema.safeParse({}).success).toBe(false);
      expect(
        appointmentSchema.safeParse({
          name: 'Олена',
          phone: '+380961234567',
        }).success
      ).toBe(false);
    });

    it('should reject invalid locale', () => {
      const invalidData = {
        name: 'Олена',
        phone: '+380961234567',
        service: 'Ортодонтія',
        date: '2026-09-20',
        timeSlot: 'Ранок',
        locale: 'pl',
      };
      const result = appointmentSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('formatTelegramMessage', () => {
    it('should format Telegram HTML message properly', () => {
      const data: AppointmentData = {
        name: 'Олена',
        phone: '+380961234567',
        service: 'Ортодонтія',
        date: '2026-09-20',
        timeSlot: 'Ранок (10:00–13:00)',
        comment: 'Тест',
        locale: 'ua',
      };
      const msg = formatTelegramMessage(data);

      expect(msg).toContain('🦷 <b>Новий запис на прийом: Famiglia</b>');
      expect(msg).toContain('+380961234567');
      expect(msg).toContain('Олена');
      expect(msg).toContain('Ортодонтія');
      expect(msg).toContain('2026-09-20');
      expect(msg).toContain('Ранок (10:00–13:00)');
      expect(msg).toContain('Тест');
      expect(msg).toContain('UA');
    });

    it('should handle empty or undefined comment gracefully', () => {
      const data: AppointmentData = {
        name: 'Андрій',
        phone: '+380671112233',
        service: 'Професійна гігієна',
        date: '2026-09-21',
        timeSlot: 'День (13:00–16:00)',
        locale: 'ua',
      };
      const msg = formatTelegramMessage(data);

      expect(msg).toContain('<b>Коментар:</b> —');
    });

    it('should escape HTML characters in user input to prevent broken markup', () => {
      expect(escapeTelegramHtml('Tom & Jerry <test>')).toBe('Tom &amp; Jerry &lt;test&gt;');

      const data: AppointmentData = {
        name: 'Dr. <Script> & Co',
        phone: '+380961234567',
        service: 'Checkup & Clean <Pro>',
        date: '2026-09-20',
        timeSlot: 'Slot > 10:00',
        comment: 'Need <urgent> help & check',
        locale: 'en',
      };
      const msg = formatTelegramMessage(data);

      expect(msg).not.toContain('<Script>');
      expect(msg).toContain('&lt;Script&gt;');
      expect(msg).toContain('Checkup &amp; Clean &lt;Pro&gt;');
      expect(msg).toContain('Need &lt;urgent&gt; help &amp; check');
    });
  });

  describe('sendTelegramNotification', () => {
    it('should log formatted message and return mode mock when env vars are missing', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const data: AppointmentData = {
        name: 'Марія',
        phone: '+380931234567',
        service: 'Дитяча стоматологія',
        date: '2026-09-25',
        timeSlot: 'Ранок',
        locale: 'ua',
      };

      const result = await sendTelegramNotification(data);

      expect(result.success).toBe(true);
      expect(result.mode).toBe('mock');
      expect(consoleSpy).toHaveBeenCalled();
      const loggedMessage = consoleSpy.mock.calls[0][0];
      expect(loggedMessage).toContain('[Telegram Notification (Mock Mode)]');
      expect(loggedMessage).toContain('Марія');
    });

    it('should dispatch POST request when bot token and chat id are set', async () => {
      process.env.TELEGRAM_BOT_TOKEN = '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11';
      process.env.TELEGRAM_CHAT_ID = '-1001234567890';

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true }),
      });
      vi.stubGlobal('fetch', mockFetch);

      const data: AppointmentData = {
        name: 'Софія',
        phone: '+380981112233',
        service: 'Відбілювання зубів',
        date: '2026-09-28',
        timeSlot: 'Вечір',
        locale: 'ua',
      };

      const result = await sendTelegramNotification(data);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      const [url, options] = mockFetch.mock.calls[0];
      expect(url).toBe('https://api.telegram.org/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/sendMessage');
      expect(options.method).toBe('POST');
      expect(options.headers['Content-Type']).toBe('application/json');

      const body = JSON.parse(options.body);
      expect(body.chat_id).toBe('-1001234567890');
      expect(body.parse_mode).toBe('HTML');
      expect(body.text).toContain('Софія');

      expect(result.success).toBe(true);
      expect(result.mode).toBe('real');
    });

    it('should return failure result when Telegram API returns non-ok response', async () => {
      process.env.TELEGRAM_BOT_TOKEN = 'mock-token';
      process.env.TELEGRAM_CHAT_ID = 'mock-chat-id';

      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: false,
          status: 400,
          text: async () => '{"ok":false,"description":"Bad Request: chat not found"}',
        })
      );
      vi.spyOn(console, 'error').mockImplementation(() => {});

      const data: AppointmentData = {
        name: 'Остап',
        phone: '+380971234567',
        service: 'Огляд',
        date: '2026-09-30',
        timeSlot: 'Ранок',
        locale: 'ua',
      };

      const result = await sendTelegramNotification(data);

      expect(result.success).toBe(false);
      expect(result.mode).toBe('real');
      expect(result.message).toContain('Telegram API error (400)');
    });

    it('should handle network exceptions gracefully', async () => {
      process.env.TELEGRAM_BOT_TOKEN = 'mock-token';
      process.env.TELEGRAM_CHAT_ID = 'mock-chat-id';

      vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue(new Error('Network connection timeout'))
      );
      vi.spyOn(console, 'error').mockImplementation(() => {});

      const data: AppointmentData = {
        name: 'Іван',
        phone: '+380971234567',
        service: 'Огляд',
        date: '2026-09-30',
        timeSlot: 'Ранок',
        locale: 'ua',
      };

      const result = await sendTelegramNotification(data);

      expect(result.success).toBe(false);
      expect(result.mode).toBe('real');
      expect(result.message).toContain('Network connection timeout');
    });
  });

  describe('API Route /api/appointment POST handler', () => {
    it('should return 200 and success response for valid request', async () => {
      vi.spyOn(console, 'log').mockImplementation(() => {});

      const request = new Request('http://localhost/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Ярослав',
          phone: '+380951234567',
          service: 'Хірургія та імплантація',
          date: '2026-09-24',
          timeSlot: 'День (13:00–16:00)',
          comment: 'Потрібна консультація хірурга',
          locale: 'ua',
        }),
      });

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.mode).toBe('mock');
    });

    it('should return 400 with details for invalid validation payload', async () => {
      const request = new Request('http://localhost/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'X',
          phone: 'invalid',
        }),
      });

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(400);
      expect(json.success).toBe(false);
      expect(json.error).toBe('Validation failed');
      expect(json.details).toBeDefined();
    });

    it('should return 400 for malformed JSON body', async () => {
      const request = new Request('http://localhost/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid-json{{{',
      });

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(400);
      expect(json.success).toBe(false);
      expect(json.error).toContain('Invalid JSON payload');
    });

    it('should return 500 when notification dispatch fails', async () => {
      process.env.TELEGRAM_BOT_TOKEN = 'mock-token';
      process.env.TELEGRAM_CHAT_ID = 'mock-chat-id';

      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: false,
          status: 500,
          text: async () => 'Telegram internal error',
        })
      );
      vi.spyOn(console, 'error').mockImplementation(() => {});

      const request = new Request('http://localhost/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Наталія',
          phone: '+380971234567',
          service: 'Огляд',
          date: '2026-09-25',
          timeSlot: 'Ранок',
          locale: 'ua',
        }),
      });

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(500);
      expect(json.success).toBe(false);
      expect(json.error).toContain('Telegram API error (500)');
    });
  });
});
