/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'http',
            hostname: 'i.annihil.us'
        },
        {
            protocol: 'https',
            hostname: 'cdn.jsdelivr.net'
        },
        {
            protocol: 'https',
            hostname: 'picsum.photos'
        }]
    }
}

module.exports = nextConfig
