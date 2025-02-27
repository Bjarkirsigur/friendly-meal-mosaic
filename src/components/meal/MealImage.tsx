
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface MealImageProps {
  meal: string;
  className?: string;
}

export const MealImage = ({ meal, className }: MealImageProps) => {
  return (
    <AspectRatio ratio={16 / 9}>
      <img
        src={`https://source.unsplash.com/featured/?${encodeURIComponent(meal.toLowerCase())},food`}
        alt={meal}
        className={className || "object-cover w-full h-full"}
      />
    </AspectRatio>
  );
};
