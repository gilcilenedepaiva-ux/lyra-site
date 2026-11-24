/** @type {import("next").NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Demonstrações (arquivos em public/demo):
  // lyratech.com.br/demo, /demo/automacoes e /demo/site
  async rewrites() {
    return [
      { source: "/demo", destination: "/demo/index.html" },
      { source: "/demo/automacoes", destination: "/demo/automacoes.html" },
      { source: "/demo/site", destination: "/demo/site.html" },
    ];
  },
};
export default nextConfig;
