
import { DAYS } from "../utils/mealUtils";
import MealCard from "./MealCard";
import { Ingredient, MacroInfo, MealType, DayMeals } from "../types/meals";

interface MealRowProps {
  mealType: MealType;
  weeklyMeals: Record<string, DayMeals>;
  onMealUpdate: (day: string, mealType: string, ingredients: Ingredient[], macros: MacroInfo) => void;
  availableIngredients: Ingredient[];
  macroVisibility: MacroInfo;
}

const MealRow = ({ mealType, weeklyMeals, onMealUpdate, availableIngredients, macroVisibility }: MealRowProps) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="text-muted-foreground font-medium w-[120px]">{mealType}</div>
      {Object.entries(weeklyMeals).map(([day, dayMeals]) => (
        <MealCard
          key={`${day}-${mealType}`}
          title={`${day} ${mealType}`}
          meal={dayMeals?.[mealType]?.meal}
          macros={dayMeals?.[mealType]?.macros}
          ingredients={dayMeals?.[mealType]?.ingredients}
          className="w-full"
          onMealUpdate={(ingredients, macros) => onMealUpdate(day, mealType, ingredients, macros)}
          availableIngredients={availableIngredients}
          macroVisibility={macroVisibility}
        />
      ))}
    </div>
  );
};

export default MealRow;
