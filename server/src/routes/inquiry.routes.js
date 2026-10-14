import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { submitInquiry, getMyInquiries } from '../controllers/inquiry.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createInquirySchema } from '../validators/inquiry.validators.js';

const router = Router();

// Anti-spam rate limiting for public inquiry submissions: 10 per 15 minutes per IP
const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many inquiries submitted from this IP. Please wait a few minutes before trying again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Optional auth reader middleware to attach user if logged in
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authenticate(req, res, next);
  }
  next();
};

router.post('/', inquiryLimiter, optionalAuth, validate(createInquirySchema), submitInquiry);
router.get('/mine', authenticate, getMyInquiries);

export default router;
