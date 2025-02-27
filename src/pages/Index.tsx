
import { useState, useMemo } from "react";
import MealRow from "../components/MealRow";
import { MEAL_TYPES, getAllAvailableIngredients } from "../utils/mealUtils";
import { MealType, MacroInfo } from "../types/meals";
import MacroGoalsDialog from "@/components/MacroGoalsDialog";
import MacroGoalsDisplay from "@/components/MacroGoalsDisplay";
import { useMacroGoals } from "@/hooks/useMacroGoals";
import { useMealPlanner } from "@/hooks/useMealPlanner";
import { format } from "date-fns";
import { MacroDisplay } from "@/components/meal/MacroDisplay";
import { Settings } from "lucide-react";

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
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-6">Today's Meal Plan</h1>
          <p className="text-lg text-muted-foreground mb-6">{format(currentDate, 'MMMM d, yyyy')}</p>
          <div className="flex flex-col items-center gap-4">
            <MacroGoalsDisplay 
              macroGoals={macroGoals}
              onSettingsClick={() => setIsGoalsDialogOpen(true)}
            />
            <div className="w-full max-w-xl bg-white/50 rounded-lg p-4 mt-2">
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

        <div className="grid gap-6">
          {MEAL_TYPES.map((meal) => (
            <MealRow
              key={meal}
              mealType={meal as MealType}
              weeklyMeals={{ [currentDayName]: weeklyMeals[currentDayName] }}
              onMealUpdate={handleMealUpdate}
              availableIngredients={getAllAvailableIngredients()}
              macroVisibility={macroGoals}
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
    </div>
  );
};

export default Index;
