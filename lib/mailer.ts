import { SOCIAL_LINKS } from '@/config/site';

export type LeadEmail = {
  to: string;
  subject: string;
  body: string;
  html: string;
  replyTo?: string;
  mailto: string;
};

/** `[label, value]`, or `[label, value, href]` to turn the value into a link. */
export type LeadRow = [string, string] | [string, string, string];

export type LeadSection = { heading: string; rows: LeadRow[] } | { heading: string; text: string };

export type LeadContent = {
  /** Small uppercase label above the headline, e.g. "Contact form". */
  kicker: string;
  /** The customer name: what the sales team scans for first. */
  headline: string;
  subhead?: string;
  phone?: string;
  email?: string;
  sections: LeadSection[];
};

export function leadsRecipient() {
  return process.env.LEADS_TO_EMAIL || SOCIAL_LINKS.email;
}

function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

const LOGO_CID = 'flfg-logo';
const LOGO_FILE = 'public/header/logo-alta.png';

/**
 * The logo travels with the message instead of being hotlinked, so it renders
 * before the site is redeployed and survives clients that block remote images.
 */
async function logoAttachment() {
  try {
    const { readFile } = await import('node:fs/promises');
    const { join } = await import('node:path');
    const content = await readFile(join(process.cwd(), LOGO_FILE));

    return [
      {
        filename: 'florida-fiberglass-pools.png',
        content,
        cid: LOGO_CID,
        contentDisposition: 'inline' as const,
      },
    ];
  } catch {
    return [];
  }
}

/**
 * Warm sand surface with deep navy ink: the brand palette, and it keeps the
 * dark logo legible without inverting it.
 */
const ink = {
  page: '#EFEAE1',
  card: '#FFFDF9',
  footer: '#F7F2E8',
  hairline: '#E4DED2',
  rule: '#EDE7DC',
  primary: '#082F49',
  muted: '#5A7285',
  faint: '#7D8E9C',
  accent: '#0EA5E9',
  link: '#0B6FA4',
  quoteBg: '#F2F7FB',
  quoteBorder: '#DFEAF2',
  outline: '#BCCDD9',
};

const fontStack =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '');
  return `tel:${digits.startsWith('+') ? digits : `+1${digits.replace(/^1/, '')}`}`;
}

function renderRow([label, value, href]: LeadRow) {
  const safe = escapeHtml(value).replace(/\n/g, '<br />');
  const target = href || (value.includes('@') && !value.includes(' ') ? `mailto:${value}` : '');
  const content = target
    ? `<a href="${escapeHtml(target)}" style="color:${ink.link};text-decoration:none;border-bottom:1px solid ${ink.quoteBorder}">${safe}</a>`
    : safe;

  return `<tr>
<td width="36%" style="padding:7px 16px 7px 0;font-family:${fontStack};font-size:12px;font-weight:500;color:${ink.faint};vertical-align:top">${escapeHtml(label)}</td>
<td style="padding:7px 0;font-family:${fontStack};font-size:15px;font-weight:600;line-height:1.45;color:${ink.primary};vertical-align:top">${content}</td>
</tr>`;
}

function renderSection(section: LeadSection) {
  const heading = `<p style="margin:30px 0 0;font-family:${fontStack};font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${ink.muted}">${escapeHtml(section.heading)}</p>
<div style="height:1px;line-height:1px;font-size:0;background:${ink.rule};margin:9px 0 3px">&nbsp;</div>`;

  if ('text' in section) {
    return `${heading}<p style="margin:14px 0 0;padding:15px 17px;background:${ink.quoteBg};border:1px solid ${ink.quoteBorder};border-radius:12px;font-family:${fontStack};font-size:14px;line-height:1.65;color:#274A5F">${escapeHtml(section.text).replace(/\n/g, '<br />')}</p>`;
  }

  return `${heading}<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">${section.rows.map(renderRow).join('')}</table>`;
}

