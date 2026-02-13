import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import Foundation from "./pages/Foundation";
import Fulfilled from "./pages/Fulfilled";
import Unfolding from "./pages/Unfolding";
import MajorSigns from "./pages/MajorSigns";
import Timeline from "./pages/Timeline";
import Glossary from "./pages/Glossary";
import Interpretations from "./pages/Interpretations";
import NotFound from "./pages/NotFound";

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
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/foundation" element={<Foundation />} />
              <Route path="/fulfilled" element={<Fulfilled />} />
              <Route path="/unfolding" element={<Unfolding />} />
              <Route path="/major-signs" element={<MajorSigns />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/interpretations" element={<Interpretations />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
