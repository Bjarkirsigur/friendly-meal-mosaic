
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
  id?: string;
  name: string;
  grams: number;
  macros: MacroInfo;
  is_default?: boolean;
  user_id?: string;
  image_url?: string;
}

export type DifficultyLevel = "Easy" | "Medium" | "Hard";

export interface Meal {
  id?: string;
  meal: string;
  ingredients: Ingredient[];
  macros: MacroInfo;
  recipe?: string;
  prepTime?: number; // in minutes
  difficulty?: DifficultyLevel;
  meal_type?: MealCategory;
  is_default?: boolean;
  user_id?: string;
  image_url?: string;
}

export type MealType = "Breakfast" | "Morning Snack" | "Lunch" | "Afternoon Snack" | "Dinner" | "Evening Snack";
export type MealCategory = "Breakfast" | "Lunch" | "Dinner" | "Snacks";

export interface DayMeals {
  Breakfast: Meal | null;
  Lunch: Meal | null;
  Dinner: Meal | null;
  "Morning Snack": Meal | null;
  "Afternoon Snack": Meal | null;
  "Evening Snack": Meal | null;
}

export interface DbIngredient {
  id: string;
  name: string;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  is_default: boolean;
  user_id?: string;
  created_at?: string;
  image_url?: string;
}

export interface DbMeal {
  id: string;
  name: string;
  meal_type: MealCategory;
  recipe?: string;
  prep_time?: number;
  difficulty?: DifficultyLevel;
  is_default: boolean;
  user_id?: string;
  created_at?: string;
  image_url?: string;
}

export interface DbMealIngredient {
  id: string;
  meal_id: string;
  ingredient_id: string;
  grams: number;
  ingredient?: DbIngredient;
}
