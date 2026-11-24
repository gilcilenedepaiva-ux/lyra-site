import Link from "next/link";
import { rpc, dbReady } from "@/lib/gestao/db";
import { fmt, brl, RAMO, Kpi, BarList, ago } from "./ui";

type Resumo = {
  visitas: number; visitantes: number; cliques_whatsapp: number; cliques_entrar: number; demos_abertas: number;
  demos_interacao: number; formularios: number;
  por_dia: { dia: string; visitas: number; demos: number }[];
  origens: { origem: string; n: number }[];
  demos: { demo: string; n: number }[];
  empresas_demo: { empresa: string; vezes: number; ultima: string; whats: boolean }[];
  prospeccao: { total: number; enviados: number; followups: number; responderam: number; descadastrados: number; invalidos: number };
};
type Extra = {
  anterior: { visitas: number; demos: number; whats: number; enviados: number };
  enviados_periodo: number; enviados_hoje: number; bounce_pct: number; followup_amanha: number; parados: number; acoes_hoje: number;
  pipeline: Record<string, number> | null; pipeline_valor: number; fechado_valor: number;
  dispositivos: Record<string, number>; whats_por_dia: number[];
  segmentos: { ramo: string; enviados: number; invalidos: number; demos: number; whats: number; responderam: number }[];
  cidades: { cidade: string; enviados: number }[];
  quentes: { empresa: string; ramo: string; cidade: string; vistas: number; ult: string }[];
  atividade: { t: string; type: string; source: string | null; demo: string | null; company: string | null; device: string | null }[];
};

const META_DIA = 30;
const ORIGEM: Record<string, string> = { email: "E-mail", instagram: "Instagram", google: "Google", direto: "Direto", facebook: "Facebook", whatsapp: "WhatsApp", interno: "Navegação interna", outros: "Outros sites" };
const DEMO: Record<string, string> = { atendimento: "Atendimento", automacoes: "Automações", site: "Site" };
const ETAPAS: [string, string][] = [["respondeu", "Respondeu"], ["conversa", "Em conversa"], ["reuniao", "Reunião"], ["proposta", "Proposta"], ["fechado", "Fechado"]];
const dia = (s: string) => { const [, m, d] = s.split("-"); return `${d}/${m}`; };
const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);

function evento(a: Extra["atividade"][number]) {
  const quem = a.company ? <b>{a.company}</b> : "Alguém";
  const de = a.source && a.source !== "interno" && a.source !== "direto" ? ` (via ${ORIGEM[a.source] ?? a.source})` : "";
  switch (a.type) {
    case "pageview": return <>Visita no site{de}</>;
    case "demo_view": return <>{quem} abriu a demo de {DEMO[a.demo ?? ""] ?? a.demo}{de}</>;
    case "demo_interacao": return <>{quem} testou a demo de {DEMO[a.demo ?? ""] ?? a.demo}</>;
    case "demo_whatsapp": return <>{quem} clicou no WhatsApp pela demo 🔥</>;
    case "click_whatsapp": return <>Clique no WhatsApp no site 🔥</>;
    case "click_entrar": return <>Clique em "Entrar" (Lyra Hub)</>;
    case "click_demo": return <>Clique pra ver uma demo no site</>;
    case "click_contato": return <>Clique em contato no site</>;
    case "demo_troca": return <>{quem} trocou de demo</>;
    default: return <>{a.type}</>;
  }
}

