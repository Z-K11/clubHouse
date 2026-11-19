import { body } from 'express-validator';
const alphaError = 'can only contain letters';
const lengthError = 'cannot be shorter than 3 characters';

//validation rules for user data
const validateRegistration = [
  body('fName')
    .trim()
    .isAlpha()
    .withMessage(`First Name ${alphaError}`)
    .isLength({ min: 3, max: 10 })
    .withMessage(`First Name ${lengthError}`),
  body('lName')
    .trim()
    .isAlpha()
    .withMessage(`Last Name ${alphaError}`)
    .isLength({ min: 3, max: 10 })
    .withMessage(`Last Name ${lengthError}`),
  body('email').trim().isEmail().withMessage(`Incorrect email`),
  body('pass')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      `Password Must include 1 lowercase & uppercase characters, 1 number and 1 symbol`
    ),
  body('confirm')
    .custom((currentPass, { req }) => currentPass === req.body.pass)
    .withMessage('Passwords do not match'),
];

export { validateRegistration };
