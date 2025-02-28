
import { Ingredient } from "@/types/meals";

export interface FoodCategory {
  name: string;
  foods: Ingredient[];
}

// Create a comprehensive food library organized by categories
export const foodLibrary: FoodCategory[] = [
  {
    name: "Proteins",
    foods: [
      {
        name: "Chicken Breast",
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
        }
      },
      {
        name: "Salmon",
        grams: 100,
        macros: {
          calories: 208,
          protein: 20,
          carbs: 0,
          fat: 13,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Tuna (canned in water)",
        grams: 100,
        macros: {
          calories: 116,
          protein: 25.5,
          carbs: 0,
          fat: 0.8,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Ground Beef (90% lean)",
        grams: 100,
        macros: {
          calories: 176,
          protein: 20,
          carbs: 0,
          fat: 10,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Eggs",
        grams: 50,
        macros: {
          calories: 78,
          protein: 6.3,
          carbs: 0.6,
          fat: 5.3,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Turkey Breast",
        grams: 100,
        macros: {
          calories: 157,
          protein: 24,
          carbs: 0,
          fat: 7,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Tofu",
        grams: 100,
        macros: {
          calories: 76,
          protein: 8,
          carbs: 2,
          fat: 4.8,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Shrimp",
        grams: 100,
        macros: {
          calories: 99,
          protein: 24,
          carbs: 0,
          fat: 0.3,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      }
    ]
  },
  {
    name: "Dairy & Alternatives",
    foods: [
      {
        name: "Greek Yogurt",
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
        }
      },
      {
        name: "Cottage Cheese",
        grams: 100,
        macros: {
          calories: 98,
          protein: 11.1,
          carbs: 3.4,
          fat: 4.3,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Cheddar Cheese",
        grams: 30,
        macros: {
          calories: 110,
          protein: 7,
          carbs: 0.4,
          fat: 9,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Almond Milk",
        grams: 240,
        macros: {
          calories: 30,
          protein: 1,
          carbs: 1,
          fat: 2.5,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Milk (2%)",
        grams: 240,
        macros: {
          calories: 122,
          protein: 8.1,
          carbs: 11.7,
          fat: 4.8,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Oat Milk",
        grams: 240,
        macros: {
          calories: 120,
          protein: 3,
          carbs: 16,
          fat: 5,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      }
    ]
  },
  {
    name: "Grains & Carbs",
    foods: [
      {
        name: "Oats",
        grams: 40,
        macros: {
          calories: 150,
          protein: 5,
          carbs: 27,
          fat: 2.5,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Brown Rice",
        grams: 100,
        macros: {
          calories: 112,
          protein: 2.6,
          carbs: 23.5,
          fat: 0.9,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Quinoa",
        grams: 100,
        macros: {
          calories: 120,
          protein: 4.4,
          carbs: 21.3,
          fat: 1.9,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Sweet Potato",
        grams: 100,
        macros: {
          calories: 86,
          protein: 1.6,
          carbs: 20.1,
          fat: 0.1,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Whole Wheat Bread",
        grams: 30,
        macros: {
          calories: 69,
          protein: 3.6,
          carbs: 12.9,
          fat: 0.9,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Pasta (cooked)",
        grams: 100,
        macros: {
          calories: 158,
          protein: 5.8,
          carbs: 31,
          fat: 0.9,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Jasmine Rice",
        grams: 100,
        macros: {
          calories: 130,
          protein: 2.7,
          carbs: 28.2,
          fat: 0.3,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      }
    ]
  },
  {
    name: "Fruits",
    foods: [
      {
        name: "Apple",
        grams: 100,
        macros: {
          calories: 52,
          protein: 0.3,
          carbs: 13.8,
          fat: 0.2,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Banana",
        grams: 100,
        macros: {
          calories: 89,
          protein: 1.1,
          carbs: 22.8,
          fat: 0.3,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Blueberries",
        grams: 100,
        macros: {
          calories: 57,
          protein: 0.7,
          carbs: 14.5,
          fat: 0.3,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Strawberries",
        grams: 100,
        macros: {
          calories: 32,
          protein: 0.7,
          carbs: 7.7,
          fat: 0.3,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Orange",
        grams: 100,
        macros: {
          calories: 47,
          protein: 0.9,
          carbs: 11.8,
          fat: 0.1,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Avocado",
        grams: 50,
        macros: {
          calories: 80,
          protein: 1,
          carbs: 4.3,
          fat: 7.3,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      }
    ]
  },
  {
    name: "Vegetables",
    foods: [
      {
        name: "Broccoli",
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
        }
      },
      {
        name: "Spinach",
        grams: 100,
        macros: {
          calories: 23,
          protein: 2.9,
          carbs: 3.6,
          fat: 0.4,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Kale",
        grams: 100,
        macros: {
          calories: 49,
          protein: 4.3,
          carbs: 8.8,
          fat: 0.9,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Bell Pepper",
        grams: 100,
        macros: {
          calories: 31,
          protein: 1,
          carbs: 6,
          fat: 0.3,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Cucumber",
        grams: 100,
        macros: {
          calories: 15,
          protein: 0.7,
          carbs: 3.6,
          fat: 0.1,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Carrots",
        grams: 100,
        macros: {
          calories: 41,
          protein: 0.9,
          carbs: 9.6,
          fat: 0.2,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Zucchini",
        grams: 100,
        macros: {
          calories: 17,
          protein: 1.2,
          carbs: 3.1,
          fat: 0.3,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      }
    ]
  },
  {
    name: "Nuts & Seeds",
    foods: [
      {
        name: "Almonds",
        grams: 30,
        macros: {
          calories: 173,
          protein: 6.3,
          carbs: 6.1,
          fat: 14.9,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Walnuts",
        grams: 30,
        macros: {
          calories: 196,
          protein: 4.6,
          carbs: 4,
          fat: 19.2,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Chia Seeds",
        grams: 15,
        macros: {
          calories: 76,
          protein: 2.5,
          carbs: 6.5,
          fat: 4.7,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Flax Seeds",
        grams: 15,
        macros: {
          calories: 82,
          protein: 2.8,
          carbs: 4.3,
          fat: 6.5,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Peanut Butter",
        grams: 32,
        macros: {
          calories: 188,
          protein: 8,
          carbs: 6,
          fat: 16,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Almond Butter",
        grams: 32,
        macros: {
          calories: 196,
          protein: 5.8,
          carbs: 6,
          fat: 17.8,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      }
    ]
  },
  {
    name: "Supplements",
    foods: [
      {
        name: "Whey Protein Powder",
        grams: 30,
        macros: {
          calories: 120,
          protein: 24,
          carbs: 3,
          fat: 1.5,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Plant Protein Powder",
        grams: 30,
        macros: {
          calories: 110,
          protein: 20,
          carbs: 5,
          fat: 2,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Creatine Monohydrate",
        grams: 5,
        macros: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "BCAA Powder",
        grams: 10,
        macros: {
          calories: 40,
          protein: 7,
          carbs: 2,
          fat: 0,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      }
    ]
  },
  {
    name: "Oils & Fats",
    foods: [
      {
        name: "Olive Oil",
        grams: 15,
        macros: {
          calories: 119,
          protein: 0,
          carbs: 0,
          fat: 13.5,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Coconut Oil",
        grams: 15,
        macros: {
          calories: 121,
          protein: 0,
          carbs: 0,
          fat: 13.6,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Butter",
        grams: 15,
        macros: {
          calories: 108,
          protein: 0.1,
          carbs: 0,
          fat: 12.2,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Avocado Oil",
        grams: 15,
        macros: {
          calories: 124,
          protein: 0,
          carbs: 0,
          fat: 14,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      }
    ]
  },
  {
    name: "Beverages",
    foods: [
      {
        name: "Coffee (black)",
        grams: 240,
        macros: {
          calories: 2,
          protein: 0.3,
          carbs: 0,
          fat: 0,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Green Tea",
        grams: 240,
        macros: {
          calories: 2,
          protein: 0,
          carbs: 0,
          fat: 0,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Protein Shake",
        grams: 300,
        macros: {
          calories: 150,
          protein: 25,
          carbs: 5,
          fat: 3,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      },
      {
        name: "Fruit Smoothie",
        grams: 300,
        macros: {
          calories: 180,
          protein: 3,
          carbs: 40,
          fat: 1,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      }
    ]
  }
];
