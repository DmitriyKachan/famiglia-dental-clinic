import { z } from 'zod';

export const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;

export const appointmentSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Invalid phone number format. Provide 10-20 digits in valid format'),
  service: z.string().trim().min(2, 'Please select a service'),
  date: z.string().trim().min(4, 'Please select a valid date'),
  timeSlot: z.string().trim().min(2, 'Please select a preferred time slot'),
  comment: z.string().trim().optional(),
  locale: z.enum(['ua', 'en']).default('ua'),
});

export type AppointmentData = z.infer<typeof appointmentSchema>;

export interface TelegramNotificationResult {
  success: boolean;
  mode: 'real' | 'mock';
  message?: string;
}

/**
 * Escapes characters that have special meaning in Telegram HTML parse mode.
 */
export function escapeTelegramHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Formats appointment data into structured Telegram HTML message with emojis.
 */
export function formatTelegramMessage(data: AppointmentData): string {
  const commentText = data.comment && data.comment.trim().length > 0
    ? escapeTelegramHtml(data.comment.trim())
    : '—';

  return [
    '🦷 <b>Новий запис на прийом: Famiglia</b>',
    '',
    `👤 <b>Ім'я:</b> ${escapeTelegramHtml(data.name)}`,
    `📞 <b>Телефон:</b> ${escapeTelegramHtml(data.phone)}`,
    `🩺 <b>Послуга:</b> ${escapeTelegramHtml(data.service)}`,
    `📅 <b>Дата:</b> ${escapeTelegramHtml(data.date)}`,
    `⏰ <b>Час:</b> ${escapeTelegramHtml(data.timeSlot)}`,
    `💬 <b>Коментар:</b> ${commentText}`,
    `🌐 <b>Мова:</b> ${escapeTelegramHtml(data.locale.toUpperCase())}`,
  ].join('\n');
}

/**
 * Sends notification to Telegram channel/chat if credentials exist in process.env,
 * otherwise falls back to logging the message in mock mode.
 */
export async function sendTelegramNotification(
  data: AppointmentData
): Promise<TelegramNotificationResult> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const message = formatTelegramMessage(data);

  if (!botToken || !chatId) {
    console.log('[Telegram Notification (Mock Mode)]:\n' + message);
    return {
      success: true,
      mode: 'mock',
      message: 'Telegram credentials not configured; logged to console in mock mode',
    };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Telegram API request failed with status ${response.status}:`, errorText);
      return {
        success: false,
        mode: 'real',
        message: `Telegram API error (${response.status}): ${errorText}`,
      };
    }

    return {
      success: true,
      mode: 'real',
      message: 'Notification sent successfully to Telegram',
    };
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('Failed to send Telegram notification:', errorMsg);
    return {
      success: false,
      mode: 'real',
      message: `Failed to connect to Telegram API: ${errorMsg}`,
    };
  }
}
