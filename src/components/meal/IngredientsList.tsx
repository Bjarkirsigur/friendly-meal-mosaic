
import { Ingredient } from "@/types/meals";
import { getProteinRatio } from "@/utils/proteinRatio";

interface IngredientsListProps {
  ingredients: Ingredient[];
}

export const IngredientsList = ({ ingredients }: IngredientsListProps) => {
  if (!ingredients || ingredients.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
        <p className="text-muted-foreground text-sm italic">No ingredients</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
      <div className="space-y-2">
        {ingredients.map((ingredient, idx) => {
          const { classification, color } = getProteinRatio(
            ingredient.macros.calories, 
            ingredient.macros.protein
          );
          
          return (
            <div key={idx} className="p-2 bg-secondary/20 rounded flex flex-col">
              <div className="flex justify-between items-center">
                <span>
                  {ingredient.name} 
                  <span className="text-xs text-muted-foreground ml-2">
                    ({ingredient.grams}g)
                  </span>
                </span>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full ${color === 'text-green-600' ? 'bg-emerald-500' : color === 'text-amber-500' ? 'bg-amber-400' : 'bg-rose-400'} mr-1.5`}></div>
                  <span className="text-xs font-medium bg-secondary/80 px-2 py-0.5 rounded-full">
                    {classification}
                  </span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {ingredient.macros.calories} cal · {ingredient.macros.protein}g protein · {ingredient.macros.carbs}g carbs · {ingredient.macros.fat}g fat
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
