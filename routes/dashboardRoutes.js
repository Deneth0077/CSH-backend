import express from 'express';
import {
  getDashboardStats,
  getRecentOrders,
  getSalesAnalytics
} from '../controllers/dashboardController.js';

const router = express.Router();

// Dashboard routes
router.route('/stats')
  .get(getDashboardStats);

router.route('/recent-orders')
  .get(getRecentOrders);

router.route('/analytics')
  .get(getSalesAnalytics);

export default router;