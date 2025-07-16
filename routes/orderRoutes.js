import express from 'express';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderStats
} from '../controllers/orderController.js';

const router = express.Router();

// Order routes
router.route('/')
  .get(getOrders)
  .post(createOrder);

router.route('/stats')
  .get(getOrderStats);

router.route('/:id')
  .get(getOrder)
  .put(updateOrder)
  .delete(deleteOrder);

router.route('/:id/status')
  .patch(updateOrderStatus);

export default router;