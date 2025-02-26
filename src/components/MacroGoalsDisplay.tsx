
import { Settings } from "lucide-react";
import { MacroInfo } from "@/types/meals";

interface MacroGoalsDisplayProps {
  macroGoals: MacroInfo;
  onSettingsClick: () => void;
}

const MacroGoalsDisplay = ({ macroGoals, onSettingsClick }: MacroGoalsDisplayProps) => {
  return (
    <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
      {macroGoals.showCalories && (
        <div>
          <span className="font-medium">{macroGoals.calories}</span> kcal
        </div>
      )}
      {macroGoals.showProtein && (
        <div>
          <span className="font-medium">{macroGoals.protein}g</span> protein
        </div>
      )}
      {macroGoals.showCarbs && (
        <div>
          <span className="font-medium">{macroGoals.carbs}g</span> carbs
        </div>
      )}
      {macroGoals.showFat && (
        <div>
          <span className="font-medium">{macroGoals.fat}g</span> fat
        </div>
      )}
      <button
        onClick={onSettingsClick}
        className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
      >
        <Settings className="w-5 h-5 text-primary" />
      </button>
    </div>
  );
};

export default MacroGoalsDisplay;
