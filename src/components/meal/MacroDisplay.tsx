
import { MacroInfo } from "@/types/meals";

interface MacroDisplayProps {
  macros: MacroInfo;
  visibilitySettings?: MacroInfo;
  className?: string;
  size?: "small" | "large";
}

export const MacroDisplay = ({ macros, visibilitySettings, className = "", size = "small" }: MacroDisplayProps) => {
  const textSizeClass = size === "large" ? "text-2xl" : "text-sm";
  const visibility = visibilitySettings || macros;
  
  return (
    <div className={`grid grid-cols-4 gap-4 ${className}`}>
      {visibility.showCalories && (
        <div className="text-center">
          <p className={`font-semibold ${textSizeClass} mb-0.5`}>{macros.calories}</p>
          <p className="text-sm text-muted-foreground">kcal</p>
        </div>
      )}
      {visibility.showProtein && (
        <div className="text-center">
          <p className={`font-semibold ${textSizeClass} mb-0.5`}>{macros.protein}g</p>
          <p className="text-sm text-muted-foreground">Protein</p>
        </div>
      )}
      {visibility.showCarbs && (
        <div className="text-center">
          <p className={`font-semibold ${textSizeClass} mb-0.5`}>{macros.carbs}g</p>
          <p className="text-sm text-muted-foreground">Carbs</p>
        </div>
      )}
      {visibility.showFat && (
        <div className="text-center">
          <p className={`font-semibold ${textSizeClass} mb-0.5`}>{macros.fat}g</p>
          <p className="text-sm text-muted-foreground">Fat</p>
        </div>
      )}
    </div>
  );
};

