/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "msszmairnsvdcuwlobdp.supabase.co",
        pathname: "/storage/v1/object/public/floara-images/**",
      },
      {
        protocol: "https",
        hostname: "image.email.argaam.com",
        pathname: "/lib/fe3811737364047f751675/m/1/**",
      },
      {
        protocol: "https",
        hostname: "image.s4.exct.net",
        pathname: "/lib/**",
      },
    ],
  },
};

export default nextConfig;
