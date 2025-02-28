
import { useIsMobile } from "@/hooks/use-mobile";
import MealCard from "./MealCard";
import { Ingredient, MacroInfo, MealType, DayMeals } from "../types/meals";
import { useMealPlanner } from "@/hooks/useMealPlanner";

interface MealRowProps {
  mealType: MealType;
  weeklyMeals: Record<string, DayMeals>;
  onMealUpdate: (day: string, mealType: string, ingredients: Ingredient[], macros: MacroInfo, mealName: string) => void;
  macroVisibility: MacroInfo;
}

const MealRow = ({ mealType, weeklyMeals, onMealUpdate, macroVisibility }: MealRowProps) => {
  const isMobile = useIsMobile();
  const { getDrinksAndAccompaniments, handleDrinksAccompanimentsUpdate } = useMealPlanner();

  return (
    <div className="flex gap-2 md:gap-3 items-center">
      <div className="text-muted-foreground font-medium w-[70px] md:w-[100px] text-xs md:text-sm shrink-0">{mealType}</div>
      <div className="flex gap-2 md:gap-3 w-full overflow-x-auto pb-2">
        {Object.entries(weeklyMeals).map(([day, dayMeals]) => (
          <MealCard
            key={`${day}-${mealType}`}
            title={`${day} ${mealType}`}
            meal={dayMeals?.[mealType]?.meal}
            macros={dayMeals?.[mealType]?.macros}
            ingredients={dayMeals?.[mealType]?.ingredients}
            className="w-[140px] md:w-[160px] shrink-0"
            onMealUpdate={(ingredients, macros, mealName) => onMealUpdate(day, mealType, ingredients, macros, mealName)}
            macroVisibility={macroVisibility}
            drinksAndAccompaniments={getDrinksAndAccompaniments(day, mealType)}
            onDrinksAndAccompanimentsUpdate={(items) => handleDrinksAccompanimentsUpdate(day, mealType, items)}
          />
        ))}
      </div>
    </div>
  );
};

export default MealRow;
