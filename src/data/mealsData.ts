
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
        { name: "Rolled oats", grams: 40, macros: { calories: 150, protein: 5, carbs: 27, fat: 3, ...defaultVisibility } },
        { name: "Mixed berries", grams: 100, macros: { calories: 45, protein: 1, carbs: 11, fat: 0, ...defaultVisibility } },
        { name: "Banana", grams: 120, macros: { calories: 105, protein: 1, carbs: 27, fat: 0, ...defaultVisibility } },
        { name: "Honey", grams: 15, macros: { calories: 30, protein: 0, carbs: 8, fat: 0, ...defaultVisibility } },
        { name: "Almond milk", grams: 240, macros: { calories: 20, protein: 1, carbs: 1, fat: 1.5, ...defaultVisibility } }
      ],
      macros: { calories: 350, protein: 12, carbs: 60, fat: 8, ...defaultVisibility },
      recipe: "1. In a medium saucepan, bring almond milk to a gentle boil\n2. Add rolled oats and reduce heat to low\n3. Simmer for 5-7 minutes, stirring occasionally\n4. Remove from heat and let stand for 2 minutes\n5. Top with mixed berries and sliced banana\n6. Drizzle with honey\n7. Serve warm and enjoy"
    },
    {
      meal: "Greek yogurt parfait",
      ingredients: [
        { name: "Greek yogurt", grams: 170, macros: { calories: 130, protein: 13, carbs: 5, fat: 4, ...defaultVisibility } },
        { name: "Granola", grams: 30, macros: { calories: 120, protein: 3, carbs: 20, fat: 4, ...defaultVisibility } },
        { name: "Mixed berries", grams: 100, macros: { calories: 45, protein: 1, carbs: 11, fat: 0, ...defaultVisibility } },
        { name: "Honey", grams: 15, macros: { calories: 30, protein: 0, carbs: 8, fat: 0, ...defaultVisibility } },
        { name: "Chia seeds", grams: 12, macros: { calories: 60, protein: 3, carbs: 5, fat: 4, ...defaultVisibility } }
      ],
      macros: { calories: 300, protein: 15, carbs: 45, fat: 10, ...defaultVisibility },
      recipe: "1. In a serving glass or bowl, spoon half of the Greek yogurt\n2. Add a layer of mixed berries\n3. Sprinkle half of the granola and chia seeds\n4. Repeat layers with remaining yogurt, berries, and granola\n5. Drizzle with honey\n6. Serve immediately to maintain granola crunch"
    },
    {
      meal: "Scrambled eggs with toast",
      ingredients: [
        { name: "Eggs", grams: 100, macros: { calories: 140, protein: 12, carbs: 0, fat: 10, ...defaultVisibility } },
        { name: "Whole grain bread", grams: 28, macros: { calories: 80, protein: 4, carbs: 15, fat: 1, ...defaultVisibility } },
        { name: "Butter", grams: 14, macros: { calories: 102, protein: 0, carbs: 0, fat: 12, ...defaultVisibility } },
        { name: "Salt", grams: 1, macros: { calories: 0, protein: 0, carbs: 0, fat: 0, ...defaultVisibility } },
        { name: "Black pepper", grams: 1, macros: { calories: 0, protein: 0, carbs: 0, fat: 0, ...defaultVisibility } },
        { name: "Milk", grams: 30, macros: { calories: 30, protein: 1, carbs: 2, fat: 1, ...defaultVisibility } }
      ],
      macros: { calories: 400, protein: 20, carbs: 35, fat: 15, ...defaultVisibility },
      recipe: "1. In a bowl, whisk eggs with milk, salt, and pepper until well combined\n2. Heat a non-stick pan over medium heat and add half the butter\n3. Pour egg mixture into pan\n4. Using a spatula, gently push the eggs from the edges to the center as they set\n5. Cook until eggs are just set but still slightly creamy\n6. Meanwhile, toast the bread and spread with remaining butter\n7. Serve scrambled eggs with buttered toast"
    }
  ],
  Lunch: [
    {
      meal: "Chicken salad",
      ingredients: [
        { name: "Grilled chicken breast", grams: 150, macros: { calories: 165, protein: 31, carbs: 0, fat: 3.6, ...defaultVisibility } },
        { name: "Mixed greens", grams: 50, macros: { calories: 10, protein: 1, carbs: 2, fat: 0, ...defaultVisibility } },
        { name: "Cherry tomatoes", grams: 100, macros: { calories: 27, protein: 1, carbs: 6, fat: 0, ...defaultVisibility } },
        { name: "Cucumber", grams: 100, macros: { calories: 8, protein: 0.3, carbs: 2, fat: 0, ...defaultVisibility } },
        { name: "Olive oil", grams: 13, macros: { calories: 120, protein: 0, carbs: 0, fat: 14, ...defaultVisibility } },
        { name: "Balsamic vinegar", grams: 15, macros: { calories: 14, protein: 0, carbs: 3, fat: 0, ...defaultVisibility } }
      ],
      macros: { calories: 450, protein: 35, carbs: 25, fat: 22, ...defaultVisibility },
      recipe: "1. Season chicken breast with salt and pepper\n2. Grill chicken for 6-8 minutes per side until cooked through\n3. Let chicken rest for 5 minutes, then slice\n4. In a large bowl, combine mixed greens, halved cherry tomatoes, and sliced cucumber\n5. Whisk together olive oil and balsamic vinegar\n6. Toss vegetables with dressing\n7. Top with sliced chicken\n8. Season to taste and serve immediately"
    },
    {
      meal: "Quinoa bowl",
      ingredients: [
        { name: "Quinoa", grams: 60, macros: { calories: 222, protein: 8, carbs: 39, fat: 4, ...defaultVisibility } },
        { name: "Black beans", grams: 130, macros: { calories: 132, protein: 8, carbs: 24, fat: 0.5, ...defaultVisibility } },
        { name: "Corn", grams: 80, macros: { calories: 85, protein: 3, carbs: 19, fat: 1, ...defaultVisibility } },
        { name: "Avocado", grams: 50, macros: { calories: 120, protein: 1.5, carbs: 6, fat: 11, ...defaultVisibility } },
        { name: "Red pepper", grams: 100, macros: { calories: 30, protein: 1, carbs: 6, fat: 0, ...defaultVisibility } },
        { name: "Lime juice", grams: 15, macros: { calories: 4, protein: 0, carbs: 1, fat: 0, ...defaultVisibility } },
        { name: "Cilantro", grams: 5, macros: { calories: 1, protein: 0.1, carbs: 0.2, fat: 0, ...defaultVisibility } }
      ],
      macros: { calories: 480, protein: 25, carbs: 65, fat: 18, ...defaultVisibility },
      recipe: "1. Rinse quinoa thoroughly\n2. Cook quinoa in 2 cups water until fluffy and water is absorbed (about 15-20 minutes)\n3. Drain and rinse black beans\n4. Dice red pepper and avocado\n5. In a large bowl, combine cooked quinoa, black beans, corn, and diced red pepper\n6. Top with diced avocado\n7. Squeeze lime juice over the bowl\n8. Garnish with fresh cilantro\n9. Season with salt and pepper to taste"
    },
    {
      meal: "Turkey sandwich",
      ingredients: [
        { name: "Whole grain bread", grams: 56, macros: { calories: 160, protein: 8, carbs: 30, fat: 2, ...defaultVisibility } },
        { name: "Turkey breast", grams: 100, macros: { calories: 125, protein: 26, carbs: 0, fat: 2, ...defaultVisibility } },
        { name: "Lettuce", grams: 30, macros: { calories: 5, protein: 0.5, carbs: 1, fat: 0, ...defaultVisibility } },
        { name: "Tomato", grams: 50, macros: { calories: 22, protein: 1, carbs: 5, fat: 0, ...defaultVisibility } },
        { name: "Mayo", grams: 14, macros: { calories: 94, protein: 0, carbs: 0, fat: 10, ...defaultVisibility } },
        { name: "Mustard", grams: 10, macros: { calories: 15, protein: 1, carbs: 1, fat: 1, ...defaultVisibility } }
      ],
      macros: { calories: 420, protein: 28, carbs: 48, fat: 16, ...defaultVisibility },
      recipe: "1. Toast the whole grain bread slices until golden brown\n2. Spread mayo on one slice and mustard on the other\n3. Layer lettuce on the bottom slice\n4. Add sliced turkey breast\n5. Top with sliced tomato\n6. Season with salt and pepper to taste\n7. Close sandwich with the second slice of bread\n8. Cut diagonally and serve"
    }
  ],
  Dinner: [
    {
      meal: "Salmon with rice",
      ingredients: [
        { name: "Salmon fillet", grams: 180, macros: { calories: 367, protein: 34, carbs: 0, fat: 22, ...defaultVisibility } },
        { name: "Brown rice", grams: 60, macros: { calories: 216, protein: 5, carbs: 45, fat: 2, ...defaultVisibility } },
        { name: "Broccoli", grams: 150, macros: { calories: 55, protein: 4, carbs: 11, fat: 0.6, ...defaultVisibility } },
        { name: "Lemon", grams: 30, macros: { calories: 12, protein: 0.2, carbs: 4, fat: 0, ...defaultVisibility } },
        { name: "Olive oil", grams: 13, macros: { calories: 120, protein: 0, carbs: 0, fat: 14, ...defaultVisibility } },
        { name: "Garlic", grams: 5, macros: { calories: 13, protein: 0.6, carbs: 3, fat: 0, ...defaultVisibility } }
      ],
      macros: { calories: 550, protein: 40, carbs: 45, fat: 25, ...defaultVisibility },
      recipe: "1. Preheat oven to 400°F (200°C)\n2. Cook brown rice according to package instructions\n3. Season salmon with salt, pepper, and minced garlic\n4. Place salmon on a baking sheet and drizzle with olive oil\n5. Cut lemon into thin slices and place on top of salmon\n6. Bake salmon for 12-15 minutes until cooked through\n7. Meanwhile, steam broccoli until tender-crisp\n8. Serve salmon over rice with broccoli on the side"
    },
    {
      meal: "Grilled chicken with vegetables",
      ingredients: [
        { name: "Chicken breast", grams: 150, macros: { calories: 165, protein: 31, carbs: 0, fat: 3.6, ...defaultVisibility } },
        { name: "Sweet potato", grams: 150, macros: { calories: 103, protein: 2, carbs: 24, fat: 0, ...defaultVisibility } },
        { name: "Brussels sprouts", grams: 100, macros: { calories: 38, protein: 3, carbs: 8, fat: 0, ...defaultVisibility } },
        { name: "Olive oil", grams: 13, macros: { calories: 120, protein: 0, carbs: 0, fat: 14, ...defaultVisibility } },
        { name: "Herbs", grams: 2, macros: { calories: 5, protein: 0.3, carbs: 1, fat: 0, ...defaultVisibility } },
        { name: "Garlic", grams: 5, macros: { calories: 13, protein: 0.6, carbs: 3, fat: 0, ...defaultVisibility } }
      ],
      macros: { calories: 480, protein: 45, carbs: 30, fat: 20, ...defaultVisibility },
      recipe: "1. Preheat oven to 425°F (220°C)\n2. Cut sweet potato into 1-inch cubes\n3. Trim and halve Brussels sprouts\n4. Toss vegetables with olive oil, minced garlic, and herbs\n5. Spread vegetables on a baking sheet and roast for 20-25 minutes\n6. Meanwhile, season chicken breast with salt, pepper, and herbs\n7. Grill chicken for 6-8 minutes per side until cooked through\n8. Let chicken rest for 5 minutes before slicing\n9. Serve with roasted vegetables"
    },
    {
      meal: "Pasta with meatballs",
      ingredients: [
        { name: "Whole grain pasta", grams: 85, macros: { calories: 200, protein: 7, carbs: 41, fat: 1.3, ...defaultVisibility } },
        { name: "Ground beef", grams: 120, macros: { calories: 250, protein: 26, carbs: 0, fat: 15, ...defaultVisibility } },
        { name: "Tomato sauce", grams: 120, macros: { calories: 70, protein: 2, carbs: 13, fat: 1, ...defaultVisibility } },
        { name: "Onion", grams: 100, macros: { calories: 44, protein: 1.2, carbs: 10, fat: 0.1, ...defaultVisibility } },
        { name: "Garlic", grams: 5, macros: { calories: 13, protein: 0.6, carbs: 3, fat: 0, ...defaultVisibility } },
        { name: "Parmesan cheese", grams: 30, macros: { calories: 110, protein: 10, carbs: 1, fat: 7, ...defaultVisibility } }
      ],
      macros: { calories: 600, protein: 35, carbs: 70, fat: 22, ...defaultVisibility },
      recipe: "1. Mix ground beef with finely diced onion, minced garlic, salt, and pepper\n2. Form mixture into 1-inch meatballs\n3. Heat olive oil in a large pan and brown meatballs on all sides\n4. Add tomato sauce and simmer for 15-20 minutes\n5. Meanwhile, cook pasta according to package instructions\n6. Drain pasta and return to pot\n7. Add meatballs and sauce to pasta\n8. Serve hot with grated Parmesan cheese"
    }
  ],
  Snacks: [
    {
      meal: "Greek yogurt",
      ingredients: [
        { name: "Greek yogurt", grams: 170, macros: { calories: 130, protein: 13, carbs: 5, fat: 4, ...defaultVisibility } },
        { name: "Honey", grams: 15, macros: { calories: 30, protein: 0, carbs: 8, fat: 0, ...defaultVisibility } },
        { name: "Almonds", grams: 30, macros: { calories: 164, protein: 6, carbs: 6, fat: 14, ...defaultVisibility } }
      ],
      macros: { calories: 150, protein: 15, carbs: 10, fat: 5, ...defaultVisibility },
      recipe: "1. Pour Greek yogurt into a bowl\n2. Drizzle with honey\n3. Top with chopped almonds\n4. Serve immediately"
    },
    {
      meal: "Apple with peanut butter",
      ingredients: [
        { name: "Apple", grams: 182, macros: { calories: 95, protein: 0.5, carbs: 25, fat: 0.3, ...defaultVisibility } },
        { name: "Natural peanut butter", grams: 32, macros: { calories: 190, protein: 7, carbs: 7, fat: 16, ...defaultVisibility } }
      ],
      macros: { calories: 200, protein: 8, carbs: 25, fat: 12, ...defaultVisibility },
      recipe: "1. Wash and core the apple\n2. Slice apple into wedges\n3. Spread or dollop peanut butter on each apple slice\n4. Arrange on a plate and serve"
    },
    {
      meal: "Protein bar",
      ingredients: [
        { name: "Protein blend", grams: 30, macros: { calories: 120, protein: 20, carbs: 2, fat: 2, ...defaultVisibility } },
        { name: "Nuts", grams: 30, macros: { calories: 180, protein: 6, carbs: 6, fat: 16, ...defaultVisibility } },
        { name: "Dried fruits", grams: 25, macros: { calories: 100, protein: 1, carbs: 24, fat: 0, ...defaultVisibility } },
        { name: "Natural sweeteners", grams: 5, macros: { calories: 20, protein: 0, carbs: 5, fat: 0, ...defaultVisibility } }
      ],
      macros: { calories: 180, protein: 20, carbs: 15, fat: 8, ...defaultVisibility },
      recipe: "1. Mix protein blend with chopped nuts and dried fruits\n2. Add natural sweeteners and mix well\n3. Press mixture firmly into a lined container\n4. Refrigerate for at least 1 hour\n5. Cut into bars and serve\n6. Store remaining bars in an airtight container"
    }
  ]
};
