
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Edit2, Shuffle, Book, X, ChevronDown, ChevronUp, Clock, BarChart2, Plus, Coffee } from "lucide-react";
import EditMealModal from "./EditMealModal";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MacroInfo, Ingredient, Meal, MealCategory } from "@/types/meals";
import { MealImage } from "./meal/MealImage";
import { MacroDisplay } from "./meal/MacroDisplay";
import { MealDetails } from "./meal/MealDetails";
import { Button } from "@/components/ui/button";
import { useMeals } from "@/hooks/useMeals";
import { useIngredients } from "@/hooks/useIngredients";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";

interface MealCardProps {
  title: string;
  meal?: string;
  macros?: MacroInfo;
  ingredients?: Ingredient[];
  className?: string;
  onMealUpdate?: (ingredients: Ingredient[], macros: MacroInfo, mealName: string) => void;
  macroVisibility: MacroInfo;
  drinksAndAccompaniments?: string[];
  onDrinksAndAccompanimentsUpdate?: (items: string[]) => void;
}

const MealCard = ({ 
  title, 
  meal, 
  macros, 
  ingredients, 
  className, 
  onMealUpdate, 
  macroVisibility, 
  drinksAndAccompaniments = [],
  onDrinksAndAccompanimentsUpdate
}: MealCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSwitchDialogOpen, setIsSwitchDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDrinksDialogOpen, setIsDrinksDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllMeals, setShowAllMeals] = useState(false);
  const [expandedMeals, setExpandedMeals] = useState<Record<string, boolean>>({});
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>(drinksAndAccompaniments);
  const [newDrinkName, setNewDrinkName] = useState("");
  const { meals, loading: loadingMeals } = useMeals();
  const { ingredients: allIngredients } = useIngredients();

  const mealType = title.split(" ").pop() || "";

  useEffect(() => {
    setSelectedDrinks(drinksAndAccompaniments);
  }, [drinksAndAccompaniments]);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (meal && ingredients) {
      setIsEditModalOpen(true);
    }
  };

  const handleEmptyCardClick = () => {
    setIsSwitchDialogOpen(true);
    setShowAllMeals(false);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMealUpdate) {
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
    setShowAllMeals(false);
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

  const getMealTypeCategory = (mealType: string): MealCategory => {
    if (mealType === "Breakfast") return "Breakfast";
    if (mealType === "Lunch") return "Lunch";
    if (mealType === "Dinner") return "Dinner";
    if (mealType.includes("Snack")) return "Snacks";
    return "Snacks";
  };

  const filterMealsByType = () => {
    const mealTypeCategory = getMealTypeCategory(mealType);
    
    const filteredMeals = meals.filter(meal => 
      (showAllMeals || meal.meal_type === mealTypeCategory) &&
      (!searchTerm || 
        meal.meal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.ingredients.some(ing => 
          ing.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
    
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

  const handleToggleDrink = (drinkName: string) => {
    setSelectedDrinks(prev => {
      if (prev.includes(drinkName)) {
        return prev.filter(d => d !== drinkName);
      } else {
        return [...prev, drinkName];
      }
    });
  };

  const handleAddNewDrink = () => {
    if (newDrinkName.trim() && !selectedDrinks.includes(newDrinkName)) {
      setSelectedDrinks(prev => [...prev, newDrinkName]);
      setNewDrinkName("");
    }
  };

  const handleSaveDrinks = () => {
    if (onDrinksAndAccompanimentsUpdate) {
      onDrinksAndAccompanimentsUpdate(selectedDrinks);
    }
    setIsDrinksDialogOpen(false);
  };

  const handleOpenDrinksDialog = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDrinksDialogOpen(true);
  };

  const currentMealDetails = meal ? meals.find(m => m.meal === meal) : null;

  // Get ingredient suggestions for drinks/accompaniments
  const drinkSuggestions = allIngredients
    .filter(ing => 
      ing.name.toLowerCase().includes("water") || 
      ing.name.toLowerCase().includes("coffee") || 
      ing.name.toLowerCase().includes("tea") ||
      ing.name.toLowerCase().includes("juice") ||
      ing.name.toLowerCase().includes("milk") ||
      ing.name.toLowerCase().includes("drink")
    )
    .map(ing => ing.name);

  const accompanimentSuggestions = allIngredients
    .filter(ing => 
      !(drinkSuggestions.includes(ing.name)) &&
      (ing.name.toLowerCase().includes("bread") ||
       ing.name.toLowerCase().includes("rice") ||
       ing.name.toLowerCase().includes("sauce") ||
       ing.name.toLowerCase().includes("dip") ||
       ing.name.toLowerCase().includes("side"))
    )
    .map(ing => ing.name);

  const allSuggestions = [...new Set([...drinkSuggestions, ...accompanimentSuggestions])];

  return (
    <div className="flex flex-col gap-1">
      {meal && (
        <div className="flex gap-1 justify-end">
          <button 
            className="w-6 h-6 bg-secondary/50 hover:bg-destructive hover:text-white transition-colors duration-200 flex items-center justify-center cursor-pointer rounded-md"
            onClick={handleRemove}
          >
            <X className="w-3 h-3" />
          </button>
          <button 
            className="w-6 h-6 bg-secondary/50 hover:bg-secondary transition-colors duration-200 flex items-center justify-center cursor-pointer rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              setIsSwitchDialogOpen(true);
              setShowAllMeals(false);
            }}
          >
            <Shuffle className="w-3 h-3 text-primary/50 group-hover:text-primary transition-colors duration-200" />
          </button>
          <button 
            className="w-6 h-6 bg-secondary/50 hover:bg-secondary transition-colors duration-200 flex items-center justify-center cursor-pointer rounded-md"
            onClick={handleOpenDrinksDialog}
          >
            <Coffee className="w-3 h-3 text-primary/50 group-hover:text-primary transition-colors duration-200" />
          </button>
          <button 
            className="w-6 h-6 bg-secondary/50 hover:bg-secondary transition-colors duration-200 flex items-center justify-center rounded-md cursor-pointer"
            onClick={handleEdit}
          >
            <Edit2 className="w-3 h-3 text-primary/50 group-hover:text-primary transition-colors duration-200" />
          </button>
        </div>
      )}

      <Card 
        className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-lg border border-transparent hover:border-primary/10 animate-fade-in w-full", 
          !meal && "cursor-pointer hover:bg-secondary/50",
          className
        )}
        onClick={handleCardClick}
      >
        {meal ? (
          <>
            <div className="h-[80px] relative">
              <MealImage meal={meal} className="absolute inset-0 w-full h-full object-cover" />
              {drinksAndAccompaniments.length > 0 && (
                <div className="absolute bottom-1 right-1 bg-black/50 rounded-full p-1">
                  <Coffee className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div className="p-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-foreground line-clamp-1">{meal}</p>
                {currentMealDetails?.recipe && (
                  <Book className="w-3 h-3 text-primary/50 shrink-0" />
                )}
              </div>
              {macros && (
                <MacroDisplay 
                  macros={macros} 
                  visibilitySettings={macroVisibility}
                  className="text-[10px] text-muted-foreground mt-1" 
                />
              )}
            </div>
          </>
        ) : (
          <div className="h-[120px] p-2 flex items-center justify-center">
            <p className="text-xs text-muted-foreground italic">Add meal</p>
          </div>
        )}
      </Card>

      {meal && macros && ingredients && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <MealDetails
            meal={meal}
            macros={macros}
            ingredients={ingredients}
            recipe={currentMealDetails?.recipe}
            prepTime={currentMealDetails?.prepTime}
            difficulty={currentMealDetails?.difficulty}
            drinksAndAccompaniments={drinksAndAccompaniments}
          />
        </Dialog>
      )}

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

      <Dialog open={isDrinksDialogOpen} onOpenChange={setIsDrinksDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Drinks & Accompaniments</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {newDrinkName || "Select from ingredients..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search ingredients..." />
                    <CommandEmpty>No ingredient found.</CommandEmpty>
                    <CommandGroup className="max-h-[200px] overflow-y-auto">
                      {allIngredients.map((ing) => (
                        <CommandItem
                          key={ing.id}
                          onSelect={() => {
                            setNewDrinkName(ing.name);
                          }}
                          className="cursor-pointer"
                        >
                          {ing.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button onClick={handleAddNewDrink} disabled={!newDrinkName}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <div className="font-medium mb-2">Suggestions:</div>
              <div className="flex flex-wrap gap-2 mb-4">
                {allSuggestions.slice(0, 8).map((item) => (
                  <Badge 
                    key={item} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-secondary"
                    onClick={() => handleToggleDrink(item)}
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <div className="font-medium mb-2">Selected items:</div>
              <div className="flex flex-wrap gap-2">
                {selectedDrinks.length > 0 ? (
                  selectedDrinks.map((item) => (
                    <Badge 
                      key={item} 
                      className="cursor-pointer bg-primary"
                      onClick={() => handleToggleDrink(item)}
                    >
                      {item}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">No items selected</p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDrinksDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveDrinks}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
