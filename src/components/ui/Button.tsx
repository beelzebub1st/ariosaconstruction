import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "gold" | "outlineDark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "btn-shine bg-brick text-white hover:bg-brick-dark shadow-[0_10px_30px_-12px_rgba(176,58,58,0.65)]",
  secondary:
    "btn-shine bg-navy text-white hover:bg-navy-dark shadow-[0_10px_30px_-12px_rgba(21,42,74,0.55)]",
  outline:
    "border border-white/55 text-white hover:border-gold hover:bg-white/8 backdrop-blur-sm",
  outlineDark:
    "border border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white",
  ghost: "text-navy hover:text-brick",
  gold: "btn-shine bg-gold text-navy-dark hover:bg-gold-soft font-semibold",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-xs uppercase tracking-[0.14em]",
  md: "px-5 py-3 text-xs uppercase tracking-[0.14em]",
  lg: "px-7 py-3.5 text-sm uppercase tracking-[0.16em]",
};

function buttonClass(variant: Variant, size: Size, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-sm font-bold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-60",
    variants[variant],
    sizes[size],
    className
  );
}

function isExternalHref(href: string) {
  return (
    href.startsWith("tel:") ||
    href.startsWith("sms:") ||
    href.startsWith("mailto:") ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  );
}

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  href = "#",
  ...props
}: Omit<React.ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  variant?: Variant;
  size?: Size;
}) {
  const classes = buttonClass(variant, size, className);
  if (isExternalHref(href)) {
    return <a {...props} href={href} className={classes} />;
  }
  return <Link {...props} href={href} className={classes} />;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button {...props} className={buttonClass(variant, size, className)} />
  );
}
