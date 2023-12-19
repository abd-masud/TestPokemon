/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // productionBrowserSourceMaps: true, 
  images:{
    domains:['images.pokemontcg.io']
  },
}

module.exports = nextConfig