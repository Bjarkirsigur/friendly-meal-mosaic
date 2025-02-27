
import { useState } from "react";
import { useIngredients } from "@/hooks/useIngredients";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Search, Plus, Barcode, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import BarcodeScanner from "@/components/BarcodeScanner";
import { fetchProductByBarcode } from "@/services/foodApi";
import { Ingredient } from "@/types/meals";

export default function Ingredients() {
  const { ingredients, loading, addIngredient } = useIngredients();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [newIngredient, setNewIngredient] = useState<Omit<Ingredient, 'id' | 'is_default' | 'user_id'>>({
    name: "",
    grams: 100,
    macros: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      showCalories: true,
      showProtein: true,
      showCarbs: true,
      showFat: true
    },
    image_url: ""
  });
  const [barcodeInput, setBarcodeInput] = useState("");
  const [isLoadingBarcode, setIsLoadingBarcode] = useState(false);
  const { toast } = useToast();
  
  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setNewIngredient({
      name: "",
      grams: 100,
      macros: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        showCalories: true,
        showProtein: true,
        showCarbs: true,
        showFat: true
      },
      image_url: ""
    });
    setBarcodeInput("");
    setIsScanning(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "grams") {
      setNewIngredient({
        ...newIngredient,
        [name]: parseFloat(value) || 0
      });
    } else if (name.startsWith("macros.")) {
      const macroProperty = name.split(".")[1];
      setNewIngredient({
        ...newIngredient,
        macros: {
          ...newIngredient.macros,
          [macroProperty]: parseFloat(value) || 0
        }
      });
    } else {
      setNewIngredient({
        ...newIngredient,
        [name]: value
      });
    }
  };

  const handleSubmit = async () => {
    if (!newIngredient.name) {
      toast({
        title: "Missing information",
        description: "Please provide a name for the ingredient",
        variant: "destructive"
      });
      return;
    }

    try {
      const result = await addIngredient(newIngredient);
      if (result) {
        toast({
          title: "Success",
          description: "Ingredient added successfully"
        });
        resetForm();
        setIsAddDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add ingredient",
        variant: "destructive"
      });
    }
  };

  const startBarcodeScanning = () => {
    setIsScanning(true);
  };

  const stopBarcodeScanning = () => {
    setIsScanning(false);
  };

  const handleBarcodeDetected = async (barcode: string) => {
    // Stop scanning once we detect a barcode
    stopBarcodeScanning();
    setIsLoadingBarcode(true);
    
    try {
      // Attempt to fetch product data from the food API
      const productData = await fetchProductByBarcode(barcode);
      
      // Type assertion for the product data
      const typedData = productData as {
        name: string;
        grams: number;
        macros: {
          calories: number;
          protein: number;
          carbs: number;
          fat: number;
        };
        image_url?: string;
      };
      
      // Update the form with product data
      setNewIngredient({
        name: typedData.name,
        grams: typedData.grams,
        image_url: typedData.image_url || "",
        macros: {
          calories: typedData.macros.calories,
          protein: typedData.macros.protein,
          carbs: typedData.macros.carbs,
          fat: typedData.macros.fat,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      });
      
      toast({
        title: "Product found",
        description: `Found data for ${typedData.name}`
      });
    } catch (error) {
      toast({
        title: "Product not found",
        description: "Could not find product information. Please enter details manually.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingBarcode(false);
    }
  };

  const handleBarcodeScanError = (error: any) => {
    console.error("Barcode scanning error:", error);
    toast({
      title: "Scanner Error",
      description: "Could not access camera. Please check permissions or enter barcode manually.",
      variant: "destructive"
    });
    stopBarcodeScanning();
  };

  const handleManualBarcodeSearch = async () => {
    if (!barcodeInput) {
      toast({
        title: "Error",
        description: "Please enter a barcode",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoadingBarcode(true);
    
    try {
      const productData = await fetchProductByBarcode(barcodeInput);
      
      // Type assertion for the product data
      const typedData = productData as {
        name: string;
        grams: number;
        macros: {
          calories: number;
          protein: number;
          carbs: number;
          fat: number;
        };
        image_url?: string;
      };
      
      setNewIngredient({
        name: typedData.name,
        grams: typedData.grams,
        image_url: typedData.image_url || "",
        macros: {
          calories: typedData.macros.calories,
          protein: typedData.macros.protein,
          carbs: typedData.macros.carbs,
          fat: typedData.macros.fat,
          showCalories: true,
          showProtein: true,
          showCarbs: true,
          showFat: true
        }
      });
      
      toast({
        title: "Product found",
        description: `Found data for ${typedData.name}`
      });
    } catch (error) {
      toast({
        title: "Product not found",
        description: "Could not find product information. Please enter details manually.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingBarcode(false);
    }
  };

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
        
        <div className="flex items-center gap-2">
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
          
          <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open) {
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Ingredient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Ingredient</DialogTitle>
              </DialogHeader>
              
              {isScanning ? (
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center p-4 border rounded-md bg-secondary/30 min-h-[240px]">
                    <BarcodeScanner 
                      onDetected={handleBarcodeDetected}
                      onError={handleBarcodeScanError}
                    />
                  </div>
                  <Button variant="outline" onClick={stopBarcodeScanning} className="w-full">
                    <X className="mr-2 h-4 w-4" />
                    Cancel Scanning
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 py-4">
                  {isLoadingBarcode ? (
                    <div className="flex flex-col items-center justify-center p-4 h-[200px]">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                      <p className="mt-4 text-muted-foreground">Looking up product information...</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-2">
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <Label htmlFor="barcode" className="text-sm">
                              Enter Barcode
                            </Label>
                            <div className="flex gap-2 mt-1">
                              <Input
                                id="barcode"
                                placeholder="Enter barcode number"
                                value={barcodeInput}
                                onChange={(e) => setBarcodeInput(e.target.value)}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={handleManualBarcodeSearch}
                                size="icon"
                              >
                                <Search className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="scan" className="text-sm">
                              Scan
                            </Label>
                            <Button
                              id="scan"
                              type="button"
                              variant="outline"
                              onClick={startBarcodeScanning}
                              className="mt-1"
                              size="icon"
                            >
                              <Barcode className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="name" className="text-sm">
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={newIngredient.name}
                          onChange={handleInputChange}
                          placeholder="Ingredient name"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="grams" className="text-sm">
                            Serving Size (g)
                          </Label>
                          <Input
                            id="grams"
                            name="grams"
                            type="number"
                            value={newIngredient.grams}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="macros.calories" className="text-sm">
                            Calories
                          </Label>
                          <Input
                            id="macros.calories"
                            name="macros.calories"
                            type="number"
                            value={newIngredient.macros.calories}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="macros.protein" className="text-sm">
                            Protein (g)
                          </Label>
                          <Input
                            id="macros.protein"
                            name="macros.protein"
                            type="number"
                            value={newIngredient.macros.protein}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="macros.carbs" className="text-sm">
                            Carbs (g)
                          </Label>
                          <Input
                            id="macros.carbs"
                            name="macros.carbs"
                            type="number"
                            value={newIngredient.macros.carbs}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="macros.fat" className="text-sm">
                            Fat (g)
                          </Label>
                          <Input
                            id="macros.fat"
                            name="macros.fat"
                            type="number"
                            value={newIngredient.macros.fat}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="image_url" className="text-sm">
                          Image URL (optional)
                        </Label>
                        <Input
                          id="image_url"
                          name="image_url"
                          value={newIngredient.image_url}
                          onChange={handleInputChange}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="button" onClick={handleSubmit} disabled={isScanning || isLoadingBarcode}>
                  Add Ingredient
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
