// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack(config, { dev }) {
//     if (dev) {
//       config.devtool = "source-map"; // Enables source maps in development
//     }
//     return config;
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = "eval-source-map"; // Faster alternative for dev mode
    }
    return config;
  },
};

export default nextConfig;
