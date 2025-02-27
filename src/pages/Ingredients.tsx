
import { useState } from "react";
import { useIngredients } from "@/hooks/useIngredients";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";

export default function Ingredients() {
  const { ingredients, loading } = useIngredients();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to get a fallback image based on ingredient name
  const getFallbackImage = (name: string) => {
    // Default categories
    const proteinFoods = ["chicken", "beef", "fish", "salmon", "tuna", "egg", "turkey", "tofu", "protein"];
    const dairyFoods = ["milk", "yogurt", "cheese", "cream", "butter"];
    const fruitFoods = ["apple", "banana", "orange", "berry", "fruit", "berries"];
    const vegetableFoods = ["broccoli", "spinach", "lettuce", "carrot", "vegetable", "tomato", "pepper"];
    const grainFoods = ["rice", "oat", "bread", "pasta", "grain", "cereal", "wheat"];
    const nutsFoods = ["almond", "walnut", "peanut", "cashew", "nut"];
    const oilsFoods = ["oil", "olive"];
    
    const nameLower = name.toLowerCase();
    
    if (proteinFoods.some(food => nameLower.includes(food))) {
      return "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=1470&auto=format&fit=crop";
    } else if (dairyFoods.some(food => nameLower.includes(food))) {
      return "https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=1470&auto=format&fit=crop";
    } else if (fruitFoods.some(food => nameLower.includes(food))) {
      return "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=1470&auto=format&fit=crop";
    } else if (vegetableFoods.some(food => nameLower.includes(food))) {
      return "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=1374&auto=format&fit=crop";
    } else if (grainFoods.some(food => nameLower.includes(food))) {
      return "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1470&auto=format&fit=crop";
    } else if (nutsFoods.some(food => nameLower.includes(food))) {
      return "https://images.unsplash.com/photo-1573851552153-816785fecb2f?q=80&w=1470&auto=format&fit=crop";
    } else if (oilsFoods.some(food => nameLower.includes(food))) {
      return "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1470&auto=format&fit=crop";
    }
    
    // Default fallback
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1470&auto=format&fit=crop";
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ingredients Library</h1>
          <p className="text-muted-foreground mt-1">
            Browse our comprehensive collection of ingredients with accurate nutritional information
          </p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search ingredients..."
            className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Separator />
      
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-lg text-muted-foreground">Loading ingredients...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredIngredients.map((ingredient) => (
            <Card key={ingredient.id} className="overflow-hidden h-full flex flex-col">
              <div className="aspect-video w-full overflow-hidden bg-secondary/20">
                <img 
                  src={ingredient.image_url || getFallbackImage(ingredient.name)} 
                  alt={ingredient.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  onError={(e) => {
                    // If image fails to load, set source to fallback
                    const target = e.target as HTMLImageElement;
                    if (target.src !== getFallbackImage(ingredient.name)) {
                      target.src = getFallbackImage(ingredient.name);
                    }
                  }}
                />
              </div>
              <CardContent className="flex-1 p-4">
                <h3 className="font-medium text-lg mb-2">{ingredient.name}</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Calories:</span>
                    <span className="font-medium">{ingredient.macros.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Serving:</span>
                    <span className="font-medium">{ingredient.grams}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Protein:</span>
                    <span className="font-medium">{ingredient.macros.protein}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Carbs:</span>
                    <span className="font-medium">{ingredient.macros.carbs}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fat:</span>
                    <span className="font-medium">{ingredient.macros.fat}g</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
