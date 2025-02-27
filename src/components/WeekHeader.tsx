
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DAYS } from "../utils/mealUtils";
import { format, addWeeks, startOfWeek, addDays, isBefore, startOfDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface WeekHeaderProps {
  currentDate: Date;
  onWeekChange: (date: Date) => void;
}

const WeekHeader = ({ currentDate, onWeekChange }: WeekHeaderProps) => {
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start week on Monday
  const today = new Date(2025, 1, 26); // February 26, 2025
  const isMobile = useIsMobile();

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
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between mb-1">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousWeek}
          className="h-6 w-6"
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
        <div className="text-sm font-medium">
          {format(startOfCurrentWeek, 'MMMM yyyy')}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextWeek}
          className="h-6 w-6"
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
      <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-1 items-center min-w-[800px]">
        <div className="text-muted-foreground font-medium text-xs" />
        {DAYS.map((day, index) => {
          const dayDate = getDayDate(index);
          const isFinished = isPastDay(dayDate);
          
          return (
            <div 
              key={day} 
              className={cn(
                "text-center p-1",
                isFinished && "opacity-50"
              )}
            >
              <h2 className="text-primary font-semibold text-xs">{isMobile ? day.slice(0, 3) : day.slice(0, 3)}</h2>
              <div className="text-xs text-muted-foreground">
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
