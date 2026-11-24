import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLogged } from "@/lib/gestao/auth";
import Nav from "./Nav";
import "../gestao.css";

export const metadata: Metadata = { title: "Lyra Gestão", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PainelLayout({ children }: { children: React.ReactNode }) {
  if (!(await isLogged())) redirect("/gestao/entrar");
  return (
    <div className="lg">
      <div className="lg-grid" />
      <div className="lg-shell">
        <aside className="lg-side">
          <p className="lg-brand">Lyra <b>Gestão</b></p>
          <p className="lg-tag">ÁREA INTERNA</p>
          <Nav />
          <form method="post" action="/api/gestao/sair">
            <button className="lg-out" type="submit">Sair</button>
          </form>
        </aside>
        <main className="lg-main">{children}</main>
      </div>
    </div>
  );
}
