import type { CSSProperties } from "react";

// Converte uma string CSS inline ("a:b;c:d") em objeto de estilo do React.
export function css(str: string): CSSProperties {
  const out: Record<string, string> = {};
  let depth = 0;
  let buf = "";
  const decls: string[] = [];
  for (const ch of str) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === ";" && depth === 0) {
      decls.push(buf);
      buf = "";
    } else buf += ch;
  }
  if (buf.trim()) decls.push(buf);
  for (const d of decls) {
    const i = d.indexOf(":");
    if (i < 0) continue;
    const prop = d.slice(0, i).trim();
    const val = d.slice(i + 1).trim();
    if (!prop) continue;
    const key = prop.startsWith("--")
      ? prop
      : prop
          .replace(/^-/, "")
          .replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
          .replace(/^(webkit|moz|ms)/, (m) => m[0].toUpperCase() + m.slice(1));
    out[key] = val.replace(/\s*!important$/, "");
  }
  return out as CSSProperties;
}
