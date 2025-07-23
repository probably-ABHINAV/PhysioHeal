
-- Fix Row Level Security policies for admin access
-- This script ensures admins can access all data

-- Drop existing policies
DROP POLICY IF EXISTS "Admin can view all appointments" ON appointments;
DROP POLICY IF EXISTS "Admin can update appointments" ON appointments;
DROP POLICY IF EXISTS "Admin can delete appointments" ON appointments;
DROP POLICY IF EXISTS "Anyone can insert appointments" ON appointments;

DROP POLICY IF EXISTS "Admin can view all messages" ON messages;
DROP POLICY IF EXISTS "Admin can update messages" ON messages;
DROP POLICY IF EXISTS "Admin can delete messages" ON messages;
DROP POLICY IF EXISTS "Anyone can insert messages" ON messages;

-- Create more permissive policies for admin access
-- Note: In production, you should implement proper authentication checks

-- Appointments policies
CREATE POLICY "Enable all access for appointments" ON appointments
  FOR ALL USING (true) WITH CHECK (true);

-- Messages policies  
CREATE POLICY "Enable all access for messages" ON messages
  FOR ALL USING (true) WITH CHECK (true);

-- Reviews policies (if table exists)
DROP POLICY IF EXISTS "Enable all access for reviews" ON reviews;
CREATE POLICY "Enable all access for reviews" ON reviews
  FOR ALL USING (true) WITH CHECK (true);

-- Grant necessary permissions
GRANT ALL ON appointments TO anon, authenticated;
GRANT ALL ON messages TO anon, authenticated;
GRANT ALL ON reviews TO anon, authenticated;
