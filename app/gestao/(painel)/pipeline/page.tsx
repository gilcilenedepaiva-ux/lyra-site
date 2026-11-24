import Link from "next/link";
import { select, dbReady } from "@/lib/gestao/db";
import { salvarNegocio } from "../actions";
import { brl, RAMO } from "../ui";

type D = { cnpj: string; empresa: string; ramo: string | null; cidade: string | null; email: string; etapa: string;
  valor: number | null; proxima_acao: string | null; notas: string | null; etapa_em: string | null; link_demo: string | null };

const COLS: [string, string][] = [["respondeu", "Respondeu"], ["conversa", "Em conversa"], ["reuniao", "Reunião"], ["proposta", "Proposta"], ["fechado", "Fechado ✅"], ["perdido", "Perdido"]];
const hoje = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
const br = (d: string) => d.split("-").reverse().join("/");
const mask = (e: string) => { const [u, d] = e.split("@"); return `${u.slice(0, 3)}***@${d}`; };

export default async function Pipeline() {
  if (!dbReady()) return <p className="lg-empty">Banco do site não configurado neste ambiente.</p>;
  const deals = await select<D>("prospects", "select=cnpj,empresa,ramo,cidade,email,etapa,valor,proxima_acao,notas,etapa_em,link_demo&etapa=not.is.null&order=proxima_acao.asc.nullslast,updated_at.desc&limit=300");
  const h = hoje();
  const abertos = deals.filter(d => !["fechado", "perdido"].includes(d.etapa));
  const emNeg = abertos.reduce((s, d) => s + (d.valor ?? 0), 0);
  const fechado = deals.filter(d => d.etapa === "fechado").reduce((s, d) => s + (d.valor ?? 0), 0);

  return (
    <>
      <p className="lg-kick"><span className="lg-dot" />VENDAS</p>
      <h1 className="lg-h1">Pipeline</h1>
      <p className="lg-sub">Quem respondeu entra aqui sozinho. Mova as etapas, anote a próxima ação e o valor da proposta.</p>
      <section className="lg-kpis">
        <div className="lg-card"><p className="lg-label">Em negociação</p><p className="lg-big">{abertos.length}</p><p className="lg-hint">{brl(emNeg)} em propostas</p></div>
        <div className="lg-card"><p className="lg-label">Ações pra hoje</p><p className="lg-big">{abertos.filter(d => d.proxima_acao && d.proxima_acao <= h).length}</p><p className="lg-hint">vencidas ou com data de hoje</p></div>
        <div className="lg-card"><p className="lg-label">Fechados</p><p className="lg-big">{deals.filter(d => d.etapa === "fechado").length}</p><p className="lg-hint">{brl(fechado)}</p></div>
        <div className="lg-card"><p className="lg-label">Perdidos</p><p className="lg-big">{deals.filter(d => d.etapa === "perdido").length}</p><p className="lg-hint">anote o motivo pra aprender</p></div>
      </section>

      {deals.length === 0 && (
        <p className="lg-empty" style={{ marginBottom: 14 }}>
          Ninguém no pipeline ainda. Quando alguém responder o e-mail, entra aqui sozinho. Você também pode adicionar pela tela de <Link href="/gestao/leads" className="lg-link">Leads</Link>.
        </p>
      )}

      <div className="lg-kanban">
        {COLS.map(([k, label]) => {
          const items = deals.filter(d => d.etapa === k);
          return (
            <div className="lg-col" key={k}>
              <h4>{label}<span>{items.length}{items.some(d => d.valor) ? ` · ${brl(items.reduce((s, d) => s + (d.valor ?? 0), 0))}` : ""}</span></h4>
              {items.map(d => {
                const late = d.proxima_acao && d.proxima_acao <= h && !["fechado", "perdido"].includes(d.etapa);
                return (
                  <div className="lg-deal" key={d.cnpj}>
                    <b>{d.empresa}</b>
                    <span className="lg-hint">{RAMO[d.ramo ?? ""] ?? d.ramo} · {d.cidade}</span><br />
                    <span className="lg-hint">{mask(d.email)}</span>
                    {d.valor ? <div style={{ marginTop: 6, fontWeight: 700 }}>{brl(d.valor)}</div> : null}
                    {d.proxima_acao && <div style={{ marginTop: 4 }} className={late ? "late" : "lg-hint"}>Próxima ação: {br(d.proxima_acao)}{late ? " (atrasada)" : ""}</div>}
                    {d.notas && <div className="lg-hint" style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>{d.notas.slice(0, 160)}{d.notas.length > 160 ? "..." : ""}</div>}
                    <details>
                      <summary>Editar</summary>
                      <form action={salvarNegocio}>
                        <input type="hidden" name="cnpj" value={d.cnpj} />
                        <select name="etapa" defaultValue={d.etapa}>{COLS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
                        <input name="valor" placeholder="Valor da proposta (R$)" defaultValue={d.valor ?? ""} inputMode="decimal" />
                        <input name="proxima_acao" type="date" defaultValue={d.proxima_acao ?? ""} />
                        <textarea name="notas" placeholder="Anotações (o que combinou, objeções, próximo passo)" defaultValue={d.notas ?? ""} />
                        <button className="lg-btn" type="submit">Salvar</button>
                      </form>
                      {d.link_demo && <a className="lg-link" href={d.link_demo} target="_blank" rel="noopener">Ver a demo dele ↗</a>}
                    </details>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
