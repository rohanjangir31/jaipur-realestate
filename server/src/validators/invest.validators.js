import { z } from 'zod';
import { JAIPUR_LOCALITIES } from '../models/BuyProperty.model.js';
import { ASSET_CLASSES, RISK_CATEGORIES } from '../models/InvestmentAsset.model.js';

export const createInvestmentAssetSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(150),
  description: z.string().min(20, 'Description must be at least 20 characters').max(3000),
  assetClass: z.enum(ASSET_CLASSES),
  riskCategory: z.enum(RISK_CATEGORIES),
  locality: z.enum(JAIPUR_LOCALITIES),
  address: z.string().min(5, 'Address is required'),
  pinCode: z.string().regex(/^[1-9][0-9]{5}$/, 'Valid 6-digit PIN code required'),
  entryTicketSizeINR: z.coerce.number().min(500000, 'Minimum ticket size is ₹5 Lakh'),
  totalAssetValueINR: z.coerce.number().min(500000),
  historicalRentalYieldPct: z.coerce.number().min(0).max(20).optional().nullable(),
  lastRentalYieldYear: z.string().optional().default(''),
  currentTenantProfile: z.string().optional().default(''),
  leaseRegistered: z.boolean().default(false),
  leaseRemainingMonths: z.coerce.number().min(0).default(0),
  lockInPeriodMonths: z.coerce.number().min(0).default(0),
  annualEscalationPct: z.coerce.number().min(0).default(0),
  jdaApproved: z.boolean().default(false),
  reraRegistered: z.boolean().default(false),
  reraId: z.string().optional().default(''),
  ownershipType: z.enum(['Freehold', 'JDA Approved Leasehold', 'Patta', 'Industrial Lease']).default('Freehold'),
  coverImageUrl: z.string().url('Cover image must be a valid URL'),
  galleryImageUrls: z.array(z.string().url()).optional().default([]),
});

export const updateInvestmentAssetSchema = createInvestmentAssetSchema.partial();

export const investorCriteriaSchema = z.object({
  budgetMinINR: z.coerce.number().min(500000, 'Minimum budget must be at least ₹5 Lakh'),
  budgetMaxINR: z.coerce.number().min(500000, 'Maximum budget must be at least ₹5 Lakh'),
  preferredAssetClasses: z.array(z.enum(ASSET_CLASSES)).min(1, 'Select at least one preferred asset category'),
  preferredLocalities: z.array(z.string()).optional().default([]),
  riskAppetite: z.enum(RISK_CATEGORIES),
  investmentHorizonYears: z.coerce.number().min(1).max(20).default(3),
  status: z.enum(['ACTIVE', 'PAUSED', 'CLOSED']).optional().default('ACTIVE'),
}).refine((data) => data.budgetMaxINR >= data.budgetMinINR, {
  message: 'Maximum budget must be greater than or equal to minimum budget',
  path: ['budgetMaxINR'],
});

export const reviewInvestmentAssetSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED', 'ARCHIVED']),
  rejectionReason: z.string().optional().default(''),
  titleVerified: z.boolean().optional(),
});
