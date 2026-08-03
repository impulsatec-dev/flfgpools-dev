import { NextResponse } from 'next/server';
import {
  createByYourselfLeadSchema,
  sendCreateByYourselfLead,
} from '@/lib/create-by-yourself-email';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const lead = createByYourselfLeadSchema.parse(payload);
    const result = await sendCreateByYourselfLead(lead);

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Invalid request',
      },
      { status: 400 }
    );
  }
}
