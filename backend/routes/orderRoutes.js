import { Router } from 'express';
const router = Router();

import {
  createOrder,
  getOrderById,
  getMyOrders,
} from '../controllers/orderController.js';

import { protect } from '../middleware/authMiddleware.js';

router.post('/', protect, createOrder);
router.post('/:id', protect, getOrderById);
router.get('/my-orders', protect, getMyOrders);

export default router;
