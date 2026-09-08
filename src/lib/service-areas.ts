/** Cities Ariosa & Constructions proudly serves across Southwest Florida */
export const SERVICE_AREA_LOCATIONS = [
  {
    name: "Fort Myers",
    lat: 26.6406,
    lng: -81.8723,
    hub: true,
  },
  {
    name: "Cape Coral",
    lat: 26.5629,
    lng: -81.9495,
  },
  {
    name: "Lehigh Acres",
    lat: 26.6253,
    lng: -81.6248,
  },
  {
    name: "Naples",
    lat: 26.142,
    lng: -81.7948,
  },
  {
    name: "Fort Myers Beach",
    lat: 26.452,
    lng: -81.9481,
  },
  {
    name: "Alva",
    lat: 26.7145,
    lng: -81.6087,
  },
  {
    name: "LaBelle",
    lat: 26.7617,
    lng: -81.4384,
  },
  {
    name: "Punta Gorda",
    lat: 26.9298,
    lng: -82.0454,
  },
  {
    name: "Port Charlotte",
    lat: 26.9762,
    lng: -82.0906,
  },
  {
    name: "Sarasota",
    lat: 27.3364,
    lng: -82.5307,
  },
] as const;

export const SERVICE_AREAS = SERVICE_AREA_LOCATIONS.map((c) => c.name);

export type ServiceArea = (typeof SERVICE_AREAS)[number];
