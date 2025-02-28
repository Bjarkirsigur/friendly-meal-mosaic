
import { supabase } from "@/integrations/supabase/client";

// Function to update meal images
export const updateMealImages = async () => {
  // High-protein breakfast meal images
  const breakfastImages = {
    'Protein-Packed Oatmeal': 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=2076&auto=format&fit=crop',
    'Greek Yogurt Power Bowl': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1887&auto=format&fit=crop',
    'Egg White & Veggie Scramble': 'https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=1998&auto=format&fit=crop',
    'Protein Smoothie Bowl': 'https://images.unsplash.com/photo-1609951651556-5334e2706de1?q=80&w=1974&auto=format&fit=crop',
    'Cottage Cheese & Fruit Plate': 'https://images.unsplash.com/photo-1601455764235-45d31d401f57?q=80&w=2066&auto=format&fit=crop',
    'Peanut Butter Protein Toast': 'https://images.unsplash.com/photo-1525351159099-81893194469e?q=80&w=2080&auto=format&fit=crop',
    'Tofu Breakfast Scramble': 'https://images.unsplash.com/photo-1648495754619-8c3a027ee0dd?q=80&w=1780&auto=format&fit=crop',
    'Protein Pancakes': 'https://images.unsplash.com/photo-1565299543923-37dd37887442?q=80&w=1962&auto=format&fit=crop',
    'Breakfast Burrito Bowl': 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=2013&auto=format&fit=crop',
    'Chia Protein Pudding': 'https://images.unsplash.com/photo-1559623043-a839f4f6b225?q=80&w=1780&auto=format&fit=crop'
  };

  // High-protein lunch meal images
  const lunchImages = {
    'Grilled Chicken Salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop',
    'Tuna Protein Bowl': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop',
    'Turkey & Avocado Wrap': 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=1974&auto=format&fit=crop',
    'Lentil & Vegetable Soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1771&auto=format&fit=crop',
    'Salmon & Quinoa Bowl': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop',
    'Chickpea & Veggie Salad': 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1887&auto=format&fit=crop',
    'Beef & Broccoli Stir Fry': 'https://images.unsplash.com/photo-1617343267017-e444f8b25b6c?q=80&w=1780&auto=format&fit=crop',
    'Greek Protein Bowl': 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=1964&auto=format&fit=crop',
    'Tofu & Vegetable Stir Fry': 'https://images.unsplash.com/photo-1626711934535-9749ea933793?q=80&w=1780&auto=format&fit=crop',
    'Turkey Chili': 'https://images.unsplash.com/photo-1583266608855-f7e1d9a35e3a?q=80&w=1780&auto=format&fit=crop'
  };

  // High-protein dinner meal images
  const dinnerImages = {
    'Baked Salmon with Asparagus': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop',
    'Grilled Chicken with Sweet Potato': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop',
    'Steak with Roasted Vegetables': 'https://images.unsplash.com/photo-1588685562218-09ff172e7d69?q=80&w=1773&auto=format&fit=crop',
    'Turkey Meatballs with Zucchini Noodles': 'https://images.unsplash.com/photo-1673820512881-8c3090eddd22?q=80&w=1780&auto=format&fit=crop',
    'Shrimp and Veggie Stir Fry': 'https://images.unsplash.com/photo-1626509653291-0d6aead38c5f?q=80&w=2069&auto=format&fit=crop',
    'Baked Chicken Breast with Quinoa': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop',
    'Lentil and Vegetable Curry': 'https://images.unsplash.com/photo-1585937421612-70a008356c36?q=80&w=1936&auto=format&fit=crop',
    'Salmon Patties with Greens': 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?q=80&w=1780&auto=format&fit=crop',
    'Turkey and Bean Stuffed Peppers': 'https://images.unsplash.com/photo-1608734265656-f035d3e7bcbf?q=80&w=1887&auto=format&fit=crop',
    'Tofu and Vegetable Curry': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1974&auto=format&fit=crop'
  };

  // Combine all meal images
  const allMealImages = {
    ...breakfastImages,
    ...lunchImages,
    ...dinnerImages
  };

  // Update each meal with its image URL
  for (const [mealName, imageUrl] of Object.entries(allMealImages)) {
    try {
      const { error } = await supabase
        .from('meals')
        .update({ image_url: imageUrl })
        .eq('name', mealName);
      
      if (error) {
        console.error(`Error updating image for ${mealName}:`, error);
      } else {
        console.log(`Updated image for ${mealName}`);
      }
    } catch (err) {
      console.error(`Failed to update image for ${mealName}:`, err);
    }
  }
};

