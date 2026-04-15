/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Ensure the leads/ JSON files are bundled into serverless functions
    outputFileTracingIncludes: {
      '/demo/[id]': ['./leads/**/*'],
    },
  },
};

export default nextConfig;
