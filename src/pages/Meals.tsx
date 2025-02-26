
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Using the same meal data structure as Index page but with added ingredients
const MEALS = {
  Breakfast: [
    {
      meal: "Oatmeal with fruits",
      ingredients: ["Rolled oats", "Mixed berries", "Banana", "Honey", "Almond milk"],
      macros: { calories: 350, protein: 12, carbs: 60, fat: 8 }
    },
    {
      meal: "Greek yogurt parfait",
      ingredients: ["Greek yogurt", "Granola", "Mixed berries", "Honey", "Chia seeds"],
      macros: { calories: 300, protein: 15, carbs: 45, fat: 10 }
    },
    {
      meal: "Scrambled eggs with toast",
      ingredients: ["Eggs", "Whole grain bread", "Butter", "Salt", "Black pepper", "Milk"],
      macros: { calories: 400, protein: 20, carbs: 35, fat: 15 }
    }
  ],
  Lunch: [
    {
      meal: "Chicken salad",
      ingredients: ["Grilled chicken breast", "Mixed greens", "Cherry tomatoes", "Cucumber", "Olive oil", "Balsamic vinegar"],
      macros: { calories: 450, protein: 35, carbs: 25, fat: 22 }
    },
    {
      meal: "Quinoa bowl",
      ingredients: ["Quinoa", "Black beans", "Corn", "Avocado", "Red pepper", "Lime juice", "Cilantro"],
      macros: { calories: 480, protein: 25, carbs: 65, fat: 18 }
    },
    {
      meal: "Turkey sandwich",
      ingredients: ["Whole grain bread", "Turkey breast", "Lettuce", "Tomato", "Mayo", "Mustard"],
      macros: { calories: 420, protein: 28, carbs: 48, fat: 16 }
    }
  ],
  Dinner: [
    {
      meal: "Salmon with rice",
      ingredients: ["Salmon fillet", "Brown rice", "Broccoli", "Lemon", "Olive oil", "Garlic"],
      macros: { calories: 550, protein: 40, carbs: 45, fat: 25 }
    },
    {
      meal: "Grilled chicken with vegetables",
      ingredients: ["Chicken breast", "Sweet potato", "Brussels sprouts", "Olive oil", "Herbs", "Garlic"],
      macros: { calories: 480, protein: 45, carbs: 30, fat: 20 }
    },
    {
      meal: "Pasta with meatballs",
      ingredients: ["Whole grain pasta", "Ground beef", "Tomato sauce", "Onion", "Garlic", "Parmesan cheese"],
      macros: { calories: 600, protein: 35, carbs: 70, fat: 22 }
    }
  ],
  Snacks: [
    {
      meal: "Greek yogurt",
      ingredients: ["Greek yogurt", "Honey", "Almonds"],
      macros: { calories: 150, protein: 15, carbs: 10, fat: 5 }
    },
    {
      meal: "Apple with peanut butter",
      ingredients: ["Apple", "Natural peanut butter"],
      macros: { calories: 200, protein: 8, carbs: 25, fat: 12 }
    },
    {
      meal: "Protein bar",
      ingredients: ["Protein blend", "Nuts", "Dried fruits", "Natural sweeteners"],
      macros: { calories: 180, protein: 20, carbs: 15, fat: 8 }
    }
  ]
};

const Meals = () => {
  return (
    <div className="min-h-screen bg-secondary/30 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Meal Plan
        </Link>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">Available Meals</h1>
          <p className="text-muted-foreground">Browse our collection of meals by category</p>
        </div>

        <div className="grid gap-12">
          {Object.entries(MEALS).map(([category, meals]) => (
            <section key={category} className="animate-fade-in">
              <h2 className="text-2xl font-semibold text-primary mb-6">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meals.map((meal, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-medium mb-4">{meal.meal}</h3>
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Ingredients:</p>
                      <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                        {meal.ingredients.map((ingredient, idx) => (
                          <li key={idx}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="text-center">
                        <p className="font-medium text-sm mb-0.5">{meal.macros.calories}</p>
                        <p>kcal</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-sm mb-0.5">{meal.macros.protein}g</p>
                        <p>Protein</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-sm mb-0.5">{meal.macros.carbs}g</p>
                        <p>Carbs</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-sm mb-0.5">{meal.macros.fat}g</p>
                        <p>Fat</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meals;
