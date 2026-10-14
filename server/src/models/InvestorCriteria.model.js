import mongoose from 'mongoose';
import { ASSET_CLASSES, RISK_CATEGORIES } from './InvestmentAsset.model.js';
import { JAIPUR_LOCALITIES } from './BuyProperty.model.js';

const investorCriteriaSchema = new mongoose.Schema(
  {
    investorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    budgetMinINR: {
      type: Number,
      required: true,
      min: 500000,
    },
    budgetMaxINR: {
      type: Number,
      required: true,
      min: 500000,
    },
    preferredAssetClasses: {
      type: [String],
      enum: ASSET_CLASSES,
      default: ['Pre-Leased Commercial'],
    },
    preferredLocalities: {
      type: [String],
      enum: JAIPUR_LOCALITIES,
      default: [],
    },
    riskAppetite: {
      type: String,
      enum: RISK_CATEGORIES,
      default: 'Moderate (Balanced)',
    },
    investmentHorizonYears: {
      type: Number,
      default: 3,
      min: 1,
      max: 20,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'PAUSED', 'CLOSED'],
      default: 'ACTIVE',
    },
    lastMatchRun: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const InvestorCriteria = mongoose.model('InvestorCriteria', investorCriteriaSchema);
