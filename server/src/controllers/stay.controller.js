import { StayListing } from '../models/StayListing.model.js';

export const getStays = async (req, res, next) => {
  try {
    const {
      locality,
      stayType,
      minPrice,
      maxPrice,
      guests,
      checkIn,
      checkOut,
      amenities,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 12,
    } = req.query;

    const filter = { status: 'APPROVED' };

    if (locality) {
      filter.locality = locality;
    }
    if (stayType) {
      filter.stayType = stayType;
    }
    if (guests) {
      filter.maxGuests = { $gte: Number(guests) };
    }
    if (minPrice || maxPrice) {
      filter.basePricePerNight = {};
      if (minPrice) filter.basePricePerNight.$gte = Number(minPrice);
      if (maxPrice) filter.basePricePerNight.$lte = Number(maxPrice);
    }
    if (amenities) {
      const amenitiesArr = Array.isArray(amenities) ? amenities : amenities.split(',').map((a) => a.trim());
      filter.amenities = { $all: amenitiesArr };
    }

    // Availability filtering for checkIn and checkOut dates
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      if (!isNaN(checkInDate) && !isNaN(checkOutDate) && checkOutDate > checkInDate) {
        // Exclude listings that have any blocked date range overlapping with the requested interval
        filter.blockedDateRanges = {
          $not: {
            $elemMatch: {
              startDate: { $lt: checkOutDate },
              endDate: { $gt: checkInDate },
            },
          },
        };
      }
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const sortOptions = {};
    if (sortBy === 'priceAsc') sortOptions.basePricePerNight = 1;
    else if (sortBy === 'priceDesc') sortOptions.basePricePerNight = -1;
    else sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [stays, total] = await Promise.all([
      StayListing.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .populate('hostId', 'name'),
      StayListing.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        stays,
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

export const getStayById = async (req, res, next) => {
  try {
    const stay = await StayListing.findById(req.params.id).populate('hostId', 'name profilePhoto');
    if (!stay) {
      return res.status(404).json({ success: false, message: 'Accommodation listing not found' });
    }

    if (stay.status !== 'APPROVED') {
      const user = req.user;
      const isHost = user && stay.hostId && stay.hostId._id.toString() === user.sub;
      const isAdmin = user && user.roles?.some((r) => ['admin', 'super_admin'].includes(r));
      if (!isHost && !isAdmin) {
        return res.status(404).json({ success: false, message: 'Accommodation listing not available' });
      }
    }

    return res.status(200).json({ success: true, data: { stay } });
  } catch (err) {
    next(err);
  }
};

export const createStay = async (req, res, next) => {
  try {
    const stayData = {
      ...req.body,
      hostId: req.user.sub,
      status: 'PENDING_REVIEW',
    };

    const stay = await StayListing.create(stayData);

    return res.status(201).json({
      success: true,
      message: 'Accommodation listing submitted for verification',
      data: { stay },
    });
  } catch (err) {
    next(err);
  }
};

export const getMyStays = async (req, res, next) => {
  try {
    const stays = await StayListing.find({ hostId: req.user.sub }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: { stays } });
  } catch (err) {
    next(err);
  }
};

export const updateStay = async (req, res, next) => {
  try {
    const stay = await StayListing.findOne({ _id: req.params.id, hostId: req.user.sub });
    if (!stay) {
      return res.status(404).json({ success: false, message: 'Listing not found or unauthorized' });
    }

    Object.assign(stay, req.body);
    stay.status = 'PENDING_REVIEW';
    stay.rejectionReason = '';
    await stay.save();

    return res.status(200).json({
      success: true,
      message: 'Listing updated and resubmitted for verification',
      data: { stay },
    });
  } catch (err) {
    next(err);
  }
};

export const addBlockedDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate, reason } = req.body;
    const stay = await StayListing.findOne({ _id: req.params.id, hostId: req.user.sub });
    if (!stay) {
      return res.status(404).json({ success: false, message: 'Listing not found or unauthorized' });
    }

    stay.blockedDateRanges.push({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      reason: reason || 'Blocked by host',
    });

    await stay.save();

    return res.status(200).json({
      success: true,
      message: 'Calendar availability updated',
      data: { blockedDateRanges: stay.blockedDateRanges },
    });
  } catch (err) {
    next(err);
  }
};

export const removeBlockedDateRange = async (req, res, next) => {
  try {
    const { id, rangeId } = req.params;
    const stay = await StayListing.findOne({ _id: id, hostId: req.user.sub });
    if (!stay) {
      return res.status(404).json({ success: false, message: 'Listing not found or unauthorized' });
    }

    stay.blockedDateRanges = stay.blockedDateRanges.filter((r) => r._id.toString() !== rangeId);
    await stay.save();

    return res.status(200).json({
      success: true,
      message: 'Blocked date range removed',
      data: { blockedDateRanges: stay.blockedDateRanges },
    });
  } catch (err) {
    next(err);
  }
};
