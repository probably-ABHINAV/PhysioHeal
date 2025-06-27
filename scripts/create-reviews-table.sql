
-- Create reviews table with all necessary columns
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  service TEXT,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to approved reviews
CREATE POLICY "Public can view approved reviews" ON reviews
  FOR SELECT USING (approved = true);

-- Create policy for inserting new reviews (pending approval)
CREATE POLICY "Anyone can insert reviews" ON reviews
  FOR INSERT WITH CHECK (true);

-- Create policy for admin access (update/delete)
CREATE POLICY "Admin can manage all reviews" ON reviews
  FOR ALL USING (true) WITH CHECK (true);

-- Grant necessary permissions
GRANT SELECT ON reviews TO anon, authenticated;
GRANT INSERT ON reviews TO anon, authenticated;
GRANT ALL ON reviews TO service_role;
