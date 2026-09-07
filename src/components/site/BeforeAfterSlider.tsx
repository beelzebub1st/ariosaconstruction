"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  className,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(52);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "frame-corners relative aspect-[4/3] w-full overflow-hidden bg-navy-dark select-none touch-none shadow-[0_30px_60px_-35px_rgba(12,24,41,0.65)]",
        className
      )}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        updateFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <div className="relative h-full" style={{ width: `${100 / (position / 100)}%` }}>
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div
        className="absolute inset-y-0 z-10 w-px bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.55)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/80 bg-navy text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
          Drag
        </div>
      </div>

      <span className="absolute left-4 top-4 bg-navy/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
        Before
      </span>
      <span className="absolute right-4 top-4 bg-brick/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
        After
      </span>
    </div>
  );
}
