
import { MacroInfo } from "@/types/meals";
import { Progress } from "@/components/ui/progress";

interface MacroDisplayProps {
  macros: MacroInfo;
  visibilitySettings?: MacroInfo;
  className?: string;
  size?: "small" | "large";
  goals?: MacroInfo;
}

export const MacroDisplay = ({ 
  macros, 
  visibilitySettings, 
  className = "", 
  size = "small",
  goals
}: MacroDisplayProps) => {
  const textSizeClass = size === "large" ? "text-2xl" : "text-sm";
  const visibility = visibilitySettings || macros;

  const calculatePercentage = (current: number, target: number) => {
    if (!target) return 0;
    const percentage = (current / target) * 100;
    return Math.min(Math.max(percentage, 0), 100); // Clamp between 0 and 100
  };
  
  return (
    <div className={`grid grid-cols-4 gap-4 ${className}`}>
      {visibility.showCalories && (
        <div className="text-center">
          <p className={`font-semibold ${textSizeClass} mb-0.5`}>
            {macros.calories}
          </p>
          {goals && (
            <p className="text-sm text-muted-foreground -mt-0.5 mb-1">
              {goals.calories}
            </p>
          )}
          <p className="text-sm text-muted-foreground mb-2">kcal</p>
          {goals && (
            <div className="w-full px-2">
              <Progress 
                value={calculatePercentage(macros.calories, goals.calories)} 
                className="h-2"
              />
            </div>
          )}
        </div>
      )}
      {visibility.showProtein && (
        <div className="text-center">
          <p className={`font-semibold ${textSizeClass} mb-0.5`}>
            {macros.protein}
          </p>
          {goals && (
            <p className="text-sm text-muted-foreground -mt-0.5 mb-1">
              {goals.protein}
            </p>
          )}
          <p className="text-sm text-muted-foreground mb-2">Protein</p>
          {goals && (
            <div className="w-full px-2">
              <Progress 
                value={calculatePercentage(macros.protein, goals.protein)} 
                className="h-2"
              />
            </div>
          )}
        </div>
      )}
      {visibility.showCarbs && (
        <div className="text-center">
          <p className={`font-semibold ${textSizeClass} mb-0.5`}>
            {macros.carbs}
          </p>
          {goals && (
            <p className="text-sm text-muted-foreground -mt-0.5 mb-1">
              {goals.carbs}
            </p>
          )}
          <p className="text-sm text-muted-foreground mb-2">Carbs</p>
          {goals && (
            <div className="w-full px-2">
              <Progress 
                value={calculatePercentage(macros.carbs, goals.carbs)} 
                className="h-2"
              />
            </div>
          )}
        </div>
      )}
      {visibility.showFat && (
        <div className="text-center">
          <p className={`font-semibold ${textSizeClass} mb-0.5`}>
            {macros.fat}
          </p>
          {goals && (
            <p className="text-sm text-muted-foreground -mt-0.5 mb-1">
              {goals.fat}
            </p>
          )}
          <p className="text-sm text-muted-foreground mb-2">Fat</p>
          {goals && (
            <div className="w-full px-2">
              <Progress 
                value={calculatePercentage(macros.fat, goals.fat)} 
                className="h-2"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
