import { BUSINESS, SITE_URL } from "@/lib/constants";

/**
 * Local-business / HealthClub structured data (JSON-LD).
 * Rendered server-side into <head> for rich search results.
 */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["HealthClub", "LocalBusiness", "ExerciseGym"],
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    description: BUSINESS.description,
    url: SITE_URL,
    telephone: BUSINESS.phoneDisplay,
    image: `${SITE_URL}/og.png`,
    priceRange: "$$",
    currenciesAccepted: "PKR",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "05:00",
        closes: "23:00",
      },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "06:00", closes: "22:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "07:00", closes: "21:00" },
    ],
    sameAs: ["https://instagram.com", "https://facebook.com", "https://youtube.com"],
  };

  return (
    <script
      type="application/ld+json"
      // Controlled, non-user data — safe to serialize.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
