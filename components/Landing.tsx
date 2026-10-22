"use client";
import { Fragment } from "react";
import { css } from "@/lib/css";
import { useLanding } from "@/lib/useLanding";

export default function Landing() {
  const {
    logs, steps, cur, services, reqs, req, cens, cc,
    showBefore, showAfter, isBefore, isAfter,
    bgBefore, fgBefore, bgAfter, fgAfter,
    pils, cp, v0, v1, v2, v3, v4, heroT, heroMove, heroLeave,
    sent, editing, errN, errE, errM, errS, serverErr, sendLabel,
    name, email, company, message, website,
    setName, setEmail, setCompany, setMessage, setWebsite,
    submit, reset, summary, waLink, braces,
  } = useLanding();
  return (
    <>
<div  className="root" style={css("width:100%;background:#000102;color:#EAEFFA;font-family:'Manrope',system-ui,sans-serif")}>
<div  className="prog" aria-hidden="true"></div>
<svg aria-hidden="true" style={css("position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:90;opacity:.08;mix-blend-mode:overlay")}><filter id="gr"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .9 0"/></filter><rect width="100%" height="100%" filter="url(#gr)"/></svg>

{/* NAV */}
<header style={css("position:sticky;top:0;z-index:50;background:rgba(0,1,2,.78);backdrop-filter:blur(18px);border-bottom:1px solid rgba(234,239,250,.10)")}>
<div style={css("max-width:1920px;margin:0 auto;padding:16px clamp(20px,4vw,110px);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;box-sizing:border-box")}>
<a href="#inicio" aria-label="Lyra Technology and Consulting" style={css("display:flex;align-items:center;gap:12px")}>
<svg viewBox="52 24 494 214" height="54" fill="none" aria-hidden="true" style={css("display:block;height:54px;width:auto")}>
<g fill="#EAEFFA">
<rect x="98.5" y="69.0536" width="3" height="128"/><rect x="113.5" y="52.0536" width="3" height="152"/><rect x="128.5" y="34.0536" width="3" height="177"/><rect x="143.5" y="52.0536" width="3" height="129"/>
<path d="M149.192 230.711C132.192 218.041 105.192 202.041 82.1924 189.041C66.1924 180.041 59.1924 171.041 65.1924 157.041C78.1924 126.041 127.192 91.0414 164.192 77.0414C184.192 69.0414 208.192 59.0414 216.192 72.0414C226.192 89.0414 200.192 118.041 180.192 143.041C157.192 171.041 139.192 200.041 149.192 230.711L133.192 210.041C135.192 185.041 151.192 160.041 170.192 136.041C188.192 114.041 214.192 85.0414 204.192 76.0414C188.192 60.0414 123.192 93.0414 93.1924 121.041C68.1924 144.041 59.1924 164.041 79.1924 179.041C93.1924 190.041 115.192 201.041 133.192 210.041L149.192 230.711Z"/>
<path d="M272.706 101.274H281.506V146.574H318.11V153.782H272.706V101.274Z"/>
<path d="M409.413 101.118C416.407 101.05 423.404 101.021 430.401 101.029C434.843 101.023 441.965 100.791 446.075 101.621C448.352 102.085 450.502 103.039 452.376 104.418C455.537 106.722 457.636 110.203 458.198 114.074C458.814 118.188 457.752 122.377 455.245 125.698C451.073 131.326 445.444 133.158 438.881 134.11C445.209 140.297 452.197 148.064 458.341 154.596L447.321 154.634C442.262 148.337 432.426 138.055 426.69 131.931L424.754 129.748C425.25 129.127 426.056 128.29 426.612 127.677C433.014 127.502 442.227 128.735 446.958 124.223C448.983 122.3 450.149 119.642 450.193 116.849C450.244 110.964 445.745 107.596 440.199 107.414C432.643 107.166 425.036 107.297 417.468 107.309C417.049 122.533 417.54 139.005 417.379 154.39C414.685 154.404 411.893 154.326 409.19 154.287C408.976 137.34 408.961 117.981 409.413 101.118Z"/>
<path d="M511.233 101.265C513.011 102.754 538.189 148.823 541.683 154.902C538.281 154.969 534.882 154.987 531.48 154.955L518.81 131.769C516.535 127.581 513.597 121.79 511.114 117.921L510.689 117.84L510.243 118.484C503.038 130.57 495.383 142.7 488.372 154.819C485.223 154.686 481.473 154.756 478.279 154.746C488.669 137.481 500.305 118.154 511.233 101.265Z"/>
<path d="M379.861 101.123C383.114 101.187 386.37 101.194 389.626 101.144C385.112 106.247 380.571 111.322 375.998 116.371C371.148 121.639 366.36 126.965 361.635 132.349C361.992 138.238 361.692 147.873 361.662 154.032L353.271 154.102C353.327 146.819 353.327 139.537 353.271 132.255C351.882 130.265 348.215 126.145 346.511 124.109L334.424 109.524C333.086 107.911 328.884 102.92 327.977 101.24L337.359 101.245C344.026 109.336 350.969 117.454 357.508 125.594C365.022 117.837 372.144 109.04 379.861 101.123Z"/>
<rect x="245.055" y="79.89" width="1" height="138"/>
</g>
<g stroke="#EAEFFA" strokeWidth="2.1"><circle cx="100" cy="65.0536" r="3.75"/><circle cx="115" cy="48.0536" r="3.75"/><circle cx="130" cy="30.0536" r="3.75"/><circle cx="145" cy="48.0536" r="3.75"/></g>
<g fill="#EAEFFA" fontFamily="Manrope,sans-serif" fontWeight="500" fontSize="14"><text x="273" y="186" textLength="212" lengthAdjust="spacing">TECHNOLOGY &amp;</text><text x="273" y="208" textLength="175" lengthAdjust="spacing">CONSULTING</text></g>
</svg>
</a>
<nav style={css("display:flex;flex-wrap:wrap;align-items:center;gap:32px;font-size:14px;color:#9AA6BF")}>
<a  className="nav-a" href="#solucoes">Soluções</a>
<a  className="nav-a" href="#metodo">Método</a>
<a  className="nav-a" href="#resultados">Resultados</a>
<a  className="nav-a" href="#contato">Contato</a>
<a  className="btn-p" href="#contato" style={css("padding:11px 20px;border-radius:8px;background:#0566E8;color:#EAEFFA;font-weight:600;font-size:14px")}>Falar com especialista</a>
</nav>
</div>
</header>

{/* HERO */}
<section id="inicio" style={css("position:relative;overflow:hidden;background:#050B33;padding:80px 0 96px")}>
<div  className="arch" style={css("position:absolute;inset:0;opacity:.7;-webkit-mask-image:radial-gradient(ellipse at 70% 40%,black,transparent 75%);mask-image:radial-gradient(ellipse at 70% 40%,black,transparent 75%)")}></div>
<div style={css("position:relative;max-width:1920px;margin:0 auto;padding:0 clamp(20px,4vw,110px);display:flex;flex-wrap:wrap;align-items:center;gap:64px;box-sizing:border-box")}>
<div style={css("flex:1 1 480px;min-width:0")}>
<div  className="rise" style={css("display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border:1px solid rgba(234,239,250,.10);border-radius:999px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#9AA6BF")}><span style={css("width:6px;height:6px;border-radius:50%;background:#1AE0FF")}></span>Engenharia de software · Dados · Implantação</div>
<h1  className="rise d1" style={css("margin-top:28px;font-size:clamp(40px,5.4vw,100px);font-weight:700;line-height:1;letter-spacing:-.035em;color:#EAEFFA")}>Sistemas que conectam dados a <span  className="grad" style={css("position:relative;display:inline-block")}>decisões.<svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={css("position:absolute;left:0;bottom:-8px;width:100%;height:14px;overflow:visible")} fill="none" stroke="#1AE0FF" strokeWidth="3" strokeLinecap="round"><path vectorEffect="non-scaling-stroke" d="M3 9 C 40 2, 80 13, 120 6 S 180 9, 197 4"/></svg></span></h1>
<p  className="rise d2" style={css("margin:28px 0 0;max-width:600px;font-size:clamp(16px,1.2vw,21px);line-height:1.7;color:#9AA6BF")}>A Lyra projeta, constrói e implanta a tecnologia que sustenta a sua operação, de apps e sistemas web sob medida a painéis de BI e times treinados para usar tudo isso.</p>
<div  className="rise d3" style={css("margin-top:40px;display:flex;flex-wrap:wrap;gap:12px")}>
<a  className="btn-p" href="#contato" style={css("display:inline-flex;align-items:center;gap:8px;height:48px;padding:0 24px;border-radius:8px;background:#0566E8;color:#EAEFFA;font-weight:600;font-size:16px;box-shadow:4px 4px 0 #00A8FF")}>Iniciar diagnóstico<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
<a  className="btn-o" href="#solucoes" style={css("display:inline-flex;align-items:center;gap:8px;height:48px;padding:0 24px;border-radius:8px;border:1px solid rgba(0,168,255,.5);color:#EAEFFA;font-weight:600;font-size:16px")}>Ver soluções<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></a>
</div>
<dl  className="rise d4" style={css("margin:56px 0 0;max-width:520px;display:flex;gap:0;border-top:1px solid rgba(234,239,250,.10);padding-top:24px")}>
<div style={css("flex:1")}><dt style={css("font-family:'Sora',sans-serif;font-size:24px;color:#EAEFFA")}>5</dt><dd style={css("margin:4px 0 0;font-size:12px;color:#9AA6BF")}>pilares técnicos</dd></div>
<div style={css("flex:1")}><dt  className="c120" aria-label="5" style={css("font-family:'Sora',sans-serif;font-size:24px;color:#EAEFFA;font-variant-numeric:tabular-nums")}></dt><dd style={css("margin:4px 0 0;font-size:12px;color:#9AA6BF")}>etapas no método</dd></div>
<div style={css("flex:1")}><dt style={css("font-family:'Sora',sans-serif;font-size:24px;color:#EAEFFA")}>1</dt><dd style={css("margin:4px 0 0;font-size:12px;color:#9AA6BF")}>equipe do início ao fim</dd></div>
</dl>
</div>

{/* CONSOLE */}
<div  className="rise d2" style={css("flex:1 1 480px;min-width:0;perspective:1600px")} onMouseMove={heroMove} onMouseLeave={heroLeave}>
<div style={css("display:flex;justify-content:flex-end;align-items:flex-end;gap:8px;margin:0 28px 18px;color:#4FFAFF;transform:rotate(-2deg)")}><span style={css("font-family:'Caveat',cursive;font-size:clamp(24px,2vw,32px);line-height:1")}>olha o seu processo rodando</span><svg aria-hidden="true" width="40" height="44" viewBox="0 0 40 44" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4 C 26 4, 36 18, 30 36"/><path d="M22 30 L30 38 L36 26"/></svg></div>
<div style={css(`position:relative;transform-style:preserve-3d;transform:${heroT};transition:transform .25s ease-out`)}>
<div  className="matte" style={css("position:relative;overflow:hidden;border:1px solid rgba(234,239,250,.10);border-radius:12px")}>
<div style={css("display:flex;align-items:center;justify-content:space-between;padding:10px 16px;border-bottom:1px solid rgba(234,239,250,.10)")}>
<div style={css("display:flex;align-items:center;gap:8px")}><span style={css("width:8px;height:8px;border-radius:50%;background:rgba(234,239,250,.2)")}></span><span style={css("width:8px;height:8px;border-radius:50%;background:rgba(234,239,250,.2)")}></span><span style={css("width:8px;height:8px;border-radius:50%;background:rgba(234,239,250,.2)")}></span><span style={css("margin-left:12px;font-family:'JetBrains Mono',monospace;font-size:11px;color:#9AA6BF")}>lyra://orquestrador/producao</span></div>
<span style={css("display:flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#4FFAFF")}><span  className="node" style={css("width:6px;height:6px;border-radius:50%;background:#4FFAFF")}></span>live</span>
</div>
<div  className="arch" style={css("position:relative;overflow:hidden")}>
<svg viewBox="0 0 520 340" style={css("display:block;width:100%")} aria-hidden="true">
<g fill="none" stroke="#00A8FF" strokeOpacity=".18"><path d="M70,70 C165,70 165,170 260,170"/><path d="M70,170 C165,170 165,170 260,170"/><path d="M70,270 C165,270 165,170 260,170"/><path d="M260,170 C355,170 355,70 450,70"/><path d="M260,170 C355,170 355,170 450,170"/><path d="M260,170 C355,170 355,270 450,270"/></g>
<g fill="none" stroke="#1AE0FF" strokeWidth="1.4" strokeDasharray="3 17">
<path  className="flow" d="M70,70 C165,70 165,170 260,170"/><path  className="flow" style={css("animation-delay:.25s")} d="M70,170 C165,170 165,170 260,170"/><path  className="flow" style={css("animation-delay:.5s")} d="M70,270 C165,270 165,170 260,170"/><path  className="flow" style={css("animation-delay:.75s")} d="M260,170 C355,170 355,70 450,70"/><path  className="flow" style={css("animation-delay:1s")} d="M260,170 C355,170 355,170 450,170"/><path  className="flow" style={css("animation-delay:1.25s")} d="M260,170 C355,170 355,270 450,270"/></g>
<circle cx="260" cy="170" r="46" fill="none" stroke="#00A8FF" strokeOpacity=".2" strokeDasharray="2 4"/>
<circle cx="260" cy="170" r="30" fill="#050B33" stroke="#0566E8" strokeWidth="1.5"/>
<circle  className="node" cx="260" cy="170" r="4" fill="#4FFAFF"/>
<text x="260" y="236" textAnchor="middle" fill="#EAEFFA" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="2">LYRA·CORE</text>
<g fontSize="10" fontFamily="JetBrains Mono" fill="#EAEFFA">
<rect x="26" y="55" width="88" height="30" rx="6" fill="#000102" stroke="#EAEFFA" strokeOpacity=".14"/><circle  className="node" cx="38" cy="70" r="2.5" fill="#1AE0FF"/><text x="48" y="73.5">ERP</text>
<rect x="26" y="155" width="88" height="30" rx="6" fill="#000102" stroke="#EAEFFA" strokeOpacity=".14"/><circle  className="node" style={css("animation-delay:.4s")} cx="38" cy="170" r="2.5" fill="#1AE0FF"/><text x="48" y="173.5">CRM</text>
<rect x="26" y="255" width="88" height="30" rx="6" fill="#000102" stroke="#EAEFFA" strokeOpacity=".14"/><circle  className="node" style={css("animation-delay:.8s")} cx="38" cy="270" r="2.5" fill="#1AE0FF"/><text x="48" y="273.5">APIs</text>
<rect x="406" y="55" width="88" height="30" rx="6" fill="#000102" stroke="#EAEFFA" strokeOpacity=".14"/><circle  className="node" style={css("animation-delay:1.2s")} cx="418" cy="70" r="2.5" fill="#1AE0FF"/><text x="428" y="73.5">Web/App</text>
<rect x="406" y="155" width="88" height="30" rx="6" fill="#000102" stroke="#EAEFFA" strokeOpacity=".14"/><circle  className="node" style={css("animation-delay:1.6s")} cx="418" cy="170" r="2.5" fill="#1AE0FF"/><text x="428" y="173.5">Power BI</text>
<rect x="406" y="255" width="88" height="30" rx="6" fill="#000102" stroke="#EAEFFA" strokeOpacity=".14"/><circle  className="node" style={css("animation-delay:2s")} cx="418" cy="270" r="2.5" fill="#1AE0FF"/><text x="428" y="273.5">Operação</text>
</g>
</svg>
<div  className="scan" style={css("position:absolute;left:0;right:0;top:0;height:64px;pointer-events:none;background:linear-gradient(180deg,rgba(0,168,255,.1),transparent)")}></div>
</div>
<div style={css("display:flex;gap:16px;border-top:1px solid rgba(234,239,250,.10);padding:12px 16px")}>
<ul style={css("flex:1;min-width:0;list-style:none;margin:0;padding:0;font-family:'JetBrains Mono',monospace;font-size:11px;line-height:1.7")}>
{logs.map((ln, i_ln) => (<Fragment key={i_ln}><li style={css(`color:${ln.color};white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}><span style={css("color:#00A8FF")}>›</span> {ln.text}{ln.last && (<><span  className="blink" style={css("margin-left:4px;color:#4FFAFF")}>▍</span></>)}</li></Fragment>))}
</ul>
<div style={css("display:flex;flex-direction:column;justify-content:space-between;border-left:1px solid rgba(234,239,250,.10);padding-left:16px;text-align:right")}>
<div><div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#9AA6BF")}>uptime</div><div style={css("font-family:'Sora',sans-serif;font-size:18px")}>99,9%</div></div>
<div><div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#9AA6BF")}>latência</div><div style={css("font-family:'Sora',sans-serif;font-size:18px")}>142ms</div></div>
</div>
</div>
</div>
<div  className="chip" style={css("position:absolute;top:-34px;right:-18px;transform:translateZ(90px)")}><div  className="float" style={css("background:#050B33;border:1px solid rgba(0,168,255,.35);border-radius:8px;padding:12px 14px;display:flex;align-items:flex-end;gap:12px;box-shadow:0 24px 40px -20px #000")}><div style={css("display:flex;align-items:flex-end;gap:3px;height:28px")}><i style={css("width:5px;height:10px;background:#0566E8")}></i><i style={css("width:5px;height:18px;background:#0566E8")}></i><i style={css("width:5px;height:14px;background:#0566E8")}></i><i style={css("width:5px;height:28px;background:#4FFAFF")}></i></div><div><div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.15em;color:#9AA6BF")}>POWER BI</div><div style={css("font-family:'Sora',sans-serif;font-size:14px;color:#EAEFFA")}>dashboard_vendas</div></div></div></div>
<div  className="chip" style={css("position:absolute;bottom:-30px;left:-24px;transform:translateZ(130px)")}><div  className="float" style={css("animation-delay:-3s;background:#050B33;border:1px solid rgba(26,224,255,.4);border-radius:8px;padding:12px 16px;font-family:'JetBrains Mono',monospace;font-size:11px;color:#EAEFFA;box-shadow:0 24px 40px -20px #000")}><span style={css("color:#00A8FF")}>✓</span> deploy app/portal v2.4 · 0 erros</div></div>
<div  className="chip" style={css("position:absolute;top:46%;left:-44px;transform:translateZ(60px)")}><div  className="float" style={css("animation-delay:-1.5s;background:#050B33;border:1px solid rgba(234,239,250,.18);border-radius:8px;padding:10px 14px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;color:#9AA6BF")}>ERP ⇄ CORE · SYNC</div></div>
</div>
</div>
</div>
</section>

{/* FAIXA */}
<div aria-hidden="true" style={css("overflow:hidden;background:#000102;border-bottom:1px solid rgba(234,239,250,.10);padding:18px 0")}>
<div  className="mq" style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#9AA6BF;white-space:nowrap")}><span style={css("padding-right:48px")}>Sistemas Web · Apps · Power BI · APIs · ERP · CRM · Migração · Integrações · Treinamento · Automação ·</span><span style={css("padding-right:48px")}>Sistemas Web · Apps · Power BI · APIs · ERP · CRM · Migração · Integrações · Treinamento · Automação ·</span><span style={css("padding-right:48px")}>Sistemas Web · Apps · Power BI · APIs · ERP · CRM · Migração · Integrações · Treinamento · Automação ·</span><span style={css("padding-right:48px")}>Sistemas Web · Apps · Power BI · APIs · ERP · CRM · Migração · Integrações · Treinamento · Automação ·</span></div>
</div>

{/* BENTO */}
<section id="solucoes" style={css("position:relative;overflow:hidden;background:#000102;padding:104px 0;scroll-margin-top:80px")}>
<div  className="arch" style={css("position:absolute;inset:0;opacity:.5;-webkit-mask-image:radial-gradient(ellipse at 20% 0%,black,transparent 70%);mask-image:radial-gradient(ellipse at 20% 0%,black,transparent 70%)")}></div>
<div style={css("position:relative;max-width:1920px;margin:0 auto;padding:0 clamp(20px,4vw,110px);box-sizing:border-box")}>
<div style={css("display:flex;align-items:center;gap:12px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#00A8FF")}><span>01</span><span aria-hidden="true">/</span><span>Matriz de soluções</span></div>
<div  className="rv" style={css("margin-top:16px;max-width:760px;display:flex;flex-direction:column;gap:20px")}>
<h2 style={css("font-size:clamp(32px,4vw,72px);font-weight:700;line-height:1.05;letter-spacing:-.025em")}>Cinco especialidades.<br />Uma operação <span style={css("position:relative;display:inline-block")}>integrada.<svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={css("position:absolute;left:0;bottom:-8px;width:100%;height:14px;overflow:visible")} fill="none" stroke="#1AE0FF" strokeWidth="3" strokeLinecap="round"><path vectorEffect="non-scaling-stroke" d="M3 9 C 40 2, 80 13, 120 6 S 180 9, 197 4"/></svg></span></h2>
<p style={css("margin:0;max-width:540px;font-size:17px;line-height:1.7;color:#9AA6BF")}>Da construção à autonomia da equipe. A arquitetura completa para o seu negócio.</p>
<div style={css("display:flex;align-items:flex-start;gap:8px;color:#4FFAFF;transform:rotate(-2deg);transform-origin:left center")}><span style={css("font-family:'Caveat',cursive;font-size:clamp(24px,2vw,30px);line-height:1.1")}>clica num pilar pra ver por dentro</span><svg aria-hidden="true" width="40" height="44" viewBox="0 0 40 44" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={css("flex:none")}><path d="M6 4 C 26 4, 36 18, 30 36"/><path d="M22 30 L30 38 L36 26"/></svg></div>
</div>

<ol  className="rv" style={css("list-style:none;margin:40px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:8px")}>
{pils.map((p, i_p) => (<Fragment key={i_p}>
<li style={css("position:relative;flex:1 1 220px;min-width:0")}>
<button type="button" onClick={p.pick} aria-pressed={p.on} style={css(`width:100%;cursor:pointer;background:transparent;border:0;padding:12px;display:flex;flex-direction:column;align-items:center;gap:12px;color:${p.color};font-family:'Manrope',sans-serif;min-height:44px`)}>
<span style={css(`width:48px;height:48px;border-radius:6px;background:#050B33;border:1px solid ${p.border};box-shadow:${p.glow};display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:13px`)}>{p.n}</span>
<span style={css("text-align:center")}><span style={css("display:block;font-family:'JetBrains Mono',monospace;font-size:11px;color:#00A8FF")}>PILAR {p.n}</span><span style={css("display:block;margin-top:4px;font-size:14px;font-weight:600")}>{p.title}</span></span>
</button>
{p.auto && (<><span  className="pgA" style={css("position:absolute;left:0;right:0;bottom:-1px;height:2px;background:#1AE0FF")}></span></>)}
{p.held && (<><span style={css("position:absolute;left:0;right:0;bottom:-1px;height:2px;background:#1AE0FF")}></span></>)}
</li>
</Fragment>))}
</ol>

<div  className="dp rv" aria-live="polite" style={css("display:flex;flex-wrap:wrap;align-items:stretch;gap:32px;border:1.5px solid rgba(234,239,250,.55);border-radius:6px;background:rgba(10,31,59,.45);box-shadow:8px 8px 0 rgba(0,168,255,.4);padding:36px 32px")}>

<div style={css("flex:1 1 280px;min-width:0;display:flex;flex-direction:column;align-items:flex-start;gap:16px")}>
<span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;color:#00A8FF")}>PILAR {cp.n} / {cp.title}</span>
<h3 style={css("font-size:clamp(24px,2.2vw,34px);font-weight:600;line-height:1.2;max-width:480px")}>{cp.sub}</h3>
<p style={css("margin:0;max-width:520px;font-size:15px;line-height:1.7;color:rgba(234,239,250,.88)")}>{cp.desc}</p>
<a  className="cta" href="#contato" style={css("margin-top:8px;font-weight:600;font-size:14px;color:#4FFAFF")}>Conversar sobre isso →</a>
</div>

<div  className="dots p-v" style={css("flex:1.6 1 380px;min-width:0;min-height:260px;box-sizing:border-box;padding:0 12px;overflow:hidden;display:flex;align-items:center;justify-content:center;gap:16px;border:1px solid rgba(234,239,250,.10);border-radius:10px")}>
{v0 && (<>
<div style={css("width:160px;border:1px solid rgba(0,168,255,.3);background:#000102;border-radius:4px;padding:12px;box-sizing:border-box")}><div style={css("display:flex;gap:4px;margin-bottom:12px")}><i style={css("width:4px;height:4px;border-radius:50%;background:#00A8FF")}></i><i style={css("width:4px;height:4px;border-radius:50%;background:rgba(234,239,250,.2)")}></i><i style={css("width:4px;height:4px;border-radius:50%;background:rgba(234,239,250,.2)")}></i></div><div style={css("display:flex;gap:8px")}><div style={css("width:28px;display:flex;flex-direction:column;gap:8px;border-right:1px solid rgba(234,239,250,.1);padding-right:8px")}><div style={css("height:4px;background:rgba(0,168,255,.5)")}></div><div style={css("height:4px;background:rgba(234,239,250,.2)")}></div><div style={css("height:4px;background:rgba(234,239,250,.2)")}></div></div><div style={css("flex:1")}><div style={css("height:8px;width:56px;background:rgba(234,239,250,.4)")}></div><div style={css("margin-top:8px;display:flex;gap:4px")}><div style={css("flex:1;height:28px;border-radius:2px;background:rgba(5,102,232,.25)")}></div><div style={css("flex:1;height:28px;border-radius:2px;background:rgba(5,102,232,.25)")}></div><div style={css("flex:1;height:28px;border-radius:2px;background:rgba(5,102,232,.25)")}></div></div></div></div></div>
<span style={css("font-family:'JetBrains Mono',monospace;font-size:14px;color:#1AE0FF")}>{braces}</span>
<div style={css("width:48px;height:96px;border:1px solid rgba(0,168,255,.5);border-radius:8px;background:#000102;display:flex;flex-direction:column;align-items:center;padding:6px;box-sizing:border-box")}><div style={css("height:4px;width:16px;border-radius:2px;background:rgba(234,239,250,.3)")}></div><div style={css("margin:auto 0;width:20px;height:20px;border:1.5px solid #00A8FF;border-radius:4px")}></div><div style={css("height:4px;width:20px;background:rgba(5,102,232,.5)")}></div></div>
</>)}
{v1 && (<>
<div style={css("display:flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:11px;color:#9AA6BF")}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00A8FF" strokeWidth="1.6" aria-hidden="true"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>DADOS</div>
<span style={css("color:#00A8FF")}>→</span>
<div style={css("width:176px;border:1px solid rgba(0,168,255,.3);background:#000102;border-radius:4px;padding:12px;box-sizing:border-box")}><div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;color:#4FFAFF")}>VISÃO EXECUTIVA</div><div style={css("margin-top:12px;height:48px;display:flex;align-items:flex-end;gap:6px")}><div  className="bar" style={css("flex:1;height:16px;border-radius:2px 2px 0 0;background:rgba(0,168,255,.6)")}></div><div  className="bar" style={css("flex:1;height:28px;border-radius:2px 2px 0 0;background:rgba(0,168,255,.6);animation-delay:.3s")}></div><div  className="bar" style={css("flex:1;height:20px;border-radius:2px 2px 0 0;background:rgba(0,168,255,.6);animation-delay:.6s")}></div><div  className="bar" style={css("flex:1;height:36px;border-radius:2px 2px 0 0;background:rgba(0,168,255,.6);animation-delay:.9s")}></div><div  className="bar" style={css("flex:1;height:32px;border-radius:2px 2px 0 0;background:rgba(0,168,255,.6);animation-delay:1.2s")}></div><div  className="bar" style={css("flex:1;height:48px;border-radius:2px 2px 0 0;background:rgba(0,168,255,.6);animation-delay:1.5s")}></div></div></div>
</>)}
{v2 && (<>
<div style={css("width:96px;height:80px;border:1px solid rgba(0,168,255,.25);background:#000102;border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#9AA6BF")}><span style={css("font-size:18px")}>✉</span><span style={css("font-family:'JetBrains Mono',monospace;font-size:11px")}>GATILHO</span></div>
<span style={css("color:#00A8FF")}>→</span>
<div style={css("width:96px;height:80px;border:1px solid rgba(0,168,255,.25);background:#000102;border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#9AA6BF")}><span style={css("font-size:18px;color:#00A8FF")}>⚙</span><span style={css("font-family:'JetBrains Mono',monospace;font-size:11px")}>FLUXO + IA</span></div>
<span style={css("color:#00A8FF")}>→</span>
<div style={css("width:96px;height:80px;border:1px solid rgba(26,224,255,.5);background:#000102;border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#4FFAFF")}><span  className="node" style={css("font-size:18px")}>✓</span><span style={css("font-family:'JetBrains Mono',monospace;font-size:11px")}>AUTOMÁTICO</span></div>
</>)}
{v3 && (<>
<div style={css("width:96px;height:80px;border:1px solid rgba(0,168,255,.25);background:#000102;border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#9AA6BF")}><span style={css("font-size:18px")}>▤</span><span style={css("font-family:'JetBrains Mono',monospace;font-size:11px")}>LEGADO</span></div>
<span style={css("color:#00A8FF")}>→</span>
<div style={css("width:96px;height:80px;border:1px solid rgba(0,168,255,.25);background:#000102;border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#9AA6BF")}><span style={css("font-size:18px;color:#00A8FF")}>⇄</span><span style={css("font-family:'JetBrains Mono',monospace;font-size:11px")}>ERP / CRM</span></div>
<span style={css("color:#00A8FF")}>→</span>
<div style={css("width:96px;height:80px;border:1px solid rgba(26,224,255,.5);background:#000102;border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#4FFAFF")}><span  className="node" style={css("font-size:18px")}>✓</span><span style={css("font-family:'JetBrains Mono',monospace;font-size:11px")}>GO-LIVE</span></div>
</>)}
{v4 && (<>
<div style={css("width:64px;height:64px;border:1px solid rgba(0,168,255,.3);background:#000102;border-radius:50%;display:flex;align-items:center;justify-content:center")}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00A8FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2 9 10-5 10 5-10 5zM6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/></svg></div>
<div style={css("width:176px;display:grid;gap:12px;font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(234,239,250,.8)")}>
<div style={css("display:flex;align-items:center;gap:8px")}><span style={css("color:#00A8FF")}>✓</span>POWER BI<span style={css("margin-left:auto;height:4px;width:48px;border-radius:2px;background:rgba(0,168,255,.5)")}></span></div>
<div style={css("display:flex;align-items:center;gap:8px")}><span style={css("color:#00A8FF")}>✓</span>FERRAMENTAS<span style={css("margin-left:auto;height:4px;width:48px;border-radius:2px;background:rgba(0,168,255,.5)")}></span></div>
<div style={css("display:flex;align-items:center;gap:8px")}><span style={css("color:#00A8FF")}>✓</span>AUTONOMIA<span style={css("margin-left:auto;height:4px;width:32px;border-radius:2px;background:rgba(0,168,255,.5)")}></span></div>
</div>
</>)}
</div>

<div style={css("flex:0.8 1 250px;min-width:0;display:flex;flex-direction:column;gap:20px;border-left:1px solid rgba(0,168,255,.3);padding-left:28px")}>
<div>
<span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;color:#9AA6BF")}>O que você recebe</span>
<ul style={css("list-style:none;margin:14px 0 0;padding:0;display:grid;gap:10px;font-size:14px;line-height:1.5;color:rgba(234,239,250,.9)")}>
{cp.items.map((it, i_it) => (<Fragment key={i_it}><li><span style={css("color:#00A8FF")}>✓</span>&nbsp; {it.t}</li></Fragment>))}
</ul>
</div>
<div>
<span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;color:#9AA6BF")}>No fim, você tem</span>
<p style={css("margin:8px 0 0;font-size:15px;font-weight:600;color:#EAEFFA")}>→ {cp.out}</p>
</div>
</div>

</div>
<div style={css("margin-top:20px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:#9AA6BF")}>Sistemas + dados + integração + pessoas</div>
</div>
</section>

{/* MÉTODO */}
<section id="metodo" style={css("position:relative;background:#EEF2FB;background-image:radial-gradient(rgba(10,31,59,.16) 1px,transparent 1px);background-size:22px 22px;color:#0A1F3B;padding:96px 0 104px;scroll-margin-top:80px")}>
<div style={css("max-width:1920px;margin:0 auto;padding:0 clamp(20px,4vw,110px);box-sizing:border-box")}>
<div style={css("display:flex;align-items:center;gap:12px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#0551BA")}><span>02</span><span aria-hidden="true">/</span><span>Método técnico</span></div>
<div style={css("margin-top:28px;display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px 48px")}>
<h2 style={css("max-width:860px;font-family:'Sora',sans-serif;font-size:clamp(32px,4vw,72px);font-weight:700;line-height:1.06;letter-spacing:-.025em;color:#0A1F3B")}>Do diagnóstico à evolução, <span style={css("position:relative;display:inline-block;color:#0566E8")}>em ciclos validados.<svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={css("position:absolute;left:0;bottom:-10px;width:100%;height:14px;overflow:visible")} fill="none" stroke="#0566E8" strokeWidth="3" strokeLinecap="round"><path vectorEffect="non-scaling-stroke" d="M3 9 C 40 2, 80 13, 120 6 S 180 9, 197 4"/></svg></span></h2>
<div style={css("display:flex;align-items:flex-start;gap:10px;color:#0566E8;transform:rotate(-2deg)")}><span style={css("font-family:'Caveat',cursive;font-size:clamp(26px,2.2vw,34px);line-height:1.1;max-width:240px")}>cinco passos, sem mistério</span><svg aria-hidden="true" width="70" height="56" viewBox="0 0 70 56" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={css("flex:none;margin-top:8px")}><path d="M4 6 C 28 2, 52 16, 60 44"/><path d="M50 36 L60 46 L66 30"/></svg></div>
</div>

<ol style={css("list-style:none;margin:52px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:12px 8px")}>
{steps.map((s, i_s) => (<Fragment key={i_s}>
<li style={css("position:relative;flex:1 1 180px;min-width:0")}>
<button type="button" onClick={s.pick} aria-pressed={s.on} style={css(`width:100%;cursor:pointer;background:transparent;border:0;padding:12px;display:flex;flex-direction:column;align-items:center;gap:14px;color:${s.color};font-family:'Manrope',sans-serif;min-height:44px`)}>
<span style={css(`width:60px;height:60px;border-radius:10px;background:${s.bg};border:2px solid ${s.border};box-shadow:${s.glow};display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500;transition:background .2s,box-shadow .2s`)}>{s.n}</span>
<span style={css("text-align:center")}><span style={css("display:block;font-family:'JetBrains Mono',monospace;font-size:11px;color:#0551BA")}>{s.code}</span><span style={css("display:block;margin-top:4px;font-size:15px;font-weight:700")}>{s.title}</span></span>
</button>
{s.more && (<><span aria-hidden="true" style={css("position:absolute;top:26px;right:-8px;font-size:22px;line-height:1;color:#0A1F3B")}>→</span></>)}
</li>
</Fragment>))}
</ol>

<div aria-live="polite" style={css("margin-top:36px;position:relative;display:flex;flex-wrap:wrap;align-items:center;gap:32px;background:#F8FAFE;background-image:radial-gradient(rgba(5,102,232,.2) 1px,transparent 1px);background-size:18px 18px;border:1.5px solid #0A1F3B;border-radius:6px;box-shadow:8px 8px 0 #0A1F3B;padding:clamp(24px,2.6vw,40px)")}>
<div style={css("flex:1.3 1 320px;min-width:0")}><span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#0551BA")}>ETAPA {cur.n} / {cur.title}</span><p style={css("margin:12px 0 0;max-width:520px;font-size:clamp(16px,1.2vw,19px);line-height:1.7;color:#0A1F3B")}>{cur.detail}</p></div>
<ul style={css("flex:1 1 220px;min-width:0;list-style:none;margin:0;padding:0;display:grid;gap:10px;font-size:15px;color:#3B4A63")}>{cur.items.map((it, i_it) => (<Fragment key={i_it}><li><span style={css("color:#0566E8;font-weight:800")}>✓</span>&nbsp; {it.t}</li></Fragment>))}</ul>
<div style={css("flex:0 1 230px")}><div style={css("padding:14px 18px;background:#BFF3FF;box-shadow:3px 4px 0 rgba(10,31,59,.28);transform:rotate(1.5deg)")}><span style={css("font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#0A1F3B")}>Entregável</span><p style={css("margin:6px 0 0;font-family:'Caveat',cursive;font-size:28px;line-height:1.05;color:#0A1F3B")}>{cur.output}</p></div></div>
</div>

<div style={css("margin-top:22px;display:flex;align-items:center;gap:12px;color:#0566E8")}><svg aria-hidden="true" width="46" height="30" viewBox="0 0 46 30" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M42 6 C 44 24, 12 30, 6 14"/><path d="M2 22 L6 13 L15 17"/></svg><span style={css("font-family:'Caveat',cursive;font-size:26px;line-height:1")}>feedback e validação em todo o ciclo</span></div>
</div>
</section>

{/* RESULTADOS */}
<section id="resultados" style={css("background:#000102;padding:88px 0;scroll-margin-top:80px")}>
<div style={css("max-width:1920px;margin:0 auto;padding:0 clamp(20px,4vw,110px);box-sizing:border-box")}>
<div style={css("display:flex;align-items:center;gap:12px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#00A8FF")}><span>03</span><span aria-hidden="true">/</span><span>Transformação na prática</span></div>
<div style={css("margin-top:16px;display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:20px")}>
<h2 style={css("max-width:820px;font-size:clamp(32px,4vw,72px);font-weight:700;line-height:1.05;letter-spacing:-.025em")}>O valor não está no software.<br />Está no que <span style={css("position:relative;display:inline-block")}>muda no negócio.<svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" style={css("position:absolute;left:0;bottom:-8px;width:100%;height:14px;overflow:visible")} fill="none" stroke="#1AE0FF" strokeWidth="3" strokeLinecap="round"><path vectorEffect="non-scaling-stroke" d="M3 9 C 40 2, 80 13, 120 6 S 180 9, 197 4"/></svg></span></h2>
<p style={css("margin:0;max-width:320px;font-size:12px;line-height:1.7;color:#9AA6BF")}>Cenários ilustrativos de aplicação. Não representam cases ou resultados comprovados de clientes.</p>
</div>

<ol  className="rv" style={css("list-style:none;margin:40px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:8px")}>
{cens.map((c, i_c) => (<Fragment key={i_c}>
<li style={css("position:relative;flex:1 1 240px;min-width:0")}>
<button type="button" onClick={c.pick} aria-pressed={c.on} style={css(`width:100%;cursor:pointer;background:transparent;border:0;padding:12px;display:flex;flex-direction:column;align-items:center;gap:12px;color:${c.color};font-family:'Manrope',sans-serif;min-height:44px`)}>
<span style={css(`width:48px;height:48px;border-radius:6px;background:#050B33;border:1px solid ${c.border};box-shadow:${c.glow};display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:13px`)}>{c.n}</span>
<span style={css("text-align:center")}><span style={css("display:block;font-family:'JetBrains Mono',monospace;font-size:11px;color:#00A8FF")}>CENÁRIO {c.n}</span><span style={css("display:block;margin-top:4px;font-size:14px;font-weight:600")}>{c.short}</span></span>
</button>
{c.on && (<><span style={css("position:absolute;left:0;right:0;bottom:-1px;height:2px;background:#1AE0FF")}></span></>)}
</li>
</Fragment>))}
</ol>

<div  className="rv" aria-live="polite" style={css("display:flex;flex-wrap:wrap;align-items:stretch;gap:32px;border:1.5px solid rgba(234,239,250,.55);border-radius:6px;background:rgba(10,31,59,.45);box-shadow:8px 8px 0 rgba(0,168,255,.4);padding:36px 32px")}>
<div style={css("flex:1 1 260px;min-width:0;display:flex;flex-direction:column;align-items:flex-start;gap:14px")}>
<span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;color:#00A8FF")}>{cc.cat}</span>
<h3 style={css("font-size:clamp(24px,2.2vw,34px);font-weight:600;line-height:1.2;max-width:420px")}>{cc.title}</h3>
<p style={css("margin:0;font-size:13px;color:#9AA6BF")}>Soluções usadas: {cc.sol}</p>
</div>
<div style={css("flex:1.6 1 360px;min-width:0;display:flex;flex-direction:column;gap:20px")}>
<div style={css("display:flex;flex-wrap:wrap;align-items:center;gap:6px 16px")}><div style={css("display:inline-flex;border:1.5px solid rgba(234,239,250,.5);border-radius:6px;padding:3px;gap:3px")}>
<button type="button" onClick={showBefore} aria-pressed={isBefore} style={css(`cursor:pointer;border:0;border-radius:6px;min-height:40px;padding:0 20px;font:600 14px 'Manrope',sans-serif;background:${bgBefore};color:${fgBefore}`)}>Antes</button>
<button type="button" onClick={showAfter} aria-pressed={isAfter} style={css(`cursor:pointer;border:0;border-radius:6px;min-height:40px;padding:0 20px;font:600 14px 'Manrope',sans-serif;background:${bgAfter};color:${fgAfter}`)}>Depois</button>
</div><span style={css("font-family:'Caveat',cursive;font-size:26px;line-height:1;color:#4FFAFF;transform:rotate(-2deg)")}>← troca pra ver a diferença</span></div>
<div style={css(`border-left:3px solid ${cc.bar};padding-left:20px`)}>
<span style={css(`font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${cc.labColor}`)}>{cc.lab}</span>
<p style={css(`margin:12px 0 0;max-width:620px;font-size:clamp(17px,1.5vw,23px);line-height:1.55;color:${cc.textColor}`)}>{cc.text}</p>
</div>
</div>
<div style={css("flex:1 1 260px;min-width:0;border-left:1px solid rgba(0,168,255,.3);padding-left:28px")}>
<span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;color:#9AA6BF")}>O que medimos</span>
<h4 style={css("margin-top:10px;font-size:16px;font-weight:600;color:#EAEFFA")}>{cc.impact}</h4>
<p style={css("margin:12px 0 0;font-size:14px;line-height:1.7;color:rgba(234,239,250,.85)")}>{cc.metrics}</p>
<p style={css("margin:10px 0 0;font-size:13px;line-height:1.7;color:#9AA6BF")}>{cc.evidence}</p>
</div>
</div>

<div style={css("margin-top:32px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;border-top:1px solid rgba(234,239,250,.10);border-bottom:1px solid rgba(234,239,250,.10);padding:20px 0")}><p style={css("margin:0;font-size:14px;color:#9AA6BF")}>Qual dessas transformações faz sentido para a sua empresa?</p><a  className="cta" href="#contato" style={css("font-size:14px;font-weight:600;color:#4FFAFF")}>Conversar sobre meu cenário ↗</a></div>
</div>
</section>

{/* CONTATO */}
<section id="contato" style={css("position:relative;overflow:hidden;background:#EEF2FB;background-image:radial-gradient(rgba(10,31,59,.16) 1px,transparent 1px);background-size:22px 22px;color:#0A1F3B;padding:104px 0 112px;scroll-margin-top:80px")}>
<svg aria-hidden="true" viewBox="0 0 300 220" style={css("position:absolute;top:28px;right:clamp(8px,4vw,90px);width:clamp(140px,22vw,340px);opacity:.55;pointer-events:none")} fill="none" stroke="#0566E8" strokeWidth="1.2" strokeLinecap="round"><path d="M20 160 L74 96 L140 120 L196 52 L270 84 M140 120 L168 188"/><g fill="#EEF2FB" strokeWidth="1.8"><circle cx="20" cy="160" r="5"/><circle cx="74" cy="96" r="7"/><circle cx="140" cy="120" r="5"/><circle cx="196" cy="52" r="8"/><circle cx="270" cy="84" r="4"/><circle cx="168" cy="188" r="4"/></g></svg>
<div style={css("position:relative;max-width:1920px;margin:0 auto;padding:0 clamp(20px,4vw,110px);box-sizing:border-box")}>
<div style={css("display:flex;align-items:center;gap:12px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#0551BA")}><span>04</span><span aria-hidden="true">/</span><span>Vamos conversar</span></div>

<div style={css("margin-top:36px;display:flex;flex-wrap:wrap;align-items:flex-start;gap:clamp(40px,5vw,96px)")}>

<div  className="rv" style={css("flex:1 1 400px;min-width:0")}>
<h2 style={css("font-family:'Sora',sans-serif;font-size:clamp(34px,4.4vw,80px);font-weight:700;line-height:1.05;letter-spacing:-.025em;max-width:720px;color:#0A1F3B")}>Seu processo ainda vive na cabeça de alguém? Vamos <span style={css("position:relative;display:inline-block;white-space:nowrap;color:#0566E8")}>desenhar<svg aria-hidden="true" viewBox="0 0 200 80" preserveAspectRatio="none" style={css("position:absolute;left:-7%;top:-14%;width:114%;height:128%;overflow:visible;pointer-events:none")} fill="none" stroke="#0566E8" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke"><path vectorEffect="non-scaling-stroke" d="M14 46 C 6 18, 70 6, 118 8 C 170 10, 198 28, 190 48 C 183 68, 120 77, 80 73 C 34 69, 4 56, 16 30"/></svg></span> juntos.</h2>

<p style={css("margin:28px 0 0;max-width:500px;font-size:clamp(16px,1.2vw,20px);line-height:1.7;color:#3B4A63")}>Conta pra gente o que está travando o seu dia a dia. A gente responde com um próximo passo claro, sem compromisso e sem enrolação.</p>

<div style={css("margin-top:34px;display:flex;align-items:flex-start;gap:10px;color:#0566E8;transform:rotate(-2deg);transform-origin:left center")}>
<span style={css("font-family:'Caveat',cursive;font-size:clamp(26px,2.2vw,34px);line-height:1.1;max-width:260px")}>leva só dois minutinhos, juro</span>
<svg aria-hidden="true" width="86" height="64" viewBox="0 0 86 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={css("flex:none;margin-top:10px")}><path d="M4 8 C 32 2, 62 18, 74 52"/><path d="M62 42 L74 54 L80 36"/></svg>
</div>

<div style={css("margin-top:40px;max-width:540px")}>
<div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#3B4A63")}>Por onde você quer começar?</div>
<div style={css("margin-top:8px;display:flex;flex-direction:column")}>
{reqs.map((r, i_r) => (<Fragment key={i_r}>
<button type="button" onClick={r.pick} aria-pressed={r.on} style={css("cursor:pointer;text-align:left;display:flex;align-items:flex-start;gap:16px;padding:18px 4px;border:0;border-bottom:1px solid rgba(10,31,59,.18);background:transparent;color:#0A1F3B;font-family:'Manrope',sans-serif")}>
<span style={css("position:relative;flex:none;width:24px;height:24px;margin-top:1px;border:2px solid #0A1F3B;border-radius:4px;background:#F8FAFE;display:flex;align-items:center;justify-content:center")}>{r.on && (<><span style={css("position:absolute;left:3px;top:-14px;font-family:'Caveat',cursive;font-size:34px;line-height:1;color:#0566E8")}>✓</span></>)}</span>
<span><span style={css("display:block;font-size:17px;font-weight:700")}>{r.title}</span><span style={css("display:block;margin-top:4px;font-size:14px;line-height:1.6;color:#3B4A63")}>{r.desc}</span></span>
</button>
</Fragment>))}
</div>
</div>

<div style={css("margin-top:44px;display:flex;flex-wrap:wrap;align-items:center;gap:10px 12px")}>
<span style={css("display:inline-flex;align-items:center;gap:8px")}><span aria-hidden="true" style={css("width:18px;height:18px;border-radius:50%;background:#2FB56B;border:2px solid #0A1F3B")}></span><span style={css("font-size:14px;font-weight:600")}>Você conta</span></span>
<span aria-hidden="true" style={css("color:#0A1F3B;font-size:20px")}>→</span>
<span style={css("padding:8px 14px;border:2px solid #0566E8;border-radius:10px;background:#D6E4FB;font-size:14px;font-weight:600;transform:rotate(-1.5deg)")}>Nós analisamos</span>
<span aria-hidden="true" style={css("color:#0A1F3B;font-size:20px")}>→</span>
<span style={css("padding:8px 14px;border:2px solid #0566E8;border-radius:10px;background:#D6E4FB;font-size:14px;font-weight:600;transform:rotate(1deg)")}>Começamos pelo que rende mais</span>
</div>
</div>

<div  className="rv" style={css("flex:1.1 1 440px;min-width:0;padding-top:14px")}>
<div style={css("position:relative;background:#F8FAFE;background-image:radial-gradient(rgba(5,102,232,.2) 1px,transparent 1px);background-size:18px 18px;color:#0A1F3B;border:1.5px solid #0A1F3B;border-radius:6px;padding:clamp(28px,3vw,48px);box-shadow:8px 8px 0 #0A1F3B;transform:rotate(-.6deg)")}>
<span aria-hidden="true" style={css("position:absolute;top:-15px;left:42px;width:96px;height:28px;background:rgba(0,168,255,.35);transform:rotate(-4deg)")}></span>

{sent && (<>
<div aria-live="polite">
<h3 style={css("font-family:'Sora',sans-serif;font-size:26px;font-weight:700;color:#0A1F3B")}>Recebemos o seu contato!</h3>
<p style={css("margin:12px 0 0;font-size:15px;line-height:1.7;color:#3B4A63")}>Já chegou para a equipe da Lyra e a gente responde em breve. Se preferir falar agora, é só chamar no WhatsApp.</p>
<div style={css("margin-top:20px;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#F8FAFE;border:1.5px solid #0A1F3B;border-radius:6px;padding:18px;color:#0A1F3B")}>{summary}</div>
<div style={css("margin-top:22px;display:flex;flex-wrap:wrap;gap:14px")}>
<a  className="btn-p" href={waLink} target="_blank" rel="noopener" style={css("display:inline-flex;align-items:center;gap:8px;height:54px;padding:0 24px;border-radius:8px;border:2px solid #0A1F3B;background:#0566E8;color:#EAEFFA;font:700 15px 'Manrope',sans-serif;box-shadow:4px 4px 0 #0A1F3B")}>Enviar pelo WhatsApp</a>
</div>
<button type="button" onClick={reset} style={css("margin-top:20px;cursor:pointer;padding:0;border:0;background:transparent;color:#0551BA;font:600 14px 'Manrope',sans-serif;text-decoration:underline")}>Enviar outra mensagem</button>
</div>
</>)}

{editing && (<>
<div style={css("display:flex;flex-direction:column;gap:28px")}>
<div style={css("display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px")}>
<div><div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.16em;color:#3B4A63")}>BRIEFING</div><h3 style={css("margin-top:6px;font-family:'Sora',sans-serif;font-size:clamp(22px,2vw,28px);font-weight:700;color:#0A1F3B")}>Conte seu desafio</h3></div>
<span style={css("padding:6px 14px;background:#BFF3FF;color:#0A1F3B;font-family:'Caveat',cursive;font-size:22px;line-height:1.2;box-shadow:2px 3px 0 rgba(10,31,59,.25);transform:rotate(2deg)")}>{req}</span>
</div>

<fieldset style={css("border:0;margin:0;padding:0")}>
<legend style={css("padding:0;margin-bottom:14px;font-size:14px;font-weight:700")}>O que a sua empresa precisa?</legend>
<div style={css("display:flex;flex-wrap:wrap;gap:10px")}>
{services.map((v, i_v) => (<Fragment key={i_v}>
<button type="button" onClick={v.toggle} aria-pressed={v.on} style={css(`cursor:pointer;min-height:44px;padding:0 16px;border-radius:8px;border:1.5px solid ${v.bd};background:${v.bg};color:${v.fg};font:600 14px 'Manrope',sans-serif;transition:background .2s,border-color .2s`)}>{v.mark}{v.label}</button>
</Fragment>))}
</div>
{errS && (<><p role="alert" style={css("margin:10px 0 0;font-size:13px;color:#B3261E")}>Selecione pelo menos uma solução.</p></>)}
</fieldset>

<div style={css("display:flex;flex-wrap:wrap;gap:24px")}>
<div style={css("flex:1 1 220px")}><label htmlFor="c-name" style={css("font-size:14px;font-weight:700")}>Nome</label><input id="c-name"  className="fld" placeholder="Seu nome" value={name} onChange={setName} />{errN && (<><p role="alert" style={css("margin:8px 0 0;font-size:13px;color:#B3261E")}>Informe seu nome.</p></>)}</div>
<div style={css("flex:1 1 220px")}><label htmlFor="c-email" style={css("font-size:14px;font-weight:700")}>E-mail</label><input id="c-email" type="email"  className="fld" placeholder="voce@empresa.com" value={email} onChange={setEmail} />{errE && (<><p role="alert" style={css("margin:8px 0 0;font-size:13px;color:#B3261E")}>Informe um e-mail válido.</p></>)}</div>
</div>
<div><label htmlFor="c-co" style={css("font-size:14px;font-weight:700")}>Empresa <span style={css("font-weight:400;color:#3B4A63")}>(opcional)</span></label><input id="c-co"  className="fld" placeholder="Nome da empresa" value={company} onChange={setCompany} /></div>
<div><label htmlFor="c-msg" style={css("font-size:14px;font-weight:700")}>Seu desafio</label><textarea id="c-msg" rows={3}  className="fld" placeholder="Conte um pouco sobre sua operação e o que você quer resolver." value={message} onChange={setMessage} style={css("resize:vertical")}></textarea>{errM && (<><p role="alert" style={css("margin:8px 0 0;font-size:13px;color:#B3261E")}>Descreva seu desafio em pelo menos 10 caracteres.</p></>)}</div>
{serverErr && (<><p role="alert" style={css("margin:-8px 0 0;font-size:14px;color:#B3261E")}>{serverErr}</p></>)}
<input tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={website} onChange={setWebsite} style={css("position:absolute;left:-9999px;width:1px;height:1px;opacity:0")} />
<div style={css("display:flex;flex-wrap:wrap;align-items:center;gap:18px")}><button type="button"  className="btn-p" onClick={submit} style={css("cursor:pointer;height:54px;padding:0 30px;border-radius:8px;border:2px solid #0A1F3B;background:#0566E8;color:#EAEFFA;font:700 16px 'Manrope',sans-serif;box-shadow:4px 4px 0 #0A1F3B")}>{sendLabel}</button><span style={css("font-size:13px;color:#3B4A63;max-width:240px;line-height:1.5")}>Usamos seus dados só para responder a este contato.</span></div>
</div>
</>)}

</div>
</div>

</div>
</div>
</section>

{/* FOOTER */}
<footer style={css("background:#000102;border-top:1px solid rgba(234,239,250,.10)")}>
<div style={css("max-width:1920px;margin:0 auto;padding:48px clamp(20px,4vw,110px);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:32px;box-sizing:border-box")}>
<svg viewBox="56 26 174 210" fill="none" role="img" aria-label="Símbolo Lyra" style={css("display:block;height:96px;width:auto")}>
<g fill="#EAEFFA"><rect x="98.5" y="69.0536" width="3" height="128"/><rect x="113.5" y="52.0536" width="3" height="152"/><rect x="128.5" y="34.0536" width="3" height="177"/><rect x="143.5" y="52.0536" width="3" height="129"/>
<path d="M149.192 230.711C132.192 218.041 105.192 202.041 82.1924 189.041C66.1924 180.041 59.1924 171.041 65.1924 157.041C78.1924 126.041 127.192 91.0414 164.192 77.0414C184.192 69.0414 208.192 59.0414 216.192 72.0414C226.192 89.0414 200.192 118.041 180.192 143.041C157.192 171.041 139.192 200.041 149.192 230.711L133.192 210.041C135.192 185.041 151.192 160.041 170.192 136.041C188.192 114.041 214.192 85.0414 204.192 76.0414C188.192 60.0414 123.192 93.0414 93.1924 121.041C68.1924 144.041 59.1924 164.041 79.1924 179.041C93.1924 190.041 115.192 201.041 133.192 210.041L149.192 230.711Z"/></g>
<g stroke="#EAEFFA" strokeWidth="2.1"><circle cx="100" cy="65.0536" r="3.75"/><circle cx="115" cy="48.0536" r="3.75"/><circle cx="130" cy="30.0536" r="3.75"/><circle cx="145" cy="48.0536" r="3.75"/></g>
</svg>
<nav style={css("display:flex;flex-wrap:wrap;gap:12px 32px;font-size:14px;color:rgba(234,239,250,.8)")}><a  className="foot-a" href="#solucoes">Soluções</a><a  className="foot-a" href="#metodo">Método</a><a  className="foot-a" href="#resultados">Resultados</a><a  className="foot-a" href="#contato">Contato</a><a  className="foot-a" href="https://wa.me/5562994643122" target="_blank" rel="noopener">WhatsApp</a><a  className="foot-a" href="mailto:contato@lyratech.com.br">contato@lyratech.com.br</a></nav>
<span style={css("font-family:'Caveat',cursive;font-size:30px;line-height:1;color:#4FFAFF;transform:rotate(-2deg)")}>conectando ideias a resultados</span>
</div>
<div style={css("border-top:1px solid rgba(234,239,250,.10)")}><div style={css("max-width:1920px;margin:0 auto;padding:20px clamp(20px,4vw,110px);display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;font-size:12px;color:#9AA6BF;box-sizing:border-box")}><span>© 2026 Lyra Technology &amp; Consulting. Todos os direitos reservados.</span><a  className="foot-a" href="https://instagram.com/lyratecnology">@lyratecnology</a></div></div>
</footer>

</div>
    </>
  );
}
