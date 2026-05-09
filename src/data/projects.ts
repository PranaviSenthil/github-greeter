import aurora from "@/assets/projects/aurora-penthouse.jpg";
import kintsugi from "@/assets/projects/kintsugi-villa.jpg";
import maison from "@/assets/projects/maison-noir.jpg";
import harbor from "@/assets/projects/harbor-atelier.jpg";
import costa from "@/assets/projects/costa-blanca.jpg";
import obsidian from "@/assets/projects/obsidian-table.jpg";
import alpine from "@/assets/projects/alpine-refuge.jpg";
import atelier from "@/assets/projects/atelier-blanc.jpg";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";

export type ProjectCategory = "residential" | "commercial" | "luxury";

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  year: number;
  category: ProjectCategory;
  cover: string;
  description: string;
  story: string;
  gallery: string[];
  beforeAfter: { before: string; after: string };
  specs: ProjectSpec[];
  timeline: { phase: string; detail: string }[];
  /** masonry weight for grid (1 = standard, 2 = tall) */
  weight?: 1 | 2;
}

export const projects: Project[] = [
  {
    slug: "aurora-penthouse",
    title: "Aurora Penthouse",
    subtitle: "A skyline residence sculpted in marble and brass",
    location: "Manhattan, NY",
    year: 2025,
    category: "luxury",
    cover: aurora,
    description: "Floor-to-ceiling glass, a sculpted marble hearth, and velvet seating frame a living room that floats above the city.",
    story: "We re-imagined a sprawling penthouse around a single ritual: the long evening conversation. Every plane of marble, every brass detail, was tuned to the temperature of golden hour. The result is a residence that performs at dusk and quiets at dawn.",
    gallery: [aurora, maison, harbor],
    beforeAfter: { before: beforeImg, after: afterImg },
    specs: [
      { label: "Type", value: "Private Residence" },
      { label: "Surface", value: "640 m²" },
      { label: "Duration", value: "14 months" },
      { label: "Team", value: "Studio + 6 craftsmen" },
    ],
    timeline: [
      { phase: "Discovery", detail: "Brief, mood, and material direction" },
      { phase: "Design", detail: "Concept, plans, and 3D walkthroughs" },
      { phase: "Build", detail: "Bespoke joinery and stone fabrication" },
      { phase: "Reveal", detail: "Styling, art curation, hand-over" },
    ],
    weight: 2,
  },
  {
    slug: "kintsugi-villa",
    title: "Kintsugi Villa",
    subtitle: "A coastal retreat that honours imperfection",
    location: "Kyoto, JP",
    year: 2024,
    category: "residential",
    cover: kintsugi,
    description: "Tatami textures, oak slats, and an indoor garden compose a calm interior shaped by daylight.",
    story: "A family asked us for stillness. We answered with a palette of paper, stone, and timber — and a single shaft of light that travels the home from sunrise to last bell.",
    gallery: [kintsugi, costa, atelier],
    beforeAfter: { before: beforeImg, after: afterImg },
    specs: [
      { label: "Type", value: "Family Villa" },
      { label: "Surface", value: "320 m²" },
      { label: "Duration", value: "9 months" },
      { label: "Team", value: "Studio + 4 craftsmen" },
    ],
    timeline: [
      { phase: "Discovery", detail: "Site study and ritual mapping" },
      { phase: "Design", detail: "Material library and joinery" },
      { phase: "Build", detail: "Local artisans, hand-finished" },
      { phase: "Reveal", detail: "Garden install and styling" },
    ],
  },
  {
    slug: "maison-noir",
    title: "Maison Noir",
    subtitle: "A boutique hotel staged like a stage set",
    location: "Paris, FR",
    year: 2024,
    category: "commercial",
    cover: maison,
    description: "A sculpted staircase, travertine walls, and emerald velvet seating give arrivals a cinematic moment.",
    story: "We treated the lobby as the first scene of a screenplay — every guest is the protagonist for thirty seconds. Sound, scent, and silhouette were composed in the same brief.",
    gallery: [maison, aurora, obsidian],
    beforeAfter: { before: beforeImg, after: afterImg },
    specs: [
      { label: "Type", value: "Hospitality" },
      { label: "Keys", value: "42 rooms" },
      { label: "Duration", value: "18 months" },
      { label: "Team", value: "Studio + lighting + acoustic" },
    ],
    timeline: [
      { phase: "Discovery", detail: "Brand narrative and guest journey" },
      { phase: "Design", detail: "Architecture, lighting, FF&E" },
      { phase: "Build", detail: "On-site management and finishes" },
      { phase: "Reveal", detail: "Soft opening and hand-over" },
    ],
    weight: 2,
  },
  {
    slug: "harbor-atelier",
    title: "Harbor Atelier",
    subtitle: "An executive office at the edge of the marina",
    location: "Sydney, AU",
    year: 2023,
    category: "commercial",
    cover: harbor,
    description: "Walnut paneling, leather lounge chairs, and brass pendant lights shape a workspace tuned to a panoramic harbor.",
    story: "A founder wanted a room that doubled as a private gallery. We built around a single curved walnut wall — a slow surface that reveals texture as the day moves.",
    gallery: [harbor, aurora, atelier],
    beforeAfter: { before: beforeImg, after: afterImg },
    specs: [
      { label: "Type", value: "Executive Office" },
      { label: "Surface", value: "210 m²" },
      { label: "Duration", value: "6 months" },
      { label: "Team", value: "Studio + 3 craftsmen" },
    ],
    timeline: [
      { phase: "Discovery", detail: "Workflow and ritual mapping" },
      { phase: "Design", detail: "Joinery and lighting" },
      { phase: "Build", detail: "Custom walnut fabrication" },
      { phase: "Reveal", detail: "Art install and styling" },
    ],
  },
  {
    slug: "costa-blanca",
    title: "Costa Blanca Residence",
    subtitle: "A Mediterranean home shaped by sea light",
    location: "Mallorca, ES",
    year: 2023,
    category: "residential",
    cover: costa,
    description: "Limewashed walls, linen drapery, and arched windows open onto a private terrace and the horizon beyond.",
    story: "We chased the light. From sunrise glare to sunset wash, every material was tested at four times of day. The home reads as one continuous breath.",
    gallery: [costa, kintsugi, aurora],
    beforeAfter: { before: beforeImg, after: afterImg },
    specs: [
      { label: "Type", value: "Coastal Residence" },
      { label: "Surface", value: "380 m²" },
      { label: "Duration", value: "11 months" },
      { label: "Team", value: "Studio + local atelier" },
    ],
    timeline: [
      { phase: "Discovery", detail: "Light study and material samples" },
      { phase: "Design", detail: "Plans, joinery, terrace" },
      { phase: "Build", detail: "Limewash and stonework" },
      { phase: "Reveal", detail: "Garden, art, soft furnishings" },
    ],
  },
  {
    slug: "obsidian-table",
    title: "Obsidian Table",
    subtitle: "A Michelin restaurant in shadow and ember",
    location: "London, UK",
    year: 2024,
    category: "commercial",
    cover: obsidian,
    description: "Sculptural lighting, dark stained oak, and intimate banquettes set the tone for an evening composed in courses.",
    story: "We designed the room to disappear, so the food could speak. A single warm horizon line of light travels the ceiling and pulls every plate into focus.",
    gallery: [obsidian, maison, harbor],
    beforeAfter: { before: beforeImg, after: afterImg },
    specs: [
      { label: "Type", value: "Restaurant" },
      { label: "Covers", value: "64 seats" },
      { label: "Duration", value: "8 months" },
      { label: "Team", value: "Studio + lighting designer" },
    ],
    timeline: [
      { phase: "Discovery", detail: "Menu, service, and sound" },
      { phase: "Design", detail: "Architecture and lighting" },
      { phase: "Build", detail: "Joinery and acoustic panels" },
      { phase: "Reveal", detail: "Tableware and final styling" },
    ],
  },
  {
    slug: "alpine-refuge",
    title: "Alpine Refuge",
    subtitle: "A chalet built around the fire",
    location: "Verbier, CH",
    year: 2023,
    category: "luxury",
    cover: alpine,
    description: "A stone fireplace anchors a beamed great room facing panoramic mountain windows and snow light.",
    story: "The brief was warmth — physical and emotional. We worked with local stonemasons to build a hearth that feels cut from the mountain itself.",
    gallery: [alpine, costa, kintsugi],
    beforeAfter: { before: beforeImg, after: afterImg },
    specs: [
      { label: "Type", value: "Mountain Chalet" },
      { label: "Surface", value: "510 m²" },
      { label: "Duration", value: "13 months" },
      { label: "Team", value: "Studio + 5 craftsmen" },
    ],
    timeline: [
      { phase: "Discovery", detail: "Site, climate, ritual" },
      { phase: "Design", detail: "Hearth, beams, joinery" },
      { phase: "Build", detail: "Stone, oak, shearling" },
      { phase: "Reveal", detail: "Styling and hand-over" },
    ],
  },
  {
    slug: "atelier-blanc",
    title: "Atelier Blanc",
    subtitle: "A private gallery in light and concrete",
    location: "Antwerp, BE",
    year: 2022,
    category: "commercial",
    cover: atelier,
    description: "Double-height white walls, polished concrete, and dramatic skylights stage a private collection.",
    story: "A collector asked for a room that would let her work breathe. We removed every line that competed and let the daylight do the curating.",
    gallery: [atelier, maison, harbor],
    beforeAfter: { before: beforeImg, after: afterImg },
    specs: [
      { label: "Type", value: "Private Gallery" },
      { label: "Surface", value: "280 m²" },
      { label: "Duration", value: "7 months" },
      { label: "Team", value: "Studio + lighting designer" },
    ],
    timeline: [
      { phase: "Discovery", detail: "Collection review" },
      { phase: "Design", detail: "Volumes and light wells" },
      { phase: "Build", detail: "Concrete and plaster" },
      { phase: "Reveal", detail: "Hang and curation" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getRelated = (slug: string, limit = 3) => {
  const current = getProject(slug);
  if (!current) return [];
  return projects
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 0 : 1;
      const bMatch = b.category === current.category ? 0 : 1;
      return aMatch - bMatch;
    })
    .slice(0, limit);
};

export const categories: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All Works" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "luxury", label: "Luxury" },
];
