
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

// This function is now a fallback in case database loading fails
export const getAllAvailableIngredients = () => {
  return [
    {
      name: "Chicken Breast",
      grams: 100,
      macros: {
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }
    },
    {
      name: "Greek Yogurt",
      grams: 100,
      macros: {
        calories: 59,
        protein: 10,
        carbs: 3.6,
        fat: 0.4,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }
    },
    {
      name: "Eggs",
      grams: 50,
      macros: {
        calories: 78,
        protein: 6.3,
        carbs: 0.6,
        fat: 5.3,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }
    },
    {
      name: "Oats",
      grams: 40,
      macros: {
        calories: 150,
        protein: 5,
        carbs: 27,
        fat: 2.5,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }
    },
    {
      name: "Brown Rice",
      grams: 100,
      macros: {
        calories: 112,
        protein: 2.6,
        carbs: 23.5,
        fat: 0.9,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }
    },
    {
      name: "Salmon",
      grams: 100,
      macros: {
        calories: 208,
        protein: 20,
        carbs: 0,
        fat: 13,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }
    },
    {
      name: "Broccoli",
      grams: 100,
      macros: {
        calories: 34,
        protein: 2.8,
        carbs: 6.6,
        fat: 0.4,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }
    },
    {
      name: "Apple",
      grams: 100,
      macros: {
        calories: 52,
        protein: 0.3,
        carbs: 13.8,
        fat: 0.2,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }
    },
    {
      name: "Avocado",
      grams: 50,
      macros: {
        calories: 80,
        protein: 1,
        carbs: 4.3,
        fat: 7.3,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }
    },
    {
      name: "Almonds",
      grams: 30,
      macros: {
        calories: 173,
        protein: 6.3,
        carbs: 6.1,
        fat: 14.9,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }
    },
    {
      name: "Sweet Potato",
      grams: 100,
      macros: {
        calories: 86,
        protein: 1.6,
        carbs: 20.1,
        fat: 0.1,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }
    },
    {
      name: "Banana",
      grams: 100,
      macros: {
        calories: 89,
        protein: 1.1,
        carbs: 22.8,
        fat: 0.3,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }
    },
    {
      name: "Olive Oil",
      grams: 15,
      macros: {
        calories: 119,
        protein: 0,
        carbs: 0,
        fat: 13.5,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }
    },
    {
      name: "Peanut Butter",
      grams: 32,
      macros: {
        calories: 188,
        protein: 8,
        carbs: 6,
        fat: 16,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }
    },
    {
      name: "Protein Powder",
      grams: 30,
      macros: {
        calories: 120,
        protein: 24,
        carbs: 3,
        fat: 1.5,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }
    },
    {
      name: "Cheese",
      grams: 30,
      macros: {
        calories: 110,
        protein: 7,
        carbs: 0.4,
        fat: 9,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }
    }
  ] as Ingredient[];
};
