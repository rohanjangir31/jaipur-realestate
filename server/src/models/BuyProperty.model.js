import mongoose from 'mongoose';

export const JAIPUR_LOCALITIES = [
  'Vaishali Nagar',
  'Malviya Nagar',
  'Mansarovar',
  'Jagatpura',
  'C-Scheme',
  'Raja Park',
  'Ajmer Road',
  'Tonk Road',
  'Pratap Nagar',
  'Murlipura',
  'Sitapura',
  'Sanganer',
  'Jhotwara',
  'Shyam Nagar',
  'Adarsh Nagar',
  'Civil Lines',
  'Bani Park',
  'Pink City (Walled City)',
  'Gopalpura',
  'Durgapura',
  'Other',
];

export const PROPERTY_TYPES = [
  'Apartment/Flat',
  'Independent House/Villa',
  'Builder Floor',
  'Plot/Land',
  'Commercial Office/Shop',
  'Commercial Showroom',
  'Penthouse',
];

export const BUY_STATUSES = [
  'DRAFT',
  'PENDING_REVIEW',
  'APPROVED',
  'REJECTED',
  'SOLD',
  'ARCHIVED',
];

const buyPropertySchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: 3000,
    },
    locality: {
      type: String,
      required: [true, 'Jaipur locality is required'],
      enum: JAIPUR_LOCALITIES,
      index: true,
    },
    address: {
      type: String,
      required: [true, 'Detailed address is required'],
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
    propertyType: {
      type: String,
      required: true,
      enum: PROPERTY_TYPES,
      index: true,
    },
    transactionType: {
      type: String,
      enum: ['Resale', 'New Construction', 'New Booking'],
      default: 'Resale',
    },
    facing: {
      type: String,
      enum: ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'],
      default: 'East',
    },
    bhk: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
      index: true,
    },
    bathrooms: {
      type: Number,
      default: 1,
      min: 0,
    },
    balconies: {
      type: Number,
      default: 0,
      min: 0,
    },
    floor: {
      type: Number,
      default: 0,
    },
    totalFloors: {
      type: Number,
      default: 1,
    },
    parkingSlots: {
      type: Number,
      default: 0,
    },
    superAreaSqFt: {
      type: Number,
      required: true,
      min: 50,
    },
    carpetAreaSqFt: {
      type: Number,
      min: 50,
      default: null,
    },
    plotAreaSqYd: {
      type: Number,
      default: null,
    },
    possessionStatus: {
      type: String,
      enum: ['Ready to Move', 'Under Construction'],
      default: 'Ready to Move',
    },
    possessionDate: {
      type: Date,
      default: null,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 100000,
      index: true,
    },
    pricePerSqFt: {
      type: Number,
      default: null,
    },
    maintenanceMonthly: {
      type: Number,
      default: 0,
    },
    isNegotiable: {
      type: Boolean,
      default: false,
    },
    ownershipType: {
      type: String,
      enum: ['Freehold', 'JDA Approved Leasehold', 'Patta', 'Other'],
      default: 'Freehold',
    },
    reraRegistered: {
      type: Boolean,
      default: false,
      index: true,
    },
    reraId: {
      type: String,
      trim: true,
      default: '',
    },
    titleVerified: {
      type: Boolean,
      default: false,
    },
    coverImageUrl: {
      type: String,
      required: [true, 'Main cover image is required'],
    },
    galleryImageUrls: {
      type: [String],
      default: [],
    },
    floorPlanUrl: {
      type: String,
      default: '',
    },
    amenities: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: BUY_STATUSES,
      default: 'PENDING_REVIEW',
      index: true,
    },
    rejectionReason: {
      type: String,
      default: '',
    },
    reviewedBy: {
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

buyPropertySchema.pre('save', function (next) {
  if (this.price && this.superAreaSqFt) {
    this.pricePerSqFt = Math.round(this.price / this.superAreaSqFt);
  }
  next();
});

export const BuyProperty = mongoose.model('BuyProperty', buyPropertySchema);
