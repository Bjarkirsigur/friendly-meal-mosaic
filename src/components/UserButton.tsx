
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User as UserIcon } from "lucide-react";

const UserButton = () => {
  // Simple user button without authentication functionality
  return (
    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
      <Avatar className="h-9 w-9">
        <AvatarFallback className="bg-primary/10 text-primary">
          <UserIcon className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
    </Button>
  );
};

export default UserButton;
