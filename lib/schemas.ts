import type { Organization, LocalBusiness, Physician, MedicalOrganization, FAQPage } from "schema-dts"

export const organizationSchema = {
  "@type": "Organization",
  "@id": "https://physioheal.com/#organization",
  name: "PhysioHeal Clinic",
  url: "https://physioheal.com",
  logo: "https://physioheal.com/logo.png",
  image: "https://physioheal.com/og-image.jpg",
  description:
    "Expert physiotherapy clinic with 5+ years experience in orthopedic care, sports injury recovery, and rehabilitation therapy.",
  foundingDate: "2019",
  founder: {
    "@type": "Person",
    name: "Dr. Priya Sharma",
    jobTitle: "Lead Physiotherapist",
    alumniOf: "BPT, MPT Ortho",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-7979855427",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
    areaServed: "IN",
  },
  sameAs: [
    "https://www.facebook.com/physioheal",
    "https://www.instagram.com/physioheal",
    "https://www.linkedin.com/company/physioheal",
  ],
} as unknown as Organization

export const localBusinessSchema = {
  "@type": "LocalBusiness",
  "@id": "https://physioheal.com/#localbusiness",
  name: "PhysioHeal Clinic",
  image: "https://physioheal.com/clinic-exterior.jpg",
  description:
    "Professional physiotherapy clinic offering comprehensive rehabilitation services, sports injury recovery, and orthopedic care.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "E-99, 201, 2nd floor, dhram colony, palam vihar",
    addressLocality: "Gurgaon",
    addressRegion: "Haryana",
    postalCode: "122017",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.5021,
    longitude: 77.046,
  },
  telephone: "+91-7979855427",
  url: "https://physioheal.com",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "17:00",
    },
  ],
  priceRange: "₹₹",
  paymentAccepted: ["Cash", "Credit Card", "UPI", "Bank Transfer"],
  currenciesAccepted: "INR",
} as unknown as LocalBusiness

export const medicalOrganizationSchema = {
  "@type": "MedicalOrganization",
  "@id": "https://physioheal.com/#medicalorganization",
  name: "PhysioHeal Clinic",
  medicalSpecialty: [
    "Physiotherapy",
    "Orthopedic Rehabilitation",
    "Sports Medicine",
    "Pain Management",
    "Neurological Rehabilitation",
  ],
  availableService: [
    {
      "@type": "MedicalTherapy",
      name: "Sports Injury Recovery",
      description: "Specialized treatment for athletes and sports-related injuries",
    },
    {
      "@type": "MedicalTherapy",
      name: "Pain Management",
      description: "Comprehensive pain relief solutions using modern physiotherapy methods",
    },
    {
      "@type": "MedicalTherapy",
      name: "Orthopedic Care",
      description: "Expert care for bone, joint, and muscle conditions",
    },
    {
      "@type": "MedicalTherapy",
      name: "Rehabilitation Therapy",
      description: "Complete rehabilitation programs for post-surgery recovery",
    },
  ],
} as unknown as MedicalOrganization

export const physicianSchema = {
  "@type": "Physician",
  "@id": "https://physioheal.com/#physician",
  name: "Dr. Priya Sharma",
  jobTitle: "Lead Physiotherapist & Founder",
  worksFor: {
    "@type": "MedicalOrganization",
    name: "PhysioHeal Clinic",
  },
  medicalSpecialty: ["Physiotherapy", "Orthopedic Rehabilitation"],
  alumniOf: "BPT, MPT Ortho",
  yearsOfExperience: "5+",
  image: "https://physioheal.com/dr-priya-sharma.jpg",
  description:
    "Expert physiotherapist with 5+ years of experience in orthopedic rehabilitation and sports injury recovery.",
} as unknown as Physician

export const faqSchema = {
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What conditions do you treat at PhysioHeal Clinic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We treat a wide range of conditions including sports injuries, back pain, neck pain, joint problems, post-surgery rehabilitation, neurological conditions, and chronic pain management.",
      },
    },
    {
      "@type": "Question",
      name: "How can I book an appointment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book an appointment through our website, call us at +91-7979855427, or message us on WhatsApp for quick booking.",
      },
    },
    {
      "@type": "Question",
      name: "Do you accept insurance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we accept most major insurance plans. Please contact us to verify your specific insurance coverage.",
      },
    },
    {
      "@type": "Question",
      name: "What are your clinic hours?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We are open Monday to Friday from 9:00 AM to 7:00 PM, and Saturday from 9:00 AM to 5:00 PM. We are closed on Sundays.",
      },
    },
  ],
} as unknown as FAQPage
