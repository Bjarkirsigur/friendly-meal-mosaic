
export interface MacroInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  showCalories?: boolean;
  showProtein?: boolean;
  showCarbs?: boolean;
  showFat?: boolean;
}

export interface Ingredient {
  name: string;
  grams: number;
  macros: MacroInfo;
}

export interface Meal {
  meal: string;
  ingredients: Ingredient[];
  macros: MacroInfo;
}

export type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snacks";

export interface DayMeals {
  Breakfast: Meal | null;
  Lunch: Meal | null;
  Dinner: Meal | null;
  Snacks: Meal | null;
}
