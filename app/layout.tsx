import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Photo Restoration Service - Get Old Photos Restored | Photo-Restorer.com",
  description:
    "Professional photo restoration service to restore old pictures, repair damaged photos, and enhance vintage photographs. AI-powered photo restoration. Where can I get old photos restored? Start here with 1 FREE restoration.",
  keywords: [
    "photo restoration service",
    "where can i get old photos restored",
    "restore old pictures",
    "photo restoration services",
    "repair damaged photos",
    "vintage photo restoration",
    "how to restore old photos",
    "professional photo restoration",
    "restore old photographs",
    "damaged photo repair",
    "antique photo restoration",
    "where to get old photos restored",
    "photo repair service",
    "restore pictures",
    "old photo restoration",
  ],
  authors: [{ name: "Photo Restorer" }],
  creator: "Photo Restorer Professional Services",
  publisher: "Photo-Restorer.com",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://photo-restorer.com",
    title:
      "Professional Photo Restoration Service - Restore Old Pictures & Damaged Photos",
    description:
      "Get your old photos restored professionally. AI-powered photo restoration service repairs damaged pictures, restores vintage photographs, and enhances old family photos. Try 1 FREE restoration.",
    siteName: "Photo-Restorer.com - Professional Photo Restoration Services",
    images: [
      {
        url: "https://photo-restorer.com/images/og-photo-restoration-service.jpg",
        width: 1200,
        height: 630,
        alt: "Before and after photo restoration service - damaged vintage photo restored to perfect condition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Restoration Service - Restore Old Pictures & Damaged Photos",
    description:
      "Professional AI photo restoration service. Restore old pictures, repair damaged photos. Where can I get old photos restored? Start here - 1 FREE!",
    images: [
      "https://photo-restorer.com/images/og-photo-restoration-service.jpg",
    ],
    creator: "@PhotoRestorer", // Update with your handle
  },
  alternates: {
    canonical: "https://photo-restorer.com",
  },
  verification: {
    google: "your-google-search-console-verification-code",
  },
};

// Enhanced Schema Markup for Photo Restoration Service
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Photo Restorer - Professional Photo Restoration Service",
      description:
        "AI-powered photo restoration service that professionally restores old pictures, repairs damaged photos, and enhances vintage photographs. Professional photo restoration services online.",
      url: "https://photo-restorer.com",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description:
          "Free photo restoration service trial - restore your first old picture free",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "1500",
        bestRating: "5",
        worstRating: "1",
      },
      featureList: [
        "Professional photo restoration service",
        "Restore old pictures and photographs",
        "Repair damaged photos",
        "Vintage photo restoration",
        "AI-powered photo enhancement",
        "Water damage photo repair",
        "Scratch and tear removal",
        "Color restoration for faded photos",
      ],
    },
    {
      "@type": "Service",
      name: "Professional Photo Restoration Service",
      provider: {
        "@type": "Organization",
        name: "Photo-Restorer.com",
        url: "https://photo-restorer.com",
      },
      serviceType: "Photo Restoration and Repair",
      description:
        "Professional photo restoration services to restore old pictures, repair damaged photographs, and enhance vintage family photos using advanced AI technology.",
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Photo Restoration Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Basic Photo Restoration",
            },
            price: "0",
            priceCurrency: "USD",
            description: "Free trial to restore old pictures",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Professional Photo Restoration Package",
            },
            price: "10",
            priceCurrency: "USD",
            description:
              "5 photo restorations for old pictures and damaged photos",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Where can I get old photos restored?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can get old photos restored right here at Photo-Restorer.com. Our professional photo restoration service uses AI to restore old pictures, repair damaged photos, and enhance vintage photographs online.",
          },
        },
        {
          "@type": "Question",
          name: "How to restore old photos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "To restore old photos: 1) Upload your damaged picture, 2) Our AI analyzes and repairs damage automatically, 3) Download your professionally restored photograph. Our photo restoration service handles water damage, scratches, tears, and fading.",
          },
        },
        {
          "@type": "Question",
          name: "How much does photo restoration cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Photo restoration starts FREE for your first picture. Additional restorations cost $2-25 per photo depending on the package. Much more affordable than traditional photo restoration services.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="language" content="English" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />

        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
