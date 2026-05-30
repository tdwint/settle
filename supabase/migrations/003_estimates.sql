-- ============================================================
-- ESTIMATES & ESTIMATE ITEMS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.estimates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  estimate_number text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','sent','viewed','accepted','declined','expired','converted')),
  valid_until date,
  currency text NOT NULL DEFAULT 'USD',
  subtotal numeric(12,2) NOT NULL DEFAULT 0,
  tax_rate numeric(5,2) NOT NULL DEFAULT 0,
  tax_amount numeric(12,2) NOT NULL DEFAULT 0,
  discount_amount numeric(12,2) NOT NULL DEFAULT 0,
  total numeric(12,2) NOT NULL DEFAULT 0,
  notes text,
  client_name text,
  client_email text,
  client_address text,
  client_phone text,
  client_note text,
  converted_invoice_id uuid REFERENCES public.invoices(id) ON DELETE SET NULL,
  sent_at timestamptz,
  viewed_at timestamptz,
  responded_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.estimate_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  estimate_id uuid NOT NULL REFERENCES public.estimates(id) ON DELETE CASCADE,
  description text NOT NULL,
  quantity numeric(10,2) NOT NULL DEFAULT 1,
  rate numeric(12,2) NOT NULL DEFAULT 0,
  amount numeric(12,2) NOT NULL DEFAULT 0,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ============================================================
-- AUTO-GENERATE ESTIMATE NUMBER (EST-1000, EST-1001, …)
-- ============================================================
CREATE SEQUENCE IF NOT EXISTS estimate_number_seq START 1000;

CREATE OR REPLACE FUNCTION generate_estimate_number()
RETURNS trigger AS $$
BEGIN
  IF NEW.estimate_number IS NULL OR NEW.estimate_number = '' THEN
    NEW.estimate_number := 'EST-' || LPAD(nextval('estimate_number_seq')::text, 4, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_estimate_number
  BEFORE INSERT ON public.estimates
  FOR EACH ROW EXECUTE FUNCTION generate_estimate_number();

-- ============================================================
-- RLS
-- ============================================================
ALTER TABLE public.estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estimate_items ENABLE ROW LEVEL SECURITY;

-- Owner has full access
CREATE POLICY "Users manage own estimates"
  ON public.estimates FOR ALL
  USING (auth.uid() = user_id);

-- Public can read non-draft estimates (for client view page)
CREATE POLICY "Public read non-draft estimates"
  ON public.estimates FOR SELECT
  USING (status IN ('sent','viewed','accepted','declined','expired','converted'));

-- Estimate items: owner access via parent
CREATE POLICY "Users manage own estimate items"
  ON public.estimate_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.estimates e
      WHERE e.id = estimate_items.estimate_id
        AND e.user_id = auth.uid()
    )
  );

-- Estimate items: public read for non-draft parent
CREATE POLICY "Public read items of non-draft estimates"
  ON public.estimate_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.estimates e
      WHERE e.id = estimate_items.estimate_id
        AND e.status IN ('sent','viewed','accepted','declined','expired','converted')
    )
  );
