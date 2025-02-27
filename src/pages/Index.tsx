
import { useState, useMemo } from "react";
import MealRow from "../components/MealRow";
import { MEAL_TYPES, getAllAvailableIngredients } from "../utils/mealUtils";
import { MealType, MacroInfo } from "../types/meals";
import MacroGoalsDialog from "@/components/MacroGoalsDialog";
import { useMacroGoals } from "@/hooks/useMacroGoals";
import { useMealPlanner } from "@/hooks/useMealPlanner";
import { format } from "date-fns";
import { MacroDisplay } from "@/components/meal/MacroDisplay";
import { Settings } from "lucide-react";
import MealCard from "@/components/MealCard";

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

  const { weeklyMeals, handleMealUpdate } = useMealPlanner();
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

        {/* Meal and Snack Layout */}
        <div className="grid gap-6 max-w-2xl mx-auto">
          {/* Breakfast */}
          <div className="flex justify-start">
            <div className="w-3/4">
              <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Breakfast</p>
              <div className="h-[160px]">
                <MealCard
                  title={`${currentDayName} Breakfast`}
                  meal={weeklyMeals[currentDayName]?.["Breakfast"]?.meal}
                  macros={weeklyMeals[currentDayName]?.["Breakfast"]?.macros}
                  ingredients={weeklyMeals[currentDayName]?.["Breakfast"]?.ingredients}
                  className="w-full h-full"
                  onMealUpdate={(ingredients, macros, mealName) => 
                    handleMealUpdate(currentDayName, "Breakfast", ingredients, macros, mealName)
                  }
                  availableIngredients={getAllAvailableIngredients()}
                  macroVisibility={macroGoals}
                />
              </div>
            </div>
          </div>
          
          {/* Morning Snack */}
          <div className="flex justify-end">
            <div className="w-3/4">
              <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Snacks</p>
              <div className="h-[160px]">
                <MealCard
                  title={`${currentDayName} Snacks`}
                  meal={weeklyMeals[currentDayName]?.["Snacks"]?.meal}
                  macros={weeklyMeals[currentDayName]?.["Snacks"]?.macros}
                  ingredients={weeklyMeals[currentDayName]?.["Snacks"]?.ingredients}
                  className="w-full h-full"
                  onMealUpdate={(ingredients, macros, mealName) => 
                    handleMealUpdate(currentDayName, "Snacks", ingredients, macros, mealName)
                  }
                  availableIngredients={getAllAvailableIngredients()}
                  macroVisibility={macroGoals}
                />
              </div>
            </div>
          </div>
          
          {/* Lunch */}
          <div className="flex justify-start">
            <div className="w-3/4">
              <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Lunch</p>
              <div className="h-[160px]">
                <MealCard
                  title={`${currentDayName} Lunch`}
                  meal={weeklyMeals[currentDayName]?.["Lunch"]?.meal}
                  macros={weeklyMeals[currentDayName]?.["Lunch"]?.macros}
                  ingredients={weeklyMeals[currentDayName]?.["Lunch"]?.ingredients}
                  className="w-full h-full"
                  onMealUpdate={(ingredients, macros, mealName) => 
                    handleMealUpdate(currentDayName, "Lunch", ingredients, macros, mealName)
                  }
                  availableIngredients={getAllAvailableIngredients()}
                  macroVisibility={macroGoals}
                />
              </div>
            </div>
          </div>
          
          {/* Afternoon Snack */}
          <div className="flex justify-end">
            <div className="w-3/4">
              <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Snacks</p>
              <div className="h-[160px]">
                <MealCard
                  title={`${currentDayName} Snacks`}
                  meal={weeklyMeals[currentDayName]?.["Snacks"]?.meal}
                  macros={weeklyMeals[currentDayName]?.["Snacks"]?.macros}
                  ingredients={weeklyMeals[currentDayName]?.["Snacks"]?.ingredients}
                  className="w-full h-full"
                  onMealUpdate={(ingredients, macros, mealName) => 
                    handleMealUpdate(currentDayName, "Snacks", ingredients, macros, mealName)
                  }
                  availableIngredients={getAllAvailableIngredients()}
                  macroVisibility={macroGoals}
                />
              </div>
            </div>
          </div>
          
          {/* Dinner */}
          <div className="flex justify-start">
            <div className="w-3/4">
              <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Dinner</p>
              <div className="h-[160px]">
                <MealCard
                  title={`${currentDayName} Dinner`}
                  meal={weeklyMeals[currentDayName]?.["Dinner"]?.meal}
                  macros={weeklyMeals[currentDayName]?.["Dinner"]?.macros}
                  ingredients={weeklyMeals[currentDayName]?.["Dinner"]?.ingredients}
                  className="w-full h-full"
                  onMealUpdate={(ingredients, macros, mealName) => 
                    handleMealUpdate(currentDayName, "Dinner", ingredients, macros, mealName)
                  }
                  availableIngredients={getAllAvailableIngredients()}
                  macroVisibility={macroGoals}
                />
              </div>
            </div>
          </div>
          
          {/* Evening Snack */}
          <div className="flex justify-end">
            <div className="w-3/4">
              <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Snacks</p>
              <div className="h-[160px]">
                <MealCard
                  title={`${currentDayName} Snacks`}
                  meal={weeklyMeals[currentDayName]?.["Snacks"]?.meal}
                  macros={weeklyMeals[currentDayName]?.["Snacks"]?.macros}
                  ingredients={weeklyMeals[currentDayName]?.["Snacks"]?.ingredients}
                  className="w-full h-full"
                  onMealUpdate={(ingredients, macros, mealName) => 
                    handleMealUpdate(currentDayName, "Snacks", ingredients, macros, mealName)
                  }
                  availableIngredients={getAllAvailableIngredients()}
                  macroVisibility={macroGoals}
                />
              </div>
            </div>
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
    </div>
  );
};

export default Index;
