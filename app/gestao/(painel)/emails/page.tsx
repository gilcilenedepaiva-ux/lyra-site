import { rpc, select, dbReady } from "@/lib/gestao/db";
import Upload from "./Upload";

type P = { empresa: string; cidade: string | null; ramo: string | null; status: string; enviado_1: string | null };
const RAMO: Record<string, string> = { saude: "Clínica", rest: "Restaurante", loja: "Loja", beleza: "Salão", imob: "Imobiliária", geral: "Serviços", contabil: "Contabilidade" };
const fmt = (n: number) => n.toLocaleString("pt-BR");
const dt = (s: string) => new Date(s).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit" });

export default async function Emails() {
  if (!dbReady()) return <p className="lg-empty">Banco do site não configurado neste ambiente.</p>;
  const r = await rpc<any>("gestao_resumo", { dias: 90 });
  const p = r.prospeccao;
  const limite = new Date(Date.now() - 3 * 864e5).toISOString();
  const follow = await select<P>("prospects", `select=empresa,cidade,ramo,status,enviado_1&status=eq.enviado_1&enviado_1=lte.${limite}&order=enviado_1.asc&limit=50`);
  const respostas = await select<P>("prospects", "select=empresa,cidade,ramo,status,enviado_1&status=in.(respondeu,descadastrado)&order=updated_at.desc&limit=20");

  return (
    <>
      <p className="lg-kick"><span className="lg-dot" />PROSPECÇÃO POR E-MAIL</p>
      <h1 className="lg-h1">E-mails</h1>
      <p className="lg-sub">Rodadas, respostas e os próximos follow-ups.</p>
      <div className="lg-card" style={{ marginBottom: 16 }}><Upload /></div>

      <section className="lg-kpis">
        <div className="lg-card"><p className="lg-label">Enviados</p><p className="lg-big">{fmt(p.enviados)}</p><p className="lg-hint">{fmt(p.followups)} follow-ups</p></div>
        <div className="lg-card"><p className="lg-label">Responderam</p><p className="lg-big">{fmt(p.responderam)}</p><p className="lg-hint">{p.enviados ? Math.round(p.responderam / p.enviados * 100) : 0}% dos enviados</p></div>
        <div className="lg-card"><p className="lg-label">Pediram para sair</p><p className="lg-big">{fmt(p.descadastrados)}</p><p className="lg-hint">tirados da lista automaticamente</p></div>
        <div className="lg-card"><p className="lg-label">E-mail inválido</p><p className="lg-big">{fmt(p.invalidos)}</p><p className="lg-hint">voltaram ou sem servidor de e-mail</p></div>
      </section>

      <section className="lg-row">
        <div className="lg-card">
          <h3>Rodadas</h3>
          <p className="lg-hint">E-mails novos e follow-ups enviados por dia.</p>
          {r.rodadas.length ? (
            <table className="lg-table">
              <thead><tr><th>Dia</th><th>Novos</th><th>Follow-ups</th></tr></thead>
              <tbody>{r.rodadas.map((x: any) => <tr key={x.dia}><td>{x.dia.split("-").reverse().slice(0, 2).join("/")}</td><td>{x.novos}</td><td>{x.followups}</td></tr>)}</tbody>
            </table>
          ) : <p className="lg-empty">Nenhuma rodada sincronizada ainda. Use "Atualizar com a planilha".</p>}
        </div>
        <div className="lg-card">
          <h3>Respostas recentes</h3>
          <p className="lg-hint">Quem respondeu ou pediu pra sair.</p>
          {respostas.length ? (
            <table className="lg-table"><tbody>{respostas.map(x => (
              <tr key={x.empresa}><td>{x.empresa}</td><td>{x.status === "respondeu" ? <span className="lg-pill ok">respondeu</span> : <span className="lg-pill bad">saiu</span>}</td></tr>
            ))}</tbody></table>
          ) : <p className="lg-empty">Nenhuma resposta ainda.</p>}
        </div>
      </section>

      <section className="lg-card">
        <h3>Prontos para follow-up</h3>
        <p className="lg-hint">Receberam o 1º e-mail há 3 dias ou mais e não responderam. O follow-up sai na próxima rodada aprovada.</p>
        {follow.length ? (
          <table className="lg-table">
            <thead><tr><th>Empresa</th><th>Segmento</th><th>Cidade</th><th>1º e-mail</th></tr></thead>
            <tbody>{follow.map(x => <tr key={x.empresa}><td>{x.empresa}</td><td>{RAMO[x.ramo ?? ""] ?? x.ramo}</td><td>{x.cidade}</td><td>{x.enviado_1 ? dt(x.enviado_1) : "-"}</td></tr>)}</tbody>
          </table>
        ) : <p className="lg-empty">Ninguém aguardando follow-up agora.</p>}
      </section>
    </>
  );
}
