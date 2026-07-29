export type Project = {
  slug: string;
  tag: string;
  name: string;
  category: string;
  sector: string;
  scope: string;
  photo: string;
  summary: string;
  description: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "rajendra-agro",
    tag: "P.01",
    name: "Rajendra Agro",
    category: "Agro processing facility",
    sector: "Agricultural infrastructure",
    scope: "Design · Supply · Erection",
    photo: "/photos/site-blue-warehouse-aerial.jpg",
    summary:
      "A clear-span processing shed engineered for continuous material flow, from intake to storage.",
    description: [
      "Rajendra Agro needed a processing facility that could move raw material in one end and finished stock out the other without a single interior column breaking the flow. Orion's clear-span frame gave them the full floor plate to plan around.",
      "Ridge ventilation and insulated roof cladding keep the working floor within tolerance through Maharashtra's summer months, while reinforced base plates were sized for the vibration load of continuous processing equipment.",
    ],
  },
  {
    slug: "suryakiran-textile",
    tag: "P.02",
    name: "Suryakiran Textile",
    category: "Textile manufacturing plant",
    sector: "Manufacturing plants",
    scope: "Design · Supply · Erection",
    photo: "/photos/site-grey-warehouse-aerial.jpg",
    summary:
      "A wide-span manufacturing shell built around heavy machine rows and constant material movement.",
    description: [
      "Suryakiran Textile's plant needed a structural bay spacing that matched their loom and finishing-line layout exactly, with no retrofitting once equipment arrived. Orion's design process worked backward from the machine floor plan to the frame.",
      "Crane gantry provision was built into the primary frame from the first drawing, so material handling could be added without touching the structure once production was live.",
    ],
  },
  {
    slug: "akash-poultry",
    tag: "P.03",
    name: "Akash Poultry",
    category: "Poultry infrastructure",
    sector: "Agricultural infrastructure",
    scope: "Design · Supply · Erection",
    photo: "/photos/site-frame-erection-aerial.jpg",
    summary:
      "A rapid-erection agricultural shed prioritising ventilation and structural durability over decades of use.",
    description: [
      "Poultry infrastructure lives or dies on airflow. Akash Poultry's shed was engineered with continuous ridge ventilation and a frame profile that keeps ambient air moving without mechanical assist.",
      "The brief called for a structure that would outlast multiple equipment refits inside — the primary frame and cladding system were specified for long-term agricultural exposure, not a short operating life.",
    ],
  },
  {
    slug: "starwalk",
    tag: "P.04",
    name: "Starwalk Pvt Ltd",
    category: "Industrial warehouse",
    sector: "Logistics & warehousing",
    scope: "Design · Supply · Erection",
    photo: "/photos/site-interior-frame-1.jpg",
    summary:
      "A logistics warehouse built to heavy storage metrics with dock canopies designed in from day one.",
    description: [
      "Starwalk's warehouse brief was straightforward and unforgiving: maximise storage volume, keep the floor clear, and don't compromise on loading efficiency. The clear-span frame delivered the volume; dock canopies and weather-sealed entrances protected the loading operation.",
      "Structural utilities — mezzanine provision, crane runway brackets — were planned into the frame from the first General Arrangement drawing, ahead of Starwalk's own fit-out.",
    ],
  },
  {
    slug: "vimal-textile-industries",
    tag: "P.05",
    name: "Vimal Textile Industries",
    category: "Weaving shed",
    sector: "Manufacturing plants",
    scope: "Design · Supply · Erection",
    photo: "/photos/site-interior-frame-2.jpg",
    summary:
      "A weaving shed with sky-lighting sheets built into the roof to cut daytime lighting load.",
    description: [
      "Vimal Textile Industries wanted natural light across the weaving floor without compromising the roof's structural or thermal performance. Engineered skylighting sheets were integrated into the galvalume roof system to answer both.",
      "Interlocking Z-purlins and C-girts hold the structure's global alignment across the shed's full run, keeping tolerances tight for the loom lines beneath.",
    ],
  },
  {
    slug: "vkd-school",
    tag: "P.06",
    name: "VKD School & Jr. College",
    category: "Institutional block",
    sector: "Institutional & commercial",
    scope: "Design · Supply · Erection",
    photo: "/photos/site-frame-excavator.jpg",
    summary:
      "An institutional block adapting Orion's PEB system to classroom spans and occupancy requirements.",
    description: [
      "VKD English Medium School & Jr. College needed an institutional structure on the same rapid-erection timeline as Orion's industrial work, but built to classroom spans, occupancy density and daylighting requirements rather than warehouse metrics.",
      "The same clear-span discipline that keeps a warehouse floor open was reconfigured here to keep classroom bays column-free and consistently lit.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
