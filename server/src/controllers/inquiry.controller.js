import { Inquiry } from '../models/Inquiry.model.js';

export const submitInquiry = async (req, res, next) => {
  try {
    const { inquiryType, referenceId, referenceModel, contactName, contactEmail, contactPhone, message, details } = req.body;

    const inquiry = await Inquiry.create({
      inquiryType,
      referenceId,
      referenceModel,
      userId: req.user ? req.user.sub : null,
      contactName,
      contactEmail,
      contactPhone,
      message,
      details,
      status: 'NEW',
      timeline: [
        {
          status: 'NEW',
          note: 'Inquiry submitted by visitor',
          timestamp: new Date(),
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. Our team will contact you shortly.',
      data: { inquiryId: inquiry._id },
    });
  } catch (err) {
    next(err);
  }
};

export const getMyInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find({
      $or: [{ userId: req.user.sub }, { contactEmail: req.user.email }],
    })
      .sort({ createdAt: -1 })
      .populate('referenceId');

    return res.status(200).json({
      success: true,
      data: { inquiries },
    });
  } catch (err) {
    next(err);
  }
};
