import aurora from "@/assets/projects/aurora-penthouse.png";
import kintsugi from "@/assets/projects/kintsugi-villa.png";
import maison from "@/assets/projects/maison-noir.png";
import harbor from "@/assets/projects/harbor-atelier.png";
import costa from "@/assets/projects/costa-blanca.png";
import obsidian from "@/assets/projects/obsidian-table.png";
import alpine from "@/assets/projects/alpine-refuge.png";
import atelier from "@/assets/projects/atelier-blanc.png";
import beforeImg from "@/assets/before.png";
import afterImg from "@/assets/after.png";

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
    title: "Oberoi Sky Residences",
    subtitle: "A south Mumbai skyline penthouse sculpted in Makrana marble and brass",
    location: "Mumbai, Maharashtra",
    year: 2025,
    category: "luxury",
    cover: aurora,
    description: "Floor-to-ceiling glass, hand-carved Makrana marble, and antique brass fixtures frame a living room that floats above Marine Drive.",
    story: "The client wanted a home that felt as rare as its address. We anchored the design around a single Makrana marble slab — veined in amber and ivory — that became the hearth of every conversation. Brass inlays, hand-knotted silk carpets, and bespoke joinery in Indian rosewood gave the penthouse its character: unmistakably Indian, relentlessly refined.",
    gallery: [aurora, maison, harbor],
    beforeAfter: { before: beforeImg, after: afterImg },
    specs: [
      { label: "Type", value: "Private Penthouse" },
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
    title: "Haveli Amber",
    subtitle: "A Jaipur heritage haveli restored for a modern family",
    location: "Jaipur, Rajasthan",
    year: 2024,
    category: "residential",
    cover: kintsugi,
    description: "Jharokha windows, lime-washed courtyards, and hand-painted frescoes compose a calm interior shaped by Rajasthan's amber light.",
    story: "A family asked us to breathe life back into a 200-year-old haveli without erasing its soul. We answered with a palette of aged lime plaster, hand-blocked textiles, and teak joinery — and a single courtyard garden that pulls daylight through every room from dawn to dusk.",
    gallery: [kintsugi, costa, atelier],
    beforeAfter: { before: beforeImg, after: afterImg },
    specs: [
      { label: "Type", value: "Heritage Villa" },
      { label: "Surface", value: "520 m²" },
      { label: "Duration", value: "11 months" },
      { label: "Team", value: "Studio + 6 artisans" },
    ],
    timeline: [
      { phase: "Discovery", detail: "Heritage study and brief mapping" },
      { phase: "Design", detail: "Material library and fresco palette" },
      { phase: "Build", detail: "Local Rajasthani craftsmen, hand-finished" },
      { phase: "Reveal", detail: "Garden install and art curation" },
    ],
  },
  {
    slug: "maison-noir",
    title: "The Asaf Suites",
    subtitle: "A Hyderabad boutique hotel staged with Nizami grandeur",
    location: "Hyderabad, Telangana",
    year: 2024,
    category: "commercial",
    cover: maison,
    description: "A sculpted archway, Shahabad stone walls, and deep indigo velvet seating give every arrival a cinematic moment of arrival.",
    story: "We treated the lobby as the first scene of a story — every guest is the protagonist the moment they cross the threshold. Sound, scent, and silhouette were composed in the same brief. The palette draws from the Nizam's court: ink blue, aged bronze, and the quiet glow of hand-blown glass lanterns.",
    gallery: [maison, aurora, obsidian],
    beforeAfter: { before: beforeImg, after: afterImg },
    specs: [
      { label: "Type", value: "Boutique Hotel" },
      { label: "Keys", value: "36 suites" },
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
    title: "Brigade Executive Tower",
    subtitle: "A Bengaluru founder's office shaped around ideas",
    location: "Bengaluru, Karnataka",
    year: 2023,
    category: "commercial",
    cover: harbor,
    description: "Indian teak paneling, hand-stitched leather seating, and forged iron pendant lights shape a workspace built for long thinking.",
    story: "A tech founder wanted a room that doubled as a private library. We built around a single curved teak wall — a slow surface that reveals its grain as the day moves. The result is a room that feels like it has always existed, while supporting the restless pace of building something new.",
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
      { phase: "Build", detail: "Custom teak fabrication" },
      { phase: "Reveal", detail: "Art install and styling" },
    ],
  },
  {
    slug: "costa-blanca",
    title: "Vayalil Retreat",
    subtitle: "A Kerala backwater villa shaped by monsoon light",
    location: "Alleppey, Kerala",
    year: 2023,
    category: "residential",
    cover: costa,
    description: "Open courtyards, laterite stone walls, and linen curtains dissolve the boundary between the home and the waterway beyond.",
    story: "We chased the light. From the silver of dawn mist to the green glow of afternoon, every material was tested across four times of day. Laterite floors, bamboo screens, and handwoven Kasavu textiles give the home its unmistakable Kerala character — quiet, open, and rooted.",
    gallery: [costa, kintsugi, aurora],
    beforeAfter: { before: beforeImg, after: afterImg },
    specs: [
      { label: "Type", value: "Waterfront Villa" },
      { label: "Surface", value: "380 m²" },
      { label: "Duration", value: "10 months" },
      { label: "Team", value: "Studio + local Kerala atelier" },
    ],
    timeline: [
      { phase: "Discovery", detail: "Light study and material samples" },
      { phase: "Design", detail: "Plans, joinery, courtyard" },
      { phase: "Build", detail: "Laterite and bamboo work" },
      { phase: "Reveal", detail: "Garden, art, soft furnishings" },
    ],
  },
  {
    slug: "obsidian-table",
    title: "Sable by Vikram",
    subtitle: "A Mumbai fine-dining restaurant in shadow and ember",
    location: "Bandra, Mumbai",
    year: 2024,
    category: "commercial",
    cover: obsidian,
    description: "Hand-beaten copper ceilings, dark sheesham wood, and intimate banquettes compose an evening built entirely around the meal.",
    story: "We designed the room to disappear so the food could speak. A single warm arc of light runs the ceiling, pulling every plate into focus. The palette is drawn from the spice trade — cardamom cream, clove brown, and the deep amber of old copper.",
    gallery: [obsidian, maison, harbor],
    beforeAfter: { before: beforeImg, after: afterImg },
    specs: [
      { label: "Type", value: "Fine Dining Restaurant" },
      { label: "Covers", value: "56 seats" },
      { label: "Duration", value: "8 months" },
      { label: "Team", value: "Studio + lighting designer" },
    ],
    timeline: [
      { phase: "Discovery", detail: "Menu narrative and service choreography" },
      { phase: "Design", detail: "Architecture and copper lighting" },
      { phase: "Build", detail: "Joinery and acoustic panels" },
      { phase: "Reveal", detail: "Tableware and final styling" },
    ],
  },
  {
    slug: "alpine-refuge",
    title: "Deodar House",
    subtitle: "A Himachal retreat built around the fire and the valley",
    location: "Manali, Himachal Pradesh",
    year: 2023,
    category: "luxury",
    cover: alpine,
    description: "A stone fireplace anchors a deodar-beamed great room facing floor-to-ceiling windows and the Beas Valley beyond.",
    story: "The brief was warmth — physical and emotional. We worked with local Himachali stonemasons to build a hearth that feels cut from the mountain itself. Woollen Kullu shawls, handwoven dhurries, and solid deodar beams make a room that holds you through winter.",
    gallery: [alpine, costa, kintsugi],
    beforeAfter: { before: beforeImg, after: afterImg },
    specs: [
      { label: "Type", value: "Mountain Retreat" },
      { label: "Surface", value: "410 m²" },
      { label: "Duration", value: "13 months" },
      { label: "Team", value: "Studio + 5 Himachali craftsmen" },
    ],
    timeline: [
      { phase: "Discovery", detail: "Site, climate, and ritual" },
      { phase: "Design", detail: "Hearth, beams, joinery" },
      { phase: "Build", detail: "Stone, deodar, and hand-woven textiles" },
      { phase: "Reveal", detail: "Styling and hand-over" },
    ],
  },
  {
    slug: "atelier-blanc",
    title: "Lodhi Art Loft",
    subtitle: "A New Delhi collector's home in light and lime plaster",
    location: "Lodhi Colony, New Delhi",
    year: 2022,
    category: "commercial",
    cover: atelier,
    description: "Double-height white lime-plastered walls, polished kota stone floors, and dramatic skylights stage a private Indian contemporary art collection.",
    story: "A collector asked for a room that would let her work breathe. We removed every line that competed and let the Delhi light do the curating — flat in December, golden in March, sharp and cinematic in October.",
    gallery: [atelier, maison, harbor],
    beforeAfter: { before: beforeImg, after: afterImg },
    specs: [
      { label: "Type", value: "Private Gallery & Residence" },
      { label: "Surface", value: "280 m²" },
      { label: "Duration", value: "7 months" },
      { label: "Team", value: "Studio + lighting designer" },
    ],
    timeline: [
      { phase: "Discovery", detail: "Collection review and light study" },
      { phase: "Design", detail: "Volumes and skylight wells" },
      { phase: "Build", detail: "Lime plaster and kota stone" },
      { phase: "Reveal", detail: "Hang, curation, and hand-over" },
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
