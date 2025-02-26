
import { BookOpen, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface AppSidebarProps {
  children: ReactNode;
}

export function AppSidebar({ children }: AppSidebarProps) {
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
          <SidebarRail />
        </Sidebar>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
