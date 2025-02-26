
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MEALS } from "@/data/mealsData";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Meals = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: "",
    ingredients: [] as { name: string; grams: number; macros: { calories: number; protein: number; carbs: number; fat: number; } }[]
  });
  const { toast } = useToast();

  const handleCreateMeal = () => {
    toast({
      title: "Meal Created",
      description: "Your new meal has been added to the list.",
    });
    setIsCreateDialogOpen(false);
    setNewMeal({ name: "", ingredients: [] });
  };

  return (
    <div className="min-h-screen bg-secondary/30 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Meal Plan
          </Link>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Meal
          </Button>
        </div>

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
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={`https://source.unsplash.com/featured/?${encodeURIComponent(meal.meal.toLowerCase())},food`}
                          alt={meal.meal}
                          className="object-cover w-full h-full"
                        />
                      </AspectRatio>
                    </div>
                    <div className="p-6">
                      <h3 className="font-medium mb-4">{meal.meal}</h3>
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Ingredients:</p>
                        <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                          {meal.ingredients.map((ingredient, idx) => (
                            <li key={idx} className="group cursor-pointer hover:text-foreground">
                              {ingredient.name} ({ingredient.grams}g)
                              <div className="hidden group-hover:block pl-4 pt-1 text-xs">
                                <div className="grid grid-cols-4 gap-2">
                                  <span>{ingredient.macros.calories} kcal</span>
                                  <span>{ingredient.macros.protein}g protein</span>
                                  <span>{ingredient.macros.carbs}g carbs</span>
                                  <span>{ingredient.macros.fat}g fat</span>
                                </div>
                              </div>
                            </li>
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
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Meal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label htmlFor="mealName" className="block text-sm font-medium text-foreground mb-2">
                  Meal Name
                </label>
                <Input
                  id="mealName"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                  placeholder="Enter meal name"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateMeal}>
                  Create Meal
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Meals;
