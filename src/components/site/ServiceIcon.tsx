import {
  Bath,
  Building2,
  DoorOpen,
  Grid2x2,
  Hammer,
  HardHat,
  Home,
  Layers,
  Paintbrush,
  PanelTop,
  Square,
  Thermometer,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "hard-hat": HardHat,
  home: Home,
  bath: Bath,
  expand: PanelTop,
  layers: Layers,
  building: Building2,
  hammer: Hammer,
  frame: Grid2x2,
  truss: Grid2x2,
  drywall: Square,
  floor: Layers,
  paint: Paintbrush,
  door: DoorOpen,
  demolition: Hammer,
  window: PanelTop,
  insulation: Thermometer,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name] || HardHat;
  return <Icon className={className} />;
}
