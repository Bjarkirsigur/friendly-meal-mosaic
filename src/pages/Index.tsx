
import { Link } from "react-router-dom";
import { BookOpen, Settings } from "lucide-react";
import { useState } from "react";
import WeekHeader from "../components/WeekHeader";
import MealRow from "../components/MealRow";
import { MEAL_TYPES, getAllAvailableIngredients, createInitialMeals } from "../utils/mealUtils";
import { Ingredient, MacroInfo, MealType, DayMeals } from "../types/meals";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [weeklyMeals, setWeeklyMeals] = useState<Record<string, DayMeals>>(createInitialMeals);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isGoalsDialogOpen, setIsGoalsDialogOpen] = useState(false);
  const [macroGoals, setMacroGoals] = useState<MacroInfo>({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 70
  });
  const [tempGoals, setTempGoals] = useState<MacroInfo>(macroGoals);
  const { toast } = useToast();

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

  const handleUpdateGoals = () => {
    setMacroGoals(tempGoals);
    setIsGoalsDialogOpen(false);
    toast({
      title: "Macro goals updated",
      description: "Your daily macro goals have been updated successfully.",
    });
  };

  const calculateDailyTotals = (day: string): MacroInfo => {
    const totals: MacroInfo = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };

    Object.values(weeklyMeals[day]).forEach(meal => {
      if (meal?.macros) {
        totals.calories += meal.macros.calories;
        totals.protein += meal.macros.protein;
        totals.carbs += meal.macros.carbs;
        totals.fat += meal.macros.fat;
      }
    });

    return totals;
  };

  return (
    <div className="min-h-screen bg-secondary/30 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-6">Weekly Meal Plan</h1>
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
              <div>
                <span className="font-medium">{macroGoals.calories}</span> kcal
              </div>
              <div>
                <span className="font-medium">{macroGoals.protein}g</span> protein
              </div>
              <div>
                <span className="font-medium">{macroGoals.carbs}g</span> carbs
              </div>
              <div>
                <span className="font-medium">{macroGoals.fat}g</span> fat
              </div>
              <button
                onClick={() => setIsGoalsDialogOpen(true)}
                className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
              >
                <Settings className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              to="/meals" 
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Available Meals
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          <WeekHeader currentDate={currentDate} onWeekChange={setCurrentDate} />
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

      <Dialog open={isGoalsDialogOpen} onOpenChange={setIsGoalsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Daily Macro Goals</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="calories" className="text-sm font-medium">
                Daily Calories (kcal)
              </label>
              <Input
                id="calories"
                type="number"
                value={tempGoals.calories}
                onChange={(e) => setTempGoals(prev => ({ ...prev, calories: Number(e.target.value) }))}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="protein" className="text-sm font-medium">
                Daily Protein (g)
              </label>
              <Input
                id="protein"
                type="number"
                value={tempGoals.protein}
                onChange={(e) => setTempGoals(prev => ({ ...prev, protein: Number(e.target.value) }))}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="carbs" className="text-sm font-medium">
                Daily Carbs (g)
              </label>
              <Input
                id="carbs"
                type="number"
                value={tempGoals.carbs}
                onChange={(e) => setTempGoals(prev => ({ ...prev, carbs: Number(e.target.value) }))}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="fat" className="text-sm font-medium">
                Daily Fat (g)
              </label>
              <Input
                id="fat"
                type="number"
                value={tempGoals.fat}
                onChange={(e) => setTempGoals(prev => ({ ...prev, fat: Number(e.target.value) }))}
              />
            </div>
            <Button onClick={handleUpdateGoals}>Save Goals</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
