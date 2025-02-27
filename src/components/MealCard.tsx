
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Edit2, Shuffle, Book, X, ChevronDown, ChevronUp, Clock, BarChart2 } from "lucide-react";
import EditMealModal from "./EditMealModal";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MacroInfo, Ingredient, Meal, MealCategory } from "@/types/meals";
import { MealImage } from "./meal/MealImage";
import { MacroDisplay } from "./meal/MacroDisplay";
import { MealDetails } from "./meal/MealDetails";
import { Button } from "@/components/ui/button";
import { useMeals } from "@/hooks/useMeals";

interface MealCardProps {
  title: string;
  meal?: string;
  macros?: MacroInfo;
  ingredients?: Ingredient[];
  className?: string;
  onMealUpdate?: (ingredients: Ingredient[], macros: MacroInfo, mealName: string) => void;
  macroVisibility: MacroInfo;
}

const MealCard = ({ title, meal, macros, ingredients, className, onMealUpdate, macroVisibility }: MealCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSwitchDialogOpen, setIsSwitchDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllMeals, setShowAllMeals] = useState(false);
  const [expandedMeals, setExpandedMeals] = useState<Record<string, boolean>>({});
  const { meals, loading: loadingMeals } = useMeals();

  // Extract meal type from title (e.g., "Monday Breakfast" -> "Breakfast")
  const mealType = title.split(" ").pop() || "";

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (meal && ingredients) {
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

  const toggleMealExpand = (mealId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedMeals(prev => ({
      ...prev,
      [mealId]: !prev[mealId]
    }));
  };

  // Get meal type category (Breakfast, Lunch, Dinner, Snacks)
  const getMealTypeCategory = (mealType: string): MealCategory => {
    if (mealType === "Breakfast") return "Breakfast";
    if (mealType === "Lunch") return "Lunch";
    if (mealType === "Dinner") return "Dinner";
    if (mealType.includes("Snack")) return "Snacks";
    return "Snacks"; // Default
  };

  // Filter meals based on the meal type
  const filterMealsByType = () => {
    const mealTypeCategory = getMealTypeCategory(mealType);
    
    // Apply type and search filters
    const filteredMeals = meals.filter(meal => 
      (showAllMeals || meal.meal_type === mealTypeCategory) &&
      (!searchTerm || 
        meal.meal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.ingredients.some(ing => 
          ing.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
    
    // Group by category
    const groupedMeals: Record<string, Meal[]> = {};
    filteredMeals.forEach(meal => {
      const category = meal.meal_type || "Snacks";
      if (!groupedMeals[category]) {
        groupedMeals[category] = [];
      }
      groupedMeals[category].push(meal);
    });
    
    return Object.entries(groupedMeals);
  };

  // Find selected meal's details
  const currentMealDetails = meal ? meals.find(m => m.meal === meal) : null;

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
            prepTime={currentMealDetails?.prepTime}
            difficulty={currentMealDetails?.difficulty}
          />
        </Dialog>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && ingredients && (
        <EditMealModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          meal={meal || ""}
          ingredients={ingredients}
          onSave={handleSave}
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
            
            {loadingMeals ? (
              <div className="text-center py-8">Loading meals...</div>
            ) : (
              filterMealsByType().map(([category, categoryMeals]) => (
                <div key={category} className="space-y-4">
                  <h3 className="font-semibold text-lg">{category}</h3>
                  <div className="grid gap-4">
                    {categoryMeals.map((availableMeal) => (
                      <div key={availableMeal.id} className="border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => handleSwitch(availableMeal)}
                          className="w-full flex flex-col gap-3 hover:bg-secondary/30 transition-colors duration-200 text-left"
                        >
                          {/* Add meal image */}
                          <div className="w-full h-32 overflow-hidden">
                            <MealImage meal={availableMeal.meal} className="w-full h-full object-cover" />
                          </div>
                          
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-lg">{availableMeal.meal}</p>
                              <button 
                                className="p-1 rounded-full hover:bg-secondary"
                                onClick={(e) => toggleMealExpand(availableMeal.id || '', e)}
                              >
                                {expandedMeals[availableMeal.id || ''] ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            
                            {(availableMeal.prepTime !== undefined || availableMeal.difficulty) && (
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                                {availableMeal.prepTime !== undefined && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{availableMeal.prepTime} min</span>
                                  </div>
                                )}
                                {availableMeal.difficulty && (
                                  <div className="flex items-center gap-1">
                                    <BarChart2 className="w-3 h-3" />
                                    <span>{availableMeal.difficulty}</span>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            <MacroDisplay 
                              macros={availableMeal.macros}
                              visibilitySettings={macroVisibility}
                              className="text-xs text-muted-foreground mt-2" 
                            />
                          </div>
                        </button>
                        {expandedMeals[availableMeal.id || ''] && (
                          <div className="bg-secondary/10 p-4 border-t border-border">
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
                              <div className="text-sm text-muted-foreground mt-4">
                                <p className="font-medium mb-1">Recipe:</p>
                                <p className="whitespace-pre-line">{availableMeal.recipe}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MealCard;
