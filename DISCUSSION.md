Committed a bit more time to this assignment for the following reasons:

1. Simple UI is too simple -- while there's only so much that can get done in a couple of hours, I wanted to be able to showcase that data manipulation can be painted in different ways (in this case, either by a grid-card style, or by tables)
2. I wanted to move away from pulling in all the data at once and filtering on the frontend by that by the search term. This is not a typical use-case in production applications. In a scenario such as this, we may only pull in the first ten or twenty or so records, depending on the application setup for pagination. By setting up a simple ts_vector store, we can practice against asynchronous look-ups, and how to optimize such.

Frontend:
 • Abstracts API call and search functionality into their own hooks -- this breaks down logic into smaller parts and tucks away the implementation detail away from the parent
 • By having a reliable data set, we can show the data into two different views; searching against such shouldn't change any behavior from a data perspective

 Backend:
 • While I'm not entirely familiar with Drizzle (in my cases, raw sql with Liquibase or Kysely), I wanted to showcase the usage of migration files. It's not common for a singular schema file to work across one table in Postgres, especially with more advanced use-cases when querying against a table with ts_vector. I wanted to not use `ILIKE` against all tables, as there are performance optimization implications there.
 • One drawback: fuzzy searching doesn't work great (needs to match an exact word) and requires more complex indexing logic (more time to implement this solution!). But hopefully this was enough to show the importance of being cognizant of db performance.
