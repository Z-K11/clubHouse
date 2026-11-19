import links from '../data/links.js';

//Render sign up page
const getRegistration = (req, res) => {
  res.render('forms/register', { title: 'Sign-Up', links: links });
};

export { getRegistration };
