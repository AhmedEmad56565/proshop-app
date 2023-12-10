import { Router } from 'express';
const router = Router();

import {
  getAllProducts,
  getProductByID,
} from '../controllers/productController.js';

router.get('/', getAllProducts);

router.get('/:id', getProductByID);

export default router;
