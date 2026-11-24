
import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from './env.js';

const { Pool } = pg;

// Create a PostgreSQL connection pool
export const pool = new Pool({
    connectionString: env.DATABASE_URL
});

// Initialize Drizzle ORM
export const db = drizzle(pool);
