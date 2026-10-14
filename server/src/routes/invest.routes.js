import { Router } from 'express';
import {
  getInvestmentAssets,
  getInvestmentAssetById,
  createInvestmentAsset,
  saveCriteria,
  getMyCriteria,
  getMatches,
} from '../controllers/invest.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/rbac.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createInvestmentAssetSchema,
  investorCriteriaSchema,
} from '../validators/invest.validators.js';

const router = Router();

// Public asset catalog
router.get('/', getInvestmentAssets);
router.get('/assets', getInvestmentAssets);
router.get('/assets/:id', getInvestmentAssetById);

// Investor criteria & transparent matches
router.post(
  '/criteria',
  authenticate,
  validate(investorCriteriaSchema),
  saveCriteria
);
router.get('/criteria', authenticate, getMyCriteria);
router.get('/matches', authenticate, getMatches);

// Submit asset (owner, agent, admin)
router.post(
  '/assets',
  authenticate,
  requireRole('owner', 'agent', 'investor', 'admin', 'super_admin'),
  validate(createInvestmentAssetSchema),
  createInvestmentAsset
);

export default router;
