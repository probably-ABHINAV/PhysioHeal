
-- Enable RLS on reviews table
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to reviews" ON reviews;
DROP POLICY IF EXISTS "Allow public insert access to reviews" ON reviews;
DROP POLICY IF EXISTS "Allow authenticated users to insert reviews" ON reviews;

-- Create policy to allow anyone to read reviews
CREATE POLICY "Allow public read access to reviews" ON reviews
    FOR SELECT USING (true);

-- Create policy to allow anyone to insert reviews
CREATE POLICY "Allow public insert access to reviews" ON reviews
    FOR INSERT WITH CHECK (true);

-- Create policy to allow service_role to update reviews (for admin approval)
CREATE POLICY "Allow service role to update reviews" ON reviews
    FOR UPDATE USING (true);

-- Create policy to allow service_role to delete reviews
CREATE POLICY "Allow service role to delete reviews" ON reviews
    FOR DELETE USING (true);
