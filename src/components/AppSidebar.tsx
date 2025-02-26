
import { BookOpen, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent className="flex flex-col gap-4">
            <Link 
              to="/meals" 
              className="flex items-center gap-2 px-4 py-2 text-primary hover:text-primary/80 hover:bg-secondary/50 rounded-lg transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Browse Available Meals
            </Link>
          </SidebarContent>
          <SidebarFooter>
            <SidebarTrigger>
              <Menu className="w-4 h-4" />
            </SidebarTrigger>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto py-8 px-4">
            <div className="max-w-7xl mx-auto">
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
