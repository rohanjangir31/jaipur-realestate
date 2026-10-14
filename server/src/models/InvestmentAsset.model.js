import mongoose from 'mongoose';
import { JAIPUR_LOCALITIES } from './BuyProperty.model.js';

export const ASSET_CLASSES = [
  'Pre-Leased Commercial',
  'High-Growth Land',
  'Serviced Apartment',
  'Serviced Apartments',
  'Industrial Warehouse',
  'Mixed Use Development',
];

export const RISK_CATEGORIES = [
  'Conservative (Cash Flow)',
  'Moderate (Balanced)',
  'Balanced (Hybrid)',
  'Growth (Capital Appreciation)',
  'Aggressive (High Growth)',
];

export const INVESTMENT_STATUSES = [
  'DRAFT',
  'PENDING_REVIEW',
  'APPROVED',
  'REJECTED',
  'ARCHIVED',
];

const regulatoryDocumentSchema = new mongoose.Schema(
  {
    docName: { type: String, required: true },
    docUrl: { type: String, required: true },
    isPublic: { type: Boolean, default: false },
  },
  { _id: true }
);

const investmentAssetSchema = new mongoose.Schema(
  {
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Asset title is required'],
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: 3000,
    },
    assetClass: {
      type: String,
      required: true,
      enum: ASSET_CLASSES,
      index: true,
    },
    riskCategory: {
      type: String,
      required: true,
      enum: RISK_CATEGORIES,
      index: true,
    },
    locality: {
      type: String,
      required: true,
      enum: JAIPUR_LOCALITIES,
      index: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    pinCode: {
      type: String,
      required: true,
      match: [/^[1-9][0-9]{5}$/, 'Valid 6-digit PIN code required'],
    },

    // Verified Financial Metrics (Historical Actuals / Lease Terms — No Guaranteed Return Claims)
    entryTicketSizeINR: {
      type: Number,
      required: [true, 'Minimum investment ticket size is required'],
      min: 500000,
      index: true,
    },
    totalAssetValueINR: {
      type: Number,
      required: true,
      min: 500000,
    },
    historicalRentalYieldPct: {
      type: Number,
      default: null,
      min: 0,
      max: 20,
    },
    lastRentalYieldYear: {
      type: String,
      default: '',
    },

    // Lease Terms (For pre-leased commercial assets)
    currentTenantProfile: {
      type: String,
      default: '',
      trim: true,
    },
    leaseRegistered: {
      type: Boolean,
      default: false,
    },
    leaseRemainingMonths: {
      type: Number,
      default: 0,
    },
    lockInPeriodMonths: {
      type: Number,
      default: 0,
    },
    annualEscalationPct: {
      type: Number,
      default: 0,
    },

    // Legal & Approvals Verification
    jdaApproved: {
      type: Boolean,
      default: false,
    },
    reraRegistered: {
      type: Boolean,
      default: false,
    },
    reraId: {
      type: String,
      default: '',
      trim: true,
    },
    titleVerified: {
      type: Boolean,
      default: false,
    },
    ownershipType: {
      type: String,
      enum: ['Freehold', 'JDA Approved Leasehold', 'Patta', 'Industrial Lease'],
      default: 'Freehold',
    },
    regulatoryDocuments: [regulatoryDocumentSchema],

    // Media
    coverImageUrl: {
      type: String,
      required: [true, 'Cover image is required'],
    },
    galleryImageUrls: {
      type: [String],
      default: [],
    },

    // Moderation
    status: {
      type: String,
      enum: INVESTMENT_STATUSES,
      default: 'PENDING_REVIEW',
      index: true,
    },
    rejectionReason: {
      type: String,
      default: '',
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const InvestmentAsset = mongoose.model('InvestmentAsset', investmentAssetSchema);
