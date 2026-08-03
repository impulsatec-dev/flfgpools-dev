import { z } from 'zod';
import { SOCIAL_LINKS } from '@/config/site';

export const createByYourselfLeadSchema = z.object({
  poolType: z.enum(['pool', 'spa', 'tanning-ledge']),
  size: z.enum(['upTo16', '16to22', '22plus', 'spa']),
  model: z.string().min(1),
  color: z.string().min(1),
  extras: z.array(z.string()).default([]),
  city: z.string().min(2),
  zip: z.string().regex(/^\d{5}$/),
  backyardAccess: z.enum(['wide-open', 'standard-gate', 'tight-access', 'crane-needed', 'not-sure']),
  timeline: z.enum(['asap', '1-3-months', '3-6-months', 'planning']),
  role: z.enum(['homeowner', 'contractor', 'realtor', 'investor']),
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  notes: z.string().optional().default(''),
});

export type CreateByYourselfLead = z.infer<typeof createByYourselfLeadSchema>;

const labels: Record<string, string> = {
  pool: 'Pool',
  spa: 'Spa',
  'tanning-ledge': 'Tanning ledge',
  upTo16: 'Up to 16 ft',
  '16to22': '16 ft – 22 ft',
  '22plus': '22 ft or more',
  'wide-open': 'Wide open access',
  'standard-gate': 'Standard gate',
  'tight-access': 'Tight access',
  'crane-needed': 'Crane likely needed',
  'not-sure': 'Not sure',
  asap: 'ASAP',
  '1-3-months': '1–3 months',
  '3-6-months': '3–6 months',
  planning: 'Planning stage',
  homeowner: 'Homeowner',
  contractor: 'Contractor',
  realtor: 'Realtor',
  investor: 'Investor',
  'integrated-spa': 'Integrated spa',
  'led-lighting': 'LED lighting',
  'heater': 'Heater',
  'deck-patio': 'Deck / patio area',
  'salt-system': 'Salt system',
};

export function readable(value: string) {
  return labels[value] || value;
}

export function buildCreateByYourselfEmail(lead: CreateByYourselfLead) {
  const subject = `Create by Yourself quote request — ${lead.name}`;
  const lines = [
    'New Create by Yourself lead',
    '',
    'Pool configuration',
    `Type: ${readable(lead.poolType)}`,
    `Size: ${readable(lead.size)}`,
    `Model: ${lead.model}`,
    `Color: ${lead.color}`,
    `Extras: ${lead.extras.length ? lead.extras.join(', ') : 'None selected'}`,
    '',
    'Site details',
    `City: ${lead.city}`,
    `ZIP: ${lead.zip}`,
    `Backyard access: ${readable(lead.backyardAccess)}`,
    `Desired timeline: ${readable(lead.timeline)}`,
    `Customer type: ${readable(lead.role)}`,
    '',
    'Contact',
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    '',
    'Notes',
    lead.notes || 'No notes provided',
  ];

  const body = lines.join('\n');
  const to = process.env.LEADS_TO_EMAIL || SOCIAL_LINKS.email_principal;
  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return {
    to,
    subject,
    body,
    mailto,
  };
}

export async function sendCreateByYourselfLead(lead: CreateByYourselfLead) {
  const email = buildCreateByYourselfEmail(lead);

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const nodemailer = await import('nodemailer');

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: (Number(process.env.SMTP_PORT) || 587) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email.to,
      subject: email.subject,
      text: email.body,
      replyTo: lead.email,
    });

    return { delivered: true, ...email };
  }

  if (process.env.LEADS_WEBHOOK_URL) {
    const response = await fetch(process.env.LEADS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lead, email }),
    });

    if (!response.ok) {
      throw new Error('Lead webhook failed');
    }

    return { delivered: true, ...email };
  }

  return { delivered: false, ...email };
}
