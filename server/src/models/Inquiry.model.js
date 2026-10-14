import mongoose from 'mongoose';

export const INQUIRY_TYPES = ['BUY', 'STAY', 'INVEST'];

export const INQUIRY_STATUSES = [
  'NEW',
  'CONTACTED',
  'VISIT_SCHEDULED',
  'PROPOSAL_SENT',
  'IN_NEGOTIATION',
  'CLOSED_WON',
  'CLOSED_LOST',
  'SPAM',
];

const timelineEntrySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: INQUIRY_STATUSES,
      required: true,
    },
    note: {
      type: String,
      trim: true,
      default: '',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const inquirySchema = new mongoose.Schema(
  {
    inquiryType: {
      type: String,
      enum: INQUIRY_TYPES,
      required: true,
      index: true,
    },
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'referenceModel',
      required: true,
      index: true,
    },
    referenceModel: {
      type: String,
      required: true,
      enum: ['BuyProperty', 'StayListing', 'InvestmentAsset'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    contactName: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true,
      maxlength: 100,
    },
    contactEmail: {
      type: String,
      required: [true, 'Contact email is required'],
      trim: true,
      lowercase: true,
    },
    contactPhone: {
      type: String,
      required: [true, 'Contact phone is required'],
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'],
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: '',
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    status: {
      type: String,
      enum: INQUIRY_STATUSES,
      default: 'NEW',
      index: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    followUpDate: {
      type: Date,
      default: null,
    },
    timeline: [timelineEntrySchema],
  },
  {
    timestamps: true,
  }
);

inquirySchema.index({ createdAt: -1 });

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
