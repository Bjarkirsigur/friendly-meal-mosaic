
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
          <div>
            <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Breakfast</p>
            <div 
              onClick={() => handleMealCardClick(currentDayName, "Breakfast")}
              className="bg-white/95 rounded-xl h-[160px] flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              {!weeklyMeals[currentDayName]?.["Breakfast"]?.meal && 
                <p className="text-muted-foreground italic">Click to add a meal</p>
              }
            </div>
          </div>
          
          {/* Morning Snack */}
          <div className="flex justify-end">
            <div className="w-3/4">
              <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Snacks</p>
              <div 
                onClick={() => handleMealCardClick(currentDayName, "Snacks")}
                className="bg-white/95 rounded-xl h-[160px] flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all"
              >
                {!weeklyMeals[currentDayName]?.["Snacks"]?.meal && 
                  <p className="text-muted-foreground italic">Click to add a meal</p>
                }
              </div>
            </div>
          </div>
          
          {/* Lunch */}
          <div>
            <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Lunch</p>
            <div 
              onClick={() => handleMealCardClick(currentDayName, "Lunch")}
              className="bg-white/95 rounded-xl h-[160px] flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              {!weeklyMeals[currentDayName]?.["Lunch"]?.meal && 
                <p className="text-muted-foreground italic">Click to add a meal</p>
              }
            </div>
          </div>
          
          {/* Afternoon Snack */}
          <div className="flex justify-end">
            <div className="w-3/4">
              <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Snacks</p>
              <div 
                onClick={() => handleMealCardClick(currentDayName, "Snacks")}
                className="bg-white/95 rounded-xl h-[160px] flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all"
              >
                {!weeklyMeals[currentDayName]?.["Snacks"]?.meal && 
                  <p className="text-muted-foreground italic">Click to add a meal</p>
                }
              </div>
            </div>
          </div>
          
          {/* Dinner */}
          <div>
            <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Dinner</p>
            <div 
              onClick={() => handleMealCardClick(currentDayName, "Dinner")}
              className="bg-white/95 rounded-xl h-[160px] flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              {!weeklyMeals[currentDayName]?.["Dinner"]?.meal && 
                <p className="text-muted-foreground italic">Click to add a meal</p>
              }
            </div>
          </div>
          
          {/* Evening Snack */}
          <div className="flex justify-end">
            <div className="w-3/4">
              <p className="text-lg font-medium text-[#2F4F4F] mb-2 text-center">Snacks</p>
              <div 
                onClick={() => handleMealCardClick(currentDayName, "Snacks")}
                className="bg-white/95 rounded-xl h-[160px] flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all"
              >
                {!weeklyMeals[currentDayName]?.["Snacks"]?.meal && 
                  <p className="text-muted-foreground italic">Click to add a meal</p>
                }
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

  // Helper function to handle meal card clicks
  function handleMealCardClick(day: string, mealType: MealType) {
    // If there's already a meal, we could show details or edit
    if (weeklyMeals[day]?.[mealType]?.meal) {
      // Show meal details or edit functionality
      console.log("Meal exists:", weeklyMeals[day][mealType]);
    } else {
      // Open meal selection dialog
      console.log("Would open meal selection for", mealType);
      // You would implement your meal selection UI here
    }
  }
};

export default Index;
