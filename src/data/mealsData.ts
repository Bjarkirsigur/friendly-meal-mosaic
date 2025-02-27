
import { Meal } from "../types/meals";

const defaultVisibility = {
  showCalories: true,
  showProtein: true,
  showCarbs: true,
  showFat: true,
};

export const MEALS: Record<string, Meal[]> = {
  Breakfast: [
    {
      meal: "Oatmeal with fruits",
      ingredients: [
        { name: "Rolled oats", grams: 50, macros: { calories: 187, protein: 6.5, carbs: 33.8, fat: 3.8, ...defaultVisibility } },
        { name: "Mixed berries", grams: 100, macros: { calories: 43, protein: 0.7, carbs: 9.7, fat: 0.4, ...defaultVisibility } },
        { name: "Banana", grams: 100, macros: { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, ...defaultVisibility } },
        { name: "Honey", grams: 15, macros: { calories: 45, protein: 0, carbs: 12.4, fat: 0, ...defaultVisibility } },
        { name: "Almond milk", grams: 240, macros: { calories: 29, protein: 1.1, carbs: 1.4, fat: 2.1, ...defaultVisibility } },
        { name: "Chia seeds", grams: 10, macros: { calories: 49, protein: 1.7, carbs: 4.1, fat: 3.1, ...defaultVisibility } }
      ],
      macros: { calories: 442, protein: 11.1, carbs: 84.2, fat: 9.7, ...defaultVisibility },
      recipe: "1. In a medium saucepan, bring almond milk to a gentle boil\n2. Add rolled oats and reduce heat to low\n3. Simmer for 5-7 minutes, stirring occasionally\n4. Add chia seeds halfway through cooking\n5. Remove from heat and let stand for 2 minutes\n6. Top with mixed berries and sliced banana\n7. Drizzle with honey\n8. Serve warm and enjoy"
    },
    {
      meal: "Greek yogurt parfait",
      ingredients: [
        { name: "Greek yogurt (2% fat)", grams: 170, macros: { calories: 150, protein: 17, carbs: 8, fat: 4, ...defaultVisibility } },
        { name: "Granola", grams: 45, macros: { calories: 180, protein: 4.5, carbs: 30, fat: 6, ...defaultVisibility } },
        { name: "Mixed berries", grams: 100, macros: { calories: 43, protein: 0.7, carbs: 9.7, fat: 0.4, ...defaultVisibility } },
        { name: "Honey", grams: 15, macros: { calories: 45, protein: 0, carbs: 12.4, fat: 0, ...defaultVisibility } },
        { name: "Chia seeds", grams: 10, macros: { calories: 49, protein: 1.7, carbs: 4.1, fat: 3.1, ...defaultVisibility } }
      ],
      macros: { calories: 467, protein: 23.9, carbs: 64.2, fat: 13.5, ...defaultVisibility },
      recipe: "1. In a serving glass or bowl, spoon half of the Greek yogurt\n2. Add a layer of mixed berries\n3. Sprinkle half of the granola and chia seeds\n4. Repeat layers with remaining yogurt, berries, and granola\n5. Drizzle with honey\n6. Serve immediately to maintain granola crunch"
    },
    {
      meal: "Protein pancakes",
      ingredients: [
        { name: "Protein powder (whey)", grams: 30, macros: { calories: 120, protein: 24, carbs: 3, fat: 2, ...defaultVisibility } },
        { name: "Banana", grams: 100, macros: { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, ...defaultVisibility } },
        { name: "Egg whites", grams: 120, macros: { calories: 63, protein: 13.2, carbs: 0.8, fat: 0.2, ...defaultVisibility } },
        { name: "Oat flour", grams: 30, macros: { calories: 112, protein: 4, carbs: 20, fat: 2.4, ...defaultVisibility } },
        { name: "Maple syrup", grams: 15, macros: { calories: 45, protein: 0, carbs: 12, fat: 0, ...defaultVisibility } }
      ],
      macros: { calories: 429, protein: 42.3, carbs: 58.6, fat: 4.9, ...defaultVisibility },
      recipe: "1. In a blender, combine protein powder, mashed banana, egg whites, and oat flour\n2. Blend until smooth and let rest for 5 minutes\n3. Heat a non-stick pan over medium heat\n4. Pour ¼ cup portions of batter into the pan\n5. Cook until bubbles form on surface (about 2-3 minutes)\n6. Flip and cook other side for 1-2 minutes\n7. Serve warm with maple syrup"
    }
  ],
  Lunch: [
    {
      meal: "Grilled chicken quinoa bowl",
      ingredients: [
        { name: "Chicken breast", grams: 150, macros: { calories: 248, protein: 46.5, carbs: 0, fat: 5.4, ...defaultVisibility } },
        { name: "Quinoa (cooked)", grams: 150, macros: { calories: 185, protein: 6.8, carbs: 34.5, fat: 2.7, ...defaultVisibility } },
        { name: "Avocado", grams: 50, macros: { calories: 80, protein: 1, carbs: 4.3, fat: 7.3, ...defaultVisibility } },
        { name: "Cherry tomatoes", grams: 100, macros: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, ...defaultVisibility } },
        { name: "Cucumber", grams: 100, macros: { calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, ...defaultVisibility } },
        { name: "Olive oil", grams: 15, macros: { calories: 120, protein: 0, carbs: 0, fat: 14, ...defaultVisibility } },
        { name: "Lemon juice", grams: 15, macros: { calories: 3, protein: 0.1, carbs: 0.9, fat: 0, ...defaultVisibility } }
      ],
      macros: { calories: 669, protein: 56, carbs: 47.2, fat: 29.7, ...defaultVisibility },
      recipe: "1. Season chicken breast with salt, pepper, and herbs\n2. Grill chicken for 6-7 minutes per side until done\n3. Cook quinoa according to package instructions\n4. Slice cucumber and halve cherry tomatoes\n5. Cut avocado into chunks\n6. Slice grilled chicken\n7. Combine all ingredients in a bowl\n8. Drizzle with olive oil and lemon juice\n9. Season to taste and serve"
    },
    {
      meal: "Tuna salad wrap",
      ingredients: [
        { name: "Canned tuna (in water)", grams: 140, macros: { calories: 147, protein: 32.6, carbs: 0, fat: 1.4, ...defaultVisibility } },
        { name: "Whole wheat wrap", grams: 60, macros: { calories: 180, protein: 6, carbs: 36, fat: 3, ...defaultVisibility } },
        { name: "Greek yogurt", grams: 30, macros: { calories: 26, protein: 3, carbs: 1.4, fat: 0.7, ...defaultVisibility } },
        { name: "Mixed greens", grams: 50, macros: { calories: 8, protein: 0.8, carbs: 1.4, fat: 0.1, ...defaultVisibility } },
        { name: "Red onion", grams: 30, macros: { calories: 12, protein: 0.4, carbs: 2.8, fat: 0, ...defaultVisibility } },
        { name: "Celery", grams: 30, macros: { calories: 5, protein: 0.2, carbs: 1, fat: 0.1, ...defaultVisibility } },
        { name: "Dijon mustard", grams: 10, macros: { calories: 15, protein: 1, carbs: 1.3, fat: 0.9, ...defaultVisibility } }
      ],
      macros: { calories: 393, protein: 44, carbs: 43.9, fat: 6.2, ...defaultVisibility },
      recipe: "1. Drain tuna well\n2. In a bowl, mix tuna with Greek yogurt and Dijon mustard\n3. Finely dice red onion and celery\n4. Add diced vegetables to tuna mixture\n5. Season with salt and pepper\n6. Warm wrap slightly to make it more pliable\n7. Layer mixed greens on wrap\n8. Add tuna mixture\n9. Roll wrap tightly, tucking in sides\n10. Cut diagonally and serve"
    }
  ],
  Dinner: [
    {
      meal: "Baked salmon with roasted vegetables",
      ingredients: [
        { name: "Salmon fillet", grams: 170, macros: { calories: 354, protein: 41.6, carbs: 0, fat: 20.4, ...defaultVisibility } },
        { name: "Sweet potato", grams: 150, macros: { calories: 130, protein: 2.4, carbs: 30.3, fat: 0.1, ...defaultVisibility } },
        { name: "Broccoli", grams: 150, macros: { calories: 51, protein: 4.2, carbs: 10.5, fat: 0.6, ...defaultVisibility } },
        { name: "Olive oil", grams: 15, macros: { calories: 120, protein: 0, carbs: 0, fat: 14, ...defaultVisibility } },
        { name: "Lemon", grams: 30, macros: { calories: 8, protein: 0.1, carbs: 2.5, fat: 0.1, ...defaultVisibility } },
        { name: "Garlic", grams: 9, macros: { calories: 13, protein: 0.6, carbs: 3, fat: 0, ...defaultVisibility } }
      ],
      macros: { calories: 676, protein: 48.9, carbs: 46.3, fat: 35.2, ...defaultVisibility },
      recipe: "1. Preheat oven to 400°F (200°C)\n2. Cut sweet potato into 1-inch cubes\n3. Toss sweet potato and broccoli with half the olive oil\n4. Season vegetables with salt, pepper, and minced garlic\n5. Roast vegetables for 20-25 minutes\n6. Season salmon with salt, pepper, and remaining garlic\n7. Drizzle salmon with remaining olive oil\n8. Add lemon slices on top\n9. Bake salmon for 12-15 minutes until flaky\n10. Serve salmon with roasted vegetables"
    },
    {
      meal: "Turkey stir-fry",
      ingredients: [
        { name: "Ground turkey (93% lean)", grams: 170, macros: { calories: 240, protein: 45, carbs: 0, fat: 7, ...defaultVisibility } },
        { name: "Brown rice (cooked)", grams: 150, macros: { calories: 165, protein: 3.6, carbs: 34.5, fat: 1.2, ...defaultVisibility } },
        { name: "Bell peppers", grams: 150, macros: { calories: 35, protein: 1.1, carbs: 8.4, fat: 0.2, ...defaultVisibility } },
        { name: "Broccoli", grams: 100, macros: { calories: 34, protein: 2.8, carbs: 7, fat: 0.4, ...defaultVisibility } },
        { name: "Carrots", grams: 100, macros: { calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, ...defaultVisibility } },
        { name: "Soy sauce", grams: 15, macros: { calories: 13, protein: 2.1, carbs: 1, fat: 0, ...defaultVisibility } },
        { name: "Sesame oil", grams: 7, macros: { calories: 63, protein: 0, carbs: 0, fat: 7, ...defaultVisibility } }
      ],
      macros: { calories: 591, protein: 55.5, carbs: 60.5, fat: 16, ...defaultVisibility },
      recipe: "1. Cook brown rice according to package instructions\n2. Slice bell peppers and carrots\n3. Cut broccoli into small florets\n4. Heat sesame oil in a large wok or pan\n5. Add ground turkey and cook until browned\n6. Add vegetables and stir-fry for 5-7 minutes\n7. Add soy sauce and stir to combine\n8. Cook until vegetables are tender-crisp\n9. Serve over brown rice"
    }
  ],
  Snacks: [
    {
      meal: "Protein smoothie",
      ingredients: [
        { name: "Whey protein powder", grams: 30, macros: { calories: 120, protein: 24, carbs: 3, fat: 2, ...defaultVisibility } },
        { name: "Banana", grams: 100, macros: { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, ...defaultVisibility } },
        { name: "Almond milk", grams: 240, macros: { calories: 29, protein: 1.1, carbs: 1.4, fat: 2.1, ...defaultVisibility } },
        { name: "Spinach", grams: 30, macros: { calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1, ...defaultVisibility } },
        { name: "Peanut butter", grams: 15, macros: { calories: 90, protein: 3.5, carbs: 3.5, fat: 7.5, ...defaultVisibility } }
      ],
      macros: { calories: 335, protein: 30.6, carbs: 31.8, fat: 12, ...defaultVisibility },
      recipe: "1. Add almond milk to blender\n2. Add protein powder, banana, and spinach\n3. Add peanut butter\n4. Blend until smooth (about 1 minute)\n5. Add ice if desired and blend again\n6. Pour into glass and serve immediately"
    },
    {
      meal: "Greek yogurt protein bowl",
      ingredients: [
        { name: "Greek yogurt (0% fat)", grams: 200, macros: { calories: 130, protein: 23, carbs: 9, fat: 0, ...defaultVisibility } },
        { name: "Protein powder", grams: 15, macros: { calories: 60, protein: 12, carbs: 1.5, fat: 1, ...defaultVisibility } },
        { name: "Almonds", grams: 15, macros: { calories: 87, protein: 3.2, carbs: 3.2, fat: 7.5, ...defaultVisibility } },
        { name: "Berries", grams: 50, macros: { calories: 22, protein: 0.4, carbs: 4.9, fat: 0.2, ...defaultVisibility } }
      ],
      macros: { calories: 299, protein: 38.6, carbs: 18.6, fat: 8.7, ...defaultVisibility },
      recipe: "1. In a bowl, mix Greek yogurt with protein powder until smooth\n2. Top with mixed berries\n3. Chop almonds and sprinkle on top\n4. Serve immediately"
    }
  ]
};

