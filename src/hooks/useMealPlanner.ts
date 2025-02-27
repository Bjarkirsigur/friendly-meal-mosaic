
import { useState, useEffect } from 'react';
import { DayMeals, Ingredient, MacroInfo, MealType } from '@/types/meals';
import { createInitialMeals } from '@/utils/mealUtils';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export const useMealPlanner = () => {
  const [weeklyMeals, setWeeklyMeals] = useState<Record<string, DayMeals>>(() => {
    const savedMeals = localStorage.getItem('weeklyMeals');
    return savedMeals ? JSON.parse(savedMeals) : createInitialMeals();
  });

  const [drinksAndAccompaniments, setDrinksAndAccompaniments] = useState<Record<string, Record<string, { items: string[] }>>>(() => {
    const savedItems = localStorage.getItem('drinksAndAccompaniments');
    return savedItems ? JSON.parse(savedItems) : {};
  });

  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Load meal plans from database when user logs in
  useEffect(() => {
    const loadMealPlans = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('meal_plans')
          .select('*')
          .eq('user_id', user.id);
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          const newWeeklyMeals = createInitialMeals();
          const newDrinksAndAccompaniments: Record<string, Record<string, { items: string[] }>> = {};
          
          data.forEach(plan => {
            const { day_name, meal_type, meal_name, ingredients, macros, drinks_and_accompaniments } = plan;
            
            if (newWeeklyMeals[day_name] && meal_name && ingredients && macros) {
              newWeeklyMeals[day_name][meal_type as MealType] = {
                meal: meal_name,
                ingredients: ingredients as Ingredient[],
                macros: macros as MacroInfo
              };
            }
            
            if (drinks_and_accompaniments) {
              if (!newDrinksAndAccompaniments[day_name]) {
                newDrinksAndAccompaniments[day_name] = {};
              }
              newDrinksAndAccompaniments[day_name][meal_type] = {
                items: drinks_and_accompaniments.items || []
              };
            }
          });
          
          setWeeklyMeals(newWeeklyMeals);
          setDrinksAndAccompaniments(newDrinksAndAccompaniments);
        }
      } catch (error: any) {
        toast({
          title: 'Error loading meal plans',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadMealPlans();
  }, [user]);

  // Save changes to local storage
  useEffect(() => {
    localStorage.setItem('weeklyMeals', JSON.stringify(weeklyMeals));
  }, [weeklyMeals]);

  useEffect(() => {
    localStorage.setItem('drinksAndAccompaniments', JSON.stringify(drinksAndAccompaniments));
  }, [drinksAndAccompaniments]);

  // Helper function to sync with database
  const syncMealPlan = async (day: string, mealType: string) => {
    if (!user) return;
    
    const meal = weeklyMeals[day][mealType as MealType];
    const drinksItems = drinksAndAccompaniments[day]?.[mealType]?.items;
    
    try {
      // Check if this meal plan already exists
      const { data: existingData, error: fetchError } = await supabase
        .from('meal_plans')
        .select('id')
        .eq('user_id', user.id)
        .eq('day_name', day)
        .eq('meal_type', mealType)
        .maybeSingle();
      
      if (fetchError) throw fetchError;
      
      if (existingData) {
        // Update existing meal plan
        const { error: updateError } = await supabase
          .from('meal_plans')
          .update({
            meal_name: meal?.meal || null,
            ingredients: meal?.ingredients || null,
            macros: meal?.macros || null,
            drinks_and_accompaniments: drinksItems ? { items: drinksItems } : null,
            updated_at: new Date()
          })
          .eq('id', existingData.id);
        
        if (updateError) throw updateError;
      } else {
        // Insert new meal plan
        const { error: insertError } = await supabase
          .from('meal_plans')
          .insert({
            user_id: user.id,
            day_name: day,
            meal_type: mealType,
            meal_name: meal?.meal || null,
            ingredients: meal?.ingredients || null,
            macros: meal?.macros || null,
            drinks_and_accompaniments: drinksItems ? { items: drinksItems } : null
          });
        
        if (insertError) throw insertError;
      }
    } catch (error: any) {
      console.error('Error syncing meal plan:', error);
      // Don't show toast for every sync operation
    }
  };

  const handleMealUpdate = (day: string, mealType: string, ingredients: Ingredient[], macros: MacroInfo, mealName: string) => {
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
    
    // Sync with database
    if (user) {
      syncMealPlan(day, mealType);
    }
  };

  const handleDrinksAccompanimentsUpdate = (day: string, mealType: string, items: string[]) => {
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
    
    // Sync with database
    if (user) {
      syncMealPlan(day, mealType);
    }
  };

  const getDrinksAndAccompaniments = (day: string, mealType: string) => {
    return drinksAndAccompaniments[day]?.[mealType]?.items || [];
  };

  return {
    weeklyMeals,
    setWeeklyMeals,
    handleMealUpdate,
    handleDrinksAccompanimentsUpdate,
    getDrinksAndAccompaniments,
    loading
  };
};
