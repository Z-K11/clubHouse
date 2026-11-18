import express from 'express';
import path from 'node:path';
import { loadEnvFile } from 'node:process';
import session from 'express-session';
import sessionStore from './config/storeSession.js';

//importing routers
import indexRouter from './routers/indexRouter.js';

// lod env
loadEnvFile(path.join(import.meta.dirname, 'data.env'));

const app = express();

//set up ejs

app.set('views', path.join(import.meta.dirname, 'views'));
app.set('view engine', 'ejs');

//set up express parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import static files to express
app.use(express.static(path.join(import.meta.dirname, '../public')));

//set up session store
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    secret: process.env.SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

//set up routers
app.use('/', indexRouter);

app.listen(process.env.PORT || 8080, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running on port:${process.env.PORT || 8080}`);
});
