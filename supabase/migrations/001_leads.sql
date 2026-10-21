-- Contatos recebidos pelo formulário do site da Lyra.
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null check (char_length(name) between 2 and 120),
  email        text not null check (char_length(email) between 5 and 160),
  company      text check (char_length(company) <= 160),
  message      text not null check (char_length(message) between 10 and 3000),
  request_type text,
  services     text[] not null default '{}',
  user_agent   text,
  status       text not null default 'novo' check (status in ('novo','em_contato','fechado','descartado'))
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Segurança: RLS ligado e nenhuma policy. Só a chave service_role (servidor da Vercel) grava e lê.
alter table public.leads enable row level security;
