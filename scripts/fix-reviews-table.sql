
-- Fix reviews table to match component expectations
-- Rename review_text to comment and add service column

DO $$
BEGIN
  -- Only rename if review_text exists and comment doesn't exist
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name = 'reviews' AND column_name = 'review_text') 
     AND NOT EXISTS (SELECT 1 FROM information_schema.columns 
                     WHERE table_name = 'reviews' AND column_name = 'comment') THEN
    ALTER TABLE reviews RENAME COLUMN review_text TO comment;
  END IF;
  
  -- Add service column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'reviews' AND column_name = 'service') THEN
    ALTER TABLE reviews ADD COLUMN service TEXT;
  END IF;
END $$;
