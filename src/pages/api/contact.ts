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
  // Honeypot: a hidden field real users never see or fill.
  if ((data.website || '').trim() !== '') return json({ ok: true });
  // Time trap: a form completed implausibly fast is automated.
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

  // --- Deliver to configured channels (HubSpot CRM + email notification) ---
  const [hubspot, notify] = await Promise.all([submitToHubSpot(lead), notifyByEmail(lead)]);
  const outcomes = [hubspot, notify].filter((v): v is boolean => v !== null);

  if (outcomes.length === 0) {
    // No channel configured yet — don't lose the lead in dev; log it loudly.
    console.warn('[contact] No delivery channel configured (HUBSPOT_* / RESEND_API_KEY).');
    console.info('[contact] lead:', lead);
    return json({ ok: true });
  }
  if (!outcomes.some((ok) => ok)) {
    return json(
      { ok: false, error: 'Something went wrong on our end. Please email info@acepointe.com.' },
      502,
    );
  }
  return json({ ok: true });
};

/** HubSpot Forms API — no token needed, integrates with native form workflows. */
async function submitToHubSpot(lead: Lead): Promise<boolean | null> {
  const portalId = import.meta.env.HUBSPOT_PORTAL_ID;
  const formGuid = import.meta.env.HUBSPOT_FORM_GUID;
  if (!portalId || !formGuid) return null;

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          fields: [
            // Field names must match the HubSpot form's internal field names.
            { name: 'firstname', value: lead.name },
            { name: 'email', value: lead.email },
            { name: 'company', value: lead.company },
            { name: 'message', value: lead.message },
          ],
          context: { pageName: 'AcePointe — Contact' },
        }),
      },
    );
    if (!res.ok) console.error('[contact] HubSpot submit failed:', res.status, await safeText(res));
    return res.ok;
  } catch (err) {
    console.error('[contact] HubSpot error:', err);
    return false;
  }
}

/** Resend notification to the inbox as a backup/alert channel. */
async function notifyByEmail(lead: Lead): Promise<boolean | null> {
  const key = import.meta.env.RESEND_API_KEY;
  if (!key) return null;

  const from = import.meta.env.CONTACT_FROM || 'AcePointe Site <noreply@acepointe.com>';
  const to = import.meta.env.CONTACT_TO || 'info@acepointe.com';
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        reply_to: lead.email,
        subject: `New inquiry from ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
        text: `Name: ${lead.name}\nEmail: ${lead.email}\nCompany: ${lead.company || '—'}\n\n${lead.message}`,
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
