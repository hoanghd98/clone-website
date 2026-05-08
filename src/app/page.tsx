import HeroBanner from "@/components/home/HeroBanner";
import ServicesOverview from "@/components/home/ServicesOverview";
import LatestNews from "@/components/home/LatestNews";
import PartnerLogos from "@/components/home/PartnerLogos";

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
