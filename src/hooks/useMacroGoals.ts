
import { useState } from "react";
import { MacroInfo } from "@/types/meals";
import { useToast } from "@/hooks/use-toast";

export const useMacroGoals = () => {
  const [isGoalsDialogOpen, setIsGoalsDialogOpen] = useState(false);
  const [macroGoals, setMacroGoals] = useState<MacroInfo>({
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 70,
    showCalories: true,
    showProtein: true,
    showCarbs: true,
    showFat: true
  });
  const [tempGoals, setTempGoals] = useState<MacroInfo>(macroGoals);
  const { toast } = useToast();

  const handleUpdateGoals = () => {
    setMacroGoals(tempGoals);
    setIsGoalsDialogOpen(false);
    toast({
      title: "Macro goals updated",
      description: "Your daily macro goals have been updated successfully.",
    });
  };

  return {
    isGoalsDialogOpen,
    setIsGoalsDialogOpen,
    macroGoals,
    tempGoals,
    setTempGoals,
    handleUpdateGoals
  };
};
