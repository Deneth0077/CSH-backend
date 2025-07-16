import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  updateProductStock
} from '../controllers/productController.js';

const router = express.Router();

// Product routes
router.route('/')
  .get(getProducts)
  .post(createProduct);

router.route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

router.route('/:id/stock')
  .patch(updateProductStock);

router.route('/category/:categoryId')
  .get(getProductsByCategory);

export default router;