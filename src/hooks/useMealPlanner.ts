
import { useState, useEffect } from 'react';
import { DayMeals, Ingredient, MacroInfo, MealType } from '@/types/meals';
import { createInitialMeals } from '@/utils/mealUtils';

export const useMealPlanner = () => {
  const [weeklyMeals, setWeeklyMeals] = useState<Record<string, DayMeals>>(() => {
    const savedMeals = localStorage.getItem('weeklyMeals');
    return savedMeals ? JSON.parse(savedMeals) : createInitialMeals();
  });

  useEffect(() => {
    localStorage.setItem('weeklyMeals', JSON.stringify(weeklyMeals));
  }, [weeklyMeals]);

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

  return {
    weeklyMeals,
    setWeeklyMeals,
    handleMealUpdate
  };
};
