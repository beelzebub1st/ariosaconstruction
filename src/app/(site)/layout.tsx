import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { MobileStickyBar } from "@/components/site/MobileStickyBar";
import { SiteProviders } from "@/components/estimate/SiteProviders";
import { getServiceAreas, getServices, getSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, services, areas] = await Promise.all([
    getSettings(),
    getServices(),
    getServiceAreas(),
  ]);
  const cities = areas.map((a) => a.name);

  return (
    <SiteProviders services={services} phone={settings.phone} serviceAreas={cities}>
      <div className="flex min-h-screen flex-col pb-16 md:pb-0">
        <Header phone={settings.phone} companyName={settings.companyName} />
        <main className="flex-1">{children}</main>
        <Footer
          companyName={settings.companyName}
          tagline={settings.tagline}
          phone={settings.phone}
          email={settings.email}
          serviceArea={settings.serviceArea}
          cities={cities}
        />
        <MobileStickyBar phone={settings.phone} />
      </div>
    </SiteProviders>
  );
}
