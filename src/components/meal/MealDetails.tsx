
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MacroInfo, Ingredient, DifficultyLevel } from "@/types/meals";
import { MacroDisplay } from "./MacroDisplay";
import { MealImage } from "./MealImage";
import { IngredientsList } from "./IngredientsList";
import { Clock, BarChart2, Coffee } from "lucide-react";
import { DrinkAccompaniment } from "@/hooks/useMealPlanner";
import { useMeals } from "@/hooks/useMeals";
import { getProteinRatio, getProteinRatioDescription } from "@/utils/proteinRatio";

interface MealDetailsProps {
  meal: string;
  macros: MacroInfo;
  ingredients: Ingredient[];
  recipe?: string;
  prepTime?: number;
  difficulty?: DifficultyLevel;
  drinksAndAccompaniments?: DrinkAccompaniment[];
  drinksMacros?: MacroInfo;
}

export const MealDetails = ({ 
  meal, 
  macros, 
  ingredients, 
  recipe, 
  prepTime, 
  difficulty,
  drinksAndAccompaniments = [],
  drinksMacros
}: MealDetailsProps) => {
  const { updateMeal, meals } = useMeals();
  
  const currentMeal = meals.find(m => m.meal === meal);
  
  const handleImageUpdate = async (newImageUrl: string) => {
    if (currentMeal?.id) {
      // Update the meal with the new image URL
      await updateMeal(currentMeal.id, {
        image_url: newImageUrl
      });
    }
  };

  const { classification, color } = getProteinRatio(macros.calories, macros.protein);
  const proteinRatioDescription = getProteinRatioDescription(macros.calories, macros.protein);
  
  const proteinRatioColors = {
    'High': 'bg-gradient-to-r from-emerald-500 to-emerald-400',
    'Medium': 'bg-gradient-to-r from-amber-500 to-amber-400',
    'Low': 'bg-gradient-to-r from-rose-500 to-rose-400'
  };
  
  return (
    <DialogContent className="max-w-2xl max-h-[90vh] lg:max-h-[80vh] overflow-hidden">
      <DialogHeader>
        <DialogTitle className="text-xl md:text-2xl">{meal}</DialogTitle>
      </DialogHeader>
      
      <ScrollArea className="max-h-[calc(90vh-140px)] md:max-h-[calc(80vh-140px)]">
        <div className="space-y-6 py-4">
          <div className="h-[200px] md:h-[300px] w-full relative rounded-lg overflow-hidden">
            <MealImage 
              meal={meal} 
              className="w-full h-full object-cover"
              imageUrl={currentMeal?.image_url}
              onImageUpdate={handleImageUpdate}
              editable={true}
            />
          </div>
          
          <div className="space-y-6">
            {/* Meal info section */}
            <div className="space-y-4">
              <div className="inline-flex px-3 py-2 rounded-lg bg-secondary/50 items-center">
                <div className={`w-3 h-3 rounded-full ${proteinRatioColors[classification]} mr-2 shadow-sm`}></div>
                <div>
                  <span className="font-medium text-sm">{classification} protein content</span>
                  <p className="text-xs text-muted-foreground">{proteinRatioDescription}</p>
                </div>
              </div>
              
              {(prepTime !== undefined || difficulty) && (
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {prepTime !== undefined && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{prepTime} minutes prep time</span>
                    </div>
                  )}
                  {difficulty && (
                    <div className="flex items-center gap-1">
                      <BarChart2 className="w-4 h-4" />
                      <span>{difficulty} difficulty</span>
                    </div>
                  )}
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Macros</h3>
                <MacroDisplay 
                  macros={macros}
                  visibilitySettings={{
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0,
                    showCalories: true,
                    showProtein: true,
                    showCarbs: true,
                    showFat: true
                  }}
                  className="text-sm" 
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <IngredientsList ingredients={ingredients} />
              
              {drinksAndAccompaniments.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Coffee className="w-5 h-5" />
                    <h3>Drinks & Accompaniments</h3>
                  </div>
                  <div className="space-y-2">
                    {drinksAndAccompaniments.map((item, idx) => (
                      <div key={idx} className="p-2 bg-secondary/20 rounded">
                        <span>{item.name}</span>
                        {item.grams > 0 && <span className="ml-2 text-xs text-muted-foreground">({item.grams}g)</span>}
                      </div>
                    ))}
                  </div>
                  
                  {drinksMacros && (drinksMacros.calories > 0 || drinksMacros.protein > 0 || drinksMacros.carbs > 0 || drinksMacros.fat > 0) && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Drinks & Accompaniments Macros:</h4>
                      <MacroDisplay 
                        macros={drinksMacros}
                        visibilitySettings={{
                          calories: 0,
                          protein: 0,
                          carbs: 0,
                          fat: 0,
                          showCalories: true,
                          showProtein: true,
                          showCarbs: true,
                          showFat: true
                        }}
                        className="text-xs" 
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {recipe && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Recipe</h3>
                <div className="text-muted-foreground whitespace-pre-line">
                  {recipe}
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};
