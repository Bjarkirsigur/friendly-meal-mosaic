
import { useIsMobile } from "@/hooks/use-mobile";
import { DAYS } from "../utils/mealUtils";
import MealCard from "./MealCard";
import { Ingredient, MacroInfo, MealType, DayMeals } from "../types/meals";

interface MealRowProps {
  mealType: MealType;
  displayName?: string;
  weeklyMeals: Record<string, DayMeals>;
  onMealUpdate: (day: string, mealType: string, ingredients: Ingredient[], macros: MacroInfo, mealName: string) => void;
  availableIngredients: Ingredient[];
  macroVisibility: MacroInfo;
}

const MealRow = ({ mealType, displayName, weeklyMeals, onMealUpdate, availableIngredients, macroVisibility }: MealRowProps) => {
  const isMobile = useIsMobile();
  const showName = displayName || mealType;

  return (
    <div className="flex gap-2 md:gap-4 items-center">
      <div className="text-muted-foreground font-medium w-[80px] md:w-[120px] text-sm md:text-base shrink-0">{showName}</div>
      <div className="flex gap-2 md:gap-4 w-full overflow-x-auto pb-2">
        {Object.entries(weeklyMeals).map(([day, dayMeals]) => (
          <MealCard
            key={`${day}-${mealType}`}
            title={`${day} ${mealType}`}
            meal={dayMeals?.[mealType]?.meal}
            macros={dayMeals?.[mealType]?.macros}
            ingredients={dayMeals?.[mealType]?.ingredients}
            className="w-[200px] md:w-full shrink-0"
            onMealUpdate={(ingredients, macros, mealName) => onMealUpdate(day, mealType, ingredients, macros, mealName)}
            availableIngredients={availableIngredients}
            macroVisibility={macroVisibility}
          />
        ))}
      </div>
    </div>
  );
};

export default MealRow;
