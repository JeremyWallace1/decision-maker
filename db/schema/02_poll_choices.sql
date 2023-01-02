-- Drop and recreate poll_choices table

DROP TABLE IF EXISTS poll_choices CASCADE;
CREATE TABLE poll_choices (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  image TEXT,
  description TEXT
);
