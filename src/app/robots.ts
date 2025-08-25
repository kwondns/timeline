// app/robots.ts - 다국어 로그인 앱용
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/ko/',
          '/en/',
          '/ja/',
          '/fr/',
          '/es/',
          '/zh-cn/',
          '/ko/sign/',
          '/en/sign/',
          '/ja/sign/',
          '/fr/sign/',
          '/es/sign/',
          '/zh-cn/sign/',
        ],
        disallow: [
          // 모든 언어의 앱 기능들 차단
          '/ko/calendar/',
          '/ko/past/',
          '/ko/current',
          '/en/calendar/',
          '/en/past/',
          '/en/current',
          '/ja/calendar/',
          '/ja/past/',
          '/ja/current',
          '/fr/calendar/',
          '/fr/past/',
          '/fr/current',
          '/es/calendar/',
          '/es/past/',
          '/es/current',
          '/zh-cn/calendar/',
          '/zh-cn/past/',
          '/zh-cn/current',
          '/_next/',
        ],
      },
      // AI 봇 차단
      {
        userAgent: ['Google-Extended', 'GPTBot', 'ClaudeBot', 'PerplexityBot'],
        disallow: '/',
      },
    ],
    sitemap: 'https://time.kwondns.com/sitemap.xml',
  };
}
