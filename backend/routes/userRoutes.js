import { Router } from 'express';
const router = Router();

import {
  authUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;