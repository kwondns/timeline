// app/sitemap.ts - 모든 공개 페이지 포함
export default function sitemap() {
  const baseUrl = 'https://time.kwondns.com';
  const currentDate = new Date();
  const locales = ['ko', 'en', 'ja', 'fr', 'es', 'zh-cn'];

  const pages = [];

  // 1. 메인 페이지
  pages.push({
    url: baseUrl,
    lastModified: currentDate,
    priority: 1.0,
  });

  // 2. 다국어 메인 페이지들 (6개)
  locales.forEach((locale) => {
    pages.push({
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      priority: 1.0,
    });
  });

  // 3. 다국어 로그인 페이지들 (6개)
  locales.forEach((locale) => {
    pages.push({
      url: `${baseUrl}/${locale}/sign/in`,
      lastModified: currentDate,
      priority: 0.8,
    });
  });

  // 4. 다국어 회원가입 페이지들 (6개)
  locales.forEach((locale) => {
    pages.push({
      url: `${baseUrl}/${locale}/sign/up`,
      lastModified: currentDate,
      priority: 0.8,
    });
  });

  return pages; // 총 19개 페이지
}
