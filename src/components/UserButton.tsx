
import { Button } from "@/components/ui/button";
import { User as UserIcon } from "lucide-react";

const UserButton = () => {
  // Simplified user button without authentication functionality
  return (
    <Button size="sm" variant="ghost" className="relative h-9 w-9 rounded-full">
      <UserIcon className="h-5 w-5" />
    </Button>
  );
};

export default UserButton;
