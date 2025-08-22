const createNextIntlPlugin = require('next-intl/plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer(
  withNextIntl({
    images: {
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: process.env.NEXT_PUBLIC_IMAGE_URL,
        },
      ],
    },
    experimental: {
      ppr: 'incremental',
    },
    webpack: (config, { dev, isServer }) => {
      if (!dev && !isServer) {
        // 번들 분할 최적화
        config.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            editor: {
              test: /[\\/]node_modules[\\/](react-md-editor|@uiw|codemirror)[\\/]/,
              name: 'editor',
              chunks: 'all',
              priority: 20,
            },
            ui: {
              test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|next-themes)[\\/]/,
              name: 'ui-libs',
              chunks: 'all',
              priority: 15,
            },
            common: {
              test: /[\\/]src[\\/](atoms|molecules|templates|components|lib)[\\/]/,
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
            },
            timeline: {
              test: /[\\/]src[\\/]app[\\/]\(auth\)[\\/](present|past|future|calendar|time)[\\/]/,
              name: 'timeline-pages',
              minChunks: 1,
              chunks: 'all',
              priority: 8,
            },
          },
        };
      }
      return config;
    },
  }),
);
module.exports = nextConfig;
