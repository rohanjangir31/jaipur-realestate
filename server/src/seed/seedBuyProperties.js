import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { User } from '../models/User.model.js';
import { BuyProperty } from '../models/BuyProperty.model.js';
import { Inquiry } from '../models/Inquiry.model.js';

const seedData = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // 1. Create or retrieve admin user and test owner
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
      console.log('Created admin user: admin@jaipurestates.in / AdminJaipur#2024');
    }

    const ownerEmail = 'owner@jaipurestates.in';
    let owner = await User.findOne({ email: ownerEmail });
    if (!owner) {
      const passwordHash = await bcrypt.hash('OwnerJaipur#2024', 12);
      owner = await User.create({
        name: 'Surendra Rathore',
        email: ownerEmail,
        phone: '9829154321',
        passwordHash,
        roles: ['owner'],
        isEmailVerified: true,
      });
      console.log('Created owner user: owner@jaipurestates.in / OwnerJaipur#2024');
    }

    // 2. Clear old demo properties if re-seeding
    await BuyProperty.deleteMany({});
    console.log('Cleared existing properties');

    // 3. Create realistic Jaipur Buy Properties
    const properties = [
      {
        ownerId: owner._id,
        title: '3 BHK Premium Apartment near Amrapali Circle',
        description: 'Spacious well-ventilated flat on 4th floor with modular kitchen, wooden wardrobes, two balconies, and dedicated covered basement parking. Proximity to local market and schools in Vaishali Nagar.',
        locality: 'Vaishali Nagar',
        address: 'Plot B-42, Amrapali Circle, Vaishali Nagar',
        landmark: 'Near Amrapali Circle',
        pinCode: '302021',
        propertyType: 'Apartment/Flat',
        transactionType: 'Resale',
        facing: 'East',
        bhk: 3,
        bathrooms: 3,
        balconies: 2,
        floor: 4,
        totalFloors: 9,
        parkingSlots: 1,
        superAreaSqFt: 1850,
        carpetAreaSqFt: 1420,
        possessionStatus: 'Ready to Move',
        price: 8500000, // ₹85 Lakh
        maintenanceMonthly: 2500,
        isNegotiable: true,
        ownershipType: 'Freehold',
        reraRegistered: true,
        reraId: 'RAJ/P/2021/1542',
        titleVerified: true,
        coverImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        galleryImageUrls: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        ],
        amenities: ['Power Backup', '24x7 Security', 'Lift', 'Covered Parking', 'Gated Community'],
        status: 'APPROVED',
      },
      {
        ownerId: owner._id,
        title: '4 BHK Independent Duplex Villa in Jagatpura',
        description: 'Architecturally designed modern villa on 200 sq. yard JDA approved plot. High ceilings, Italian marble flooring in living hall, private terrace garden, and servant room.',
        locality: 'Jagatpura',
        address: 'Sector 7, Model Town Extension, Jagatpura',
        landmark: 'Near Mahal Road, Behind SKIT',
        pinCode: '302017',
        propertyType: 'Independent House/Villa',
        transactionType: 'New Construction',
        facing: 'North-East',
        bhk: 4,
        bathrooms: 4,
        balconies: 3,
        floor: 0,
        totalFloors: 2,
        parkingSlots: 2,
        superAreaSqFt: 2750,
        carpetAreaSqFt: 2200,
        plotAreaSqYd: 200,
        possessionStatus: 'Ready to Move',
        price: 16500000, // ₹1.65 Cr
        maintenanceMonthly: 0,
        isNegotiable: false,
        ownershipType: 'JDA Approved Leasehold',
        reraRegistered: true,
        reraId: 'RAJ/P/2022/2045',
        titleVerified: true,
        coverImageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
        galleryImageUrls: [
          'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
        ],
        amenities: ['Terrace Garden', 'CCTV Security', 'Solar Water Heating', 'Borewell & Water Tank'],
        status: 'APPROVED',
      },
      {
        ownerId: owner._id,
        title: '2 BHK Airy Apartment in Mansarovar Extension',
        description: 'Budget-friendly 2 BHK flat near Muhana Mandi Road. Ideal for small families or working professionals with fast road connectivity to Tonk Road and Gopalpura Bypass.',
        locality: 'Mansarovar',
        address: 'Kalyan Kunj, Muhana Road, Mansarovar',
        landmark: 'Near St. Wilfred College',
        pinCode: '302020',
        propertyType: 'Apartment/Flat',
        transactionType: 'Resale',
        facing: 'East',
        bhk: 2,
        bathrooms: 2,
        balconies: 1,
        floor: 2,
        totalFloors: 6,
        parkingSlots: 1,
        superAreaSqFt: 1100,
        carpetAreaSqFt: 880,
        possessionStatus: 'Ready to Move',
        price: 3600000, // ₹36 Lakh
        maintenanceMonthly: 1200,
        isNegotiable: true,
        ownershipType: 'Freehold',
        reraRegistered: false,
        titleVerified: true,
        coverImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        amenities: ['Lift', '24x7 Security', 'Covered Two-Wheeler Parking'],
        status: 'APPROVED',
      },
      {
        ownerId: owner._id,
        title: 'Commercial Office Space on Main Tonk Road',
        description: 'Furnished commercial floor plate suitable for IT firms, coaching institutes, or corporate regional branch. Glass facade with wide arterial frontage on main Tonk Road.',
        locality: 'Tonk Road',
        address: 'Business Tower, Near Gopalpura Flyover, Tonk Road',
        landmark: 'Adjacent to Metro Pillar 45',
        pinCode: '302018',
        propertyType: 'Commercial Office/Shop',
        transactionType: 'Resale',
        facing: 'North',
        bhk: 0,
        bathrooms: 2,
        balconies: 0,
        floor: 3,
        totalFloors: 8,
        parkingSlots: 2,
        superAreaSqFt: 1600,
        carpetAreaSqFt: 1350,
        possessionStatus: 'Ready to Move',
        price: 13500000, // ₹1.35 Cr
        maintenanceMonthly: 4000,
        isNegotiable: false,
        ownershipType: 'Freehold',
        reraRegistered: true,
        reraId: 'RAJ/P/2019/987',
        titleVerified: true,
        coverImageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        amenities: ['Central Air Conditioning', 'High Speed Elevators', 'Power Backup', 'Fire Fighting System'],
        status: 'APPROVED',
      },
      {
        ownerId: owner._id,
        title: '3 BHK High-Rise Penthouse with Panoramic Aravali Views',
        description: 'New launch penthouse offering unobstructed skyline views. Expansive master suite, open kitchen with island counter, and wrap-around deck in Jagatpura.',
        locality: 'Jagatpura',
        address: 'Skyline Heights, Mahal Road, Jagatpura',
        landmark: 'Opposite Bombay Hospital Road',
        pinCode: '302017',
        propertyType: 'Penthouse',
        transactionType: 'New Construction',
        facing: 'East',
        bhk: 3,
        bathrooms: 3,
        balconies: 3,
        floor: 14,
        totalFloors: 14,
        parkingSlots: 2,
        superAreaSqFt: 2450,
        carpetAreaSqFt: 1980,
        possessionStatus: 'Under Construction',
        price: 14500000, // ₹1.45 Cr
        maintenanceMonthly: 3000,
        isNegotiable: false,
        ownershipType: 'Freehold',
        reraRegistered: true,
        reraId: 'RAJ/P/2023/3412',
        titleVerified: true,
        coverImageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        amenities: ['Clubhouse', 'Swimming Pool', 'Gymnasium', 'Visitor Parking', 'Intercom'],
        status: 'APPROVED',
      },
      {
        ownerId: owner._id,
        title: '3 BHK Luxury Flat in C-Scheme near Central Park',
        description: 'Prime address in Jaipur heartland. Located inside prestigious gated community with serene avenue trees and immediate proximity to Statue Circle and Secretariat.',
        locality: 'C-Scheme',
        address: 'Bhagwan Das Road, C-Scheme',
        landmark: '2 mins from Central Park Gate 3',
        pinCode: '302001',
        propertyType: 'Apartment/Flat',
        transactionType: 'Resale',
        facing: 'North-East',
        bhk: 3,
        bathrooms: 3,
        balconies: 2,
        floor: 5,
        totalFloors: 7,
        parkingSlots: 2,
        superAreaSqFt: 2200,
        carpetAreaSqFt: 1750,
        possessionStatus: 'Ready to Move',
        price: 24000000, // ₹2.40 Cr
        maintenanceMonthly: 5000,
        isNegotiable: true,
        ownershipType: 'Freehold',
        reraRegistered: true,
        reraId: 'RAJ/P/2020/1120',
        titleVerified: true,
        coverImageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        amenities: ['Gymnasium', 'Landscaped Garden', 'Round-the-clock Concierge', 'Covered Stilt Parking'],
        status: 'PENDING_REVIEW', // To demonstrate admin moderation queue!
      },
    ];

    await BuyProperty.insertMany(properties);
    console.log(`Successfully seeded ${properties.length} Jaipur properties.`);

    await mongoose.disconnect();
    console.log('Done!');
  } catch (err) {
    console.error('Error during seed:', err);
    process.exit(1);
  }
};

seedData();
