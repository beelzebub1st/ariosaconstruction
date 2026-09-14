import type { LeadIntent, LeadRole, SiteSettings } from "@prisma/client";
import { SERVICE_AREAS } from "@/lib/service-areas";

export { SERVICE_AREAS };

export const HERO_SUPPORT =
  "Serving homeowners, contractors, and general contractors with skilled crews, quality workmanship, and dependable project execution.";

export const DEFAULT_SETTINGS: SiteSettings = {
  id: "default",
  companyName: "Ariosa & Constructions LLC",
  tagline: "Building Dreams. Delivering Quality.",
  phone: "(786) 786-5837",
  email: "ariosaconstructions@gmail.com",
  serviceArea: "Southwest Florida · Fort Myers & surrounding",
  address: "Fort Myers, FL",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Fort%20Myers%2C%20FL&t=&z=10&ie=UTF8&iwloc=&output=embed",
  aboutShort: "Show up prepared, communicate clearly, finish clean.",
  aboutLong:
    "Ariosa & Constructions LLC provides reliable residential and commercial construction services throughout Southwest Florida. We work with homeowners, contractors, and general contractors, providing skilled labor and dependable project execution across framing, drywall, remodeling, flooring, painting, trim, and other construction scopes.",
  heroHeadline: "Building Dreams. Delivering Quality.",
  heroSubheadline:
    "Reliable Construction & Subcontracting Services Across Southwest Florida",
  heroImageUrl: null,
  trustBadges: "Insured|Quality Craftsmanship|Reliable Crews|Southwest Florida",
  yearsExperience: "Experienced Construction Team",
  facebookUrl: null,
  instagramUrl: null,
  googleUrl: null,
};

