export default function OrganizationSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'kwondns',
    url: 'https://time.kwondns.com',
    logo: 'https://time.kwondns.com/logo.png',
    description: 'Timeline Developer',
    sameAs: ['https://github.com/kwondns'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'developer',
      url: 'https://github.com/kwondns',
    },
    founder: {
      '@type': 'Person',
      name: 'kwondns',
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}
