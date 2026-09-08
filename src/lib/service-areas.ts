/** Cities Ariosa & Constructions proudly serves across Southwest Florida */
export const SERVICE_AREAS = [
  "Fort Myers",
  "Cape Coral",
  "Lehigh Acres",
  "Naples",
  "Fort Myers Beach",
  "Alva",
  "LaBelle",
  "Punta Gorda",
  "Port Charlotte",
  "Sarasota",
] as const;

export type ServiceArea = (typeof SERVICE_AREAS)[number];
