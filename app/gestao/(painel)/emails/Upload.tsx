"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Lê o controle_envios.csv no navegador e envia só as empresas já contatadas (em partes).
function parseCsv(text: string) {
  const lines = text.replace(/^﻿/, "").split(/\r?\n/).filter(Boolean);
  const head = lines[0].split(";");
  return lines.slice(1).map(l => {
    const cols = l.split(";");
    return Object.fromEntries(head.map((h, i) => [h.trim(), (cols[i] ?? "").trim()]));
  });
}

export default function Upload() {
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const onFile = async (f: File | undefined) => {
    if (!f) return;
    setBusy(true); setMsg("Lendo a planilha...");
    try {
      const rows = parseCsv(await f.text()).filter(r => r.status && r.status !== "novo");
      if (!rows.length) { setMsg("Nenhuma empresa contatada encontrada nessa planilha."); return; }
      let total = 0;
      for (let i = 0; i < rows.length; i += 500) {
        const r = await fetch("/api/gestao/sync", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rows: rows.slice(i, i + 500) }) });
        const j = await r.json();
        if (!r.ok) throw new Error(j.error ?? r.statusText);
        total += j.atualizados;
        setMsg(`Enviando... ${total} de ${rows.length}`);
      }
      setMsg(`Pronto: ${total} empresas atualizadas.`);
      router.refresh();
    } catch (e: any) {
      setMsg("Não deu certo: " + (e?.message ?? "erro"));
    } finally { setBusy(false); }
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      <label className="lg-btn" style={{ opacity: busy ? 0.6 : 1 }}>
        Atualizar com a planilha
        <input type="file" accept=".csv" hidden disabled={busy} onChange={e => onFile(e.target.files?.[0])} />
      </label>
      <span className="lg-hint">Escolha o arquivo <b>prospeccao-email/leads/controle_envios.csv</b>. {msg}</span>
    </div>
  );
}
