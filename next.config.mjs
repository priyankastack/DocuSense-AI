// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
//    experimental: {
//     serverComponentsExternalPackages: ["pdfjs-dist"],
//   },
// }

// export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["pdfjs-dist", "mammoth"],
  },
  turbopack: {
    resolveAlias: {
      canvas: { browser: "./empty-module.js" },
      "@napi-rs/canvas": { browser: "./empty-module.js" },
    },
  },
};

export default nextConfig;