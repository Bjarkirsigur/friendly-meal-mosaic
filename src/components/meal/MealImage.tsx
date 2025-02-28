
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getMealImageUrl } from "@/pages/Meals";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MealImageProps {
  meal: string;
  className?: string;
  imageUrl?: string;
  onImageUpdate?: (newImageUrl: string) => void;
  editable?: boolean;
}

export const MealImage = ({ meal, className, imageUrl, onImageUpdate, editable = false }: MealImageProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onImageUpdate) return;

    try {
      setUploading(true);
      
      // Create a unique file name to avoid collisions
      const fileExt = file.name.split('.').pop();
      const fileName = `${meal.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.${fileExt}`;
      const filePath = `meals/${fileName}`;
      
      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) throw error;
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      onImageUpdate(publicUrl);
      
      toast({
        title: "Image updated",
        description: "Your image has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error uploading image",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const displayUrl = imageUrl || getMealImageUrl(meal);

  return (
    <AspectRatio ratio={16 / 9} className="relative group">
      <img
        src={displayUrl}
        alt={meal}
        className={className || "object-cover w-full h-full"}
      />
      
      {editable && (
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <label className="cursor-pointer">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload}
              disabled={uploading}
            />
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white/20 hover:text-white"
              disabled={uploading}
            >
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? "Uploading..." : "Change Image"}
            </Button>
          </label>
        </div>
      )}
    </AspectRatio>
  );
};
