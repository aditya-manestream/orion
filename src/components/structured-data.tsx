import {
  ORG,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";
import type { Project } from "@/lib/projects";

/**
 * Renders a JSON-LD block. The payload is built from our own constants and
 * project data, never from user input.
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: ORG.address.street,
  addressLocality: ORG.address.locality,
  addressRegion: ORG.address.region,
  postalCode: ORG.address.postalCode,
  addressCountry: ORG.address.country,
};

/**
 * Organisation + local-business identity for the site as a whole.
 *
 * Intentionally omits `geo`, `foundingDate` and tax identifiers until the
 * client supplies verified values (see LAUNCH.md) — structured data with
 * invented values is worse than none.
 */
export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        legalName: ORG.legalName,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        logo: absoluteUrl("/orion-logo.png"),
        image: absoluteUrl("/photos/site-sunset-completed.jpg"),
        email: ORG.email,
        telephone: ORG.phones[0],
        address: POSTAL_ADDRESS,
        areaServed: {
          "@type": "State",
          name: "Maharashtra",
        },
        knowsAbout: [
          "Pre-engineered buildings",
          "Industrial warehouses",
          "Manufacturing plants",
          "Steel roofing and cladding",
        ],
      }}
    />
  );
}

/**
 * Breadcrumb trail for a sub-page, so search results show the site's
 * hierarchy rather than a bare URL.
 */
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

/**
 * A delivered structure, described as a completed project of the
 * organisation. Spans, areas and completion dates are not yet available
 * (LAUNCH.md), so no date or size properties are emitted.
 */
export function ProjectSchema({ project }: { project: Project }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": absoluteUrl(`/projects/${project.slug}/#project`),
        name: project.name,
        headline: `${project.name} — ${project.category}`,
        description: project.summary,
        url: absoluteUrl(`/projects/${project.slug}`),
        image: absoluteUrl(project.photo),
        about: project.sector,
        creator: { "@id": `${SITE_URL}/#organization` },
        locationCreated: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressRegion: "Maharashtra",
            addressCountry: "IN",
          },
        },
      }}
    />
  );
}
