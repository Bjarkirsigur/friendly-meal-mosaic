
import { MacroInfo, Ingredient, MealType, DayMeals } from "../types/meals";

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const MEAL_TYPES = ['Breakfast', 'Morning Snack', 'Lunch', 'Afternoon Snack', 'Dinner', 'Evening Snack'];

export const createInitialMeals = () => {
  const initialMeals: Record<string, DayMeals> = {};
  
  DAYS.forEach(day => {
    initialMeals[day] = {
      'Breakfast': null,
      'Lunch': null,
      'Dinner': null,
      'Morning Snack': null,
      'Afternoon Snack': null,
      'Evening Snack': null
    };
  });
  
  return initialMeals;
};
