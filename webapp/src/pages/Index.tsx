import { useHomepageContent } from "@/hooks/use-content";
import HeroSection from "@/components/home/HeroSection";
import AnnouncementBar from "@/components/home/AnnouncementBar";
import DisclaimerBanner from "@/components/home/DisclaimerBanner";
import HomepageProgressNav from "@/components/homepage/HomepageProgressNav";
import FoundationSection from "@/components/homepage/FoundationSection";
import FulfilledSection from "@/components/homepage/FulfilledSection";
import UnfoldingSection from "@/components/homepage/UnfoldingSection";
import MajorSignsSection from "@/components/homepage/MajorSignsSection";
import ApproachingSection from "@/components/homepage/ApproachingSection";
import InterpretationsSection from "@/components/homepage/InterpretationsSection";
import FeaturedVerse from "@/components/home/FeaturedVerse";
import BottomCTA from "@/components/homepage/BottomCTA";
import SectionDivider from "@/components/layout/SectionDivider";

const Index = () => {
  const { data, isLoading } = useHomepageContent();

  return (
    <div className="relative">
      <HomepageProgressNav />
      {data?.banners && data.banners.length > 0 ? (
        <AnnouncementBar banners={data.banners} />
      ) : null}
      <HeroSection />
      <DisclaimerBanner />

      {isLoading ? (
        <div className="flex justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : data ? (
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <FoundationSection />
          <SectionDivider label="Signs Fulfilled" />
          <FulfilledSection signs={data.fulfilledSigns} />
          <SectionDivider label="Signs Unfolding" />
          <UnfoldingSection signs={data.unfoldingSigns} />
          {data.approachingSigns && data.approachingSigns.length > 0 && (
            <>
              <SectionDivider label="Signs Approaching" />
              <ApproachingSection signs={data.approachingSigns} />
            </>
          )}
          <SectionDivider label="The Major Signs" />
          <MajorSignsSection signs={data.majorSigns} />
          <SectionDivider label="Modern Interpretations" />
          <InterpretationsSection interpretations={data.interpretations} />
        </div>
      ) : null}

      <SectionDivider />
      <FeaturedVerse verse={data?.featuredVerse} />
      <SectionDivider />
      <BottomCTA />
    </div>
  );
};

export default Index;
