import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { User } from '../models/User.model.js';
import { BuyProperty } from '../models/BuyProperty.model.js';
import { StayListing } from '../models/StayListing.model.js';
import { InvestmentAsset } from '../models/InvestmentAsset.model.js';
import { Inquiry } from '../models/Inquiry.model.js';
import { AuditLog } from '../models/AuditLog.model.js';

export const seedAll = async (shouldExit = false) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('Connecting to MongoDB at:', env.MONGODB_URI);
      await mongoose.connect(env.MONGODB_URI);
      console.log(' Connected to MongoDB for comprehensive platform seed.');
    }

    // ─────────────────────────────────────────────────────────────
    // 1. Seed Core Role Users
    // ─────────────────────────────────────────────────────────────
    console.log('\n--- 1. Seeding Core Users ---');

    const usersToCreate = [
      {
        name: 'Platform Administrator',
        email: 'admin@jaipurestates.in',
        phone: '9829012345',
        password: 'AdminJaipur#2024',
        roles: ['admin', 'super_admin'],
      },
      {
        name: 'Rajesh Sharma (Jaipur RM)',
        email: 'agent@jaipurestates.in',
        phone: '9829023456',
        password: 'AgentJaipur#2024',
        roles: ['agent'],
      },
      {
        name: 'Surendra Rathore (Property Owner)',
        email: 'owner@jaipurestates.in',
        phone: '9829154321',
        password: 'OwnerJaipur#2024',
        roles: ['owner'],
      },
      {
        name: 'Kunwar Digvijay Singh (Stay Host)',
        email: 'host@jaipurestates.in',
        phone: '9829033445',
        password: 'HostJaipur#2024',
        roles: ['host'],
      },
      {
        name: 'Vikramaditya Khandelwal (Investor)',
        email: 'investor@jaipurestates.in',
        phone: '9829044556',
        password: 'InvestorJaipur#2024',
        roles: ['investor'],
      },
      {
        name: 'Ananya Deshmukh (Home Buyer)',
        email: 'buyer@jaipurestates.in',
        phone: '9829055667',
        password: 'BuyerJaipur#2024',
        roles: ['buyer'],
      },
    ];

    const usersMap = {};

    for (const u of usersToCreate) {
      let existing = await User.findOne({ email: u.email });
      if (!existing) {
        const passwordHash = await bcrypt.hash(u.password, 12);
        existing = await User.create({
          name: u.name,
          email: u.email,
          phone: u.phone,
          passwordHash,
          roles: u.roles,
          isEmailVerified: true,
          isPhoneVerified: true,
        });
        console.log(` Created user: ${u.email} [${u.roles.join(', ')}]`);
      } else {
        console.log(` Existing user confirmed: ${u.email}`);
      }
      usersMap[u.email] = existing;
    }

    const admin = usersMap['admin@jaipurestates.in'];
    const agent = usersMap['agent@jaipurestates.in'];
    const owner = usersMap['owner@jaipurestates.in'];
    const host = usersMap['host@jaipurestates.in'];
    const investor = usersMap['investor@jaipurestates.in'];
    const buyer = usersMap['buyer@jaipurestates.in'];

    // ─────────────────────────────────────────────────────────────
    // 2. Clear & Seed Buy Properties (6 Approved + 1 Pending)
    // ─────────────────────────────────────────────────────────────
    console.log('\n--- 2. Seeding Buy Properties ---');
    await BuyProperty.deleteMany({});

    const buyProperties = [
      {
        ownerId: owner._id,
        title: '3 BHK Premium Apartment near Amrapali Circle',
        description: 'Spacious well-ventilated flat on 4th floor with modular kitchen, wooden wardrobes, two balconies, and dedicated covered basement parking. Proximity to local market and reputed schools in Vaishali Nagar.',
        locality: 'Vaishali Nagar',
        address: 'Plot B-42, Amrapali Circle, Vaishali Nagar',
        landmark: 'Near Amrapali Circle',
        pinCode: '302021',
        propertyType: 'Apartment/Flat',
        transactionType: 'Resale',
        facing: 'East',
        furnishingStatus: 'Semi-Furnished',
        bhk: 3,
        bedrooms: 3,
        bathrooms: 3,
        balconies: 2,
        superAreaSqFt: 1850,
        carpetAreaSqFt: 1420,
        floorNumber: 4,
        totalFloors: 9,
        price: 8500000, // ₹85 Lakh
        maintenanceMonthly: 2500,
        reraRegistered: true,
        reraId: 'RAJ/P/2021/1420',
        jdaApproved: true,
        titleVerified: true,
        ownershipType: 'Freehold',
        coverImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
        galleryImageUrls: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        ],
        status: 'APPROVED',
        reviewedBy: admin._id,
        reviewedAt: new Date(),
      },
      {
        ownerId: owner._id,
        title: '4 BHK Luxury Independent Kothi in Malviya Nagar Sector 4',
        description: 'Architect-designed independent villa built on a 250 sq yard corner plot with Italian marble flooring, landscaped front terrace garden, and servant quarters. 5 minutes from World Trade Park.',
        locality: 'Malviya Nagar',
        address: '4/112, Sector 4, Malviya Nagar',
        landmark: 'Behind World Trade Park (WTP)',
        pinCode: '302017',
        propertyType: 'Independent House/Villa',
        transactionType: 'Resale',
        facing: 'North-East',
        furnishingStatus: 'Fully Furnished',
        bhk: 4,
        bedrooms: 4,
        bathrooms: 4,
        balconies: 3,
        superAreaSqFt: 3200,
        carpetAreaSqFt: 2800,
        floorNumber: 1,
        totalFloors: 2,
        price: 24500000, // ₹2.45 Crore
        reraRegistered: false,
        jdaApproved: true,
        titleVerified: true,
        ownershipType: 'Freehold',
        coverImageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
        galleryImageUrls: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        ],
        status: 'APPROVED',
        reviewedBy: admin._id,
        reviewedAt: new Date(),
      },
      {
        ownerId: owner._id,
        title: '2 BHK Modern Flat in Prime Mansarovar Extension',
        description: 'Ready-to-move apartment in a gated township with clubhouse, swimming pool, piped gas, and 24x7 security. Direct metro connectivity to Jaipur central stations.',
        locality: 'Mansarovar',
        address: 'Tower C, Sun City Heights, Mansarovar',
        landmark: 'Near Mansarovar Metro Station',
        pinCode: '302020',
        propertyType: 'Apartment/Flat',
        transactionType: 'New Booking',
        facing: 'North',
        furnishingStatus: 'Unfurnished',
        bhk: 2,
        bedrooms: 2,
        bathrooms: 2,
        balconies: 1,
        superAreaSqFt: 1150,
        carpetAreaSqFt: 880,
        floorNumber: 7,
        totalFloors: 12,
        price: 4200000, // ₹42 Lakh
        maintenanceMonthly: 1800,
        reraRegistered: true,
        reraId: 'RAJ/P/2022/1982',
        jdaApproved: true,
        titleVerified: true,
        ownershipType: 'Freehold',
        coverImageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
        galleryImageUrls: [],
        status: 'APPROVED',
        reviewedBy: admin._id,
        reviewedAt: new Date(),
      },
      {
        ownerId: owner._id,
        title: '3 BHK Builder Floor with Stilt Parking in Jagatpura',
        description: 'Brand new construction builder floor with independent roof rights, modular kitchen with chimney, false ceiling, and LED profile lighting. Walking distance to Bombay Hospital.',
        locality: 'Jagatpura',
        address: 'B-14, Model Town, Jagatpura',
        landmark: 'Near Bombay Hospital',
        pinCode: '302017',
        propertyType: 'Builder Floor',
        transactionType: 'New Booking',
        facing: 'East',
        furnishingStatus: 'Semi-Furnished',
        bhk: 3,
        bedrooms: 3,
        bathrooms: 3,
        balconies: 2,
        superAreaSqFt: 1600,
        carpetAreaSqFt: 1300,
        floorNumber: 2,
        totalFloors: 3,
        price: 5800000, // ₹58 Lakh
        reraRegistered: false,
        jdaApproved: true,
        titleVerified: true,
        ownershipType: 'Freehold',
        coverImageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
        galleryImageUrls: [],
        status: 'APPROVED',
        reviewedBy: admin._id,
        reviewedAt: new Date(),
      },
      {
        ownerId: owner._id,
        title: 'High-End 4 BHK Penthouse overlooking Central Park, C-Scheme',
        description: 'Ultra-luxury single-floor penthouse in the heart of C-Scheme with private elevator access, 800 sqft landscaped terrace deck overlooking greenery, and 3 reserved basement car slots.',
        locality: 'C-Scheme',
        address: 'Imperial Suites, Subhash Marg, C-Scheme',
        landmark: 'Overlooking Central Park',
        pinCode: '302001',
        propertyType: 'Penthouse',
        transactionType: 'Resale',
        facing: 'North-East',
        furnishingStatus: 'Fully Furnished',
        bhk: 4,
        bedrooms: 4,
        bathrooms: 5,
        balconies: 4,
        superAreaSqFt: 4600,
        carpetAreaSqFt: 3850,
        floorNumber: 11,
        totalFloors: 11,
        price: 52000000, // ₹5.20 Crore
        maintenanceMonthly: 9000,
        reraRegistered: true,
        reraId: 'RAJ/P/2019/882',
        jdaApproved: true,
        titleVerified: true,
        ownershipType: 'Freehold',
        coverImageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80',
        galleryImageUrls: [],
        status: 'APPROVED',
        reviewedBy: admin._id,
        reviewedAt: new Date(),
      },
      {
        ownerId: owner._id,
        title: 'Commercial Showroom on Main Tonk Road High Street',
        description: 'Prime ground and mezzanine commercial showroom with 32 feet wide glass frontage on main Tonk Road arterial corridor. High footfall commercial catchment area.',
        locality: 'Tonk Road',
        address: 'Showroom 12, Apex Mall, Main Tonk Road',
        landmark: 'Opposite Nehru Garden',
        pinCode: '302015',
        propertyType: 'Commercial Showroom',
        transactionType: 'Resale',
        facing: 'West',
        furnishingStatus: 'Unfurnished',
        bhk: 0,
        bedrooms: 0,
        bathrooms: 2,
        balconies: 0,
        superAreaSqFt: 2200,
        carpetAreaSqFt: 1800,
        floorNumber: 0,
        totalFloors: 4,
        price: 31000000, // ₹3.10 Crore
        reraRegistered: false,
        jdaApproved: true,
        titleVerified: true,
        ownershipType: 'Freehold',
        coverImageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
        galleryImageUrls: [],
        status: 'APPROVED',
        reviewedBy: admin._id,
        reviewedAt: new Date(),
      },
      // Pending property for Admin Moderation Queue
      {
        ownerId: owner._id,
        title: '2 BHK Garden View Flat in Jagatpura Sector 19',
        description: 'Recently completed flat in peaceful residential sector awaiting document vetting. Semi-modular woodwork with covered balcony.',
        locality: 'Jagatpura',
        address: 'Flat 302, Sector 19, Jagatpura',
        landmark: 'Near Gyan Vihar University',
        pinCode: '302017',
        propertyType: 'Apartment/Flat',
        transactionType: 'Resale',
        facing: 'East',
        furnishingStatus: 'Semi-Furnished',
        bhk: 2,
        bedrooms: 2,
        bathrooms: 2,
        balconies: 1,
        superAreaSqFt: 1100,
        carpetAreaSqFt: 850,
        floorNumber: 3,
        totalFloors: 6,
        price: 3600000,
        reraRegistered: false,
        jdaApproved: true,
        titleVerified: false,
        ownershipType: 'Freehold',
        coverImageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
        galleryImageUrls: [],
        status: 'PENDING_REVIEW',
      },
    ];

    const createdBuyProps = await BuyProperty.insertMany(buyProperties);
    console.log(` Created ${createdBuyProps.length} Buy Properties (6 Approved, 1 Pending).`);

    // ─────────────────────────────────────────────────────────────
    // 3. Clear & Seed Stay Listings (5 Approved + 1 Pending)
    // ─────────────────────────────────────────────────────────────
    console.log('\n--- 3. Seeding Stay Accommodations ---');
    await StayListing.deleteMany({});

    const stays = [
      {
        hostId: host._id,
        title: 'Heritage Courtyard Haveli in Bani Park',
        description: 'Authentic 1940s restored Rajputana haveli featuring traditional jharokhas, carved stone pillars, shaded central courtyard, and handmade block-printed upholstery. Quiet residential avenue in Bani Park with leafy sit-outs and home-cooked Rajasthani breakfast upon request.',
        stayType: 'Heritage Haveli',
        locality: 'Bani Park',
        address: 'D-24, Kabir Marg, Bani Park',
        landmark: 'Near Collectorate Circle',
        pinCode: '302016',
        maxGuests: 4,
        bedrooms: 2,
        beds: 2,
        bathrooms: 2,
        basePricePerNight: 4800,
        weekendPriceMultiplier: 1.15,
        cleaningFee: 400,
        minNights: 1,
        checkInTime: '14:00',
        checkOutTime: '11:00',
        nearbyAttractions: [
          { name: 'City Palace & Jantar Mantar', distanceKm: 3.5 },
          { name: 'Jaipur Junction Railway Station', distanceKm: 1.8 },
          { name: 'Hawa Mahal', distanceKm: 4.0 },
        ],
        amenities: [
          'Wi-Fi (100 Mbps)',
          'Air Conditioning',
          'Heritage Courtyard',
          'Free Parking on Premises',
          'Daily Breakfast Included',
          'Power Backup',
        ],
        houseRules: [
          'No smoking inside rooms',
          'Quiet hours after 10:00 PM',
          'Valid government ID required at check-in',
        ],
        coverImageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
        galleryImageUrls: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
        ],
        status: 'APPROVED',
        verifiedBy: admin._id,
        reviewedAt: new Date(),
        blockedDateRanges: [
          {
            startDate: new Date('2026-11-10'),
            endDate: new Date('2026-11-15'),
            reason: 'Private family function',
          },
        ],
      },
      {
        hostId: host._id,
        title: 'Artisan Boutique Studio Suite in C-Scheme',
        description: 'Chic designer studio in Jaipur prime cultural district. Walk to cafes, art galleries, and Central Park within minutes. Features kitchenette, king plush bed, and private sit-out balcony.',
        stayType: 'Boutique Homestay',
        locality: 'C-Scheme',
        address: '14, Ashok Marg, C-Scheme',
        landmark: 'Near Statue Circle',
        pinCode: '302001',
        maxGuests: 2,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        basePricePerNight: 3200,
        weekendPriceMultiplier: 1.1,
        cleaningFee: 300,
        minNights: 1,
        checkInTime: '14:00',
        checkOutTime: '11:00',
        nearbyAttractions: [
          { name: 'Central Park', distanceKm: 0.8 },
          { name: 'Albert Hall Museum', distanceKm: 2.2 },
          { name: 'MI Road Shopping', distanceKm: 1.2 },
        ],
        amenities: [
          'High-speed Wi-Fi',
          'Kitchenette with Induction',
          'Air Conditioning',
          'Balcony Sit-out',
          'Work Desk',
        ],
        houseRules: ['No parties or events', 'Strictly non-smoking unit'],
        coverImageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
        galleryImageUrls: [],
        status: 'APPROVED',
        verifiedBy: admin._id,
        reviewedAt: new Date(),
        blockedDateRanges: [],
      },
      {
        hostId: host._id,
        title: 'Grand Royal Villa with Private Plunge Pool in Civil Lines',
        description: 'Exquisite 3-bedroom private villa in the VIP diplomatic enclave of Civil Lines. Surrounded by tall bougainvillea trees, with a temperature-controlled plunge pool, butler pantry, and manicured lawns.',
        stayType: 'Luxury Villa',
        locality: 'Civil Lines',
        address: '7, Jacob Road, Civil Lines',
        landmark: 'Near Civil Lines Metro',
        pinCode: '302006',
        maxGuests: 8,
        bedrooms: 3,
        beds: 4,
        bathrooms: 4,
        basePricePerNight: 14500,
        weekendPriceMultiplier: 1.2,
        cleaningFee: 1200,
        minNights: 2,
        checkInTime: '15:00',
        checkOutTime: '12:00',
        nearbyAttractions: [
          { name: 'Railway Station', distanceKm: 2.0 },
          { name: 'C-Scheme Dining Precinct', distanceKm: 2.5 },
        ],
        amenities: [
          'Private Plunge Pool',
          'Lush Private Lawn',
          'Dedicated Butler Service',
          'Fully Equipped Modular Kitchen',
          'Covered Car Parking',
        ],
        houseRules: [
          'Pool open until 10:00 PM',
          'Music in indoor areas only after 10:00 PM',
        ],
        coverImageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
        galleryImageUrls: [],
        status: 'APPROVED',
        verifiedBy: admin._id,
        reviewedAt: new Date(),
        blockedDateRanges: [],
      },
      {
        hostId: host._id,
        title: 'Historic Johari Bazaar Haveli Room in Pink City',
        description: 'Live inside the UNESCO World Heritage Walled City. Step right out into Johari Bazaar vibrant gemstone and jewellery market. Restored lime-plaster arches and antique brass fittings.',
        stayType: 'Heritage Haveli',
        locality: 'Pink City (Walled City)',
        address: 'Ghee Walo Ka Rasta, Johari Bazaar',
        landmark: 'Behind Badi Chaupar',
        pinCode: '302003',
        maxGuests: 3,
        bedrooms: 1,
        beds: 2,
        bathrooms: 1,
        basePricePerNight: 2600,
        weekendPriceMultiplier: 1.1,
        cleaningFee: 250,
        minNights: 1,
        checkInTime: '13:00',
        checkOutTime: '11:00',
        nearbyAttractions: [
          { name: 'Hawa Mahal', distanceKm: 0.6 },
          { name: 'City Palace', distanceKm: 0.9 },
          { name: 'Bapu Bazaar', distanceKm: 0.8 },
        ],
        amenities: [
          'Rooftop View of Nahargarh Fort',
          'Air Conditioning',
          'Free Wi-Fi',
          'Walking Tour Assistance',
        ],
        houseRules: ['Footwear removal requested in inner sanctum', 'No alcohol on premises'],
        coverImageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
        galleryImageUrls: [],
        status: 'APPROVED',
        verifiedBy: admin._id,
        reviewedAt: new Date(),
        blockedDateRanges: [],
      },
      {
        hostId: host._id,
        title: 'Sunlit Rooftop Suite in Raja Park Culinary District',
        description: 'Modern penthouse apartment in Raja Park with expansive open-air terrace for evening stargazing. Located walking distance to iconic Jaipur sweetshops and kebab grills.',
        stayType: 'Serviced Apartment',
        locality: 'Raja Park',
        address: 'Lane 4, Raja Park',
        landmark: 'Near Panchvati Circle',
        pinCode: '302004',
        maxGuests: 3,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        basePricePerNight: 2800,
        weekendPriceMultiplier: 1.1,
        cleaningFee: 300,
        minNights: 1,
        checkInTime: '14:00',
        checkOutTime: '11:00',
        nearbyAttractions: [
          { name: 'Raja Park Food Street', distanceKm: 0.2 },
          { name: 'Birla Mandir', distanceKm: 2.1 },
        ],
        amenities: ['Private Rooftop Terrace', 'Superfast Wi-Fi', 'Microwave & Refrigerator', 'Air Conditioning'],
        houseRules: ['Respect neighbors on floor below'],
        coverImageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
        galleryImageUrls: [],
        status: 'APPROVED',
        verifiedBy: admin._id,
        reviewedAt: new Date(),
        blockedDateRanges: [],
      },
      // Pending stay for Admin Moderation Queue
      {
        hostId: host._id,
        title: 'Cosy Guest Suite near Vaishali Nagar Nursery Circle',
        description: 'Newly listed 1-bedroom home suite with garden sit-out in Vaishali Nagar awaiting host inspection.',
        stayType: 'Boutique Homestay',
        locality: 'Vaishali Nagar',
        address: '12-A, Nursery Circle, Vaishali Nagar',
        landmark: 'Near Nursery Circle',
        pinCode: '302021',
        maxGuests: 2,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        basePricePerNight: 2200,
        weekendPriceMultiplier: 1.05,
        cleaningFee: 200,
        minNights: 1,
        checkInTime: '14:00',
        checkOutTime: '11:00',
        nearbyAttractions: [],
        amenities: ['Wi-Fi', 'Air Conditioning', 'Power Backup'],
        houseRules: ['Quiet hours after 10 PM'],
        coverImageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
        galleryImageUrls: [],
        status: 'PENDING_REVIEW',
        blockedDateRanges: [],
      },
    ];

    const createdStays = await StayListing.insertMany(stays);
    console.log(` Created ${createdStays.length} Stay Accommodations (5 Approved, 1 Pending).`);

    // ─────────────────────────────────────────────────────────────
    // 4. Clear & Seed Investment Assets (5 Approved + 1 Pending)
    // ─────────────────────────────────────────────────────────────
    console.log('\n--- 4. Seeding Investment Assets ---');
    await InvestmentAsset.deleteMany({});

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
        verifiedBy: admin._id,
        reviewedAt: new Date(),
      },
      {
        submittedBy: admin._id,
        title: 'JDA Approved Industrial Plot in Sitapura Growth Corridor',
        description: 'Clear title, freehold industrial parcel situated 2 km from the RIICO gems and jewellery SEZ gate. Strategic appreciation play backed by upcoming logistics and manufacturing expansions.',
        assetClass: 'High-Growth Land',
        riskCategory: 'Aggressive (High Growth)',
        locality: 'Sitapura',
        address: 'Plot G-188, Sitapura Industrial Area Phase III',
        pinCode: '302022',
        entryTicketSizeINR: 12000000, // ₹1.2 Crore
        totalAssetValueINR: 35000000, // ₹3.5 Crore
        historicalRentalYieldPct: 0.0,
        currentTenantProfile: 'Vacant Land for Build-to-Suit / Long-term Holding',
        leaseRegistered: false,
        leaseRemainingMonths: 0,
        lockInPeriodMonths: 0,
        annualEscalationPct: 0,
        jdaApproved: true,
        reraRegistered: false,
        titleVerified: true,
        ownershipType: 'Freehold',
        coverImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        galleryImageUrls: [],
        status: 'APPROVED',
        verifiedBy: admin._id,
        reviewedAt: new Date(),
      },
      {
        submittedBy: admin._id,
        title: 'Serviced Boutique Apartment Floors in Raja Park',
        description: 'Turnkey 4-unit hospitality asset currently managed by a boutique serviced accommodation operator. Consistent historical occupancy from business travelers and tourists.',
        assetClass: 'Serviced Apartments',
        riskCategory: 'Balanced (Hybrid)',
        locality: 'Raja Park',
        address: 'Lane 2, Panchvati Circle, Raja Park',
        pinCode: '302004',
        entryTicketSizeINR: 4500000, // ₹45 Lakh
        totalAssetValueINR: 22000000, // ₹2.2 Crore
        historicalRentalYieldPct: 8.4,
        lastRentalYieldYear: 'FY 2023-24',
        currentTenantProfile: 'Boutique Hospitality Operator (Triple Net Lease)',
        leaseRegistered: true,
        leaseRemainingMonths: 48,
        lockInPeriodMonths: 24,
        annualEscalationPct: 8,
        jdaApproved: true,
        reraRegistered: false,
        titleVerified: true,
        ownershipType: 'Freehold',
        coverImageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
        galleryImageUrls: [],
        status: 'APPROVED',
        verifiedBy: admin._id,
        reviewedAt: new Date(),
      },
      {
        submittedBy: admin._id,
        title: 'Grade-A IT Park Office Floor in Malviya Nagar',
        description: 'Fully furnished commercial office floor in landmark commercial tower. High specification HVAC, 100% DG power backup, LEED Gold certified building leased to a multinational software company.',
        assetClass: 'Pre-Leased Commercial',
        riskCategory: 'Conservative (Cash Flow)',
        locality: 'Malviya Nagar',
        address: 'Level 5, Malviya Tech Center, JLN Marg',
        pinCode: '302017',
        entryTicketSizeINR: 9000000, // ₹90 Lakh
        totalAssetValueINR: 45000000, // ₹4.5 Crore
        historicalRentalYieldPct: 7.8,
        lastRentalYieldYear: 'FY 2023-24',
        currentTenantProfile: 'Global IT Consulting Firm (9-Year Lease)',
        leaseRegistered: true,
        leaseRemainingMonths: 60,
        lockInPeriodMonths: 36,
        annualEscalationPct: 12,
        jdaApproved: true,
        reraRegistered: true,
        titleVerified: true,
        ownershipType: 'Freehold',
        coverImageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
        galleryImageUrls: [],
        status: 'APPROVED',
        verifiedBy: admin._id,
        reviewedAt: new Date(),
      },
      {
        submittedBy: admin._id,
        title: 'Logistics Warehouse Asset on Jaipur-Ajmer Expressway',
        description: 'Modern pre-engineered building (PEB) warehouse with 12m clear height, dock levelers, and FM2 flooring leased to a 3PL logistics provider on a 6-year term.',
        assetClass: 'Pre-Leased Commercial',
        riskCategory: 'Balanced (Hybrid)',
        locality: 'Ajmer Road',
        address: 'KM 26, Jaipur-Ajmer Expressway, Mahapura',
        pinCode: '302026',
        entryTicketSizeINR: 7500000, // ₹75 Lakh
        totalAssetValueINR: 30000000, // ₹3.0 Crore
        historicalRentalYieldPct: 8.9,
        lastRentalYieldYear: 'FY 2023-24',
        currentTenantProfile: 'National 3PL Logistics Operator',
        leaseRegistered: true,
        leaseRemainingMonths: 54,
        lockInPeriodMonths: 30,
        annualEscalationPct: 10,
        jdaApproved: true,
        reraRegistered: false,
        titleVerified: true,
        ownershipType: 'Freehold',
        coverImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        galleryImageUrls: [],
        status: 'APPROVED',
        verifiedBy: admin._id,
        reviewedAt: new Date(),
      },
      // Pending investment asset for Moderation Queue
      {
        submittedBy: admin._id,
        title: 'Retail High Street Corner Unit in Vaishali Nagar',
        description: 'Retail space leased to regional apparel retailer awaiting lease agreement verification and stamp duty inspection.',
        assetClass: 'Pre-Leased Commercial',
        riskCategory: 'Conservative (Cash Flow)',
        locality: 'Vaishali Nagar',
        address: 'Amrapali Plaza, Vaishali Nagar',
        pinCode: '302021',
        entryTicketSizeINR: 5000000,
        totalAssetValueINR: 20000000,
        historicalRentalYieldPct: 6.8,
        lastRentalYieldYear: 'FY 2023-24',
        currentTenantProfile: 'Regional Apparel Brand',
        leaseRegistered: true,
        leaseRemainingMonths: 36,
        lockInPeriodMonths: 18,
        annualEscalationPct: 10,
        jdaApproved: true,
        reraRegistered: false,
        titleVerified: false,
        ownershipType: 'Freehold',
        coverImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        galleryImageUrls: [],
        status: 'PENDING_REVIEW',
      },
    ];

    const createdInvestments = await InvestmentAsset.insertMany(assets);
    console.log(` Created ${createdInvestments.length} Investment Assets (5 Approved, 1 Pending).`);

    // ─────────────────────────────────────────────────────────────
    // 5. Seed Inquiries for All 3 Verticals & Activity Timeline
    // ─────────────────────────────────────────────────────────────
    console.log('\n--- 5. Seeding Inquiries CRM ---');
    await Inquiry.deleteMany({});

    const today = new Date();
    const overdueDate = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
    const futureDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000); // in 3 days

    const sampleInquiries = [
      {
        inquiryType: 'BUY',
        referenceId: createdBuyProps[0]._id,
        referenceModel: 'BuyProperty',
        userId: buyer._id,
        contactName: 'Ananya Deshmukh',
        contactEmail: 'ananya@example.com',
        contactPhone: '9829055667',
        message: 'Looking to schedule a site inspection this weekend with my family.',
        details: {
          propertyTitle: createdBuyProps[0].title,
          locality: createdBuyProps[0].locality,
          price: createdBuyProps[0].price,
          preferredVisitDate: '2026-10-18',
        },
        status: 'VISIT_SCHEDULED',
        assignedTo: agent._id,
        followUpDate: today, // DUE TODAY
        timeline: [
          {
            status: 'NEW',
            note: 'Initial inquiry received via property detail page.',
            timestamp: new Date(today.getTime() - 48 * 3600 * 1000),
          },
          {
            status: 'CONTACTED',
            note: 'Spoke with buyer. Confirmed family budget of ₹85-90 Lakh.',
            updatedBy: agent._id,
            timestamp: new Date(today.getTime() - 24 * 3600 * 1000),
          },
          {
            status: 'VISIT_SCHEDULED',
            note: 'Coordinated site visit for Saturday 11 AM.',
            updatedBy: agent._id,
            timestamp: today,
          },
        ],
      },
      {
        inquiryType: 'INVEST',
        referenceId: createdInvestments[0]._id,
        referenceModel: 'InvestmentAsset',
        userId: investor._id,
        contactName: 'Vikramaditya Khandelwal',
        contactEmail: 'vikramaditya@jaipurcap.in',
        contactPhone: '9829044556',
        message: 'Requesting verified lease agreement copy and tenant payment history for FY 23-24.',
        details: {
          assetTitle: createdInvestments[0].title,
          locality: createdInvestments[0].locality,
          intendedCapital: 6000000,
          investmentHorizonYears: 5,
        },
        status: 'PROPOSAL_SENT',
        assignedTo: admin._id,
        followUpDate: overdueDate, // OVERDUE ALERT
        timeline: [
          {
            status: 'NEW',
            note: 'Expression of interest submitted by investor.',
            timestamp: new Date(today.getTime() - 72 * 3600 * 1000),
          },
          {
            status: 'PROPOSAL_SENT',
            note: 'Shared verified lease terms sheet and 3-year rent remittance history.',
            updatedBy: admin._id,
            timestamp: new Date(today.getTime() - 48 * 3600 * 1000),
          },
        ],
      },
      {
        inquiryType: 'STAY',
        referenceId: createdStays[0]._id,
        referenceModel: 'StayListing',
        userId: null,
        contactName: 'Pooja Agarwal',
        contactEmail: 'pooja.agarwal@gmail.com',
        contactPhone: '9829099887',
        message: 'Visiting Jaipur for a destination wedding. Need early check-in around 11 AM if possible.',
        details: {
          stayTitle: createdStays[0].title,
          locality: createdStays[0].locality,
          checkInDate: '2026-11-20',
          checkOutDate: '2026-11-24',
          guestsCount: 4,
          nights: 4,
          estimatedCost: 22480,
        },
        status: 'CONTACTED',
        assignedTo: agent._id,
        followUpDate: futureDate, // SCHEDULED UPCOMING
        timeline: [
          {
            status: 'NEW',
            note: 'Inquiry received for 4 nights stay.',
            timestamp: new Date(today.getTime() - 12 * 3600 * 1000),
          },
          {
            status: 'CONTACTED',
            note: 'Contacted host Kunwar Digvijay Singh to confirm early check-in feasibility.',
            updatedBy: agent._id,
            timestamp: today,
          },
        ],
      },
      {
        inquiryType: 'BUY',
        referenceId: createdBuyProps[1]._id,
        referenceModel: 'BuyProperty',
        userId: null,
        contactName: 'Harish Chawla',
        contactEmail: 'harish.chawla@delhicapital.com',
        contactPhone: '9811223344',
        message: 'Interested in the Malviya Nagar 4 BHK Kothi. Is the title verified with JDA patta?',
        details: {
          propertyTitle: createdBuyProps[1].title,
          locality: createdBuyProps[1].locality,
          price: createdBuyProps[1].price,
        },
        status: 'NEW',
        assignedTo: null,
        followUpDate: null,
        timeline: [
          {
            status: 'NEW',
            note: 'Fresh inquiry logged.',
            timestamp: today,
          },
        ],
      },
    ];

    const createdInquiries = await Inquiry.insertMany(sampleInquiries);
    console.log(` Created ${createdInquiries.length} Inquiries across BUY, INVEST, and STAY.`);

    // ─────────────────────────────────────────────────────────────
    // 6. Seed Compliance Audit Trail Logs
    // ─────────────────────────────────────────────────────────────
    console.log('\n--- 6. Seeding Compliance Audit Trail ---');
    await AuditLog.deleteMany({});

    const sampleAuditLogs = [
      {
        action: 'LISTING_APPROVED',
        actorId: admin._id,
        actorRole: 'admin',
        targetType: 'BuyProperty',
        targetId: createdBuyProps[0]._id,
        changes: {
          before: { status: 'PENDING_REVIEW' },
          after: { status: 'APPROVED', titleVerified: true },
        },
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/129.0',
        createdAt: new Date(today.getTime() - 36 * 3600 * 1000),
      },
      {
        action: 'STAY_LISTING_APPROVED',
        actorId: admin._id,
        actorRole: 'admin',
        targetType: 'StayListing',
        targetId: createdStays[0]._id,
        changes: {
          before: { status: 'PENDING_REVIEW' },
          after: { status: 'APPROVED' },
        },
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/129.0',
        createdAt: new Date(today.getTime() - 30 * 3600 * 1000),
      },
      {
        action: 'INVEST_ASSET_APPROVED',
        actorId: admin._id,
        actorRole: 'admin',
        targetType: 'InvestmentAsset',
        targetId: createdInvestments[0]._id,
        changes: {
          before: { status: 'PENDING_REVIEW' },
          after: { status: 'APPROVED', titleVerified: true },
        },
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/129.0',
        createdAt: new Date(today.getTime() - 20 * 3600 * 1000),
      },
      {
        action: 'LISTING_REJECTED',
        actorId: admin._id,
        actorRole: 'admin',
        targetType: 'BuyProperty',
        targetId: createdBuyProps[1]._id,
        changes: {
          before: { status: 'PENDING_REVIEW' },
          after: { status: 'REJECTED', rejectionReason: 'Disputed inheritance registry — awaiting probate clearance.' },
        },
        ipAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/129.0',
        createdAt: new Date(today.getTime() - 10 * 3600 * 1000),
      },
    ];

    const createdAuditLogs = await AuditLog.insertMany(sampleAuditLogs);
    console.log(` Created ${createdAuditLogs.length} Compliance Audit Log entries.`);

    console.log('\n======================================================');
    console.log(' SEED COMPLETED SUCCESSFULLY!');
    console.log('======================================================');
    console.log('Demo Credentials for All Roles:');
    console.log(' - Admin:    admin@jaipurestates.in    / AdminJaipur#2024');
    console.log(' - Agent:    agent@jaipurestates.in    / AgentJaipur#2024');
    console.log(' - Owner:    owner@jaipurestates.in    / OwnerJaipur#2024');
    console.log(' - Host:     host@jaipurestates.in     / HostJaipur#2024');
    console.log(' - Investor: investor@jaipurestates.in / InvestorJaipur#2024');
    console.log(' - Buyer:    buyer@jaipurestates.in    / BuyerJaipur#2024');
    console.log('======================================================\n');

    if (shouldExit) {
      await mongoose.disconnect();
      process.exit(0);
    }
  } catch (err) {
    console.error('❌ Error running unified seed script:', err.message);
    if (shouldExit) {
      process.exit(1);
    }
    throw err;
  }
};

// If run directly from CLI
if (process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('seedAll.js')) {
  seedAll(true);
}
