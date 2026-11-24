"use client";
import { useEffect } from "react";

// Registra visitas e cliques importantes do site no Lyra Gestão (sem IP e sem dados pessoais).
function sid() {
  try {
    let s = sessionStorage.getItem("lyra_sid");
    if (!s) { s = Math.random().toString(36).slice(2) + Date.now().toString(36); sessionStorage.setItem("lyra_sid", s); }
    return s;
  } catch { return "na"; }
}

export function track(type: string, extra: Record<string, string | null | undefined> = {}) {
  try {
    const q = new URLSearchParams(location.search);
    const body = JSON.stringify({ type, sid: sid(), path: location.pathname + location.search, ref: document.referrer || null, utm: q.get("utm_source"), ...extra });
    if (navigator.sendBeacon) navigator.sendBeacon("/api/track", new Blob([body], { type: "text/plain" }));
    else fetch("/api/track", { method: "POST", body, keepalive: true });
  } catch {}
}

export default function Tracker() {
  useEffect(() => {
    if (location.pathname.startsWith("/gestao")) return;
    track("pageview");
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;
      const h = a.getAttribute("href") ?? "";
      if (/wa\.me|whatsapp/.test(h)) track("click_whatsapp");
      else if (/\/login/.test(h)) track("click_entrar");
      else if (/^\/demo/.test(h)) track("click_demo");
      else if (h === "#contato") track("click_contato");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
