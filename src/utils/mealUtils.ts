
import { MEALS as AVAILABLE_MEALS } from "../data/mealsData";
import { Ingredient, MealType, DayMeals } from "../types/meals";

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snacks"];

export const getAllAvailableIngredients = (): Ingredient[] => {
  const ingredients: Ingredient[] = [];
  Object.values(AVAILABLE_MEALS).forEach(mealCategory => {
    mealCategory.forEach(meal => {
      meal.ingredients.forEach(ingredient => {
        if (!ingredients.find(i => i.name === ingredient.name)) {
          ingredients.push(ingredient);
        }
      });
    });
  });
  return ingredients;
};

export const createInitialMeals = (): Record<string, DayMeals> => {
  const initialMeals: Record<string, DayMeals> = {};
  DAYS.forEach(day => {
    initialMeals[day] = {} as DayMeals;
    MEAL_TYPES.forEach(mealType => {
      initialMeals[day][mealType as MealType] = AVAILABLE_MEALS[mealType as keyof typeof AVAILABLE_MEALS]?.[0] || null;
    });
  });
  return initialMeals;
};
