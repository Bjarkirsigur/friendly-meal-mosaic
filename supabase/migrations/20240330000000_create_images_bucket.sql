
-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true);

-- Allow public access to the images bucket
INSERT INTO storage.policies (name, definition, bucket_id)
VALUES (
  'Public Read Access',
  '(bucket_id = ''images''::text)',
  'images'
);

-- Allow authenticated users to upload to the images bucket
INSERT INTO storage.policies (name, definition, bucket_id)
VALUES (
  'Authenticated Users Upload Access',
  '(bucket_id = ''images''::text AND auth.role() = ''authenticated''::text)',
  'images'
);

-- Allow authenticated users to delete their own uploads
INSERT INTO storage.policies (name, definition, bucket_id)
VALUES (
  'Authenticated Users Delete Access',
  '(bucket_id = ''images''::text AND auth.role() = ''authenticated''::text)',
  'images'
);
