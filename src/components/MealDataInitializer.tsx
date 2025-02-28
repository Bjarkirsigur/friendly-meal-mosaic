
import { useEffect } from "react";
import { useMealPlanner } from "@/hooks/useMealPlanner";

export const MealDataInitializer = () => {
  const { initializeMealsIfEmpty } = useMealPlanner();

  useEffect(() => {
    initializeMealsIfEmpty();
  }, [initializeMealsIfEmpty]);

  return null;
};
