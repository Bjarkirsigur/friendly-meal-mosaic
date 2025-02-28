
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Meal, Ingredient, MacroInfo } from '@/types/meals';
import { useToast } from '@/hooks/use-toast';
import { foodLibrary } from '@/utils/foodLibrary';

export const useMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const convertDbToMeal = (
    dbMeal: any, 
    mealIngredients: any[],
    ingredients: any[]
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
          user_id: ingredientDetails.user_id,
          image_url: ingredientDetails.image_url
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
      user_id: dbMeal.user_id,
      image_url: dbMeal.image_url
    };
  };

  const createSampleMeals = (): Meal[] => {
    // Function to create a sample meal with ingredients from the food library
    const createMealFromIngredients = (
      name: string, 
      mealType: string, 
      ingredients: Ingredient[],
      prepTime: number = 20,
      difficulty: string = "Medium",
      recipe: string = ""
    ): Meal => {
      // Calculate total macros
      const totalMacros = ingredients.reduce(
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
        id: `sample-${name.toLowerCase().replace(/\s+/g, '-')}`,
        meal: name,
        ingredients,
        macros: totalMacros,
        prepTime,
        difficulty,
        recipe,
        meal_type: mealType,
        is_default: true,
        user_id: null,
        image_url: null
      };
    };
    
    // Get ingredients from food library
    const chicken = foodLibrary.find(cat => cat.name === "Proteins")?.foods.find(f => f.name === "Chicken Breast");
    const rice = foodLibrary.find(cat => cat.name === "Grains & Carbs")?.foods.find(f => f.name === "Brown Rice");
    const broccoli = foodLibrary.find(cat => cat.name === "Vegetables")?.foods.find(f => f.name === "Broccoli");
    const sweetPotato = foodLibrary.find(cat => cat.name === "Grains & Carbs")?.foods.find(f => f.name === "Sweet Potato");
    const eggs = foodLibrary.find(cat => cat.name === "Proteins")?.foods.find(f => f.name === "Eggs");
    const oats = foodLibrary.find(cat => cat.name === "Grains & Carbs")?.foods.find(f => f.name === "Oats");
    const yogurt = foodLibrary.find(cat => cat.name === "Dairy & Alternatives")?.foods.find(f => f.name === "Greek Yogurt");
    const banana = foodLibrary.find(cat => cat.name === "Fruits")?.foods.find(f => f.name === "Banana");
    const almonds = foodLibrary.find(cat => cat.name === "Nuts & Seeds")?.foods.find(f => f.name === "Almonds");
    const spinach = foodLibrary.find(cat => cat.name === "Vegetables")?.foods.find(f => f.name === "Spinach");
    const salmon = foodLibrary.find(cat => cat.name === "Proteins")?.foods.find(f => f.name === "Salmon");
    const avocado = foodLibrary.find(cat => cat.name === "Fruits")?.foods.find(f => f.name === "Avocado");
    const groundBeef = foodLibrary.find(cat => cat.name === "Proteins")?.foods.find(f => f.name === "Ground Beef (90% lean)");
    const whey = foodLibrary.find(cat => cat.name === "Supplements")?.foods.find(f => f.name === "Whey Protein Powder");
    const berries = foodLibrary.find(cat => cat.name === "Fruits")?.foods.find(f => f.name === "Blueberries");
    const peanutButter = foodLibrary.find(cat => cat.name === "Nuts & Seeds")?.foods.find(f => f.name === "Peanut Butter");
    const cottage = foodLibrary.find(cat => cat.name === "Dairy & Alternatives")?.foods.find(f => f.name === "Cottage Cheese");
    const quinoa = foodLibrary.find(cat => cat.name === "Grains & Carbs")?.foods.find(f => f.name === "Quinoa");
    const tofu = foodLibrary.find(cat => cat.name === "Proteins")?.foods.find(f => f.name === "Tofu");
    const pasta = foodLibrary.find(cat => cat.name === "Grains & Carbs")?.foods.find(f => f.name === "Pasta (cooked)");
    const turkey = foodLibrary.find(cat => cat.name === "Proteins")?.foods.find(f => f.name === "Turkey Breast");
    const bellPepper = foodLibrary.find(cat => cat.name === "Vegetables")?.foods.find(f => f.name === "Bell Pepper");

    // Create an array to hold all meals
    const allMeals: Meal[] = [];

    // Create each meal with unique ID and ingredients
    if (chicken && rice && broccoli) {
      allMeals.push(createMealFromIngredients(
        "Chicken Rice Bowl",
        "Lunch",
        [
          { ...chicken, id: "1", grams: 150, is_default: true, user_id: null },
          { ...rice, id: "2", grams: 200, is_default: true, user_id: null },
          { ...broccoli, id: "3", grams: 100, is_default: true, user_id: null }
        ],
        25,
        "Easy",
        "1. Season chicken with salt and pepper\n2. Grill chicken until fully cooked\n3. Cook rice according to package instructions\n4. Steam broccoli until tender\n5. Combine all ingredients in a bowl"
      ));
    }
    
    if (eggs && oats && banana) {
      allMeals.push(createMealFromIngredients(
        "Oatmeal Breakfast",
        "Breakfast",
        [
          { ...oats, id: "4", grams: 80, is_default: true, user_id: null },
          { ...eggs, id: "5", grams: 50, is_default: true, user_id: null },
          { ...banana, id: "6", grams: 120, is_default: true, user_id: null }
        ],
        10,
        "Easy",
        "1. Cook oats with water or milk\n2. Whisk eggs separately and cook\n3. Slice banana\n4. Combine all ingredients in a bowl"
      ));
    }
    
    if (salmon && sweetPotato && spinach) {
      allMeals.push(createMealFromIngredients(
        "Salmon & Sweet Potato",
        "Dinner",
        [
          { ...salmon, id: "7", grams: 150, is_default: true, user_id: null },
          { ...sweetPotato, id: "8", grams: 200, is_default: true, user_id: null },
          { ...spinach, id: "9", grams: 100, is_default: true, user_id: null }
        ],
        30,
        "Medium",
        "1. Season salmon with herbs and lemon\n2. Bake salmon at 400°F for 15-20 minutes\n3. Roast sweet potato cubes at 425°F for 25 minutes\n4. Sauté spinach with garlic\n5. Serve all together"
      ));
    }
    
    if (yogurt && berries && almonds) {
      allMeals.push(createMealFromIngredients(
        "Greek Yogurt Parfait",
        "Snacks",
        [
          { ...yogurt, id: "10", grams: 200, is_default: true, user_id: null },
          { ...berries, id: "11", grams: 100, is_default: true, user_id: null },
          { ...almonds, id: "12", grams: 30, is_default: true, user_id: null }
        ],
        5,
        "Easy",
        "1. Layer yogurt, berries, and crushed almonds in a bowl\n2. Optional: drizzle with honey"
      ));
    }
    
    if (chicken && avocado && quinoa) {
      allMeals.push(createMealFromIngredients(
        "Chicken Avocado Bowl",
        "Lunch",
        [
          { ...chicken, id: "13", grams: 150, is_default: true, user_id: null },
          { ...avocado, id: "14", grams: 75, is_default: true, user_id: null },
          { ...quinoa, id: "15", grams: 150, is_default: true, user_id: null }
        ],
        20,
        "Medium",
        "1. Cook quinoa according to package instructions\n2. Grill seasoned chicken\n3. Slice avocado\n4. Combine in a bowl\n5. Optional: add lime juice and cilantro"
      ));
    }
    
    if (groundBeef && pasta && spinach) {
      allMeals.push(createMealFromIngredients(
        "Beef Pasta Bowl",
        "Dinner",
        [
          { ...groundBeef, id: "16", grams: 150, is_default: true, user_id: null },
          { ...pasta, id: "17", grams: 200, is_default: true, user_id: null },
          { ...spinach, id: "18", grams: 80, is_default: true, user_id: null }
        ],
        25,
        "Medium",
        "1. Brown ground beef with seasonings\n2. Cook pasta al dente\n3. Add spinach to beef until wilted\n4. Mix pasta with beef and spinach\n5. Optional: add tomato sauce"
      ));
    }
    
    if (whey && banana && peanutButter) {
      allMeals.push(createMealFromIngredients(
        "Protein Smoothie",
        "Snacks",
        [
          { ...whey, id: "19", grams: 30, is_default: true, user_id: null },
          { ...banana, id: "20", grams: 120, is_default: true, user_id: null },
          { ...peanutButter, id: "21", grams: 20, is_default: true, user_id: null }
        ],
        5,
        "Easy",
        "1. Blend all ingredients with water or milk\n2. Add ice for a thicker consistency"
      ));
    }
    
    if (eggs && spinach && cottage) {
      allMeals.push(createMealFromIngredients(
        "Protein Breakfast Bowl",
        "Breakfast",
        [
          { ...eggs, id: "22", grams: 100, is_default: true, user_id: null },
          { ...spinach, id: "23", grams: 50, is_default: true, user_id: null },
          { ...cottage, id: "24", grams: 100, is_default: true, user_id: null }
        ],
        15,
        "Medium",
        "1. Scramble eggs with spinach\n2. Serve with cottage cheese on the side\n3. Season with salt and pepper"
      ));
    }
    
    if (tofu && broccoli && rice) {
      allMeals.push(createMealFromIngredients(
        "Tofu Stir Fry",
        "Dinner",
        [
          { ...tofu, id: "25", grams: 150, is_default: true, user_id: null },
          { ...broccoli, id: "26", grams: 120, is_default: true, user_id: null },
          { ...rice, id: "27", grams: 150, is_default: true, user_id: null }
        ],
        20,
        "Medium",
        "1. Press and cube tofu\n2. Stir fry tofu until golden\n3. Add broccoli and cook until tender\n4. Serve over cooked rice\n5. Add soy sauce or teriyaki sauce"
      ));
    }
    
    if (turkey && bellPepper && quinoa) {
      allMeals.push(createMealFromIngredients(
        "Turkey Quinoa Bowl",
        "Lunch",
        [
          { ...turkey, id: "28", grams: 120, is_default: true, user_id: null },
          { ...bellPepper, id: "29", grams: 100, is_default: true, user_id: null },
          { ...quinoa, id: "30", grams: 150, is_default: true, user_id: null }
        ],
        25,
        "Medium",
        "1. Cook quinoa according to package\n2. Sauté sliced turkey breast\n3. Sauté sliced bell peppers\n4. Combine all ingredients\n5. Season with herbs and spices"
      ));
    }
    
    if (oats && yogurt && berries) {
      allMeals.push(createMealFromIngredients(
        "Overnight Oats",
        "Breakfast",
        [
          { ...oats, id: "31", grams: 80, is_default: true, user_id: null },
          { ...yogurt, id: "32", grams: 120, is_default: true, user_id: null },
          { ...berries, id: "33", grams: 80, is_default: true, user_id: null }
        ],
        5,
        "Easy",
        "1. Mix oats and yogurt\n2. Add a splash of milk if desired\n3. Refrigerate overnight\n4. Top with berries before serving"
      ));
    }
    
    return allMeals;
  };

  const loadMeals = async () => {
    try {
      setLoading(true);
      
      // Check if we should use sample data or fetch from database
      if (!user) {
        // Use sample data
        const sampleMeals = createSampleMeals();
        setMeals(sampleMeals);
        return;
      }
      
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
        const convertedMeals = mealsData.map((dbMeal: any) => 
          convertDbToMeal(dbMeal, mealIngredientsData, ingredientsData)
        );
        
        setMeals(convertedMeals);
      } else {
        // If no data found in database, use sample data
        const sampleMeals = createSampleMeals();
        setMeals(sampleMeals);
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
          is_default: false,
          image_url: newMeal.image_url
        }])
        .select();
      
      if (mealError) throw mealError;
      
      if (!mealData || mealData.length === 0) {
        throw new Error('Failed to create meal');
      }
      
      const createdMeal = mealData[0];
      
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
      if (updatedMeal.image_url) updateData.image_url = updatedMeal.image_url;
      
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
    loadMeals();
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
