
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Edit2, Shuffle, Book, X } from "lucide-react";
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
import { MealImage } from "./meal/MealImage";
import { MacroDisplay } from "./meal/MacroDisplay";
import { MealDetails } from "./meal/MealDetails";
import { Button } from "@/components/ui/button";

interface MealCardProps {
  title: string;
  meal?: string;
  macros?: MacroInfo;
  ingredients?: Ingredient[];
  className?: string;
  onMealUpdate?: (ingredients: Ingredient[], macros: MacroInfo, mealName: string) => void;
  availableIngredients?: Ingredient[];
  macroVisibility: MacroInfo;
}

const MealCard = ({ title, meal, macros, ingredients, className, onMealUpdate, availableIngredients, macroVisibility }: MealCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSwitchDialogOpen, setIsSwitchDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllMeals, setShowAllMeals] = useState(false);

  // Extract meal type from title (e.g., "Monday Breakfast" -> "Breakfast")
  const mealType = title.split(" ").pop() || "";

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (meal && ingredients && availableIngredients) {
      setIsEditModalOpen(true);
    }
  };

  const handleEmptyCardClick = () => {
    setIsSwitchDialogOpen(true);
    setShowAllMeals(false); // Reset to default view when opening dialog
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMealUpdate) {
      // Pass empty ingredients and macros to effectively remove the meal
      onMealUpdate([], {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }, "");
    }
  };

  const handleSwitch = (selectedMeal: Meal) => {
    if (onMealUpdate) {
      onMealUpdate(selectedMeal.ingredients, selectedMeal.macros, selectedMeal.meal);
    }
    setIsSwitchDialogOpen(false);
    setShowAllMeals(false); // Reset state for next time
  };

  const handleSave = (newIngredients: Ingredient[], newMacros: MacroInfo) => {
    if (onMealUpdate && meal) {
      onMealUpdate(newIngredients, newMacros, meal);
    }
    setIsEditModalOpen(false);
  };

  const handleCardClick = () => {
    if (meal) {
      setIsDetailsOpen(true);
    } else {
      handleEmptyCardClick();
    }
  };

  const toggleAllMeals = () => {
    setShowAllMeals(!showAllMeals);
  };

  // Filter meals based on the meal type
  const filterMealsByType = (meals: Record<string, Meal[]>) => {
    if (showAllMeals) {
      // Show all categories when showAllMeals is true
      return Object.entries(meals)
        .map(([category, categoryMeals]) => {
          // Apply search filter if provided
          const filteredMeals = searchTerm 
            ? categoryMeals.filter(meal =>
                meal.meal.toLowerCase().includes(searchTerm.toLowerCase()) ||
                meal.ingredients.some(ing => 
                  ing.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
              )
            : categoryMeals;
          
          return [category, filteredMeals] as [string, Meal[]];
        })
        .filter(([_, meals]) => meals.length > 0);
    } else {
      // Define which category to show for each meal type
      let categoryToShow: string;
      
      if (mealType === "Breakfast") {
        categoryToShow = "Breakfast";
      } else if (mealType === "Lunch") {
        categoryToShow = "Lunch";
      } else if (mealType === "Dinner") {
        categoryToShow = "Dinner";
      } else if (mealType.includes("Snack")) {
        categoryToShow = "Snacks"; 
      } else {
        // Default case - shouldn't happen with our current structure
        categoryToShow = "";
      }

      // Only filter to the relevant category
      return Object.entries(meals)
        .filter(([category]) => category === categoryToShow)
        .map(([category, categoryMeals]) => {
          // Further filter by search term if provided
          const filteredMeals = searchTerm 
            ? categoryMeals.filter(meal =>
                meal.meal.toLowerCase().includes(searchTerm.toLowerCase()) ||
                meal.ingredients.some(ing => 
                  ing.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
              )
            : categoryMeals;
          
          return [category, filteredMeals] as [string, Meal[]];
        })
        .filter(([_, meals]) => meals.length > 0);
    }
  };

  const currentMealDetails = meal ? MEALS[title]?.find(m => m.meal === meal) : null;

  return (
    <div className="flex flex-col gap-2">
      {meal && (
        <div className="flex gap-1 justify-end">
          <button 
            className="w-8 h-8 bg-secondary/50 hover:bg-destructive hover:text-white transition-colors duration-200 flex items-center justify-center cursor-pointer rounded-md"
            onClick={handleRemove}
          >
            <X className="w-4 h-4" />
          </button>
          <button 
            className="w-8 h-8 bg-secondary/50 hover:bg-secondary transition-colors duration-200 flex items-center justify-center cursor-pointer rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              setIsSwitchDialogOpen(true);
              setShowAllMeals(false); // Reset to default view
            }}
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
      )}

      <Card 
        className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary/10 animate-fade-in w-full", 
          !meal && "cursor-pointer hover:bg-secondary/50",
          className
        )}
        onClick={handleCardClick}
      >
        {meal ? (
          <>
            <MealImage meal={meal} />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-foreground">{meal}</p>
                {currentMealDetails?.recipe && (
                  <Book className="w-4 h-4 text-primary/50" />
                )}
              </div>
              {macros && (
                <MacroDisplay 
                  macros={macros} 
                  visibilitySettings={macroVisibility}
                  className="text-xs text-muted-foreground mt-3" 
                />
              )}
              {currentMealDetails?.recipe && (
                <div className="mt-3 text-xs text-muted-foreground">
                  <p className="line-clamp-2">{currentMealDetails.recipe.split('\n')[0]}...</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="min-h-[200px] p-4 flex items-center justify-center">
            <p className="text-muted-foreground italic">Click to add a meal</p>
          </div>
        )}
      </Card>

      {/* Meal Details Dialog */}
      {meal && macros && ingredients && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <MealDetails
            meal={meal}
            macros={macros}
            ingredients={ingredients}
            recipe={currentMealDetails?.recipe}
          />
        </Dialog>
      )}

      {/* Edit Modal */}
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

      {/* Switch Dialog */}
      <Dialog open={isSwitchDialogOpen} onOpenChange={setIsSwitchDialogOpen}>
        <DialogContent className="max-h-[90vh] md:max-h-[80vh] w-[95vw] md:w-full overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Choose a {mealType}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full mb-4">
              <Input
                placeholder="Search meals or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
              <Button 
                variant={showAllMeals ? "default" : "outline"} 
                className="whitespace-nowrap"
                onClick={toggleAllMeals}
              >
                {showAllMeals ? "Show Relevant" : "Show All Meals"}
              </Button>
            </div>
            
            {filterMealsByType(MEALS).map(([category, meals]) => (
              <div key={category} className="space-y-4">
                <h3 className="font-semibold text-lg">{category}</h3>
                <div className="grid gap-4">
                  {meals.map((availableMeal, index) => (
                    <button
                      key={index}
                      onClick={() => handleSwitch(availableMeal)}
                      className="flex flex-col gap-3 p-4 hover:bg-secondary/50 rounded-lg transition-colors duration-200 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-lg">{availableMeal.meal}</p>
                        {availableMeal.recipe && (
                          <Book className="w-4 h-4 text-primary/50" />
                        )}
                      </div>
                      <MacroDisplay 
                        macros={availableMeal.macros}
                        visibilitySettings={macroVisibility}
                        className="text-xs text-muted-foreground" 
                      />
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
                      {availableMeal.recipe && (
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium mb-1">Recipe:</p>
                          <p className="whitespace-pre-line">{availableMeal.recipe}</p>
                        </div>
                      )}
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
