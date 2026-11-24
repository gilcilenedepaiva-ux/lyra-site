/** @type {import("next").NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // lyratech.com.br/demo -> página de demonstração (public/demo/index.html)
  async rewrites() {
    return [{ source: "/demo", destination: "/demo/index.html" }];
  },
};
export default nextConfig;
