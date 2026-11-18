import { Pool } from 'pg';
import path from 'node:path';
import { loadEnvFile } from 'node:process';

// load env
loadEnvFile(path.join(import.meta.dirname, '../data.env'));
const db = new Pool({ connectionString: process.env.db_url });

export default db;
