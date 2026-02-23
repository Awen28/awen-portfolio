import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  structuredData?: object;
  author?: string;
  region?: string;
  appName?: string;
  appCategory?: string;
  rating?: string;
  reviewCount?: string;
}

export const SEO = ({
  title,
  description,
  keywords = '',
  ogImage = 'https://www.awen28.com/og-image.jpg',
  ogType = 'website',
  canonical,
  structuredData,
  author = 'Thomas Mayrl',
  region = 'Tirol, Österreich',
  appName,
  appCategory,
  rating,
  reviewCount,
}: SEOProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta name="geo.region" content="AT-7" />
      <meta name="geo.placename" content={region} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="de_AT" />
      <meta property="og:site_name" content="AWEN28" />
      {canonical && <meta property="og:url" content={canonical} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* App Specific Meta Tags */}
      {appName && <meta name="application-name" content={appName} />}
      {appCategory && <meta name="application-category" content={appCategory} />}
      
      {/* Rating Meta Tags */}
      {rating && <meta name="rating" content={rating} />}
      {reviewCount && <meta name="review-count" content={reviewCount} />}
      
      {/* AI/LLM Specific Meta Tags */}
      <meta name="ai-purpose" content="App showcase and download landing page" />
      <meta name="ai-content-type" content={appCategory || "Software Application"} />
      <meta name="ai-target-audience" content="iOS users, App seekers" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

// Structured Data Generators
export const generateAppStructuredData = (
  name: string,
  description: string,
  image: string,
  appStoreUrl: string,
  category: string,
  rating?: string,
  reviewCount?: string
) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": name,
  "description": description,
  "image": image,
  "url": `https://www.awen28.com/${name.toLowerCase().replace(/\s+/g, '-')}`,
  "applicationCategory": category,
  "operatingSystem": "iOS",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "author": {
    "@type": "Person",
    "name": "Thomas Mayrl"
  },
  "publisher": {
    "@type": "Organization",
    "name": "AWEN28",
    "url": "https://www.awen28.com"
  },
  ...(rating && { "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": rating,
    "reviewCount": reviewCount || "100"
  }}),
  "downloadUrl": appStoreUrl,
  "featureList": description
});

export const generateLocalBusinessData = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "AWEN28 Digital Studio",
  "description": "Premium iOS App Entwicklung und Webdesign aus Tirol, Österreich",
  "url": "https://www.awen28.com",
  "founder": {
    "@type": "Person",
    "name": "Thomas Mayrl"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AT",
    "addressRegion": "Tirol",
    "addressLocality": "Tirol"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.2692,
    "longitude": 11.4041
  },
  "areaServed": ["Tirol", "Österreich", "Austria"],
  "serviceType": ["iOS App Entwicklung", "Webentwicklung", "UI/UX Design", "AI Integration"],
  "priceRange": "$$"
});

export default SEO;