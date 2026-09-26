import { NextResponse } from 'next/server';
import { contactLeadSchema, sendContactLead } from '@/lib/contact-email';
import { getRequestIp, verifyRecaptcha } from '@/lib/recaptcha';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = contactLeadSchema.safeParse(payload);
    if (!parsed.success) {
      const fields = [...new Set(parsed.error.issues.map((issue) => String(issue.path[0])))].filter(Boolean);
      console.error('[api/contact] validation failed', fields);
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

    const { delivered, mailto } = await sendContactLead(lead);

    // The mailto: fallback is only useful when delivery is not configured.
    return NextResponse.json({ ok: true, delivered, mailto: delivered ? undefined : mailto });
  } catch (error) {
    console.error('[api/contact] lead not sent', error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Invalid request',
      },
      { status: 400 }
    );
  }
}
