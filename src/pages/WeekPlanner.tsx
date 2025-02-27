
import { useState } from "react";
import WeekHeader from "../components/WeekHeader";
import MealRow from "../components/MealRow";
import { MEAL_TYPES, getAllAvailableIngredients } from "../utils/mealUtils";
import { MealType } from "../types/meals";
import MacroGoalsDialog from "@/components/MacroGoalsDialog";
import MacroGoalsDisplay from "@/components/MacroGoalsDisplay";
import { useMacroGoals } from "@/hooks/useMacroGoals";
import { useMealPlanner } from "@/hooks/useMealPlanner";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  return (
    <div className="min-h-screen bg-secondary/30 -mx-4 safe-area-inset-top safe-area-inset-bottom">
      <div className="w-full px-4 pt-2">
        <div className="text-center mb-4 md:mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-4xl font-bold text-primary mb-3 md:mb-6">Weekly Meal Plan</h1>
          <div className="flex flex-col items-center gap-3">
            <MacroGoalsDisplay 
              macroGoals={macroGoals}
              onSettingsClick={() => setIsGoalsDialogOpen(true)}
            />
          </div>
        </div>

        <ScrollArea className="w-full h-[calc(100vh-180px)]">
          <div className="min-w-[800px] px-2 pb-8">
            <div className="grid gap-4">
              <WeekHeader currentDate={currentDate} onWeekChange={setCurrentDate} />
              {MEAL_TYPES.map((meal) => (
                <MealRow
                  key={meal}
                  mealType={meal as MealType}
                  weeklyMeals={weeklyMeals}
                  onMealUpdate={handleMealUpdate}
                  availableIngredients={getAllAvailableIngredients()}
                  macroVisibility={macroGoals}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
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
