
import { useState } from "react";
import WeekHeader from "../components/WeekHeader";
import WeekMealRow from "../components/WeekMealRow";
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

  const weekContent = (
    <div className="grid gap-6">
      <WeekHeader currentDate={currentDate} onWeekChange={setCurrentDate} />
      {MEAL_TYPES.map((meal) => (
        <WeekMealRow
          key={meal}
          mealType={meal as MealType}
          weeklyMeals={weeklyMeals}
          onMealUpdate={handleMealUpdate}
          availableIngredients={getAllAvailableIngredients()}
          macroVisibility={macroGoals}
        />
      ))}
    </div>
  );

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
              {weekContent}
            </div>
          </ScrollArea>
        ) : (
          weekContent
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
