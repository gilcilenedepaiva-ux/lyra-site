import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";
import { COOKIE, tokenValid } from "@/lib/gestao/auth";
import { insert, dbReady } from "@/lib/gestao/db";

export const runtime = "nodejs";

// Recebe linhas do controle_envios.csv (só as já contatadas) e atualiza a tabela prospects.
// Autorizado por: login do painel (cookie) OU chave GESTAO_SYNC_TOKEN (script de envio).
async function authorized(req: Request) {
  const c = await cookies();
  if (tokenValid(c.get(COOKIE)?.value)) return true;
  const expected = process.env.GESTAO_SYNC_TOKEN ?? "";
  const got = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!expected || !got) return false;
  const a = Buffer.from(got), b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

const STATUS = new Set(["novo", "enviado_1", "enviado_2", "respondeu", "descadastrado", "invalido"]);
const s = (v: unknown, max = 200) => (v == null ? null : String(v).trim().slice(0, max) || null);
// "2026-11-24 09:00" (horário de Brasília) -> ISO
const ts = (v: unknown) => {
  const t = s(v, 20); if (!t) return null;
  const m = t.match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2})/);
  return m ? `${m[1]}T${m[2]}:00-03:00` : null;
};

export async function POST(req: Request) {
  if (!(await authorized(req))) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ error: "Banco não configurado" }, { status: 500 });
  let body: { rows?: Record<string, unknown>[] };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "JSON inválido" }, { status: 400 }); }
  const rows = (body.rows ?? []).slice(0, 2000).map(r => ({
    cnpj: s(r.cnpj, 20), empresa: s(r.empresa, 160), email: s(r.email, 160),
    ramo: s(r.ramo, 30), cnae: s(r.cnae, 10), cidade: s(r.cidade, 80), uf: s(r.uf, 2), link_demo: s(r.link_demo, 300),
    status: STATUS.has(String(r.status)) ? String(r.status) : "novo",
    enviado_1: ts(r.enviado_1), enviado_2: ts(r.enviado_2), respondeu_em: ts(r.respondeu_em), obs: s(r.obs, 300),
    updated_at: new Date().toISOString(),
  })).filter(r => r.cnpj && r.empresa && r.email);
  if (!rows.length) return NextResponse.json({ ok: true, atualizados: 0 });
  await insert("prospects", rows, "cnpj");
  return NextResponse.json({ ok: true, atualizados: rows.length });
}