export const SEED_SERVICES = [
  {
    title: "Construction & Subcontracting Services",
    slug: "construction-subcontracting",
    summary:
      "Reliable construction support for homeowners, contractors, and general contractors throughout Southwest Florida.",
    body: "Ariosa & Constructions LLC delivers skilled construction and subcontracting support—coordinated crews, clear communication, and quality workmanship. We partner with homeowners, contractors, and general contractors to execute scopes on schedule without presenting ourselves as the licensed general contractor of record.",
    icon: "hard-hat",
    imageUrl: "/projects/swfl-luxury-drywall-estate/cover.jpg",
    order: 1,
  },
  {
    title: "Wood Framing & Structural Framing",
    slug: "wood-framing-structural-framing",
    summary:
      "Accurate wood and structural framing that sets the bones of the build for a clean, inspection-ready shell.",
    body: "From walls and openings to layout and structural framing, our crews cut, set, and fasten with care so the rest of the project can move forward confidently. We focus on square, plumb, and solid workmanship that holds up under Florida conditions.",
    icon: "frame",
    imageUrl: "/projects/commercial-ti-mezzanine/cover.jpg",
    order: 2,
  },
  {
    title: "Roof & Floor Truss Installation",
    slug: "roof-floor-truss-installation",
    summary:
      "Safe, precise roof and floor truss installation coordinated with your framing schedule.",
    body: "We install roof and floor trusses with disciplined layout, bracing, and fastening practices. Whether supporting a GC's schedule or a residential remodel, we keep the critical path moving and leave the structure ready for decking and finishes.",
    icon: "truss",
    imageUrl: "/projects/_extras/extra-05.jpg",
    order: 3,
  },
  {
    title: "Roof Decking / Sheathing",
    slug: "roof-decking-sheathing",
    summary:
      "Solid roof decking and sheathing for a weather-ready envelope and dependable substrate.",
    body: "Proper decking and sheathing protect the structure and create a reliable base for roofing systems. Our team installs panels cleanly, with attention to fastening patterns, edges, and openings so the envelope is ready for the next trade.",
    icon: "layers",
    imageUrl: "/projects/coastal-home-siding-rebuild/cover.jpg",
    order: 4,
  },
  {
    title: "Drywall Installation & Finishing – Level 4 / Level 5",
    slug: "drywall-installation-finishing",
    summary:
      "Hang, tape, and finish drywall to Level 4 or Level 5 standards for paint-ready interiors.",
    body: "From hanging board to Level 4 and Level 5 finishes—including tray ceilings and architectural details—we deliver smooth, paint-ready surfaces. Our crews protect schedules with clean job sites and consistent finishing quality.",
    icon: "drywall",
    imageUrl: "/projects/swfl-luxury-drywall-estate/gallery-06.jpg",
    order: 5,
  },
  {
    title: "Residential Remodeling",
    slug: "residential-remodeling",
    summary:
      "Targeted and whole-home remodeling with skilled labor and dependable project execution.",
    body: "Whether refreshing living spaces or supporting a larger remodel under a contractor or GC, we bring reliable crews for demolition, framing support, drywall, finishes, and related scopes—executed cleanly and on communication.",
    icon: "home",
    imageUrl: "/projects/open-concept-luxury-living/cover.jpg",
    order: 6,
  },
  {
    title: "Kitchen & Bathroom Renovations",
    slug: "kitchen-bathroom-renovations",
    summary:
      "Kitchen and bath renovations with careful detailing, durable finishes, and tidy sites.",
    body: "Kitchens and baths demand precision. We support renovations with demolition, finish carpentry coordination, tile, and related interior scopes—delivering spaces that look sharp and perform under daily use.",
    icon: "bath",
    imageUrl: "/projects/fort-myers-marble-kitchen-media/cover.jpg",
    order: 7,
  },
  {
    title: "Tile & LVP Flooring",
    slug: "tile-lvp-flooring",
    summary:
      "Professional tile and LVP flooring installation with clean transitions and level results.",
    body: "From large-format tile to LVP, we prepare substrates carefully and install flooring for a finished look that lasts. Leveling, layout, and transitions are handled with the same discipline we bring to every trade.",
    icon: "floor",
    imageUrl: "/projects/open-concept-luxury-living/before.jpg",
    order: 8,
  },
  {
    title: "Interior & Exterior Painting",
    slug: "interior-exterior-painting",
    summary:
      "Interior and exterior painting with proper prep, clean cut-ins, and durable coverage.",
    body: "Prep makes the paint job. We mask, sand, and cut in carefully for crisp lines on interiors and weather-ready exteriors—including multi-family and residential refresh work across Southwest Florida.",
    icon: "paint",
    imageUrl: "/projects/multifamily-exterior-refresh/cover.jpg",
    order: 9,
  },
  {
    title: "Baseboards, Trim & Interior Doors",
    slug: "baseboards-trim-interior-doors",
    summary:
      "Finish carpentry for baseboards, trim, and interior doors that completes the space.",
    body: "Clean trim work is what makes a remodel feel finished. We install baseboards, casing, and interior doors with tight miters, consistent reveals, and careful fastening for a professional final look.",
    icon: "door",
    imageUrl: "/projects/custom-living-accent-walls/cover.jpg",
    order: 10,
  },
  {
    title: "Demolition & Renovation Work",
    slug: "demolition-renovation-work",
    summary:
      "Controlled demolition and renovation prep that protects what stays and clears the path to build.",
    body: "We tear out selectively, protect adjacent finishes, and leave the site ready for the next phase. Controlled demolition keeps remodeling and subcontract scopes moving without unnecessary damage or delay.",
    icon: "demolition",
    imageUrl: "/projects/coastal-home-siding-rebuild/before.jpg",
    order: 11,
  },
  {
    title: "Windows & Doors",
    slug: "windows-doors",
    summary:
      "Window and door installation support for openings that are square, sealed, and ready for finish.",
    body: "Proper openings matter for performance and appearance. We support window and door installation with careful layout, fastening, and coordination so units sit true and ready for weatherization and trim.",
    icon: "window",
    imageUrl: "/projects/coastal-home-siding-rebuild/after.jpg",
    order: 12,
  },
  {
    title: "Insulation",
    slug: "insulation",
    summary:
      "Insulation installation that improves comfort and supports energy performance.",
    body: "We install insulation cleanly and completely—fitting cavities, sealing gaps where required, and preparing walls and ceilings for drywall. Done right, insulation protects comfort and supports the finished envelope.",
    icon: "insulation",
    imageUrl: "/projects/_extras/extra-01.jpg",
    order: 13,
  },
  {
    title: "Construction Subcontracting for General Contractors",
    slug: "subcontracting-for-general-contractors",
    summary:
      "Dependable subcontract crews for GCs who need skilled labor that protects the schedule.",
    body: "General contractors trust Ariosa for framing, drywall, finishes, and related scopes delivered with clear communication and inspection-aware workmanship. We show up prepared, protect your timeline, and finish strong as your construction subcontractor—not as the GC of record.",
    icon: "building",
    imageUrl: "/projects/swfl-luxury-drywall-estate/gallery-01.jpg",
    order: 14,
  },
];


