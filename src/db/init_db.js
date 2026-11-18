import { Client } from 'pg';
import path from 'node:path';
import { loadEnvFile } from 'node:process';

//importing env

loadEnvFile(path.join(import.meta.dirname, '../data.env'));

const databaseInitializer = async () => {
  let inTransaction = false;
  console.log('Setting up tables for the app');
  const db = new Client({ connectionString: process.env.DB_URL });
  //open a new connection to the database
  try {
    await db.connect();

    //initiate transaction
    await db.query('BEGIN');
    inTransaction = true;
    await db.query(`CREATE TABLE IF NOT EXISTS users(id INT PRIMARY KEY GENERATED ALWAYS
    AS IDENTITY ,username VARCHAR(255) NOT NULL ,password VARCHAR(255) NOT NULL
    ,f_name VARCHAR(255) NOT NULL, l_name VARCHAR(255) NOT NULL,
     access VARCHAR(4) NOT NULL DEFAULT 'user');`);
    await db.query(`CREATE TABLE IF NOT EXISTS post_board(id INT PRIMARY KEY GENERATED
         ALWAYS AS IDENTITY ,title VARCHAR(100) NOT NULL,message TEXT NOT NULL,
         author_id INT NOT NULL REFERENCES users(id),created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW())`);
    await db.query(`COMMIT`);
  } catch (err) {
    console.error(err);
    if (inTransaction) await db.query(`ROLLBACK`);
  } finally {
    await db.end();
  }
};
databaseInitializer();
