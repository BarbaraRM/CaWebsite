/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  eslint: {
    ignoreDuringBuilds: true, // 👈 esto evita que ESLint detenga el build en producción
  },
};

module.exports = nextConfig;
