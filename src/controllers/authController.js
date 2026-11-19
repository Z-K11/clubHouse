import links from '../data/links.js';
import { validationResult, matchedData } from 'express-validator';
import { validateRegistration } from '../config/validator.js';

const baseRegisterObject = { title: 'Sign-Up', links: links };

//Render sign up page
const getRegistration = (req, res) => {
  res.render('forms/register', baseRegisterObject);
};

const postRegistration = [
  validateRegistration,
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      return res.status(400).render('forms/register', {
        title: 'Sign-Up',
        links: links,
        errorData: errors.array(),
      });
    }
  },
];

export { getRegistration, postRegistration };
