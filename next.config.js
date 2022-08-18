/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["storage.googleapis.com", "lh3.googleusercontent.com"],
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
      destination: "/",
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
      destination: "/",
    },
  ],
};

module.exports = nextConfig;
