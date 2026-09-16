import { NextResponse } from 'next/server';
import { appointmentSchema, sendTelegramNotification } from '@/lib/telegram';

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON payload in request body',
        },
        { status: 400 }
      );
    }

    const validationResult = appointmentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const notificationResult = await sendTelegramNotification(validationResult.data);

    if (!notificationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: notificationResult.message || 'Failed to dispatch Telegram notification',
          mode: notificationResult.mode,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        mode: notificationResult.mode,
        message: notificationResult.message,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    console.error('Unhandled error in /api/appointment:', errorMessage);
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
