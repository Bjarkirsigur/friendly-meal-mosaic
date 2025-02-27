
import { useIsMobile } from "@/hooks/use-mobile";
import { DAYS } from "../utils/mealUtils";
import MealCard from "./MealCard";
import { Ingredient, MacroInfo, MealType, DayMeals } from "../types/meals";

interface WeekMealRowProps {
  mealType: MealType;
  weeklyMeals: Record<string, DayMeals>;
  onMealUpdate: (day: string, mealType: string, ingredients: Ingredient[], macros: MacroInfo, mealName: string) => void;
  availableIngredients: Ingredient[];
  macroVisibility: MacroInfo;
}

const WeekMealRow = ({ mealType, weeklyMeals, onMealUpdate, availableIngredients, macroVisibility }: WeekMealRowProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex gap-1 items-center">
      <div className="text-muted-foreground font-medium w-[50px] text-xs shrink-0">{mealType}</div>
      <div className="flex gap-1 w-full overflow-x-auto pb-2">
        {DAYS.map((day) => (
          <MealCard
            key={`${day}-${mealType}`}
            title={`${day} ${mealType}`}
            meal={weeklyMeals[day]?.[mealType]?.meal}
            macros={weeklyMeals[day]?.[mealType]?.macros}
            ingredients={weeklyMeals[day]?.[mealType]?.ingredients}
            className="w-[100px] shrink-0"
            onMealUpdate={(ingredients, macros, mealName) => onMealUpdate(day, mealType, ingredients, macros, mealName)}
            availableIngredients={availableIngredients}
            macroVisibility={macroVisibility}
          />
        ))}
      </div>
    </div>
  );
};

export default WeekMealRow;
