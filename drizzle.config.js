import { defineConfig } from 'drizzle-kit';

// For local development, use DATABASE_PUBLIC_URL
// Railway's internal DATABASE_URL only works inside Railway infrastructure
const databaseUrl = process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    'DATABASE_PUBLIC_URL, or DATABASE_URL environment variable is required'
  );
}

export default defineConfig({
  schema: './lib/db/schema.js',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
});


