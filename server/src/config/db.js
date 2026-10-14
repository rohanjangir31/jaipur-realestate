import mongoose from 'mongoose';
import { env } from './env.js';
import { BuyProperty } from '../models/BuyProperty.model.js';
import { seedAll } from '../seed/seedAll.js';

let mongodInstance = null;

export const connectDB = async () => {
  try {
    console.log(`📡 Connecting to MongoDB at: ${env.MONGODB_URI}`);
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    // Check if initial seed is needed
    const count = await BuyProperty.countDocuments();
    if (count === 0) {
      console.log('🌱 Database is empty. Seeding initial Jaipur properties, stays & assets...');
      await seedAll(false);
    }
  } catch (err) {
    console.warn(`⚠️ Local MongoDB (${env.MONGODB_URI}) unavailable: ${err.message}`);
    console.log('🔄 Initializing embedded in-memory MongoDB engine for zero-setup local dev...');

    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongodInstance = await MongoMemoryServer.create({
        instance: {
          dbName: 'jaipur-realestate',
        },
      });
      const uri = mongodInstance.getUri();
      console.log(`🚀 Embedded MongoDB started at: ${uri}`);

      await mongoose.connect(uri);
      console.log('✅ Connected to embedded MongoDB successfully.');

      console.log('🌱 Populating complete Jaipur Real Estate demo dataset (Properties, Stays, Assets, Users)...');
      await seedAll(false);
      console.log('✨ All seed data populated and live!');
    } catch (memErr) {
      console.error('❌ Failed to start embedded MongoDB:', memErr.message);
    }
  }
};
