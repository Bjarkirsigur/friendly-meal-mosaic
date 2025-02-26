
import { DAYS } from "../utils/mealUtils";

const WeekHeader = () => {
  return (
    <div className="grid grid-cols-[120px_repeat(7,1fr)] gap-4 items-center">
      <div className="text-muted-foreground font-medium" />
      {DAYS.map((day) => (
        <div key={day} className="text-center">
          <h2 className="text-primary font-semibold">{day}</h2>
        </div>
      ))}
    </div>
  );
};

export default WeekHeader;
