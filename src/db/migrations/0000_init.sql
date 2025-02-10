CREATE TABLE IF NOT EXISTS "advocates" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"city" text NOT NULL,
	"degree" text NOT NULL,
	"payload" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"years_of_experience" integer NOT NULL,
	"phone_number" bigint NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"search_vector" "tsvector"
);

UPDATE advocates
SET search_vector =
  setweight(to_tsvector('english', COALESCE(first_name, '')), 'A') ||
  setweight(to_tsvector('english', COALESCE(last_name, '')), 'A') ||
  setweight(to_tsvector('english', COALESCE(city, '')), 'B') ||
  setweight(to_tsvector('english', COALESCE(degree, '')), 'B') ||
  setweight(to_tsvector('english', COALESCE(payload::text, '')), 'C') ||
  setweight(to_tsvector('english', COALESCE(years_of_experience::text, '')), 'C') ||
  setweight(to_tsvector('english', COALESCE(phone_number::text, '')), 'C');

CREATE INDEX IF NOT EXISTS advocates_search_idx
ON advocates USING GIN (search_vector);

CREATE OR REPLACE FUNCTION update_advocates_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.first_name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.last_name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.city, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.degree, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.payload::text, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(NEW.years_of_experience::text, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(NEW.phone_number::text, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS advocates_searchvector_update ON advocates;

CREATE TRIGGER advocates_searchvector_update
BEFORE INSERT OR UPDATE ON advocates
FOR EACH ROW
EXECUTE FUNCTION update_advocates_search_vector();
