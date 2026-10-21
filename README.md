# Site Lyra Technology & Consulting

Landing page em Next.js, com formulário de contato que **salva no Supabase** e **avisa por e-mail** (Resend).

## Rodar no seu computador

```bash
npm install
copy .env.example .env.local   # no Mac/Linux: cp .env.example .env.local
npm run dev                    # http://localhost:3000
```

Sem as chaves no `.env.local` o site abre normal, mas o formulário responde "Não foi possível enviar agora".

## 1. Banco (Supabase)

1. Crie um projeto no Supabase (ou use um existente).
2. No **SQL Editor**, rode o arquivo `supabase/migrations/001_leads.sql`. Ele cria a tabela `leads` com RLS ligado e sem policies: só o servidor (chave `service_role`) consegue gravar e ler.
3. Em **Project Settings > API**, copie a **Project URL** e a chave **service_role**.

## 2. E-mail (Resend)

1. Crie uma conta em resend.com e gere uma **API Key**.
2. Para testar, o remetente padrão é `onboarding@resend.dev`, que só entrega para o e-mail dono da conta Resend.
3. Para entregar em `contato@lyratech.com.br`, verifique o domínio `lyratech.com.br` no Resend (registros DNS) e troque `CONTACT_FROM_EMAIL` para algo como `Lyra Site <site@lyratech.com.br>`.

## 3. Git

```bash
git init
git add .
git commit -m "Site Lyra"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git push -u origin main
```

## 4. Vercel

1. Em vercel.com, **Add New > Project** e importe o repositório (o Next.js é detectado sozinho).
2. Em **Settings > Environment Variables**, cadastre: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
3. Faça o deploy. Depois, em **Domains**, aponte o seu domínio.

## Contatos do site

- WhatsApp: (62) 99464-3122
- E-mail: contato@lyratech.com.br
- Instagram: @lyratecnology

## Ver os contatos recebidos

No Supabase, **Table Editor > leads**. A coluna `status` (novo, em_contato, fechado, descartado) serve para você organizar o atendimento.
