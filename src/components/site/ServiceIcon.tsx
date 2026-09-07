import {
  Bath,
  Building2,
  Expand,
  HardHat,
  Home,
  Layers,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "hard-hat": HardHat,
  home: Home,
  bath: Bath,
  expand: Expand,
  layers: Layers,
  building: Building2,
  hammer: HardHat,
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