export const SEED_PROJECTS = [
  {
    title: "Luxury Estate Drywall & Ceilings",
    slug: "swfl-luxury-drywall-estate",
    summary:
      "Precision drywall, tray ceilings, and architectural interiors on a large Southwest Florida residence—captured with our crew on site.",
    description:
      "From complex tray and coffered ceilings to clean tape-and-mud across great rooms, halls, and kitchen zones, this estate project showcases Ariosa’s finishing craftsmanship. Our team delivered consistent, paint-ready surfaces while coordinating around impact windows, openings, and active trades—setting the home up for millwork, paint, and final fixtures.",
    location: "Southwest Florida",
    category: "Residential Remodeling",
    featured: true,
    beforeUrl: "/projects/swfl-luxury-drywall-estate/before.jpg",
    afterUrl: "/projects/swfl-luxury-drywall-estate/after.jpg",
    coverUrl: "/projects/swfl-luxury-drywall-estate/cover.jpg",
    videoUrl: "/projects/swfl-luxury-drywall-estate/walkthrough.mp4",
    gallery: [
      "/projects/swfl-luxury-drywall-estate/gallery-01.jpg",
      "/projects/swfl-luxury-drywall-estate/gallery-02.jpg",
      "/projects/swfl-luxury-drywall-estate/gallery-03.jpg",
      "/projects/swfl-luxury-drywall-estate/gallery-04.jpg",
      "/projects/swfl-luxury-drywall-estate/gallery-05.jpg",
      "/projects/swfl-luxury-drywall-estate/gallery-06.jpg",
      "/projects/swfl-luxury-drywall-estate/gallery-07.jpg",
      "/projects/swfl-luxury-drywall-estate/gallery-08.jpg",
      "/projects/swfl-luxury-drywall-estate/gallery-09.jpg",
      "/projects/swfl-luxury-drywall-estate/gallery-10.jpg",
    ],
  },
  {
    title: "Modern Marble Kitchen & Media Walls",
    slug: "fort-myers-marble-kitchen-media",
    summary:
      "Open-concept kitchen with a waterfall island, large-format marble-look surfaces, and custom media feature walls.",
    description:
      "This remodel unifies a chef-ready kitchen and living zones with continuous marble-look flooring, a waterfall-edge island, and statement media walls with integrated lighting. Custom cabinetry, stone fabrication, and careful electrical detailing create a bright, high-end Southwest Florida home built for everyday living.",
    location: "Fort Myers, FL",
    category: "Kitchen & Bath",
    featured: true,
    beforeUrl: "/projects/fort-myers-marble-kitchen-media/before.jpg",
    afterUrl: "/projects/fort-myers-marble-kitchen-media/after.jpg",
    coverUrl: "/projects/fort-myers-marble-kitchen-media/cover.jpg",
    videoUrl: null,
    gallery: [
      "/projects/fort-myers-marble-kitchen-media/gallery-01.jpg",
      "/projects/fort-myers-marble-kitchen-media/gallery-02.jpg",
      "/projects/fort-myers-marble-kitchen-media/gallery-03.jpg",
      "/projects/fort-myers-marble-kitchen-media/gallery-04.jpg",
    ],
  },
  {
    title: "Coastal Home — ZIP System & Lap Siding",
    slug: "coastal-home-siding-rebuild",
    summary:
      "Elevated coastal residence weatherproofed with ZIP System sheathing and finished in durable lap siding.",
    description:
      "On a multi-story coastal home, we installed ZIP System rainscreen sheathing, managed openings and decks, and applied horizontal lap siding for a weather-ready shell. Progress photos capture boom-lift work and site logistics typical of Southwest Florida waterfront builds—executed with durability and schedule in mind.",
    location: "Fort Myers Beach area, FL",
    category: "Concrete & Exterior",
    featured: true,
    beforeUrl: "/projects/coastal-home-siding-rebuild/before.jpg",
    afterUrl: "/projects/coastal-home-siding-rebuild/after.jpg",
    coverUrl: "/projects/coastal-home-siding-rebuild/cover.jpg",
    videoUrl: "/projects/coastal-home-siding-rebuild/walkthrough.mp4",
    gallery: ["/projects/coastal-home-siding-rebuild/gallery-01.jpg"],
  },
  {
    title: "Primary Spa Bath — Marble & Brushed Gold",
    slug: "primary-spa-bath-gold-marble",
    summary:
      "Spa-inspired primary bath with blue marble-look walls, frameless glass, freestanding tub, and brushed-gold fixtures.",
    description:
      "A resort-quality primary suite featuring large-format statement tile, a frameless glass shower, and coordinated brushed-gold hardware. We focused on waterproofing, wet-area detailing, and clean transitions so the finished space feels luxurious and built to last in Florida humidity.",
    location: "Southwest Florida",
    category: "Kitchen & Bath",
    featured: true,
    beforeUrl: "/projects/primary-spa-bath-gold-marble/before.jpg",
    afterUrl: "/projects/primary-spa-bath-gold-marble/after.jpg",
    coverUrl: "/projects/primary-spa-bath-gold-marble/cover.jpg",
    videoUrl: null,
    gallery: [
      "/projects/primary-spa-bath-gold-marble/gallery-01.jpg",
      "/projects/primary-spa-bath-gold-marble/gallery-02.jpg",
    ],
  },
  {
    title: "Open-Concept Luxury Living & Kitchen",
    slug: "open-concept-luxury-living",
    summary:
      "Bright open-plan living with a fireplace feature wall, wide-plank floors, and a gourmet kitchen finish-out.",
    description:
      "This residence brings together continuous light flooring, a floor-to-ceiling fireplace feature, and a chef’s kitchen with contrasting island cabinetry. Upper-level tray ceilings and refined finishes complete a clean modern Florida look—documented from flooring progress through the finished walkthrough.",
    location: "Fort Myers / Southwest Florida",
    category: "Residential Remodeling",
    featured: true,
    beforeUrl: "/projects/open-concept-luxury-living/before.jpg",
    afterUrl: "/projects/open-concept-luxury-living/after.jpg",
    coverUrl: "/projects/open-concept-luxury-living/cover.jpg",
    videoUrl: "/projects/open-concept-luxury-living/walkthrough.mp4",
    gallery: ["/projects/open-concept-luxury-living/gallery-01.jpg"],
  },
  {
    title: "Multi-Family Exterior Refresh",
    slug: "multifamily-exterior-refresh",
    summary:
      "Apartment complex exterior update with sage lap siding, contrasting board-and-batten, and crisp white trim.",
    description:
      "A multi-building residential complex received a coordinated exterior refresh—fresh paint, clean trim cut-ins, and a two-tone palette that modernizes the street presence. We worked around occupied units and mechanical zones to keep the site tidy and serviceable throughout the job.",
    location: "Southwest Florida",
    category: "Concrete & Exterior",
    featured: false,
    beforeUrl: "/projects/multifamily-exterior-refresh/before.jpg",
    afterUrl: "/projects/multifamily-exterior-refresh/after.jpg",
    coverUrl: "/projects/multifamily-exterior-refresh/cover.jpg",
    videoUrl: null,
    gallery: [
      "/projects/multifamily-exterior-refresh/gallery-01.jpg",
      "/projects/multifamily-exterior-refresh/gallery-02.jpg",
      "/projects/multifamily-exterior-refresh/gallery-03.jpg",
      "/projects/multifamily-exterior-refresh/gallery-04.jpg",
    ],
  },
  {
    title: "Commercial TI — Mezzanine Build-Out",
    slug: "commercial-ti-mezzanine",
    summary:
      "Flex/commercial unit build-out with mezzanine framing, metal studs, and high-bay drywall.",
    description:
      "This tenant improvement turned a high-bay shell into a two-level workspace. Scope included metal stud partitions, mezzanine finishing, scissor-lift drywall at height, and mechanical coordination—executed with protected stairs and active site logistics for a clean handoff.",
    location: "Southwest Florida",
    category: "Commercial",
    featured: false,
    beforeUrl: "/projects/commercial-ti-mezzanine/before.jpg",
    afterUrl: "/projects/commercial-ti-mezzanine/after.jpg",
    coverUrl: "/projects/commercial-ti-mezzanine/cover.jpg",
    videoUrl: null,
    gallery: [
      "/projects/commercial-ti-mezzanine/gallery-01.jpg",
      "/projects/commercial-ti-mezzanine/gallery-02.jpg",
    ],
  },
  {
    title: "Custom Accent Walls & Bath Details",
    slug: "custom-living-accent-walls",
    summary:
      "Statement living-room feature walls plus modern bath upgrades—texture, millwork, and lighting that transform everyday rooms.",
    description:
      "Focused interior upgrades that elevate living spaces and baths: textured stone-look feature walls with backlit mirrors, wood-slat media walls, and coordinated lighting. Gallery photos also include related modern bath finishes completed in the same Southwest Florida portfolio.",
    location: "Southwest Florida",
    category: "Residential Remodeling",
    featured: false,
    beforeUrl: "/projects/custom-living-accent-walls/before.jpg",
    afterUrl: "/projects/custom-living-accent-walls/after.jpg",
    coverUrl: "/projects/custom-living-accent-walls/cover.jpg",
    videoUrl: null,
    gallery: [
      "/projects/custom-living-accent-walls/gallery-01.jpg",
      "/projects/custom-living-accent-walls/gallery-02.jpg",
      "/projects/custom-living-accent-walls/gallery-03.jpg",
      "/projects/custom-living-accent-walls/gallery-04.jpg",
      "/projects/custom-living-accent-walls/gallery-05.jpg",
    ],
  },
];

