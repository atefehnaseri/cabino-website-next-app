/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xqolfzuvdojuevzgizxx.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
        search: "",
      },
    ],
    // Image Optimization through next/image can be used with a static export by defining a custom image loader in next.config.js. For example, you can optimize images with a service like Cloudinary:

    // loader: "custom",
    // loaderFile: "./my-loader.ts",
  },
  // exporting as a SSG
  // output: "export",
};

export default nextConfig;
