
import Script from 'next/script'

export function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "PhysioHeal",
    "alternateName": ["फिजियोहील", "Physio Heal"],
    "url": "https://physio-heal.vercel.app",
    "logo": "https://physio-heal.vercel.app/logo.png",
    "description": "Professional physiotherapy services at home across India. Certified BPT/MPT physiotherapists for back pain, knee pain, sports injuries.",
    "telephone": "+91-98765-43210",
    "email": "contact@physioheal.com",
    "sameAs": [
      "https://www.facebook.com/physioheal",
      "https://www.instagram.com/physioheal",
      "https://www.youtube.com/physioheal"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Health Street",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400001",
      "addressCountry": "IN"
    },
    "areaServed": [
      "Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", 
      "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow"
    ],
    "serviceType": "Physiotherapy",
    "medicalSpecialty": [
      "Physical Therapy",
      "Orthopedic Rehabilitation", 
      "Neurological Physiotherapy",
      "Sports Medicine"
    ],
    "priceRange": "₹299-₹999",
    "paymentAccepted": ["Cash", "UPI", "Credit Card", "Insurance"],
    "currenciesAccepted": "INR",
    "openingHours": "Mo-Su 08:00-20:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2847"
    }
  }

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "PhysioHeal Home Services",
    "image": "https://physio-heal.vercel.app/service-image.jpg",
    "telephone": "+91-98765-43210",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Available across India",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.0760,
      "longitude": 72.8777
    },
    "url": "https://physio-heal.vercel.app",
    "openingHours": "Mo-Su 08:00-20:00",
    "priceRange": "₹₹"
  }

  return (
    <>
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <Script
        id="local-business-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData)
        }}
      />
    </>
  )
}
