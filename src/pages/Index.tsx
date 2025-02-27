
import { useState, useMemo } from "react";
import { MEAL_TYPES } from "../utils/mealUtils";
import { MealType, MacroInfo } from "../types/meals";
import MacroGoalsDialog from "@/components/MacroGoalsDialog";
import { useMacroGoals } from "@/hooks/useMacroGoals";
import { useMealPlanner } from "@/hooks/useMealPlanner";
import { format } from "date-fns";
import { MacroDisplay } from "@/components/meal/MacroDisplay";
import { Settings, Plus, X } from "lucide-react";
import MealCard from "@/components/MealCard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

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
  const [newItemText, setNewItemText] = useState("");
  const [isAddDrinkDialogOpen, setIsAddDrinkDialogOpen] = useState(false);

  const { 
    weeklyMeals, 
    handleMealUpdate, 
    handleDrinksAccompanimentsUpdate,
    getDrinksAndAccompaniments
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

    return MEAL_TYPES.reduce((total, mealType) => {
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
  }, [weeklyMeals, currentDayName]);

  const handleOpenDrinkDialog = (mealType: string) => {
    setCurrentEditingMeal({ day: currentDayName, mealType });
    setIsAddDrinkDialogOpen(true);
  };

  const handleCloseDrinkDialog = () => {
    setCurrentEditingMeal(null);
    setNewItemText("");
    setIsAddDrinkDialogOpen(false);
  };

  const handleAddDrinkItem = () => {
    if (!currentEditingMeal || !newItemText.trim()) return;
    
    const { day, mealType } = currentEditingMeal;
    const currentItems = getDrinksAndAccompaniments(day, mealType);
    const updatedItems = [...currentItems, newItemText.trim()];
    
    handleDrinksAccompanimentsUpdate(day, mealType, updatedItems);
    setNewItemText("");
  };

  const handleRemoveDrinkItem = (day: string, mealType: string, index: number) => {
    const currentItems = getDrinksAndAccompaniments(day, mealType);
    const updatedItems = currentItems.filter((_, idx) => idx !== index);
    handleDrinksAccompanimentsUpdate(day, mealType, updatedItems);
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pb-24">
          {/* Breakfast */}
          <div className="flex flex-col space-y-4">
            <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Breakfast</p>
            <MealCard
              title={`${currentDayName} Breakfast`}
              meal={weeklyMeals[currentDayName]?.["Breakfast"]?.meal}
              macros={weeklyMeals[currentDayName]?.["Breakfast"]?.macros}
              ingredients={weeklyMeals[currentDayName]?.["Breakfast"]?.ingredients}
              className="w-full"
              onMealUpdate={(ingredients, macros, mealName) => 
                handleMealUpdate(currentDayName, "Breakfast", ingredients, macros, mealName)
              }
              macroVisibility={macroGoals}
            />
            <Card 
              className="w-full min-h-[100px] bg-white/80 p-4 hover:shadow-md transition-shadow border-dashed border-2 border-primary/20 cursor-pointer"
              onClick={() => handleOpenDrinkDialog("Breakfast")}
            >
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-muted-foreground italic text-sm">Drinks & Accompaniments</p>
                  <Plus className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {getDrinksAndAccompaniments(currentDayName, "Breakfast").map((item, idx) => (
                    <div key={idx} className="bg-primary/10 px-2 py-1 rounded-md text-xs flex items-center gap-2">
                      {item}
                      <button 
                        className="text-muted-foreground hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveDrinkItem(currentDayName, "Breakfast", idx);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
          
          {/* Morning Snack */}
          <div className="flex flex-col space-y-4">
            <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Morning Snack</p>
            <MealCard
              title={`${currentDayName} Morning Snack`}
              meal={weeklyMeals[currentDayName]?.["Morning Snack"]?.meal}
              macros={weeklyMeals[currentDayName]?.["Morning Snack"]?.macros}
              ingredients={weeklyMeals[currentDayName]?.["Morning Snack"]?.ingredients}
              className="w-full"
              onMealUpdate={(ingredients, macros, mealName) => 
                handleMealUpdate(currentDayName, "Morning Snack", ingredients, macros, mealName)
              }
              macroVisibility={macroGoals}
            />
            <Card 
              className="w-full min-h-[100px] bg-white/80 p-4 hover:shadow-md transition-shadow border-dashed border-2 border-primary/20 cursor-pointer"
              onClick={() => handleOpenDrinkDialog("Morning Snack")}
            >
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-muted-foreground italic text-sm">Drinks & Accompaniments</p>
                  <Plus className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {getDrinksAndAccompaniments(currentDayName, "Morning Snack").map((item, idx) => (
                    <div key={idx} className="bg-primary/10 px-2 py-1 rounded-md text-xs flex items-center gap-2">
                      {item}
                      <button 
                        className="text-muted-foreground hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveDrinkItem(currentDayName, "Morning Snack", idx);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
          
          {/* Lunch */}
          <div className="flex flex-col space-y-4">
            <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Lunch</p>
            <MealCard
              title={`${currentDayName} Lunch`}
              meal={weeklyMeals[currentDayName]?.["Lunch"]?.meal}
              macros={weeklyMeals[currentDayName]?.["Lunch"]?.macros}
              ingredients={weeklyMeals[currentDayName]?.["Lunch"]?.ingredients}
              className="w-full"
              onMealUpdate={(ingredients, macros, mealName) => 
                handleMealUpdate(currentDayName, "Lunch", ingredients, macros, mealName)
              }
              macroVisibility={macroGoals}
            />
            <Card 
              className="w-full min-h-[100px] bg-white/80 p-4 hover:shadow-md transition-shadow border-dashed border-2 border-primary/20 cursor-pointer"
              onClick={() => handleOpenDrinkDialog("Lunch")}
            >
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-muted-foreground italic text-sm">Drinks & Accompaniments</p>
                  <Plus className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {getDrinksAndAccompaniments(currentDayName, "Lunch").map((item, idx) => (
                    <div key={idx} className="bg-primary/10 px-2 py-1 rounded-md text-xs flex items-center gap-2">
                      {item}
                      <button 
                        className="text-muted-foreground hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveDrinkItem(currentDayName, "Lunch", idx);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
          
          {/* Afternoon Snack */}
          <div className="flex flex-col space-y-4">
            <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Afternoon Snack</p>
            <MealCard
              title={`${currentDayName} Afternoon Snack`}
              meal={weeklyMeals[currentDayName]?.["Afternoon Snack"]?.meal}
              macros={weeklyMeals[currentDayName]?.["Afternoon Snack"]?.macros}
              ingredients={weeklyMeals[currentDayName]?.["Afternoon Snack"]?.ingredients}
              className="w-full"
              onMealUpdate={(ingredients, macros, mealName) => 
                handleMealUpdate(currentDayName, "Afternoon Snack", ingredients, macros, mealName)
              }
              macroVisibility={macroGoals}
            />
            <Card 
              className="w-full min-h-[100px] bg-white/80 p-4 hover:shadow-md transition-shadow border-dashed border-2 border-primary/20 cursor-pointer"
              onClick={() => handleOpenDrinkDialog("Afternoon Snack")}
            >
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-muted-foreground italic text-sm">Drinks & Accompaniments</p>
                  <Plus className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {getDrinksAndAccompaniments(currentDayName, "Afternoon Snack").map((item, idx) => (
                    <div key={idx} className="bg-primary/10 px-2 py-1 rounded-md text-xs flex items-center gap-2">
                      {item}
                      <button 
                        className="text-muted-foreground hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveDrinkItem(currentDayName, "Afternoon Snack", idx);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
          
          {/* Dinner */}
          <div className="flex flex-col space-y-4">
            <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Dinner</p>
            <MealCard
              title={`${currentDayName} Dinner`}
              meal={weeklyMeals[currentDayName]?.["Dinner"]?.meal}
              macros={weeklyMeals[currentDayName]?.["Dinner"]?.macros}
              ingredients={weeklyMeals[currentDayName]?.["Dinner"]?.ingredients}
              className="w-full"
              onMealUpdate={(ingredients, macros, mealName) => 
                handleMealUpdate(currentDayName, "Dinner", ingredients, macros, mealName)
              }
              macroVisibility={macroGoals}
            />
            <Card 
              className="w-full min-h-[100px] bg-white/80 p-4 hover:shadow-md transition-shadow border-dashed border-2 border-primary/20 cursor-pointer"
              onClick={() => handleOpenDrinkDialog("Dinner")}
            >
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-muted-foreground italic text-sm">Drinks & Accompaniments</p>
                  <Plus className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {getDrinksAndAccompaniments(currentDayName, "Dinner").map((item, idx) => (
                    <div key={idx} className="bg-primary/10 px-2 py-1 rounded-md text-xs flex items-center gap-2">
                      {item}
                      <button 
                        className="text-muted-foreground hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveDrinkItem(currentDayName, "Dinner", idx);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
          
          {/* Evening Snack */}
          <div className="flex flex-col space-y-4">
            <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Evening Snack</p>
            <MealCard
              title={`${currentDayName} Evening Snack`}
              meal={weeklyMeals[currentDayName]?.["Evening Snack"]?.meal}
              macros={weeklyMeals[currentDayName]?.["Evening Snack"]?.macros}
              ingredients={weeklyMeals[currentDayName]?.["Evening Snack"]?.ingredients}
              className="w-full"
              onMealUpdate={(ingredients, macros, mealName) => 
                handleMealUpdate(currentDayName, "Evening Snack", ingredients, macros, mealName)
              }
              macroVisibility={macroGoals}
            />
            <Card 
              className="w-full min-h-[100px] bg-white/80 p-4 hover:shadow-md transition-shadow border-dashed border-2 border-primary/20 cursor-pointer"
              onClick={() => handleOpenDrinkDialog("Evening Snack")}
            >
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-muted-foreground italic text-sm">Drinks & Accompaniments</p>
                  <Plus className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {getDrinksAndAccompaniments(currentDayName, "Evening Snack").map((item, idx) => (
                    <div key={idx} className="bg-primary/10 px-2 py-1 rounded-md text-xs flex items-center gap-2">
                      {item}
                      <button 
                        className="text-muted-foreground hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveDrinkItem(currentDayName, "Evening Snack", idx);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
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
            <div className="grid flex-1 gap-2">
              <Input
                id="item"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Enter drink or accompaniment item"
                className="col-span-3"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddDrinkItem();
                  }
                }}
              />
            </div>
            <Button type="submit" onClick={handleAddDrinkItem}>Add</Button>
          </div>
          
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium">Current Items:</h4>
            <div className="flex flex-wrap gap-2">
              {currentEditingMeal && getDrinksAndAccompaniments(currentEditingMeal.day, currentEditingMeal.mealType).map((item, idx) => (
                <div key={idx} className="bg-primary/10 px-3 py-1 rounded-md text-sm flex items-center gap-2">
                  {item}
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
              {currentEditingMeal && getDrinksAndAccompaniments(currentEditingMeal.day, currentEditingMeal.mealType).length === 0 && (
                <p className="text-muted-foreground text-sm italic">No items added yet</p>
              )}
            </div>
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
