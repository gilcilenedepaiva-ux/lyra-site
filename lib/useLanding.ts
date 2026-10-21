"use client";
import { useEffect, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";

const WHATSAPP = "5562994643122";

const pData = [
  { title: "Sistemas Web & Apps", sub: "Seu sistema, do jeito que a sua empresa trabalha.", desc: "Criamos o sistema ou o aplicativo sob medida, para você parar de se adaptar a ferramentas que não servem e ter tudo funcionando do seu jeito.", items: ["Sites, plataformas e apps para celular", "Conexão com os sistemas que você já usa", "Uma base pensada para crescer com você"], out: "Sistema no ar e funcionando" },
  { title: "BI & Painéis em Power BI", sub: "Todos os números, numa tela só.", desc: "Juntamos os dados que hoje estão espalhados e transformamos em painéis fáceis de entender, para você decidir olhando uma tela só.", items: ["Painéis claros para a diretoria e para o dia a dia", "Relatórios que se atualizam sozinhos", "Indicadores definidos junto com a sua equipe"], out: "Painéis prontos e sempre atualizados" },
  { title: "Implementação de Sistemas", sub: "A troca de sistema sem dor de cabeça.", desc: "Colocamos o sistema novo para rodar sem susto, cuidando da troca, dos dados e da conexão entre todas as ferramentas.", items: ["Migração dos dados do sistema antigo", "Integração com ERP, CRM e outras ferramentas", "Acompanhamento no dia da virada e depois dela"], out: "Operação nova rodando com segurança" },
  { title: "Treinamentos", sub: "Equipe segura para usar tudo.", desc: "Ensinamos a sua equipe a usar as ferramentas no dia a dia, para o conhecimento ficar dentro da empresa.", items: ["Power BI na prática, com dados da sua rotina", "Treino nas ferramentas que implantamos", "Autonomia para operar e evoluir sem depender de terceiros"], out: "Equipe preparada e autônoma" },
];

const lines = [
  "sync erp.pedidos → core  ✓ 1.284 regs",
  "deploy app/portal v2.4  ✓ 0 erros",
  "refresh bi.dashboard_vendas ✓ 3.1s",
  "migrate sistema_legado → cloud ✓",
  "trilha treinamento.powerbi  ✓ 18 alunos",
  "webhook crm.lead_novo → app ✓",
];

const stepData = [
  { code: "D-01", title: "Diagnóstico", detail: "Mapeamos processos, sistemas e dados para localizar gargalos e definir prioridades com a sua equipe.", output: "Mapa de oportunidades", items: ["Imersão na operação", "Levantamento de requisitos", "Critérios de sucesso"] },
  { code: "A-02", title: "Arquitetura", detail: "Conectamos requisitos a uma solução técnica: estrutura, integrações, dados e etapas de entrega.", output: "Blueprint da solução", items: ["Desenho das integrações", "Modelo de dados", "Plano de execução"] },
  { code: "C-03", title: "Construção", detail: "Desenvolvemos em ciclos curtos, com testes e validações para manter a solução alinhada ao negócio.", output: "Solução validada", items: ["Desenvolvimento iterativo", "Testes de qualidade", "Validação com a equipe"] },
  { code: "I-04", title: "Implantação", detail: "Preparamos a transição, migramos dados e acompanhamos a entrada em operação com a equipe.", output: "Operação assistida", items: ["Migração de dados", "Go-live acompanhado", "Capacitação dos usuários"] },
  { code: "E-05", title: "Evolução", detail: "Acompanhamos a utilização e os indicadores para priorizar melhorias que gerem valor contínuo.", output: "Plano de evolução", items: ["Acompanhamento de indicadores", "Melhorias contínuas", "Autonomia da equipe"] },
];

const scenarios = [
  { cat: "OPERAÇÃO & SISTEMAS", title: "Do retrabalho ao fluxo conectado.", sol: "Sistemas Web & Apps + Implementação", before: "Pedidos em planilhas, redigitação no ERP e acompanhamento manual de cada etapa.", after: "Uma plataforma integrada centraliza pedidos, automatiza tarefas e dá visibilidade à operação.", impact: "Tempo devolvido à operação", metrics: "Horas de trabalho manual / mês · Taxa de retrabalho", evidence: "Comparar o tempo e os erros do processo antes e após a integração." },
  { cat: "INTELIGÊNCIA DE NEGÓCIO", title: "De dados dispersos à decisão clara.", sol: "BI & Painéis em Power BI", before: "Relatórios montados à mão, versões divergentes e pouca clareza sobre os indicadores.", after: "Power BI reúne as fontes em um painel executivo, com atualização automatizada e indicadores padronizados.", impact: "Decisões com dados confiáveis", metrics: "Tempo de fechamento · Frequência de atualização", evidence: "Medir o prazo para disponibilizar o relatório e a atualidade dos dados." },
  { cat: "EQUIPE & AUTONOMIA", title: "Da dependência à autonomia.", sol: "Treinamentos + Implementação", before: "A equipe depende de terceiros para consultar dados, ajustar relatórios e usar o sistema.", after: "Treinamento aplicado à rotina permite operar ferramentas e evoluir análises com independência.", impact: "Conhecimento dentro da empresa", metrics: "Chamados de suporte · Tarefas realizadas sem auxílio", evidence: "Acompanhar a demanda de suporte e a execução independente pela equipe." },
];
const shorts = ["Operação e sistemas", "Inteligência de negócio", "Equipe e autonomia"];

const reqData = [
  { title: "Falar com um especialista", desc: "Uma conversa objetiva para entender o seu cenário e indicar o melhor caminho." },
  { title: "Agendar um diagnóstico", desc: "Mapeamos processos, sistemas e dados para priorizar o que gera mais valor." },
];
const serviceNames = ["Sistemas Web & Apps", "BI / Power BI", "Implementação", "Treinamentos"];

type Status = "idle" | "sending" | "sent";

export function useLanding() {
  const [tick, setTick] = useState(0);
  const [active, setActive] = useState(0);
  const [sel, setSel] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errs, setErrs] = useState<{ n?: boolean; e?: boolean; m?: boolean; s?: boolean }>({});
  const [serverErr, setServerErr] = useState("");
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const [pil, setPil] = useState(0);
  const [manual, setManual] = useState(false);
  const [cen, setCen] = useState(0);
  const [dep, setDep] = useState(false);
  const [req, setReq] = useState("Falar com um especialista");
  const [name, setNameV] = useState("");
  const [email, setEmailV] = useState("");
  const [company, setCompanyV] = useState("");
  const [message, setMessageV] = useState("");
  const [website, setWebsiteV] = useState("");

  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 1800);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (manual) return;
    const p = setInterval(() => setPil((v) => (v + 1) % 4), 6500);
    return () => clearInterval(p);
  }, [manual]);

  const pils = pData.map((d, i) => ({
    n: "0" + (i + 1), title: d.title, on: i === pil,
    color: i === pil ? "#4FFAFF" : "#9AA6BF",
    border: i === pil ? "#1AE0FF" : "rgba(0,168,255,.4)",
    glow: i === pil ? "4px 4px 0 #1AE0FF" : "none",
    auto: i === pil && !manual, held: i === pil && manual,
    pick: () => { setPil(i); setManual(true); },
  }));
  const pc = pData[pil];
  const cp = { n: "0" + (pil + 1), title: pc.title, sub: pc.sub, desc: pc.desc, out: pc.out, items: pc.items.map((t) => ({ t })) };
  const heroT = "rotateY(" + (-10 + mx * 14).toFixed(2) + "deg) rotateX(" + (5 - my * 10).toFixed(2) + "deg)";
  const logs = [0, 1, 2, 3].map((k) => ({ text: lines[(tick + k) % lines.length], last: k === 3, color: k === 3 ? "#EAEFFA" : "#9AA6BF" }));

  const steps = stepData.map((d, i) => ({
    n: "0" + (i + 1), code: d.code, title: d.title, on: i === active,
    color: i === active ? "#0551BA" : "#0A1F3B",
    bg: i === active ? "#D6E4FB" : "#F8FAFE",
    border: i === active ? "#0566E8" : "#0A1F3B",
    glow: i === active ? "4px 4px 0 #0566E8" : "4px 4px 0 rgba(10,31,59,.2)",
    more: i < stepData.length - 1,
    pick: () => setActive(i),
  }));
  const d = stepData[active];
  const cur = { n: "0" + (active + 1), title: d.title, detail: d.detail, output: d.output, items: d.items.map((t) => ({ t })) };

  const bef = !dep;
  const cens = scenarios.map((c, i) => ({
    n: "0" + (i + 1), short: shorts[i], on: i === cen,
    color: i === cen ? "#4FFAFF" : "#9AA6BF",
    border: i === cen ? "#1AE0FF" : "rgba(0,168,255,.4)",
    glow: i === cen ? "4px 4px 0 #1AE0FF" : "none",
    pick: () => { setCen(i); setDep(false); },
  }));
  const cs = scenarios[cen];
  const cc = {
    cat: cs.cat, title: cs.title, sol: cs.sol, impact: cs.impact, metrics: cs.metrics, evidence: cs.evidence,
    text: bef ? cs.before : cs.after, lab: bef ? "Antes" : "Depois",
    bar: bef ? "rgba(234,239,250,.25)" : "#1AE0FF", labColor: bef ? "#9AA6BF" : "#4FFAFF",
    textColor: bef ? "rgba(234,239,250,.72)" : "#EAEFFA",
  };

  const reqs = reqData.map((r) => ({
    title: r.title, desc: r.desc, on: r.title === req,
    pick: () => setReq(r.title),
  }));
  const services = serviceNames.map((label) => {
    const on = sel.includes(label);
    return {
      label, on,
      bg: on ? "#0566E8" : "transparent",
      fg: on ? "#EAEFFA" : "#0A1F3B",
      bd: on ? "#0566E8" : "#9FB0CC",
      mark: on ? "✓ " : "",
      toggle: () => setSel(on ? sel.filter((x) => x !== label) : sel.concat(label)),
    };
  });

  const summary =
    "Solicitação: " + req + "\nSoluções: " + sel.join(", ") + "\nNome: " + name + "\nE-mail: " + email +
    (company ? "\nEmpresa: " + company : "") + "\nDesafio: " + message;
  const waLink = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent("Olá, Lyra! Vim pelo site e gostaria de conversar.\n\n" + summary);

  const submit = async () => {
    if (status === "sending") return;
    const e = {
      n: name.trim().length < 2,
      e: !/^\S+@\S+\.\S+$/.test(email.trim()),
      m: message.trim().length < 10,
      s: sel.length === 0,
    };
    setErrs(e);
    setServerErr("");
    if (e.n || e.e || e.m || e.s) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message, services: sel, request: req, website }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Não foi possível enviar agora.");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setServerErr((err instanceof Error ? err.message : "Não foi possível enviar agora.") + " Se preferir, fale com a gente pelo WhatsApp.");
    }
  };

  const onInput = (set: (v: string) => void) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(ev.target.value);

  return {
    logs, steps, cur, services, reqs, req, cens, cc,
    showBefore: () => setDep(false), showAfter: () => setDep(true),
    isBefore: bef, isAfter: !bef,
    bgBefore: bef ? "#0566E8" : "transparent", fgBefore: bef ? "#EAEFFA" : "#9AA6BF",
    bgAfter: !bef ? "#0566E8" : "transparent", fgAfter: !bef ? "#EAEFFA" : "#9AA6BF",
    pils, cp, v0: pil === 0, v1: pil === 1, v2: pil === 2, v3: pil === 3,
    heroT,
    heroMove: (ev: MouseEvent<HTMLElement>) => {
      const r = ev.currentTarget.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      if (Math.abs(x - mx) > 0.03 || Math.abs(y - my) > 0.03) { setMx(x); setMy(y); }
    },
    heroLeave: () => { setMx(0); setMy(0); },
    sent: status === "sent", editing: status !== "sent",
    errN: !!errs.n, errE: !!errs.e, errM: !!errs.m, errS: !!errs.s,
    serverErr, sendLabel: status === "sending" ? "Enviando..." : "Enviar contato →",
    name, email, company, message, website,
    setName: onInput(setNameV), setEmail: onInput(setEmailV), setCompany: onInput(setCompanyV),
    setMessage: onInput(setMessageV), setWebsite: onInput(setWebsiteV),
    submit, reset: () => setStatus("idle"), summary, waLink, braces: "{ }",
  };
}
