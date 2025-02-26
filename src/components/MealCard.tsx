
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MacroInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealCardProps {
  title: string;
  meal?: string;
  macros?: MacroInfo;
  className?: string;
}

const MealCard = ({ title, meal, macros, className }: MealCardProps) => {
  return (
    <Card className={cn("p-4 h-40 transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary/10 animate-fade-in", className)}>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      {meal ? (
        <>
          <p className="text-foreground mb-2">{meal}</p>
          {macros && (
            <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
              <div>
                <p className="font-medium">{macros.calories}</p>
                <p>kcal</p>
              </div>
              <div>
                <p className="font-medium">{macros.protein}g</p>
                <p>Protein</p>
              </div>
              <div>
                <p className="font-medium">{macros.carbs}g</p>
                <p>Carbs</p>
              </div>
              <div>
                <p className="font-medium">{macros.fat}g</p>
                <p>Fat</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-muted-foreground italic">No meal planned</p>
      )}
    </Card>
  );
};

export default MealCard;
