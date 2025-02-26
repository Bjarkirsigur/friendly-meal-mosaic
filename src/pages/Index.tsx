
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useState } from "react";
import WeekHeader from "../components/WeekHeader";
import MealRow from "../components/MealRow";
import { MEAL_TYPES, getAllAvailableIngredients, createInitialMeals } from "../utils/mealUtils";
import { Ingredient, MacroInfo, MealType, DayMeals } from "../types/meals";

const Index = () => {
  const [weeklyMeals, setWeeklyMeals] = useState<Record<string, DayMeals>>(createInitialMeals);

  const handleMealUpdate = (day: string, mealType: string, ingredients: Ingredient[], macros: MacroInfo) => {
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
          <WeekHeader />
          {MEAL_TYPES.map((meal) => (
            <MealRow
              key={meal}
              mealType={meal as MealType}
              weeklyMeals={weeklyMeals}
              onMealUpdate={handleMealUpdate}
              availableIngredients={getAllAvailableIngredients()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
