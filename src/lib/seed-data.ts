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
    title: "Fort Myers Kitchen Remodel",
    slug: "fort-myers-kitchen-remodel",
    summary: "Full kitchen renovation with open layout, new cabinetry, and durable finishes.",
    description:
      "This Fort Myers kitchen was transformed from a closed, dated layout into a bright, functional cooking and gathering space. We coordinated plumbing and electrical updates, installed new cabinetry and countertops, and finished with tile and lighting selected for longevity.",
    location: "Fort Myers, FL",
    category: "Kitchen & Bath",
    featured: true,
    beforeUrl:
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1200&q=80",
    afterUrl:
      "https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?auto=format&fit=crop&w=1200&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Cape Coral Bath Suite",
    slug: "cape-coral-bath-suite",
    summary: "Primary bath refresh with waterproofing, tile, and spa-inspired fixtures.",
    description:
      "A tired primary bath became a calm, spa-like suite. Scope included demolition, waterproofing, new tile work, vanity and fixture installation, and careful detailing around wet areas for long-term performance.",
    location: "Cape Coral, FL",
    category: "Kitchen & Bath",
    featured: true,
    beforeUrl:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
    afterUrl:
      "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=1200&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Lehigh Acres Home Addition",
    slug: "lehigh-acres-home-addition",
    summary: "Family-room addition tied into existing structure with matching exterior finishes.",
    description:
      "The owners needed more living space without relocating. We designed and built a rear addition, matched exterior materials, and completed interior finishes so the new room feels original to the home.",
    location: "Lehigh Acres, FL",
    category: "Additions",
    featured: true,
    beforeUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    afterUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Naples Office TI",
    slug: "naples-office-ti",
    summary: "Commercial tenant improvement for a professional office suite.",
    description:
      "A light commercial TI for a growing team in Naples. We framed partitions, upgraded finishes, coordinated MEP as needed, and delivered a clean, professional suite on a tight occupancy timeline.",
    location: "Naples, FL",
    category: "Commercial",
    featured: false,
    beforeUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    afterUrl:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
  },
];

export const SEED_TESTIMONIALS = [
  {
    name: "Maria R.",
    role: "Homeowner, Fort Myers",
    quote:
      "Ariosa handled our kitchen remodel with clear communication and excellent craftsmanship. They finished on schedule and the space feels brand new.",
    rating: 5,
    order: 1,
  },
  {
    name: "James T.",
    role: "General Contractor, Cape Coral",
    quote:
      "Reliable partner on multi-trade jobs. They show up prepared, protect the schedule, and the workmanship holds up to inspection.",
    rating: 5,
    order: 2,
  },
  {
    name: "Sofia L.",
    role: "Homeowner, Naples",
    quote:
      "From estimate to final walkthrough, everything was professional. Our addition looks seamless with the rest of the house.",
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

export const FALLBACK_PROJECTS: PublicProject[] = SEED_PROJECTS.map((p, i) => ({
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
  images: [
    {
      id: `seed-before-${i}`,
      url: p.beforeUrl,
      alt: `${p.title} before`,
      type: "before",
      order: 0,
    },
    {
      id: `seed-after-${i}`,
      url: p.afterUrl,
      alt: `${p.title} after`,
      type: "after",
      order: 1,
    },
  ],
}));

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
