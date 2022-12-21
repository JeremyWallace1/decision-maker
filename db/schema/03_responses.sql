-- Drop and recreate responses table

DROP TABLE IF EXISTS responses CASCADE;
CREATE TABLE responses (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  choice_id INTEGER REFERENCES poll_choices(id) ON DELETE CASCADE,
  respondent_ip VARCHAR(50) NOT NULL,
  rank_score INTEGER CONSTRAINT valid_rank_score CHECK(rank_score >= 0) DEFAULT 0
);
