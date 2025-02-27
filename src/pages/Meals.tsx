
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, X, Search, ChevronsUpDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { MEALS } from "@/data/mealsData";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Textarea } from "@/components/ui/textarea";
import { useMeals } from "@/hooks/useMeals";
import { useIngredients } from "@/hooks/useIngredients";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Ingredient } from "@/types/meals";

// Real meal image mappings
const MEAL_IMAGES: Record<string, string> = {
  "Protein smoothie": "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  "Greek yogurt parfait": "https://images.unsplash.com/photo-1488477181946-6428a0bfcd9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  "Grilled chicken quinoa bowl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  "Baked salmon with roasted vegetables": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  "Oatmeal with berries": "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  "Avocado toast": "https://images.unsplash.com/photo-1588137378633-dea1dcdd0904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  "Chicken salad": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  "Vegetable stir fry": "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  "Spaghetti bolognese": "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  "Fruit salad": "https://images.unsplash.com/photo-1568158879083-c42860933ed7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  "Turkey sandwich": "https://images.unsplash.com/photo-1554433607-66b5efe9d304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  "Vegetable soup": "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  "Caesar salad": "https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
};

// Helper function to get image URL for a meal
export const getMealImageUrl = (mealName: string): string => {
  // Check if we have a specific image for this meal
  if (MEAL_IMAGES[mealName]) {
    return MEAL_IMAGES[mealName];
  }
  
  // Default to a generic Unsplash food image
  return `https://source.unsplash.com/featured/?${encodeURIComponent(mealName.toLowerCase())},food`;
};

