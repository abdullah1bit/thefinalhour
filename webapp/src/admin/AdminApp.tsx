import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import * as Sentry from "@sentry/react";
import AdminLogin from "@/admin/pages/AdminLogin";
import AdminLayout from "@/admin/pages/AdminLayout";
import AdminDashboard from "@/admin/pages/AdminDashboard";
import AdminSigns from "@/admin/pages/AdminSigns";
import AdminSignEdit from "@/admin/pages/AdminSignEdit";
import AdminMajorSigns from "@/admin/pages/AdminMajorSigns";
import AdminMajorSignEdit from "@/admin/pages/AdminMajorSignEdit";
import AdminGlossary from "@/admin/pages/AdminGlossary";
import AdminVerses from "@/admin/pages/AdminVerses";
import AdminScholarlyWorks from "@/admin/pages/AdminScholarlyWorks";
import AdminTimeline from "@/admin/pages/AdminTimeline";
import AdminInterpretations from "@/admin/pages/AdminInterpretations";
import AdminBanners from "@/admin/pages/AdminBanners";
import AdminSettings from "@/admin/pages/AdminSettings";
import AdminChangePassword from "@/admin/pages/AdminChangePassword";
import AdminBackup from "@/admin/pages/AdminBackup";

Sentry.init({
  dsn: "https://f439bd4d46ed7787bb4a37415ce0868a@o4510970063290368.ingest.us.sentry.io/4510970078887936",
  sendDefaultPii: true,
  enableLogs: true,
});

const queryClient = new QueryClient();

export default function AdminApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
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
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
