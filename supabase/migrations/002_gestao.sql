-- Lyra Gestão: dados internos (só o servidor do site acessa, via service role)
CREATE TABLE IF NOT EXISTS public.site_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  type text NOT NULL CHECK (char_length(type) <= 40),
  path text CHECK (char_length(path) <= 300),
  source text CHECK (char_length(source) <= 60),
  referrer_host text CHECK (char_length(referrer_host) <= 120),
  demo text CHECK (char_length(demo) <= 40),
  ramo text CHECK (char_length(ramo) <= 30),
  company text CHECK (char_length(company) <= 80),
  lid text CHECK (char_length(lid) <= 40),
  sid text CHECK (char_length(sid) <= 40),
  device text CHECK (char_length(device) <= 20)
);
CREATE INDEX IF NOT EXISTS site_events_created_idx ON public.site_events (created_at DESC);
CREATE INDEX IF NOT EXISTS site_events_type_idx ON public.site_events (type, created_at DESC);

CREATE TABLE IF NOT EXISTS public.prospects (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cnpj text UNIQUE NOT NULL,
  empresa text NOT NULL,
  email text NOT NULL,
  ramo text, cnae text, cidade text, uf text,
  link_demo text,
  status text NOT NULL DEFAULT 'novo',
  enviado_1 timestamptz, enviado_2 timestamptz, respondeu_em timestamptz,
  obs text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS prospects_status_idx ON public.prospects (status);

CREATE TABLE IF NOT EXISTS public.email_rounds (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  day date NOT NULL UNIQUE,
  sent_new int NOT NULL DEFAULT 0,
  sent_followup int NOT NULL DEFAULT 0,
  bounced int NOT NULL DEFAULT 0,
  notes text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_rounds ENABLE ROW LEVEL SECURITY;
-- sem políticas: anon/authenticated não leem nem gravam; o servidor usa a service role
REVOKE ALL ON public.site_events, public.prospects, public.email_rounds FROM anon, authenticated;
