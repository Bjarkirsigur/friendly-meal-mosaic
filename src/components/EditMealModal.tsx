
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

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

interface EditMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: string;
  ingredients: Ingredient[];
  onSave: (ingredients: Ingredient[], totalMacros: Macros) => void;
  availableIngredients: Ingredient[];
}

const EditMealModal = ({ isOpen, onClose, meal, ingredients: initialIngredients, onSave, availableIngredients }: EditMealModalProps) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);
  const [totalMacros, setTotalMacros] = useState<Macros>({ calories: 0, protein: 0, carbs: 0, fat: 0 });

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
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit {meal}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground mb-2">
            <div>Ingredient</div>
            <div>Amount (g)</div>
            <div>Macros per serving</div>
            <div></div>
          </div>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 items-center">
              <Select
                value={ingredient.name}
                onValueChange={(value) => handleIngredientChange(index, value)}
              >
                <SelectTrigger>
                  <SelectValue>{ingredient.name}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {availableIngredients.map((ing) => (
                    <SelectItem key={ing.name} value={ing.name}>
                      {ing.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={ingredient.grams}
                onChange={(e) => handleGramsChange(index, Number(e.target.value))}
                min="0"
                className="w-24"
              />
              <div className="text-sm text-muted-foreground">
                <div>{ingredient.macros.calories} kcal</div>
                <div>{ingredient.macros.protein}g protein</div>
                <div>{ingredient.macros.carbs}g carbs</div>
                <div>{ingredient.macros.fat}g fat</div>
              </div>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="font-medium mb-2">Total Macros:</div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>{totalMacros.calories} kcal</div>
              <div>{totalMacros.protein}g protein</div>
              <div>{totalMacros.carbs}g carbs</div>
              <div>{totalMacros.fat}g fat</div>
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
