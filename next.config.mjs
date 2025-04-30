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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.dropbox.com",
        pathname: "/scl/fi/**", // Match specific URL patterns
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/drive-storage/**",
      },
      {
        protocol: "https",
        hostname: "testcache001.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/image/**", // Adjust based on your URL structure
      },
      {
        protocol: "https",
        hostname: "cache-upload.onrender.com",
        pathname: "/image/data/**", // Adjust if needed
      },
    ],
  },
};

export default nextConfig;
