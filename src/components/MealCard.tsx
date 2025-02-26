
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Edit2, Shuffle } from "lucide-react";
import EditMealModal from "./EditMealModal";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MEALS } from "@/data/mealsData";
import { Input } from "@/components/ui/input";
import { MacroInfo, Ingredient, Meal } from "@/types/meals";

interface MealCardProps {
  title: string;
  meal?: string;
  macros?: MacroInfo;
  ingredients?: Ingredient[];
  className?: string;
  onMealUpdate?: (ingredients: Ingredient[], macros: MacroInfo) => void;
  availableIngredients?: Ingredient[];
  macroVisibility: MacroInfo;
}

const MealCard = ({ title, meal, macros, ingredients, className, onMealUpdate, availableIngredients, macroVisibility }: MealCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSwitchDialogOpen, setIsSwitchDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = () => {
    if (meal && ingredients && availableIngredients) {
      setIsEditModalOpen(true);
    }
  };

  const handleSwitch = (selectedMeal: { ingredients: Ingredient[], macros: MacroInfo }) => {
    if (onMealUpdate) {
      onMealUpdate(selectedMeal.ingredients, selectedMeal.macros);
    }
    setIsSwitchDialogOpen(false);
  };

  const handleSave = (newIngredients: Ingredient[], newMacros: MacroInfo) => {
    if (onMealUpdate) {
      onMealUpdate(newIngredients, newMacros);
    }
    setIsEditModalOpen(false);
  };

  const filterMeals = (meals: Record<string, Meal[]>) => {
    const filteredEntries = Object.entries(meals).map(([category, categoryMeals]) => {
      const filteredMeals = categoryMeals.filter(meal =>
        meal.meal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.ingredients.some(ing => 
          ing.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      return [category, filteredMeals] as [string, Meal[]];
    });
    return filteredEntries.filter(([_, meals]) => meals.length > 0);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 justify-end">
        <button 
          className="w-8 h-8 bg-secondary/50 hover:bg-secondary transition-colors duration-200 flex items-center justify-center cursor-pointer rounded-md"
          onClick={() => setIsSwitchDialogOpen(true)}
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
                {macroVisibility.showCalories && (
                  <div className="text-center">
                    <p className="font-medium text-sm mb-0.5">{macros.calories}</p>
                    <p>kcal</p>
                  </div>
                )}
                {macroVisibility.showProtein && (
                  <div className="text-center">
                    <p className="font-medium text-sm mb-0.5">{macros.protein}g</p>
                    <p>Protein</p>
                  </div>
                )}
                {macroVisibility.showCarbs && (
                  <div className="text-center">
                    <p className="font-medium text-sm mb-0.5">{macros.carbs}g</p>
                    <p>Carbs</p>
                  </div>
                )}
                {macroVisibility.showFat && (
                  <div className="text-center">
                    <p className="font-medium text-sm mb-0.5">{macros.fat}g</p>
                    <p>Fat</p>
                  </div>
                )}
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
          macroVisibility={macroVisibility}
        />
      )}

      <Dialog open={isSwitchDialogOpen} onOpenChange={setIsSwitchDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Choose a Meal</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <Input
              placeholder="Search meals or ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-4"
            />
            {filterMeals(MEALS).map(([category, meals]) => (
              <div key={category} className="space-y-4">
                <h3 className="font-semibold text-lg">{category}</h3>
                <div className="grid gap-4">
                  {meals.map((availableMeal, index) => (
                    <button
                      key={index}
                      onClick={() => handleSwitch(availableMeal)}
                      className="flex flex-col gap-3 p-4 hover:bg-secondary/50 rounded-lg transition-colors duration-200 text-left"
                    >
                      <p className="font-medium text-lg">{availableMeal.meal}</p>
                      <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
                        {macroVisibility.showCalories && (
                          <div className="text-center">
                            <p className="font-medium">{availableMeal.macros.calories}</p>
                            <p>kcal</p>
                          </div>
                        )}
                        {macroVisibility.showProtein && (
                          <div className="text-center">
                            <p className="font-medium">{availableMeal.macros.protein}g</p>
                            <p>Protein</p>
                          </div>
                        )}
                        {macroVisibility.showCarbs && (
                          <div className="text-center">
                            <p className="font-medium">{availableMeal.macros.carbs}g</p>
                            <p>Carbs</p>
                          </div>
                        )}
                        {macroVisibility.showFat && (
                          <div className="text-center">
                            <p className="font-medium">{availableMeal.macros.fat}g</p>
                            <p>Fat</p>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium mb-1">Ingredients:</p>
                        <ul className="list-disc pl-4 space-y-1">
                          {availableMeal.ingredients.map((ingredient, idx) => (
                            <li key={idx}>
                              {ingredient.name} ({ingredient.grams}g)
                            </li>
                          ))}
                        </ul>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MealCard;
