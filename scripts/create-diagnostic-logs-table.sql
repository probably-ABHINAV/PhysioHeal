
-- Create diagnostic_logs table for storing diagnostic test results
CREATE TABLE IF NOT EXISTS diagnostic_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  run_status TEXT NOT NULL CHECK (run_status IN ('pass', 'fail', 'warning')),
  test_name TEXT NOT NULL,
  ip_address TEXT,
  platform TEXT,
  logs JSONB NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_diagnostic_logs_timestamp ON diagnostic_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_diagnostic_logs_status ON diagnostic_logs(run_status);
CREATE INDEX IF NOT EXISTS idx_diagnostic_logs_test_name ON diagnostic_logs(test_name);

-- Create RLS policies for security
ALTER TABLE diagnostic_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users with admin/doctor role to read logs
CREATE POLICY "Allow admin/doctor to read diagnostic logs" ON diagnostic_logs
  FOR SELECT
  USING (
    auth.role() = 'authenticated' AND
    (
      (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin' OR
      (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'doctor'
    )
  );

-- Policy: Allow system to insert diagnostic logs
CREATE POLICY "Allow system to insert diagnostic logs" ON diagnostic_logs
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow admin to update diagnostic logs
CREATE POLICY "Allow admin to update diagnostic logs" ON diagnostic_logs
  FOR UPDATE
  USING (
    auth.role() = 'authenticated' AND
    (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin'
  );

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_diagnostic_logs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS trigger_update_diagnostic_logs_updated_at ON diagnostic_logs;
CREATE TRIGGER trigger_update_diagnostic_logs_updated_at
  BEFORE UPDATE ON diagnostic_logs
  FOR EACH ROW
  EXECUTE FUNCTION update_diagnostic_logs_updated_at();

-- Sample diagnostic log removed for production use
