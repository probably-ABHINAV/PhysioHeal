
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table for user management with proper auth integration
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'patient' CHECK (role IN ('admin', 'doctor', 'patient')),
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  reason TEXT NOT NULL,
  preferred_time TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'seen')),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'read')),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Diagnostic logs table
CREATE TABLE IF NOT EXISTS diagnostic_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  test_name TEXT NOT NULL,
  run_status TEXT NOT NULL CHECK (run_status IN ('pass', 'fail', 'warning')),
  logs JSONB,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can view own appointments" ON appointments;
DROP POLICY IF EXISTS "Users can create appointments" ON appointments;
DROP POLICY IF EXISTS "Admins and doctors can view all appointments" ON appointments;
DROP POLICY IF EXISTS "Admins and doctors can update appointments" ON appointments;
DROP POLICY IF EXISTS "Users can view own messages" ON messages;
DROP POLICY IF EXISTS "Anyone can create messages" ON messages;
DROP POLICY IF EXISTS "Admins can view all messages" ON messages;
DROP POLICY IF EXISTS "Public can view approved reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can view approved reviews" ON reviews;
DROP POLICY IF EXISTS "Anyone can insert reviews" ON reviews;
DROP POLICY IF EXISTS "Admin can manage all reviews" ON reviews;
DROP POLICY IF EXISTS "Admins can manage all reviews" ON reviews;
DROP POLICY IF EXISTS "Admins can manage diagnostic logs" ON diagnostic_logs;
DROP POLICY IF EXISTS "Allow all operations on profiles" ON profiles;

-- Production Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Production Appointments policies
CREATE POLICY "Users can view own appointments" ON appointments
  FOR SELECT USING (
    user_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'doctor')
    )
  );

CREATE POLICY "Anyone can create appointments" ON appointments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins and doctors can update appointments" ON appointments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'doctor')
    )
  );

-- Production Messages policies
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (
    user_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Anyone can create messages" ON messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage all messages" ON messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Production Reviews policies
CREATE POLICY "Anyone can view approved reviews" ON reviews
  FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can insert reviews" ON reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage all reviews" ON reviews
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Production Diagnostic logs policies
CREATE POLICY "Admins can manage diagnostic logs" ON diagnostic_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Production function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    CASE 
      WHEN NEW.email = 'xoxogroovy@gmail.com' THEN 'admin'
      ELSE 'patient'
    END,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating updated_at on profiles
DROP TRIGGER IF EXISTS on_profiles_updated ON profiles;
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger for updating updated_at on reviews
DROP TRIGGER IF EXISTS on_reviews_updated ON reviews;
CREATE TRIGGER on_reviews_updated
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(approved);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_diagnostic_logs_user_id ON diagnostic_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_logs_timestamp ON diagnostic_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_diagnostic_logs_run_status ON diagnostic_logs(run_status);

-- Grant necessary permissions for production
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON appointments TO authenticated;
GRANT ALL ON messages TO authenticated;
GRANT ALL ON reviews TO authenticated;
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON diagnostic_logs TO authenticated;
GRANT SELECT ON appointments TO anon;
GRANT INSERT ON appointments TO anon;
GRANT SELECT ON messages TO anon;
GRANT INSERT ON messages TO anon;
GRANT SELECT ON reviews TO anon;
GRANT INSERT ON reviews TO anon;

-- Grant sequence permissions
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Create admin user if running in development
DO $$
BEGIN
  -- This will only work if auth.users exists and we're in a development environment
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'auth' AND table_name = 'users') THEN
    -- Insert admin user only if it doesn't exist
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'xoxogroovy@gmail.com',
      crypt('Cypher123@', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Admin User"}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    )
    ON CONFLICT (email) DO NOTHING;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    -- Ignore errors if auth schema doesn't exist
    NULL;
END $$;

-- Create a view for admin dashboard statistics
CREATE OR REPLACE VIEW admin_stats AS
SELECT 
  (SELECT COUNT(*) FROM appointments WHERE status = 'pending') as pending_appointments,
  (SELECT COUNT(*) FROM appointments WHERE status = 'seen') as completed_appointments,
  (SELECT COUNT(*) FROM messages WHERE status = 'pending') as unread_messages,
  (SELECT COUNT(*) FROM reviews WHERE approved = false) as pending_reviews,
  (SELECT COUNT(*) FROM profiles WHERE role = 'patient') as total_patients,
  (SELECT COUNT(*) FROM appointments WHERE created_at >= CURRENT_DATE) as today_appointments;

-- Grant access to the view
GRANT SELECT ON admin_stats TO authenticated;
