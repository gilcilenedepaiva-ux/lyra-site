import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLogged } from "@/lib/gestao/auth";
import "../gestao.css";

export const metadata: Metadata = { title: "Lyra Gestão", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Entrar({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  if (await isLogged()) redirect("/gestao");
  const { erro } = await searchParams;
  const configurado = Boolean(process.env.GESTAO_SENHA);
  return (
    <div className="lg">
      <div className="lg-grid" />
      <div className="lg-login">
        <form className="lg-card" method="post" action="/api/gestao/login">
          <p className="lg-kick"><span className="lg-dot" />ÁREA INTERNA</p>
          <h1 className="lg-h1">Lyra <span style={{ color: "#1AE0FF" }}>Gestão</span></h1>
          <p className="lg-sub" style={{ marginBottom: 6 }}>Site, prospecção e leads em um lugar só.</p>
          {!configurado && <p className="lg-err">A senha de acesso ainda não foi configurada na Vercel (GESTAO_SENHA).</p>}
          {erro === "1" && <p className="lg-err">Senha incorreta.</p>}
          {erro === "limite" && <p className="lg-err">Muitas tentativas. Tente de novo em 15 minutos.</p>}
          <input type="password" name="senha" placeholder="Senha" autoComplete="current-password" required />
          <button className="lg-btn" style={{ width: "100%", justifyContent: "center" }} type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
