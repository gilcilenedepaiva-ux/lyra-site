// Acesso ao banco do site (Supabase) pelo servidor, com a service role.
// Nunca importar em componentes de cliente: a chave fica só no servidor.

const URL = process.env.SUPABASE_URL ?? "";
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const dbReady = () => Boolean(URL && KEY);

const headers = (extra: Record<string, string> = {}) => ({
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  "Content-Type": "application/json",
  ...extra,
});

/** GET na API REST do Supabase. `query` no formato PostgREST, ex.: "select=*&order=created_at.desc". */
export async function select<T = any>(table: string, query: string): Promise<T[]> {
  if (!dbReady()) return [];
  const r = await fetch(`${URL}/rest/v1/${table}?${query}`, { headers: headers(), cache: "no-store" });
  if (!r.ok) throw new Error(`Banco: ${r.status} ${await r.text()}`);
  return r.json();
}

/** Chama uma função SQL (RPC). */
export async function rpc<T = any>(fn: string, args: Record<string, unknown> = {}): Promise<T> {
  const r = await fetch(`${URL}/rest/v1/rpc/${fn}`, { method: "POST", headers: headers(), body: JSON.stringify(args), cache: "no-store" });
  if (!r.ok) throw new Error(`Banco: ${r.status} ${await r.text()}`);
  return r.json();
}

export async function insert(table: string, rows: unknown, upsertOn?: string) {
  if (!dbReady()) return;
  const q = upsertOn ? `?on_conflict=${upsertOn}` : "";
  const r = await fetch(`${URL}/rest/v1/${table}${q}`, {
    method: "POST",
    headers: headers({ Prefer: upsertOn ? "resolution=merge-duplicates,return=minimal" : "return=minimal" }),
    body: JSON.stringify(rows),
  });
  if (!r.ok) throw new Error(`Banco: ${r.status} ${await r.text()}`);
}

export async function update(table: string, filter: string, patch: unknown) {
  const r = await fetch(`${URL}/rest/v1/${table}?${filter}`, {
    method: "PATCH", headers: headers({ Prefer: "return=minimal" }), body: JSON.stringify(patch),
  });
  if (!r.ok) throw new Error(`Banco: ${r.status} ${await r.text()}`);
}
