
// This is a simplistic mock of a food database API
// In a real application, you would connect to an actual API like USDA FoodData Central,
// Open Food Facts, or Nutritionix

// Example responses based on barcode
const mockDatabase: Record<string, any> = {
  "9780201379624": {
    name: "Whole Grain Bread",
    nutritionalInfo: {
      calories: 80,
      protein: 4,
      carbs: 15,
      fat: 1
    },
    servingSize: 30,
    image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop"
  },
  "737628064502": {
    name: "Almond Milk",
    nutritionalInfo: {
      calories: 30,
      protein: 1,
      carbs: 1,
      fat: 2.5
    },
    servingSize: 240,
    image_url: "https://images.unsplash.com/photo-1600718374662-0483b3a9b2d5?w=800&auto=format&fit=crop"
  },
  "012000161155": {
    name: "Greek Yogurt",
    nutritionalInfo: {
      calories: 120,
      protein: 15,
      carbs: 8,
      fat: 0
    },
    servingSize: 150,
    image_url: "https://images.unsplash.com/photo-1488477181946-6428a0bfdf42?w=800&auto=format&fit=crop"
  }
};

export const fetchProductByBarcode = async (barcode: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = mockDatabase[barcode];
      
      if (product) {
        resolve({
          name: product.name,
          grams: product.servingSize,
          macros: {
            calories: product.nutritionalInfo.calories,
            protein: product.nutritionalInfo.protein,
            carbs: product.nutritionalInfo.carbs,
            fat: product.nutritionalInfo.fat
          },
          image_url: product.image_url
        });
      } else {
        reject(new Error("Product not found"));
      }
    }, 1000);
  });
};
