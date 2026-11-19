import links from '../data/links.js';
import { validationResult, matchedData } from 'express-validator';
import { validateRegistration } from '../config/validator.js';
import * as query from '../db/query.js';

const origin = `Error: file path ${(import.meta.dirname, import.meta.filename)}`;
const baseRegisterObject = { title: 'Sign-Up', links: links };

//Render sign up page
const getRegistration = (req, res) => {
  res.render('forms/register', baseRegisterObject);
};

const postRegistration = [
  validateRegistration,
  async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      return res.status(400).render('forms/register', {
        title: 'Sign-Up',
        links: links,
        errorData: errors.array(),
      });
    }
    const { fName, lName, email, pass } = matchedData(req);
    try {
      const response = await query.insertUser(fName, lName, email, pass);
      if (!response) {
        return res.status(500).render('forms/register', {
          title: 'Sign-up',
          links: links,
          errors: [{ msg: 'Data-base failed to insert user, retry' }],
        });
      }
      res.redirect('/');
    } catch (err) {
      console.log(origin);
      next(err);
    }
  },
];

export { getRegistration, postRegistration };
