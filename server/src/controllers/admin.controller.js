import { BuyProperty } from '../models/BuyProperty.model.js';
import { StayListing } from '../models/StayListing.model.js';
import { InvestmentAsset } from '../models/InvestmentAsset.model.js';
import { Inquiry } from '../models/Inquiry.model.js';
import { AuditLog } from '../models/AuditLog.model.js';
import { User } from '../models/User.model.js';

export const getPendingListings = async (req, res, next) => {
  try {
    const { type = 'BUY' } = req.query;

    if (type === 'BUY') {
      const pendingBuy = await BuyProperty.find({ status: 'PENDING_REVIEW' })
        .sort({ createdAt: -1 })
        .populate('ownerId', 'name email phone');
      return res.status(200).json({ success: true, data: { listings: pendingBuy } });
    }

    if (type === 'STAY') {
      const pendingStay = await StayListing.find({ status: 'PENDING_REVIEW' })
        .sort({ createdAt: -1 })
        .populate('hostId', 'name email phone');
      return res.status(200).json({ success: true, data: { listings: pendingStay } });
    }

    if (type === 'INVEST') {
      const pendingInvest = await InvestmentAsset.find({ status: 'PENDING_REVIEW' })
        .sort({ createdAt: -1 })
        .populate('submittedBy', 'name email phone');
      return res.status(200).json({ success: true, data: { listings: pendingInvest } });
    }

    return res.status(200).json({ success: true, data: { listings: [] } });
  } catch (err) {
    next(err);
  }
};

export const reviewBuyProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason, titleVerified } = req.body;

    const property = await BuyProperty.findById(id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const previousStatus = property.status;
    property.status = status;
    if (rejectionReason !== undefined) property.rejectionReason = rejectionReason;
    if (titleVerified !== undefined) property.titleVerified = titleVerified;
    property.reviewedBy = req.user.sub;
    property.reviewedAt = new Date();
    await property.save();

    await AuditLog.create({
      action: status === 'APPROVED' ? 'LISTING_APPROVED' : 'LISTING_REJECTED',
      actorId: req.user.sub,
      actorRole: req.user.roles?.[0] || 'admin',
      targetType: 'BuyProperty',
      targetId: property._id,
      changes: {
        before: { status: previousStatus },
        after: { status, rejectionReason, titleVerified },
      },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    return res.status(200).json({
      success: true,
      message: `Property ${status.toLowerCase()} successfully`,
      data: { property },
    });
  } catch (err) {
    next(err);
  }
};

export const reviewStayListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    const stay = await StayListing.findById(id);
    if (!stay) {
      return res.status(404).json({ success: false, message: 'Stay listing not found' });
    }

    const previousStatus = stay.status;
    stay.status = status;
    if (rejectionReason !== undefined) stay.rejectionReason = rejectionReason;
    stay.verifiedBy = req.user.sub;
    stay.reviewedAt = new Date();
    await stay.save();

    await AuditLog.create({
      action: status === 'APPROVED' ? 'STAY_LISTING_APPROVED' : 'STAY_LISTING_REJECTED',
      actorId: req.user.sub,
      actorRole: req.user.roles?.[0] || 'admin',
      targetType: 'StayListing',
      targetId: stay._id,
      changes: {
        before: { status: previousStatus },
        after: { status, rejectionReason },
      },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    return res.status(200).json({
      success: true,
      message: `Stay listing ${status.toLowerCase()} successfully`,
      data: { stay },
    });
  } catch (err) {
    next(err);
  }
};

export const reviewInvestmentAsset = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason, titleVerified } = req.body;

    const asset = await InvestmentAsset.findById(id);
    if (!asset) {
      return res.status(404).json({ success: false, message: 'Investment asset not found' });
    }

    const previousStatus = asset.status;
    asset.status = status;
    if (rejectionReason !== undefined) asset.rejectionReason = rejectionReason;
    if (titleVerified !== undefined) asset.titleVerified = titleVerified;
    asset.verifiedBy = req.user.sub;
    asset.reviewedAt = new Date();
    await asset.save();

    await AuditLog.create({
      action: status === 'APPROVED' ? 'INVEST_ASSET_APPROVED' : 'INVEST_ASSET_REJECTED',
      actorId: req.user.sub,
      actorRole: req.user.roles?.[0] || 'admin',
      targetType: 'InvestmentAsset',
      targetId: asset._id,
      changes: {
        before: { status: previousStatus },
        after: { status, rejectionReason, titleVerified },
      },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    return res.status(200).json({
      success: true,
      message: `Investment asset ${status.toLowerCase()} successfully`,
      data: { asset },
    });
  } catch (err) {
    next(err);
  }
};

