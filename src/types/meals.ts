
export interface MacroInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  showCalories: boolean;
  showProtein: boolean;
  showCarbs: boolean;
  showFat: boolean;
}

export interface Ingredient {
  name: string;
  grams: number;
  macros: MacroInfo;
}

export type DifficultyLevel = "Easy" | "Medium" | "Hard";

export interface Meal {
  meal: string;
  ingredients: Ingredient[];
  macros: MacroInfo;
  recipe?: string;
  prepTime?: number; // in minutes
  difficulty?: DifficultyLevel;
}

export type MealType = "Breakfast" | "Morning Snack" | "Lunch" | "Afternoon Snack" | "Dinner" | "Evening Snack";

export interface DayMeals {
  Breakfast: Meal | null;
  Lunch: Meal | null;
  Dinner: Meal | null;
  "Morning Snack": Meal | null;
  "Afternoon Snack": Meal | null;
  "Evening Snack": Meal | null;
}
