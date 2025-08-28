/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337", // <-- your Strapi port
        pathname: "/uploads/**", // Strapi serves images here
      },
      // if you deploy Strapi later, add your production domain too
      // {
      //   protocol: "https",
      //   hostname: "cms.yourdomain.com",
      //   pathname: "/uploads/**",
      // },
    ],
  },
};

export default nextConfig;
