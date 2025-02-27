
import { useState, useEffect } from 'react';
import { DayMeals, Ingredient, MacroInfo, MealType } from '@/types/meals';
import { createInitialMeals } from '@/utils/mealUtils';

export const useMealPlanner = () => {
  const [weeklyMeals, setWeeklyMeals] = useState<Record<string, DayMeals>>(() => {
    const savedMeals = localStorage.getItem('weeklyMeals');
    return savedMeals ? JSON.parse(savedMeals) : createInitialMeals();
  });

  const [drinksAndAccompaniments, setDrinksAndAccompaniments] = useState<Record<string, Record<string, { items: string[] }>>>(() => {
    const savedItems = localStorage.getItem('drinksAndAccompaniments');
    return savedItems ? JSON.parse(savedItems) : {};
  });

  useEffect(() => {
    localStorage.setItem('weeklyMeals', JSON.stringify(weeklyMeals));
  }, [weeklyMeals]);

  useEffect(() => {
    localStorage.setItem('drinksAndAccompaniments', JSON.stringify(drinksAndAccompaniments));
  }, [drinksAndAccompaniments]);

  const handleMealUpdate = (day: string, mealType: string, ingredients: Ingredient[], macros: MacroInfo, mealName: string) => {
    setWeeklyMeals(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: {
          ...prev[day][mealType],
          meal: mealName,
          ingredients,
          macros
        }
      }
    }));
  };

  const handleDrinksAccompanimentsUpdate = (day: string, mealType: string, items: string[]) => {
    setDrinksAndAccompaniments(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: {
          items
        }
      }
    }));
  };

  const getDrinksAndAccompaniments = (day: string, mealType: string) => {
    return drinksAndAccompaniments[day]?.[mealType]?.items || [];
  };

  return {
    weeklyMeals,
    setWeeklyMeals,
    handleMealUpdate,
    handleDrinksAccompanimentsUpdate,
    getDrinksAndAccompaniments
  };
};
