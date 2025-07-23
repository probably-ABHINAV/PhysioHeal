import { DefaultSeo } from 'next-seo';

export default function SEO() {
  return (
    <DefaultSeo
      title="PhysioHeal"
      description="AI-powered physiotherapy platform."
      openGraph={{
        type: 'website',
        locale: 'en_US',
        url: process.env.SITE_URL || 'https://yourdomain.com',
        site_name: 'PhysioHeal',
      }}
      twitter={{
        handle: '@yourhandle',
        site: '@yourhandle',
        cardType: 'summary_large_image',
      }}
    />
  );
}
