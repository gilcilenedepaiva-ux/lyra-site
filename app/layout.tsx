import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lyra Technology & Consulting",
  description:
    "Sistemas web e apps sob medida, painéis em Power BI, implantação de sistemas e treinamentos para a sua equipe.",
  openGraph: {
    title: "Lyra Technology & Consulting",
    description: "Tecnologia que conecta dados a decisões.",
    locale: "pt_BR",
    type: "website",
  },
};
export const viewport: Viewport = { themeColor: "#050B33" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Caveat:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
