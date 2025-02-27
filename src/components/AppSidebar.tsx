
import { BookOpen, Calendar, LayoutGrid } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AppSidebarProps {
  children: ReactNode;
}

export function AppSidebar({ children }: AppSidebarProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col w-full bg-secondary/30">
      <div className="flex-1 overflow-auto pb-16">
        {children}
      </div>
      
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <nav className="flex items-center justify-around max-w-md mx-auto">
          <Link 
            to="/" 
            className={cn(
              "flex flex-col items-center justify-center p-3 transition-colors",
              location.pathname === '/' ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}
          >
            <LayoutGrid className="w-6 h-6" />
            <span className="text-xs mt-1">Today</span>
          </Link>
          
          <Link 
            to="/week" 
            className={cn(
              "flex flex-col items-center justify-center p-3 transition-colors",
              location.pathname === '/week' ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs mt-1">Week</span>
          </Link>
          
          <Link 
            to="/meals" 
            className={cn(
              "flex flex-col items-center justify-center p-3 transition-colors",
              location.pathname === '/meals' ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-xs mt-1">Meals</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
