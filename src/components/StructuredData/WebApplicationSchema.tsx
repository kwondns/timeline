import { WEBAPPLICATION_SCHEMA_DATA } from '@/constants/STRUCTURED_DATA';
import { Locale } from '@/i18n/routing';

export default function WebApplicationSchema({ locale }: { locale: Locale }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Timeline',
    description: WEBAPPLICATION_SCHEMA_DATA.descriptions[locale],
    url: `https://time.kwondns.com/${locale}`,
    applicationCategory: 'Productivity',
    browserRequirements: WEBAPPLICATION_SCHEMA_DATA.browserRequirements[locale],
    inLanguage: WEBAPPLICATION_SCHEMA_DATA.langMap,
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: WEBAPPLICATION_SCHEMA_DATA.currencyMap[locale],
      availability: 'https://schema.org/InStock',
    },
    featureList: WEBAPPLICATION_SCHEMA_DATA.featureLists[locale],
    author: {
      '@type': 'Person',
      name: 'kwondns',
      url: 'https://github.com/kwondns',
    },
    dateCreated: '2025-08-21',
    softwareVersion: '1.0.0',
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}
