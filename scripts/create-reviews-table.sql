-- Create reviews table for storing patient reviews
CREATE TABLE IF NOT EXISTS reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    service VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

-- Insert some sample reviews
INSERT INTO reviews (name, rating, comment, service) VALUES
('Priya Sharma', 5, 'Excellent treatment for my back pain. The physiotherapist was very professional and the results were amazing. Highly recommended!', 'Pain Management'),
('Rajesh Kumar', 5, 'Helped me recover from a sports injury quickly. The personalized treatment plan was exactly what I needed to get back to the field.', 'Sports Injury Recovery'),
('Anita Patel', 5, 'Professional service and caring staff. My knee pain is completely gone after the treatment. Thank you for the excellent care!', 'Orthopedic Care'),
('Vikram Singh', 4, 'Great experience overall. The clinic is well-equipped and the staff is knowledgeable. Would definitely recommend to others.', 'Rehabilitation Therapy'),
('Meera Joshi', 5, 'Amazing results! I was skeptical at first, but the treatment really worked. My mobility has improved significantly.', 'Geriatric Physiotherapy');
