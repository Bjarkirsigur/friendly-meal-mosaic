
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppSidebarProps {
  children: ReactNode;
}

function SidebarNavigation() {
  const location = useLocation();
  const { setOpen } = useSidebar();

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-4 py-6">
        <div className="px-4 mb-2">
          <h2 className="text-lg font-semibold text-primary">Menu</h2>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/'}>
              <Link 
                to="/" 
                className="flex items-center gap-3 text-base px-4 py-2 hover:bg-secondary/50 transition-colors"
                onClick={handleClick}
              >
                <Calendar className="w-5 h-5 text-primary" />
                <span>Today's Plan</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/week'}>
              <Link 
                to="/week" 
                className="flex items-center gap-3 text-base px-4 py-2 hover:bg-secondary/50 transition-colors"
                onClick={handleClick}
              >
                <Calendar className="w-5 h-5 text-primary" />
                <span>Week Planner</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/meals'}>
              <Link 
                to="/meals" 
                className="flex items-center gap-3 text-base px-4 py-2 hover:bg-secondary/50 transition-colors"
                onClick={handleClick}
              >
                <BookOpen className="w-5 h-5 text-primary" />
                <span>Meals</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
      <SidebarFooter className="p-4 border-t">
        <SidebarTrigger className="w-full">
          <Button 
            variant="secondary" 
            className="w-full gap-2 py-6 text-base font-medium hover:bg-secondary/50"
          >
            <Menu className="w-5 h-5" />
            <span>Close Menu</span>
          </Button>
        </SidebarTrigger>
      </SidebarFooter>
    </>
  );
}

export function AppSidebar({ children }: AppSidebarProps) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-secondary/30">
        <div className="flex-1 overflow-auto relative">
          <div className="fixed top-4 right-4 z-[60]">
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-10 w-10 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <SidebarTrigger>
                <Menu className="h-5 h-5" />
              </SidebarTrigger>
            </Button>
          </div>
          {children}
        </div>
        <Sidebar 
          variant="floating" 
          collapsible="offcanvas" 
          side="right" 
          className="!w-[85vw] md:!w-[320px] bg-white border-l shadow-lg z-50"
        >
          <SidebarContent>
            <SidebarNavigation />
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
