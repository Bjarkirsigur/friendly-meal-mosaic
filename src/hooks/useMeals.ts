
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { DbMeal, DbMealIngredient, DbIngredient, Meal, Ingredient, MacroInfo } from '@/types/meals';
import { useToast } from '@/hooks/use-toast';

export const useMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const convertDbToMeal = (
    dbMeal: DbMeal, 
    mealIngredients: DbMealIngredient[],
    ingredients: DbIngredient[]
  ): Meal => {
    // Map ingredients
    const mealIngredientsWithDetails = mealIngredients
      .filter(mi => mi.meal_id === dbMeal.id)
      .map(mi => {
        const ingredientDetails = ingredients.find(i => i.id === mi.ingredient_id);
        if (!ingredientDetails) return null;
        
        return {
          id: mi.ingredient_id,
          name: ingredientDetails.name,
          grams: mi.grams,
          macros: {
            calories: Math.round(ingredientDetails.calories * (mi.grams / ingredientDetails.grams)),
            protein: Math.round(ingredientDetails.protein * (mi.grams / ingredientDetails.grams) * 10) / 10,
            carbs: Math.round(ingredientDetails.carbs * (mi.grams / ingredientDetails.grams) * 10) / 10,
            fat: Math.round(ingredientDetails.fat * (mi.grams / ingredientDetails.grams) * 10) / 10,
            showCalories: true,
            showProtein: true,
            showCarbs: true,
            showFat: true
          },
          is_default: ingredientDetails.is_default,
          user_id: ingredientDetails.user_id
        } as Ingredient;
      })
      .filter(Boolean) as Ingredient[];
    
    // Calculate total macros
    const totalMacros = mealIngredientsWithDetails.reduce(
      (total, ingredient) => ({
        calories: total.calories + ingredient.macros.calories,
        protein: Math.round((total.protein + ingredient.macros.protein) * 10) / 10,
        carbs: Math.round((total.carbs + ingredient.macros.carbs) * 10) / 10,
        fat: Math.round((total.fat + ingredient.macros.fat) * 10) / 10,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, showCalories: true, showProtein: true, showCarbs: true, showFat: true }
    );
    
    return {
      id: dbMeal.id,
      meal: dbMeal.name,
      ingredients: mealIngredientsWithDetails,
      macros: totalMacros,
      recipe: dbMeal.recipe,
      prepTime: dbMeal.prep_time,
      difficulty: dbMeal.difficulty,
      meal_type: dbMeal.meal_type,
      is_default: dbMeal.is_default,
      user_id: dbMeal.user_id
    };
  };

  const loadMeals = async () => {
    try {
      setLoading(true);
      
      // Fetch all meals
      const { data: mealsData, error: mealsError } = await supabase
        .from('meals')
        .select('*')
        .order('name');
      
      if (mealsError) throw mealsError;
      
      // Fetch all meal ingredients with their connected ingredients
      const { data: mealIngredientsData, error: mealIngredientsError } = await supabase
        .from('meal_ingredients')
        .select(`
          id,
          meal_id,
          ingredient_id,
          grams
        `);
      
      if (mealIngredientsError) throw mealIngredientsError;
      
      // Fetch all ingredients
      const { data: ingredientsData, error: ingredientsError } = await supabase
        .from('ingredients')
        .select('*');
      
      if (ingredientsError) throw ingredientsError;
      
      // Convert DB data to app models
      if (mealsData && mealIngredientsData && ingredientsData) {
        const convertedMeals = mealsData.map((dbMeal: DbMeal) => 
          convertDbToMeal(dbMeal, mealIngredientsData, ingredientsData)
        );
        
        setMeals(convertedMeals);
      }
    } catch (error: any) {
      toast({
        title: 'Error loading meals',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addMeal = async (newMeal: Omit<Meal, 'id' | 'is_default' | 'user_id' | 'macros'>) => {
    if (!user) return null;
    
    try {
      // Insert the meal
      const { data: mealData, error: mealError } = await supabase
        .from('meals')
        .insert([{
          name: newMeal.meal,
          recipe: newMeal.recipe,
          prep_time: newMeal.prepTime,
          difficulty: newMeal.difficulty,
          meal_type: newMeal.meal_type || 'Snacks',
          user_id: user.id,
          is_default: false
        }])
        .select();
      
      if (mealError) throw mealError;
      
      if (!mealData || mealData.length === 0) {
        throw new Error('Failed to create meal');
      }
      
      const createdMeal = mealData[0] as DbMeal;
      
      // Insert meal ingredients
      if (newMeal.ingredients.length > 0) {
        const mealIngredientsToInsert = newMeal.ingredients.map(ingredient => ({
          meal_id: createdMeal.id,
          ingredient_id: ingredient.id,
          grams: ingredient.grams
        }));
        
        const { error: ingredientsError } = await supabase
          .from('meal_ingredients')
          .insert(mealIngredientsToInsert);
        
        if (ingredientsError) throw ingredientsError;
      }
      
      // Refresh meals list
      await loadMeals();
      
      // Return the created meal's ID
      return createdMeal.id;
    } catch (error: any) {
      toast({
        title: 'Error adding meal',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateMeal = async (id: string, updatedMeal: Partial<Omit<Meal, 'id' | 'is_default' | 'user_id'>>) => {
    if (!user) return false;
    
    try {
      // Prepare the database update object for the meal
      const updateData: Record<string, any> = {};
      if (updatedMeal.meal) updateData.name = updatedMeal.meal;
      if (updatedMeal.recipe !== undefined) updateData.recipe = updatedMeal.recipe;
      if (updatedMeal.prepTime !== undefined) updateData.prep_time = updatedMeal.prepTime;
      if (updatedMeal.difficulty) updateData.difficulty = updatedMeal.difficulty;
      if (updatedMeal.meal_type) updateData.meal_type = updatedMeal.meal_type;
      
      // Update the meal
      const { error: mealError } = await supabase
        .from('meals')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (mealError) throw mealError;
      
      // If ingredients are being updated
      if (updatedMeal.ingredients) {
        // First delete all existing meal ingredients
        const { error: deleteError } = await supabase
          .from('meal_ingredients')
          .delete()
          .eq('meal_id', id);
        
        if (deleteError) throw deleteError;
        
        // Then insert the new ingredients
        if (updatedMeal.ingredients.length > 0) {
          const mealIngredientsToInsert = updatedMeal.ingredients.map(ingredient => ({
            meal_id: id,
            ingredient_id: ingredient.id,
            grams: ingredient.grams
          }));
          
          const { error: insertError } = await supabase
            .from('meal_ingredients')
            .insert(mealIngredientsToInsert);
          
          if (insertError) throw insertError;
        }
      }
      
      // Refresh meals list
      await loadMeals();
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Error updating meal',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  const deleteMeal = async (id: string) => {
    if (!user) return false;
    
    try {
      // Delete the meal (meal_ingredients will be automatically deleted via CASCADE)
      const { error } = await supabase
        .from('meals')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setMeals(prev => prev.filter(meal => meal.id !== id));
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Error deleting meal',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      loadMeals();
    }
  }, [user]);

  return {
    meals,
    loading,
    addMeal,
    updateMeal,
    deleteMeal,
    refreshMeals: loadMeals
  };
};
