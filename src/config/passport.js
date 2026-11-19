import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import * as query from '../db/query.js';
import * as validator from '../config/encrypter.js';

const origin = `Error: file origins at ${(import.meta.dirname, import.meta.filename)}`;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const response = await query.getUser(username);
      if (!response.ok) {
        return done(null, false, { message: response.msg });
      }
      const user = response.user;
      if (!(await validator.verify(password, user.password))) {
        return done(null, false, { message: 'Password is incorrect' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const response = await query.getById(userId);
    if (!response.ok) {
      return done(null, false, { message: response.message });
    }
    return done(null, response.user);
  } catch (err) {
    console.log(origin);
    return done(err);
  }
});

export default passport;
