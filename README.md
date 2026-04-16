# How to Deploy Settle — Step by Step

No technical knowledge needed. Follow these steps in order and your app will be live.

---

## Accounts you'll need (all free to start)

- [ ] GitHub — github.com
- [ ] Supabase — supabase.com (your database)
- [ ] Stripe — stripe.com (payments)
- [ ] Vercel — vercel.com (hosting)

---

## Step 1: Put your code on GitHub

1. Go to github.com and create a new repository called "settle"
2. Download this zip file and unzip it on your computer
3. Open Terminal (Mac) or Command Prompt (Windows) in the settle folder
4. Run these commands one at a time:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/settle.git
   git push -u origin main
   ```

---

## Step 2: Set up your database (Supabase)

1. Go to supabase.com and click "New project"
2. Give it a name (e.g. "settle"), set a strong password, choose a region close to you
3. Wait ~2 minutes for it to set up
4. Click "SQL Editor" in the left sidebar
5. Click "New query"
6. Open the file `supabase/migrations/001_initial.sql` from your project folder
7. Copy everything in that file and paste it into the SQL editor
8. Click "Run" — you should see "Success"

**Copy these values** (Settings → API in Supabase):
- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- anon / public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- service_role key → `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 3: Set up payments (Stripe)

1. Go to stripe.com and create an account
2. Go to Developers → API keys
3. Copy your Secret key and Publishable key

**Create your pricing plans:**
1. Make sure you have Node.js installed (nodejs.org)
2. In your project folder, create a file called `.env.local` and add:
   ```
   STRIPE_SECRET_KEY=your-secret-key-here
   ```
3. Run: `npx ts-node stripe/setup.ts`
4. It will print two price IDs — copy them, you'll need them in Step 4

**Set up webhooks (so Stripe tells your app when someone pays):**

Stripe now uses **Workbench** instead of the old Developers Dashboard. Here's where to find it:

1. In Stripe, click **Workbench** in the top navigation bar (or go to dashboard.stripe.com/workbench)
2. Click the **Webhooks** tab
3. Click **Add endpoint**
4. In the **Endpoint URL** field enter: `https://YOUR-APP-URL.vercel.app/api/stripe/webhook`
   (you'll get your real URL after Step 4 — skip this for now and come back)
5. Under **Select events**, add these three:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
6. Click **Add endpoint**
7. Click into the endpoint you just created, find **Signing secret**, click **Reveal** and copy it → this is your `STRIPE_WEBHOOK_SECRET`

> **Can't find Workbench?** Some accounts still show the old layout. Try: Dashboard → Developers (top right) → Webhooks → Add endpoint. If you see a banner saying "Try Workbench", you can use either.

---

## Step 4: Deploy to Vercel

1. Go to vercel.com and click "Add New Project"
2. Import your GitHub repository
3. Click "Environment Variables" and add ALL of these:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | From Supabase Step 2 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From Supabase Step 2 |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase Step 2 |
| `STRIPE_SECRET_KEY` | From Stripe Step 3 |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | From Stripe Step 3 |
| `STRIPE_WEBHOOK_SECRET` | From Stripe Step 3 |
| `STRIPE_PRO_MONTHLY_PRICE_ID` | Printed by setup.ts |
| `STRIPE_PRO_ANNUAL_PRICE_ID` | Printed by setup.ts |
| `NEXT_PUBLIC_APP_URL` | Your Vercel URL, e.g. https://settle.vercel.app |

4. Click "Deploy" — takes about 2 minutes

**After deploying:** go back to Stripe and add your real Vercel URL to the webhook endpoint.

---

## Step 5: Test everything works

Go through this checklist after deploying:

- [ ] Visit your app URL — landing page loads
- [ ] Click "Get started free" — signup works
- [ ] After signup, you land on the dashboard
- [ ] Click "New invoice" — fill it in and save as draft
- [ ] Click "Send to client" — status changes to Sent
- [ ] Copy the payment link and open it in an incognito window — payment page loads
- [ ] Pay with Stripe test card: `4242 4242 4242 4242`, any future date, any CVC
- [ ] Invoice status should change to Paid within a few seconds
- [ ] Go to Settings → Billing → click Upgrade — Stripe checkout opens
- [ ] Complete checkout with test card — you should land back on Settings with "You're now on Pro!"

---

## Connect your domain (gigpay.co)

1. In Vercel: go to your project → Settings → Domains
2. Add `gigpay.co` and follow the DNS instructions
3. Once connected, update `NEXT_PUBLIC_APP_URL` in Vercel environment variables to `https://gigpay.co`
4. Update your Stripe webhook URL to `https://gigpay.co/api/stripe/webhook`
5. Redeploy (Vercel → Deployments → Redeploy)

---

## Making changes later

Describe what you want changed in plain English and paste it to Claude.
Examples:
- "Add a 'send reminder' button on overdue invoices"
- "Let users add a custom message when sending invoices"
- "Add a clients page where I can manage client details"
- "Show a chart of monthly revenue on the dashboard"

No code knowledge needed.

---

## If something breaks

1. Check Vercel → your project → Functions → Logs for error messages
2. Check Supabase → Logs for database errors
3. Paste the error message to Claude and describe what you were doing — it'll fix it

---

## Environment Variables Reference

| Variable | Where to find it | Example |
|----------|-----------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL | `https://abc123.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon key | `eyJhbGci...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role key | `eyJhbGci...` |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys → Secret | `sk_live_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe → Developers → API keys → Publishable | `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks → your endpoint → Signing secret | `whsec_...` |
| `STRIPE_PRO_MONTHLY_PRICE_ID` | Printed when you run `stripe/setup.ts` | `price_...` |
| `STRIPE_PRO_ANNUAL_PRICE_ID` | Printed when you run `stripe/setup.ts` | `price_...` |
| `NEXT_PUBLIC_APP_URL` | Your deployed URL | `https://gigpay.co` |
