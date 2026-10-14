import mongoose from 'mongoose';
import { JAIPUR_LOCALITIES } from './BuyProperty.model.js';

export const STAY_TYPES = [
  'Heritage Haveli',
  'Boutique Homestay',
  'Luxury Villa',
  'Studio Apartment',
  'Guesthouse',
  'Service Apartment',
  'Serviced Apartment',
];

export const STAY_STATUSES = [
  'DRAFT',
  'PENDING_REVIEW',
  'APPROVED',
  'REJECTED',
  'ARCHIVED',
];

const blockedDateRangeSchema = new mongoose.Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, default: 'Reserved / Unavailable' },
  },
  { _id: true }
);

const nearbyAttractionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    distanceKm: { type: Number, required: true },
  },
  { _id: false }
);

const stayListingSchema = new mongoose.Schema(
  {
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Stay title is required'],
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: 3000,
    },
    stayType: {
      type: String,
      required: true,
      enum: STAY_TYPES,
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
    landmark: {
      type: String,
      trim: true,
      default: '',
    },
    pinCode: {
      type: String,
      required: true,
      match: [/^[1-9][0-9]{5}$/, 'Valid 6-digit PIN code required'],
    },
    nearbyAttractions: [nearbyAttractionSchema],

    // Capacity & Rooms
    maxGuests: {
      type: Number,
      required: true,
      min: 1,
      max: 50,
      index: true,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    beds: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    // Pricing (INR)
    basePricePerNight: {
      type: Number,
      required: true,
      min: 500,
      index: true,
    },
    weekendPriceMultiplier: {
      type: Number,
      default: 1.0,
      min: 1.0,
      max: 2.5,
    },
    cleaningFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    securityDeposit: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Rules & Availability
    minNights: {
      type: Number,
      default: 1,
      min: 1,
    },
    maxNights: {
      type: Number,
      default: 30,
      min: 1,
    },
    checkInTime: {
      type: String,
      default: '14:00',
    },
    checkOutTime: {
      type: String,
      default: '11:00',
    },
    blockedDateRanges: [blockedDateRangeSchema],

    // Amenities
    amenities: {
      type: [String],
      default: [],
    },

    // House Rules
    petsAllowed: { type: Boolean, default: false },
    smokingAllowed: { type: Boolean, default: false },
    partiesAllowed: { type: Boolean, default: false },

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
      enum: STAY_STATUSES,
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

export const StayListing = mongoose.model('StayListing', stayListingSchema);
