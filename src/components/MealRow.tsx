
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
    <div className="grid grid-cols-[120px_repeat(7,1fr)] gap-4 items-center">
      <div className="text-muted-foreground font-medium">{mealType}</div>
      {DAYS.map((day) => (
        <MealCard
          key={`${day}-${mealType}`}
          title={`${day} ${mealType}`}
          meal={weeklyMeals[day][mealType]?.meal}
          macros={weeklyMeals[day][mealType]?.macros}
          ingredients={weeklyMeals[day][mealType]?.ingredients}
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
