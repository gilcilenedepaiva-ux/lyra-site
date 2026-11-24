"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/gestao", label: "Visão geral" },
  { href: "/gestao/pipeline", label: "Pipeline de vendas" },
  { href: "/gestao/emails", label: "E-mails" },
  { href: "/gestao/leads", label: "Leads" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <>
      {ITEMS.map(i => (
        <Link key={i.href} href={i.href} className={`lg-nav${path === i.href ? " on" : ""}`}>{i.label}</Link>
      ))}
      <a className="lg-nav" href="https://appprofix.vercel.app/login" target="_blank" rel="noopener">Abrir o Lyra Hub ↗</a>
    </>
  );
}
