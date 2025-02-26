
import { useState } from "react";
import MealRow from "../components/MealRow";
import { MEAL_TYPES, getAllAvailableIngredients, createInitialMeals } from "../utils/mealUtils";
import { Ingredient, MacroInfo, MealType, DayMeals } from "../types/meals";
import MacroGoalsDialog from "@/components/MacroGoalsDialog";
import MacroGoalsDisplay from "@/components/MacroGoalsDisplay";
import { useMacroGoals } from "@/hooks/useMacroGoals";
import { format } from "date-fns";

const Index = () => {
  const [currentDate] = useState(new Date());
  const [dayMeals, setDayMeals] = useState<DayMeals>(createInitialMeals()[format(currentDate, 'EEEE')]);
  const {
    isGoalsDialogOpen,
    setIsGoalsDialogOpen,
    macroGoals,
    tempGoals,
    setTempGoals,
    handleUpdateGoals
  } = useMacroGoals();

  const currentDayName = format(currentDate, 'EEEE');

  const handleMealUpdate = (_day: string, mealType: string, ingredients: Ingredient[], macros: MacroInfo) => {
    setDayMeals(prev => {
      const currentMeal = prev[mealType as MealType];
      return {
        ...prev,
        [mealType]: {
          meal: currentMeal?.meal || '',
          ingredients,
          macros
        }
      };
    });
  };

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
          </div>
        </div>

        <div className="grid gap-6">
          {MEAL_TYPES.map((meal) => (
            <MealRow
              key={meal}
              mealType={meal as MealType}
              weeklyMeals={{ [currentDayName]: dayMeals }}
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
