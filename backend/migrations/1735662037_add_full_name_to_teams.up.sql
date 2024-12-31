-- Write your up sql migration here
ALTER TABLE teams
ADD COLUMN full_name TEXT NOT NULL;
