
import { useState, useEffect, useCallback } from 'react';
import { DayMeals, Ingredient, MacroInfo, MealType } from '@/types/meals';
import { createInitialMeals } from '@/utils/mealUtils';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export type DrinkAccompaniment = {
  name: string;
  macros: MacroInfo;
  grams: number;
};

export type DrinkAccompanimentData = {
  items: DrinkAccompaniment[];
};

export const useMealPlanner = () => {
  const [weeklyMeals, setWeeklyMeals] = useState<Record<string, DayMeals>>(() => {
    const savedMeals = localStorage.getItem('weeklyMeals');
    return savedMeals ? JSON.parse(savedMeals) : createInitialMeals();
  });

  const [drinksAndAccompaniments, setDrinksAndAccompaniments] = useState<Record<string, Record<string, DrinkAccompanimentData>>>(() => {
    const savedItems = localStorage.getItem('drinksAndAccompaniments');
    try {
      // Convert old format to new format
      const parsedData = savedItems ? JSON.parse(savedItems) : {};
      const newFormat: Record<string, Record<string, DrinkAccompanimentData>> = {};
      
      Object.keys(parsedData).forEach(day => {
        newFormat[day] = {};
        Object.keys(parsedData[day] || {}).forEach(mealType => {
          if (Array.isArray(parsedData[day][mealType]?.items)) {
            // Old format
            newFormat[day][mealType] = {
              items: parsedData[day][mealType].items.map((name: string) => ({
                name,
                macros: {
                  calories: 0,
                  protein: 0,
                  carbs: 0,
                  fat: 0,
                  showCalories: true,
                  showProtein: true,
                  showCarbs: true,
                  showFat: true
                },
                grams: 0
              }))
            };
          } else if (parsedData[day][mealType]?.items && typeof parsedData[day][mealType]?.items === 'object') {
            // Already in new format
            newFormat[day][mealType] = parsedData[day][mealType];
          }
        });
      });
      
      return newFormat;
    } catch (e) {
      return {};
    }
  });

  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Add the initializeMealsIfEmpty function
  const initializeMealsIfEmpty = useCallback(() => {
    setWeeklyMeals(prevMeals => {
      // Check if meals are already initialized
      const isEmpty = Object.keys(prevMeals).length === 0;
      
      // If empty, initialize with default meals
      if (isEmpty) {
        const initialMeals = createInitialMeals();
        console.log("Initializing empty meals:", initialMeals);
        return initialMeals;
      }
      
      return prevMeals;
    });
  }, []);

  // Save changes to local storage
  useEffect(() => {
    localStorage.setItem('weeklyMeals', JSON.stringify(weeklyMeals));
  }, [weeklyMeals]);

  useEffect(() => {
    localStorage.setItem('drinksAndAccompaniments', JSON.stringify(drinksAndAccompaniments));
  }, [drinksAndAccompaniments]);

  // Skip Supabase interactions for now
  const handleMealUpdate = (day: string, mealType: string, ingredients: Ingredient[], macros: MacroInfo, mealName: string) => {
    console.log("Updating meal:", day, mealType, mealName);
    setWeeklyMeals(prev => {
      const newWeeklyMeals = { ...prev };
      
      if (mealName && ingredients.length > 0) {
        newWeeklyMeals[day] = {
          ...newWeeklyMeals[day],
          [mealType]: {
            meal: mealName,
            ingredients,
            macros
          }
        };
      } else {
        newWeeklyMeals[day] = {
          ...newWeeklyMeals[day],
          [mealType]: null
        };
      }
      
      return newWeeklyMeals;
    });
  };

  const handleDrinksAccompanimentsUpdate = (day: string, mealType: string, items: DrinkAccompaniment[]) => {
    console.log("Updating drinks:", day, mealType, items);
    setDrinksAndAccompaniments(prev => {
      const newItems = { ...prev };
      
      if (!newItems[day]) {
        newItems[day] = {};
      }
      
      newItems[day][mealType] = {
        items
      };
      
      return newItems;
    });
  };

  const getDrinksAndAccompaniments = (day: string, mealType: string): DrinkAccompaniment[] => {
    return drinksAndAccompaniments[day]?.[mealType]?.items || [];
  };

  const getDrinksAndAccompanimentsMacros = (day: string, mealType: string): MacroInfo => {
    const items = getDrinksAndAccompaniments(day, mealType);
    
    return items.reduce(
      (total, item) => {
        return {
          calories: total.calories + (item.macros?.calories || 0),
          protein: total.protein + (item.macros?.protein || 0),
          carbs: total.carbs + (item.macros?.carbs || 0),
          fat: total.fat + (item.macros?.fat || 0),
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true,
        };
      },
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true,
      }
    );
  };

  return {
    weeklyMeals,
    setWeeklyMeals,
    handleMealUpdate,
    handleDrinksAccompanimentsUpdate,
    getDrinksAndAccompaniments,
    getDrinksAndAccompanimentsMacros,
    initializeMealsIfEmpty,
    loading
  };
};
