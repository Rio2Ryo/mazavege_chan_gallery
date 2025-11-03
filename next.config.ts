import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Turbopackを無効化 */
  experimental: {
    turbo: undefined,
  },

  async redirects() {
    return [
      // mothervegetables.org（apex）→ www.mothervegetable.org
      {
        source: "/:path*",
        has: [{ type: "host", value: "mothervegetables.org" }],
        destination: "https://www.mothervegetable.org/:path*",
        permanent: true, // 308
      },
      // www.mothervegetables.org → www.mothervegetable.org
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mothervegetables.org" }],
        destination: "https://www.mothervegetable.org/:path*",
        permanent: true, // 308
      },
    ];
  },

  async rewrites() {
    return [
      // A（mothervegetablemenu.vercel.app）を /achieve-howto 配下にプロキシ
      {
        source: "/achieve-howto",
        destination: "https://mothervegetablemenu.vercel.app/achieve-howto",
      },
      {
        source: "/achieve-howto/:path*",
        destination: "https://mothervegetablemenu.vercel.app/achieve-howto/:path*",
      },
    ];
  },
};

export default nextConfig;
