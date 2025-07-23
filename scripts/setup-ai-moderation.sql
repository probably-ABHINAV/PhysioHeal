
-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Add approved column to reviews table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'reviews' AND column_name = 'approved'
  ) THEN
    ALTER TABLE reviews ADD COLUMN approved BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Create review_alerts table for flagged reviews
CREATE TABLE IF NOT EXISTS review_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
  sentiment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMPTZ NULL,
  resolved_by UUID NULL
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_review_alerts_review_id ON review_alerts(review_id);
CREATE INDEX IF NOT EXISTS idx_review_alerts_resolved ON review_alerts(resolved);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(approved);

-- Set up RLS policies for review_alerts
ALTER TABLE review_alerts ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage alerts
CREATE POLICY "Service role can manage review alerts" ON review_alerts
  FOR ALL USING (auth.role() = 'service_role');

-- Allow authenticated users to read alerts (for admin dashboard)
CREATE POLICY "Authenticated users can read review alerts" ON review_alerts
  FOR SELECT USING (auth.role() = 'authenticated');
