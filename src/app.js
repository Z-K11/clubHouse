import express from 'express';
import path from 'node:path';
import { loadEnvFile } from 'node:process';

// lod env
loadEnvFile(path.join(import.meta.dirname, 'data.env'));

const app = express();

//set up ejs

app.set('views', path.join(import.meta.dirname, 'views'));
app.set('view engine', 'ejs');

//set up express parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => {
  res.send('Hello');
});

app.listen(process.env.port || 8080, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running on port:${process.env.port || 8080}`);
});
