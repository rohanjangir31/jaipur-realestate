import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { User } from '../models/User.model.js';
import { InvestmentAsset } from '../models/InvestmentAsset.model.js';

const seedInvestments = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB for investment assets seed...');

    const adminEmail = 'admin@jaipurestates.in';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      const passwordHash = await bcrypt.hash('AdminJaipur#2024', 12);
      admin = await User.create({
        name: 'Platform Administrator',
        email: adminEmail,
        phone: '9829012345',
        passwordHash,
        roles: ['admin', 'super_admin'],
        isEmailVerified: true,
      });
    }

    await InvestmentAsset.deleteMany({});
    console.log('Cleared existing investment assets');

    const assets = [
      {
        submittedBy: admin._id,
        title: 'Pre-Leased Nationalized Bank Branch on Tonk Road',
        description: 'Ground floor retail banking branch pre-leased to a leading public sector bank on a long-term registered lease deed. High visibility corner location on main Tonk Road with dedicated customer parking and strong pedestrian footfall.',
        assetClass: 'Pre-Leased Commercial',
        riskCategory: 'Conservative (Cash Flow)',
        locality: 'Tonk Road',
        address: 'Ground Floor, Mahaveer Nagar, Main Tonk Road',
        pinCode: '302018',
        entryTicketSizeINR: 6000000, // ₹60 Lakh
        totalAssetValueINR: 18000000, // ₹1.8 Crore
        historicalRentalYieldPct: 7.2,
        lastRentalYieldYear: 'FY 2023-24',
        currentTenantProfile: 'Tier-1 Public Sector Bank (Regional Branch)',
        leaseRegistered: true,
        leaseRemainingMonths: 72,
        lockInPeriodMonths: 36,
        annualEscalationPct: 15,
        jdaApproved: true,
        reraRegistered: false,
        titleVerified: true,
        ownershipType: 'Freehold',
        coverImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        galleryImageUrls: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        ],
        status: 'APPROVED',
      },
      {
        submittedBy: admin._id,
        title: 'JDA Approved Industrial Plot in Sitapura Growth Corridor',
        description: 'Prime 1,000 sq. meter commercial/industrial plot situated in RIICO Industrial Area, Sitapura. Ideal for warehousing, light manufacturing, or engineering design facilities with direct arterial connectivity to Ring Road and Jaipur Airport.',
        assetClass: 'High-Growth Land',
        riskCategory: 'Growth (Capital Appreciation)',
        locality: 'Sitapura',
        address: 'Phase III, Sitapura Industrial Area',
        pinCode: '302022',
        entryTicketSizeINR: 4000000, // ₹40 Lakh
        totalAssetValueINR: 12000000, // ₹1.2 Crore
        historicalRentalYieldPct: null,
        lastRentalYieldYear: '',
        currentTenantProfile: 'Vacant Land / Development Ready',
        leaseRegistered: false,
        leaseRemainingMonths: 0,
        lockInPeriodMonths: 0,
        annualEscalationPct: 0,
        jdaApproved: true,
        reraRegistered: true,
        reraId: 'RAJ/P/2022/1908',
        titleVerified: true,
        ownershipType: 'Industrial Lease',
        coverImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        status: 'APPROVED',
      },
      {
        submittedBy: admin._id,
        title: 'Serviced Apartment Floor Plate near World Trade Park',
        description: 'Consolidated residential floor plate consisting of four boutique studio apartments operating under a unified hospitality lease. Located within walking distance to WTP, Gaurav Tower, and premier corporate offices in South Jaipur.',
        assetClass: 'Serviced Apartment',
        riskCategory: 'Moderate (Balanced)',
        locality: 'Malviya Nagar',
        address: 'Calgiri Road, Sector 3, Malviya Nagar',
        pinCode: '302017',
        entryTicketSizeINR: 2500000, // ₹25 Lakh
        totalAssetValueINR: 8500000, // ₹85 Lakh
        historicalRentalYieldPct: 6.4,
        lastRentalYieldYear: 'FY 2023-24',
        currentTenantProfile: 'Boutique Corporate Stay Operator',
        leaseRegistered: true,
        leaseRemainingMonths: 48,
        lockInPeriodMonths: 24,
        annualEscalationPct: 10,
        jdaApproved: true,
        reraRegistered: true,
        reraId: 'RAJ/P/2021/1104',
        titleVerified: true,
        ownershipType: 'Freehold',
        coverImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        status: 'APPROVED',
      },
      {
        submittedBy: admin._id,
        title: 'Highway Frontage Commercial Land on Ajmer Road (NH-48)',
        description: 'Direct highway frontage commercial land parcel strategically positioned along the rapidly expanding Ajmer Road growth corridor near Mahindra World City SEZ. High capital appreciation zone with clear registry and demarcation.',
        assetClass: 'High-Growth Land',
        riskCategory: 'Growth (Capital Appreciation)',
        locality: 'Ajmer Road',
        address: 'Near GVK Toll Plaza, Main Ajmer Road (NH-48)',
        pinCode: '302026',
        entryTicketSizeINR: 7500000, // ₹75 Lakh
        totalAssetValueINR: 35000000, // ₹3.5 Crore
        historicalRentalYieldPct: null,
        lastRentalYieldYear: '',
        currentTenantProfile: 'Commercial Development Land',
        leaseRegistered: false,
        leaseRemainingMonths: 0,
        lockInPeriodMonths: 0,
        annualEscalationPct: 0,
        jdaApproved: true,
        reraRegistered: false,
        titleVerified: true,
        ownershipType: 'Freehold',
        coverImageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
        status: 'APPROVED',
      },
      {
        submittedBy: admin._id,
        title: 'Pre-Leased Retail Showroom in Vaishali Nagar High Street',
        description: 'Prime ground-floor high-street retail showroom leased to a national apparel brand. 9-year lease with 3 years completed. Located on a busy commercial boulevard in Vaishali Nagar with high daily car and foot counts.',
        assetClass: 'Pre-Leased Commercial',
        riskCategory: 'Conservative (Cash Flow)',
        locality: 'Vaishali Nagar',
        address: 'Queens Road Boulevard, Vaishali Nagar',
        pinCode: '302021',
        entryTicketSizeINR: 5500000, // ₹55 Lakh
        totalAssetValueINR: 22000000, // ₹2.2 Crore
        historicalRentalYieldPct: 6.9,
        lastRentalYieldYear: 'FY 2023-24',
        currentTenantProfile: 'Tier-1 National Fashion Apparel Chain',
        leaseRegistered: true,
        leaseRemainingMonths: 60,
        lockInPeriodMonths: 36,
        annualEscalationPct: 15,
        jdaApproved: true,
        reraRegistered: true,
        reraId: 'RAJ/P/2020/872',
        titleVerified: true,
        ownershipType: 'Freehold',
        coverImageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
        status: 'PENDING_REVIEW', // To demonstrate investment moderation queue!
      },
    ];

    await InvestmentAsset.insertMany(assets);
    console.log(`Successfully seeded ${assets.length} Jaipur investment assets.`);

    await mongoose.disconnect();
    console.log('Investment seed completed successfully!');
  } catch (err) {
    console.error('Error seeding investments:', err);
    process.exit(1);
  }
};

seedInvestments();
