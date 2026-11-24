import Link from "next/link";
import { select, dbReady } from "@/lib/gestao/db";

type P = { cnpj: string; empresa: string; email: string; cidade: string | null; ramo: string | null; status: string; enviado_1: string | null; link_demo: string | null };
type L = { id: string; created_at: string; name: string; email: string; company: string | null; message: string; status: string };
const RAMO: Record<string, string> = { saude: "Clínica", rest: "Restaurante", loja: "Loja", beleza: "Salão", imob: "Imobiliária", geral: "Serviços", contabil: "Contabilidade" };
const ST: Record<string, [string, string]> = {
  enviado_1: ["1º e-mail", "info"], enviado_2: ["follow-up", "info"], respondeu: ["respondeu", "ok"],
  descadastrado: ["saiu", "bad"], invalido: ["inválido", "bad"], novo: ["na fila", ""],
  em_contato: ["em contato", "info"], fechado: ["fechado", "ok"], descartado: ["descartado", "bad"],
};
const mask = (e: string) => { const [u, d] = e.split("@"); return `${u.slice(0, 3)}***@${d}`; };
const dt = (s: string) => new Date(s).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit" });

export default async function Leads({ searchParams }: { searchParams: Promise<{ status?: string; ramo?: string; q?: string }> }) {
  if (!dbReady()) return <p className="lg-empty">Banco do site não configurado neste ambiente.</p>;
  const f = await searchParams;
  const filt = [
    f.status ? `status=eq.${encodeURIComponent(f.status)}` : "",
    f.ramo ? `ramo=eq.${encodeURIComponent(f.ramo)}` : "",
    f.q ? `empresa=ilike.*${encodeURIComponent(f.q.replace(/[*,()]/g, ""))}*` : "",
  ].filter(Boolean).join("&");
  const prospects = await select<P>("prospects", `select=cnpj,empresa,email,cidade,ramo,status,enviado_1,link_demo&order=updated_at.desc&limit=200${filt ? "&" + filt : ""}`);
  const site = await select<L>("leads", "select=id,created_at,name,email,company,message,status&order=created_at.desc&limit=30");

  return (
    <>
      <p className="lg-kick"><span className="lg-dot" />LEADS</p>
      <h1 className="lg-h1">Leads</h1>
      <p className="lg-sub">Contatos do formulário do site e empresas da prospecção.</p>

      <section className="lg-card" style={{ marginBottom: 14 }}>
        <h3>Pelo formulário do site</h3>
        <p className="lg-hint">Quem pediu contato direto no lyratech.com.br.</p>
        {site.length ? (
          <table className="lg-table">
            <thead><tr><th>Quando</th><th>Nome</th><th>Empresa</th><th>Mensagem</th><th>Status</th></tr></thead>
            <tbody>{site.map(l => (
              <tr key={l.id}><td>{dt(l.created_at)}</td><td>{l.name}<br /><span className="lg-hint">{l.email}</span></td><td>{l.company ?? "-"}</td>
                <td style={{ maxWidth: 320 }}>{l.message.slice(0, 140)}{l.message.length > 140 ? "..." : ""}</td>
                <td><span className={`lg-pill ${ST[l.status]?.[1] ?? ""}`}>{ST[l.status]?.[0] ?? l.status}</span></td></tr>
            ))}</tbody>
          </table>
        ) : <p className="lg-empty">Nenhum contato pelo formulário ainda.</p>}
      </section>

      <section className="lg-card">
        <h3>Prospecção por e-mail</h3>
        <p className="lg-hint">Empresas já contatadas (sincronizadas pela tela de E-mails).</p>
        <form className="lg-filters" method="get">
          <input name="q" placeholder="Buscar empresa" defaultValue={f.q ?? ""} />
          <select name="status" defaultValue={f.status ?? ""}>
            <option value="">Todos os status</option>
            <option value="enviado_1">1º e-mail</option><option value="enviado_2">Follow-up</option>
            <option value="respondeu">Respondeu</option><option value="descadastrado">Saiu</option><option value="invalido">Inválido</option>
          </select>
          <select name="ramo" defaultValue={f.ramo ?? ""}>
            <option value="">Todos os segmentos</option>
            {Object.entries(RAMO).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <button className="lg-btn o" type="submit">Filtrar</button>
          {(f.q || f.status || f.ramo) && <Link className="lg-btn o" href="/gestao/leads">Limpar</Link>}
        </form>
        {prospects.length ? (
          <table className="lg-table">
            <thead><tr><th>Empresa</th><th>Segmento</th><th>Cidade</th><th>E-mail</th><th>1º e-mail</th><th>Status</th><th></th></tr></thead>
            <tbody>{prospects.map(p => (
              <tr key={p.cnpj}><td>{p.empresa}</td><td>{RAMO[p.ramo ?? ""] ?? p.ramo}</td><td>{p.cidade}</td><td>{mask(p.email)}</td>
                <td>{p.enviado_1 ? dt(p.enviado_1) : "-"}</td>
                <td><span className={`lg-pill ${ST[p.status]?.[1] ?? ""}`}>{ST[p.status]?.[0] ?? p.status}</span></td>
                <td>{p.link_demo && <a className="lg-hint" href={p.link_demo} target="_blank" rel="noopener">ver demo ↗</a>}</td></tr>
            ))}</tbody>
          </table>
        ) : <p className="lg-empty">Nenhuma empresa encontrada.</p>}
      </section>
    </>
  );
}
