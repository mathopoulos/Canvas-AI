// Importing the required module from 'pg' package
import pg from 'pg';

// Destructuring the Pool class from 'pg' for creating a connection pool
const { Pool } = pg;

// Setting up the configuration for the PostgreSQL connection pool
const pool = new Pool({
  user: 'neon',
  host: process.env['PGHOST'],
  database: 'neondb',
  password: process.env['PGPASSWORD'],
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Exporting the pool so it can be used elsewhere in the application
export default pool;
