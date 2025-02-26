
import { BookOpen, Calendar, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface AppSidebarProps {
  children: ReactNode;
}

export function AppSidebar({ children }: AppSidebarProps) {
  const location = useLocation();

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full">
        <div className="flex-1 overflow-auto relative">
          <div className="fixed top-4 right-4 z-50">
            <Button variant="outline" size="icon">
              <SidebarTrigger>
                <Menu className="h-4 w-4" />
              </SidebarTrigger>
            </Button>
          </div>
          {children}
        </div>
        <Sidebar variant="floating" collapsible="offcanvas" side="right">
          <SidebarContent className="flex flex-col gap-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/'}>
                  <Link to="/" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Today's Plan</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/week'}>
                  <Link to="/week" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Week Planner</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/meals'}>
                  <Link to="/meals" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Meals</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarTrigger>
              <Menu className="w-4 h-4" />
            </SidebarTrigger>
          </SidebarFooter>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
