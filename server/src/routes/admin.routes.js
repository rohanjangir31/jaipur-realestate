import { Router } from 'express';
import {
  getPendingListings,
  reviewBuyProperty,
  reviewStayListing,
  reviewInvestmentAsset,
  getAllInquiries,
  updateInquiry,
  getAdminStats,
  getAuditLogs,
  getStaffMembers,
  exportInquiriesCsv,
  exportAuditLogsCsv,
} from '../controllers/admin.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { reviewListingSchema } from '../validators/buy.validators.js';
import { reviewStaySchema } from '../validators/stay.validators.js';
import { reviewInvestmentAssetSchema } from '../validators/invest.validators.js';
import { updateInquiryStatusSchema } from '../validators/inquiry.validators.js';

const router = Router();

// Enforce admin access across all admin routes
router.use(authenticate, requireRole('admin', 'super_admin'));

router.get('/stats', getAdminStats);
router.get('/staff', getStaffMembers);
router.get('/listings/pending', getPendingListings);
router.patch('/listings/buy/:id/review', validate(reviewListingSchema), reviewBuyProperty);
router.patch('/listings/stay/:id/review', validate(reviewStaySchema), reviewStayListing);
router.patch('/listings/invest/:id/review', validate(reviewInvestmentAssetSchema), reviewInvestmentAsset);

router.get('/inquiries/export', exportInquiriesCsv);
router.get('/inquiries', getAllInquiries);
router.patch('/inquiries/:id', validate(updateInquiryStatusSchema), updateInquiry);

router.get('/audit-logs/export', exportAuditLogsCsv);
router.get('/audit-logs', getAuditLogs);

export default router;
