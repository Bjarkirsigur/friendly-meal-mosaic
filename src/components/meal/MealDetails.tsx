
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MacroInfo, Ingredient } from "@/types/meals";
import { MealImage } from "./MealImage";
import { MacroDisplay } from "./MacroDisplay";
import { IngredientsList } from "./IngredientsList";
import { Clock, BarChart2 } from "lucide-react";

interface MealDetailsProps {
  meal: string;
  macros: MacroInfo;
  ingredients: Ingredient[];
  recipe?: string;
  prepTime?: number;
  difficulty?: string;
}

export const MealDetails = ({ meal, macros, ingredients, recipe, prepTime, difficulty }: MealDetailsProps) => {
  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{meal}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <MealImage meal={meal} className="rounded-lg" />
        
        {/* Prep time and difficulty */}
        {(prepTime !== undefined || difficulty) && (
          <div className="flex items-center gap-6">
            {prepTime !== undefined && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{prepTime} min</span>
              </div>
            )}
            {difficulty && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <BarChart2 className="w-4 h-4" />
                <span>Difficulty: {difficulty}</span>
              </div>
            )}
          </div>
        )}
        
        <MacroDisplay macros={macros} className="p-4 bg-secondary/30 rounded-lg" size="large" />
        <IngredientsList ingredients={ingredients} />
        {recipe && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Recipe Instructions</h3>
            <p className="text-muted-foreground whitespace-pre-line">{recipe}</p>
          </div>
        )}
      </div>
    </DialogContent>
  );
};
