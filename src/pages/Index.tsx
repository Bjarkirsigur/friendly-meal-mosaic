
import MealCard from "@/components/MealCard";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEALS = ["Breakfast", "Lunch", "Dinner", "Snacks"];

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
