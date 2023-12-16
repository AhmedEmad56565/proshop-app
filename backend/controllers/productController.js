import Product from '../models/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    fetch all products
// @route   GET /api/products
// @access  public
export const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
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

// @desc    Create new product
// @route   POST /api/products
// @access  private/admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
  });

  const createdProduct = await product.save();

  if (createdProduct) {
    res.status(201).json(createdProduct);
  } else {
    res.status(404);
    throw new Error('Product did not created!');
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  private/admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  private/admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Product deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create review
// @route   POST /api/products/:id/reviews
// @access  private
export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewd = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewd) {
      res.status(400);
      throw new Error('You already reviewed this product');
    } else {
      const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added.' });
    }
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete review
// @route   DELETE /api/products/:id/reviews
// @access  private
export const deleteReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.reviews = product.reviews.filter(
      (review) => review.user.toString() !== req.user._id.toString()
    );

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length || 0;

    await product.save();
    res.status(204).json({ message: 'Review deleted.' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.status(200).json(products);
});
