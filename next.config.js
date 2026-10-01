const path = require("path");

/** @type {import("next").NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
};

module.exports = nextConfig;
