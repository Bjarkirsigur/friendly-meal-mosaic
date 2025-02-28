import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Ingredient } from '@/types/meals';
import { useToast } from '@/hooks/use-toast';
import { foodLibrary } from '@/utils/foodLibrary';

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const createSampleIngredients = (): Ingredient[] => {
    let sampleIngredients: Ingredient[] = [];
    let id = 1;
    
    foodLibrary.forEach(category => {
      category.foods.forEach(food => {
        sampleIngredients.push({
          id: String(id++),
          name: food.name,
          grams: food.grams,
          macros: {
            calories: food.macros.calories,
            protein: food.macros.protein,
            carbs: food.macros.carbs,
            fat: food.macros.fat,
            showCalories: true,
            showProtein: true,
            showCarbs: true,
            showFat: true
          },
          is_default: true,
          user_id: null
        });
      });
    });
    
    return sampleIngredients;
  };

  const loadIngredients = async () => {
    try {
      setLoading(true);
      
      if (!user) {
        const sampleIngredients = createSampleIngredients();
        setIngredients(sampleIngredients);
        return;
      }
      
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      if (data) {
        const mappedIngredients = data.map((ingredient: any) => ({
          id: ingredient.id,
          name: ingredient.name,
          grams: ingredient.grams,
          macros: {
            calories: ingredient.calories,
            protein: ingredient.protein,
            carbs: ingredient.carbs,
            fat: ingredient.fat,
            showCalories: true,
            showProtein: true,
            showCarbs: true,
            showFat: true
          },
          is_default: ingredient.is_default,
          user_id: ingredient.user_id,
          image_url: ingredient.image_url
        }));
        
        setIngredients(mappedIngredients);
      }
    } catch (error: any) {
      toast({
        title: 'Error loading ingredients',
        description: error.message,
        variant: 'destructive',
      });
      
      const sampleIngredients = createSampleIngredients();
      setIngredients(sampleIngredients);
    } finally {
      setLoading(false);
    }
  };

  const addIngredient = async (newIngredient: Omit<Ingredient, 'id' | 'is_default' | 'user_id'>) => {
    if (!user) {
      toast({
        title: 'Guest Mode',
        description: 'Sign in to save ingredients',
      });
      return null;
    }
    
    try {
      const { data, error } = await supabase
        .from('ingredients')
        .insert([{
          name: newIngredient.name,
          grams: newIngredient.grams,
          calories: newIngredient.macros.calories,
          protein: newIngredient.macros.protein,
          carbs: newIngredient.macros.carbs,
          fat: newIngredient.macros.fat,
          user_id: user.id,
          is_default: false,
          image_url: newIngredient.image_url
        }])
        .select();
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const ingredientDb = data[0] as any;
        const ingredient: Ingredient = {
          id: ingredientDb.id,
          name: ingredientDb.name,
          grams: ingredientDb.grams,
          macros: {
            calories: ingredientDb.calories,
            protein: ingredientDb.protein,
            carbs: ingredientDb.carbs,
            fat: ingredientDb.fat,
            showCalories: true,
            showProtein: true,
            showCarbs: true,
            showFat: true
          },
          is_default: ingredientDb.is_default,
          user_id: ingredientDb.user_id,
          image_url: ingredientDb.image_url
        };
        
        setIngredients(prev => [...prev, ingredient]);
        return ingredient;
      }
      return null;
    } catch (error: any) {
      toast({
        title: 'Error adding ingredient',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateIngredient = async (id: string, updatedIngredient: Partial<Omit<Ingredient, 'id' | 'is_default' | 'user_id'>>) => {
    if (!user) {
      toast({
        title: 'Guest Mode',
        description: 'Sign in to update ingredients',
      });
      return false;
    }
    
    try {
      const updateData: Record<string, any> = {};
      if (updatedIngredient.name) updateData.name = updatedIngredient.name;
      if (updatedIngredient.grams) updateData.grams = updatedIngredient.grams;
      if (updatedIngredient.image_url) updateData.image_url = updatedIngredient.image_url;
      if (updatedIngredient.macros) {
        if (updatedIngredient.macros.calories !== undefined) updateData.calories = updatedIngredient.macros.calories;
        if (updatedIngredient.macros.protein !== undefined) updateData.protein = updatedIngredient.macros.protein;
        if (updatedIngredient.macros.carbs !== undefined) updateData.carbs = updatedIngredient.macros.carbs;
        if (updatedIngredient.macros.fat !== undefined) updateData.fat = updatedIngredient.macros.fat;
      }
      
      const { error } = await supabase
        .from('ingredients')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setIngredients(prev => prev.map(ingredient => 
        ingredient.id === id 
          ? { 
              ...ingredient, 
              ...updatedIngredient,
              macros: {
                ...ingredient.macros,
                ...(updatedIngredient.macros || {})
              }
            } 
          : ingredient
      ));
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Error updating ingredient',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  const deleteIngredient = async (id: string) => {
    if (!user) {
      toast({
        title: 'Guest Mode',
        description: 'Sign in to delete ingredients',
      });
      return false;
    }
    
    try {
      const { error } = await supabase
        .from('ingredients')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setIngredients(prev => prev.filter(ingredient => ingredient.id !== id));
      
      return true;
    } catch (error: any) {
      toast({
        title: 'Error deleting ingredient',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  useEffect(() => {
    loadIngredients();
  }, [user]);

  return {
    ingredients,
    loading,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    refreshIngredients: loadIngredients
  };
};
