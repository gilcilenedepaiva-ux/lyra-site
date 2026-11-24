import { NextResponse } from "next/server";
import { COOKIE, cookieOptions, makeToken, passwordOk } from "@/lib/gestao/auth";

export const runtime = "nodejs";

// Limite de tentativas por IP (best effort)
const tries = new Map<string, number[]>();
function blocked(ip: string) {
  const now = Date.now();
  const recent = (tries.get(ip) ?? []).filter(t => now - t < 15 * 60_000);
  recent.push(now); tries.set(ip, recent);
  return recent.length > 8;
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const form = await req.formData();
  const senha = String(form.get("senha") ?? "");
  const base = new URL(req.url);
  if (blocked(ip)) return NextResponse.redirect(new URL("/gestao/entrar?erro=limite", base), 303);
  if (!passwordOk(senha)) return NextResponse.redirect(new URL("/gestao/entrar?erro=1", base), 303);
  const res = NextResponse.redirect(new URL("/gestao", base), 303);
  res.cookies.set(COOKIE, makeToken(), cookieOptions);
  return res;
}
