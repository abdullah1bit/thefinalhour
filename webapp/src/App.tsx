import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
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
          </Route>

          {/* Public routes - with main layout */}
          <Route
            path="/"
            element={
              <div className="flex min-h-screen flex-col">
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
);

export default App;
