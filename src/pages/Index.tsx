
import MealCard from "@/components/MealCard";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEALS = ["Breakfast", "Lunch", "Dinner", "Snacks"];

// Import the meals data from the Meals page to use as available ingredients
import { MEALS as AVAILABLE_MEALS } from "./Meals";

// Flatten all ingredients from available meals into a single array
const getAllAvailableIngredients = () => {
  const ingredients: any[] = [];
  Object.values(AVAILABLE_MEALS).forEach(mealCategory => {
    mealCategory.forEach(meal => {
      meal.ingredients.forEach(ingredient => {
        if (!ingredients.find(i => i.name === ingredient.name)) {
          ingredients.push(ingredient);
        }
      });
    });
  });
  return ingredients;
};

const Index = () => {
  const [weeklyMeals, setWeeklyMeals] = useState(() => {
    const initialMeals: any = {};
    DAYS.forEach(day => {
      initialMeals[day] = {};
      MEALS.forEach(mealType => {
        initialMeals[day][mealType] = AVAILABLE_MEALS[mealType as keyof typeof AVAILABLE_MEALS]?.[0] || null;
      });
    });
    return initialMeals;
  });

  const handleMealUpdate = (day: string, mealType: string, ingredients: any[], macros: any) => {
    setWeeklyMeals(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: {
          ...prev[day][mealType],
          ingredients,
          macros
        }
      }
    }));
  };

  return (
    <div className="min-h-screen bg-secondary/30 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">Weekly Meal Plan</h1>
          <p className="text-muted-foreground mb-4">Plan your meals for the week ahead</p>
          <Link 
            to="/meals" 
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Browse Available Meals
          </Link>
        </div>

        <div className="grid gap-6">
          {/* Header Row */}
          <div className="grid grid-cols-[120px_repeat(7,1fr)] gap-4 items-center">
            <div className="text-muted-foreground font-medium" />
            {DAYS.map((day) => (
              <div key={day} className="text-center">
                <h2 className="text-primary font-semibold">{day}</h2>
              </div>
            ))}
          </div>

          {/* Meal Rows */}
          {MEALS.map((meal) => (
            <div key={meal} className="grid grid-cols-[120px_repeat(7,1fr)] gap-4 items-center">
              <div className="text-muted-foreground font-medium">{meal}</div>
              {DAYS.map((day) => (
                <MealCard
                  key={`${day}-${meal}`}
                  title={`${day} ${meal}`}
                  meal={weeklyMeals[day][meal]?.meal}
                  macros={weeklyMeals[day][meal]?.macros}
                  ingredients={weeklyMeals[day][meal]?.ingredients}
                  className="w-full"
                  onMealUpdate={(ingredients, macros) => handleMealUpdate(day, meal, ingredients, macros)}
                  availableIngredients={getAllAvailableIngredients()}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
