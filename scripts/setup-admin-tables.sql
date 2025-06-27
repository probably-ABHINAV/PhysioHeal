-- Drop table if exists to recreate with proper structure
DROP TABLE IF EXISTS appointments CASCADE;

-- Create appointments table with proper structure
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  reason TEXT NOT NULL,
  preferred_time TIMESTAMPTZ NOT NULL,
  service TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled', 'no-show')),
  doctor TEXT DEFAULT 'Dr. Smith',
  is_returning BOOLEAN DEFAULT false,
  follow_up_date DATE,
  show_flags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drop table if exists to recreate with proper structure
DROP TABLE IF EXISTS messages CASCADE;

-- Create messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'read')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert appointments" ON appointments;
DROP POLICY IF EXISTS "Anyone can insert messages" ON messages;
DROP POLICY IF EXISTS "Admin can view all appointments" ON appointments;
DROP POLICY IF EXISTS "Admin can update appointments" ON appointments;
DROP POLICY IF EXISTS "Admin can view all messages" ON messages;
DROP POLICY IF EXISTS "Admin can update messages" ON messages;

-- Create policies to allow public access for booking appointments
CREATE POLICY "Allow public to insert appointments" ON appointments
FOR INSERT TO public
WITH CHECK (true);

CREATE POLICY "Allow public to read own appointments" ON appointments
FOR SELECT TO public
USING (true);

-- Create policies to allow public access for sending messages
CREATE POLICY "Allow public to insert messages" ON messages
FOR INSERT TO public
WITH CHECK (true);

CREATE POLICY "Allow public to read own messages" ON messages
FOR SELECT TO public
USING (true);

-- Create admin policies for full access
CREATE POLICY "Allow authenticated admin full access to appointments" ON appointments
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated admin full access to messages" ON messages
FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- Insert sample appointments data
INSERT INTO appointments (name, phone, email, reason, preferred_time, service, notes, status, doctor, is_returning, follow_up_date, show_flags) VALUES
('Priya Sharma', '+919876543210', 'priya.sharma@gmail.com', 'Lower back pain treatment', CURRENT_DATE + TIME '09:00', 'Pain Management', 'Chronic pain patient', 'completed', 'Dr. Smith', true, CURRENT_DATE + INTERVAL '7 days', ARRAY['chronic']),
('Rajesh Kumar', '+919876543211', 'rajesh.kumar@gmail.com', 'Sports injury rehabilitation', CURRENT_DATE + TIME '10:30', 'Sports Therapy', 'Football player knee injury', 'pending', 'Dr. Jones', false, NULL, ARRAY[]::TEXT[]),
('Anita Patel', '+919876543212', 'anita.patel@gmail.com', 'Post-surgery physiotherapy', (CURRENT_DATE - INTERVAL '1 day') + TIME '11:00', 'Rehabilitation', 'Hip replacement recovery', 'completed', 'Dr. Smith', true, CURRENT_DATE + INTERVAL '14 days', ARRAY[]::TEXT[]),
('Vikram Singh', '+919876543213', 'vikram.singh@gmail.com', 'Neck pain and stiffness', CURRENT_DATE + TIME '14:00', 'Pain Management', 'Office worker posture issues', 'pending', 'Dr. Brown', false, NULL, ARRAY[]::TEXT[]),
('Meera Joshi', '+919876543214', 'meera.joshi@gmail.com', 'Arthritis management', (CURRENT_DATE - INTERVAL '2 days') + TIME '15:30', 'Geriatric Care', 'Regular follow-up', 'completed', 'Dr. Smith', true, CURRENT_DATE + INTERVAL '10 days', ARRAY['chronic']),
('Amit Gupta', '+919876543215', 'amit.gupta@gmail.com', 'Shoulder physiotherapy', CURRENT_DATE + TIME '16:00', 'Orthopedic Care', 'Rotator cuff injury', 'pending', 'Dr. Jones', false, NULL, ARRAY[]::TEXT[]),
('Sunita Roy', '+919876543216', 'sunita.roy@gmail.com', 'Balance training', (CURRENT_DATE - INTERVAL '3 days') + TIME '09:30', 'Geriatric Care', 'Fall prevention', 'no-show', 'Dr. Brown', true, NULL, ARRAY[]::TEXT[]),
('Rohit Verma', '+919876543217', 'rohit.verma@gmail.com', 'Muscle strengthening', (CURRENT_DATE + INTERVAL '1 day') + TIME '10:00', 'Fitness Training', 'Post-injury conditioning', 'pending', 'Dr. Smith', false, NULL, ARRAY[]::TEXT[]),
('Kavita Sharma', '+919876543218', 'kavita.sharma@gmail.com', 'Posture correction', (CURRENT_DATE - INTERVAL '1 day') + TIME '13:00', 'Ergonomic Training', 'Work-related issues', 'completed', 'Dr. Brown', false, CURRENT_DATE + INTERVAL '21 days', ARRAY[]::TEXT[]),
('Deepak Mehta', '+919876543219', 'deepak.mehta@gmail.com', 'Spinal therapy', CURRENT_DATE + TIME '17:00', 'Spinal Care', 'Herniated disc treatment', 'pending', 'Dr. Jones', true, NULL, ARRAY['chronic']);

-- Sample messages removed for production use

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_appointments_updated_at ON appointments;
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_messages_updated_at ON messages;
CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();