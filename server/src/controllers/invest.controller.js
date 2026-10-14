import { InvestmentAsset } from '../models/InvestmentAsset.model.js';
import { InvestorCriteria } from '../models/InvestorCriteria.model.js';
import { evaluateInvestmentMatch } from '../services/matchingEngine.js';

export const getInvestmentAssets = async (req, res, next) => {
  try {
    const {
      assetClass,
      riskCategory,
      locality,
      minTicket,
      maxTicket,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 12,
    } = req.query;

    const filter = { status: 'APPROVED' };

    if (assetClass) filter.assetClass = assetClass;
    if (riskCategory) filter.riskCategory = riskCategory;
    if (locality) filter.locality = locality;
    if (minTicket || maxTicket) {
      filter.entryTicketSizeINR = {};
      if (minTicket) filter.entryTicketSizeINR.$gte = Number(minTicket);
      if (maxTicket) filter.entryTicketSizeINR.$lte = Number(maxTicket);
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const sortOptions = {};
    if (sortBy === 'ticketAsc') sortOptions.entryTicketSizeINR = 1;
    else if (sortBy === 'ticketDesc') sortOptions.entryTicketSizeINR = -1;
    else if (sortBy === 'yieldDesc') sortOptions.historicalRentalYieldPct = -1;
    else sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [assets, total] = await Promise.all([
      InvestmentAsset.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .populate('submittedBy', 'name'),
      InvestmentAsset.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        assets,
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

export const getInvestmentAssetById = async (req, res, next) => {
  try {
    const asset = await InvestmentAsset.findById(req.params.id).populate('submittedBy', 'name');
    if (!asset) {
      return res.status(404).json({ success: false, message: 'Investment asset not found' });
    }

    if (asset.status !== 'APPROVED') {
      const user = req.user;
      const isOwner = user && asset.submittedBy && asset.submittedBy._id.toString() === user.sub;
      const isAdmin = user && user.roles?.some((r) => ['admin', 'super_admin'].includes(r));
      if (!isOwner && !isAdmin) {
        return res.status(404).json({ success: false, message: 'Asset not publicly available' });
      }
    }

    return res.status(200).json({ success: true, data: { asset } });
  } catch (err) {
    next(err);
  }
};

export const createInvestmentAsset = async (req, res, next) => {
  try {
    const asset = await InvestmentAsset.create({
      ...req.body,
      submittedBy: req.user.sub,
      status: 'PENDING_REVIEW',
    });

    return res.status(201).json({
      success: true,
      message: 'Investment opportunity submitted for administrative review',
      data: { asset },
    });
  } catch (err) {
    next(err);
  }
};

export const saveCriteria = async (req, res, next) => {
  try {
    const criteria = await InvestorCriteria.findOneAndUpdate(
      { investorId: req.user.sub },
      {
        ...req.body,
        investorId: req.user.sub,
        lastMatchRun: new Date(),
      },
      { upsert: true, new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Investment criteria preferences saved successfully',
      data: { criteria },
    });
  } catch (err) {
    next(err);
  }
};

export const getMyCriteria = async (req, res, next) => {
  try {
    const criteria = await InvestorCriteria.findOne({ investorId: req.user.sub });
    return res.status(200).json({ success: true, data: { criteria } });
  } catch (err) {
    next(err);
  }
};

export const getMatches = async (req, res, next) => {
  try {
    const criteria = await InvestorCriteria.findOne({ investorId: req.user.sub });
    if (!criteria) {
      return res.status(200).json({
        success: true,
        data: {
          hasCriteria: false,
          matches: [],
          message: 'Please set your investment criteria to view matched assets.',
        },
      });
    }

    const approvedAssets = await InvestmentAsset.find({ status: 'APPROVED' });

    // Run transparent matching engine on each approved asset
    const evaluated = approvedAssets.map((asset) => {
      const matchEvaluation = evaluateInvestmentMatch(criteria, asset);
      return {
        asset,
        matchEvaluation,
      };
    });

    // Sort by match score descending
    evaluated.sort((a, b) => b.matchEvaluation.scorePct - a.matchEvaluation.scorePct);

    return res.status(200).json({
      success: true,
      data: {
        hasCriteria: true,
        criteria,
        matches: evaluated,
      },
    });
  } catch (err) {
    next(err);
  }
};
