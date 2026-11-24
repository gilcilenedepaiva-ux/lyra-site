import Link from "next/link";
import { rpc, dbReady } from "@/lib/gestao/db";

type Resumo = {
  visitas: number; visitantes: number; cliques_whatsapp: number; cliques_entrar: number; demos_abertas: number;
  demos_interacao: number; formularios: number;
  por_dia: { dia: string; visitas: number; demos: number }[];
  origens: { origem: string; n: number }[];
  demos: { demo: string; n: number }[];
  empresas_demo: { empresa: string; vezes: number; ultima: string; whats: boolean }[];
  prospeccao: { total: number; enviados: number; followups: number; responderam: number; descadastrados: number; invalidos: number };
};

const ORIGEM: Record<string, string> = { email: "E-mail", instagram: "Instagram", google: "Google", direto: "Direto", facebook: "Facebook", whatsapp: "WhatsApp", interno: "Navegação interna", outros: "Outros sites" };
const DEMO: Record<string, string> = { atendimento: "Atendimento", automacoes: "Automações", site: "Site" };
const fmt = (n: number) => n.toLocaleString("pt-BR");
const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);
const dia = (s: string) => { const [, m, d] = s.split("-"); return `${d}/${m}`; };

function Lista({ items, empty }: { items: { label: string; n: number }[]; empty: string }) {
  if (!items.length) return <p className="lg-empty">{empty}</p>;
  const max = Math.max(...items.map(i => i.n), 1);
  return (
    <div className="lg-list">
      {items.map((i, k) => (
        <div className="lg-li" key={i.label}>
          <span>{i.label}</span>
          <div className="lg-track"><div className="lg-fill" style={{ width: `${(i.n / max) * 100}%`, animationDelay: `${k * 0.06}s` }} /></div>
          <b>{fmt(i.n)}</b>
        </div>
      ))}
    </div>
  );
}

