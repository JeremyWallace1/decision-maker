-- Drop and recreate polls table

DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_type VARCHAR(50) NOT NULL,
  creator_email VARCHAR(255) NOT NULL,
  question VARCHAR(255) NOT NULL,
  image TEXT,
  description TEXT,
  results_url VARCHAR(255) NOT NULL,
  sharing_url VARCHAR(255) NOT NULL
);
