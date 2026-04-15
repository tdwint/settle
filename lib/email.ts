// Settle email notifications via Resend (resend.com)
// Free tier: 3,000 emails/month — plenty for most freelancers

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_ADDRESS = 'Settle <notifications@settle.gigpay.co>'

interface SendEmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — skipping email')
    return
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_ADDRESS, to, subject, html }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Resend error:', err)
  }
}

// ─── Email Templates ─────────────────────────────────────────

export function invoicePaidEmailHtml({
  freelancerName,
  clientName,
  invoiceNumber,
  amount,
  currency,
  invoiceUrl,
}: {
  freelancerName: string
  clientName: string
  invoiceNumber: string
  amount: string
  currency: string
  invoiceUrl: string
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #fdfbf7; margin: 0; padding: 0; }
    .container { max-width: 520px; margin: 40px auto; background: #fff; border-radius: 16px; border: 1px solid #e8d3a8; overflow: hidden; }
    .header { background: #f04b35; padding: 32px; text-align: center; }
    .header-logo { font-size: 28px; font-weight: 800; color: white; letter-spacing: -0.5px; }
    .body { padding: 36px 40px; }
    .emoji { font-size: 48px; text-align: center; display: block; margin-bottom: 20px; }
    h1 { font-size: 22px; font-weight: 800; color: #111; margin: 0 0 8px; }
    p { font-size: 15px; color: #555; line-height: 1.6; margin: 0 0 16px; }
    .amount-box { background: #f0fdfb; border: 1px solid #99f5e8; border-radius: 12px; padding: 20px 24px; margin: 24px 0; text-align: center; }
    .amount { font-size: 36px; font-weight: 800; color: #0d9488; }
    .amount-label { font-size: 13px; color: #0f766e; margin-top: 4px; }
    .btn { display: inline-block; background: #f04b35; color: white !important; font-weight: 700; font-size: 15px; padding: 13px 28px; border-radius: 12px; text-decoration: none; margin-top: 8px; }
    .footer { padding: 20px 40px; background: #fdfbf7; border-top: 1px solid #f3e8d0; text-align: center; }
    .footer p { font-size: 12px; color: #aaa; margin: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-logo">Settle</div>
    </div>
    <div class="body">
      <span class="emoji">💸</span>
      <h1>You just got paid, ${freelancerName.split(' ')[0]}!</h1>
      <p>${clientName} paid your invoice <strong>${invoiceNumber}</strong>.</p>
      <div class="amount-box">
        <div class="amount">${amount} ${currency}</div>
        <div class="amount-label">paid by ${clientName}</div>
      </div>
      <p>The funds will appear in your account according to your Stripe payout schedule (usually 2 business days).</p>
      <a href="${invoiceUrl}" class="btn">View invoice →</a>
    </div>
    <div class="footer">
      <p>Settle · Built for freelancers · <a href="${process.env.NEXT_PUBLIC_APP_URL}/settings" style="color:#aaa;">Manage notifications</a></p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

export function invoiceSentConfirmationHtml({
  freelancerName,
  clientName,
  invoiceNumber,
  amount,
  currency,
  paymentUrl,
}: {
  freelancerName: string
  clientName: string
  invoiceNumber: string
  amount: string
  currency: string
  paymentUrl: string
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #fdfbf7; margin: 0; padding: 0; }
    .container { max-width: 520px; margin: 40px auto; background: #fff; border-radius: 16px; border: 1px solid #e8d3a8; overflow: hidden; }
    .header { background: #f04b35; padding: 32px; text-align: center; }
    .header-logo { font-size: 28px; font-weight: 800; color: white; }
    .body { padding: 36px 40px; }
    h1 { font-size: 22px; font-weight: 800; color: #111; margin: 0 0 8px; }
    p { font-size: 15px; color: #555; line-height: 1.6; margin: 0 0 16px; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3e8d0; font-size: 14px; }
    .detail-label { color: #999; }
    .detail-value { font-weight: 600; color: #333; }
    .btn { display: inline-block; background: #f04b35; color: white !important; font-weight: 700; font-size: 15px; padding: 13px 28px; border-radius: 12px; text-decoration: none; margin-top: 20px; }
    .footer { padding: 20px 40px; background: #fdfbf7; border-top: 1px solid #f3e8d0; text-align: center; }
    .footer p { font-size: 12px; color: #aaa; margin: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-logo">Settle</div>
    </div>
    <div class="body">
      <h1>Invoice sent to ${clientName}</h1>
      <p>Your invoice is on its way. Here's a summary:</p>
      <div>
        <div class="detail-row"><span class="detail-label">Invoice</span><span class="detail-value">${invoiceNumber}</span></div>
        <div class="detail-row"><span class="detail-label">Client</span><span class="detail-value">${clientName}</span></div>
        <div class="detail-row"><span class="detail-label">Amount</span><span class="detail-value">${amount} ${currency}</span></div>
      </div>
      <p style="margin-top:20px; font-size:13px; color:#999;">Share this payment link with your client if they need it:</p>
      <p style="font-size:13px; font-family:monospace; background:#f5f5f5; padding:10px; border-radius:8px; word-break:break-all;">${paymentUrl}</p>
      <a href="${paymentUrl}" class="btn">View payment page →</a>
    </div>
    <div class="footer">
      <p>Settle · Built for freelancers</p>
    </div>
  </div>
</body>
</html>
  `.trim()
}
