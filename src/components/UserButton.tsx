
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    getCurrentUser();

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <Button size="sm" variant="ghost" disabled></Button>;
  }

  if (!user) {
    return (
      <Button size="sm" variant="outline" className="flex items-center gap-2">
        <UserIcon className="w-4 h-4" /> Guest
      </Button>
    );
  }

  // Extract the first character of the email for avatar
  const emailInitial = user.email ? user.email[0].toUpperCase() : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary">
              {emailInitial}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <UserIcon className="w-4 h-4" /> Profile
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
