import { NextResponse } from "next/server";
import { insert, dbReady } from "@/lib/gestao/db";

export const runtime = "nodejs";

// Eventos aceitos do site e das demos. Não guardamos IP nem dados pessoais.
const TYPES = new Set([
  "pageview", "click_entrar", "click_whatsapp", "click_demo", "click_contato",
  "demo_view", "demo_interacao", "demo_fim", "demo_whatsapp", "demo_troca", "form_enviado",
]);
const clean = (v: unknown, max: number) => (v == null ? null : String(v).trim().slice(0, max) || null);

// Limite simples por sessão (best effort em serverless)
const hits = new Map<string, number[]>();
function limited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter(t => now - t < 60_000);
  recent.push(now); hits.set(key, recent);
  return recent.length > 60;
}

function sourceOf(ref: string | null, utm: string | null, path: string | null) {
  if (utm) return utm.toLowerCase().slice(0, 60);
  if (path && /[?&]e=/.test(path)) return "email";
  if (!ref) return "direto";
  if (/instagram|l\.instagram/.test(ref)) return "instagram";
  if (/facebook|fb\./.test(ref)) return "facebook";
  if (/google\./.test(ref)) return "google";
  if (/wa\.me|whatsapp/.test(ref)) return "whatsapp";
  if (/lyratech\.com\.br|vercel\.app|localhost/.test(ref)) return "interno";
  return "outros";
}

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = JSON.parse(await req.text()); } catch { return new NextResponse(null, { status: 204 }); }
  const type = clean(b.type, 40);
  if (!type || !TYPES.has(type) || !dbReady()) return new NextResponse(null, { status: 204 });
  const sid = clean(b.sid, 40);
  if (limited(sid ?? "anon")) return new NextResponse(null, { status: 204 });

  const ref = clean(b.ref, 300);
  let referrerHost: string | null = null;
  try { referrerHost = ref ? new URL(ref).hostname.slice(0, 120) : null; } catch {}
  const path = clean(b.path, 300);
  const ua = req.headers.get("user-agent") ?? "";
  try {
    await insert("site_events", {
      type, path, sid,
      source: sourceOf(referrerHost, clean(b.utm, 60), path),
      referrer_host: referrerHost,
      demo: clean(b.demo, 40), ramo: clean(b.ramo, 30), company: clean(b.company, 80), lid: clean(b.lid, 40),
      device: /mobile|android|iphone/i.test(ua) ? "celular" : "computador",
    });
  } catch (e) {
    console.error("track", e);
  }
  return new NextResponse(null, { status: 204 });
}
