
import { useState, useEffect } from 'react';
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
          const newDrinksAndAccompaniments: Record<string, Record<string, DrinkAccompanimentData>> = {};
          
          data.forEach((plan: any) => {
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
              
              // Convert old format if needed
              if (Array.isArray(drinks_and_accompaniments.items)) {
                newDrinksAndAccompaniments[day_name][meal_type] = {
                  items: drinks_and_accompaniments.items.map((name: string) => ({
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
              } else {
                newDrinksAndAccompaniments[day_name][meal_type] = drinks_and_accompaniments;
              }
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

  // Helper function to serialize drinkAccompaniments for storage
  const serializeDrinksAccompaniments = (items: DrinkAccompaniment[]) => {
    return {
      items: items.map(item => ({
        name: item.name,
        grams: item.grams,
        macros: {
          calories: item.macros.calories,
          protein: item.macros.protein,
          carbs: item.macros.carbs,
          fat: item.macros.fat
        }
      }))
    };
  };

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
      
      const serializedDrinks = drinksItems ? serializeDrinksAccompaniments(drinksItems) : null;
      
      if (existingData) {
        // Update existing meal plan
        const { error: updateError } = await supabase
          .from('meal_plans')
          .update({
            meal_name: meal?.meal || null,
            ingredients: meal?.ingredients ? JSON.parse(JSON.stringify(meal.ingredients)) : null,
            macros: meal?.macros ? JSON.parse(JSON.stringify(meal.macros)) : null,
            drinks_and_accompaniments: serializedDrinks,
            updated_at: new Date().toISOString()
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
            ingredients: meal?.ingredients ? JSON.parse(JSON.stringify(meal.ingredients)) : null,
            macros: meal?.macros ? JSON.parse(JSON.stringify(meal.macros)) : null,
            drinks_and_accompaniments: serializedDrinks
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

  const handleDrinksAccompanimentsUpdate = (day: string, mealType: string, items: DrinkAccompaniment[]) => {
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
    loading
  };
};
