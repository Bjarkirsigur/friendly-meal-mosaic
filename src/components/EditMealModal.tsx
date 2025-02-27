
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, Wand2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Ingredient, MacroInfo } from "@/types/meals"
import { useIngredients } from "@/hooks/useIngredients"

interface EditMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: string;
  ingredients: Ingredient[];
  onSave: (ingredients: Ingredient[], totalMacros: MacroInfo, mealName?: string) => void;
  macroVisibility: MacroInfo;
}

const EditMealModal = ({ isOpen, onClose, meal, ingredients: initialIngredients, onSave, macroVisibility }: EditMealModalProps) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);
  const [totalMacros, setTotalMacros] = useState<MacroInfo>({ calories: 0, protein: 0, carbs: 0, fat: 0, showCalories: true, showProtein: true, showCarbs: true, showFat: true });
  const [openPopover, setOpenPopover] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [mealName, setMealName] = useState(meal);
  const { toast } = useToast();
  const { ingredients: dbIngredients, loading: loadingIngredients } = useIngredients();

  const calculateMacrosForGrams = (ingredient: Ingredient, grams: number): MacroInfo => {
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

  const calculateTotalMacros = (ingredients: Ingredient[]) => {
    return ingredients.reduce((total, ingredient) => ({
      calories: total.calories + ingredient.macros.calories,
      protein: Math.round((total.protein + ingredient.macros.protein) * 10) / 10,
      carbs: Math.round((total.carbs + ingredient.macros.carbs) * 10) / 10,
      fat: Math.round((total.fat + ingredient.macros.fat) * 10) / 10,
      showCalories: true,
      showProtein: true,
      showCarbs: true,
      showFat: true
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, showCalories: true, showProtein: true, showCarbs: true, showFat: true });
  };

  const adjustIngredientsToTarget = () => {
    const currentTotal = calculateTotalMacros(ingredients);
    const targetMacros = {
      calories: 500,
      protein: 37.5,
      carbs: 50,
      fat: 17.5
    };

    const ratios = {
      calories: targetMacros.calories / (currentTotal.calories || 1),
      protein: targetMacros.protein / (currentTotal.protein || 1),
      carbs: targetMacros.carbs / (currentTotal.carbs || 1),
      fat: targetMacros.fat / (currentTotal.fat || 1),
    };

    const avgRatio = (ratios.calories + ratios.protein + ratios.carbs + ratios.fat) / 4;

    const adjustedIngredients = ingredients.map(ing => {
      const newGrams = Math.round(ing.grams * avgRatio);
      return {
        ...ing,
        grams: newGrams,
        macros: calculateMacrosForGrams(ing, newGrams)
      };
    });

    setIngredients(adjustedIngredients);
    toast({
      title: "Ingredients adjusted",
      description: "Ingredient amounts have been adjusted to better match your macro goals.",
    });
  };

  useEffect(() => {
    setTotalMacros(calculateTotalMacros(ingredients));
  }, [ingredients]);

  const handleGramsChange = (index: number, grams: number) => {
    setIngredients(prev => prev.map((ing, i) => {
      if (i === index) {
        return {
          ...ing,
          grams,
          macros: calculateMacrosForGrams(ing, grams)
        };
      }
      return ing;
    }));
  };

  const handleIngredientChange = (index: number, newIngredient: Ingredient) => {
    setIngredients(prev => prev.map((ing, i) => {
      if (i === index) {
        return {
          ...newIngredient,
          grams: ing.grams,
          macros: calculateMacrosForGrams(newIngredient, ing.grams)
        };
      }
      return ing;
    }));
    setOpenPopover(null);
    setSearch("");
  };

  const addNewIngredient = () => {
    if (dbIngredients.length > 0) {
      const newIngredient = dbIngredients[0];
      setIngredients([...ingredients, {
        ...newIngredient,
        grams: 100,
        macros: calculateMacrosForGrams(newIngredient, 100)
      }]);
    } else {
      toast({
        title: "No ingredients available",
        description: "Please add ingredients in the Ingredients section first.",
        variant: "destructive"
      });
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (ingredients.length === 0) {
      toast({
        title: "No ingredients",
        description: "Please add at least one ingredient to the meal.",
        variant: "destructive"
      });
      return;
    }

    onSave(ingredients, totalMacros, mealName);
    onClose();
  };

  const filteredIngredients = dbIngredients.filter(ing => 
    ing.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Meal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid gap-2">
            <label htmlFor="meal-name" className="text-sm font-medium">
              Meal Name
            </label>
            <Input
              id="meal-name"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              placeholder="Enter meal name"
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={adjustIngredientsToTarget}
              variant="outline"
              className="mb-2"
              disabled={ingredients.length === 0}
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Adjust to Target Macros
            </Button>
          </div>
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground mb-2">
            <div className="col-span-4">Ingredient</div>
            <div className="col-span-2">Amount (g)</div>
            <div className="col-span-5">Macros per serving</div>
            <div className="col-span-1"></div>
          </div>
          {ingredients.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No ingredients added yet. Add ingredients from your library below.
            </div>
          )}
          {ingredients.map((ingredient, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4">
                <Popover open={openPopover === index} onOpenChange={(open) => {
                  setOpenPopover(open ? index : null);
                  if (!open) setSearch("");
                }}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openPopover === index}
                      className="w-full justify-between"
                    >
                      {ingredient.name}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command shouldFilter={false}>
                      <CommandInput 
                        placeholder="Search ingredients..." 
                        value={search}
                        onValueChange={setSearch}
                      />
                      <CommandList>
                        <CommandEmpty>No ingredient found.</CommandEmpty>
                        <CommandGroup className="max-h-[200px] overflow-y-auto">
                          {filteredIngredients.map((ing) => (
                            <CommandItem
                              key={ing.id}
                              onSelect={() => handleIngredientChange(index, ing)}
                              className="cursor-pointer"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  ingredient.name === ing.name ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {ing.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  value={ingredient.grams}
                  onChange={(e) => handleGramsChange(index, Number(e.target.value))}
                  min="0"
                  className="w-full"
                />
              </div>
              <div className="col-span-5 text-sm text-muted-foreground">
                {macroVisibility.showCalories && <div>{ingredient.macros.calories} kcal</div>}
                {macroVisibility.showProtein && <div>{ingredient.macros.protein}g protein</div>}
                {macroVisibility.showCarbs && <div>{ingredient.macros.carbs}g carbs</div>}
                {macroVisibility.showFat && <div>{ingredient.macros.fat}g fat</div>}
              </div>
              <div className="col-span-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 text-destructive"
                  onClick={() => removeIngredient(index)}
                >
                  <span className="sr-only">Remove</span>
                  &times;
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={addNewIngredient}
            >
              + Add Ingredient
            </Button>
            {loadingIngredients && (
              <p className="text-sm text-muted-foreground mt-2 text-center">Loading ingredients...</p>
            )}
            {!loadingIngredients && dbIngredients.length === 0 && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                No ingredients available. Please add ingredients in the Ingredients section first.
              </p>
            )}
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="font-medium mb-2">Total Macros:</div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              {macroVisibility.showCalories && <div>{totalMacros.calories} kcal</div>}
              {macroVisibility.showProtein && <div>{totalMacros.protein}g protein</div>}
              {macroVisibility.showCarbs && <div>{totalMacros.carbs}g carbs</div>}
              {macroVisibility.showFat && <div>{totalMacros.fat}g fat</div>}
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMealModal;
