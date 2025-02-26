
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WeekPlanner from "./pages/WeekPlanner";
import Meals from "./pages/Meals";
import NotFound from "./pages/NotFound";
import { AppSidebar } from "./components/AppSidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppSidebar>
          <div className="container mx-auto py-8 px-4">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/week" element={<WeekPlanner />} />
                <Route path="/meals" element={<Meals />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </AppSidebar>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
