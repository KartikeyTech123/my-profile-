/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // This fixes assets, links, navigation, client-side routing
  basePath: '/my-profile-',
  assetPrefix: '/my-profile-/',

  // Optional but recommended for cleaner URLs
  // If you ever rename the repo, update these too
};

export default nextConfig;