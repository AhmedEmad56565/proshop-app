import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddlware.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/products', productRoutes);

app.use('*', notFound);
app.use(errorHandler);

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`App is running at port ${process.env.PORT}`);
});
