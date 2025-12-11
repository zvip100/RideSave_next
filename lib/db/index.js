import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
const { Pool } = pg;

const DATABASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : process.env.DATABASE_PUBLIC_URL;

if (!DATABASE_URL) {
  throw new Error(
    'DATABASE_URL or DATABASE_PUBLIC_URL environment variable is required'
  );
}

// Set timezone to New York (America/New_York) which handles DST automatically
const connectionString = DATABASE_URL.includes('?')
  ? `${DATABASE_URL}&options=-c timezone=America/New_York`
  : `${DATABASE_URL}?options=-c timezone=America/New_York`;

const pool = new Pool({
  connectionString,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});

export const db = drizzle(pool);


