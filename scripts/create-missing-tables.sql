
-- Create diagnostic_logs table if it doesn't exist
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

-- Enable RLS
ALTER TABLE diagnostic_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY IF NOT EXISTS "Allow public insert for diagnostic logs" ON diagnostic_logs
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow public read for diagnostic logs" ON diagnostic_logs
  FOR SELECT
  USING (true);