const Meals = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: "",
    ingredients: [] as Ingredient[],
    recipe: "",
    category: "Breakfast"
  });
  const [ingredientSearchOpen, setIngredientSearchOpen] = useState(false);
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [ingredientGrams, setIngredientGrams] = useState<number>(100);
  const { toast } = useToast();
  const { meals, loading } = useMeals();
  const { ingredients: availableIngredients, loading: loadingIngredients } = useIngredients();

  const calculateMacrosForGrams = (ingredient: Ingredient, grams: number) => {
    const ratio = grams / ingredient.grams;
    return {
      calories: Math.round(ingredient.macros.calories * ratio),
      protein: Math.round(ingredient.macros.protein * ratio * 10) / 10,
      carbs: Math.round(ingredient.macros.carbs * ratio * 10) / 10,
      fat: Math.round(ingredient.macros.fat * ratio * 10) / 10,
      showCalories: true,
      showProtein: true,
      showCarbs: true,
      showFat: true
    };
  };

  const handleAddIngredient = () => {
    if (selectedIngredient && ingredientGrams > 0) {
      const adjustedIngredient: Ingredient = {
        ...selectedIngredient,
        grams: ingredientGrams,
        macros: calculateMacrosForGrams(selectedIngredient, ingredientGrams)
      };
      
      setNewMeal(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, adjustedIngredient]
      }));
      
      // Reset selection
      setSelectedIngredient(null);
      setIngredientGrams(100);
      setIngredientSearch("");
      setIngredientSearchOpen(false);
    } else {
      toast({
        title: "Invalid Selection",
        description: "Please select an ingredient and specify a valid amount in grams.",
        variant: "destructive"
      });
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setNewMeal(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const calculateTotalMacros = () => {
    return newMeal.ingredients.reduce((acc, ingredient) => ({
      calories: acc.calories + ingredient.macros.calories,
      protein: acc.protein + ingredient.macros.protein,
      carbs: acc.carbs + ingredient.macros.carbs,
      fat: acc.fat + ingredient.macros.fat,
      showCalories: true,
      showProtein: true,
      showCarbs: true,
      showFat: true
    }), {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      showCalories: true,
      showProtein: true,
      showCarbs: true,
      showFat: true
    });
  };

  const handleCreateMeal = () => {
    if (!newMeal.name || newMeal.ingredients.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in the meal name and add at least one ingredient.",
        variant: "destructive"
      });
      return;
    }

    const totalMacros = calculateTotalMacros();
    const newMealObject = {
      meal: newMeal.name,
      ingredients: newMeal.ingredients,
      macros: totalMacros,
      recipe: newMeal.recipe
    };

    if (!MEALS[newMeal.category]) {
      MEALS[newMeal.category] = [];
    }
    MEALS[newMeal.category].push(newMealObject);

    toast({
      title: "Meal Created",
      description: "Your new meal has been added to the list.",
    });
    
    setIsCreateDialogOpen(false);
    setNewMeal({
      name: "",
      ingredients: [],
      recipe: "",
      category: "Breakfast"
    });
  };

  // Filter ingredients based on search term
  const filteredIngredients = availableIngredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

  // Group meals by category
  const mealsByCategory: Record<string, any[]> = {};

  if (!loading && meals.length > 0) {
    meals.forEach(meal => {
      const category = meal.meal_type || "Other";
      if (!mealsByCategory[category]) {
        mealsByCategory[category] = [];
      }
      mealsByCategory[category].push(meal);
    });
  } else {
    // Fallback to static data if API data is not available
    Object.entries(MEALS).forEach(([category, meals]) => {
      mealsByCategory[category] = meals;
    });
  }

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
          {Object.entries(mealsByCategory).map(([category, meals]) => (
            <section key={category} className="animate-fade-in">
              <h2 className="text-2xl font-semibold text-primary mb-6">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meals.map((meal, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={getMealImageUrl(meal.meal)}
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
                          {meal.ingredients.map((ingredient: any, idx: number) => (
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Meal</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="mealName" className="block text-sm font-medium text-foreground mb-2">
                    Meal Name
                  </label>
                  <Input
                    id="mealName"
                    value={newMeal.name}
                    onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                    placeholder="Enter meal name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    value={newMeal.category}
                    onChange={(e) => setNewMeal({ ...newMeal, category: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    {Object.keys(MEALS).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ingredients
                  </label>
                  
                  {/* Ingredient selector and gram input */}
                  <div className="flex items-end gap-2 mb-4">
                    <div className="flex-1">
                      <Popover open={ingredientSearchOpen} onOpenChange={setIngredientSearchOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={ingredientSearchOpen}
                            className="w-full justify-between"
                          >
                            {selectedIngredient ? selectedIngredient.name : "Select an ingredient..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0" align="start">
                          <Command>
                            <CommandInput 
                              placeholder="Search ingredients..." 
                              value={ingredientSearch}
                              onValueChange={setIngredientSearch}
                            />
                            <CommandList>
                              {loadingIngredients ? (
                                <div className="py-6 text-center">
                                  <p className="text-sm text-muted-foreground">Loading ingredients...</p>
                                </div>
                              ) : (
                                <>
                                  <CommandEmpty>No ingredients found.</CommandEmpty>
                                  <CommandGroup className="max-h-[200px] overflow-y-auto">
                                    {filteredIngredients.map((ingredient) => (
                                      <CommandItem
                                        key={ingredient.id}
                                        value={ingredient.name}
                                        onSelect={() => {
                                          setSelectedIngredient(ingredient);
                                          setIngredientSearchOpen(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedIngredient?.id === ingredient.id ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        {ingredient.name}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </>
                              )}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="w-24">
                      <Input
                        type="number"
                        placeholder="Grams"
                        value={ingredientGrams}
                        onChange={(e) => setIngredientGrams(Number(e.target.value))}
                        className="w-full"
                        min="1"
                      />
                    </div>
                    
                    <Button onClick={handleAddIngredient} type="button">
                      Add
                    </Button>
                  </div>

                  {/* Display selected ingredients */}
                  <div className="space-y-2 mt-4">
                    {newMeal.ingredients.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No ingredients added yet. Search and select ingredients above.</p>
                    ) : (
                      newMeal.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
                          <div className="flex-1">
                            <span className="font-medium">{ingredient.name}</span>
                            <div className="text-sm text-muted-foreground">
                              <span>{ingredient.grams}g</span>
                              <span className="mx-2">•</span>
                              <span>{ingredient.macros.calories} kcal</span>
                              <span className="mx-2">•</span>
                              <span>{ingredient.macros.protein}g protein</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveIngredient(index)}
                            className="text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="recipe" className="block text-sm font-medium text-foreground mb-2">
                    Recipe Instructions
                  </label>
                  <Textarea
                    id="recipe"
                    value={newMeal.recipe}
                    onChange={(e) => setNewMeal({ ...newMeal, recipe: e.target.value })}
                    placeholder="Enter recipe instructions..."
                    className="min-h-[100px]"
                  />
                </div>
                
                {/* Display total macros */}
                {newMeal.ingredients.length > 0 && (
                  <div className="bg-secondary/30 p-4 rounded-md mt-4">
                    <h4 className="font-medium mb-2">Total Macros</h4>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium">{calculateTotalMacros().calories}</p>
                        <p className="text-muted-foreground">kcal</p>
                      </div>
                      <div>
                        <p className="font-medium">{calculateTotalMacros().protein}g</p>
                        <p className="text-muted-foreground">Protein</p>
                      </div>
                      <div>
                        <p className="font-medium">{calculateTotalMacros().carbs}g</p>
                        <p className="text-muted-foreground">Carbs</p>
                      </div>
                      <div>
                        <p className="font-medium">{calculateTotalMacros().fat}g</p>
                        <p className="text-muted-foreground">Fat</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2">
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
