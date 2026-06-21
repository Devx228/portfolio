/** @type {import('next').NextConfig} */
const defaultDistDir = process.env.NODE_ENV === "development" ? ".next-dev" : ".next-verify";

const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? defaultDistDir,
  poweredByHeader: false,
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/.next/**",
          "**/.next-dev/**",
          "**/.next-verify/**",
          "**/.npm-cache/**",
          "**/.npm-cache-public/**",
          "**/repos/**",
          "**/reference-repos/**",
        ],
      };
    }

    return config;
  },
};

export default nextConfig;
