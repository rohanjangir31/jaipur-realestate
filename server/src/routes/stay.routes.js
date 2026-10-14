import { Router } from 'express';
import {
  getStays,
  getStayById,
  createStay,
  getMyStays,
  updateStay,
  addBlockedDateRange,
  removeBlockedDateRange,
} from '../controllers/stay.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createStayListingSchema,
  updateStayListingSchema,
  blockDatesSchema,
} from '../validators/stay.validators.js';

const router = Router();

// Public routes
router.get('/', getStays);
router.get('/my/listings', authenticate, requireRole('host', 'agent', 'admin', 'super_admin'), getMyStays);
router.get('/:id', getStayById);

// Host routes
router.post(
  '/',
  authenticate,
  requireRole('host', 'agent', 'admin', 'super_admin'),
  validate(createStayListingSchema),
  createStay
);

router.patch(
  '/:id',
  authenticate,
  requireRole('host', 'agent', 'admin', 'super_admin'),
  validate(updateStayListingSchema),
  updateStay
);

router.post(
  '/:id/blocked-dates',
  authenticate,
  requireRole('host', 'agent', 'admin', 'super_admin'),
  validate(blockDatesSchema),
  addBlockedDateRange
);

router.delete(
  '/:id/blocked-dates/:rangeId',
  authenticate,
  requireRole('host', 'agent', 'admin', 'super_admin'),
  removeBlockedDateRange
);

export default router;
