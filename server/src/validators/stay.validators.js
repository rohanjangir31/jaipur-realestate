import { z } from 'zod';
import { JAIPUR_LOCALITIES } from '../models/BuyProperty.model.js';
import { STAY_TYPES } from '../models/StayListing.model.js';

export const createStayListingSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(150),
  description: z.string().min(20, 'Description must be at least 20 characters').max(3000),
  stayType: z.enum(STAY_TYPES, {
    errorMap: () => ({ message: 'Please select a valid stay type' }),
  }),
  locality: z.enum(JAIPUR_LOCALITIES, {
    errorMap: () => ({ message: 'Please select a valid Jaipur locality' }),
  }),
  address: z.string().min(5, 'Full street address is required'),
  landmark: z.string().optional().default(''),
  pinCode: z.string().regex(/^[1-9][0-9]{5}$/, 'Valid 6-digit PIN code required'),
  nearbyAttractions: z
    .array(
      z.object({
        name: z.string().min(1),
        distanceKm: z.coerce.number().min(0),
      })
    )
    .optional()
    .default([]),
  maxGuests: z.coerce.number().min(1).max(50),
  bedrooms: z.coerce.number().min(1).default(1),
  beds: z.coerce.number().min(1).default(1),
  bathrooms: z.coerce.number().min(1).default(1),
  basePricePerNight: z.coerce.number().min(500, 'Minimum nightly rate is ₹500'),
  weekendPriceMultiplier: z.coerce.number().min(1.0).max(2.5).default(1.0),
  cleaningFee: z.coerce.number().min(0).default(0),
  securityDeposit: z.coerce.number().min(0).default(0),
  minNights: z.coerce.number().min(1).default(1),
  maxNights: z.coerce.number().min(1).default(30),
  checkInTime: z.string().default('14:00'),
  checkOutTime: z.string().default('11:00'),
  amenities: z.array(z.string()).optional().default([]),
  petsAllowed: z.boolean().default(false),
  smokingAllowed: z.boolean().default(false),
  partiesAllowed: z.boolean().default(false),
  coverImageUrl: z.string().url('Cover image must be a valid image URL'),
  galleryImageUrls: z.array(z.string().url()).optional().default([]),
});

export const updateStayListingSchema = createStayListingSchema.partial();

export const blockDatesSchema = z.object({
  startDate: z.string().refine((d) => !isNaN(Date.parse(d)), 'Valid start date required'),
  endDate: z.string().refine((d) => !isNaN(Date.parse(d)), 'Valid end date required'),
  reason: z.string().optional().default('Reserved / Blocked by host'),
});

export const reviewStaySchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED', 'ARCHIVED']),
  rejectionReason: z.string().optional().default(''),
});
