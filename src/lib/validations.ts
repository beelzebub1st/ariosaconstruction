import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  role: z.enum(["homeowner", "contractor", "gc", "other"]).default("homeowner"),
  intent: z.enum(["contact", "estimate"]).default("estimate"),
  serviceInterest: z.string().optional(),
  projectRef: z.string().optional(),
  addressArea: z.string().optional(),
  budgetRange: z.string().optional(),
  message: z.string().optional(),
  photoUrl: z.string().optional(),
  sourcePage: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const serviceSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  summary: z.string().min(10),
  body: z.string().min(20),
  icon: z.string().default("hammer"),
  imageUrl: z.string().optional().nullable(),
  order: z.coerce.number().default(0),
  published: z.coerce.boolean().default(true),
});

export const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  summary: z.string().min(10),
  description: z.string().min(20),
  location: z.string().min(2),
  category: z.string().min(2),
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
  coverUrl: z.string().optional(),
  beforeUrl: z.string().optional(),
  afterUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  galleryUrls: z.string().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  quote: z.string().min(10),
  rating: z.coerce.number().min(1).max(5).default(5),
  published: z.coerce.boolean().default(true),
  order: z.coerce.number().default(0),
});

export const siteSettingsSchema = z.object({
  companyName: z.string().min(2),
  tagline: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email(),
  serviceArea: z.string().min(2),
  address: z.string().min(2),
  mapEmbedUrl: z.string().min(2),
  aboutShort: z.string().min(10),
  aboutLong: z.string().min(20),
  heroHeadline: z.string().min(2),
  heroSubheadline: z.string().min(2),
  heroSupport: z.string().min(2),
  heroImageUrl: z.string().optional().nullable(),
  trustBadges: z.string().min(2),
  yearsExperience: z.string().min(1),
  facebookUrl: z.string().optional().nullable(),
  instagramUrl: z.string().optional().nullable(),
  googleUrl: z.string().optional().nullable(),
});

export const serviceAreaSchema = z.object({
  name: z.string().min(2),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
  hub: z.coerce.boolean().default(false),
  order: z.coerce.number().default(0),
  published: z.coerce.boolean().default(true),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
