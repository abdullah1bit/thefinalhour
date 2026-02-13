import HeroSection from "@/components/home/HeroSection";
import DisclaimerBanner from "@/components/home/DisclaimerBanner";
import NavigationGates from "@/components/home/NavigationGates";
import QuickOverview from "@/components/home/QuickOverview";
import FeaturedVerse from "@/components/home/FeaturedVerse";
import MoreLinks from "@/components/home/MoreLinks";

const Index = () => {
  return (
    <div className="bg-background">
      <HeroSection />
      <DisclaimerBanner />
      <NavigationGates />

      {/* Divider */}
      <div className="mx-auto h-px w-24 bg-border/40" />

      <QuickOverview />

      {/* Divider */}
      <div className="mx-auto h-px w-24 bg-primary/20" />

      <FeaturedVerse />

      {/* Divider */}
      <div className="mx-auto h-px w-24 bg-border/40" />

      <MoreLinks />
    </div>
  );
};

export default Index;
