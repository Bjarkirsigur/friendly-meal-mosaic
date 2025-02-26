
import { MEALS as AVAILABLE_MEALS } from "../data/mealsData";
import { Ingredient, MealType, DayMeals } from "../types/meals";

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snacks"];

const defaultMacroVisibility = {
  showCalories: true,
  showProtein: true,
  showCarbs: true,
  showFat: true,
};

export const getAllAvailableIngredients = (): Ingredient[] => {
  const ingredients: Ingredient[] = [];
  Object.values(AVAILABLE_MEALS).forEach(mealCategory => {
    mealCategory.forEach(meal => {
      meal.ingredients.forEach(ingredient => {
        if (!ingredients.find(i => i.name === ingredient.name)) {
          // Add visibility flags to ingredient macros
          ingredients.push({
            ...ingredient,
            macros: {
              ...ingredient.macros,
              ...defaultMacroVisibility
            }
          });
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
      const meal = AVAILABLE_MEALS[mealType as keyof typeof AVAILABLE_MEALS]?.[0] || null;
      if (meal) {
        initialMeals[day][mealType as MealType] = {
          ...meal,
          macros: {
            ...meal.macros,
            ...defaultMacroVisibility
          },
          ingredients: meal.ingredients.map(ingredient => ({
            ...ingredient,
            macros: {
              ...ingredient.macros,
              ...defaultMacroVisibility
            }
          }))
        };
      } else {
        initialMeals[day][mealType as MealType] = null;
      }
    });
  });
  return initialMeals;
};
