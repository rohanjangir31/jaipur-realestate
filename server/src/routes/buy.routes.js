import { Router } from 'express';
import {
  getBuyProperties,
  getBuyPropertyById,
  createBuyProperty,
  getMyListings,
  updateBuyProperty,
} from '../controllers/buy.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createBuyPropertySchema,
  updateBuyPropertySchema,
} from '../validators/buy.validators.js';

const router = Router();

// Public browse & detail
router.get('/', getBuyProperties);
router.get('/my/listings', authenticate, requireRole('owner', 'agent', 'admin', 'super_admin'), getMyListings);
router.get('/:id', getBuyPropertyById);

// Owner submissions
router.post(
  '/',
  authenticate,
  requireRole('owner', 'agent', 'admin', 'super_admin'),
  validate(createBuyPropertySchema),
  createBuyProperty
);

router.patch(
  '/:id',
  authenticate,
  requireRole('owner', 'agent', 'admin', 'super_admin'),
  validate(updateBuyPropertySchema),
  updateBuyProperty
);

export default router;
