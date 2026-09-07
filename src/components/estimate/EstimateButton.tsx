"use client";

import { Button } from "@/components/ui/Button";
import {
  useEstimate,
  type EstimatePrefill,
} from "@/components/estimate/EstimateContext";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "gold" | "outlineDark";
type Size = "sm" | "md" | "lg";

export function EstimateButton({
  children = "Get Free Estimate",
  className,
  variant = "primary",
  size = "md",
  prefill,
  onBeforeOpen,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"button">, "onClick"> & {
  variant?: Variant;
  size?: Size;
  prefill?: EstimatePrefill;
  onBeforeOpen?: () => void;
}) {
  const { openEstimate } = useEstimate();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={() => {
        onBeforeOpen?.();
        openEstimate(prefill);
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
