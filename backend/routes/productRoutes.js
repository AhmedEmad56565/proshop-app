import { Router } from 'express';
const router = Router();

import {
  getAllProducts,
  getProductByID,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').get(getAllProducts).post(protect, admin, createProduct);
router
  .route('/:id')
  .get(getProductByID)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
