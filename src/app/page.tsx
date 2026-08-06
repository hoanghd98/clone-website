import HeroBanner from "@/components/home/HeroBanner";
import ServicesOverview from "@/components/home/ServicesOverview";
import LatestNews from "@/components/home/LatestNews";
import PartnerLogos from "@/components/home/PartnerLogos";
import { publicDynamic, publicRevalidate } from "@/lib/public-cache";

export const dynamic = publicDynamic;
export const revalidate = publicRevalidate;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroBanner />
      <ServicesOverview />
      <LatestNews />
      <PartnerLogos />
    </main>
  );
}
