/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            type: 'asset',
            resourceQuery: /url/,
        })

        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                and: [/\.(js|ts)x?$/],
            },
            resourceQuery: { not: [/url/] },
            use: ['@svgr/webpack'],
        })

        return config
    },
}

export default nextConfig
