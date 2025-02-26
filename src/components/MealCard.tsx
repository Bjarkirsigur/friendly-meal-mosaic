
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Edit2, Shuffle } from "lucide-react";
import EditMealModal from "./EditMealModal";
import { useState } from "react";

interface MacroInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Ingredient {
  name: string;
  grams: number;
  macros: MacroInfo;
}

interface MealCardProps {
  title: string;
  meal?: string;
  macros?: MacroInfo;
  ingredients?: Ingredient[];
  className?: string;
  onMealUpdate?: (ingredients: Ingredient[], macros: MacroInfo) => void;
  availableIngredients?: Ingredient[];
}

const MealCard = ({ title, meal, macros, ingredients, className, onMealUpdate, availableIngredients }: MealCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    if (meal && ingredients && availableIngredients) {
      setIsEditModalOpen(true);
    }
  };

  const handleSwitch = () => {
    if (availableIngredients && availableIngredients.length > 0) {
      // Get a random set of ingredients from availableIngredients
      const randomIngredients = [availableIngredients[Math.floor(Math.random() * availableIngredients.length)]];
      const newMacros = {
        calories: randomIngredients[0].macros.calories,
        protein: randomIngredients[0].macros.protein,
        carbs: randomIngredients[0].macros.carbs,
        fat: randomIngredients[0].macros.fat,
      };
      if (onMealUpdate) {
        onMealUpdate(randomIngredients, newMacros);
      }
    }
  };

  const handleSave = (newIngredients: Ingredient[], newMacros: MacroInfo) => {
    if (onMealUpdate) {
      onMealUpdate(newIngredients, newMacros);
    }
    setIsEditModalOpen(false);
  };

  return (
    <div className="relative group flex items-start">
      <div className="flex flex-col gap-1 absolute -left-10">
        <button 
          className="w-8 h-8 bg-secondary/50 hover:bg-secondary transition-colors duration-200 flex items-center justify-center cursor-pointer rounded-md"
          onClick={handleSwitch}
        >
          <Shuffle className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors duration-200" />
        </button>
        <button 
          className="w-8 h-8 bg-secondary/50 hover:bg-secondary transition-colors duration-200 flex items-center justify-center rounded-md cursor-pointer"
          onClick={handleEdit}
        >
          <Edit2 className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors duration-200" />
        </button>
      </div>

      <Card className={cn("p-4 h-40 transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary/10 animate-fade-in w-full", className)}>
        {meal ? (
          <>
            <p className="text-foreground mb-2">{meal}</p>
            {macros && (
              <div className="grid grid-cols-4 gap-4 text-xs text-muted-foreground mt-3">
                <div className="text-center">
                  <p className="font-medium text-sm mb-0.5">{macros.calories}</p>
                  <p>kcal</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm mb-0.5">{macros.protein}g</p>
                  <p>Protein</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm mb-0.5">{macros.carbs}g</p>
                  <p>Carbs</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm mb-0.5">{macros.fat}g</p>
                  <p>Fat</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-muted-foreground italic">No meal planned</p>
        )}
      </Card>

      {isEditModalOpen && ingredients && availableIngredients && (
        <EditMealModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          meal={meal || ""}
          ingredients={ingredients}
          onSave={handleSave}
          availableIngredients={availableIngredients}
        />
      )}
    </div>
  );
};

export default MealCard;
