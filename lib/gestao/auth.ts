// Login do Lyra Gestão: uma senha (variável GESTAO_SENHA na Vercel) e um cookie assinado.
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const COOKIE = "lyra_gestao";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

// A assinatura usa um segredo do servidor (nunca vai para o navegador).
const secret = () => {
  const base = process.env.GESTAO_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return base ? base + "|lyra-gestao" : "";
};

function sign(payload: string) {
  const s = secret();
  if (!s) throw new Error("Segredo do servidor não configurado");
  return createHmac("sha256", s).update(payload).digest("base64url");
}

export function passwordOk(input: string) {
  const real = process.env.GESTAO_SENHA ?? "";
  if (!real || !input || !secret()) return false;
  const a = Buffer.from(sign(input)), b = Buffer.from(sign(real));
  return a.length === b.length && timingSafeEqual(a, b);
}

export function makeToken() {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = `v1.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function tokenValid(token?: string) {
  if (!token || !secret()) return false;
  const i = token.lastIndexOf(".");
  if (i < 0) return false;
  const payload = token.slice(0, i), sig = token.slice(i + 1);
  const exp = Number(payload.split(".")[1]);
  if (!exp || exp < Date.now() / 1000) return false;
  const a = Buffer.from(sig), b = Buffer.from(sign(payload));
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isLogged() {
  const c = await cookies();
  return tokenValid(c.get(COOKIE)?.value);
}

export const cookieOptions = { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/", maxAge: MAX_AGE };
