
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MacroInfo } from "@/types/meals";

interface MacroGoalsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tempGoals: MacroInfo;
  onGoalsChange: (goals: MacroInfo) => void;
  onSave: () => void;
}

const MacroGoalsDialog = ({
  isOpen,
  onOpenChange,
  tempGoals,
  onGoalsChange,
  onSave
}: MacroGoalsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Daily Macro Goals</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="calories" className="text-sm font-medium">
                Daily Calories (kcal)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Show</span>
                <Switch
                  id="show-calories"
                  checked={tempGoals.showCalories}
                  onCheckedChange={(checked) => 
                    onGoalsChange({ ...tempGoals, showCalories: checked })
                  }
                />
              </div>
            </div>
            <Input
              id="calories"
              type="number"
              value={tempGoals.calories}
              onChange={(e) => onGoalsChange({ ...tempGoals, calories: Number(e.target.value) })}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="protein" className="text-sm font-medium">
                Daily Protein (g)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Show</span>
                <Switch
                  id="show-protein"
                  checked={tempGoals.showProtein}
                  onCheckedChange={(checked) => 
                    onGoalsChange({ ...tempGoals, showProtein: checked })
                  }
                />
              </div>
            </div>
            <Input
              id="protein"
              type="number"
              value={tempGoals.protein}
              onChange={(e) => onGoalsChange({ ...tempGoals, protein: Number(e.target.value) })}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="carbs" className="text-sm font-medium">
                Daily Carbs (g)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Show</span>
                <Switch
                  id="show-carbs"
                  checked={tempGoals.showCarbs}
                  onCheckedChange={(checked) => 
                    onGoalsChange({ ...tempGoals, showCarbs: checked })
                  }
                />
              </div>
            </div>
            <Input
              id="carbs"
              type="number"
              value={tempGoals.carbs}
              onChange={(e) => onGoalsChange({ ...tempGoals, carbs: Number(e.target.value) })}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="fat" className="text-sm font-medium">
                Daily Fat (g)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Show</span>
                <Switch
                  id="show-fat"
                  checked={tempGoals.showFat}
                  onCheckedChange={(checked) => 
                    onGoalsChange({ ...tempGoals, showFat: checked })
                  }
                />
              </div>
            </div>
            <Input
              id="fat"
              type="number"
              value={tempGoals.fat}
              onChange={(e) => onGoalsChange({ ...tempGoals, fat: Number(e.target.value) })}
            />
          </div>
          <Button onClick={onSave}>Save Goals</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MacroGoalsDialog;
