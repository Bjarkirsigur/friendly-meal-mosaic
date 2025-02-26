
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
import { useIsMobile } from "@/hooks/use-mobile";

interface AppSidebarProps {
  children: ReactNode;
}

export function AppSidebar({ children }: AppSidebarProps) {
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full">
        <div className="flex-1 overflow-auto relative">
          <div className="fixed top-4 right-4 z-[60] md:block">
            <Button variant="outline" size="icon" className="h-8 w-8 md:h-9 md:w-9">
              <SidebarTrigger>
                <Menu className="h-4 w-4" />
              </SidebarTrigger>
            </Button>
          </div>
          {children}
        </div>
        <Sidebar 
          variant="floating" 
          collapsible="offcanvas" 
          side="right" 
          className="!w-[280px] md:!w-[320px] bg-background border-l shadow-xl z-50"
        >
          <SidebarContent className="flex flex-col gap-4 py-6">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/'}>
                  <Link to="/" className="flex items-center gap-2 text-base">
                    <Calendar className="w-5 h-5" />
                    <span>Today's Plan</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/week'}>
                  <Link to="/week" className="flex items-center gap-2 text-base">
                    <Calendar className="w-5 h-5" />
                    <span>Week Planner</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/meals'}>
                  <Link to="/meals" className="flex items-center gap-2 text-base">
                    <BookOpen className="w-5 h-5" />
                    <span>Meals</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t">
            <SidebarTrigger className="w-full">
              <Button variant="outline" className="w-full gap-2">
                <Menu className="w-4 h-4" />
                <span>Close Menu</span>
              </Button>
            </SidebarTrigger>
          </SidebarFooter>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
