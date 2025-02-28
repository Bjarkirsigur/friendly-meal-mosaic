
import { useState, useMemo } from "react";
import { MEAL_TYPES } from "../utils/mealUtils";
import { MealType, MacroInfo, Ingredient } from "../types/meals";
import MacroGoalsDialog from "@/components/MacroGoalsDialog";
import { useMacroGoals } from "@/hooks/useMacroGoals";
import { useMealPlanner, DrinkAccompaniment } from "@/hooks/useMealPlanner";
import { format } from "date-fns";
import { MacroDisplay } from "@/components/meal/MacroDisplay";
import { Settings, Plus, X, Coffee, Search } from "lucide-react";
import MealCard from "@/components/MealCard";
import MealRow from "@/components/MealRow";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useIngredients } from "@/hooks/useIngredients";

const Index = () => {
  const [currentDate] = useState(new Date());
  const {
    isGoalsDialogOpen,
    setIsGoalsDialogOpen,
    macroGoals,
    tempGoals,
    setTempGoals,
    handleUpdateGoals
  } = useMacroGoals();

  const [currentEditingMeal, setCurrentEditingMeal] = useState<{ day: string, mealType: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [isAddDrinkDialogOpen, setIsAddDrinkDialogOpen] = useState(false);
  const { ingredients: allIngredients } = useIngredients();

  const { 
    weeklyMeals, 
    handleMealUpdate, 
    handleDrinksAccompanimentsUpdate,
    getDrinksAndAccompaniments,
    getDrinksAndAccompanimentsMacros
  } = useMealPlanner();
  
  const currentDayName = format(currentDate, 'EEEE');

  // Calculate total daily macros using useMemo to update when weeklyMeals changes
  const totalDailyMacros = useMemo(() => {
    const initialMacros: MacroInfo = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      showCalories: true,
      showProtein: true,
      showCarbs: true,
      showFat: true
    };

    if (!weeklyMeals[currentDayName]) {
      return initialMacros;
    }

    // Add meal macros
    let totalMacros = MEAL_TYPES.reduce((total, mealType) => {
      const meal = weeklyMeals[currentDayName][mealType as MealType];
      if (meal?.macros) {
        return {
          ...total,
          calories: Math.round((total.calories + meal.macros.calories) * 10) / 10,
          protein: Math.round((total.protein + meal.macros.protein) * 10) / 10,
          carbs: Math.round((total.carbs + meal.macros.carbs) * 10) / 10,
          fat: Math.round((total.fat + meal.macros.fat) * 10) / 10,
        };
      }
      return total;
    }, initialMacros);

    // Add drinks and accompaniments macros
    MEAL_TYPES.forEach((mealType) => {
      const drinksMacros = getDrinksAndAccompanimentsMacros(currentDayName, mealType);
      totalMacros = {
        ...totalMacros,
        calories: Math.round((totalMacros.calories + drinksMacros.calories) * 10) / 10,
        protein: Math.round((totalMacros.protein + drinksMacros.protein) * 10) / 10,
        carbs: Math.round((totalMacros.carbs + drinksMacros.carbs) * 10) / 10,
        fat: Math.round((totalMacros.fat + drinksMacros.fat) * 10) / 10,
      };
    });

    return totalMacros;
  }, [weeklyMeals, currentDayName, getDrinksAndAccompanimentsMacros]);

  const handleOpenDrinkDialog = (mealType: string) => {
    setCurrentEditingMeal({ day: currentDayName, mealType });
    setIsAddDrinkDialogOpen(true);
    setSearchTerm("");
    setSelectedIngredient(null);
  };

  const handleCloseDrinkDialog = () => {
    setCurrentEditingMeal(null);
    setIsAddDrinkDialogOpen(false);
  };

  const handleAddDrinkItem = () => {
    if (!currentEditingMeal || !selectedIngredient) return;
    
    const { day, mealType } = currentEditingMeal;
    const currentItems = getDrinksAndAccompaniments(day, mealType);
    
    // Check if this ingredient is already in the list
    const exists = currentItems.find(item => item.name === selectedIngredient.name);
    if (exists) return;
    
    const newItem: DrinkAccompaniment = {
      name: selectedIngredient.name,
      macros: {
        calories: selectedIngredient.macros.calories,
        protein: selectedIngredient.macros.protein,
        carbs: selectedIngredient.macros.carbs,
        fat: selectedIngredient.macros.fat,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      },
      grams: selectedIngredient.grams
    };
    
    const updatedItems = [...currentItems, newItem];
    
    handleDrinksAccompanimentsUpdate(day, mealType, updatedItems);
    setSelectedIngredient(null);
  };

  const handleRemoveDrinkItem = (day: string, mealType: string, index: number) => {
    const currentItems = getDrinksAndAccompaniments(day, mealType);
    const updatedItems = currentItems.filter((_, idx) => idx !== index);
    handleDrinksAccompanimentsUpdate(day, mealType, updatedItems);
  };

  const filteredIngredients = useMemo(() => {
    return allIngredients.filter(ing => 
      ing.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allIngredients, searchTerm]);

  const currentItemsMacros = useMemo(() => {
    if (!currentEditingMeal) return null;
    return getDrinksAndAccompanimentsMacros(currentEditingMeal.day, currentEditingMeal.mealType);
  }, [currentEditingMeal, getDrinksAndAccompanimentsMacros]);

  console.log("Current weekly meals:", weeklyMeals);
  console.log("Current day:", currentDayName);

  return (
    <div className="min-h-screen bg-[#E8F3E8] -mx-4 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in pt-8">
          <h1 className="text-4xl font-bold text-[#2F4F4F] mb-2">Today's Meal Plan</h1>
          <p className="text-lg text-muted-foreground mb-6">{format(currentDate, 'MMMM d, yyyy')}</p>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-xl bg-white/95 rounded-xl shadow-sm p-4 mt-2">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">Daily Totals:</p>
                <button
                  onClick={() => setIsGoalsDialogOpen(true)}
                  className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
                >
                  <Settings className="w-5 h-5 text-primary" />
                </button>
              </div>
              <MacroDisplay 
                macros={totalDailyMacros}
                visibilitySettings={macroGoals}
                className="text-xs"
                size="large"
                goals={macroGoals}
              />
            </div>
          </div>
        </div>

        {/* Meal and Snack Layout - 2-column grid */}
        <div className="grid gap-6 max-w-4xl mx-auto pb-24">
          {/* Use MealRow component for each meal type, passing the current day */}
          {MEAL_TYPES.map((meal) => (
            <MealRow
              key={meal}
              mealType={meal as MealType}
              weeklyMeals={weeklyMeals}
              onMealUpdate={handleMealUpdate}
              macroVisibility={macroGoals}
              selectedDay={currentDayName}
            />
          ))}
        </div>
      </div>

      <MacroGoalsDialog
        isOpen={isGoalsDialogOpen}
        onOpenChange={setIsGoalsDialogOpen}
        tempGoals={tempGoals}
        onGoalsChange={setTempGoals}
        onSave={handleUpdateGoals}
      />

      {/* Dialog for adding drinks and accompaniments */}
      <Dialog open={isAddDrinkDialogOpen} onOpenChange={setIsAddDrinkDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Drinks & Accompaniments</DialogTitle>
          </DialogHeader>
          <div className="flex items-end gap-2 mt-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Select from ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4"
              />
              {searchTerm && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredIngredients.length > 0 ? (
                    filteredIngredients.map((ing) => (
                      <div
                        key={ing.id}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-secondary"
                        onClick={() => {
                          setSelectedIngredient(ing);
                          setSearchTerm(ing.name);
                        }}
                      >
                        {ing.name}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-muted-foreground">
                      No ingredients found
                    </div>
                  )}
                </div>
              )}
            </div>
            <Button 
              onClick={handleAddDrinkItem} 
              disabled={!selectedIngredient}
              className="bg-[#2F4F4F] hover:bg-[#1F3F3F]"
            >
              Add
            </Button>
          </div>
          
          <div className="mt-6">
            <h4 className="mb-2 text-sm font-medium">Current Items:</h4>
            {currentEditingMeal && getDrinksAndAccompaniments(currentEditingMeal.day, currentEditingMeal.mealType).length > 0 ? (
              <>
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentEditingMeal && getDrinksAndAccompaniments(currentEditingMeal.day, currentEditingMeal.mealType).map((item, idx) => (
                    <div key={idx} className="bg-primary/10 px-3 py-1 rounded-md text-sm flex items-center gap-2">
                      {item.name}
                      <button 
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => {
                          if (currentEditingMeal) {
                            handleRemoveDrinkItem(currentEditingMeal.day, currentEditingMeal.mealType, idx);
                          }
                        }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                {currentItemsMacros && (
                  <div className="bg-secondary/20 p-3 rounded-md">
                    <p className="text-sm font-medium mb-2">Total Macros:</p>
                    <MacroDisplay 
                      macros={currentItemsMacros}
                      className="text-xs" 
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
                    />
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted-foreground text-sm italic">No items added yet</p>
            )}
          </div>
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={handleCloseDrinkDialog}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
