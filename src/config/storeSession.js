import db from '../db/pool.js';
import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';

const store = connectPgSimple(session);

const sessionStore = new store({
  pool: db,
  createTableIfMissing: true,
  tableName: 'session',
});

export default sessionStore;
