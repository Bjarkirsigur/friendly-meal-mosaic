
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MacroInfo, Ingredient } from "@/types/meals";
import { MealImage } from "./MealImage";
import { MacroDisplay } from "./MacroDisplay";
import { IngredientsList } from "./IngredientsList";

interface MealDetailsProps {
  meal: string;
  macros: MacroInfo;
  ingredients: Ingredient[];
  recipe?: string;
}

export const MealDetails = ({ meal, macros, ingredients, recipe }: MealDetailsProps) => {
  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{meal}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <MealImage meal={meal} className="rounded-lg" />
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