export const SEED_TESTIMONIALS: {
  name: string;
  role: string;
  quote: string;
  rating: number;
  order: number;
}[] = [];

export type PublicProject = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  location: string;
  category: string;
  featured: boolean;
  published: boolean;
  coverUrl: string | null;
  beforeUrl: string | null;
  afterUrl: string | null;
  videoUrl: string | null;
  images: { id: string; url: string; alt: string | null; type: string; order: number }[];
};

export type PublicService = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  icon: string;
  imageUrl: string | null;
  order: number;
  published: boolean;
};

export type PublicTestimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  published: boolean;
  order: number;
};

export const FALLBACK_SERVICES: PublicService[] = SEED_SERVICES.map((s, i) => ({
  id: `seed-service-${i}`,
  title: s.title,
  slug: s.slug,
  summary: s.summary,
  body: s.body,
  icon: s.icon,
  imageUrl: s.imageUrl,
  order: s.order,
  published: true,
}));

export const FALLBACK_PROJECTS: PublicProject[] = SEED_PROJECTS.map((p, i) => {
  const images: PublicProject["images"] = [];
  let order = 0;
  if (p.beforeUrl) {
    images.push({
      id: `seed-before-${i}`,
      url: p.beforeUrl,
      alt: `${p.title} before`,
      type: "before",
      order: order++,
    });
  }
  if (p.afterUrl) {
    images.push({
      id: `seed-after-${i}`,
      url: p.afterUrl,
      alt: `${p.title} after`,
      type: "after",
      order: order++,
    });
  }
  for (const [gi, url] of (p.gallery ?? []).entries()) {
    images.push({
      id: `seed-gallery-${i}-${gi}`,
      url,
      alt: `${p.title} gallery ${gi + 1}`,
      type: "gallery",
      order: order++,
    });
  }
  return {
    id: `seed-project-${i}`,
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    description: p.description,
    location: p.location,
    category: p.category,
    featured: p.featured,
    published: true,
    coverUrl: p.coverUrl,
    beforeUrl: p.beforeUrl,
    afterUrl: p.afterUrl,
    videoUrl: p.videoUrl ?? null,
    images,
  };
});

export const FALLBACK_TESTIMONIALS: PublicTestimonial[] = SEED_TESTIMONIALS.map(
  (t, i) => ({
    id: `seed-testimonial-${i}`,
    ...t,
    published: true,
  })
);

export type LeadFormDefaults = {
  intent?: LeadIntent;
  role?: LeadRole;
  serviceInterest?: string;
  projectRef?: string;
};
