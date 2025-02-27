
import { MacroInfo } from "@/types/meals";

interface MacroDisplayProps {
  macros: MacroInfo;
  className?: string;
  size?: "small" | "large";
}

export const MacroDisplay = ({ macros, className = "", size = "small" }: MacroDisplayProps) => {
  const textSizeClass = size === "large" ? "text-2xl" : "text-sm";
  
  return (
    <div className={`grid grid-cols-4 gap-4 ${className}`}>
      {macros.showCalories && (
        <div className="text-center">
          <p className={`font-semibold ${textSizeClass} mb-0.5`}>{macros.calories}</p>
          <p className="text-sm text-muted-foreground">kcal</p>
        </div>
      )}
      {macros.showProtein && (
        <div className="text-center">
          <p className={`font-semibold ${textSizeClass} mb-0.5`}>{macros.protein}g</p>
          <p className="text-sm text-muted-foreground">Protein</p>
        </div>
      )}
      {macros.showCarbs && (
        <div className="text-center">
          <p className={`font-semibold ${textSizeClass} mb-0.5`}>{macros.carbs}g</p>
          <p className="text-sm text-muted-foreground">Carbs</p>
        </div>
      )}
      {macros.showFat && (
        <div className="text-center">
          <p className={`font-semibold ${textSizeClass} mb-0.5`}>{macros.fat}g</p>
          <p className="text-sm text-muted-foreground">Fat</p>
        </div>
      )}
    </div>
  );
};
