import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Ariosa & Constructions LLC | Building Dreams. Delivering Quality.",
    template: "%s | Ariosa & Constructions LLC",
  },
  description:
    "Southwest Florida construction and subcontracting company serving Fort Myers, Cape Coral, Naples, Lehigh Acres, and surrounding areas. Framing, drywall, remodeling, flooring, painting, and more. Call (786) 786-5837.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://ariosaconstructions.com"
  ),
  openGraph: {
    title: "Ariosa & Constructions LLC",
    description: "Building Dreams. Delivering Quality.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
