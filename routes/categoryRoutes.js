import express from 'express';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryTree,
  toggleCategoryStatus
} from '../controllers/categoryController.js';

const router = express.Router();

// Category routes
router.route('/')
  .get(getCategories)
  .post(createCategory);

router.route('/tree')
  .get(getCategoryTree);

router.route('/:id')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

router.route('/:id/toggle')
  .patch(toggleCategoryStatus);

export default router;