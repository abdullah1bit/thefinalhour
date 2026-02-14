import { useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useSession, signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  BookOpen,
  Quote,
  GraduationCap,
  Clock,
  Lightbulb,
  LogOut,
  Menu,
} from "lucide-react";

const sidebarLinks = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/signs", label: "Signs", icon: FileText, exact: false },
  { to: "/admin/major-signs", label: "Major Signs", icon: AlertTriangle, exact: false },
  { to: "/admin/glossary", label: "Glossary", icon: BookOpen, exact: false },
  { to: "/admin/verses", label: "Verses", icon: Quote, exact: false },
  { to: "/admin/scholarly-works", label: "Scholarly Works", icon: GraduationCap, exact: false },
  { to: "/admin/timeline", label: "Timeline", icon: Clock, exact: false },
  { to: "/admin/interpretations", label: "Interpretations", icon: Lightbulb, exact: false },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();

  const isActive = (link: typeof sidebarLinks[0]) => {
    if (link.exact) return location.pathname === link.to;
    return location.pathname.startsWith(link.to);
  };

  return (
    <nav className="flex flex-col gap-1 p-4">
      <Link
        to="/"
        className="mb-4 gold-text font-heading text-lg font-semibold tracking-wide"
        onClick={onNavigate}
      >
        The Final Hour
      </Link>
      <p className="mb-4 text-xs text-muted-foreground uppercase tracking-widest">
        Content Management
      </p>
      {sidebarLinks.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.to}
            to={link.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-body transition-colors",
              isActive(link)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminLayout() {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !session?.user) {
      navigate("/admin/login");
    }
  }, [isPending, session, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border/50 bg-card/30 lg:block">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <SidebarNav />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/50 bg-background/80 px-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {/* Mobile sidebar trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarNav />
              </SheetContent>
            </Sheet>
            <h1 className="font-heading text-lg font-semibold text-foreground">
              Admin Panel
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {session.user.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
