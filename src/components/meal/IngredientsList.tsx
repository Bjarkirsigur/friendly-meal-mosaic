
import { Ingredient } from "@/types/meals";

interface IngredientsListProps {
  ingredients: Ingredient[];
  className?: string;
}

export const IngredientsList = ({ ingredients, className = "" }: IngredientsListProps) => {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
      <div className="space-y-2">
        {ingredients.length > 0 ? (
          ingredients.map((ingredient, idx) => (
            <div key={idx} className="flex justify-between items-center p-2 bg-secondary/20 rounded">
              <span>{ingredient.name}</span>
              <span className="text-muted-foreground">{ingredient.grams}g</span>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">No ingredients added yet</p>
        )}
      </div>
    </div>
  );
};
