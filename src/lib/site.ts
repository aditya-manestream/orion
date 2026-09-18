/**
 * Canonical site + organisation details, shared by metadata, the sitemap
 * and the structured-data blocks.
 *
 * Everything here is drawn from content already published on the site
 * (office address, phone numbers, email). Fields we don't have verified
 * values for — GSTIN/CIN, founding year, map coordinates — are
 * deliberately absent rather than guessed, since structured data with
 * invented values is worse than none. See LAUNCH.md.
 */

/**
 * Production origin. Set `NEXT_PUBLIC_SITE_URL` in the hosting environment
 * once the real domain is live; the fallback only keeps local builds and
 * previews coherent and must not be what ships.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://oriondevelopers.in"
).replace(/\/$/, "");

export const SITE_NAME = "Orion Developers";

export const SITE_TAGLINE = "Built to rise. Engineered to last.";

export const SITE_DESCRIPTION =
  "Orion Developers designs, fabricates and erects pre-engineered steel structures — warehouses, factories and industrial sheds — from Nashik, Maharashtra.";

export const ORG = {
  name: SITE_NAME,
  legalName: "Orion Developers",
  email: "orionpeb@gmail.com",
  phones: ["+91 70204 75455", "+91 85301 22776"],
  landline: "0253 691 1208",
  address: {
    street: "1st Floor, Rushiraj Annex, D'Souza Colony, College Road",
    locality: "Nashik",
    region: "Maharashtra",
    postalCode: "422005",
    country: "IN",
  },
} as const;

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
