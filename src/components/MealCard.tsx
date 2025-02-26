
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MealCardProps {
  title: string;
  meal?: string;
  className?: string;
}

const MealCard = ({ title, meal, className }: MealCardProps) => {
  return (
    <Card className={cn("p-4 h-32 transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary/10 animate-fade-in", className)}>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      {meal ? (
        <p className="text-foreground">{meal}</p>
      ) : (
        <p className="text-muted-foreground italic">No meal planned</p>
      )}
    </Card>
  );
};

export default MealCard;
