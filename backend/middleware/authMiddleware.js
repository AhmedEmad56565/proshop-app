import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

export const protect = asyncHandler(async function (req, res, next) {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(userId).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export function admin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
}
