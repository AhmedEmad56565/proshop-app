import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

import products from './data/products.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product._id === id);
  res.json(product);
});

app.listen(process.env.PORT, () => {
  console.log(`App is running at port ${process.env.PORT}`);
});
