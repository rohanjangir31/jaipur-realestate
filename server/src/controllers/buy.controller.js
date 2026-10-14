import { BuyProperty } from '../models/BuyProperty.model.js';

export const getBuyProperties = async (req, res, next) => {
  try {
    const {
      locality,
      propertyType,
      bhk,
      minPrice,
      maxPrice,
      reraOnly,
      possessionStatus,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 12,
    } = req.query;

    const filter = { status: 'APPROVED' };

    if (locality) {
      filter.locality = locality;
    }
    if (propertyType) {
      filter.propertyType = propertyType;
    }
    if (bhk !== undefined && bhk !== '') {
      filter.bhk = Number(bhk);
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (reraOnly === 'true' || reraOnly === true) {
      filter.reraRegistered = true;
    }
    if (possessionStatus) {
      filter.possessionStatus = possessionStatus;
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const sortOptions = {};
    if (sortBy === 'priceAsc') sortOptions.price = 1;
    else if (sortBy === 'priceDesc') sortOptions.price = -1;
    else sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [properties, total] = await Promise.all([
      BuyProperty.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .populate('ownerId', 'name'),
      BuyProperty.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        properties,
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

export const getBuyPropertyById = async (req, res, next) => {
  try {
    const property = await BuyProperty.findById(req.params.id).populate('ownerId', 'name');
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // If not approved, only owner or admin can view
    if (property.status !== 'APPROVED') {
      const user = req.user;
      const isOwner = user && property.ownerId && property.ownerId._id.toString() === user.sub;
      const isAdmin = user && user.roles?.some((r) => ['admin', 'super_admin'].includes(r));
      if (!isOwner && !isAdmin) {
        return res.status(404).json({ success: false, message: 'Property listing not available' });
      }
    }

    return res.status(200).json({ success: true, data: { property } });
  } catch (err) {
    next(err);
  }
};

export const createBuyProperty = async (req, res, next) => {
  try {
    const propertyData = {
      ...req.body,
      ownerId: req.user.sub,
      status: 'PENDING_REVIEW', // always goes through moderation
    };

    const property = await BuyProperty.create(propertyData);

    return res.status(201).json({
      success: true,
      message: 'Property listing submitted for review',
      data: { property },
    });
  } catch (err) {
    next(err);
  }
};

export const getMyListings = async (req, res, next) => {
  try {
    const properties = await BuyProperty.find({ ownerId: req.user.sub }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: { properties } });
  } catch (err) {
    next(err);
  }
};

export const updateBuyProperty = async (req, res, next) => {
  try {
    const property = await BuyProperty.findOne({ _id: req.params.id, ownerId: req.user.sub });
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found or unauthorized' });
    }

    // Update and reset to PENDING_REVIEW if edited
    Object.assign(property, req.body);
    property.status = 'PENDING_REVIEW';
    property.rejectionReason = '';
    await property.save();

    return res.status(200).json({
      success: true,
      message: 'Property updated and resubmitted for review',
      data: { property },
    });
  } catch (err) {
    next(err);
  }
};
