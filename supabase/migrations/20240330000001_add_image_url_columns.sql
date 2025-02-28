
-- Add image_url column to meals table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'meals'
        AND column_name = 'image_url'
    ) THEN
        ALTER TABLE public.meals
        ADD COLUMN image_url TEXT;
    END IF;
END$$;

-- Add image_url column to ingredients table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'ingredients'
        AND column_name = 'image_url'
    ) THEN
        ALTER TABLE public.ingredients
        ADD COLUMN image_url TEXT;
    END IF;
END$$;
