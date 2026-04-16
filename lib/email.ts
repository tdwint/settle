// Settle email notifications via Resend (resend.com)
// Free tier: 3,000 emails/month
//
// IMPORTANT: The FROM_ADDRESS must use a domain you've verified in Resend.
// Until you verify gigpay.co, use Resend's free test domain: onboarding@resend.dev
// To verify your domain: resend.com → Domains → Add Domain → follow DNS instructions
//
// Set RESEND_FROM_ADDRESS in your Vercel env vars to override the default.

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS ?? 'onboarding@resend.dev'

interface SendEmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  if (!RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY not set — skipping email to:', to)
    return { error: 'RESEND_API_KEY not configured' }
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_ADDRESS, to, subject, html }),
  })

  const data = await res.json()

  if (!res.ok) {
    console.error('[email] Resend error:', JSON.stringify(data))
    return { error: data }
  }

  console.log('[email] Sent successfully to:', to, '— id:', data.id)
  return { id: data.id }
}

// ─── Email Templates ──────────────────────────────────────────

export function invoicePaidEmailHtml({
  freelancerName,
  clientName,
  invoiceNumber,
  amount,
  currency,
  invoiceUrl,
  items,
}: {
  freelancerName: string
  clientName: string
  invoiceNumber: string
  amount: string
  currency: string
  invoiceUrl: string
  items?: { description: string; amount: number }[]
}) {
  const itemRows = items && items.length > 0
    ? items.map(item => `
        <tr>
          <td style="padding:8px 0; font-size:14px; color:#475569; border-bottom:1px solid #f1f5f9;">${item.description}</td>
          <td style="padding:8px 0; font-size:14px; color:#1e293b; font-weight:600; text-align:right; border-bottom:1px solid #f1f5f9;">$${item.amount.toFixed(2)}</td>
        </tr>`).join('')
    : ''

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
</head>
<body style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; background:#f8fafc; margin:0; padding:0;">
  <div style="max-width:520px; margin:40px auto; background:#fff; border-radius:16px; border:1px solid #e2e8f0; overflow:hidden;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#080720 0%,#1e1b6e 100%); padding:28px 32px;">
      <div style="display:flex; align-items:center; gap:10px;">
        <div style="width:32px; height:32px; background:linear-gradient(135deg,#f59e0b,#d97706); border-radius:8px; display:flex; align-items:center; justify-content:center;">
          <span style="color:white; font-weight:700; font-size:16px;">S</span>
        </div>
        <span style="color:white; font-size:18px; font-weight:700;">Settle</span>
      </div>
    </div>

    <!-- Body -->
    <div style="padding:36px 32px;">
      <div style="text-align:center; margin-bottom:28px;">
        <div style="width:56px; height:56px; background:#f0fdf4; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:28px; margin-bottom:16px;">💸</div>
        <h1 style="font-size:22px; font-weight:800; color:#0f172a; margin:0 0 6px;">You just got paid!</h1>
        <p style="font-size:15px; color:#64748b; margin:0;">${clientName} paid invoice ${invoiceNumber}</p>
      </div>

      <!-- Amount box -->
      <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:20px; text-align:center; margin-bottom:24px;">
        <div style="font-size:36px; font-weight:800; color:#15803d;">${amount} ${currency}</div>
        <div style="font-size:13px; color:#16a34a; margin-top:4px;">paid by ${clientName}</div>
      </div>

      <!-- Line items -->
      ${itemRows ? `
      <table style="width:100%; border-collapse:collapse; margin-bottom:24px;">
        <thead>
          <tr>
            <th style="text-align:left; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#94a3b8; padding-bottom:8px;">Description</th>
            <th style="text-align:right; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#94a3b8; padding-bottom:8px;">Amount</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>` : ''}

      <p style="font-size:14px; color:#64748b; line-height:1.6;">
        Funds will appear in your account according to your Stripe payout schedule (typically 2 business days).
      </p>

      <div style="text-align:center; margin-top:28px;">
        <a href="${invoiceUrl}" style="display:inline-block; background:linear-gradient(135deg,#f59e0b,#d97706); color:white; font-weight:700; font-size:15px; padding:13px 28px; border-radius:12px; text-decoration:none;">
          View invoice →
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:20px 32px; background:#f8fafc; border-top:1px solid #e2e8f0; text-align:center;">
      <p style="font-size:12px; color:#94a3b8; margin:0;">
        Settle · Built for freelancers ·
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/settings" style="color:#94a3b8;">Manage notifications</a>
      </p>
    </div>
  </div>
</body>
</html>`.trim()
}
