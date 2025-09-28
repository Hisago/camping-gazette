/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Autorise le build même si eslint échoue
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
