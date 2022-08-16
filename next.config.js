/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["storage.googleapis.com"],
  },
  redirects: async () => [
    {
      source: "/auth/login",
      has: [
        {
          type: "header",
          key: "Cookie",
        },
      ],
      permanent: false,
      destination: "/profile",
    },
    {
      source: "/auth/register",
      has: [
        {
          type: "header",
          key: "Cookie",
        },
      ],
      permanent: false,
      destination: "/profile",
    },
  ],
};

module.exports = nextConfig;
