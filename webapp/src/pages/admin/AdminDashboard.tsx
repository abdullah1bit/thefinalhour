import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  AlertTriangle,
  BookOpen,
  Quote,
  GraduationCap,
  Clock,
  Lightbulb,
  Megaphone,
  Settings2,
} from "lucide-react";
import {
  useSigns,
  useMajorSigns,
  useGlossaryTerms,
  useQuranicVerses,
  useScholarlyWorks,
  useTimelineEvents,
  useInterpretations,
  useBanners,
} from "@/hooks/use-content";
import { VisitorStats } from "@/components/admin/VisitorStats";

interface StatCardProps {
  title: string;
  count: number | undefined;
  loading: boolean;
  icon: React.ReactNode;
  to: string;
}

function StatCard({ title, count, loading, icon, to }: StatCardProps) {
  return (
    <Link to={to}>
      <Card className="border-border/50 bg-card/60 transition-all duration-200 hover:border-primary/30 hover:bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-8 w-16 animate-pulse rounded bg-secondary" />
          ) : (
            <p className="text-3xl font-heading font-bold text-foreground">
              {count ?? 0}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export default function AdminDashboard() {
  const { data: signs, isLoading: signsLoading } = useSigns();
  const { data: majorSigns, isLoading: majorLoading } = useMajorSigns();
  const { data: glossary, isLoading: glossaryLoading } = useGlossaryTerms();
  const { data: verses, isLoading: versesLoading } = useQuranicVerses();
  const { data: works, isLoading: worksLoading } = useScholarlyWorks();
  const { data: timeline, isLoading: timelineLoading } = useTimelineEvents();
  const { data: interpretations, isLoading: interpLoading } =
    useInterpretations();
  const { data: banners, isLoading: bannersLoading } = useBanners();

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
        Dashboard
      </h2>
      <VisitorStats />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard
          title="Signs"
          count={signs?.length}
          loading={signsLoading}
          icon={<FileText className="h-5 w-5 text-muted-foreground" />}
          to="/admin/signs"
        />
        <StatCard
          title="Major Signs"
          count={majorSigns?.length}
          loading={majorLoading}
          icon={<AlertTriangle className="h-5 w-5 text-muted-foreground" />}
          to="/admin/major-signs"
        />
        <StatCard
          title="Glossary Terms"
          count={glossary?.length}
          loading={glossaryLoading}
          icon={<BookOpen className="h-5 w-5 text-muted-foreground" />}
          to="/admin/glossary"
        />
        <StatCard
          title="Quranic Verses"
          count={verses?.length}
          loading={versesLoading}
          icon={<Quote className="h-5 w-5 text-muted-foreground" />}
          to="/admin/verses"
        />
        <StatCard
          title="Scholarly Works"
          count={works?.length}
          loading={worksLoading}
          icon={<GraduationCap className="h-5 w-5 text-muted-foreground" />}
          to="/admin/scholarly-works"
        />
        <StatCard
          title="Timeline Events"
          count={timeline?.length}
          loading={timelineLoading}
          icon={<Clock className="h-5 w-5 text-muted-foreground" />}
          to="/admin/timeline"
        />
        <StatCard
          title="Interpretations"
          count={interpretations?.length}
          loading={interpLoading}
          icon={<Lightbulb className="h-5 w-5 text-muted-foreground" />}
          to="/admin/interpretations"
        />
        <StatCard
          title="Banners"
          count={banners?.length}
          loading={bannersLoading}
          icon={<Megaphone className="h-5 w-5 text-muted-foreground" />}
          to="/admin/banners"
        />
        <Link to="/admin/settings">
          <Card className="border-border/50 bg-card/60 transition-all duration-200 hover:border-primary/30 hover:bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Site Settings
              </CardTitle>
              <Settings2 className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Configure site title, tagline, and more
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
