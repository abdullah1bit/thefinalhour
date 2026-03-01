import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import TimelineNode from "@/components/timeline/TimelineNode";
import TimelineLegend from "@/components/timeline/TimelineLegend";
import TimelineEndMarker from "@/components/timeline/TimelineEndMarker";
import { useTimelineEvents } from "@/hooks/use-content";
import SeoSchema from "@/components/seo/SeoSchema";

export default function Timeline() {
  const { data: timelineSequence, isLoading } = useTimelineEvents();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <PageWrapper
      title="The Sequence"
      subtitle="The prophesied order of events from past to future"
    >
      <SeoSchema type="EventSeries" data={timelineSequence} />
      {/* Legend */}
      <TimelineLegend />

      {isLoading ? (
        <div className="flex justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : timelineSequence && timelineSequence.length > 0 ? (
        <>
          {/* Timeline container */}
          <div ref={timelineRef} className="relative">
            {/* Animated vertical progress line (desktop: centered, mobile: left offset) */}
            <div className="absolute left-[24px] top-0 bottom-0 md:left-1/2 md:-translate-x-1/2">
              {/* Background track line */}
              <div className="absolute inset-0 w-px bg-border/30" />

              {/* Animated fill line */}
              <motion.div
                className="w-px origin-top bg-primary/50"
                style={{ scaleY: smoothProgress, height: "100%" }}
              />
            </div>

            {/* Timeline nodes */}
            <div className="relative">
              {timelineSequence.map((event, index) => (
                <TimelineNode
                  key={event.id}
                  event={event}
                  index={index}
                  isLast={index === timelineSequence.length - 1}
                />
              ))}
            </div>

            {/* End marker */}
            <TimelineEndMarker />
          </div>
        </>
      ) : (
        <p className="text-center text-muted-foreground py-12">
          No timeline events found.
        </p>
      )}
    </PageWrapper>
  );
}
