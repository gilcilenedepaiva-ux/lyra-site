import { NextResponse } from "next/server";

export const runtime = "nodejs";

const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Limite simples por IP (best effort: em serverless cada instância tem sua própria memória).
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  // Campo isca: robôs preenchem, pessoas não veem.
  if (clean(b.website, 200)) return NextResponse.json({ ok: true });

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (limited(ip)) {
    return NextResponse.json({ error: "Muitas tentativas. Tente de novo em alguns minutos." }, { status: 429 });
  }

  const lead = {
    name: clean(b.name, 120),
    email: clean(b.email, 160),
    company: clean(b.company, 160) || null,
    message: clean(b.message, 3000),
    request_type: clean(b.request, 80) || null,
    services: Array.isArray(b.services) ? b.services.map((s) => clean(s, 60)).filter(Boolean).slice(0, 10) : [],
    user_agent: clean(req.headers.get("user-agent"), 300) || null,
  };
  if (lead.name.length < 2 || !/^\S+@\S+\.\S+$/.test(lead.email) || lead.message.length < 10 || lead.services.length === 0) {
    return NextResponse.json({ error: "Confira os campos do formulário." }, { status: 400 });
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  let saved = false;
  let emailed = false;

  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(lead),
      });
      saved = r.ok;
      if (!r.ok) console.error("Supabase:", r.status, await r.text());
    } catch (e) {
      console.error("Supabase falhou", e);
    }
  }

  if (RESEND_API_KEY) {
    const rows: [string, string][] = [
      ["Solicitação", lead.request_type ?? ""],
      ["Soluções", lead.services.join(", ")],
      ["Nome", lead.name],
      ["E-mail", lead.email],
      ["Empresa", lead.company ?? ""],
      ["Desafio", lead.message],
    ];
    const html = `<div style="font-family:Arial,sans-serif;color:#0A1F3B"><h2>Novo contato pelo site da Lyra</h2>${rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<p><b>${k}:</b><br>${escapeHtml(v).replace(/\n/g, "<br>")}</p>`)
      .join("")}</div>`;
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: CONTACT_FROM_EMAIL || "Lyra Site <onboarding@resend.dev>",
          to: [CONTACT_TO_EMAIL || "contato@lyratech.com.br"],
          reply_to: lead.email,
          subject: `Novo contato: ${lead.name} (${lead.request_type ?? "site"})`,
          html,
        }),
      });
      emailed = r.ok;
      if (!r.ok) console.error("Resend:", r.status, await r.text());
    } catch (e) {
      console.error("Resend falhou", e);
    }
  }

  if (!saved && !emailed) {
    return NextResponse.json({ error: "Não foi possível enviar agora." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, saved, emailed });
}
