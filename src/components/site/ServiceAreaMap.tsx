"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";
import { SERVICE_AREA_LOCATIONS } from "@/lib/service-areas";

type Props = {
  className?: string;
  activeCity?: string | null;
  onSelectCity?: (city: string) => void;
};

export function ServiceAreaMap({ className, activeCity, onSelectCity }: Props) {
  const mapId = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const onSelectRef = useRef(onSelectCity);
  const [ready, setReady] = useState(false);

  onSelectRef.current = onSelectCity;

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const L = (await import("leaflet")).default;

      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 18,
      }).addTo(map);

      const bounds = L.latLngBounds([]);
      const markers = new Map<string, Marker>();

      for (const city of SERVICE_AREA_LOCATIONS) {
        const isHub = Boolean("hub" in city && city.hub);
        const icon = L.divIcon({
          className: "ariosa-map-marker",
          html: `<button type="button" class="ariosa-pin ${isHub ? "ariosa-pin--hub" : ""}" aria-label="${city.name}">
            <span class="ariosa-pin__dot"></span>
            <span class="ariosa-pin__label">${city.name}</span>
          </button>`,
          iconSize: [140, 48],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([city.lat, city.lng], { icon }).addTo(map);
        marker.on("click", () => onSelectRef.current?.(city.name));
        markers.set(city.name, marker);
        bounds.extend([city.lat, city.lng]);
      }

      map.fitBounds(bounds.pad(0.2));
      mapRef.current = map;
      markersRef.current = markers;
      setReady(true);
      requestAnimationFrame(() => map.invalidateSize());
    }

    void init();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = new Map();
    };
  }, []);

  useEffect(() => {
    if (!ready || !activeCity || !mapRef.current) return;
    const marker = markersRef.current.get(activeCity);
    const city = SERVICE_AREA_LOCATIONS.find((c) => c.name === activeCity);
    if (!marker || !city) return;

    mapRef.current.flyTo([city.lat, city.lng], Math.max(mapRef.current.getZoom(), 11), {
      duration: 0.75,
    });

    for (const [name, m] of markersRef.current) {
      const el = m.getElement()?.querySelector(".ariosa-pin");
      el?.classList.toggle("is-active", name === activeCity);
    }
  }, [activeCity, ready]);

  return (
    <div
      className={cn(
        "ariosa-map relative overflow-hidden border border-navy/10 bg-stone shadow-[0_30px_60px_-40px_rgba(12,24,41,0.45)]",
        className
      )}
    >
      <div
        id={`ariosa-service-map-${mapId}`}
        ref={containerRef}
        className="h-[380px] w-full sm:h-[460px] lg:h-[520px]"
      />
      {!ready ? (
        <div className="absolute inset-0 flex items-center justify-center bg-stone text-sm text-muted">
          Loading service area map…
        </div>
      ) : null}
      <div className="pointer-events-none absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
        <span className="bg-navy px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
          {SERVICE_AREA_LOCATIONS.length} cities · SW Florida
        </span>
      </div>
    </div>
  );
}
