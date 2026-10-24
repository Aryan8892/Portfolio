-- Migration: 20261024000000_create_contact_messages.sql
-- Description: Create contact_messages table with RLS enabled for secure Edge Function insertion

CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Revoke all permissions from public (anon) and authenticated users
REVOKE ALL ON TABLE public.contact_messages FROM anon, authenticated;

-- Grant permissions to service_role (used by server-side Edge Functions)
GRANT ALL ON TABLE public.contact_messages TO service_role;

-- Documentation comments
COMMENT ON TABLE public.contact_messages IS 'Visitor contact form submissions received from the portfolio';
COMMENT ON COLUMN public.contact_messages.id IS 'Unique identifier for each contact message';
COMMENT ON COLUMN public.contact_messages.name IS 'Name of the sender';
COMMENT ON COLUMN public.contact_messages.email IS 'Validated contact email address';
COMMENT ON COLUMN public.contact_messages.subject IS 'Subject line of the contact message';
COMMENT ON COLUMN public.contact_messages.message IS 'Full body text of the message';
COMMENT ON COLUMN public.contact_messages.created_at IS 'Timestamp when the message was received';
