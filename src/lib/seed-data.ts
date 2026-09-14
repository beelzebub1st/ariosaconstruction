import type { LeadIntent, LeadRole, SiteSettings } from "@prisma/client";
import { SERVICE_AREAS } from "@/lib/service-areas";

export { SERVICE_AREAS };

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
  aboutShort:
    "Ariosa & Constructions LLC delivers quality residential and commercial construction with integrity, craftsmanship, and clear communication.",
  aboutLong:
    "Founded to serve homeowners, contractors, and general contractors across Southwest Florida—from Fort Myers and Cape Coral to Naples, Lehigh Acres, and beyond—Ariosa & Constructions LLC brings disciplined project management and skilled workmanship to every job—from remodels and additions to full general contracting. We treat every project like it is our own home: clear timelines, honest estimates, and workmanship you can trust.",
  heroHeadline: "Building Dreams. Delivering Quality.",
  heroSubheadline:
    "Trusted construction partners for homeowners, contractors, and GCs across Fort Myers, Cape Coral, Naples, and surrounding Southwest Florida.",
  heroImageUrl: null,
  trustBadges: "Licensed & Insured|Quality Craftsmanship|On-Time Delivery",
  yearsExperience: "10+",
  facebookUrl: null,
  instagramUrl: null,
  googleUrl: null,
};

export const SEED_SERVICES = [
  {
    title: "General Contracting",
    slug: "general-contracting",
    summary:
      "End-to-end project leadership—from permits and scheduling to quality control and final walkthrough.",
    body: "Whether you are a homeowner coordinating a complex remodel or a GC looking for a reliable partner, Ariosa & Constructions manages the full build. We coordinate trades, protect your timeline, and keep communication clear so the job stays on track and on budget.",
    icon: "hard-hat",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
    order: 1,
  },
  {
    title: "Residential Remodeling",
    slug: "residential-remodeling",
    summary:
      "Whole-home and targeted remodels that elevate living spaces without sacrificing structure or code.",
    body: "From open-concept conversions to full gut renovations, we remodel with precision. Our team protects what stays, upgrades what matters, and leaves you with a home that feels new—and built to last in South Florida conditions.",
    icon: "home",
    imageUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    order: 2,
  },
  {
    title: "Kitchen & Bath",
    slug: "kitchen-bath",
    summary:
      "Functional, beautiful kitchens and baths designed for daily life and lasting durability.",
    body: "Kitchens and baths are where craftsmanship shows. We handle layout changes, plumbing and electrical coordination, tile, cabinetry, and finishes—delivering spaces that look sharp and perform under real use.",
    icon: "bath",
    imageUrl:
      "https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?auto=format&fit=crop&w=1200&q=80",
    order: 3,
  },
  {
    title: "Additions & Renovations",
    slug: "additions-renovations",
    summary:
      "Expand your footprint with seamless additions that match your home’s structure and style.",
    body: "Need more room without moving? We plan and build additions and major renovations that integrate with existing structures, meet code, and feel like they’ve always belonged.",
    icon: "expand",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    order: 4,
  },
  {
    title: "Concrete & Exterior",
    slug: "concrete-exterior",
    summary:
      "Driveways, patios, exterior repairs, and hardscape work built for Florida weather.",
    body: "Exterior work has to stand up to sun, rain, and storms. We deliver concrete and exterior improvements with proper prep, drainage awareness, and finishes that hold up season after season.",
    icon: "layers",
    imageUrl:
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80",
    order: 5,
  },
  {
    title: "Commercial Tenant Improvements",
    slug: "commercial-tenant-improvements",
    summary:
      "Efficient TI build-outs for offices, retail, and light commercial spaces.",
    body: "Contractors and property teams trust us for tenant improvements that respect lease timelines. We coordinate with stakeholders, minimize disruption, and deliver clean, professional spaces ready for business.",
    icon: "building",
    imageUrl:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    order: 6,
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

export const SEED_TESTIMONIALS = [
  {
    name: "Maria R.",
    role: "Homeowner, Fort Myers",
    quote:
      "Ariosa transformed our kitchen and living spaces with clear communication and excellent craftsmanship. The waterfall island still gets compliments every week.",
    rating: 5,
    order: 1,
  },
  {
    name: "James T.",
    role: "General Contractor, Cape Coral",
    quote:
      "Reliable partner on multi-trade jobs. Their drywall and exterior crews show up prepared, protect the schedule, and the workmanship holds up to inspection.",
    rating: 5,
    order: 2,
  },
  {
    name: "Sofia L.",
    role: "Homeowner, Southwest Florida",
    quote:
      "From estimate to final walkthrough, everything was professional. Our spa bath and accent walls look like a resort suite—and they finished clean.",
    rating: 5,
    order: 3,
  },
];

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