// Function to add remaining meal ingredients
export const addRemainingMealIngredients = async () => {
  // Define remaining meal ingredients that weren't added in SQL
  const remainingMealIngredients = [
    // More ingredients for existing breakfast meals
    { mealName: 'Protein Smoothie Bowl', ingredientName: 'Whey Protein Powder', grams: 30 },
    { mealName: 'Protein Smoothie Bowl', ingredientName: 'Banana', grams: 100 },
    { mealName: 'Protein Smoothie Bowl', ingredientName: 'Berries Mix', grams: 100 },
    { mealName: 'Protein Smoothie Bowl', ingredientName: 'Almonds', grams: 10 },
    
    { mealName: 'Cottage Cheese & Fruit Plate', ingredientName: 'Cottage Cheese', grams: 200 },
    { mealName: 'Cottage Cheese & Fruit Plate', ingredientName: 'Berries Mix', grams: 100 },
    { mealName: 'Cottage Cheese & Fruit Plate', ingredientName: 'Banana', grams: 100 },
    { mealName: 'Cottage Cheese & Fruit Plate', ingredientName: 'Hemp Seeds', grams: 15 },
    
    { mealName: 'Peanut Butter Protein Toast', ingredientName: 'Peanut Butter', grams: 30 },
    { mealName: 'Peanut Butter Protein Toast', ingredientName: 'Banana', grams: 100 },
    { mealName: 'Peanut Butter Protein Toast', ingredientName: 'Hemp Seeds', grams: 15 },
    
    { mealName: 'Tofu Breakfast Scramble', ingredientName: 'Tofu', grams: 150 },
    { mealName: 'Tofu Breakfast Scramble', ingredientName: 'Spinach', grams: 50 },
    
    { mealName: 'Protein Pancakes', ingredientName: 'Oats', grams: 50 },
    { mealName: 'Protein Pancakes', ingredientName: 'Whey Protein Powder', grams: 30 },
    { mealName: 'Protein Pancakes', ingredientName: 'Egg Whites', grams: 100 },
    { mealName: 'Protein Pancakes', ingredientName: 'Banana', grams: 100 },
    { mealName: 'Protein Pancakes', ingredientName: 'Berries Mix', grams: 50 },
    
    { mealName: 'Breakfast Burrito Bowl', ingredientName: 'Egg', grams: 100 },
    { mealName: 'Breakfast Burrito Bowl', ingredientName: 'Black Beans', grams: 100 },
    { mealName: 'Breakfast Burrito Bowl', ingredientName: 'Avocado', grams: 50 },
    
    { mealName: 'Chia Protein Pudding', ingredientName: 'Chia Seeds', grams: 30 },
    { mealName: 'Chia Protein Pudding', ingredientName: 'Whey Protein Powder', grams: 15 },
    { mealName: 'Chia Protein Pudding', ingredientName: 'Berries Mix', grams: 50 },
    { mealName: 'Chia Protein Pudding', ingredientName: 'Almonds', grams: 15 },
    
    // More lunch meal ingredients
    { mealName: 'Tuna Protein Bowl', ingredientName: 'Tuna in Water', grams: 100 },
    { mealName: 'Tuna Protein Bowl', ingredientName: 'Greek Yogurt', grams: 50 },
    { mealName: 'Tuna Protein Bowl', ingredientName: 'Quinoa', grams: 100 },
    { mealName: 'Tuna Protein Bowl', ingredientName: 'Avocado', grams: 50 },
    
    { mealName: 'Turkey & Avocado Wrap', ingredientName: 'Turkey Breast', grams: 100 },
    { mealName: 'Turkey & Avocado Wrap', ingredientName: 'Avocado', grams: 50 },
    { mealName: 'Turkey & Avocado Wrap', ingredientName: 'Spinach', grams: 30 },
    
    { mealName: 'Lentil & Vegetable Soup', ingredientName: 'Lentils', grams: 150 },
    { mealName: 'Lentil & Vegetable Soup', ingredientName: 'Broccoli', grams: 100 },
    { mealName: 'Lentil & Vegetable Soup', ingredientName: 'Spinach', grams: 50 },
    
    { mealName: 'Salmon & Quinoa Bowl', ingredientName: 'Salmon', grams: 150 },
    { mealName: 'Salmon & Quinoa Bowl', ingredientName: 'Quinoa', grams: 100 },
    { mealName: 'Salmon & Quinoa Bowl', ingredientName: 'Broccoli', grams: 100 },
    
    { mealName: 'Chickpea & Veggie Salad', ingredientName: 'Black Beans', grams: 150 },
    { mealName: 'Chickpea & Veggie Salad', ingredientName: 'Olive Oil', grams: 15 },
    { mealName: 'Chickpea & Veggie Salad', ingredientName: 'Spinach', grams: 50 },
    
    { mealName: 'Beef & Broccoli Stir Fry', ingredientName: 'Lean Beef', grams: 150 },
    { mealName: 'Beef & Broccoli Stir Fry', ingredientName: 'Broccoli', grams: 150 },
    { mealName: 'Beef & Broccoli Stir Fry', ingredientName: 'Brown Rice', grams: 100 },
    
    { mealName: 'Greek Protein Bowl', ingredientName: 'Chicken Breast', grams: 150 },
    { mealName: 'Greek Protein Bowl', ingredientName: 'Greek Yogurt', grams: 50 },
    
    { mealName: 'Tofu & Vegetable Stir Fry', ingredientName: 'Tofu', grams: 150 },
    { mealName: 'Tofu & Vegetable Stir Fry', ingredientName: 'Broccoli', grams: 100 },
    { mealName: 'Tofu & Vegetable Stir Fry', ingredientName: 'Brown Rice', grams: 100 },
    
    { mealName: 'Turkey Chili', ingredientName: 'Turkey Breast', grams: 150 },
    { mealName: 'Turkey Chili', ingredientName: 'Black Beans', grams: 100 },
    
    // Dinner meal ingredients
    { mealName: 'Baked Salmon with Asparagus', ingredientName: 'Salmon', grams: 150 },
    { mealName: 'Baked Salmon with Asparagus', ingredientName: 'Broccoli', grams: 150 },
    { mealName: 'Baked Salmon with Asparagus', ingredientName: 'Olive Oil', grams: 10 },
    
    { mealName: 'Grilled Chicken with Sweet Potato', ingredientName: 'Chicken Breast', grams: 150 },
    { mealName: 'Grilled Chicken with Sweet Potato', ingredientName: 'Sweet Potato', grams: 150 },
    { mealName: 'Grilled Chicken with Sweet Potato', ingredientName: 'Broccoli', grams: 100 },
    
    { mealName: 'Steak with Roasted Vegetables', ingredientName: 'Lean Beef', grams: 150 },
    { mealName: 'Steak with Roasted Vegetables', ingredientName: 'Sweet Potato', grams: 100 },
    { mealName: 'Steak with Roasted Vegetables', ingredientName: 'Broccoli', grams: 100 },
    { mealName: 'Steak with Roasted Vegetables', ingredientName: 'Olive Oil', grams: 10 },
    
    { mealName: 'Turkey Meatballs with Zucchini Noodles', ingredientName: 'Turkey Breast', grams: 150 },
    { mealName: 'Turkey Meatballs with Zucchini Noodles', ingredientName: 'Egg', grams: 50 },
    
    { mealName: 'Shrimp and Veggie Stir Fry', ingredientName: 'Tuna in Water', grams: 150 },
    { mealName: 'Shrimp and Veggie Stir Fry', ingredientName: 'Broccoli', grams: 100 },
    { mealName: 'Shrimp and Veggie Stir Fry', ingredientName: 'Brown Rice', grams: 100 },
    
    { mealName: 'Baked Chicken Breast with Quinoa', ingredientName: 'Chicken Breast', grams: 150 },
    { mealName: 'Baked Chicken Breast with Quinoa', ingredientName: 'Quinoa', grams: 100 },
    { mealName: 'Baked Chicken Breast with Quinoa', ingredientName: 'Broccoli', grams: 100 },
    { mealName: 'Baked Chicken Breast with Quinoa', ingredientName: 'Olive Oil', grams: 10 },
    
    { mealName: 'Lentil and Vegetable Curry', ingredientName: 'Lentils', grams: 150 },
    { mealName: 'Lentil and Vegetable Curry', ingredientName: 'Coconut Milk', grams: 100 },
    { mealName: 'Lentil and Vegetable Curry', ingredientName: 'Spinach', grams: 50 },
    { mealName: 'Lentil and Vegetable Curry', ingredientName: 'Brown Rice', grams: 100 },
    
    { mealName: 'Salmon Patties with Greens', ingredientName: 'Salmon', grams: 150 },
    { mealName: 'Salmon Patties with Greens', ingredientName: 'Egg', grams: 50 },
    { mealName: 'Salmon Patties with Greens', ingredientName: 'Spinach', grams: 100 },
    
    { mealName: 'Turkey and Bean Stuffed Peppers', ingredientName: 'Turkey Breast', grams: 150 },
    { mealName: 'Turkey and Bean Stuffed Peppers', ingredientName: 'Black Beans', grams: 100 },
    
    { mealName: 'Tofu and Vegetable Curry', ingredientName: 'Tofu', grams: 150 },
    { mealName: 'Tofu and Vegetable Curry', ingredientName: 'Coconut Milk', grams: 100 },
    { mealName: 'Tofu and Vegetable Curry', ingredientName: 'Spinach', grams: 50 },
    { mealName: 'Tofu and Vegetable Curry', ingredientName: 'Brown Rice', grams: 100 }
  ];

  // Get all meal and ingredient records for reference
  const { data: mealsData, error: mealsError } = await supabase
    .from('meals')
    .select('id, name');
  
  if (mealsError) {
    console.error('Error fetching meals:', mealsError);
    return;
  }
  
  const { data: ingredientsData, error: ingredientsError } = await supabase
    .from('ingredients')
    .select('id, name');
  
  if (ingredientsError) {
    console.error('Error fetching ingredients:', ingredientsError);
    return;
  }
  
  // Build lookup tables
  const mealLookup = mealsData.reduce((acc, meal) => {
    acc[meal.name] = meal.id;
    return acc;
  }, {});
  
  const ingredientLookup = ingredientsData.reduce((acc, ingredient) => {
    acc[ingredient.name] = ingredient.id;
    return acc;
  }, {});
  
  // Add meal ingredients
  for (const { mealName, ingredientName, grams } of remainingMealIngredients) {
    const mealId = mealLookup[mealName];
    const ingredientId = ingredientLookup[ingredientName];
    
    if (!mealId) {
      console.error(`Meal not found: ${mealName}`);
      continue;
    }
    
    if (!ingredientId) {
      console.error(`Ingredient not found: ${ingredientName}`);
      continue;
    }
    
    try {
      // Check if this meal-ingredient combination already exists
      const { data: existingData, error: existingError } = await supabase
        .from('meal_ingredients')
        .select('id')
        .eq('meal_id', mealId)
        .eq('ingredient_id', ingredientId)
        .maybeSingle();
        
      if (existingError) {
        console.error(`Error checking existing meal ingredient: ${mealName} - ${ingredientName}`, existingError);
        continue;
      }
      
      // Skip if already exists
      if (existingData) {
        console.log(`Meal ingredient already exists: ${mealName} - ${ingredientName}`);
        continue;
      }
      
      // Add the meal ingredient
      const { error } = await supabase
        .from('meal_ingredients')
        .insert({
          meal_id: mealId,
          ingredient_id: ingredientId,
          grams: grams
        });
      
      if (error) {
        console.error(`Error adding meal ingredient: ${mealName} - ${ingredientName}`, error);
      } else {
        console.log(`Added meal ingredient: ${mealName} - ${ingredientName}`);
      }
    } catch (err) {
      console.error(`Failed to add meal ingredient: ${mealName} - ${ingredientName}`, err);
    }
  }
};

// Main function to set up all meal data
export const setupMealData = async () => {
  console.log('Starting meal setup...');
  
  try {
    console.log('Updating meal images...');
    await updateMealImages();
    
    console.log('Adding remaining meal ingredients...');
    await addRemainingMealIngredients();
    
    console.log('Meal setup complete!');
    return true;
  } catch (error) {
    console.error('Error setting up meal data:', error);
    return false;
  }
};
