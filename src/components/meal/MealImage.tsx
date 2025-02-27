
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getMealImageUrl } from "@/pages/Meals";

interface MealImageProps {
  meal: string;
  className?: string;
}

export const MealImage = ({ meal, className }: MealImageProps) => {
  return (
    <AspectRatio ratio={16 / 9}>
      <img
        src={getMealImageUrl(meal)}
        alt={meal}
        className={className || "object-cover w-full h-full"}
      />
    </AspectRatio>
  );
};
