import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { LoadingScreen } from "@/components/loading-screen";
import { MotionProvider } from "@/components/motion-provider";
import { ContactDock } from "@/components/contact-dock";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const DESCRIPTION =
  "Turnkey pre-engineered steel buildings from Nashik: warehouses, factories, agro sheds and institutional blocks, designed, supplied and erected under one contract.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pre-Engineered Buildings in Nashik | Orion Developers",
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    title: "Pre-Engineered Buildings in Nashik | Orion Developers",
    description: DESCRIPTION,
    images: [
      {
        url: "/photos/site-sunset-completed.jpg",
        width: 736,
        height: 414,
        alt: "Completed Orion pre-engineered building at dusk",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

// Structured data: Orion as a local general contractor with real contacts.
const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: SITE_NAME,
  description: DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/orion-logo.png`,
  image: `${SITE_URL}/photos/site-sunset-completed.jpg`,
  telephone: "+91-70204-75455",
  email: "orionpeb@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1st Floor, Rushiraj Annex, D'Souza Colony, College Road",
    addressLocality: "Nashik",
    addressRegion: "Maharashtra",
    postalCode: "422005",
    addressCountry: "IN",
  },
  areaServed: { "@type": "State", name: "Maharashtra" },
  knowsAbout: [
    "Pre-engineered buildings",
    "Industrial warehouses",
    "Manufacturing facilities",
    "Roofing and cladding",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full w-full flex-col overflow-x-hidden bg-navy pb-[calc(4rem+env(safe-area-inset-bottom))] font-sans text-ink-200 md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_LD).replace(/</g, "\\u003c"),
          }}
        />
        <MotionProvider>
          <LoadingScreen />
          <SmoothScroll />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <ContactDock />
        </MotionProvider>
      </body>
    </html>
  );
}
