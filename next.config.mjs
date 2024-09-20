/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.ppy.sh",
        pathname: "/**",
      },      {
        protocol: "https",
        hostname: "storage.ko-fi.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s4.anilist.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "osu.ppy.sh",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.ppy.sh",
        pathname: "/**",
      },{
        protocol: "https",
        hostname: "assets.ppy.sh",
        pathname: "/**",
      },
    ],
    domains: [
      "a.ppy.sh",
      "osu.ppy.sh",
      "b.ppy.sh",
      "assets.ppy.sh",
      "osekai.net"
    ],
  },
  output: "standalone",
};

export default config;
