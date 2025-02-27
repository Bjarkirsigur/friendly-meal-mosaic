
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, Wand2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Ingredient {
  name: string;
  grams: number;
  macros: Macros;
}

interface MacroInfo {
  showCalories: boolean;
  showProtein: boolean;
  showCarbs: boolean;
  showFat: boolean;
}

interface EditMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: string;
  ingredients: Ingredient[];
  onSave: (ingredients: Ingredient[], totalMacros: Macros) => void;
  availableIngredients: Ingredient[];
  macroVisibility: MacroInfo;
}

const EditMealModal = ({ isOpen, onClose, meal, ingredients: initialIngredients, onSave, availableIngredients, macroVisibility }: EditMealModalProps) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);
  const [totalMacros, setTotalMacros] = useState<Macros>({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [openPopover, setOpenPopover] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const calculateMacrosForGrams = (ingredient: Ingredient, grams: number): Macros => {
    const ratio = grams / ingredient.grams;
    return {
      calories: Math.round(ingredient.macros.calories * ratio),
      protein: Math.round(ingredient.macros.protein * ratio * 10) / 10,
      carbs: Math.round(ingredient.macros.carbs * ratio * 10) / 10,
      fat: Math.round(ingredient.macros.fat * ratio * 10) / 10,
    };
  };

  const calculateTotalMacros = (ingredients: Ingredient[]) => {
    return ingredients.reduce((total, ingredient) => ({
      calories: total.calories + ingredient.macros.calories,
      protein: Math.round((total.protein + ingredient.macros.protein) * 10) / 10,
      carbs: Math.round((total.carbs + ingredient.macros.carbs) * 10) / 10,
      fat: Math.round((total.fat + ingredient.macros.fat) * 10) / 10,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
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
      calories: targetMacros.calories / currentTotal.calories,
      protein: targetMacros.protein / currentTotal.protein,
      carbs: targetMacros.carbs / currentTotal.carbs,
      fat: targetMacros.fat / currentTotal.fat,
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

  const handleIngredientChange = (index: number, newIngredientName: string) => {
    const newIngredient = availableIngredients.find(ing => ing.name === newIngredientName);
    if (!newIngredient) return;

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

  const filteredIngredients = availableIngredients.filter(ing => 
    ing.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {meal}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button
              onClick={adjustIngredientsToTarget}
              variant="outline"
              className="mb-2"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Adjust to Target Macros
            </Button>
          </div>
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground mb-2">
            <div className="col-span-4">Ingredient</div>
            <div className="col-span-2">Amount (g)</div>
            <div className="col-span-6">Macros per serving</div>
          </div>
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
                          {availableIngredients
                            .filter(ing => ing.name.toLowerCase().includes(search.toLowerCase()))
                            .map((ing) => (
                              <CommandItem
                                key={ing.name}
                                onSelect={() => {
                                  const newIngredients = [...ingredients];
                                  newIngredients[index] = {
                                    ...ing,
                                    grams: ingredient.grams,
                                    macros: calculateMacrosForGrams(ing, ingredient.grams)
                                  };
                                  setIngredients(newIngredients);
                                  setOpenPopover(null);
                                  setSearch("");
                                }}
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
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    const newGrams = Number(e.target.value);
                    newIngredients[index] = {
                      ...ingredient,
                      grams: newGrams,
                      macros: calculateMacrosForGrams(ingredient, newGrams)
                    };
                    setIngredients(newIngredients);
                  }}
                  min="0"
                  className="w-full"
                />
              </div>
              <div className="col-span-6 text-sm text-muted-foreground">
                {macroVisibility.showCalories && <div>{ingredient.macros.calories} kcal</div>}
                {macroVisibility.showProtein && <div>{ingredient.macros.protein}g protein</div>}
                {macroVisibility.showCarbs && <div>{ingredient.macros.carbs}g carbs</div>}
                {macroVisibility.showFat && <div>{ingredient.macros.fat}g fat</div>}
              </div>
            </div>
          ))}
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
            <Button onClick={() => onSave(ingredients, totalMacros)}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMealModal;
