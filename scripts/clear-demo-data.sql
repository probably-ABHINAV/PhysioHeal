
-- Clear demo/test data from the database
-- Run this to clean up any sample appointments or test entries

-- Delete test appointments (those with 'test' or 'demo' in name or email)
DELETE FROM appointments 
WHERE 
  LOWER(name) LIKE '%test%' 
  OR LOWER(name) LIKE '%demo%'
  OR LOWER(email) LIKE '%test%'
  OR LOWER(email) LIKE '%demo%'
  OR LOWER(notes) LIKE '%diagnostic%'
  OR LOWER(notes) LIKE '%sample%';

-- Delete test reviews
DELETE FROM reviews 
WHERE 
  LOWER(name) LIKE '%test%'
  OR LOWER(name) LIKE '%demo%'
  OR LOWER(review_text) LIKE '%sample%';

-- Delete diagnostic test logs
DELETE FROM diagnostic_logs 
WHERE 
  test_name LIKE '%test%'
  OR details LIKE '%diagnostic test%';

-- Reset any auto-increment sequences if needed
-- ALTER SEQUENCE appointments_id_seq RESTART WITH 1;
-- ALTER SEQUENCE reviews_id_seq RESTART WITH 1;

-- Show remaining data counts
SELECT 
  'appointments' as table_name, 
  COUNT(*) as remaining_records 
FROM appointments
UNION ALL
SELECT 
  'reviews' as table_name, 
  COUNT(*) as remaining_records 
FROM reviews;
