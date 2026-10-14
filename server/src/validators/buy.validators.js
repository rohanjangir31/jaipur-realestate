import { z } from 'zod';
import { JAIPUR_LOCALITIES, PROPERTY_TYPES } from '../models/BuyProperty.model.js';

export const createBuyPropertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(150),
  description: z.string().min(20, 'Description must be at least 20 characters').max(3000),
  locality: z.enum(JAIPUR_LOCALITIES, {
    errorMap: () => ({ message: 'Please select a valid Jaipur locality' }),
  }),
  address: z.string().min(5, 'Address is required'),
  landmark: z.string().optional().default(''),
  pinCode: z.string().regex(/^[1-9][0-9]{5}$/, 'Valid 6-digit PIN code required'),
  propertyType: z.enum(PROPERTY_TYPES, {
    errorMap: () => ({ message: 'Please select a valid property type' }),
  }),
  transactionType: z.enum(['Resale', 'New Construction', 'New Booking']).default('Resale'),
  facing: z.enum(['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West']).default('East'),
  bhk: z.coerce.number().min(0).max(10),
  bathrooms: z.coerce.number().min(0).default(1),
  balconies: z.coerce.number().min(0).default(0),
  floor: z.coerce.number().default(0),
  totalFloors: z.coerce.number().min(1).default(1),
  parkingSlots: z.coerce.number().min(0).default(0),
  superAreaSqFt: z.coerce.number().min(50, 'Super built-up area must be at least 50 sq ft'),
  carpetAreaSqFt: z.coerce.number().min(50).optional().nullable(),
  plotAreaSqYd: z.coerce.number().optional().nullable(),
  possessionStatus: z.enum(['Ready to Move', 'Under Construction']).default('Ready to Move'),
  possessionDate: z.string().optional().nullable(),
  price: z.coerce.number().min(100000, 'Price must be at least ₹1 Lakh'),
  maintenanceMonthly: z.coerce.number().min(0).default(0),
  isNegotiable: z.boolean().default(false),
  ownershipType: z.enum(['Freehold', 'JDA Approved Leasehold', 'Patta', 'Other']).default('Freehold'),
  reraRegistered: z.boolean().default(false),
  reraId: z.string().optional().default(''),
  coverImageUrl: z.string().url('Cover image must be a valid URL'),
  galleryImageUrls: z.array(z.string().url()).optional().default([]),
  floorPlanUrl: z.string().optional().default(''),
  amenities: z.array(z.string()).optional().default([]),
});

export const updateBuyPropertySchema = createBuyPropertySchema.partial();

export const reviewListingSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED', 'ARCHIVED']),
  rejectionReason: z.string().optional().default(''),
  titleVerified: z.boolean().optional(),
});
