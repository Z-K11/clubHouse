import links from '../data/links.js';
import { validationResult, matchedData } from 'express-validator';
import { validateRegistration, validateLogin } from '../config/validator.js';
import * as query from '../db/query.js';
import passport from '../config/passport.js';

const origin = `Error: file path ${(import.meta.dirname, import.meta.filename)}`;
const baseRegisterObject = { title: 'Sign-Up', links: links };

//Render sign up page
const getRegistration = (req, res) => {
  res.render('forms/register', baseRegisterObject);
};

// Register a user
const postRegistration = [
  // validation Rules
  validateRegistration,
  async (req, res, next) => {
    //check for validation errors
    const errors = validationResult(req);

    console.log(errors.array());
    if (!errors.isEmpty()) {
      //render the page with error messages for the user
      return res.status(400).render('forms/register', {
        title: 'Sign-Up',
        links: links,
        errorData: errors.array(),
      });
    }
    //extract user data from the post request
    const { fName, lName, email, pass } = matchedData(req);

    try {
      //query to insert data into the database
      const response = await query.insertUser(fName, lName, email, pass);
      if (!response) {
        return res.status(500).render('forms/register', {
          title: 'Sign-up',
          links: links,
          errors: [{ msg: 'Data-base failed to insert user, retry' }],
        });
      }
      //redirect to root on successful registrations
      res.redirect('/');
    } catch (err) {
      console.log(origin);
      next(err);
    }
  },
];

//render log in page
const getLogIn = (req, res) => {
  res.render('forms/log-in', { title: 'Log-In', links: links });
};

const postLogIn = [
  validateLogin,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('forms/log-in', {
        title: 'Log-in',
        links: links,
        errors: errors.array(),
      });
    }
    next();
  },
  passport.authenticate('local', {
    failureRedirect: '/failed',
    successRedirect: '/',
  }),
];

const failedLogin = (req, res) => {
  res.render('forms/log-in', {
    title: 'Log-In',
    links: links,
    errors: [{ msg: 'Incorrect email or password' }],
  });
};

export { getRegistration, postRegistration, getLogIn, postLogIn, failedLogin };