export const getAllInquiries = async (req, res, next) => {
  try {
    const { type, status, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (type) filter.inquiryType = type;
    if (status) filter.status = status;

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [inquiries, total] = await Promise.all([
      Inquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate('assignedTo', 'name email')
        .populate('referenceId'),
      Inquiry.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        inquiries,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, note, followUpDate, assignedTo } = req.body;

    const inquiry = await Inquiry.findById(id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    if (status && status !== inquiry.status) {
      inquiry.status = status;
      inquiry.timeline.push({
        status,
        note: note || `Status changed to ${status}`,
        updatedBy: req.user.sub,
        timestamp: new Date(),
      });
    } else if (note) {
      inquiry.timeline.push({
        status: inquiry.status,
        note,
        updatedBy: req.user.sub,
        timestamp: new Date(),
      });
    }

    if (followUpDate !== undefined) {
      inquiry.followUpDate = followUpDate ? new Date(followUpDate) : null;
    }
    if (assignedTo !== undefined) {
      inquiry.assignedTo = assignedTo || null;
    }

    await inquiry.save();
    await inquiry.populate('assignedTo', 'name email');

    return res.status(200).json({
      success: true,
      message: 'Inquiry updated successfully',
      data: { inquiry },
    });
  } catch (err) {
    next(err);
  }
};

export const getAdminStats = async (req, res, next) => {
  try {
    const [pendingProperties, pendingStays, pendingInvestments, totalInquiries, newInquiries] = await Promise.all([
      BuyProperty.countDocuments({ status: 'PENDING_REVIEW' }),
      StayListing.countDocuments({ status: 'PENDING_REVIEW' }),
      InvestmentAsset.countDocuments({ status: 'PENDING_REVIEW' }),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'NEW' }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        pendingProperties,
        pendingStays,
        pendingInvestments,
        totalInquiries,
        newInquiries,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getAuditLogs = async (req, res, next) => {
  try {
    const { targetType, action, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (targetType) filter.targetType = targetType;
    if (action) filter.action = action;

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [logs, total] = await Promise.all([
      AuditLog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate('actorId', 'name email roles'),
      AuditLog.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        logs,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getStaffMembers = async (req, res, next) => {
  try {
    const staff = await User.find({
      roles: { $in: ['admin', 'super_admin', 'agent'] },
      isActive: true,
    }).select('_id name email roles');

    return res.status(200).json({
      success: true,
      data: { staff },
    });
  } catch (err) {
    next(err);
  }
};

export const exportInquiriesCsv = async (req, res, next) => {
  try {
    const { type, status } = req.query;
    const filter = {};
    if (type) filter.inquiryType = type;
    if (status) filter.status = status;

    const inquiries = await Inquiry.find(filter)
      .sort({ createdAt: -1 })
      .populate('assignedTo', 'name email')
      .lean();

    const headers = [
      'Inquiry ID',
      'Vertical',
      'Status',
      'Client Name',
      'Client Email',
      'Client Phone',
      'Assigned To',
      'Follow-Up Date',
      'Created At',
      'Message',
    ];

    const rows = inquiries.map((inq) => [
      `"${inq._id.toString()}"`,
      `"${inq.inquiryType}"`,
      `"${inq.status}"`,
      `"${(inq.contactName || '').replace(/"/g, '""')}"`,
      `"${(inq.contactEmail || '').replace(/"/g, '""')}"`,
      `"${(inq.contactPhone || '').replace(/"/g, '""')}"`,
      `"${(inq.assignedTo?.name || 'Unassigned').replace(/"/g, '""')}"`,
      `"${inq.followUpDate ? new Date(inq.followUpDate).toISOString().split('T')[0] : ''}"`,
      `"${inq.createdAt ? new Date(inq.createdAt).toISOString() : ''}"`,
      `"${(inq.message || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="jaipur-inquiries.csv"');
    return res.status(200).send(csvContent);
  } catch (err) {
    next(err);
  }
};

export const exportAuditLogsCsv = async (req, res, next) => {
  try {
    const { targetType, action } = req.query;
    const filter = {};
    if (targetType) filter.targetType = targetType;
    if (action) filter.action = action;

    const logs = await AuditLog.find(filter)
      .sort({ createdAt: -1 })
      .populate('actorId', 'name email roles')
      .lean();

    const headers = [
      'Log ID',
      'Action',
      'Actor Name',
      'Actor Email',
      'Actor Role',
      'Target Type',
      'Target ID',
      'Timestamp',
      'Changes Summary',
    ];

    const rows = logs.map((log) => [
      `"${log._id.toString()}"`,
      `"${log.action}"`,
      `"${(log.actorId?.name || 'System').replace(/"/g, '""')}"`,
      `"${(log.actorId?.email || '').replace(/"/g, '""')}"`,
      `"${log.actorRole}"`,
      `"${log.targetType}"`,
      `"${log.targetId ? log.targetId.toString() : ''}"`,
      `"${log.createdAt ? new Date(log.createdAt).toISOString() : ''}"`,
      `"${JSON.stringify(log.changes || {}).replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="jaipur-audit-logs.csv"');
    return res.status(200).send(csvContent);
  } catch (err) {
    next(err);
  }
};
