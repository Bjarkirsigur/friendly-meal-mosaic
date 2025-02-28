
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import WeekPlanner from "./pages/WeekPlanner";
import Meals from "./pages/Meals";
import Ingredients from "./pages/Ingredients";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { AppSidebar } from "./components/AppSidebar";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { MealDataInitializer } from "./components/MealDataInitializer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <MealDataInitializer />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/"
              element={
                <AppSidebar>
                  <div className="py-8 px-4 h-full">
                    <div className="max-w-7xl mx-auto">
                      <ProtectedRoute>
                        <Index />
                      </ProtectedRoute>
                    </div>
                  </div>
                </AppSidebar>
              }
            />
            <Route
              path="/week"
              element={
                <AppSidebar>
                  <div className="py-8 px-4 h-full">
                    <div className="max-w-7xl mx-auto">
                      <ProtectedRoute>
                        <WeekPlanner />
                      </ProtectedRoute>
                    </div>
                  </div>
                </AppSidebar>
              }
            />
            <Route
              path="/meals"
              element={
                <AppSidebar>
                  <div className="py-8 px-4 h-full">
                    <div className="max-w-7xl mx-auto">
                      <ProtectedRoute>
                        <Meals />
                      </ProtectedRoute>
                    </div>
                  </div>
                </AppSidebar>
              }
            />
            <Route
              path="/ingredients"
              element={
                <AppSidebar>
                  <div className="py-8 px-4 h-full">
                    <div className="max-w-7xl mx-auto">
                      <ProtectedRoute>
                        <Ingredients />
                      </ProtectedRoute>
                    </div>
                  </div>
                </AppSidebar>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
