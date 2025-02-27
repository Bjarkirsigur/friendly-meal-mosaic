
import { useIsMobile } from "@/hooks/use-mobile";
import { DAYS } from "../utils/mealUtils";
import MealCard from "./MealCard";
import { Ingredient, MacroInfo, MealType, DayMeals } from "../types/meals";

interface MealRowProps {
  mealType: MealType;
  weeklyMeals: Record<string, DayMeals>;
  onMealUpdate: (day: string, mealType: string, ingredients: Ingredient[], macros: MacroInfo, mealName: string) => void;
  availableIngredients: Ingredient[];
  macroVisibility: MacroInfo;
}

const MealRow = ({ mealType, weeklyMeals, onMealUpdate, availableIngredients, macroVisibility }: MealRowProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex gap-2 md:gap-4 items-center">
      <div className="text-muted-foreground font-medium w-[80px] md:w-[120px] text-sm md:text-base shrink-0">{mealType}</div>
      <div className="flex gap-2 md:gap-4 w-full overflow-x-auto pb-2">
        {DAYS.map((day) => (
          <MealCard
            key={`${day}-${mealType}`}
            title={`${day} ${mealType}`}
            meal={weeklyMeals[day]?.[mealType]?.meal}
            macros={weeklyMeals[day]?.[mealType]?.macros}
            ingredients={weeklyMeals[day]?.[mealType]?.ingredients}
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
