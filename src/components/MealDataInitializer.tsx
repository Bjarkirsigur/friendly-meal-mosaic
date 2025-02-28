
import { useEffect, useState } from 'react';
import { setupMealData } from '@/utils/mealSetup';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export const MealDataInitializer = () => {
  const [initializing, setInitializing] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const { toast } = useToast();

  const handleInitialize = async () => {
    setInitializing(true);
    try {
      const result = await setupMealData();
      if (result) {
        toast({
          title: 'Success',
          description: 'High-protein meals have been added to your database!',
        });
        setInitialized(true);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to initialize meal data. Please check console for details.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error initializing meal data:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setInitializing(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!initialized && (
        <Button 
          onClick={handleInitialize} 
          disabled={initializing}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {initializing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting up meals...
            </>
          ) : (
            'Initialize High-Protein Meals'
          )}
        </Button>
      )}
    </div>
  );
};
