import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { User } from '../models/User.model.js';
import { StayListing } from '../models/StayListing.model.js';

const seedStays = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB for stay listings seed...');

    const hostEmail = 'host@jaipurestates.in';
    let host = await User.findOne({ email: hostEmail });
    if (!host) {
      const passwordHash = await bcrypt.hash('HostJaipur#2024', 12);
      host = await User.create({
        name: 'Kunwar Digvijay Singh',
        email: hostEmail,
        phone: '9829033445',
        passwordHash,
        roles: ['host'],
        isEmailVerified: true,
      });
      console.log('Created host account: host@jaipurestates.in / HostJaipur#2024');
    }

    await StayListing.deleteMany({});
    console.log('Cleared existing stay listings');

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
          { name: 'Jaipur Junction Railway Station', distanceKm: 1.8 },
          { name: 'City Palace & Jantar Mantar', distanceKm: 4.2 },
          { name: 'Hawa Mahal', distanceKm: 4.8 },
        ],
        amenities: [
          'WiFi',
          'Air Conditioning',
          'Traditional Rajasthani Decor',
          'Caretaker On-site',
          'Complimentary Breakfast',
          'Power Backup',
          'Terrace / Courtyard',
        ],
        petsAllowed: false,
        smokingAllowed: false,
        partiesAllowed: false,
        coverImageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        galleryImageUrls: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
        ],
        status: 'APPROVED',
      },
      {
        hostId: host._id,
        title: 'Boutique Garden Homestay near Central Park, C-Scheme',
        description: 'Calm and artistic homestay surrounded by flowering bougainvillea in central Jaipur. High ceilings, vintage wooden furnishings, dedicated workspace with high-speed fiber internet, and walking distance to Central Park jogging track and famous C-Scheme cafes.',
        stayType: 'Boutique Homestay',
        locality: 'C-Scheme',
        address: '14, Prithviraj Road, C-Scheme',
        landmark: 'Behind Statue Circle',
        pinCode: '302001',
        maxGuests: 2,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        basePricePerNight: 3200,
        weekendPriceMultiplier: 1.0,
        cleaningFee: 250,
        minNights: 1,
        checkInTime: '13:00',
        checkOutTime: '11:00',
        nearbyAttractions: [
          { name: 'Central Park Gate 3', distanceKm: 0.4 },
          { name: 'Statue Circle', distanceKm: 0.6 },
          { name: 'Albert Hall Museum', distanceKm: 2.5 },
        ],
        amenities: [
          'WiFi',
          'Air Conditioning',
          'Dedicated Workspace',
          'Kitchen Facility',
          'Free Parking',
        ],
        petsAllowed: true,
        smokingAllowed: false,
        partiesAllowed: false,
        coverImageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        status: 'APPROVED',
      },
      {
        hostId: host._id,
        title: 'Luxury 4 BHK Private Villa with Plunge Pool, Civil Lines',
        description: 'Exclusive independent retreat located in the tranquil VIP zone of Civil Lines. Includes private courtyard plunge pool, expansive dining hall, dedicated chef service, curated heritage artifacts, and enclosed secure driveway parking.',
        stayType: 'Luxury Villa',
        locality: 'Civil Lines',
        address: 'Civil Lines Road, Near Raj Bhavan',
        landmark: 'Civil Lines Metro Station (500m)',
        pinCode: '302006',
        maxGuests: 10,
        bedrooms: 4,
        beds: 5,
        bathrooms: 4,
        basePricePerNight: 16500,
        weekendPriceMultiplier: 1.25,
        cleaningFee: 1500,
        minNights: 2,
        checkInTime: '15:00',
        checkOutTime: '11:00',
        nearbyAttractions: [
          { name: 'Civil Lines Metro Station', distanceKm: 0.5 },
          { name: 'Jaipur Airport (JAI)', distanceKm: 11.0 },
          { name: 'Amer Fort', distanceKm: 14.5 },
        ],
        amenities: [
          'WiFi',
          'Air Conditioning',
          'Swimming Pool',
          'Caretaker On-site',
          'Kitchen Facility',
          'Power Backup',
          'Free Parking',
          'CCTV in Common Areas',
        ],
        petsAllowed: false,
        smokingAllowed: false,
        partiesAllowed: false,
        coverImageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
        status: 'APPROVED',
      },
      {
        hostId: host._id,
        title: 'Modern Studio Apartment near WTP, Malviya Nagar',
        description: 'Compact self-contained studio flat adjacent to World Trade Park and Gaurav Tower. Fitted with kitchenette, induction cooker, microwave, smart TV, and fast WiFi. Ideal for solo travellers, couples, or digital nomads visiting South Jaipur.',
        stayType: 'Studio Apartment',
        locality: 'Malviya Nagar',
        address: 'Sector 4, Malviya Nagar, Near Calgiri Marg',
        landmark: 'Walking distance to World Trade Park',
        pinCode: '302017',
        maxGuests: 2,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        basePricePerNight: 2200,
        weekendPriceMultiplier: 1.1,
        cleaningFee: 200,
        minNights: 1,
        checkInTime: '14:00',
        checkOutTime: '12:00',
        nearbyAttractions: [
          { name: 'World Trade Park (WTP)', distanceKm: 0.6 },
          { name: 'Jaipur International Airport', distanceKm: 4.5 },
        ],
        amenities: [
          'WiFi',
          'Air Conditioning',
          'Kitchen Facility',
          'Dedicated Workspace',
          'Power Backup',
        ],
        petsAllowed: false,
        smokingAllowed: false,
        partiesAllowed: false,
        coverImageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
        status: 'APPROVED',
      },
      {
        hostId: host._id,
        title: 'Chaupar Suite in Walled Pink City near Johari Bazaar',
        description: 'Step into historical Jaipur inside the UNESCO World Heritage walled city. Located in a quiet lane off Johari Bazaar. Hand-painted fresco motifs on walls and panoramic roof terrace viewing Nahargarh Fort hills.',
        stayType: 'Heritage Haveli',
        locality: 'Pink City (Walled City)',
        address: 'Ghee Walon Ka Rasta, Johari Bazaar',
        landmark: '3 mins walk from Bapu Bazaar',
        pinCode: '302003',
        maxGuests: 3,
        bedrooms: 1,
        beds: 2,
        bathrooms: 1,
        basePricePerNight: 3500,
        weekendPriceMultiplier: 1.1,
        cleaningFee: 300,
        minNights: 1,
        checkInTime: '14:00',
        checkOutTime: '11:00',
        nearbyAttractions: [
          { name: 'Johari Bazaar & Bapu Bazaar', distanceKm: 0.2 },
          { name: 'Hawa Mahal', distanceKm: 0.9 },
          { name: 'City Palace', distanceKm: 1.1 },
        ],
        amenities: [
          'WiFi',
          'Air Conditioning',
          'Traditional Rajasthani Decor',
          'Terrace / Courtyard',
          'Caretaker On-site',
        ],
        status: 'PENDING_REVIEW', // To demonstrate stay moderation queue!
      },
    ];

    await StayListing.insertMany(stays);
    console.log(`Successfully seeded ${stays.length} Jaipur stay accommodations.`);

    await mongoose.disconnect();
    console.log('Stay seed finished successfully!');
  } catch (err) {
    console.error('Error during stay seed:', err);
    process.exit(1);
  }
};

seedStays();
