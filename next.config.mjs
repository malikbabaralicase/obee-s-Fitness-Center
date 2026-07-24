/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // The HTML document itself must always be revalidated. Without this,
        // an intermediate cache (mobile carrier proxy, corporate network, or
        // a browser's aggressive disk cache) can keep serving an old snapshot
        // of the page indefinitely after a redeploy, while separately-hashed
        // asset requests (fonts, chunks) succeed — producing exactly the kind
        // of "half old, half new" render this project hit on some mobile
        // networks. Static assets under /_next/static and /assets are
        // content-hashed or otherwise safe to cache long-term and are
        // unaffected by this rule (it only matches the document route).
        source: "/",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