export default async function VisaoGeral({ searchParams }: { searchParams: Promise<{ dias?: string }> }) {
  const { dias: d } = await searchParams;
  const dias = [7, 30, 90].includes(Number(d)) ? Number(d) : 30;
  let r: Resumo | null = null, erro = "";
  try { r = dbReady() ? await rpc<Resumo>("gestao_resumo", { dias }) : null; } catch (e: any) { erro = e?.message ?? "erro"; }

  if (!r) {
    return (
      <>
        <p className="lg-kick"><span className="lg-dot" />VISÃO GERAL</p>
        <h1 className="lg-h1">Painel da Lyra</h1>
        <p className="lg-empty">{erro ? `Não consegui ler o banco: ${erro}` : "Banco do site não configurado neste ambiente."}</p>
      </>
    );
  }
  const p = r.prospeccao;
  const maxDia = Math.max(1, ...r.por_dia.map(x => x.visitas));
  const funil = [
    { label: "E-mails enviados", n: p.enviados },
    { label: "Abriram a demo", n: r.empresas_demo.length },
    { label: "Chamaram no WhatsApp", n: r.empresas_demo.filter(e => e.whats).length },
    { label: "Responderam o e-mail", n: p.responderam },
  ];
  const maxF = Math.max(1, ...funil.map(f => f.n));

  return (
    <>
      <p className="lg-kick"><span className="lg-dot" />VISÃO GERAL</p>
      <h1 className="lg-h1">Painel da Lyra</h1>
      <p className="lg-sub">Site, demos e prospecção nos últimos {dias} dias.</p>
      <nav className="lg-range">
        {[7, 30, 90].map(n => <Link key={n} href={`/gestao?dias=${n}`} className={n === dias ? "on" : ""}>{n} dias</Link>)}
      </nav>

      <section className="lg-kpis">
        <div className="lg-card"><p className="lg-label">Visitas no site</p><p className="lg-big">{fmt(r.visitas)}</p><p className="lg-hint">{fmt(r.visitantes)} visitantes diferentes</p></div>
        <div className="lg-card"><p className="lg-label">Demos abertas</p><p className="lg-big">{fmt(r.demos_abertas)}</p><p className="lg-hint">{fmt(r.demos_interacao)} interagiram com a demo</p></div>
        <div className="lg-card"><p className="lg-label">Cliques no WhatsApp</p><p className="lg-big">{fmt(r.cliques_whatsapp)}</p><p className="lg-hint">{fmt(r.formularios)} formulário(s) de contato</p></div>
        <div className="lg-card"><p className="lg-label">Prospecção</p><p className="lg-big">{fmt(p.enviados)}</p><p className="lg-hint">e-mails enviados · {fmt(p.responderam)} responderam ({pct(p.responderam, p.enviados)}%)</p></div>
      </section>

      <section className="lg-row">
        <div className="lg-card">
          <h3>Visitas por dia</h3>
          <p className="lg-hint">Passe o mouse nas barras para ver o número do dia.</p>
          <div className="lg-bars" role="img" aria-label={`Visitas por dia nos últimos ${dias} dias`}>
            {r.por_dia.map(x => (
              <div key={x.dia} className="lg-bar" data-tip={`${dia(x.dia)}: ${x.visitas} visita(s), ${x.demos} demo(s)`}
                style={{ height: `${Math.max(x.visitas ? 3 : 0, (x.visitas / maxDia) * 100)}%`, opacity: x.visitas ? 1 : 0.25 }} />
            ))}
          </div>
          <div className="lg-axis"><span>{dia(r.por_dia[0].dia)}</span><span>{dia(r.por_dia[r.por_dia.length - 1].dia)}</span></div>
        </div>
        <div className="lg-card">
          <h3>De onde vieram</h3>
          <p className="lg-hint">Origem das visitas no site e nas demos.</p>
          <Lista items={r.origens.map(o => ({ label: ORIGEM[o.origem] ?? o.origem, n: o.n }))} empty="Ainda sem visitas registradas." />
        </div>
      </section>

      <section className="lg-row3">
        <div className="lg-card">
          <h3>Funil da prospecção</h3>
          <p className="lg-hint">Do e-mail até a conversa.</p>
          <div className="lg-funnel">
            {funil.map((f, k) => (
              <div className="lg-step" key={f.label}>
                <span>{f.label}</span>
                <div className="lg-track"><div className="lg-fill" style={{ width: `${(f.n / maxF) * 100}%`, animationDelay: `${k * 0.08}s` }} /></div>
                <b style={{ textAlign: "right", fontFamily: "JetBrains Mono, monospace" }}>{fmt(f.n)}</b>
              </div>
            ))}
          </div>
        </div>
        <div className="lg-card">
          <h3>Demos mais abertas</h3>
          <p className="lg-hint">Qual demonstração chama mais atenção.</p>
          <Lista items={r.demos.map(x => ({ label: DEMO[x.demo] ?? x.demo, n: x.n }))} empty="Nenhuma demo aberta no período." />
        </div>
        <div className="lg-card">
          <h3>Cliques que importam</h3>
          <p className="lg-hint">Sinais de interesse no site.</p>
          <Lista items={[
            { label: "WhatsApp", n: r.cliques_whatsapp },
            { label: "Entrar (Hub)", n: r.cliques_entrar },
            { label: "Formulário", n: r.formularios },
          ]} empty="" />
        </div>
      </section>

      <section className="lg-card">
        <h3>Empresas que abriram a demo</h3>
        <p className="lg-hint">Quem veio pelo link personalizado do e-mail. Quem abriu e não chamou é um bom momento pra você ligar.</p>
        {r.empresas_demo.length ? (
          <table className="lg-table">
            <thead><tr><th>Empresa</th><th>Vezes</th><th>Última visita</th><th>WhatsApp</th></tr></thead>
            <tbody>
              {r.empresas_demo.map(e => (
                <tr key={e.empresa}>
                  <td>{e.empresa}</td><td>{e.vezes}</td>
                  <td>{new Date(e.ultima).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</td>
                  <td>{e.whats ? <span className="lg-pill ok">chamou</span> : <span className="lg-pill warn">ainda não</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p className="lg-empty">Ninguém abriu a demo pelo link do e-mail ainda.</p>}
      </section>
    </>
  );
}
