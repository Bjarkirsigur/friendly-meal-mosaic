
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DAYS } from "../utils/mealUtils";
import { format, addWeeks, startOfWeek, addDays, isBefore, startOfDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WeekHeaderProps {
  currentDate: Date;
  onWeekChange: (date: Date) => void;
}

const WeekHeader = ({ currentDate, onWeekChange }: WeekHeaderProps) => {
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start week on Monday
  const today = new Date(2025, 1, 26); // February 26, 2025

  const getDayDate = (dayIndex: number) => {
    return addDays(startOfCurrentWeek, dayIndex);
  };

  const handlePreviousWeek = () => {
    onWeekChange(addWeeks(currentDate, -1));
  };

  const handleNextWeek = () => {
    onWeekChange(addWeeks(currentDate, 1));
  };

  const isPastDay = (date: Date) => {
    return isBefore(startOfDay(date), startOfDay(today));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousWeek}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-lg font-medium">
          {format(startOfCurrentWeek, 'MMMM yyyy')}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextWeek}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-[120px_repeat(7,1fr)] gap-4 items-center">
        <div className="text-muted-foreground font-medium" />
        {DAYS.map((day, index) => {
          const dayDate = getDayDate(index);
          const isFinished = isPastDay(dayDate);
          
          return (
            <div 
              key={day} 
              className={cn(
                "text-center",
                isFinished && "opacity-50"
              )}
            >
              <h2 className="text-primary font-semibold">{day}</h2>
              <div className="text-sm text-muted-foreground">
                {format(dayDate, 'd')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekHeader;
