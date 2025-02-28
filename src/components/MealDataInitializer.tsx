
import { useEffect, useState } from 'react';
import { setupMealData } from '@/utils/mealSetup';
import { useToast } from '@/hooks/use-toast';

export const MealDataInitializer = () => {
  const [initializing, setInitializing] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeMealData = async () => {
      if (initialized || initializing) return;
      
      setInitializing(true);
      try {
        const result = await setupMealData();
        if (result) {
          toast({
            title: 'Ready to go!',
            description: 'High-protein meals loaded successfully.',
          });
          setInitialized(true);
        }
      } catch (error) {
        console.error('Error initializing meal data:', error);
      } finally {
        setInitializing(false);
      }
    };

    initializeMealData();
  }, [initialized, initializing, toast]);

  // No UI - just an initialization component
  return null;
};
