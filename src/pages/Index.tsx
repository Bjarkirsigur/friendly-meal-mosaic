
import MealCard from "@/components/MealCard";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEALS = ["Breakfast", "Lunch", "Dinner", "Snacks"];

// Example meal data with macros - in a real app this would come from a database
const EXAMPLE_MEALS = {
  Breakfast: {
    meal: "Oatmeal with fruits",
    macros: { calories: 350, protein: 12, carbs: 60, fat: 8 }
  },
  Lunch: {
    meal: "Chicken salad",
    macros: { calories: 450, protein: 35, carbs: 25, fat: 22 }
  },
  Dinner: {
    meal: "Salmon with rice",
    macros: { calories: 550, protein: 40, carbs: 45, fat: 25 }
  },
  Snacks: {
    meal: "Greek yogurt",
    macros: { calories: 150, protein: 15, carbs: 10, fat: 5 }
  }
};

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary/30 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">Weekly Meal Plan</h1>
          <p className="text-muted-foreground">Plan your meals for the week ahead</p>
        </div>

        <div className="grid gap-6">
          {/* Header Row */}
          <div className="grid grid-cols-[120px_repeat(7,1fr)] gap-4 items-center">
            <div className="text-muted-foreground font-medium" />
            {DAYS.map((day) => (
              <div key={day} className="text-center">
                <h2 className="text-primary font-semibold">{day}</h2>
              </div>
            ))}
          </div>

          {/* Meal Rows */}
          {MEALS.map((meal) => (
            <div key={meal} className="grid grid-cols-[120px_repeat(7,1fr)] gap-4 items-center">
              <div className="text-muted-foreground font-medium">{meal}</div>
              {DAYS.map((day) => (
                <MealCard
                  key={`${day}-${meal}`}
                  title={`${day} ${meal}`}
                  meal={EXAMPLE_MEALS[meal as keyof typeof EXAMPLE_MEALS]?.meal}
                  macros={EXAMPLE_MEALS[meal as keyof typeof EXAMPLE_MEALS]?.macros}
                  className="w-full"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