export default async function VisaoGeral({ searchParams }: { searchParams: Promise<{ dias?: string }> }) {
  const { dias: d } = await searchParams;
  const dias = [7, 30, 90].includes(Number(d)) ? Number(d) : 30;
  let r: Resumo | null = null, x: Extra | null = null, erro = "";
  try {
    if (dbReady()) [r, x] = await Promise.all([rpc<Resumo>("gestao_resumo", { dias }), rpc<Extra>("gestao_extra", { dias })]);
  } catch (e: any) { erro = e?.message ?? "erro"; }

  if (!r || !x) {
    return (<><p className="lg-kick"><span className="lg-dot" />VISÃO GERAL</p><h1 className="lg-h1">Painel da Lyra</h1>
      <p className="lg-empty">{erro ? `Não consegui ler o banco: ${erro}` : "Banco do site não configurado neste ambiente."}</p></>);
  }
  const p = r.prospeccao;
  const pipe = x.pipeline ?? {};
  const maxDia = Math.max(1, ...r.por_dia.map(v => v.visitas));
  const disp = x.dispositivos ?? {};
  const totDisp = Object.values(disp).reduce((a, b) => a + b, 0);
  const metaHoje = Math.min(100, Math.round((x.enviados_hoje / META_DIA) * 100));

  // alertas e oportunidades
  const alertas: { tipo: "bad" | "warn" | "ok" | "info"; txt: React.ReactNode; href?: string }[] = [];
  if (x.quentes.length) alertas.push({ tipo: "ok", txt: <><b>{x.quentes.length} lead(s) quente(s):</b> abriram a demo mais de uma vez e ainda não chamaram. Boa hora pra ligar.</>, href: "#quentes" });
  if (x.acoes_hoje) alertas.push({ tipo: "warn", txt: <><b>{x.acoes_hoje} ação(ões) do pipeline</b> vencem hoje ou estão atrasadas.</>, href: "/gestao/pipeline" });
  if (x.parados) alertas.push({ tipo: "warn", txt: <><b>{x.parados} lead(s) parado(s)</b> há mais de 2 dias depois de responder.</>, href: "/gestao/pipeline" });
  if (x.bounce_pct > 5) alertas.push({ tipo: "bad", txt: <><b>{x.bounce_pct}% dos e-mails voltaram.</b> Acima de 5% aumenta o risco de cair no spam: vale filtrar melhor a lista antes da próxima rodada.</>, href: "/gestao/emails" });
  if (x.followup_amanha) alertas.push({ tipo: "info", txt: <><b>{x.followup_amanha} follow-up(s)</b> liberados até amanhã.</>, href: "/gestao/emails" });
  if (!x.enviados_hoje) alertas.push({ tipo: "info", txt: <>Nenhum e-mail enviado hoje ainda.</> });

  return (
    <>
      <div className="lg-top">
        <div>
          <p className="lg-kick"><span className="lg-dot" />VISÃO GERAL · AO VIVO</p>
          <h1 className="lg-h1">Painel da Lyra</h1>
          <p className="lg-sub">Site, demos, prospecção e vendas nos últimos {dias} dias.</p>
        </div>
        <nav className="lg-range">
          {[7, 30, 90].map(n => <Link key={n} href={`/gestao?dias=${n}`} className={n === dias ? "on" : ""}>{n} dias</Link>)}
        </nav>
      </div>

      {alertas.length > 0 && (
        <section className="lg-alerts">
          {alertas.map((a, i) => {
            const body = <><span className={`lg-adot ${a.tipo}`} /><span>{a.txt}</span>{a.href && <span className="lg-ago">ver →</span>}</>;
            return a.href ? <Link key={i} href={a.href} className={`lg-alert ${a.tipo}`}>{body}</Link> : <div key={i} className={`lg-alert ${a.tipo}`}>{body}</div>;
          })}
        </section>
      )}

      <section className="lg-kpis">
        <Kpi i={0} label="Visitas no site" value={fmt(r.visitas)} cur={r.visitas} prev={x.anterior.visitas} spark={r.por_dia.map(v => v.visitas)} hint={`${fmt(r.visitantes)} visitantes diferentes`} />
        <Kpi i={1} label="Demos abertas" value={fmt(r.demos_abertas)} cur={r.demos_abertas} prev={x.anterior.demos} spark={r.por_dia.map(v => v.demos)} hint={`${fmt(r.demos_interacao)} testaram de verdade`} />
        <Kpi i={2} label="Cliques no WhatsApp" value={fmt(r.cliques_whatsapp)} cur={r.cliques_whatsapp} prev={x.anterior.whats} spark={x.whats_por_dia} hint={`${pct(r.cliques_whatsapp, r.visitas)}% das visitas viram conversa`} />
        <Kpi i={3} label="E-mails enviados" value={fmt(x.enviados_periodo)} cur={x.enviados_periodo} prev={x.anterior.enviados}
          hint={<span className="lg-meta"><span>Hoje {x.enviados_hoje}/{META_DIA}</span><span className="lg-track"><span className="lg-fill" style={{ width: `${metaHoje}%` }} /></span></span>} />
      </section>

      <section className="lg-row">
        <div className="lg-card" id="quentes">
          <h3>🔥 Leads quentes</h3>
          <p className="lg-hint">Abriram a demo 2 vezes ou mais e ainda não chamaram no WhatsApp.</p>
          {x.quentes.length ? (
            <table className="lg-table"><thead><tr><th>Empresa</th><th>Segmento</th><th>Demo vista</th><th>Última vez</th></tr></thead>
              <tbody>{x.quentes.map(q => <tr key={q.empresa}><td><b>{q.empresa}</b><br /><span className="lg-hint">{q.cidade}</span></td><td>{RAMO[q.ramo] ?? q.ramo}</td><td>{q.vistas}x</td><td>{ago(q.ult)}</td></tr>)}</tbody></table>
          ) : <p className="lg-empty">Nenhum lead quente agora. Eles aparecem aqui quando alguém volta pra ver a demo.</p>}
        </div>
        <div className="lg-card">
          <h3>Atividade ao vivo</h3>
          <p className="lg-hint">O que aconteceu por último no site e nas demos.</p>
          {x.atividade.length ? (
            <ul className="lg-feed">
              {x.atividade.slice(0, 12).map((a, i) => (
                <li key={i} className={/whatsapp/.test(a.type) ? "hot" : ""}><span>{evento(a)}</span><span className="lg-ago">{ago(a.t)}{a.device ? ` · ${a.device}` : ""}</span></li>
              ))}
            </ul>
          ) : <p className="lg-empty">Sem movimento ainda.</p>}
        </div>
      </section>

      <section className="lg-row">
        <div className="lg-card">
          <h3>Visitas por dia</h3>
          <p className="lg-hint">Passe o mouse nas barras para ver o número do dia.</p>
          <div className="lg-bars" role="img" aria-label={`Visitas por dia nos últimos ${dias} dias`}>
            {r.por_dia.map(v => (
              <div key={v.dia} className="lg-bar" data-tip={`${dia(v.dia)}: ${v.visitas} visita(s), ${v.demos} demo(s)`}
                style={{ height: `${Math.max(v.visitas ? 3 : 0, (v.visitas / maxDia) * 100)}%`, opacity: v.visitas ? 1 : 0.25 }} />
            ))}
          </div>
          <div className="lg-axis"><span>{dia(r.por_dia[0].dia)}</span><span>{dia(r.por_dia[r.por_dia.length - 1].dia)}</span></div>
        </div>
        <div className="lg-card">
          <h3>De onde vieram</h3>
          <p className="lg-hint">Origem das visitas.</p>
          <BarList items={r.origens.map(o => ({ label: ORIGEM[o.origem] ?? o.origem, n: o.n }))} empty="Ainda sem visitas registradas." />
          {totDisp > 0 && (
            <>
              <p className="lg-label" style={{ marginTop: 18 }}>Dispositivo</p>
              <div className="lg-split">
                {Object.entries(disp).map(([k, n]) => <div key={k} style={{ flex: n }} title={`${k}: ${n}`}><span>{k} {pct(n, totDisp)}%</span></div>)}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="lg-card" style={{ marginBottom: 14 }}>
        <h3>Desempenho por segmento</h3>
        <p className="lg-hint">Qual tipo de empresa responde melhor à prospecção. Use pra decidir onde mandar mais.</p>
        {x.segmentos.length ? (
          <table className="lg-table">
            <thead><tr><th>Segmento</th><th>Enviados</th><th>Voltaram</th><th>Abriram a demo</th><th>Chamaram</th><th>Responderam</th><th>Interesse</th></tr></thead>
            <tbody>{x.segmentos.map(s => {
              const validos = s.enviados - s.invalidos, interesse = pct(s.demos + s.responderam, validos);
              return (
                <tr key={s.ramo}><td><b>{RAMO[s.ramo] ?? s.ramo}</b></td><td>{s.enviados}</td>
                  <td>{s.invalidos ? <span className={`lg-pill ${pct(s.invalidos, s.enviados) > 10 ? "bad" : "warn"}`}>{s.invalidos}</span> : 0}</td>
                  <td>{s.demos}</td><td>{s.whats}</td><td>{s.responderam}</td>
                  <td><span className="lg-mini"><span className="lg-track"><span className="lg-fill" style={{ width: `${Math.min(100, interesse)}%` }} /></span>{interesse}%</span></td></tr>
              );
            })}</tbody>
          </table>
        ) : <p className="lg-empty">Sem envios ainda.</p>}
        {x.cidades.length > 0 && <p className="lg-hint" style={{ margin: "12px 0 0" }}>Por cidade: {x.cidades.map(c => `${c.cidade} ${c.enviados}`).join(" · ")}</p>}
      </section>

      <section className="lg-row3">
        <div className="lg-card">
          <h3>Funil da prospecção</h3>
          <p className="lg-hint">Do e-mail até a venda.</p>
          <BarList items={[
            { label: "Enviados", n: p.enviados - p.invalidos },
            { label: "Abriram a demo", n: r.empresas_demo.length },
            { label: "Chamaram", n: r.empresas_demo.filter(e => e.whats).length },
            { label: "Responderam", n: p.responderam },
            { label: "Fechados", n: pipe.fechado ?? 0 },
          ]} empty="" />
        </div>
        <div className="lg-card">
          <h3>Pipeline de vendas</h3>
          <p className="lg-hint">{brl(x.pipeline_valor)} em negociação · {brl(x.fechado_valor)} fechado</p>
          <BarList items={ETAPAS.map(([k, l]) => ({ label: l, n: pipe[k] ?? 0 }))} empty="" />
          <Link href="/gestao/pipeline" className="lg-link">Abrir pipeline →</Link>
        </div>
        <div className="lg-card">
          <h3>Demos mais abertas</h3>
          <p className="lg-hint">Qual demonstração chama mais atenção.</p>
          <BarList items={r.demos.map(v => ({ label: DEMO[v.demo] ?? v.demo, n: v.n }))} empty="Nenhuma demo aberta no período." />
        </div>
      </section>
    </>
  );
}
