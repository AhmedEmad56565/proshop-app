import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import getResponse from '../utils/userRespnse.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePasswords(password))) {
    generateToken(res, user._id);
    getResponse(res, user);
  } else {
    res.status(401);
    throw new Error('Invalid email or password!');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    res.status(400);
    throw new Error('User already exists');
  } else {
    const user = await User.create({ name, email, password });

    if (user) {
      generateToken(res, user._id);
      getResponse(res, user, 201);
    } else {
      res.status(400);
      throw new Error('User data invalid');
    }
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully.' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    getResponse(res, user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    getResponse(res, updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res, next) => {});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res, next) => {});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res, next) => {});

// @desc    Update user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {});
