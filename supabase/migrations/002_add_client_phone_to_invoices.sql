-- Add client_phone to invoices table to match client data snapshot fields
ALTER TABLE public.invoices ADD COLUMN IF NOT EXISTS client_phone text;
