import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  structuredData?: object;
}

export function SEO({
  title,
  description,
  keywords = 'App entwickler tirol, website erstellen tirol, Webagentur, KI agentur tirol, iOS App Entwicklung, Mobile Apps, Web Development',
  image = 'https://awen28.com/og-image.jpg',
  url = 'https://awen28.com',
  type = 'website',
  author = 'Thomas Mayrl - AWEN28',
  structuredData,
}: SEOProps) {
  const fullTitle = `${title} | AWEN28`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="AWEN28" />
      <meta property="og:locale" content="de_AT" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="German" />
      <meta name="revisit-after" content="7 days" />
      <meta name="geo.region" content="AT-7" />
      <meta name="geo.placename" content="Tirol" />
      <meta name="geo.position" content="47.259659;11.404102" />
      <meta name="ICBM" content="47.259659, 11.404102" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
