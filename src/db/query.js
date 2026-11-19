import db from './pool.js';
const origins = `Error: file origins at ${(import.meta.dirname, import.meta.filename)}`;
import { encryptPassword } from '../config/encrypter.js';

const insertUser = async (f_name, l_name, userName, password) => {
  try {
    const hash = await encryptPassword(password);
    const row = await db.query(
      `INSERT INTO users(username,password,f_name,
        l_name) VALUES ($1,$2,$3,$4)`,
      [userName, hash, f_name, l_name]
    );
    return row.rowCount >= 1;
  } catch (err) {
    console.log(origins);
    throw err;
  }
};

const getUser = async (username) => {
  try {
    const { rows } = await db.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
    if (!rows[0]) {
      return { ok: false, msg: "user doesn't exist" };
    }
    return { ok: true, user: rows[0] };
  } catch (err) {
    console.log(origins);
    throw err;
  }
};

const getById = async (id) => {
  try {
    const { rows } = await db.query(
      `SELECT id,username FROM users WHERE id = $1`,
      [id]
    );
    if (!rows[0]) return { ok: false, message: 'No use found' };
    return { ok: true, user: rows[0] };
  } catch (err) {
    console.log(origins);
    throw err;
  }
};
export { insertUser, getUser, getById };
