
import { useEffect } from "react";
import { useMealPlanner } from "@/hooks/useMealPlanner";

export const MealDataInitializer = () => {
  const { initializeMealsIfEmpty } = useMealPlanner();

  useEffect(() => {
    console.log("MealDataInitializer useEffect running");
    initializeMealsIfEmpty();
  }, [initializeMealsIfEmpty]);

  return null;
};
