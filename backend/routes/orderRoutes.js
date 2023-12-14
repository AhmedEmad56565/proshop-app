import { Router } from 'express';
const router = Router();

import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/orderController.js';

import { admin, protect } from '../middleware/authMiddleware.js';

// router.post('/', protect, createOrder);
router.route('/').post(protect, createOrder).get(protect, admin, getOrders);
router.get('/my-orders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

export default router;
