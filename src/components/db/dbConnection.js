import pg from 'pg';

const { Pool } = pg;

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

export default pool;
