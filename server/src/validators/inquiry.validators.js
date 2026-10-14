import { z } from 'zod';
import { INQUIRY_STATUSES } from '../models/Inquiry.model.js';

export const createInquirySchema = z.object({
  inquiryType: z.enum(['BUY', 'STAY', 'INVEST']),
  referenceId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Valid reference ID required'),
  referenceModel: z.enum(['BuyProperty', 'StayListing', 'InvestmentAsset']),
  contactName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  message: z.string().max(1000).optional().default(''),
  details: z.record(z.any()).optional().default({}),
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(INQUIRY_STATUSES).optional(),
  note: z.string().optional().default(''),
  followUpDate: z.string().optional().nullable().or(z.literal('')),
  assignedTo: z.string().regex(/^[0-9a-fA-F]{24}$/).optional().nullable().or(z.literal('')),
});

export const addInquiryNoteSchema = z.object({
  note: z.string().min(1, 'Note cannot be empty'),
  status: z.enum(INQUIRY_STATUSES).optional(),
});
