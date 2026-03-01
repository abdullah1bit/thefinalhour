import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { api } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { SEO } from "@/components/seo/SEO";
import Index from "./pages/Index";
import Timeline from "./pages/Timeline";
import Glossary from "./pages/Glossary";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSigns from "./pages/admin/AdminSigns";
import AdminSignEdit from "./pages/admin/AdminSignEdit";
import AdminMajorSigns from "./pages/admin/AdminMajorSigns";
import AdminMajorSignEdit from "./pages/admin/AdminMajorSignEdit";
import AdminGlossary from "./pages/admin/AdminGlossary";
import AdminVerses from "./pages/admin/AdminVerses";
import AdminScholarlyWorks from "./pages/admin/AdminScholarlyWorks";
import AdminTimeline from "./pages/admin/AdminTimeline";
import AdminInterpretations from "./pages/admin/AdminInterpretations";
import AdminBanners from "./pages/admin/AdminBanners";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminChangePassword from "./pages/admin/AdminChangePassword";
import AdminBackup from "./pages/admin/AdminBackup";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Don't track admin pages
    if (pathname.startsWith("/admin")) return;

    api.post("/api/analytics/track", { path: pathname })
      .catch(err => console.error("Error tracking visit:", err));
  }, [pathname]);

  return null;
}


const App = () => (
  <PostHogProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <PageTracker />
          <Routes>
            {/* Admin routes - no main layout */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="signs" element={<AdminSigns />} />
              <Route path="signs/:id" element={<AdminSignEdit />} />
              <Route path="major-signs" element={<AdminMajorSigns />} />
              <Route path="major-signs/:id" element={<AdminMajorSignEdit />} />
              <Route path="glossary" element={<AdminGlossary />} />
              <Route path="verses" element={<AdminVerses />} />
              <Route path="scholarly-works" element={<AdminScholarlyWorks />} />
              <Route path="timeline" element={<AdminTimeline />} />
              <Route path="interpretations" element={<AdminInterpretations />} />
              <Route path="banners" element={<AdminBanners />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="change-password" element={<AdminChangePassword />} />
              <Route path="backup" element={<AdminBackup />} />
            </Route>

            {/* Public routes - with main layout */}
            <Route
              path="/"
              element={
                <div className="flex min-h-screen flex-col">
                  <SEO />
                  <Navbar />
                  <main className="flex-1">
                    <Index />
                  </main>
                  <Footer />
                </div>
              }
            />
            <Route
              path="/timeline"
              element={
                <div className="flex min-h-screen flex-col">
                  <SEO title="Timeline of Signs" description="A visual timeline of the major and minor signs of the end times in Islam." path="/timeline" />
                  <Navbar />
                  <main className="flex-1">
                    <Timeline />
                  </main>
                  <Footer />
                </div>
              }
            />
            <Route
              path="/glossary"
              element={
                <div className="flex min-h-screen flex-col">
                  <SEO title="Glossary of Terms" description="A dictionary of key Arabic terms and concepts relating to Islamic eschatology." path="/glossary" />
                  <Navbar />
                  <main className="flex-1">
                    <Glossary />
                  </main>
                  <Footer />
                </div>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route
              path="*"
              element={
                <div className="flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1">
                    <NotFound />
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </PostHogProvider>
);

export default App;
