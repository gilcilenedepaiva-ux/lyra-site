// Peças visuais do Lyra Gestão (server components, sem JS no navegador)

export const fmt = (n: number) => (n ?? 0).toLocaleString("pt-BR");
export const brl = (n: number) => (n ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
export const RAMO: Record<string, string> = { saude: "Clínicas", rest: "Restaurantes", loja: "Lojas", beleza: "Salões", imob: "Imobiliárias", geral: "Serviços", contabil: "Contabilidade" };

/** Mini-gráfico de tendência (uma série, sem eixo). */
export function Spark({ data, color = "#1AE0FF" }: { data: number[]; color?: string }) {
  if (!data.length) return null;
  const w = 120, h = 34, max = Math.max(1, ...data);
  const pts = data.map((v, i) => `${(i / Math.max(1, data.length - 1)) * w},${h - 3 - (v / max) * (h - 6)}`);
  return (
    <svg className="lg-spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <polyline points={`0,${h} ${pts.join(" ")} ${w},${h}`} fill={color} opacity={0.12} stroke="none" />
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Variação contra o período anterior. */
export function Delta({ cur, prev }: { cur: number; prev: number }) {
  if (!prev && !cur) return <span className="lg-delta">sem dados antes</span>;
  if (!prev) return <span className="lg-delta up">▲ novo</span>;
  const p = Math.round(((cur - prev) / prev) * 100);
  return <span className={`lg-delta ${p > 0 ? "up" : p < 0 ? "down" : ""}`}>{p > 0 ? "▲" : p < 0 ? "▼" : "="} {Math.abs(p)}% vs período anterior</span>;
}

export function Kpi({ label, value, hint, spark, cur, prev, i = 0 }: { label: string; value: string; hint?: React.ReactNode; spark?: number[]; cur?: number; prev?: number; i?: number }) {
  return (
    <div className="lg-card lg-kpi" style={{ animationDelay: `${i * 0.06}s` }}>
      <p className="lg-label">{label}</p>
      <p className="lg-big">{value}</p>
      {cur !== undefined && prev !== undefined && <Delta cur={cur} prev={prev} />}
      {hint && <p className="lg-hint">{hint}</p>}
      {spark && <Spark data={spark} />}
    </div>
  );
}

export function BarList({ items, empty, fmtN = fmt }: { items: { label: string; n: number; sub?: string }[]; empty: string; fmtN?: (n: number) => string }) {
  if (!items.length) return <p className="lg-empty">{empty}</p>;
  const max = Math.max(...items.map(i => i.n), 1);
  return (
    <div className="lg-list">
      {items.map((i, k) => (
        <div className="lg-li" key={i.label} title={i.sub}>
          <span>{i.label}</span>
          <div className="lg-track"><div className="lg-fill" style={{ width: `${(i.n / max) * 100}%`, animationDelay: `${k * 0.06}s` }} /></div>
          <b>{fmtN(i.n)}</b>
        </div>
      ))}
    </div>
  );
}

export function ago(iso: string) {
  const s = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return "agora";
  if (s < 3600) return `há ${Math.round(s / 60)} min`;
  if (s < 86400) return `há ${Math.round(s / 3600)} h`;
  return `há ${Math.round(s / 86400)} d`;
}
