"use server";
import { revalidatePath } from "next/cache";
import { isLogged } from "@/lib/gestao/auth";
import { update } from "@/lib/gestao/db";

const ETAPAS = new Set(["respondeu", "conversa", "reuniao", "proposta", "fechado", "perdido"]);
const cnpjOk = (v: FormDataEntryValue | null) => /^\d{14}$/.test(String(v ?? "")) ? String(v) : null;

async function guard() {
  if (!(await isLogged())) throw new Error("Não autorizado");
}

/** Adiciona uma empresa da prospecção ao pipeline (ou move de etapa). */
export async function moverEtapa(form: FormData) {
  await guard();
  const cnpj = cnpjOk(form.get("cnpj")), etapa = String(form.get("etapa") ?? "");
  if (!cnpj || !ETAPAS.has(etapa)) return;
  await update("prospects", `cnpj=eq.${cnpj}`, { etapa, updated_at: new Date().toISOString() });
  revalidatePath("/gestao", "layout");
}

/** Salva os dados da negociação: etapa, valor, próxima ação e anotações. */
export async function salvarNegocio(form: FormData) {
  await guard();
  const cnpj = cnpjOk(form.get("cnpj")); if (!cnpj) return;
  const etapa = String(form.get("etapa") ?? "");
  const valor = Number(String(form.get("valor") ?? "").replace(/\./g, "").replace(",", "."));
  const prox = String(form.get("proxima_acao") ?? "");
  await update("prospects", `cnpj=eq.${cnpj}`, {
    ...(ETAPAS.has(etapa) ? { etapa } : {}),
    valor: Number.isFinite(valor) && valor > 0 ? valor : null,
    proxima_acao: /^\d{4}-\d{2}-\d{2}$/.test(prox) ? prox : null,
    notas: String(form.get("notas") ?? "").slice(0, 2000) || null,
    updated_at: new Date().toISOString(),
  });
  revalidatePath("/gestao", "layout");
}
