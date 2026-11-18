import links from '../data/links.js';
const rootGet = (req, res) => {
  res.render('homePage/index.ejs', { title: 'Home', links: links });
};

export { rootGet };
