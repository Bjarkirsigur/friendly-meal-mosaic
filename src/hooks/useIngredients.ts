
import { useState, useEffect } from 'react';
import { Ingredient } from '@/types/meals';
import { useToast } from '@/hooks/use-toast';

// Sample ingredients data to use without authentication
const sampleIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'Chicken Breast',
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
    },
    is_default: true,
    user_id: null
  },
  {
    id: '2',
    name: 'Brown Rice',
    grams: 100,
    macros: {
      calories: 112,
      protein: 2.6,
      carbs: 23,
      fat: 0.9,
      showCalories: true,
      showProtein: true,
      showCarbs: true,
      showFat: true
    },
    is_default: true,
    user_id: null
  },
  {
    id: '3',
    name: 'Broccoli',
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
    },
    is_default: true,
    user_id: null
  },
  {
    id: '4',
    name: 'Sweet Potato',
    grams: 100,
    macros: {
      calories: 86,
      protein: 1.6,
      carbs: 20,
      fat: 0.1,
      showCalories: true,
      showProtein: true,
      showCarbs: true,
      showFat: true
    },
    is_default: true,
    user_id: null
  },
  {
    id: '5',
    name: 'Greek Yogurt',
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
    },
    is_default: true,
    user_id: null
  }
];

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(sampleIngredients);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Return ingredients without fetching from database
  const addIngredient = async (newIngredient: Omit<Ingredient, 'id' | 'is_default' | 'user_id'>) => {
    try {
      const id = String(Math.floor(Math.random() * 1000) + 100);
      const ingredient: Ingredient = {
        ...newIngredient,
        id,
        is_default: false,
        user_id: 'anonymous'
      };
      
      setIngredients(prev => [...prev, ingredient]);
      return id;
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
    try {
      setIngredients(prev => 
        prev.map(ing => 
          ing.id === id ? { ...ing, ...updatedIngredient } : ing
        )
      );
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
    try {
      setIngredients(prev => prev.filter(ing => ing.id !== id));
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

  return {
    ingredients,
    loading,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    refreshIngredients: () => {}
  };
};
