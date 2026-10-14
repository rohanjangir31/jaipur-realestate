import { Router } from 'express';
import authRoutes from './auth.routes.js';
import buyRoutes from './buy.routes.js';
import stayRoutes from './stay.routes.js';
import investRoutes from './invest.routes.js';
import inquiryRoutes from './inquiry.routes.js';
import adminRoutes from './admin.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/buy', buyRoutes);
router.use('/stay', stayRoutes);
router.use('/invest', investRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/admin', adminRoutes);

export default router;
