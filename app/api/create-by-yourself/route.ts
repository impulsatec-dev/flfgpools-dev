import { NextResponse } from 'next/server';
import {
  createByYourselfLeadSchema,
  sendCreateByYourselfLead,
} from '@/lib/create-by-yourself-email';
import { getRequestIp, verifyRecaptcha } from '@/lib/recaptcha';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = createByYourselfLeadSchema.safeParse(payload);
    if (!parsed.success) {
      const fields = [...new Set(parsed.error.issues.map((issue) => String(issue.path[0])))].filter(Boolean);
      console.error('[api/create-by-yourself] validation failed', fields);
      return NextResponse.json({ ok: false, error: 'Validation failed', fields }, { status: 400 });
    }
    const lead = parsed.data;

    const recaptcha = await verifyRecaptcha(payload.recaptchaToken, getRequestIp(request));
    if (!recaptcha.success) {
      return NextResponse.json(
        { ok: false, error: 'reCAPTCHA verification failed', recaptchaErrors: recaptcha.errorCodes, fields: ['recaptchaToken'] },
        { status: 400 }
      );
    }

    const { delivered, mailto } = await sendCreateByYourselfLead(lead);

    // The mailto: fallback is only useful when delivery is not configured.
    return NextResponse.json({ ok: true, delivered, mailto: delivered ? undefined : mailto });
  } catch (error) {
    console.error('[api/create-by-yourself] lead not sent', error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Invalid request',
      },
      { status: 400 }
    );
  }
}
