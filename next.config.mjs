/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    console.log("Running custom webpack config...");
    return config;
  },
};

export default nextConfig;
