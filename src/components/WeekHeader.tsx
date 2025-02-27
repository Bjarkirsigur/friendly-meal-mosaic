
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, getDay, addDays, subDays, startOfWeek, endOfWeek } from "date-fns";
import { MEAL_TYPES } from "@/utils/mealUtils";
import { MacroInfo, MealType } from "@/types/meals";
import { useMealPlanner } from "@/hooks/useMealPlanner";
import { useMacroGoals } from "@/hooks/useMacroGoals";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface WeekHeaderProps {
  currentDate: Date;
  onWeekChange: (date: Date) => void;
}

const WeekHeader = ({ currentDate, onWeekChange }: WeekHeaderProps) => {
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });
  const monthYear = format(currentDate, "MMMM yyyy");
  const { weeklyMeals } = useMealPlanner();
  const { macroGoals } = useMacroGoals();

  const getDateFromWeekDay = (day: number) => {
    return addDays(startDate, day - 1);
  };

  const getWeekDayName = (day: number) => {
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return dayNames[day - 1];
  };

  const getDayNumber = (day: number) => {
    return format(getDateFromWeekDay(day), "d");
  };

  const handlePrevWeek = () => {
    onWeekChange(subDays(currentDate, 7));
  };

  const handleNextWeek = () => {
    onWeekChange(addDays(currentDate, 7));
  };

  // Calculate daily total macros for a specific day
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

  // Function to render macro summary for a day - more compact version
  const renderDailyMacroSummary = (day: string) => {
    const macros = calculateDailyMacros(day);
    
    // Calculate percentage of goal for each macro
    const caloriePercent = macroGoals.calories ? Math.round((macros.calories / macroGoals.calories) * 100) : 0;
    const proteinPercent = macroGoals.protein ? Math.round((macros.protein / macroGoals.protein) * 100) : 0;
    const carbsPercent = macroGoals.carbs ? Math.round((macros.carbs / macroGoals.carbs) * 100) : 0;
    const fatPercent = macroGoals.fat ? Math.round((macros.fat / macroGoals.fat) * 100) : 0;
    
    return (
      <div className="text-[10px] text-muted-foreground mt-1 flex flex-wrap items-center justify-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`px-1 py-0.5 rounded ${caloriePercent > 100 ? 'bg-destructive/20' : caloriePercent > 0 ? 'bg-secondary' : ''}`}>
              {macros.calories}C
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs p-2">
            <p>{macros.calories} kcal ({caloriePercent}% of goal)</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`px-1 py-0.5 rounded ${proteinPercent > 100 ? 'bg-destructive/20' : proteinPercent > 0 ? 'bg-secondary' : ''}`}>
              {macros.protein}P
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs p-2">
            <p>{macros.protein}g protein ({proteinPercent}% of goal)</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`px-1 py-0.5 rounded ${carbsPercent > 100 ? 'bg-destructive/20' : carbsPercent > 0 ? 'bg-secondary' : ''}`}>
              {macros.carbs}C
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs p-2">
            <p>{macros.carbs}g carbs ({carbsPercent}% of goal)</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`px-1 py-0.5 rounded ${fatPercent > 100 ? 'bg-destructive/20' : fatPercent > 0 ? 'bg-secondary' : ''}`}>
              {macros.fat}F
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs p-2">
            <p>{macros.fat}g fat ({fatPercent}% of goal)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="icon" onClick={handlePrevWeek}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-medium">{monthYear}</h2>
        <Button variant="outline" size="icon" onClick={handleNextWeek}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
          <div key={day} className="text-center">
            <div className="font-medium">{getWeekDayName(day)}</div>
            <div className="text-sm text-muted-foreground">{getDayNumber(day)}</div>
            {renderDailyMacroSummary(getWeekDayName(day))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekHeader;
