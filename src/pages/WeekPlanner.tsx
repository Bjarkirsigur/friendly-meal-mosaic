
import { useState } from "react";
import WeekHeader from "../components/WeekHeader";
import MealRow from "../components/MealRow";
import { MEAL_TYPES } from "../utils/mealUtils";
import { MacroInfo, MealType } from "../types/meals";
import MacroGoalsDialog from "@/components/MacroGoalsDialog";
import MacroGoalsDisplay from "@/components/MacroGoalsDisplay";
import { useMacroGoals } from "@/hooks/useMacroGoals";
import { useMealPlanner } from "@/hooks/useMealPlanner";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MacroDisplay } from "@/components/meal/MacroDisplay";
import { Card } from "@/components/ui/card";

const WeekPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const {
    isGoalsDialogOpen,
    setIsGoalsDialogOpen,
    macroGoals,
    tempGoals,
    setTempGoals,
    handleUpdateGoals
  } = useMacroGoals();

  const { weeklyMeals, handleMealUpdate } = useMealPlanner();
  const isMobile = useIsMobile();

  // Calculate daily macros for each day
  const calculateDailyMacros = (day: string): MacroInfo => {
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

    return MEAL_TYPES.reduce((total, mealType) => {
      const meal = weeklyMeals[day]?.[mealType as MealType];
      if (meal?.macros) {
        return {
          calories: Math.round((total.calories + meal.macros.calories) * 10) / 10,
          protein: Math.round((total.protein + meal.macros.protein) * 10) / 10,
          carbs: Math.round((total.carbs + meal.macros.carbs) * 10) / 10,
          fat: Math.round((total.fat + meal.macros.fat) * 10) / 10,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        };
      }
      return total;
    }, initialMacros);
  };

  return (
    <div className="min-h-screen bg-secondary/30 -mx-4">
      <div className="w-full px-4">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 md:mb-6">Weekly Meal Plan</h1>
          <div className="flex flex-col items-center gap-4">
            <MacroGoalsDisplay 
              macroGoals={macroGoals}
              onSettingsClick={() => setIsGoalsDialogOpen(true)}
            />
          </div>
        </div>

        {isMobile ? (
          <ScrollArea className="w-full">
            <div className="min-w-[800px] px-4 pb-8">
              <WeekHeader currentDate={currentDate} onWeekChange={setCurrentDate} />
              {Object.entries(weeklyMeals).map(([day]) => (
                <Card key={day} className="mb-4 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{day}</h3>
                    <MacroDisplay
                      macros={calculateDailyMacros(day)}
                      visibilitySettings={macroGoals}
                      goals={macroGoals}
                      size="small"
                    />
                  </div>
                  <div className="space-y-4">
                    {MEAL_TYPES.map((meal) => (
                      <MealRow
                        key={meal}
                        mealType={meal as MealType}
                        weeklyMeals={weeklyMeals}
                        onMealUpdate={handleMealUpdate}
                        macroVisibility={macroGoals}
                      />
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="grid gap-6">
            <WeekHeader currentDate={currentDate} onWeekChange={setCurrentDate} />
            {Object.entries(weeklyMeals).map(([day]) => (
              <Card key={day} className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">{day}</h3>
                  <MacroDisplay
                    macros={calculateDailyMacros(day)}
                    visibilitySettings={macroGoals}
                    goals={macroGoals}
                    size="small"
                  />
                </div>
                <div className="space-y-4">
                  {MEAL_TYPES.map((meal) => (
                    <MealRow
                      key={meal}
                      mealType={meal as MealType}
                      weeklyMeals={weeklyMeals}
                      onMealUpdate={handleMealUpdate}
                      macroVisibility={macroGoals}
                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
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

export default WeekPlanner;
