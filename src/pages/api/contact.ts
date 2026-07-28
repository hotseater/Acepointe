import type { APIRoute } from 'astro';

export const prerender = false;

interface Lead {
  name: string;
  email: string;
  company: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, string>;
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      data = await request.json();
    } else {
      data = Object.fromEntries(await request.formData()) as Record<string, string>;
    }
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }

  // --- Bot screening (silently accept bots so they don't learn the rules) ---
  if ((data.website || '').trim() !== '') return json({ ok: true });
  const renderedAt = Number(data._ts);
  if (renderedAt && Date.now() - renderedAt < 2500) return json({ ok: true });

  // --- Validation ---
  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const company = (data.company || '').trim();
  const message = (data.message || '').trim();

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Please enter your name.';
  if (!email) errors.email = 'Please enter your work email.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  if (!message) errors.message = 'Tell us a little about what you need.';
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  const lead: Lead = { name, email, company, message };

  // --- Email the lead (Resend) ---
  const sent = await sendLeadEmail(lead);
  if (sent === null) {
    // No email key configured yet — don't lose the lead in dev; log it loudly.
    console.warn('[contact] RESEND_API_KEY not set — logging lead only.');
    console.info('[contact] lead:', lead);
    return json({ ok: true });
  }
  if (!sent) {
    return json(
      { ok: false, error: 'Something went wrong sending your message. Please email info@acepointe.com.' },
      502,
    );
  }
  return json({ ok: true });
};

/** Send the submission as an email via Resend. Returns null if not configured. */
async function sendLeadEmail(lead: Lead): Promise<boolean | null> {
  const key = import.meta.env.RESEND_API_KEY;
  if (!key) return null;

  const from = import.meta.env.CONTACT_FROM || 'AcePointe Website <noreply@acepointe.com>';
  const to = import.meta.env.CONTACT_TO || 'admin@nooktek.com';

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        reply_to: lead.email,
        subject: `New AcePointe inquiry — ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
        text:
          `Name: ${lead.name}\n` +
          `Email: ${lead.email}\n` +
          `Company: ${lead.company || '—'}\n\n` +
          `${lead.message}\n`,
        html:
          `<h2 style="margin:0 0 12px">New AcePointe inquiry</h2>` +
          `<p style="margin:0 0 12px">` +
          `<strong>Name:</strong> ${esc(lead.name)}<br>` +
          `<strong>Email:</strong> <a href="mailto:${esc(lead.email)}">${esc(lead.email)}</a><br>` +
          `<strong>Company:</strong> ${esc(lead.company) || '—'}` +
          `</p>` +
          `<p style="white-space:pre-wrap;margin:0">${esc(lead.message)}</p>`,
      }),
    });
    if (!res.ok) console.error('[contact] Resend failed:', res.status, await safeText(res));
    return res.ok;
  } catch (err) {
    console.error('[contact] Resend error:', err);
    return false;
  }
}

async function safeText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return '';
  }
}
