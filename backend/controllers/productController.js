import Product from '../models/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    fetch all products
// @route   GET /api/products
// @access  public
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// @desc    fetch single product by ID
// @route   GET /api/products/:id
// @access  public
export const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error('Resource Not Found');
  }
});
