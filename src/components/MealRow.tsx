
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
    <div className="flex gap-1 items-center">
      <div className="text-muted-foreground font-medium w-[40px] text-xs shrink-0">{mealType}</div>
      <div className="flex gap-1 w-full overflow-x-auto pb-1">
        {Object.entries(weeklyMeals).map(([day, dayMeals]) => (
          <MealCard
            key={`${day}-${mealType}`}
            title={`${day} ${mealType}`}
            meal={dayMeals?.[mealType]?.meal}
            macros={dayMeals?.[mealType]?.macros}
            ingredients={dayMeals?.[mealType]?.ingredients}
            className="w-[50px] shrink-0"
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