function renderActions(content: LeadContent) {
  const buttons: string[] = [];

  if (content.phone) {
    buttons.push(`<td style="border-radius:10px;background:${ink.primary}"><a href="${escapeHtml(telHref(content.phone))}" style="display:inline-block;padding:12px 22px;font-family:${fontStack};font-size:14px;font-weight:600;color:${ink.card};text-decoration:none">Call ${escapeHtml(content.phone)}</a></td>`);
  }

  if (content.email) {
    buttons.push(`<td style="border-radius:10px;border:1px solid ${ink.outline}"><a href="mailto:${escapeHtml(content.email)}" style="display:inline-block;padding:11px 20px;font-family:${fontStack};font-size:14px;font-weight:600;color:${ink.primary};text-decoration:none">Reply by email</a></td>`);
  }

  if (!buttons.length) return '';

  return `<tr><td style="padding:24px 30px 0">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>${buttons.join(`<td style="width:10px;font-size:0">&nbsp;</td>`)}</tr></table>
</td></tr>`;
}

export function renderLeadHtml(content: LeadContent) {
  const preheader = [content.headline, content.subhead, content.phone].filter(Boolean).join(' · ');

  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light only" />
<title>${escapeHtml(content.kicker)}: ${escapeHtml(content.headline)}</title>
</head>
<body style="margin:0;padding:0;background:${ink.page};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:${ink.page}">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${ink.page}">
<tr><td align="center" style="padding:28px 16px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${ink.card};border:1px solid ${ink.hairline};border-radius:18px;overflow:hidden">

<tr><td style="padding:26px 30px 20px">
<img src="cid:${LOGO_CID}" width="196" height="34" alt="Florida Fiberglass Pools" style="display:block;width:196px;height:34px;border:0;outline:none;font-family:${fontStack};font-size:16px;font-weight:700;color:${ink.primary}" />
</td></tr>
<tr><td style="padding:0 30px"><div style="height:1px;line-height:1px;font-size:0;background:${ink.hairline}">&nbsp;</div></td></tr>

<tr><td style="padding:28px 30px 0">
<p style="margin:0 0 11px;font-family:${fontStack};font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${ink.accent}">${escapeHtml(content.kicker)}</p>
<h1 style="margin:0;font-family:${fontStack};font-size:27px;line-height:1.18;font-weight:700;letter-spacing:-.01em;color:${ink.primary}">${escapeHtml(content.headline)}</h1>
${content.subhead ? `<p style="margin:9px 0 0;font-family:${fontStack};font-size:14px;line-height:1.5;color:${ink.muted}">${escapeHtml(content.subhead)}</p>` : ''}
</td></tr>
${renderActions(content)}

<tr><td style="padding:4px 30px 32px">${content.sections.map(renderSection).join('')}</td></tr>

<tr><td style="padding:20px 30px;background:${ink.footer};border-top:1px solid ${ink.hairline}">
<p style="margin:0;font-family:${fontStack};font-size:11px;line-height:1.65;color:${ink.faint}">Sent automatically by the Florida Fiberglass Pools website. Replying to this message answers ${escapeHtml(content.headline)} directly.</p>
</td></tr>

</table>
</td></tr></table>
</body></html>`;
}

/** Plain-text twin of the HTML, for clients that ask for text and for the mailto: fallback. */
export function renderLeadText(content: LeadContent) {
  const lines = [content.kicker.toUpperCase(), content.headline];
  if (content.subhead) lines.push(content.subhead);

  for (const section of content.sections) {
    lines.push('', section.heading.toUpperCase());
    if ('text' in section) {
      lines.push(section.text);
    } else {
      lines.push(...section.rows.map(([label, value]) => `${label}: ${value}`));
    }
  }

  return lines.join('\n');
}

export function buildMailto(to: string, subject: string, body: string) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Sends the email through SMTP when credentials are present, otherwise falls
 * back to an optional webhook. Returns `delivered: false` when neither is
 * configured so the UI can offer a mailto: link instead of failing silently.
 */
export async function sendLeadEmail(email: LeadEmail, webhookPayload?: unknown) {
  if (smtpConfigured()) {
    const nodemailer = await import('nodemailer');
    const port = Number(process.env.SMTP_PORT) || 587;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASS as string,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `Florida Fiberglass Pools <${process.env.SMTP_USER}>`,
      to: email.to,
      cc: process.env.LEADS_CC_EMAIL || undefined,
      subject: email.subject,
      text: email.body,
      html: email.html,
      replyTo: email.replyTo,
      attachments: await logoAttachment(),
    });

    return { delivered: true };
  }

  if (process.env.LEADS_WEBHOOK_URL) {
    const response = await fetch(process.env.LEADS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookPayload ?? { email }),
    });

    if (!response.ok) {
      throw new Error('Lead webhook failed');
    }

    return { delivered: true };
  }

  return { delivered: false };
}
