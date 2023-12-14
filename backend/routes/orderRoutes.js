import { Router } from 'express';
const router = Router();

import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from '../controllers/orderController.js';

import { protect } from '../middleware/authMiddleware.js';

router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

export default router;
