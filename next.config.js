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
        {
          protocol: 'https',
          hostname: 'github.com',
        },
      ],
    },
    experimental: {
      ppr: 'incremental',
      optimizePackageImports: [
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-popover',
        '@radix-ui/react-select',
        '@radix-ui/react-tooltip',
        'lucide-react',
        'date-fns',
      ],
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
    async headers() {
      return [
        {
          source: '/(.*)\\.(ico|png|jpg|jpeg|svg|gif)',
          headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
        },
      ];
    },
    webpack: (config, { dev, isServer }) => {
      if (!dev && !isServer) {
        // 번들 분할 최적화
        config.optimization.splitChunks = {
          chunks: 'all',
          maxSize: 200000,
          cacheGroups: {
            framework: {
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              name: 'framework',
              chunks: 'all',
              priority: 50,
            },
            analytics: {
              test: /[\\/]node_modules[\\/](@vercel\/analytics|@vercel\/speed-insights)[\\/]/,
              name: 'analytics',
              chunks: 'async',
              priority: 45,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            editor: {
              test: /[\\/]node_modules[\\/](react-md-editor|@uiw|codemirror|rehype[\w-]*|remark[\w-]*|react-markdown|refractor|mdast-util-from-markdown|hast-util-select|unified|unist-util-visit|mdast-util-to-hast|hast-util-to-jsx-runtime)[\\/]/,
              name: 'editor',
              chunks: 'async',
              priority: 30,
            },
            recharts: {
              test: /[\\/]node_modules[\\/](recharts|d3-[^/]*|victory-[^/]*)[\\/]/,
              name: 'charts',
              chunks: 'async',
              priority: 40,
              maxSize: 150000, // 150KB로 제한
            },
            intl: {
              test: /[\\/]node_modules[\\/](next-intl|@formatjs|intl-)[\\/]/,
              name: 'intl',
              chunks: 'async',
              priority: 25,
            },
            utils: {
              test: /[\\/]node_modules[\\/](lodash|date-fns|classnames|clsx)[\\/]/,
              name: 'utils',
              chunks: 'all',
              priority: 18,
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
